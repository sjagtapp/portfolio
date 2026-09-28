import { processSteps } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/fx/SpotlightGroup";
import { Stagger, StaggerItem } from "@/components/fx/Reveal";
import { DrawLine } from "@/components/fx/DrawLine";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading id="process-title" index="03" eyebrow="Process" title="How we work">
          A simple, transparent process, so you always know what&apos;s happening and what comes next.
        </SectionHeading>

        <SpotlightGroup className="relative mt-14">
          {/* Glow behind the cards, seen through the frosted glass */}
          <span aria-hidden="true" className="orb animate-breathe left-1/4 top-1/4 h-56 w-1/2 opacity-40" />
          {/* Connecting line that draws itself across the steps (desktop). */}
          <DrawLine className="absolute left-0 right-0 top-1/2 hidden lg:block" />
          <Stagger as="ol" className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <StaggerItem
                key={step.title}
                className="glass spotlight group flex flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 lg:odd:translate-y-6 lg:odd:hover:translate-y-5"
              >
                <h3 className="font-display text-sm font-bold uppercase tracking-wide">{step.title}</h3>
                <span className="mt-3 font-display text-6xl font-extrabold leading-none text-white/90 transition-colors duration-300 group-hover:text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">{step.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </SpotlightGroup>
      </div>
    </section>
  );
}
