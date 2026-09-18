"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { isPlaceholder } from "@/lib/placeholders";
import { useMagnetic } from "@/hooks/useMagnetic";

type Variant = "primary" | "gold" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  /** Internal path ("/projects/x", "#contact") or external URL. Placeholders render disabled. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Extra hint shown in the title attribute when the href is a placeholder. */
  placeholderHint?: string;
  disabled?: boolean;
  download?: boolean;
  ariaLabel?: string;
}

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight select-none " +
  "transition-[background-color,color,border-color,box-shadow,opacity] duration-300 will-change-transform " +
  "focus-visible:outline-2 focus-visible:outline-gold";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-white shadow-[0_10px_40px_-15px_rgba(255,255,255,0.35)]",
  gold: "border border-gold/50 text-gold-soft hover:border-gold hover:bg-gold-dim hover:shadow-gold",
  ghost: "border border-line-strong text-fg hover:border-fg/40 hover:bg-white/[0.04]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-[15px]",
};

/**
 * The one button used everywhere. Magnetic on fine pointers, plain on touch.
 * Placeholder hrefs ("[ADD GITHUB LINK]") render as a disabled, labelled state
 * so there is never a dead link on the page.
 */
export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  placeholderHint,
  disabled,
  download,
  ariaLabel,
}: ButtonProps) {
  const magnetic = useMagnetic<HTMLSpanElement>({ strength: 0.3 });
  const placeholder = href !== undefined && isPlaceholder(href);
  const isDisabled = disabled || placeholder;
  const classes = cn(base, variants[variant], sizes[size], isDisabled && "cursor-not-allowed opacity-45 hover:shadow-none", className);
  const title = placeholder ? (placeholderHint ?? "Link not added yet — set it in src/data") : undefined;

  const inner = (
    <span
      ref={magnetic.ref}
      onMouseMove={isDisabled ? undefined : magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      className="inline-flex items-center gap-2"
    >
      {children}
    </span>
  );

  if (href && !isDisabled) {
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel} data-cursor="hover">
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} download={download} data-cursor="hover">
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      className={classes}
      disabled={disabled}
      aria-disabled={isDisabled || undefined}
      title={title}
      aria-label={ariaLabel}
      data-cursor={isDisabled ? undefined : "hover"}
    >
      {inner}
    </button>
  );
}
