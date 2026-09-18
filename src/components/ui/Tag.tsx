import { cn } from "@/lib/utils";
import { isPlaceholder, humanize } from "@/lib/placeholders";

interface TagProps {
  children: string;
  className?: string;
  tone?: "default" | "gold";
}

/** Small mono chip. Placeholder values are dimmed and humanized. */
export function Tag({ children, className, tone = "default" }: TagProps) {
  const placeholder = isPlaceholder(children);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none tracking-wide whitespace-nowrap transition-colors duration-300",
        tone === "gold" ? "border-gold/40 text-gold-soft bg-gold-dim" : "border-line-strong text-fg-muted bg-white/[0.02]",
        placeholder && "border-dashed text-fg-subtle italic",
        className,
      )}
    >
      {placeholder ? humanize(children) : children}
    </span>
  );
}
