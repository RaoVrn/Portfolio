import { featuredProject } from "../../data/projects";
import { Reveal } from "../Reveal";
import { FeaturedProject } from "./FeaturedProject";
import { SelectedWork } from "./SelectedWork";
import styles from "./WorkSection.module.css";

export function WorkSection() {
  return (
    <section className={styles.section} id="work" aria-labelledby="work-heading">
      <div className={`container ${styles.intro}`}>
        <Reveal as="p" variant="fade" className={`label ${styles.label}`}>
          Work
        </Reveal>

        <Reveal as="h2" variant="rise" delay={60} className={styles.heading} id="work-heading">
          Things I've built.
        </Reveal>
      </div>

      <div className={`container ${styles.featured}`}>
        <FeaturedProject project={featuredProject} />
      </div>

      <SelectedWork />
    </section>
  );
}