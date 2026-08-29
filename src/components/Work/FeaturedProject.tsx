import type { Project } from "../../data/projects";
import { Reveal } from "../Reveal";
import styles from "./FeaturedProject.module.css";

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className={styles.project} id={project.id} aria-labelledby="project-panda">
      <div className={styles.grid}>
        <header className={styles.header}>
          <Reveal as="p" variant="fade" className={`label ${styles.eyebrow}`}>
            Featured project
          </Reveal>

          <Reveal as="h3" variant="line" delay={60} className={styles.name} id="project-panda">
            Panda
          </Reveal>

          <Reveal as="p" variant="rise" delay={140} className={styles.tagline}>
            Git, made visual.
          </Reveal>

          <Reveal as="p" variant="rise" delay={220} className={styles.description}>
            {project.description}
          </Reveal>

          <Reveal as="p" variant="fade" delay={300} className={styles.tech}>
            {project.tags?.join(" · ")}
          </Reveal>

          <Reveal as="div" variant="rise" delay={360} className={styles.actions}>
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

        <Reveal as="div" variant="fade" delay={240} className={styles.previewWrap}>
          <a
            className={styles.preview}
            href={project.live}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the live Panda project in a new tab"
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
        </Reveal>
      </div>
    </article>
  );
}