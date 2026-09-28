import { cn } from "@/lib/utils";

/** Endless horizontal scroll of short labels. Pauses on hover. The list is rendered twice for a seamless loop. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[13px] text-ink-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-ink shadow-[0_0_8px_rgb(var(--glow))]" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee overflow-hidden", className)}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
