const express = require('express');

function createApp({ transporter, sender, allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'], now = Date.now }) {
  const app = express();
  const attempts = new Map();
  const windowMs = 15 * 60 * 1000;
  app.disable('x-powered-by');
  app.use('/api/contact', (req, res, next) => {
    const origin = req.get('origin');
    if (origin && !allowedOrigins.includes(origin)) return res.status(403).json({ error: 'This website is not allowed to send messages.' });
    if (origin) {
      res.set('Access-Control-Allow-Origin', origin);
      res.vary('Origin');
      res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });
  app.use(express.json({ limit: '12kb' }));
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.post('/api/contact', async (req, res) => {
    const time = now();
    for (const [key, entry] of attempts) if (entry.expires <= time) attempts.delete(key);
    const key = req.ip;
    const entry = attempts.get(key) || { count: 0, expires: time + windowMs };
    if (entry.count >= 5) {
      res.set('Retry-After', String(Math.ceil((entry.expires - time) / 1000)));
      return res.status(429).json({ error: 'Too many attempts. Please try again in 15 minutes or email me directly.' });
    }
    entry.count += 1;
    attempts.set(key, entry);
    const body = req.body || {};
    if (body.website) return res.json({ success: true, msg: 'Your message has been sent. Thank you!' });
    const { username, email, message } = body;
    if (![username, email, message].every(value => typeof value === 'string')) return res.status(400).json({ error: 'Please provide your name, email address, and message.' });
    const name = username.trim();
    const replyTo = email.trim();
    const text = message.trim();
    if (!name || name.length > 100 || /[\r\n]/.test(name) || replyTo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo) || !text || text.length > 5000) {
      return res.status(400).json({ error: 'Enter a valid name (up to 100 characters), email address, and message (up to 5,000 characters).' });
    }
    try {
      await transporter.sendMail({
        from: sender,
        to: sender,
        replyTo,
        subject: `Portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${replyTo}\n\n${text}`,
      });
      return res.json({ success: true, msg: 'Your message has been sent. Thank you!' });
    } catch (error) {
      console.error('Contact email failed:', error.code || 'MAIL_ERROR');
      return res.status(502).json({ error: 'Your message could not be sent. Please try again later or email me directly.' });
    }
  });
  app.use((error, _req, res, _next) => {
    if (error.type === 'entity.too.large') return res.status(413).json({ error: 'Your message is too large. Please keep it under 5,000 characters.' });
    if (error.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid request. Please check the form and try again.' });
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  });
  return app;
}

module.exports = { createApp };
