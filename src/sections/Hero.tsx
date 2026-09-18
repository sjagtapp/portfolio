"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { Terminal } from "@/components/Terminal";
import { XIcon } from "@/components/ui/XIcon";
import { isPlaceholder, humanize } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

const fade = (delay: number, reduce: boolean | null) => ({
  initial: reduce ? false : { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

/** Cycles through site.roles with a masked slide. */
function RoleTicker() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce || site.roles.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % site.roles.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom" aria-live="polite">
      {site.roles.map((r, idx) => (
        <span
          key={r}
          aria-hidden={idx !== i}
          className={cn(
            "absolute left-0 top-0 whitespace-nowrap transition-[transform,opacity] duration-700 ease-out-expo",
            idx === i ? "translate-y-0 opacity-100" : idx < i ? "-translate-y-full opacity-0" : "translate-y-full opacity-0",
          )}
        >
          {r}
        </span>
      ))}
      <span className="invisible whitespace-nowrap">{site.roles.reduce((a, b) => (a.length > b.length ? a : b))}</span>
    </span>
  );
}

export function Hero({ hasResume }: { hasResume: boolean }) {
  const reduce = useReducedMotion();
  const namePlaceholder = isPlaceholder(site.name);
  const socials = [
    { label: "GitHub", href: site.socials.github, Icon: Github },
    { label: "LinkedIn", href: site.socials.linkedin, Icon: Linkedin },
    { label: "X", href: site.socials.twitter, Icon: XIcon },
  ];

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <motion.div {...fade(0.1, reduce)} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.02] px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-fg-muted">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-gold animate-pulse-ring" /><span className="relative inline-flex h-2 w-2 rounded-full bg-gold" /></span>
            {site.availability}
          </motion.div>

          <motion.p {...fade(0.2, reduce)} className="mb-4 font-mono text-[13px] tracking-[0.2em] text-gold uppercase">
            Hello, I&apos;m
          </motion.p>

          {/* Replace site.name in src/data/site.ts — the placeholder renders with a dashed outline. */}
          <TextReveal
            as="h1"
            id="hero-title"
            text={namePlaceholder ? humanize(site.name) : site.name}
            delay={0.3}
            className={cn(
              "font-display text-[clamp(2.75rem,8vw,6.25rem)] font-extrabold leading-[0.95] tracking-[-0.04em]",
              namePlaceholder && "rounded-lg outline-dashed outline-1 outline-gold/40 outline-offset-8 text-fg-muted",
            )}
          />

          <motion.p {...fade(0.6, reduce)} className="mt-5 font-display text-2xl font-semibold tracking-tight text-fg-muted sm:text-3xl md:text-[2.1rem]">
            <RoleTicker />
          </motion.p>

          <motion.p {...fade(0.75, reduce)} className={cn("mt-6 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg", isPlaceholder(site.intro) && "italic text-fg-subtle")}>
            {isPlaceholder(site.intro) ? humanize(site.intro) : site.intro}
          </motion.p>

          <motion.div {...fade(0.9, reduce)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#projects" size="lg">View projects <ArrowDown size={16} className="transition-transform group-hover/btn:translate-y-0.5" /></Button>
            <Button href="#contact" variant="gold" size="lg">Contact me <ArrowUpRight size={16} /></Button>
            <Button href={hasResume ? site.resumePath : "[ADD RESUME]"} variant="ghost" size="lg" download placeholderHint="Add public/resume.pdf to enable">
              <Download size={16} /> Resume
            </Button>
          </motion.div>

          <motion.ul {...fade(1.05, reduce)} className="mt-8 flex items-center gap-2" aria-label="Social links">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                {isPlaceholder(href) ? (
                  <span title={`Add your ${label} URL in src/data/site.ts`} className="grid h-10 w-10 place-items-center rounded-full border border-dashed border-line-strong text-fg-subtle"><Icon size={16} /></span>
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} data-cursor="hover" className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-fg-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold-soft">
                    <Icon size={16} />
                  </a>
                )}
              </li>
            ))}
            <li className="ml-2 font-mono text-[11px] tracking-wider text-fg-subtle">{site.location}</li>
          </motion.ul>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative [perspective:1200px]"
        >
          <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_top,rgba(201,162,74,0.16),transparent_60%)] blur-2xl" />
          <Terminal />
          <div aria-hidden="true" className="pointer-events-none absolute -right-3 -top-3 hidden rounded-full border border-gold/40 bg-bg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold md:block">
            interactive
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        {...fade(1.4, reduce)}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle md:flex"
        data-cursor="hover"
      >
        scroll
        <span className="block h-10 w-px overflow-hidden bg-line-strong">
          <span className="block h-1/2 w-full animate-scrollhint bg-gold" />
        </span>
      </motion.a>
    </section>
  );
}
