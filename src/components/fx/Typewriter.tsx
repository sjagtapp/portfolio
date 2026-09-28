"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

interface TypewriterProps {
  words: readonly string[];
  className?: string;
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
}

/** Types each word, pauses, deletes it, moves on. Screen readers get the full list instead. */
export function Typewriter({ words, className, typeMs = 70, deleteMs = 35, holdMs = 1600 }: TypewriterProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[index % words.length];
    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && text === word) delay = holdMs;

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words, reduce, typeMs, deleteMs, holdMs]);

  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {reduce ? words[0] : text}
        <span className="caret" />
      </span>
    </span>
  );
}
