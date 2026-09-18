"use client";

import { useRef } from "react";
import { Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { certifications } from "@/data/certifications";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { isPlaceholder, humanize } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

const P = ({ v, className }: { v?: string; className?: string }) =>
  !v ? null : isPlaceholder(v) ? <span className={cn("italic text-fg-subtle", className)}>{humanize(v)}</span> : <span className={className}>{v}</span>;

/**
 * Horizontal, snap-scrolling rail of certificates. Native scroll (touch
 * friendly) with arrow buttons on desktop. Images fall back to placeholders.
 */
export function Certifications() {
  const rail = useRef<HTMLUListElement>(null);
  if (!certifications.length) return null;
  const scrollBy = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * (rail.current.clientWidth * 0.8), behavior: "smooth" });

  return (
    <Section id="certifications" divider={false} className="pt-0 md:pt-0">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading id="certifications-title" eyebrow="certifications" title="Credentials and achievements." className="mb-8" />
        <Reveal className="mb-8 hidden gap-2 md:flex">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll certificates left" className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-fg-muted transition-colors hover:border-gold hover:text-gold-soft"><ChevronLeft size={16} /></button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll certificates right" className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-fg-muted transition-colors hover:border-gold hover:text-gold-soft"><ChevronRight size={16} /></button>
        </Reveal>
      </div>

      <ul ref={rail} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8" aria-label="Certificates">
        {certifications.map((c, i) => (
          <li key={`${c.name}-${i}`} className="group w-[82vw] shrink-0 snap-start sm:w-[360px]">
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg-elevated transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-gold/40">
              {/* Replace public/images/certificates/<file>.jpg */}
              <SmartImage
                src={c.image}
                alt={`${c.name} certificate`}
                placeholderLabel="[ADD CERTIFICATE IMAGE]"
                placeholderHint={`public/images/certificates/certificate-${i + 1}.jpg`}
                kind="document"
                className="aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="360px"
              />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-gold/40 text-gold"><Award size={14} /></span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-bold leading-tight tracking-tight"><P v={c.name} /></h3>
                    <p className="mt-1 text-sm text-fg-muted"><P v={c.issuer} /></p>
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between pt-5 font-mono text-[11px]">
                  <span className="text-fg-subtle"><P v={c.date} /></span>
                  {isPlaceholder(c.url) ? (
                    <span className="inline-flex items-center gap-1 text-fg-subtle" title="Add url in src/data/certifications.ts">View certificate <ExternalLink size={11} /></span>
                  ) : (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gold-soft hover:underline" data-cursor="hover">View certificate <ExternalLink size={11} /></a>
                  )}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
