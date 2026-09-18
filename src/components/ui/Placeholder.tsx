import { ImageIcon, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Kind = "image" | "portrait" | "document";

interface PlaceholderProps {
  /** Text shown in the middle, e.g. "[ADD PROJECT SCREENSHOT]". */
  label: string;
  /** Where the real file should go, e.g. "public/images/projects/planngo/thumbnail.jpg". */
  hint?: string;
  kind?: Kind;
  className?: string;
}

const icons: Record<Kind, typeof ImageIcon> = { image: ImageIcon, portrait: User, document: FileText };

/**
 * A designed empty state for any asset that hasn't been added yet.
 * Looks intentional in the layout (gold hairline frame, dot grid, mono label)
 * rather than like a broken image. Fills its parent — give the parent a size.
 */
export function Placeholder({ label, hint, kind = "image", className }: PlaceholderProps) {
  const Icon = icons[kind];
  return (
    <div
      role="img"
      aria-label={`${label}${hint ? ` — ${hint}` : ""}`}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden bg-surface text-center",
        "bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px]",
        className,
      )}
    >
      {/* corner marks */}
      <span aria-hidden="true" className="absolute left-3 top-3 h-4 w-4 border-l border-t border-gold/60" />
      <span aria-hidden="true" className="absolute right-3 top-3 h-4 w-4 border-r border-t border-gold/60" />
      <span aria-hidden="true" className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-gold/60" />
      <span aria-hidden="true" className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-gold/60" />
      <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,74,0.10),transparent_60%)]" />

      <span className="relative grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-bg/60 text-gold">
        <Icon size={18} strokeWidth={1.5} />
      </span>
      <span className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-gold-soft/90 px-4">{label}</span>
      {hint ? <span className="relative font-mono text-[10px] text-fg-subtle px-6 break-all">{hint}</span> : null}
    </div>
  );
}
