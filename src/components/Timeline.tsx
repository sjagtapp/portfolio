"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Vertical timeline whose gold spine draws itself as you scroll past it.
 * Each entry fades in from its side. The spine is a scaleY transform driven
 * by scroll progress — no layout work per frame.
 */
export function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  const scaleY = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative space-y-10 md:space-y-14">
      <span aria-hidden="true" className="absolute left-[11px] top-2 bottom-2 w-px bg-line-strong md:left-1/2 md:-translate-x-1/2" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : scaleY }}
        className="absolute left-[11px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-gold-soft via-gold to-gold/20 md:left-1/2 md:-translate-x-1/2"
      />
      {children}
    </ol>
  );
}

interface TimelineItemProps {
  index: number;
  children: ReactNode;
  /** Which side of the spine the content sits on (desktop). Alternates by default. */
  side?: "left" | "right";
  /** Mono label shown opposite the content (e.g. a date range). */
  marker?: ReactNode;
}

export function TimelineItem({ index, children, side, marker }: TimelineItemProps) {
  const reduce = useReducedMotion();
  const s = side ?? (index % 2 === 0 ? "left" : "right");
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, x: s === "left" ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-10 md:grid md:grid-cols-2 md:gap-16 md:pl-0"
    >
      {/* dot on the spine */}
      <span aria-hidden="true" className="absolute left-0 top-1.5 grid h-6 w-6 place-items-center md:left-1/2 md:-translate-x-1/2">
        <span className="absolute h-6 w-6 rounded-full border border-gold/30" />
        <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_16px_rgba(201,162,74,0.8)]" />
      </span>

      {/* marker (date) — above content on mobile, opposite column on desktop */}
      <div className={cn("mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold md:mb-0 md:row-start-1 md:pt-2", s === "left" ? "md:col-start-2" : "md:col-start-1 md:text-right")}>
        {marker}
      </div>

      {/* content */}
      <div className={cn("md:row-start-1", s === "left" ? "md:col-start-1" : "md:col-start-2")}>{children}</div>
    </motion.li>
  );
}
