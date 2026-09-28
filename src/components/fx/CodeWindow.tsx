"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TokenKind = "kw" | "key" | "str" | "bool" | "punc" | "plain";
export type CodeLine = { text: string; kind: TokenKind }[];

const colors: Record<TokenKind, string> = {
  kw: "text-code-kw",
  key: "text-code-key",
  str: "text-code-str",
  bool: "text-code-bool",
  punc: "text-code-punc",
  plain: "text-ink-muted",
};

/** Splits every token into its typed part and the not-yet-typed rest, and marks where the caret sits. */
function layout(lines: CodeLine[], shown: number) {
  let budget = shown;
  let caretPlaced = false;
  const out = lines.map((line) => {
    const tokens = line.map((tok) => {
      const visible = Math.max(0, Math.min(tok.text.length, budget));
      budget -= tok.text.length;
      const rest = tok.text.slice(visible);
      const caret = !caretPlaced && rest.length > 0;
      if (caret) caretPlaced = true;
      return { kind: tok.kind, done: tok.text.slice(0, visible), rest, caret };
    });
    budget -= 1; // the line break
    return tokens;
  });
  return { lines: out, caretAtEnd: !caretPlaced };
}

interface CodeWindowProps {
  lines: CodeLine[];
  filename: string;
  className?: string;
  /** ms per character */
  speed?: number;
  startDelay?: number;
}

/**
 * A small editor window that types out syntax-highlighted code once it scrolls
 * into view. Untyped characters stay in the layout (invisible), so the window
 * never changes size while typing.
 */
export function CodeWindow({ lines, filename, className, speed = 28, startDelay = 700 }: CodeWindowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();
  const total = lines.reduce((n, l) => n + l.reduce((m, t) => m + t.text.length, 0) + 1, 0);
  const [typed, setTyped] = useState(0);
  const shown = reduce ? total : typed;

  useEffect(() => {
    if (!inView || reduce) return;
    let n = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        n += 1;
        setTyped(n);
        if (n >= total && interval) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [inView, reduce, total, speed, startDelay]);

  const rendered = layout(lines, shown);

  return (
    <div ref={ref} className={cn("overflow-hidden rounded-xl border border-line bg-[#0c0c0f]/95 shadow-soft", className)}>
      <div className="flex items-center gap-2 border-b border-line px-3.5 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-2 font-mono text-[11px] text-ink-subtle">{filename}</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-[1.7] sm:text-[13px]">
        <code>
          {rendered.lines.map((line, li) => (
            <span key={li} className="block">
              <span className="mr-4 inline-block w-4 select-none text-right text-ink-subtle/60">{li + 1}</span>
              {line.map((tok, ti) => (
                <span key={ti} className={colors[tok.kind]}>
                  {tok.done}
                  {tok.caret ? <span className="caret" aria-hidden="true" /> : null}
                  {tok.rest ? <span className="opacity-0">{tok.rest}</span> : null}
                </span>
              ))}
              {rendered.caretAtEnd && li === rendered.lines.length - 1 ? <span className="caret" aria-hidden="true" /> : null}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
