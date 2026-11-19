const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('./app');
const valid = { username: 'Visitor', email: 'visitor@example.com', message: 'Hello from a test.' };
async function setup(t, sendMail = async () => ({})) {
  const calls = [];
  const app = createApp({ sender: 'owner@example.com', transporter: { sendMail: async mail => { calls.push(mail); return sendMail(mail); } } });
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  return { calls, post: (body, origin = 'http://localhost:5173') => fetch(`http://127.0.0.1:${server.address().port}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: typeof body === 'string' ? body : JSON.stringify(body) }) };
}
test('sends to the owner with authenticated sender and visitor reply-to', async t => {
  const { post, calls } = await setup(t);
  const res = await post(valid);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).success, true);
  assert.equal(calls[0].from, 'owner@example.com');
  assert.equal(calls[0].to, 'owner@example.com');
  assert.equal(calls[0].replyTo, valid.email);
});
test('rejects invalid fields, malformed JSON, and oversized requests without sending', async t => {
  const { post, calls } = await setup(t);
  for (const body of [{ ...valid, username: [] }, { ...valid, email: 'invalid' }, { ...valid, message: ' ' }, '{']) assert.equal((await post(body)).status, 400);
  assert.equal((await post({ ...valid, message: 'a'.repeat(13000) })).status, 413);
  assert.equal(calls.length, 0);
});
test('blocks unapproved origins and ignores honeypot submissions', async t => {
  const { post, calls } = await setup(t);
  assert.equal((await post(valid, 'https://unapproved.example')).status, 403);
  assert.equal((await post({ ...valid, website: 'spam' })).status, 200);
  assert.equal(calls.length, 0);
});
test('limits repeated submissions', async t => {
  const { post, calls } = await setup(t);
  for (let i = 0; i < 5; i++) assert.equal((await post({})).status, 400);
  const res = await post(valid);
  assert.equal(res.status, 429);
  assert.ok(Number(res.headers.get('retry-after')) > 0);
  assert.equal(calls.length, 0);
});
test('reports SMTP failure without claiming success or exposing provider details', async t => {
  const { post } = await setup(t, async () => { throw Object.assign(new Error('private provider details'), { code: 'EAUTH' }); });
  const res = await post(valid);
  assert.equal(res.status, 502);
  const body = await res.json();
  assert.ok(!body.success);
  assert.ok(!body.error.includes('private provider details'));
});
