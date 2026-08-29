import { useRef } from "react";
import { useScroll } from "../lib/useScroll";
import styles from "./ScrollProgress.module.css";

/** Thin reading-progress bar along the top edge. */
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useScroll((p) => {
    if (fillRef.current) {
      fillRef.current.style.transform = `scaleX(${p})`;
    }
  });

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div ref={fillRef} className={styles.fill} />
    </div>
  );
}