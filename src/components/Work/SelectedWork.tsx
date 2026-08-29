import { selectedProjects, type Project } from "../../data/projects";
import { site } from "../../data/site";
import { Reveal } from "../Reveal";
import { ProjectMotif } from "./ProjectMotif";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  const featured = selectedProjects.slice(0, 3);
  const compact = selectedProjects.slice(3);

  return (
    <section className={styles.section} aria-label="Selected projects">
      <div className={`container ${styles.inner}`}>
        <Reveal as="p" variant="fade" className={`label ${styles.label}`}>
          Selected projects
        </Reveal>

        <div className={styles.grid}>
          {featured.map((p, i) => (
            <Reveal as="div" variant="rise" delay={60 + i * 70} key={p.id}>
              <ProjectCard project={p} featured={true} />
            </Reveal>
          ))}
          {compact.map((p, i) => (
            <Reveal as="div" variant="rise" delay={60 + i * 70} key={p.id}>
              <ProjectCard project={p} featured={false} />
            </Reveal>
          ))}

          <Reveal as="div" variant="rise" delay={60 + compact.length * 70}>
            <a className={`${styles.card} ${styles.cardCompact} ${styles.moreCard}`} href={site.links.github} target="_blank" rel="noreferrer">
              <div className={styles.link}>
                <p className={styles.moreTitle}>More on GitHub</p>
                <p className={styles.moreDesc}>Every experiment, commit, and repository in one place.</p>
                <span className={styles.open}>
                  View profile
                  <span aria-hidden="true">↗</span>
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <article className={`${styles.card} ${featured ? styles.cardFeatured : styles.cardCompact}`}>
      <a
        className={styles.link}
        href={project.github}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.name} — ${project.description} — GitHub repository`}
      >
        {project.motif && (
          <div className={styles.motif} aria-hidden="true">
            <ProjectMotif kind={project.motif} />
          </div>
        )}

        <div className={styles.body}>
          <div className={styles.metaLine}>
            <h3 className={styles.name}>{project.name}</h3>
            <span className={styles.year}>{project.year}</span>
          </div>
          <p className={styles.desc}>{project.description}</p>
          <p className={styles.tags}>{project.tags.join(" · ")}</p>
        </div>

        <span className={styles.open} aria-hidden="true">
          GitHub
          <span>↗</span>
        </span>
      </a>
    </article>
  );
}