import { allSkills } from "@/data/skills";
import { Marquee } from "@/components/fx/Marquee";

/** Scrolling strip of the tech stack between the intro and the services. */
export function SkillsMarquee() {
  return (
    <section aria-label="Technologies I work with" className="border-y border-line bg-surface/40 py-6">
      <Marquee items={allSkills} />
    </section>
  );
}
