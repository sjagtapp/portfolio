"use client";

import { motion, useReducedMotion } from "motion/react";

/** A 1px glowing line that draws from left to right when it scrolls into view. */
export function DrawLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{ originX: 0 }}
    >
      <div className="h-px bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
    </motion.div>
  );
}
