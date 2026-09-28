import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  /** Internal path ("/pricing", "#contact"), external URL, mailto: or tel:. Omit to render a <button>. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  className?: string;
  disabled?: boolean;
  /** Adds the download attribute (for downloadable files). */
  download?: boolean;
  /** Tooltip — used to explain a disabled button. */
  title?: string;
  ariaLabel?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold select-none whitespace-nowrap " +
  "transition-[background-color,color,border-color,box-shadow] duration-200";

const variants: Record<Variant, string> = {
  primary: "shine bg-accent text-on-accent shadow-[0_8px_30px_-8px_rgb(var(--glow)/0.7)] hover:bg-accent-hover hover:shadow-[0_10px_40px_-6px_rgb(var(--glow)/0.9)]",
  secondary: "shine glass text-ink hover:border-white/25 hover:bg-white/[0.06]",
  ghost: "text-ink-muted hover:text-ink hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

/** The one button used everywhere. External links open in a new tab. */
export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  disabled,
  download,
  title,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], disabled && "pointer-events-none opacity-50", className);

  if (href && !disabled) {
    if (/^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={classes} title={title} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    if (download || /^(mailto|tel):/.test(href)) {
      return (
        <a href={href} download={download || undefined} onClick={onClick} className={classes} title={title} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={classes} title={title} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} title={title} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
