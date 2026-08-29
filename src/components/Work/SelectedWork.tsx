import { selectedProjects } from "../../data/projects";
import { site } from "../../data/site";
import { Reveal } from "../Reveal";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  return (
    <section className={styles.section} aria-label="Selected projects">
      <div className={`container ${styles.inner}`}>
        <ol className={styles.list}>
          {selectedProjects.map((p, i) => (
            <Reveal as="li" variant="rise" delay={60 + i * 60} key={p.id}>
              <a
                className={styles.row}
                href={p.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.name} — ${p.description} — GitHub repository`}
              >
                <span className={styles.num} aria-hidden="true">
                  {String(i + 2).padStart(2, "0")}
                </span>

                <div className={styles.main}>
                  <h3 className={styles.name}>{p.name}</h3>
                  <p className={styles.desc}>{p.description}</p>
                </div>

                <span className={styles.rowSide}>
                  <span className={styles.category}>{p.category}</span>
                  <span className={styles.year}>{p.year}</span>
                </span>

                <span className={styles.action}>
                  View project
                  <span aria-hidden="true">↗</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ol>

        <Reveal as="div" variant="fade" delay={200} className={styles.more}>
          <a href={site.links.github} target="_blank" rel="noreferrer">
            More on GitHub
            <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}