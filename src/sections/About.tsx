import { Sparkles, Cpu, Puzzle, Palette, BookOpen, Brain } from "lucide-react";
import { site } from "@/data/site";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { isPlaceholder, humanize } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────
 *  EDIT ME: about copy + quick facts.
 *  Keep `bio` honest — no invented achievements.
 * ─────────────────────────────────────────────
 */
const bio = [
  "[ADD YOUR BIO — paragraph 1. Who you are, what you build, and what pulled you into software.]",
  "[ADD YOUR BIO — paragraph 2. What you're focused on now: e.g. full-stack web apps, AI-assisted products, learning in public.]",
];

const facts = [
  { label: "Name", value: site.name },
  { label: "Role", value: site.role },
  { label: "Education", value: education[0]?.degree ?? "[DEGREE]" },
  { label: "Location", value: site.location },
  { label: "Experience", value: experience[0]?.role ?? "[EXPERIENCE]" },
  { label: "Interests", value: "[INTERESTS — e.g. AI, web performance, design systems]" },
];

const traits = [
  { Icon: Sparkles, label: "Curious", text: "I take things apart to see how they work." },
  { Icon: Cpu, label: "Technology-focused", text: "Modern web, the right tool for the problem." },
  { Icon: Puzzle, label: "Problem solver", text: "Comfortable with ambiguity and hard bugs." },
  { Icon: Palette, label: "Creative", text: "Details, motion and feel matter to me." },
  { Icon: BookOpen, label: "Always learning", text: "Reading, building, shipping — repeat." },
  { Icon: Brain, label: "AI & modern web", text: "Exploring how AI changes what we build." },
];

const Text = ({ value, className }: { value: string; className?: string }) =>
  isPlaceholder(value) ? <span className={cn("italic text-fg-subtle", className)}>{humanize(value)}</span> : <span className={className}>{value}</span>;

export function About() {
  return (
    <Section id="about">
      <SectionHeading id="about-title" eyebrow="about" title="A developer who cares about how things work — and how they feel." />

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Photo — replace public/images/about.jpg (portrait, 4:5). */}
        <Reveal className="relative">
          <div className="relative mx-auto max-w-sm lg:sticky lg:top-28">
            <div aria-hidden="true" className="absolute -inset-3 rounded-[1.75rem] border border-gold/15" />
            <div aria-hidden="true" className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-gold/10 blur-2xl" />
            <SmartImage
              src={site.aboutImage}
              alt={`${site.name} — portrait`}
              placeholderLabel="[YOUR PHOTO HERE]"
              placeholderHint="public/images/about.jpg"
              kind="portrait"
              className="aspect-[4/5] rounded-3xl"
              sizes="(max-width: 1024px) 90vw, 400px"
            />
            <div className="absolute -bottom-4 left-6 right-6 glass rounded-xl px-4 py-3 font-mono text-[11px] text-fg-muted">
              <span className="text-gold">const</span> status = <span className="text-gold-soft">&quot;building&quot;</span>;
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal className="space-y-5 text-base leading-relaxed text-fg-muted md:text-lg">
            {bio.map((p, i) => (
              <p key={i}><Text value={p} /></p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="bg-bg-elevated px-5 py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">{f.label}</dt>
                  <dd className="mt-1 text-sm text-fg"><Text value={f.value} /></dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
            {traits.map(({ Icon, label, text }) => (
              <StaggerItem key={label} className="group flex gap-4 rounded-xl border border-line bg-white/[0.015] p-4 transition-colors duration-300 hover:border-gold/40 hover:bg-gold-dim/40">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line-strong text-gold transition-transform duration-500 group-hover:rotate-6">
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-sm font-medium text-fg">{label}</span>
                  <span className="block text-[13px] text-fg-muted">{text}</span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
