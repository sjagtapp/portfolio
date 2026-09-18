import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes without duplicates / conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between min and max. */
export const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

/** Linear interpolation. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
