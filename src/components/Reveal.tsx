import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView } from "../lib/useInView";

export type RevealVariant = "fade" | "rise" | "line";

interface RevealProps {
  as?: ElementType;
  variant?: RevealVariant;
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
  id?: string;
  children?: ReactNode;
}

/**
 * Scroll-triggered reveal primitive.
 *  - "rise":  gentle translate + fade (default)
 *  - "fade":  pure opacity
 *  - "line":  masked editorial slide-up
 */
export function Reveal({ as, variant = "rise", delay = 0, className, id, children }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal={inView ? "in" : "out"}
      data-variant={variant}
      style={{ "--rd": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}