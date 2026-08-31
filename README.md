# Varun Prakash — Portfolio

A modern personal portfolio showcasing my work in software engineering, AI, full-stack development, and developer tools.

---

## Overview

This repository contains the source code for my personal portfolio, including my professional experience, selected projects, technical skills, certifications, achievements, and a dedicated online resume.

- Experience and professional background
- Selected projects
- Technical arsenal
- Certifications and achievements
- Dedicated resume page
- Contact form powered by Resend

## Features

- Responsive and accessible design
- Dedicated `/resume` page
- Project showcase with live and repository links
- Certification credentials
- GitHub activity integration
- Contact form with server-side Resend delivery (honeypot + rate limiting)
- Smooth navigation and scroll-spy
- Vercel-ready deployment

## Tech Stack

| Area       | Technologies                          |
| ---------- | ------------------------------------- |
| Frontend   | React, TypeScript                     |
| Build      | Vite                                  |
| Styling    | CSS Modules, design tokens            |
| Icons      | lucide-react, simple-icons            |
| API        | Express                               |
| Email      | Resend                                |
| Deployment | Vercel (serverless functions)         |

## Project Structure

```text
.
├── api/                 # Serverless API functions
├── public/              # Static assets
├── server/              # Local development API
├── src/
│   ├── components/      # Reusable UI and sections
│   ├── data/            # Portfolio content
│   ├── pages/           # Application pages
│   ├── lib/             # Utilities and client logic
│   ├── styles/          # Global styles and tokens
│   └── App.tsx          # Homepage composition + routing
├── .env.example
├── LICENSE
├── README.md
└── package.json
```

## Development

```bash
npm install
npm run dev        # API server (port 3001) + Vite together
npm run dev:web    # Vite only
npm run dev:api    # API server only
npm run build      # type-check + production build
npm run lint       # oxlint
npm run preview    # preview the production build
```

## Contact Architecture

The contact form submits `POST /api/contact` directly:

- **Local development**: `server/index.js` (Express, port 3001) — Vite proxies `/api` to it
- **Vercel production**: `api/contact.js` — a serverless function delegating to the same shared handler (`server/contact.js`)

The shared handler validates the request (required fields, email format, length limits), applies honeypot and per-IP rate-limit protection, then sends the email through Resend with `reply_to` set to the visitor's address. The API key never reaches the client.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values. Secrets are server-side only.

| Variable                | Purpose                          | Required |
| ----------------------- | -------------------------------- | -------- |
| `RESEND_API_KEY`        | Contact email delivery           | required for email |
| `RESEND_FROM`           | Verified Resend sender identity  | required for email |
| `CONTACT_EMAIL`         | Where messages are delivered     | required for email |
| `GITHUB_USERNAME`       | Live GitHub data source          | optional |
| `GITHUB_TOKEN`          | Raise GitHub rate limits         | optional |
| `GITHUB_FEATURED_REPO`  | Pin the "currently building" repo| optional |
| `PORT`                  | Local API server port            | optional |

## License

[MIT](./LICENSE) © Varun Prakash
