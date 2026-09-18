"use client";

import { useCallback, useRef } from "react";
import { useFinePointer } from "./useFinePointer";

interface MagneticOptions {
  /** How far the element follows the cursor (0–1). */
  strength?: number;
  /** Radius in px around the element where the pull starts. */
  radius?: number;
}

/**
 * Magnetic hover: the element eases toward the cursor while it is nearby,
 * then springs back. Transform-only, no layout work, rAF-throttled.
 */
export function useMagnetic<T extends HTMLElement>({ strength = 0.35, radius = 90 }: MagneticOptions = {}) {
  const ref = useRef<T>(null);
  const frame = useRef<number | null>(null);
  const fine = useFinePointer();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!fine || !ref.current) return;
      const el = ref.current;
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const pull = Math.max(0, 1 - dist / (radius + Math.max(rect.width, rect.height)));
        el.style.transition = "transform 0.15s ease-out";
        el.style.transform = `translate3d(${dx * strength * pull}px, ${dy * strength * pull}px, 0)`;
      });
    },
    [fine, radius, strength],
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    ref.current.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    ref.current.style.transform = "translate3d(0,0,0)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
