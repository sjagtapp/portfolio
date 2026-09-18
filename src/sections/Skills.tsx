"use client";

import { useState } from "react";
import { skillCategories } from "@/data/skills";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { Constellation } from "@/components/Constellation";
import { cn } from "@/lib/utils";

/**
 * Skills = constellation (visual) + category cards (scannable).
 * Hovering / focusing a category lights up its cluster in the canvas.
 * No percentage bars — the data only knows core / working / exploring.
 */
export function Skills() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Section id="skills">
      <SectionHeading
        id="skills-title"
        eyebrow="skills"
        title="The stack I reach for."
        description="Hover a category to light up its cluster. Node size reflects how central a tool is to my work today — not a made-up percentage."
      />

      <Reveal>
        <Constellation activeCategory={active} />
      </Reveal>

      <Stagger className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" stagger={0.06}>
        {skillCategories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <StaggerItem key={cat.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(cat.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(cat.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive((a) => (a === cat.id ? null : cat.id))}
                aria-pressed={isActive}
                className={cn(
                  "group h-full w-full rounded-2xl border p-5 text-left transition-all duration-300",
                  isActive ? "border-gold/60 bg-gold-dim/60 shadow-gold" : "border-line bg-white/[0.015] hover:border-line-strong",
                )}
                data-cursor="hover"
              >
                <span className="flex items-baseline justify-between">
                  <span className="font-display text-base font-bold tracking-tight">{cat.label}</span>
                  <span className="font-mono text-[10px] text-fg-subtle">{cat.skills.length}</span>
                </span>
                <span className="mt-1 block text-[12px] leading-snug text-fg-muted">{cat.blurb}</span>
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s.name}
                      className={cn(
                        "rounded-md border px-2 py-0.5 font-mono text-[11px] transition-colors duration-300",
                        isActive ? "border-gold/40 text-gold-soft" : "border-line-strong text-fg-muted group-hover:text-fg",
                        s.level === "exploring" && "border-dashed",
                      )}
                      title={s.note ?? s.level}
                    >
                      {s.name}
                    </span>
                  ))}
                </span>
              </button>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
