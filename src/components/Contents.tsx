import { chapters, current } from "../data/site";
import { Reveal } from "./Reveal";
import styles from "./Contents.module.css";

export function Contents() {
  return (
    <section className={styles.section} id="index" aria-labelledby="index-heading">
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <Reveal as="h2" variant="line" delay={80} className={styles.heading} id="index-heading">
            The <span className={styles.outlineWord}>contents</span>.
          </Reveal>
          <Reveal as="p" variant="rise" delay={200} className={styles.copy}>
            Four chapters — each designed and built by hand, the same way I
            build software.
          </Reveal>
        </header>

        <ol className={styles.map}>
          {chapters.map((c, i) => (
            <Reveal
              as="li"
              variant="rise"
              delay={120 + i * 90}
              key={c.id}
              id={c.id === "contact" ? undefined : c.id}
            >
              <div className={styles.row}>
                <span className={styles.num} aria-hidden="true">
                  {c.n}
                </span>
                <div className={styles.rowText}>
                  <h3 className={styles.rowTitle}>{c.title}</h3>
                  <p className={styles.rowNote}>{c.note}</p>
                </div>
                <span className={styles.rowArrow} aria-hidden="true">
                  →
                </span>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal as="aside" variant="rise" delay={200} className={styles.now}>
          <h3 className={styles.nowTitle}>Currently</h3>
          <ul className={styles.nowList}>
            {current.map((item) => (
              <li key={item.title} className={styles.nowItem}>
                <span className={styles.nowLabel}>{item.title}</span>
                <span className={styles.nowNote}>{item.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}