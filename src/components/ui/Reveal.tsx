"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Seconds. */
  delay?: number;
  /** Pixels to rise from. */
  y?: number;
  className?: string;
  /** Animate once (default) or every time it enters the viewport. */
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "span";
}

/**
 * Scroll reveal. Content is rendered visible immediately when the user prefers
 * reduced motion, and animates from a slightly lower, transparent state otherwise.
 * Transform + opacity only → GPU composited.
 */
export function Reveal({ children, delay = 0, y = 24, className, once = true, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.8, delay, ease: [0.16, 1, 0.3, 1] } },
  };
  return (
    <Comp initial="hidden" whileInView="show" viewport={{ once, margin: "-10% 0px -10% 0px" }} variants={variants} className={className}>
      {children}
    </Comp>
  );
}

/** Staggers direct children Reveal-style. Wrap a list of items. */
export function Stagger({ children, className, stagger = 0.08 }: { children: ReactNode; className?: string; stagger?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
