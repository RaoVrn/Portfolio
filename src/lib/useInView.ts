import { useEffect, useState } from "react";

/**
 * Returns true once the element enters the viewport.
 * Fires a single time and respects reduced motion.
 */
export function useInView(ref: React.RefObject<HTMLElement | null>, rootMargin = "0px 0px -8% 0px") {
  const [inView, setInView] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, inView]);

  return inView;
}