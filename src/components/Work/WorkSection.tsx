import { featuredProject } from "../../data/projects";
import { Reveal } from "../Reveal";
import { FeaturedProject } from "./FeaturedProject";
import { SelectedWork } from "./SelectedWork";
import styles from "./WorkSection.module.css";

export function WorkSection() {
  return (
    <section className={styles.section} id="work" aria-labelledby="work-heading">
      <div className={`container ${styles.intro}`}>
        <Reveal as="span" variant="rule" delay={0} className={styles.rule} aria-hidden="true" />
        <Reveal as="p" variant="fade" className={`label ${styles.label}`}>
          Work
        </Reveal>

        <Reveal as="h2" variant="line" delay={80} className={styles.heading} id="work-heading">
          Things I've built while learning to build <span className={styles.outlineWord}>better</span> things.
        </Reveal>

        <Reveal as="p" variant="rise" delay={200} className={styles.support}>
          A curated collection — one flagship, and a handful of systems,
          experiments and applications built along the way.
        </Reveal>
      </div>

      <div className={`container ${styles.featured}`}>
        <FeaturedProject project={featuredProject} />
      </div>

      <SelectedWork />

      <div className={styles.handoff}>
        <Reveal as="p" variant="fade" className={styles.handoffLine}>
          That's how I build — by shipping, one project at a time.
        </Reveal>
        <Reveal as="div" variant="rise" delay={120}>
          <a href="#journey" className={styles.handoffLink}>
            The journey is next
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}