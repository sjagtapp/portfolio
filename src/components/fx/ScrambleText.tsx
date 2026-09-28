"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

/**
 * "Decodes" the text on first render: random glyphs resolve left to right into
 * the real characters. The server renders the final text, so it's readable
 * without JavaScript and for search engines.
 */
export function ScrambleText({ text, className, delay = 250, duration = 1100 }: { text: string; className?: string; delay?: number; duration?: number }) {
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(progress * text.length);
      setOutput(
        text
          .split("")
          .map((ch, i) => (i < revealed || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => (frame = requestAnimationFrame(tick)), delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [text, reduce, delay, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
