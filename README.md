# Varun Prakash — Portfolio

A premium personal product site. Built with React, TypeScript and Vite.

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
    projects.ts         # projects, in three tiers (featured / selected / compact)
    experience.ts       # work experience snapshot
    skills.ts           # what I work with
  lib/
    useInView, useScroll, useMagnetic, useCanvasLoop hooks
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