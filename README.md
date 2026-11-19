# Sumit Saraswat — Portfolio

A responsive personal portfolio showcasing full-stack development, backend engineering, and AI applications. Built with React and Vite, with an Express and Nodemailer backend for the contact form.

## Features

- Responsive layout with mobile navigation and keyboard-accessible controls.
- Project slider featuring Daily-Digest, Paperfy, Quizzy, and ExpenseEase, with original project logos and live demo links.
- Education, skills, and achievements in an accessible tabbed resume section.
- Downloadable PDF resume.
- Contact form with validation, sending/error/success states, basic spam protection, and direct email options.

## Tech stack

| Part | Technologies |
| --- | --- |
| Frontend | React 19, Vite 7, Tailwind CSS 4, custom CSS, Lucide icons |
| Backend | Node.js, Express 5, Nodemailer, dotenv |
| Email | Gmail SMTP with a Google App Password |
| Backend tests | Node.js test runner with a fake email transport |

## Project structure

```text
Portfolio/
├── README.md                    # Documentation for the whole project
├── .gitignore
├── backend/
│   ├── .env.example             # Credential placeholders and local configuration
│   ├── app.js                   # Contact API, validation, and basic spam protection
│   ├── app.test.js              # Backend tests; no real email sent
│   ├── index.js                 # Server startup and Gmail transport
│   └── package.json
└── portfnew/
    ├── public/
    │   ├── project-logos/       # Original logo assets and source attribution
    │   └── sumit-saraswat-resume.pdf
    ├── src/
    │   ├── App.jsx              # Page sections, project slider, and resume tabs
    │   ├── portfolioData.js     # Profile, project, skill, and expertise data
    │   ├── index.css            # Styles and responsive layouts
    │   └── components/
    │       └── ContactForm.jsx  # Form submission and feedback
    ├── vite.config.js          # Local API proxy and build settings
    └── package.json
```

## Local setup

Use Node.js **22.12 or newer** with npm. Run the commands below from the `Portfolio` root, which contains `backend` and `portfnew`. There is no root-level npm package; each app has its own dependencies.

### 1. Install dependencies

```powershell
npm --prefix backend install
npm --prefix portfnew install
```

### 2. Configure email

If `backend/.env` does not already exist, copy the example. Preserve any existing credentials:

```powershell
if (-not (Test-Path backend/.env)) {
    Copy-Item backend/.env.example backend/.env
}
```

Edit `backend/.env` locally:

```dotenv
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-google-app-password
PORT=5000
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

`EMAIL_USER` is the Gmail account used both to send and receive contact messages. Use a Google App Password for that same account, not its regular login password. Enable Google 2-Step Verification before creating the App Password.

Keep `.env` out of Git. Never place email credentials in frontend source or variables prefixed with `VITE_`. Removing a credential file from tracking does not remove earlier commits; revoke any App Password previously published.

### 3. Start the backend

In one terminal:

```powershell
npm --prefix backend run dev
```

The API listens on `http://localhost:5000` by default.

### 4. Start the frontend

In a second terminal:

```powershell
npm --prefix portfnew run dev
```

Open **http://localhost:5173**. Vite forwards `/api` requests to `http://127.0.0.1:5000`, so no frontend API environment variable is needed locally. If you change the backend port, update the proxy in `portfnew/vite.config.js` too.

## Contact form behavior

```text
Visitor → React form → /api/contact → Express → Nodemailer → Your Gmail inbox
```

The backend uses the authenticated Gmail address for `from` and `to`, with the visitor's address in `replyTo`. Replying to a received message addresses the visitor.

The form validates names, email addresses, and messages; preserves entered text on failure; and clears it after a successful response. It disables submission while sending. The backend also validates incoming data, limits JSON size, filters a hidden honeypot field, and allows five attempts per IP per 15 minutes.

| Endpoint | Purpose |
| --- | --- |
| `GET /api/health` | Confirms the API is running; does not verify Gmail credentials or inbox delivery |
| `POST /api/contact` | Accepts `username`, `email`, `message`, and the hidden `website` field |

Submitting the real form sends an email. Check the configured account's inbox and spam folder. SMTP acceptance does not prove final inbox delivery.

## Commands and checks

Run these from the `Portfolio` root:

| Command | Purpose |
| --- | --- |
| `npm --prefix backend run dev` | Start the API with automatic restarts |
| `npm --prefix backend start` | Start the API with Node.js |
| `npm --prefix backend test` | Run backend tests without sending email |
| `npm --prefix portfnew run dev` | Start the Vite development server |
| `npm --prefix portfnew run build` | Install frontend dependencies and build into `portfnew/dist` |
| `npm --prefix portfnew run preview` | Preview the frontend production build locally |
| `npm --prefix portfnew run lint` | Run ESLint across the frontend |

