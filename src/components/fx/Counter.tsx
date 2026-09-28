"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const parse = (value: string) => value.match(/^(\D*)(\d+)(.*)$/);

/** Counts "10+" up from 0 when it scrolls into view. Non-numeric prefixes/suffixes are kept. */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const m = parse(value);
    if (!m || !inView || reduce) return;
    const controls = animate(0, Number(m[2]), {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCurrent(`${m[1]}${Math.round(v)}${m[3]}`),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {current}
    </span>
  );
}
