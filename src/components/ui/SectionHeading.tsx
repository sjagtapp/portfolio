import { type ReactNode } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  /** Two-digit section number shown in the code-comment label, e.g. "01". */
  index: string;
  eyebrow: string;
  /** Short, bold, set in uppercase — e.g. "What I do". */
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** `// 01 · services` label, a big uppercase title over a soft blue glow, and an optional intro line. */
export function SectionHeading({ id, index, eyebrow, title, children, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("relative max-w-3xl", className)}>
      <span aria-hidden="true" className="orb animate-breathe -left-16 -top-10 h-44 w-72 opacity-50" />
      <p className="relative flex items-center gap-3 font-mono text-[13px] text-accent-ink">
        <span>
          <span className="text-ink-subtle">{"//"}</span> {index} · {eyebrow.toLowerCase()}
        </span>
        <span aria-hidden="true" className="h-px w-16 bg-gradient-to-r from-accent-ink/70 to-transparent" />
      </p>
      <h2 id={id} className="relative mt-4 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-balance sm:text-6xl">
        {title}
      </h2>
      {children ? <p className="relative mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted text-pretty">{children}</p> : null}
    </Reveal>
  );
}
