import { Briefcase, MapPin, ExternalLink } from "lucide-react";
import { experience } from "@/data/experience";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline, TimelineItem } from "@/components/Timeline";
import { Tag } from "@/components/ui/Tag";
import { isPlaceholder, humanize, realList } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

const P = ({ v, className }: { v?: string; className?: string }) =>
  !v ? null : isPlaceholder(v) ? <span className={cn("italic text-fg-subtle", className)}>{humanize(v)}</span> : <span className={className}>{v}</span>;

export function Experience() {
  if (!experience.length) return null;
  return (
    <Section id="experience">
      <SectionHeading id="experience-title" eyebrow="experience" title="Where I've worked." description="Roles, responsibilities and what I shipped along the way." />
      <Timeline>
        {experience.map((job, i) => {
          const achievements = realList(job.achievements);
          const hasPlaceholderAchievement = job.achievements.some(isPlaceholder);
          return (
            <TimelineItem key={`${job.company}-${i}`} index={i} marker={<P v={job.duration} />}>
              <article className="rounded-2xl border border-line bg-bg-elevated p-6 transition-colors duration-300 hover:border-gold/30">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line-strong text-gold"><Briefcase size={15} /></span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold tracking-tight"><P v={job.role} /></h3>
                    <p className="text-sm text-fg-muted">
                      {isPlaceholder(job.url) ? <P v={job.company} /> : (
                        <a href={job.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-gold-soft" data-cursor="hover"><P v={job.company} /><ExternalLink size={11} /></a>
                      )}
                      {job.location ? <span className="ml-2 inline-flex items-center gap-1 text-fg-subtle"><MapPin size={11} /><P v={job.location} /></span> : null}
                    </p>
                  </div>
                </div>
                <ul className="mt-4 space-y-1.5 text-sm text-fg-muted">
                  {job.responsibilities.map((r, j) => (
                    <li key={j} className="flex gap-2.5"><span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/70" /><P v={r} /></li>
                  ))}
                </ul>
                {achievements.length || hasPlaceholderAchievement ? (
                  <div className="mt-4 rounded-xl border border-gold/20 bg-gold-dim/30 px-4 py-3 text-sm">
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Achievements</p>
                    <ul className="space-y-1 text-fg-muted">{job.achievements.map((a, j) => <li key={j}><P v={a} /></li>)}</ul>
                  </div>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-1.5">{job.technologies.map((t, j) => <Tag key={`${t}-${j}`}>{t}</Tag>)}</div>
              </article>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Section>
  );
}
