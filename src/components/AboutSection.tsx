import { about } from "../data/about";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.leftCol}>
          <SectionHeader
            label={about.label}
            heading={about.heading}
            support={about.intro}
            headingId="about-heading"
          />

          <Reveal as="p" variant="fade" delay={200} className={styles.line}>
            {about.capabilitiesLine}
          </Reveal>

          <Reveal as="p" variant="fade" delay={260} className={styles.education}>
            {about.education}
          </Reveal>
        </div>

        <div className={styles.map} role="list" aria-label="Engineering capabilities">
          {about.capabilities.map((c, i) => (
            <Reveal as="div" variant="rise" delay={80 + i * 60} key={c.number}>
              <div className={`${styles.card} ${i === 0 ? styles.cardFull : ""}`}>
                <span className={styles.node} aria-hidden="true" />
                <p className={styles.cardMeta}>{c.number}</p>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardDesc}>{c.description}</p>
                <p className={styles.cardSkills}>{c.skills.join(" · ")}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}