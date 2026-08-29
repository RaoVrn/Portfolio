import { experiments, selectedProjects, type Project } from "../../data/projects";
import { Reveal } from "../Reveal";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  return (
    <section className={styles.section} aria-labelledby="selected-work-heading">
      <div className={`container ${styles.inner}`}>
        <Reveal as="p" variant="fade" className={`label ${styles.eyebrow}`}>
          02 — Selected projects
        </Reveal>
        <h3 className="sr-only" id="selected-work-heading">
          Selected projects
        </h3>

        <ol className={styles.list}>
          {selectedProjects.map((p, i) => (
            <ProjectRow key={p.id} project={p} number={i + 2} />
          ))}
        </ol>

        <Reveal as="p" variant="fade" className={`label ${styles.groupLabel}`}>
          Experiments
        </Reveal>

        <ol className={styles.list}>
          {experiments.map((p, i) => (
            <ProjectRow key={p.id} project={p} number={selectedProjects.length + 2 + i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProjectRow({ project, number }: { project: Project; number: number }) {
  return (
    <Reveal as="li" variant="rise" delay={60 + number * 40} key={project.id}>
      <a
        className={styles.row}
        href={project.github}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.name} — ${project.shortDescription} — GitHub repository`}
      >
        <span className={styles.num} aria-hidden="true">
          {String(number).padStart(2, "0")}
        </span>

        <div className={styles.rowMain}>
          <h3 className={styles.name}>{project.name}</h3>
          <p className={styles.note}>{project.shortDescription}</p>
          <p className={styles.tech} aria-hidden="true">
            {project.technologies.join(" · ")}
          </p>
        </div>

        <div className={styles.rowSide}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.year}>{project.year}</span>
        </div>

        <span className={styles.arrow} aria-hidden="true">
          ↗
        </span>
      </a>
    </Reveal>
  );
}