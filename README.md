# Varun Prakash — Portfolio

A personal software engineering portfolio. Built with React, TypeScript and Vite.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
npm run lint     # oxlint
```

## Architecture

```
src/
  data/site.ts          # content & configuration (single source of truth)
  lib/                  # useInView, useScroll, useMagnetic hooks
  styles/
    tokens.css          # design tokens — color, type, space, motion
    base.css            # reset, base styles, shared primitives
  components/
    Header, Footer, Contents, SkipLink, ScrollProgress, Reveal
    Hero/               # typographic poster hero + registration outline layer
```

## Design system

A noir editorial system: warm charcoal environment (`--bg`), warm off-white
text (`--text-1`), one muted sage accent (`--accent`). Type: Instrument Serif
(display), Instrument Sans (body/UI), Geist Mono (sparse metadata).

The **print-registration treatment** — an offset outline copy of the name that
drifts against the cursor — is the portfolio's signature motif; it recurs in
the Contents and Contact headings. All tokens live in `src/styles/tokens.css`;
content lives in `src/data/site.ts`.