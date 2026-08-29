import { useRef } from "react";
import { useScroll } from "../lib/useScroll";
import styles from "./Ambient.module.css";

/**
 * The environment — layers behind and above the content that make the
 * page feel like a continuous dark space rather than a flat canvas.
 *  - Behind: a soft top light and a muted green atmosphere, drifting a
 *    few pixels as the user scrolls.
 *  - Above: a whisper of film grain for depth.
 * All layers are decorative, still under reduced motion.
 */
export function Ambient() {
  const glowRef = useRef<HTMLDivElement>(null);

  useScroll((p) => {
    if (glowRef.current) glowRef.current.style.transform = `translateY(${(p * -50).toFixed(1)}px)`;
  });

  return (
    <>
      <div className={styles.backdrop} aria-hidden="true">
        <div ref={glowRef} className={styles.glow} />
        <div className={styles.light} />
      </div>
      <div className={styles.noise} aria-hidden="true" />
    </>
  );
}