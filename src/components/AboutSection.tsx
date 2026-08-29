import { site } from "../data/site";
import { Reveal } from "./Reveal";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-heading">
      <div className={`container ${styles.inner}`}>
        <Reveal as="p" variant="fade" className={`label ${styles.label}`}>
          About
        </Reveal>

        <div className={styles.statement}>
          <Reveal as="p" variant="line" delay={80} className={styles.headline} id="about-heading">
            I'm a software developer interested in building practical products
            and exploring AI-powered applications.
          </Reveal>

          <Reveal as="p" variant="rise" delay={200} className={styles.copy}>
            I enjoy learning by building, whether that means experimenting with
            a new idea, creating a full-stack application, or improving a small
            developer experience.
          </Reveal>

          <Reveal as="p" variant="fade" delay={280} className={styles.exploring}>
            <span className={styles.exploringLabel}>Currently exploring</span>
            AI systems · Automation · Full-stack development · Agentic applications
          </Reveal>

          <Reveal as="p" variant="fade" delay={360} className={styles.meta}>
            B.Tech in Computer Science and Engineering, SRM Institute · {site.location}
          </Reveal>
        </div>
      </div>
    </section>
  );
}