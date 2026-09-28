"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance to rise from, in px. */
  y?: number;
}

/** Fades, un-blurs and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  // transitionEnd drops the filter once done, so settled cards don't keep an extra compositing layer.
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE }, transitionEnd: { filter: "none" } },
};

const containers = { ul: motion.ul, ol: motion.ol, div: motion.div };
const items = { li: motion.li, div: motion.div };

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof containers;
}

/** Reveals its <StaggerItem> children one after another. */
export function Stagger({ children, className, as = "ul" }: StaggerProps) {
  const reduce = useReducedMotion();
  const Comp = containers[as];
  return (
    <Comp
      className={className}
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className, as = "li" }: { children: ReactNode; className?: string; as?: keyof typeof items }) {
  const Comp = items[as];
  return (
    <Comp className={className} variants={item}>
      {children}
    </Comp>
  );
}
