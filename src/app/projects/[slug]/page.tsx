import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Github, ExternalLink, Calendar, Layers, FolderOpen } from "lucide-react";
import { projects, getProject } from "@/data/projects";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { isPlaceholder, humanize } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = isPlaceholder(p.name) ? humanize(p.name) : p.name;
  const description = isPlaceholder(p.description) ? p.tagline : p.description;
  return {
    title,
    description,
    openGraph: { title: `${title} — ${site.name}`, description, type: "article", url: `${site.url}/projects/${p.slug}` },
    twitter: { card: "summary_large_image", title: `${title} — ${site.name}`, description },
    alternates: { canonical: `${site.url}/projects/${p.slug}` },
  };
}

/** Paragraph that renders placeholders as designed empty states. */
function Copy({ value, className }: { value: string; className?: string }) {
  return isPlaceholder(value) ? (
    <p className={cn("rounded-lg border border-dashed border-gold/30 bg-gold-dim/30 px-4 py-3 font-mono text-[12px] italic text-fg-muted", className)}>{humanize(value)}</p>
  ) : (
    <p className={cn("text-base leading-relaxed text-fg-muted md:text-lg", className)}>{value}</p>
  );
}

function ListBlock({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((item, i) => (
        <li key={i} className={cn("flex gap-3 rounded-xl border border-line bg-white/[0.015] px-4 py-3 text-sm leading-relaxed", isPlaceholder(item) ? "border-dashed italic text-fg-subtle" : "text-fg-muted")}>
          <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          {isPlaceholder(item) ? humanize(item) : item}
        </li>
      ))}
    </ul>
  );
}

function Block({ id, label, title, children, delay = 0 }: { id: string; label: string; title: string; children: React.ReactNode; delay?: number }) {
  return (
    <Reveal as="section" delay={delay} className="scroll-mt-28">
      <div id={id} className="grid gap-6 border-t border-line py-10 md:grid-cols-[200px_1fr] md:py-14">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">{label}</p>
          <h2 className="mt-1 font-display text-xl font-bold tracking-tight">{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const name = isPlaceholder(project.name) ? humanize(project.name) : project.name;
  const screenshots = project.images.screenshots?.length ? project.images.screenshots : ["[ADD SCREENSHOT]", "[ADD SCREENSHOT]"];

  return (
    <article className="pt-28 md:pt-36">
      <div className="container-x">
        <Reveal>
          <Link href="/#projects" className="inline-flex items-center gap-2 font-mono text-[12px] tracking-wider text-fg-muted transition-colors hover:text-gold-soft" data-cursor="hover">
            <ArrowLeft size={14} /> All projects
          </Link>
        </Reveal>

        <header className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.22em] text-gold">
              <span className="text-fg-subtle">{"// "}</span>{project.category}
            </p>
            <TextReveal as="h1" id="project-title" text={name} className={cn("font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl md:text-6xl", isPlaceholder(project.name) && "text-fg-muted")} />
            <p className="mt-4 text-lg text-gold-soft/90 md:text-xl">{project.tagline}</p>
          </div>
          <Reveal delay={0.2}>
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {[
                { Icon: Calendar, k: "Year", v: project.year },
                { Icon: FolderOpen, k: "Type", v: project.category },
                { Icon: Layers, k: "Stack", v: `${project.techStack.filter((t) => !isPlaceholder(t)).length || "—"} tools` },
              ].map(({ Icon, k, v }) => (
                <div key={k} className="bg-bg-elevated px-4 py-3">
                  <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle"><Icon size={11} />{k}</dt>
                  <dd className={cn("mt-1 text-sm", isPlaceholder(v) && "italic text-fg-subtle")}>{isPlaceholder(v) ? humanize(v) : v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </header>

        {/* Cover — replace public/images/projects/<slug>/cover.jpg (21:9) */}
        <Reveal delay={0.25} className="mt-10">
          <SmartImage
            src={project.images.cover}
            alt={`${name} cover`}
            placeholderLabel="[ADD PROJECT COVER IMAGE]"
            placeholderHint={`public/images/projects/${project.slug}/cover.jpg`}
            className="aspect-[16/9] rounded-3xl border border-line md:aspect-[21/9]"
            sizes="(max-width: 1280px) 100vw, 1200px"
            priority
          />
        </Reveal>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button href={project.links.github ?? "[ADD GITHUB LINK]"} variant="ghost" placeholderHint="Add links.github in src/data/projects.ts"><Github size={16} /> GitHub</Button>
          <Button href={project.links.live ?? "[ADD LIVE DEMO LINK]"} variant="gold" placeholderHint="Add links.live in src/data/projects.ts"><ExternalLink size={16} /> Live demo</Button>
          <ul className="ml-auto flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.techStack.map((t, i) => <li key={`${t}-${i}`}><Tag>{t}</Tag></li>)}
          </ul>
        </div>

        <div className="mt-12 md:mt-16">
          <Block id="overview" label="01" title="Overview"><Copy value={project.description} /></Block>
          <Block id="problem" label="02" title="Problem"><Copy value={project.problem} /></Block>
          <Block id="solution" label="03" title="Solution"><Copy value={project.solution} /></Block>
          <Block id="features" label="04" title="Key features"><ListBlock items={project.features} /></Block>
          <Block id="stack" label="05" title="Tech stack">
            <div className="flex flex-wrap gap-2">{project.techStack.map((t, i) => <Tag key={`${t}-${i}`} tone="gold">{t}</Tag>)}</div>
          </Block>
          <Block id="process" label="06" title="Development process"><ListBlock items={project.process} /></Block>
          <Block id="challenges" label="07" title="Challenges"><ListBlock items={project.challenges} /></Block>
          <Block id="results" label="08" title="Results"><ListBlock items={project.results} /></Block>
          <Block id="screenshots" label="09" title="Screenshots">
            {/* Add paths to images.screenshots in src/data/projects.ts; files go in public/images/projects/<slug>/ */}
            <div className="grid gap-4 sm:grid-cols-2">
              {screenshots.map((src, i) => (
                <SmartImage
                  key={`${src}-${i}`}
                  src={src}
                  alt={`${name} screenshot ${i + 1}`}
                  placeholderLabel="[ADD SCREENSHOT]"
                  placeholderHint={`public/images/projects/${project.slug}/screenshot-${i + 1}.jpg`}
                  className="aspect-[16/10] rounded-2xl border border-line"
                  sizes="(max-width: 640px) 100vw, 600px"
                />
              ))}
            </div>
          </Block>
        </div>

        <nav aria-label="More projects" className="mt-6 grid gap-4 border-t border-line py-10 sm:grid-cols-2">
          {[{ p: prev, label: "Previous", Icon: ArrowLeft, align: "left" }, { p: next, label: "Next", Icon: ArrowRight, align: "right" }].map(({ p, label, Icon, align }) => (
            <Link
              key={label}
              href={`/projects/${p.slug}`}
              className={cn("group rounded-2xl border border-line p-5 transition-colors hover:border-gold/40 hover:bg-gold-dim/30", align === "right" && "sm:text-right")}
              data-cursor="hover"
            >
              <span className={cn("flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle", align === "right" && "sm:flex-row-reverse")}>
                <Icon size={12} /> {label}
              </span>
              <span className="mt-2 block font-display text-lg font-bold tracking-tight group-hover:text-gold-soft">{isPlaceholder(p.name) ? humanize(p.name) : p.name}</span>
              <span className="block text-sm text-fg-muted">{p.tagline}</span>
            </Link>
          ))}
        </nav>
      </div>
    </article>
  );
}
