import Image from "next/image";
import { ArrowRight, Globe, Rocket, Sparkles } from "lucide-react";
import { initials, site, whatsappUrl } from "@/data/site";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { Typewriter } from "@/components/fx/Typewriter";
import { CodeWindow, type CodeLine } from "@/components/fx/CodeWindow";
import { Counter } from "@/components/fx/Counter";
import { Magnetic } from "@/components/fx/Magnetic";

const typedServices = services.map((s) => s.title.toLowerCase());

const k = (text: string) => ({ text, kind: "key" as const });
const s = (text: string) => ({ text, kind: "str" as const });
const p = (text: string) => ({ text, kind: "punc" as const });

/** The snippet typed out in the hero's editor window. */
const code: CodeLine[] = [
  [{ text: "const ", kind: "kw" }, { text: "developer", kind: "plain" }, p(" = {")],
  [k("  name"), p(": "), s(`"${site.name}"`), p(",")],
  [k("  role"), p(": "), s('"Full Stack Web Dev"'), p(",")],
  [k("  based"), p(": "), s(`"${site.location}"`), p(",")],
  [k("  stack"), p(": ["), s('"React"'), p(", "), s('"Next.js"'), p(", "), s('"Node"'), p("],")],
  [k("  available"), p(": "), { text: "true", kind: "bool" }, p(",")],
  [p("};")],
];

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/** Intro: photo, name, title, pitch, main actions and headline numbers. */
export function Hero({ photo }: { photo?: string }) {
  return (
    <section id="home" aria-labelledby="hero-title" className="container-x relative pt-24 pb-20 sm:pt-32 lg:pt-40 lg:pb-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          {site.tagline ? (
            <p style={delay(0)} className="glass animate-rise inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[13px] font-medium text-ink sm:text-sm">
              <Rocket size={15} className="shrink-0 text-accent-ink" aria-hidden="true" />
              {site.tagline}
            </p>
          ) : null}

          <p style={delay(80)} className="animate-rise mt-8 text-lg font-medium text-ink-muted sm:text-xl">
            Hello, I&apos;m
          </p>
          <h1 id="hero-title" style={delay(140)} className="animate-rise mt-1 font-display text-[2.6rem] leading-[1.02] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            <ScrambleText text={site.name} />
            <span className="text-accent-ink">.</span>
          </h1>
          <p style={delay(220)} className="animate-rise mt-4 text-xl font-bold sm:text-2xl">
            <span className="text-gradient">{site.role}</span>
          </p>

          <p style={delay(300)} className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-ink-muted text-pretty">
            {site.pitch}
          </p>

          <p style={delay(360)} className="animate-rise mt-5 font-mono text-sm text-ink-muted sm:text-[15px]">
            <span className="text-accent-ink">&gt;</span> I build <Typewriter words={typedServices} className="text-ink" />
          </p>

          <div style={delay(440)} className="animate-rise mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button href="#contact" size="lg">
                Start a project <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="#work" variant="secondary" size="lg">
                See my work
              </Button>
            </Magnetic>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={delay(500)}
            className="animate-rise mt-5 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <WhatsappIcon size={16} className="text-success" /> Prefer WhatsApp? <span className="font-semibold text-ink">{site.phone}</span>
          </a>

          <dl style={delay(560)} className="animate-rise mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-8">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  <Counter value={stat.value} />
                </dd>
                <dd className="mt-1 text-[13px] text-ink-muted">{stat.label}</dd>
              </div>
            ))}
            <div>
              <dt className="sr-only">Location</dt>
              <dd className="flex items-center gap-1.5 pt-1.5 text-base font-bold sm:pt-2.5 sm:text-lg">
                <Globe size={17} className="shrink-0 text-accent-ink" aria-hidden="true" /> Worldwide
              </dd>
              <dd className="mt-1 text-[13px] text-ink-muted">Available for clients anywhere</dd>
            </div>
          </dl>

          <CodeWindow lines={code} filename="developer.ts" className="mt-10 max-w-md lg:hidden" />
        </div>

        {/* Photo: first and smaller on phones, on the right from lg up. A blue backlight glows behind it. */}
        <div style={delay(200)} className="animate-rise relative order-first w-full max-w-[230px] sm:max-w-[300px] lg:order-last lg:max-w-none">
          <span aria-hidden="true" className="orb animate-breathe -inset-14 sm:-inset-20 lg:-inset-28" />
          <div className="animate-float-slow relative">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-surface shadow-glow lg:aspect-[4/5]">
              {photo ? (
                // Framed on the face: it sits right of centre and high in the shot, so the square phone crop keeps it.
                <Image
                  src={photo}
                  alt={`${site.name}, ${site.role}`}
                  fill
                  priority
                  sizes="(max-width: 640px) 230px, (max-width: 1024px) 300px, 480px"
                  className="object-cover object-[62%_22%] brightness-[0.92] contrast-[1.05] saturate-[1.05]"
                />
              ) : (
                <Placeholder label={initials} caption="full stack · freelance" />
              )}
              {/* Tone the bright sky down toward the page: soft dark vignette, deeper blue at the top, fade into the page at the bottom */}
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_35%,transparent_45%,rgb(5_6_10/0.45)_100%)]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0b1a4a]/35 via-transparent to-transparent mix-blend-multiply" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg/85 via-bg/30 to-transparent" />
            </div>
          </div>

          <p className="glass animate-float absolute -left-3 top-6 hidden items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] text-ink sm:inline-flex lg:-left-5">
            <Sparkles size={13} className="text-accent-ink" aria-hidden="true" /> vibe coding
          </p>

          <CodeWindow lines={code} filename="developer.ts" className="absolute -bottom-12 -left-16 hidden w-[360px] lg:block" />
        </div>
      </div>
    </section>
  );
}
