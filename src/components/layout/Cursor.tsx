"use client";

import { useEffect, useRef } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { lerp } from "@/lib/utils";

/**
 * Custom cursor for desktop: a small dot that sits on the pointer and a ring
 * that eases behind it. The ring grows over interactive elements
 * (links, buttons, [data-cursor="hover"]) and shows a label on [data-cursor-label].
 * Everything runs in one rAF loop with transforms only. Not rendered on touch
 * devices or when the user prefers reduced motion.
 */
export function Cursor() {
  const fine = useFinePointer();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!fine) return;
    const html = document.documentElement;
    html.classList.add("custom-cursor");

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let scale = 1, targetScale = 1;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (!visible) { visible = true; rx = x; ry = y; dot.current!.style.opacity = "1"; ring.current!.style.opacity = "1"; }
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [data-cursor='hover'], [data-cursor-label], input, textarea, select, summary");
      const text = target?.getAttribute("data-cursor-label") ?? "";
      const isText = target && /^(INPUT|TEXTAREA)$/.test(target.tagName);
      targetScale = target ? (text ? 3.2 : isText ? 0.6 : 1.8) : 1;
      if (label.current) { label.current.textContent = text; label.current.style.opacity = text ? "1" : "0"; }
      ring.current!.style.borderColor = text ? "transparent" : "";
      ring.current!.style.background = text ? "rgba(201,162,74,0.95)" : "";
    };
    const onLeave = () => { visible = false; dot.current!.style.opacity = "0"; ring.current!.style.opacity = "0"; };
    const onDown = () => { targetScale *= 0.8; };
    const onUp = () => { targetScale /= 0.8; };

    const loop = () => {
      rx = lerp(rx, x, 0.18); ry = lerp(ry, y, 0.18);
      scale = lerp(scale, targetScale, 0.15);
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%,-50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      html.classList.remove("custom-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <>
      <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-gold opacity-0 mix-blend-difference will-change-transform" />
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] grid h-9 w-9 place-items-center rounded-full border border-fg/60 opacity-0 transition-[border-color,background-color] duration-300 will-change-transform"
      >
        <span ref={label} className="font-mono text-[4px] uppercase tracking-[0.15em] text-bg opacity-0 transition-opacity" />
      </div>
    </>
  );
}
