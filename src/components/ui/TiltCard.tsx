"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Show the moving light glare. */
  glare?: boolean;
}

/**
 * 3D tilt that follows the cursor, with a soft light glare that tracks the
 * pointer. Pure transforms on the card + a CSS variable for the glare
 * position, so nothing re-renders in React while you move the mouse.
 */
export function TiltCard({ children, className, max = 6, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const fine = useFinePointer();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!fine || !ref.current) return;
    const el = ref.current;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * max * 2;
      const ry = (px - 0.5) * max * 2;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      el.style.setProperty("--glare-x", `${px * 100}%`);
      el.style.setProperty("--glare-y", `${py * 100}%`);
      el.style.setProperty("--glare-o", "1");
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    ref.current.style.setProperty("--glare-o", "0");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("relative transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]", className)}
    >
      {children}
      {glare && fine ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--glare-o,0)] transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(500px circle at var(--glare-x,50%) var(--glare-y,50%), rgba(255,255,255,0.08), transparent 45%)",
          }}
        />
      ) : null}
    </div>
  );
}
