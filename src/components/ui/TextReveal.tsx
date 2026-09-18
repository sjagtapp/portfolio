"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
  /** Words to render with the gold gradient (case-insensitive match). */
  highlight?: string[];
  as?: "h1" | "h2" | "p" | "span";
  id?: string;
}

/**
 * Word-by-word reveal: each word slides up out of an overflow-hidden mask.
 * Screen readers get the full sentence via aria-label; the visual words are aria-hidden.
 */
export function TextReveal({ text, className, delay = 0, stagger = 0.06, highlight = [], as = "h1", id }: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Tag = as;
  const highlightSet = new Set(highlight.map((w) => w.toLowerCase().replace(/[^\w]/g, "")));

  return (
    <Tag id={id} className={cn("text-balance", className)} aria-label={text}>
      {words.map((word, i) => {
        const isGold = highlightSet.has(word.toLowerCase().replace(/[^\w]/g, ""));
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom" aria-hidden="true">
            <motion.span
              className={cn("inline-block will-change-transform", isGold && "text-gold-gradient")}
              initial={reduce ? false : { y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
