# Varun Prakash — Portfolio

A premium personal product site. Built with React, TypeScript and Vite.

## Development

```bash
npm install
npm run dev       # starts the API server (port 3001) and Vite together
npm run dev:web   # Vite only
npm run dev:api   # API server only
npm run build     # type-check + production build
npm run lint      # oxlint
```

## Contact form

The contact modal submits to `POST /api/contact`:

- **Local dev**: `server/index.js` (Express, port 3001) — Vite proxies `/api` to it.
- **Vercel**: `api/contact.js` is a serverless function that delegates to the same shared handler (`server/contact.js`).

Email delivery uses Resend. Required environment variables (never expose `RESEND_API_KEY` to the client):

```
RESEND_API_KEY=re_...
RESEND_FROM=Portfolio <onboarding@resend.dev>
CONTACT_EMAIL=prakash.varun.0305@gmail.com
```

Copy real values into `.env.local` (gitignored); `.env.example` holds the template.

## Architecture

```
src/
  data/
    site.ts             # site content & configuration
    projects.ts         # projects, in three tiers (featured / selected / compact)
    experience.ts       # work experience snapshot
    skills.ts           # what I work with
  lib/
    useInView, useScroll, useMagnetic hooks
  styles/
    tokens.css          # design tokens — color, type, space, motion
    base.css            # reset, base styles, shared primitives
  components/
    Header, Footer, ExperienceSection, SkillsSection, AboutSection,
    SkipLink, ScrollProgress, Reveal, Ambient
    Hero/               # short hero + CommandCard visual
    Work/               # Panda flagship + bento project grid (ProjectMotif)
```

## Design system

Dark graphite environment (`--bg`), warm off-white text, one muted sage
accent (`--accent`). Sans-first typography (Instrument Sans); the serif is
reserved for the Panda centerpiece and the About statement. All tokens live
in `src/styles/tokens.css`; content lives in `src/data/`.

The live Panda screenshot lives in `public/images/panda-hero.png` and the
entire Panda preview links to the live application.