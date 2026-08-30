import { useRef, useState } from "react";
import { arsenal } from "../data/arsenal";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TechIcon } from "./TechIcon";
import styles from "./Arsenal.module.css";

export function Arsenal() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const category = arsenal[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? (active + 1) % arsenal.length
        : (active - 1 + arsenal.length) % arsenal.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className={styles.section} id="arsenal" aria-labelledby="arsenal-heading">
      <div className="container">
        <SectionHeading
          index="05"
          label="Technical arsenal"
          heading={
            <>
              The stack I <em>build with.</em>
            </>
          }
          support="Everything here has shipped in a real project, internship, or certification."
          headingId="arsenal-heading"
        />

        <Reveal as="div" variant="rise" delay={120} className={styles.body}>
          <div className={styles.tabs} role="tablist" aria-label="Technology categories" onKeyDown={onKeyDown}>
            {arsenal.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={i === active}
                aria-controls="arsenal-panel"
                tabIndex={i === active ? 0 : -1}
                className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
                onClick={() => setActive(i)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <ul
            className={styles.grid}
            role="tabpanel"
            id="arsenal-panel"
            aria-labelledby={`tab-${category.id}`}
            key={category.id}
          >
            {category.items.map((item) => (
              <li key={item.name} className={styles.item}>
                <div className={styles.itemHead}>
                  <TechIcon name={item.name} className={styles.itemIcon} />
                  <span className={styles.itemName}>{item.name}</span>
                </div>
                <p className={styles.itemTag}>{item.tag}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}