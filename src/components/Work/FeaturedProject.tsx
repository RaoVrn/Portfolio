import type { Project } from "../../data/projects";
import { Reveal } from "../Reveal";
import styles from "./FeaturedProject.module.css";

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className={styles.project} id={project.id} aria-labelledby="project-panda">
      <Reveal as="p" variant="fade" className={`label ${styles.eyebrow}`}>
        01 — Featured project
      </Reveal>

      <div className={styles.grid}>
        <header className={styles.header}>
          <div className={styles.titleWrap}>
            <Reveal as="p" variant="fade" className={styles.titleGhost} aria-hidden="true">
              {project.name}
            </Reveal>
            <Reveal as="h3" variant="line" delay={60} className={styles.name} id="project-panda">
              {project.name}
            </Reveal>
          </div>

          <Reveal as="p" variant="rise" delay={160} className={styles.tagline}>
            Git, made visual.
          </Reveal>

          <Reveal as="p" variant="rise" delay={240} className={styles.description}>
            {project.shortDescription}
          </Reveal>

          <Reveal as="dl" variant="rise" delay={320} className={styles.details}>
            <div className={styles.detail}>
              <dt>Scope</dt>
              <dd>45 lessons · 6 modules</dd>
            </div>
            <div className={styles.detail}>
              <dt>Stack</dt>
              <dd>{project.technologies.join(" · ")}</dd>
            </div>
            <div className={styles.detail}>
              <dt>Status</dt>
              <dd>
                <span className={styles.live} aria-hidden="true" />
                Live
              </dd>
            </div>
          </Reveal>

          <Reveal as="div" variant="rise" delay={400} className={styles.actions}>
            <a className={styles.actionPrimary} href={project.live} target="_blank" rel="noreferrer">
              View live
              <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.actionGhost} href={project.github} target="_blank" rel="noreferrer">
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </header>

        <Reveal as="div" variant="fade" delay={260} className={styles.previewWrap}>
          <a
            className={styles.preview}
            href={project.live}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the live PANDA project in a new tab"
          >
            <span className={styles.previewHalo} aria-hidden="true" />
            {project.image && (
              <img
                src={project.image.src}
                alt=""
                className={styles.previewImg}
                loading="lazy"
              />
            )}
            <span className={styles.previewHint} aria-hidden="true">
              Open live project
              <span>↗</span>
            </span>
            <span className={styles.previewBar}>
              <span className={styles.previewDot} aria-hidden="true" />
              panda · live
            </span>
          </a>
          <span className={styles.previewLabel} aria-hidden="true">
            panda → live dashboard
          </span>
        </Reveal>
      </div>
    </article>
  );
}