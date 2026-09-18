"use client";

import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink, BookOpen } from "lucide-react";
import { type Project } from "@/data/projects";
import { TiltCard } from "@/components/ui/TiltCard";
import { SmartImage } from "@/components/ui/SmartImage";
import { Tag } from "@/components/ui/Tag";
import { isPlaceholder, humanize } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  /** Large variant shows a wider image and bigger title. */
  size?: "large" | "default";
  index: number;
}

/**
 * Project card: 3D tilt, image zoom, moving gold sheen, tag stagger and a CTA
 * row that rises on hover. A stretched link covers the card (→ detail page);
 * GitHub / live buttons sit above it as their own anchors.
 */
export function ProjectCard({ project, size = "default", index }: ProjectCardProps) {
  const large = size === "large";
  const links = [
    { label: "GitHub", href: project.links.github, Icon: Github, hint: "Add the GitHub URL in src/data/projects.ts" },
    { label: "Live demo", href: project.links.live, Icon: ExternalLink, hint: "Add the live demo URL in src/data/projects.ts" },
  ];

  return (
    <TiltCard max={large ? 4 : 6} className="h-full rounded-3xl">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated transition-[border-color,box-shadow] duration-500 hover:border-gold/40 hover:shadow-gold">
        {/* Stretched link: the whole card opens the project page */}
        <Link
          href={`/projects/${project.slug}`}
          className="absolute inset-0 z-[3] rounded-3xl focus-visible:outline-2 focus-visible:outline-gold"
          aria-label={`Open ${isPlaceholder(project.name) ? humanize(project.name) : project.name} — ${project.tagline}`}
          data-cursor-label="view"
        />

        {/* moving gradient sheen */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(115deg,transparent_30%,rgba(201,162,74,0.10)_50%,transparent_70%)] bg-[length:250%_100%] bg-[position:120%_0] opacity-0 transition-[background-position,opacity] duration-1000 ease-out group-hover:bg-[position:-20%_0] group-hover:opacity-100" />

        <div className={cn("relative overflow-hidden", large ? "aspect-[16/8]" : "aspect-[16/10]")}>
          <SmartImage
            src={project.images.thumbnail}
            alt={`${project.name} screenshot`}
            placeholderLabel="[ADD PROJECT SCREENSHOT]"
            placeholderHint={`public/images/projects/${project.slug}/thumbnail.jpg`}
            className="absolute inset-0 transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.06]"
            sizes={large ? "(max-width: 768px) 100vw, 800px" : "(max-width: 768px) 100vw, 400px"}
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-line-strong bg-bg/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted backdrop-blur">
            {project.category}
          </span>
          <span className="absolute right-4 top-4 font-mono text-[11px] text-fg-muted">
            {isPlaceholder(project.year) ? <span className="italic text-fg-subtle">{humanize(project.year)}</span> : project.year}
          </span>
        </div>

        <div className="relative z-[2] flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className={cn("font-display font-bold tracking-tight", large ? "text-2xl md:text-3xl" : "text-xl", isPlaceholder(project.name) && "italic text-fg-muted")}>
                {isPlaceholder(project.name) ? humanize(project.name) : project.name}
              </h3>
              <p className="mt-1 text-sm text-gold-soft/90">{project.tagline}</p>
            </div>
            <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong text-fg-muted transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:text-gold">
              <ArrowUpRight size={16} />
            </span>
          </div>

          <p className={cn("mt-4 text-sm leading-relaxed text-fg-muted", isPlaceholder(project.description) && "italic text-fg-subtle")}>
            {isPlaceholder(project.description) ? humanize(project.description) : project.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.techStack.map((t, i) => (
              <li key={`${t}-${i}`} className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" style={{ transitionDelay: `${i * 40}ms` }}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>

          {/* CTA row — rises into view on hover (desktop), always visible on touch. z-[4] keeps it above the stretched link. */}
          <div className="relative z-[4] mt-6 flex items-center gap-2 border-t border-line pt-4 transition-[opacity,transform] duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
            {links.map(({ label, href, Icon, hint }) =>
              isPlaceholder(href) ? (
                <span key={label} title={hint} className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line-strong px-3 py-1.5 font-mono text-[11px] text-fg-subtle">
                  <Icon size={12} /> {label}
                </span>
              ) : (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[11px] text-fg transition-colors hover:border-gold hover:text-gold-soft"
                  data-cursor="hover"
                >
                  <Icon size={12} /> {label}
                </a>
              ),
            )}
            {project.caseStudy ? (
              <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-gold-soft">
                <BookOpen size={12} /> Case study
              </span>
            ) : null}
          </div>
        </div>
        <span aria-hidden="true" className="absolute bottom-4 right-6 z-[2] font-mono text-[11px] text-fg-subtle/60">0{index + 1}</span>
      </article>
    </TiltCard>
  );
}
