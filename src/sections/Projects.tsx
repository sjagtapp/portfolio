import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger } from "@/components/ui/Reveal";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { ProjectCard } from "@/components/ProjectCard";

/**
 * Featured projects get the large card; the rest fill a two-column grid.
 * Everything comes from src/data/projects.ts.
 */
export function Projects() {
  const ordered = [...projects].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
  return (
    <Section id="projects">
      <SectionHeading
        id="projects-title"
        eyebrow="projects"
        title="Things I've built."
        description="Real projects, with the problem each one solves. Open any card for the full story — process, challenges, and results."
      />
      <Stagger className="grid gap-5 md:grid-cols-2" stagger={0.1}>
        {ordered.map((p, i) => (
          <StaggerItem key={p.slug} className={p.featured ? "md:col-span-2" : undefined}>
            <ProjectCard project={p} index={i} size={p.featured ? "large" : "default"} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
