"use client";

import { useEffect, useState } from "react";

/**
 * True when the primary input is a precise pointer (mouse / trackpad) and the
 * user hasn't asked for reduced motion. Custom cursor, magnetic buttons and
 * tilt effects only activate under these conditions — touch devices get the
 * plain, fast experience.
 */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setFine(pointer.matches && !motion.matches);
    update();
    pointer.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      pointer.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  return fine;
}
