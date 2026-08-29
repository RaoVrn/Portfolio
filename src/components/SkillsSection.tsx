import { focusAreas, skillGroups } from "../data/skills";
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

          <Reveal as="h2" variant="line" delay={60} className={styles.heading} id="skills-heading">
            Focused areas and the tools behind them.
          </Reveal>
        </header>

        <div className={styles.content}>
          <Reveal as="div" variant="rise" delay={120} className={styles.areas}>
            <ol className={styles.areaList}>
              {focusAreas.map((area, i) => (
                <li key={area.title} className={styles.area}>
                  <span className={styles.areaNum} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.areaMain}>
                    <h3 className={styles.areaTitle}>{area.title}</h3>
                    <p className={styles.areaDesc}>{area.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal as="div" variant="rise" delay={200} className={styles.groups}>
            <ul className={styles.groupList}>
              {skillGroups.map((group) => (
                <li key={group.group} className={styles.group}>
                  <h3 className={styles.groupTitle}>{group.group}</h3>
                  <p className={styles.groupItems}>{group.items.join(" · ")}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}