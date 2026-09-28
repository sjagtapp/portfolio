import { cn } from "@/lib/utils";

interface PlaceholderProps {
  /** Large text in the middle — initials for a portrait, the project name for a screenshot. */
  label: string;
  /** Small mono line underneath. */
  caption?: string;
  className?: string;
}

/**
 * Shown in place of an image that hasn't been added yet. Designed to look
 * intentional to visitors (no file paths or "missing" wording) — fills its parent.
 */
export function Placeholder({ label, caption, className }: PlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "scanline absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden bg-surface text-center",
        className,
      )}
    >
      <span className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px]" />
      <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--glow)/0.18),transparent_65%)]" />
      <span className="relative px-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{label}</span>
      {caption ? <span className="relative px-6 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">{caption}</span> : null}
    </div>
  );
}
