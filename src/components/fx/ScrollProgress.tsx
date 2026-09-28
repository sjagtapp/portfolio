"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin glowing bar along the top edge showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-ink to-[#a5b4fc] shadow-[0_0_12px_rgb(var(--glow)/0.8)]"
    />
  );
}
