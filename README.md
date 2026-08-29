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
  data/
    site.ts             # site content & configuration
    projects.ts         # Work chapter — verified project data (single source of truth)
  lib/
    useInView, useScroll, useMagnetic, useCanvasLoop hooks
  styles/
    tokens.css          # design tokens — color, type, space, motion
    base.css            # reset, base styles, shared primitives
  components/
    Header, Footer, Contents, SkipLink, ScrollProgress, Reveal
    Ambient             # layered atmosphere: grid, light, glow, grain
    Hero/               # typographic poster hero + registration outline layer
    Work/               # Work chapter: FeaturedProject (PANDA flagship,
                        #   live-screenshot preview as a link) + SelectedWork
```

## Design system

A noir editorial system: warm charcoal environment (`--bg`), warm off-white
text (`--text-1`), one muted sage accent (`--accent`). Type: Instrument Serif
(display), Instrument Sans (body/UI), Geist Mono (sparse metadata).

Signature motifs: the **print-registration outline treatment** (hero name,
Contents/Contact headings) and the **framed artwork zones** that carry each
featured project's generative visual. All tokens live in `src/styles/tokens.css`;
content lives in `src/data/`.

## Adding real project links / images

`src/data/projects.ts` exposes optional `github`, `live` and `image` fields on
each project. They are intentionally undefined until a real URL or screenshot
exists — the Work UI already knows how to render them when populated.