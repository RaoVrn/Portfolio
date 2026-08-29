import { skillGroups } from "../data/skills";
import { Reveal } from "./Reveal";
import styles from "./SkillsSection.module.css";

export function SkillsSection() {
  return (
    <section className={styles.section} aria-labelledby="skills-heading">
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <Reveal as="p" variant="fade" className={`label ${styles.label}`}>
            What I work with
          </Reveal>

          <Reveal as="h2" variant="rise" delay={60} className={styles.heading} id="skills-heading">
            The tools behind the work.
          </Reveal>
        </header>

        <div className={styles.groups}>
          {skillGroups.map((group, i) => (
            <Reveal as="div" variant="rise" delay={80 + i * 70} key={group.group}>
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>{group.group}</h3>
                <p className={styles.items}>{group.items.join(" · ")}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}