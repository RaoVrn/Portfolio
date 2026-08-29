import { about } from "../data/about";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-heading">
      <div className={`container ${styles.inner}`}>
        <SectionHeader
          className={styles.header}
          label="About"
          heading={about.headline}
          support={about.intro}
          headingId="about-heading"
          size="statement"
        />

        <div className={styles.side}>
          <Reveal as="div" variant="rise" delay={160} className={styles.block}>
            <p className={styles.blockLabel}>How I like to build</p>
            <ol className={styles.steps}>
              {about.buildSteps.map((step, i) => (
                <li key={step} className={styles.step}>
                  <span className={styles.stepNum} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.stepText}>{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal as="div" variant="rise" delay={240} className={styles.block}>
            <p className={styles.blockLabel}>Education</p>
            <div className={styles.education}>
              <p className={styles.school}>{about.education.school}</p>
              <p className={styles.degree}>{about.education.degree}</p>
              <p className={styles.edMeta}>
                {about.education.detail} · {about.education.period} · {about.education.location}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}