import { experience } from "../data/experience";
import { Reveal } from "./Reveal";
import styles from "./ExperienceSection.module.css";

export function ExperienceSection() {
  return (
    <section className={styles.section} id="experience" aria-labelledby="experience-heading">
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <Reveal as="p" variant="fade" className={`label ${styles.label}`}>
            Experience
          </Reveal>

          <Reveal as="h2" variant="rise" delay={60} className={styles.heading} id="experience-heading">
            Where I've learned and contributed.
          </Reveal>

          <Reveal as="p" variant="rise" delay={140} className={styles.support}>
            A quick overview of the teams and environments where I've built
            software.
          </Reveal>
        </header>

        <ol className={styles.list}>
          {experience.map((e, i) => (
            <Reveal as="li" variant="rise" delay={80 + i * 70} key={e.company}>
              <div className={styles.row}>
                <div className={styles.main}>
                  <h3 className={styles.company}>{e.company}</h3>
                  <p className={styles.role}>{e.role}</p>
                  <p className={styles.focus}>{e.focus}</p>
                  <p className={styles.tags}>{e.tags.join(" · ")}</p>
                </div>

                <p className={styles.period}>{e.period}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}