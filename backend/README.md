# Local contact form

The React contact form posts to `/api/contact`. Vite forwards local `/api` requests to the Express server on port 5000. Nodemailer sends to `EMAIL_USER`, with the visitor address in `replyTo`.

## Run locally

1. Set `EMAIL_USER`, `EMAIL_PASS`, and `PORT=5000` in `backend/.env`. Use a Google App Password. This file is ignored by Git; `.env.example` contains placeholders only.
2. In a terminal inside `backend`, run `npm install` followed by `npm run dev`.
3. In another terminal inside `portfnew`, run `npm install` followed by `npm run dev`.
4. Open `http://localhost:5173` and use the contact form. A successful submission sends a real email to the configured account. Check the inbox and spam folder.

The backend health endpoint is `http://localhost:5000/api/health`. It confirms the API is running, not Gmail authentication or inbox delivery.

## Checks

Run `npm test` inside `backend`. These tests use a fake mail transport and do not send email. They cover sender/reply-to, invalid and oversized payloads, origin restrictions, honeypot filtering, rate limiting, and SMTP failure.

## Before deployment

- Keep `EMAIL_USER` and `EMAIL_PASS` on the backend only. Never use a `VITE_` prefix for credentials.
- Configure `ALLOWED_ORIGINS` with the exact portfolio origin, separated by commas if needed.
- For separate frontend/backend hosting, set `VITE_API_BASE_URL` to the backend HTTPS origin before building the frontend. For same-origin hosting, route `/api` to Express. The Vite proxy only applies during development.
- The limiter allows five attempts per IP per 15 minutes and is stored in memory. Configure trusted proxy handling for the chosen host and use shared rate-limit storage for multiple instances. Origin restrictions and the honeypot are basic protections, not a substitute for a production anti-spam service if abuse occurs.
- Removing `.env` from tracking does not erase historical commits. Revoke any App Password previously published.
