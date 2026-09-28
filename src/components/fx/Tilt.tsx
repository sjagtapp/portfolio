"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { type ReactNode, type PointerEvent } from "react";

/** Tilts its content in 3D toward the cursor (mouse only). */
export function Tilt({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 20 };
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), spring);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div className={className} style={{ perspective: 1000 }} onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>{children}</motion.div>
    </div>
  );
}
