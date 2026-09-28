import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { Stagger, StaggerItem } from "@/components/fx/Reveal";
import { Tilt } from "@/components/fx/Tilt";

export interface WorkItem extends Project {
  /** Resolved on the server from public/images/work/<slug>.*; undefined until the file is added. */
  screenshot?: string;
}

const hostname = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

/** A home-page screenshot inside a browser frame, tilting toward the cursor. */
function BrowserFrame({ item }: { item: WorkItem }) {
  return (
    <Tilt>
      <div className="glass overflow-hidden rounded-2xl transition-[border-color,box-shadow] duration-500 group-hover:border-accent-ink/40 group-hover:shadow-glow">
        <div className="flex items-center gap-3 border-b border-white/10 px-3.5 py-2.5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-md bg-bg/70 px-3 py-1 text-center font-mono text-[11px] text-ink-subtle">
            {item.url ? hostname(item.url) : `${item.slug}.site`}
          </span>
        </div>
        <div className="relative aspect-video overflow-hidden bg-surface">
          {item.screenshot ? (
            <Image
              src={item.screenshot}
              alt={`Home page of ${item.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <Placeholder label={item.name} caption={item.type} />
          )}
        </div>
      </div>
    </Tilt>
  );
}

export function Work({ items }: { items: WorkItem[] }) {
  return (
    <section id="work" aria-labelledby="work-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading id="work-title" index="02" eyebrow="Work" title="Selected work">
          A few of the websites and apps I&apos;ve built for clients. More examples are available on request.
        </SectionHeading>

        <Stagger className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {items.map((item) => (
            <StaggerItem key={item.slug} className="group">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${item.name}`} tabIndex={-1}>
                  <BrowserFrame item={item} />
                </a>
              ) : (
                <BrowserFrame item={item} />
              )}

              <div className="mt-6">
                <p className="font-mono text-xs text-ink-subtle">
                  {item.type.toLowerCase()} <span className="text-line-strong">/</span> <span className="text-accent-ink">{item.client === "Own product" ? "my own product" : `for ${item.client}`}</span>
                </p>
                <h3 className="mt-2 font-display text-2xl font-extrabold uppercase tracking-tight">{item.name}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted text-pretty">{item.description}</p>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent-ink"
                  >
                    Visit website <ArrowUpRight size={15} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
