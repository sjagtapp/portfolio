import { GraduationCap, MapPin } from "lucide-react";
import { education } from "@/data/education";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { Tag } from "@/components/ui/Tag";
import { isPlaceholder, humanize } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

const P = ({ v, className }: { v?: string; className?: string }) =>
  !v ? null : isPlaceholder(v) ? <span className={cn("italic text-fg-subtle", className)}>{humanize(v)}</span> : <span className={className}>{v}</span>;

export function Education() {
  if (!education.length) return null;
  return (
    <Section id="education">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading id="education-title" eyebrow="education" title="Where I studied." className="mb-0" />
        <Stagger className="space-y-4">
          {education.map((e, i) => (
            <StaggerItem key={`${e.institution}-${i}`} as="article" className="group relative overflow-hidden rounded-2xl border border-line bg-bg-elevated p-6 md:p-8">
              <span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/5 blur-2xl transition-transform duration-700 group-hover:scale-150" />
              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gold-dim text-gold"><GraduationCap size={18} /></span>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight"><P v={e.degree} /></h3>
                    <p className="mt-0.5 text-fg-muted"><P v={e.institution} /></p>
                    {e.location ? <p className="mt-1 inline-flex items-center gap-1 text-sm text-fg-subtle"><MapPin size={11} /><P v={e.location} /></p> : null}
                  </div>
                </div>
                <span className="font-mono text-[12px] tracking-wider text-gold"><P v={e.year} /></span>
              </div>
              <div className="relative mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">Relevant coursework</p>
                  <div className="flex flex-wrap gap-1.5">{e.coursework.map((c, j) => <Tag key={`${c}-${j}`}>{c}</Tag>)}</div>
                </div>
                {e.achievements.length ? (
                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">Achievements</p>
                    <ul className="space-y-1 text-sm text-fg-muted">{e.achievements.map((a, j) => <li key={j} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/70" /><P v={a} /></li>)}</ul>
                  </div>
                ) : null}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      <Reveal className="mt-4"><span className="sr-only">Edit src/data/education.ts to update this section.</span></Reveal>
    </Section>
  );
}
