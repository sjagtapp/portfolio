"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const LINES = ["$ next build", "  ▲ compiling components", "  ✓ optimizing fonts, images, motion", "  ✓ ready in 412ms"];
const KEY = "portfolio:loaded";

/**
 * Elegant, short (≈1.3s) developer-themed loader. Shows once per session,
 * never for users who prefer reduced motion, and never blocks longer than
 * the timer — the page underneath is already rendered.
 */
export function LoadingScreen() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === "1"; } catch {}
    if (seen || reduce) return;
    setShow(true);
    document.body.classList.add("is-loading");
    const timers = LINES.map((_, i) => setTimeout(() => setStep(i + 1), 180 + i * 220));
    const done = setTimeout(() => {
      setShow(false);
      document.body.classList.remove("is-loading");
      try { sessionStorage.setItem(KEY, "1"); } catch {}
    }, 1350);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); document.body.classList.remove("is-loading"); };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-bg"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            className="w-[min(92vw,420px)] font-mono text-[13px] leading-7 text-fg-muted"
            exit={{ y: -12, opacity: 0, transition: { duration: 0.3 } }}
          >
            <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-ring" />
              {site.handle}@portfolio
            </div>
            {LINES.slice(0, step).map((line, i) => (
              <motion.div key={line} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className={i === 0 ? "text-fg" : ""}>
                {line}
              </motion.div>
            ))}
            {step < LINES.length ? <span className="inline-block h-4 w-2 translate-y-0.5 bg-gold animate-blink" /> : null}
            <motion.div className="mt-5 h-px w-full origin-left bg-gold/70" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.15, ease: "easeInOut" }} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
