import { useEffect } from "react";

const MAX_PULL = 5;

/**
 * Subtle magnetic pull for elements marked with [data-magnetic].
 * Desktop + fine pointers only; ignored under reduced motion.
 */
export function useMagnetic() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));

    const onMove = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const pull = Math.min(1, dist / 120);
      const x = (dx / (dist || 1)) * MAX_PULL * pull;
      const y = (dy / (dist || 1)) * MAX_PULL * pull;
      el.style.transition = "transform 120ms cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    };

    const onLeave = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transition = "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform = "";
    };

    els.forEach((el) => {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    });

    return () => {
      els.forEach((el) => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);
}