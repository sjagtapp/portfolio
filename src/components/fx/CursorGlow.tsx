"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/** A soft blue light that trails the mouse across the page. Desktop mouse only; off with reduced motion. */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(useMotionValue(-600), { stiffness: 120, damping: 25 });
  const y = useSpring(useMotionValue(-600), { stiffness: 120, damping: 25 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
      setEnabled(true);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.09),transparent_60%)]"
    />
  );
}
