import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** id of the heading element inside (for aria-labelledby). */
  labelledBy?: string;
  /** Draw the gold hairline at the top. */
  divider?: boolean;
}

/** Semantic section wrapper with consistent vertical rhythm. */
export function Section({ id, children, className, labelledBy, divider = true }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy ?? `${id}-title`} className={cn("relative py-24 md:py-32", className)}>
      {divider ? <div aria-hidden="true" className="gold-line absolute inset-x-0 top-0" /> : null}
      <div className="container-x">{children}</div>
    </section>
  );
}
