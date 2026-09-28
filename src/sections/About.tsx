import { Award, BookOpen, Briefcase, Headphones, Search, Smartphone, Zap } from "lucide-react";
import { site } from "@/data/site";
import { benefits, certifications, experience, publications } from "@/data/about";
import { isPlaceholder } from "@/lib/placeholders";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/fx/SpotlightGroup";
import { Reveal, Stagger, StaggerItem } from "@/components/fx/Reveal";

const benefitIcons = { phone: Smartphone, speed: Zap, search: Search, support: Headphones };

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading id="about-title" index="04" eyebrow="About" title="About me">
            One developer, from first idea to launch.
          </SectionHeading>
          <Reveal delay={0.1} className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted text-pretty">
            {site.bio.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>

          {/* Experience + research */}
          <Stagger className="mt-8 space-y-3">
            {experience.map((e) => (
              <StaggerItem key={e.role} className="glass flex gap-4 rounded-2xl p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent-ink">
                  <Briefcase size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">Work experience · {e.period}</p>
                  <p className="mt-1 font-bold">{e.role}</p>
                  <p className="text-sm text-ink-subtle">{e.place}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{e.description}</p>
                </div>
              </StaggerItem>
            ))}
            {publications.map((pub) => {
              const meta = [pub.venue, pub.year].filter((v) => !isPlaceholder(v)).join(" · ");
              return (
                <StaggerItem key={pub.title} className="glass flex gap-4 rounded-2xl p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent-ink">
                    <BookOpen size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">Published research paper</p>
                    {isPlaceholder(pub.url) ? (
                      <p className="mt-1 font-bold">{pub.title}</p>
                    ) : (
                      <a href={pub.url} target="_blank" rel="noopener noreferrer" className="mt-1 block font-bold hover:text-accent-ink hover:underline">
                        {pub.title}
                      </a>
                    )}
                    {meta ? <p className="text-sm text-ink-subtle">{meta}</p> : null}
                  </div>
                </StaggerItem>
              );
            })}
            <StaggerItem className="glass flex gap-4 rounded-2xl p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent-ink">
                <Award size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">Certifications</p>
                <p className="mt-1 font-bold">{certifications.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{certifications.description}</p>
                {certifications.courses.length ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {certifications.courses.map((c) => (
                      <li key={c} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[12px] text-ink">
                        {c}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </StaggerItem>
          </Stagger>

        </div>

        {/* What a client gets — written for non-technical readers */}
        <div>
          <Reveal>
            <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">What you get</h3>
            <p className="mt-2 text-ink-muted">No jargon. Just what matters for your business.</p>
          </Reveal>
          <SpotlightGroup className="mt-6">
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {benefits.map((b, i) => {
                const Icon = benefitIcons[b.icon];
                return (
                  <StaggerItem key={b.title} className="glass spotlight group flex flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent-ink transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <span className="font-display text-2xl font-extrabold text-white/10">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="mt-5 text-lg font-bold tracking-tight">{b.title}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{b.description}</p>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </SpotlightGroup>
        </div>
      </div>
    </section>
  );
}
