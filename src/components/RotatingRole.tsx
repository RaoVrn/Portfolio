import { useEffect, useState } from "react";
import styles from "./RotatingRole.module.css";

const ROLES = [
  "Full-Stack Developer",
  "AI Engineer",
  "Agentic AI Developer",
  "Intelligent Systems",
  "Automation & AI",
];

/**
 * Hero subtitle — the constant "Software Engineer" with a rotating
 * second role. Roles crossfade (fade out, slight rise, fade in)
 * every 3 seconds. The widest role is rendered invisibly as a
 * sentinel so the line never shifts horizontal. Under
 * prefers-reduced-motion the first role is shown statically.
 */
export function RotatingRole() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [display, setDisplay] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (reduced) return;
    let swap: number;
    const interval = window.setInterval(() => {
      setPhase("out");
      swap = window.setTimeout(() => {
        setDisplay((d) => (d + 1) % ROLES.length);
        setPhase("in");
      }, 240);
    }, 3000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(swap);
    };
  }, [reduced]);

  return (
    <span className={styles.role}>
      <span className={styles.constant}>Software Engineer</span>
      <span className={styles.sep} aria-hidden="true">·</span>
      <span className={styles.slot}>
        <span aria-hidden="true" className={styles.sentinel}>{ROLES[0]}</span>
        <span className={`${styles.rotating} ${reduced ? styles.reduced : phase === "out" ? styles.out : styles.in}`}>
          {ROLES[display]}
        </span>
      </span>
    </span>
  );
}