"use client";

import Image from "next/image";
import { useState } from "react";
import { isPlaceholder } from "@/lib/placeholders";
import { Placeholder } from "./Placeholder";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  /** Path inside /public, a full URL, or a "[PLACEHOLDER]" string. */
  src?: string;
  alt: string;
  /** Shown when src is a placeholder or fails to load. */
  placeholderLabel: string;
  placeholderHint?: string;
  kind?: "image" | "portrait" | "document";
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders next/image when a real src is provided, and a designed placeholder
 * when it isn't — or when the file is missing (onError). The wrapper must be
 * positioned with an explicit size or aspect-ratio; the image fills it.
 */
export function SmartImage({
  src,
  alt,
  placeholderLabel,
  placeholderHint,
  kind = "image",
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = failed || isPlaceholder(src);

  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      {showPlaceholder ? (
        <Placeholder label={placeholderLabel} hint={placeholderHint} kind={kind} />
      ) : (
        <Image
          src={src as string}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={cn("object-cover", imgClassName)}
        />
      )}
    </div>
  );
}
