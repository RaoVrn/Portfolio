import { featuredProject } from "../../data/projects";
import { SectionHeader } from "../SectionHeader";
import { FeaturedProject } from "./FeaturedProject";
import { SelectedWork } from "./SelectedWork";
import styles from "./WorkSection.module.css";

export function WorkSection() {
  return (
    <section className={styles.section} id="work" aria-labelledby="work-heading">
      <div className={`container ${styles.intro}`}>
        <SectionHeader
          label="Work"
          heading="Selected work."
          support="A selection of products, experiments, and systems I've built."
          headingId="work-heading"
        />
      </div>

      <div className={`container ${styles.featured}`}>
        <FeaturedProject project={featuredProject} />
      </div>

      <SelectedWork />
    </section>
  );
}