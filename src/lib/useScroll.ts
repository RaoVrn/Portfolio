import { useEffect, useRef } from "react";

/** Tracks whether the user prefers reduced motion. */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
}

/**
 * Runs a callback with the normalized scroll progress (0 → 1) on every
 * animation frame. Skips entirely when reduced motion is preferred.
 * Mutates DOM refs directly to avoid re-renders.
 */
export function useScroll(cb: (progress: number) => void) {
  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let raf = 0;
    const loop = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      cbRef.current(p);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
}