"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { staggerItem } from "./Reveal";

/** Child of <Stagger>. Fades and rises in sequence with its siblings. */
export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const Comp = motion[as];
  return (
    <Comp variants={staggerItem} className={className}>
      {children}
    </Comp>
  );
}