Backend tests cover sender/reply-to configuration, invalid and oversized requests, unapproved origins, honeypot filtering, rate limiting, and mail-service failures. The repository-wide frontend lint command also checks older components retained in `src/components`; these may report existing lint issues.

The development API proxy does not apply to `vite preview`. To test the contact form with a production build, configure its API destination as described below.

## Updating portfolio content

- **Projects, skills, expertise, and profile links:** edit `portfnew/src/portfolioData.js`.
- **Introduction, education, achievements, and page layout:** edit `portfnew/src/App.jsx`.
- **Colors, spacing, and responsive styles:** edit `portfnew/src/index.css`.
- **Downloadable resume:** replace `portfnew/public/sumit-saraswat-resume.pdf`, keeping the filename to preserve download links.
- **Project logos:** add assets to `portfnew/public/project-logos/` and update each project's `logo` path. Asset attribution is recorded in [SOURCES.md](portfnew/public/project-logos/SOURCES.md).

## Deployment

### Vercel Services (Beta)

The root `vercel.json` deploys both apps in one Vercel project. Keep the project's Root Directory at the repository root containing this file, rather than selecting `portfnew`.

- `backend` serves public `/api/*` requests, preserving the `/api` prefix used by Express.
- `portfnew` serves the portfolio and static assets on all other paths, with an SPA fallback.
- No private bindings are needed: React calls the public API from the visitor's browser. Bindings are only available to server functions at runtime, not to the Vite build or browser.

In the Vercel project's environment settings, set `EMAIL_USER` and `EMAIL_PASS` for the environments you deploy. Set `ALLOWED_ORIGINS` to the exact website origin (for example `https://your-project.vercel.app`). Include custom domains or preview origins as comma-separated entries when needed; otherwise the contact endpoint rejects those browser requests. Never prefix email credentials with `VITE_`.

Leave `VITE_API_BASE_URL` unset so the form calls `/api/contact` on its own deployment. The local `.env` file is ignored by Git and is not uploaded as production configuration.

After installing dependencies and configuring `backend/.env`, test both services together from the repository root:

```powershell
npx vercel@latest dev --local
```

Include the origin printed by this command in your local `ALLOWED_ORIGINS` (usually `http://localhost:3000`). Check the homepage, resume download, and `/api/health`. A real contact-form submission sends email. After deploying, repeat these checks on the deployed domain.

See the [Vercel Services documentation](https://vercel.com/docs/services).

### Other hosting options

The frontend and backend must both be reachable for the contact form to work.

1. Deploy the backend on a Node.js host that supports outgoing SMTP. Install dependencies and start it with `npm start` from `backend`.
2. Set `EMAIL_USER`, `EMAIL_PASS`, and `ALLOWED_ORIGINS` in the backend host's environment settings. Use the exact frontend origin in `ALLOWED_ORIGINS`; multiple origins are comma-separated. The server respects the host's `PORT` variable.
3. For separate frontend and backend hosting, set the frontend build variable `VITE_API_BASE_URL` to the backend HTTPS origin, without `/api/contact`. For example:

   ```dotenv
   VITE_API_BASE_URL=https://your-backend.example.com
   ```

4. Build the frontend from `portfnew` and publish `portfnew/dist`. Changing a `VITE_` variable requires rebuilding.
5. For same-origin hosting, leave `VITE_API_BASE_URL` unset and route `/api` requests to Express. The Vite development proxy is not a production reverse proxy.
6. Verify navigation, resume downloads, project links, and a real contact submission on the deployed site.

Rate-limit counters are held in memory and reset when the process restarts. Before deploying behind a proxy, configure trusted proxy handling for that host so client IPs are identified correctly. Multiple backend instances need shared rate-limit storage. The honeypot and origin checks provide basic protection; add stronger spam protection if needed.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Gmail returns `535` or `EAUTH` | Use a valid App Password for the account in `EMAIL_USER`; restart the backend after changing `.env`. |
| Contact form cannot connect | Start both apps; confirm the backend port and Vite proxy match. |
| Contact request returns `403` | Add the exact frontend origin to `ALLOWED_ORIGINS`, then restart the backend. |
| Contact request returns `429` | Wait for the 15-minute limit window or use a direct email option. |
| Form works locally but fails after deployment | Check `VITE_API_BASE_URL`, backend availability, allowed origins, and outgoing SMTP support. |
| Success appears but no message is in the inbox | Check the recipient account and spam folder; SMTP acceptance is not an inbox guarantee. |
