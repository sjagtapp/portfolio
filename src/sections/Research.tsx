import { FileText, ExternalLink, Quote } from "lucide-react";
import { research } from "@/data/research";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger } from "@/components/ui/Reveal";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { isPlaceholder, humanize } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

const P = ({ v, className }: { v?: string; className?: string }) =>
  !v ? null : isPlaceholder(v) ? <span className={cn("italic text-fg-subtle", className)}>{humanize(v)}</span> : <span className={className}>{v}</span>;

export function Research() {
  if (!research.length) return null;
  return (
    <Section id="research">
      <SectionHeading id="research-title" eyebrow="research" title="Research and publications." />
      <Stagger className="space-y-5">
        {research.map((paper, i) => (
          <StaggerItem key={`${paper.title}-${i}`} as="article" className="group relative grid gap-6 overflow-hidden rounded-3xl border border-line bg-bg-elevated p-6 md:grid-cols-[auto_1fr_auto] md:p-8">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent opacity-60" />
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold/40 bg-gold-dim text-gold"><FileText size={20} /></span>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-bold leading-snug tracking-tight md:text-2xl"><P v={paper.title} /></h3>
              <p className="mt-2 text-sm text-fg-muted">
                <P v={paper.venue} /> <span className="mx-1.5 text-fg-subtle">·</span> <span className="font-mono text-gold"><P v={paper.year} /></span>
                {paper.authors ? <><span className="mx-1.5 text-fg-subtle">·</span><P v={paper.authors} /></> : null}
              </p>
              <blockquote className="relative mt-5 border-l border-line pl-4 text-sm leading-relaxed text-fg-muted md:text-base">
                <Quote aria-hidden="true" size={14} className="absolute -left-2 -top-2 text-gold/50" />
                <P v={paper.abstract} />
              </blockquote>
              {paper.tags?.length ? <div className="mt-5 flex flex-wrap gap-1.5">{paper.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div> : null}
            </div>
            <div className="md:self-start">
              <Button href={paper.url ?? "[ADD PAPER LINK]"} variant="gold" size="sm" placeholderHint="Add url in src/data/research.ts">View paper <ExternalLink size={13} /></Button>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
