import { experience } from "../data/experience";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import styles from "./ExperienceSection.module.css";

export function ExperienceSection() {
  return (
    <section className={styles.section} id="experience" aria-labelledby="experience-heading">
      <div className={`container ${styles.inner}`}>
        <SectionHeader
          className={styles.header}
          label="Experience"
          heading="Where I've learned and contributed."
          support="A quick overview of the teams and environments where I've built software."
          headingId="experience-heading"
        />

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