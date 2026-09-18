"use client";

import { useEffect, useRef } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { lerp } from "@/lib/utils";

/**
 * Page-wide atmosphere: a very soft gold spotlight that drifts toward the
 * cursor, a static vignette, and film grain. Fixed, transform-only, behind
 * everything. On touch devices the spotlight simply rests at the top.
 */
export function Background() {
  const fine = useFinePointer();
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine || !spot.current) return;
    let tx = window.innerWidth * 0.5, ty = window.innerHeight * 0.25;
    let x = tx, y = ty, raf = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x = lerp(x, tx, 0.04); y = lerp(y, ty, 0.04);
      spot.current!.style.transform = `translate3d(${x - 400}px, ${y - 400}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, [fine]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={spot}
        className="absolute left-0 top-0 h-[800px] w-[800px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(201,162,74,0.09) 0%, rgba(201,162,74,0.03) 35%, transparent 65%)",
          transform: "translate3d(calc(50vw - 400px), -300px, 0)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
      <div className="noise" />
    </div>
  );
}
