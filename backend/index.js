const path = require('node:path');
const nodemailer = require('nodemailer');
const { createApp } = require('./app');
require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('Set EMAIL_USER and EMAIL_PASS in backend/.env before starting the server.');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});
const app = createApp({
  transporter,
  sender: process.env.EMAIL_USER,
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()).filter(Boolean)
    : undefined,
});
const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(`Contact API listening on http://localhost:${port}`));
