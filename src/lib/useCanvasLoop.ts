import { useEffect, useRef } from "react";

export interface CanvasLoopArgs {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** Milliseconds since page load. */
  t: number;
  /** False under prefers-reduced-motion (draw one static frame). */
  animated: boolean;
  fine: boolean;
  ptrX: number;
  ptrY: number;
}

/**
 * Runs a draw function on a canvas every animation frame while it is
 * visible. Handles DPR, resize, visibility, reduced motion and an
 * optional pointer position. The draw function is stored in a ref so
 * callers can close over state without re-subscribing.
 */
export function useCanvasLoop(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  draw: (a: CanvasLoopArgs) => void,
  opts: { trackPointer?: boolean } = {}
) {
  const drawRef = useRef(draw);

  useEffect(() => {
    drawRef.current = draw;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const track = !!opts.trackPointer && fine;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ptr = { x: -9999, y: -9999 };

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (w === 0 || h === 0) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (t: number, animated: boolean) => {
      if (w === 0 || h === 0) return;
      drawRef.current({ ctx, w, h, t, animated, fine, ptrX: ptr.x, ptrY: ptr.y });
    };

    const frame = (t: number) => {
      if (!running) return;
      render(t, true);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !visible) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      ptr.x = e.clientX - rect.left;
      ptr.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      ptr.x = -9999;
      ptr.y = -9999;
    };

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else if (visible) {
        start();
      }
    };

    const onResize = () => {
      init();
      if (reduced) render(0, false);
    };

    init();

    if (reduced) {
      render(0, false);
    } else {
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) {
            start();
          } else {
            stop();
          }
        },
        { threshold: 0 }
      );
      io.observe(canvas);
      start();

      if (track) {
        canvas.addEventListener("pointermove", onMove, { passive: true });
        canvas.addEventListener("pointerleave", onLeave);
      }
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);

      return () => {
        io.disconnect();
        stop();
        if (track) {
          canvas.removeEventListener("pointermove", onMove);
          canvas.removeEventListener("pointerleave", onLeave);
        }
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
      };
    }

    return () => {
      stop();
    };
  }, [canvasRef, opts.trackPointer]);
}