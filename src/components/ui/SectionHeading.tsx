import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  /** Small mono label, e.g. "about". Rendered as "// about". */
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** id used by the parent <section aria-labelledby>. */
  id: string;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className, id }: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-12 md:mb-16 max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-gold mb-4">
        <span aria-hidden="true" className="text-fg-subtle">{"// "}</span>
        {eyebrow}
      </p>
      <h2 id={id} className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-balance">
        {title}
      </h2>
      {description ? <p className="mt-5 text-fg-muted text-base md:text-lg leading-relaxed max-w-prose">{description}</p> : null}
    </Reveal>
  );
}
