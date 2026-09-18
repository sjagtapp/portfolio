/**
 * ─────────────────────────────────────────────────────────────
 *  SKILLS — only what is listed here is rendered.
 *  Remove anything you don't actually use; add what you do.
 *  `level` is deliberately NOT a percentage. It only affects the
 *  size of the node in the constellation: "core" | "working" | "exploring".
 * ─────────────────────────────────────────────────────────────
 */

export type SkillLevel = "core" | "working" | "exploring";

export interface Skill {
  name: string;
  level: SkillLevel;
  /** Optional one-liner shown on hover. */
  note?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  /** Short description shown under the category label. */
  blurb: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Interfaces that feel fast and considered.",
    skills: [
      { name: "HTML", level: "core" },
      { name: "CSS", level: "core" },
      { name: "JavaScript", level: "core" },
      { name: "React", level: "core" },
      { name: "Next.js", level: "core" },
      { name: "Tailwind CSS", level: "core" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "APIs, auth, and the parts users never see.",
    skills: [
      { name: "Node.js", level: "core" },
      { name: "Express", level: "working" },
      { name: "PHP", level: "working" },
      { name: "REST APIs", level: "core" },
    ],
  },
  {
    id: "database",
    label: "Database",
    blurb: "Modelling data so it stays useful.",
    skills: [
      { name: "MySQL", level: "working" },
      { name: "MongoDB", level: "working" },
      { name: "Firebase", level: "working" },
    ],
  },
  {
    id: "languages",
    label: "Programming",
    blurb: "Beyond the browser.",
    skills: [
      { name: "Java", level: "working" },
      { name: "Python", level: "working" },
    ],
  },
  {
    id: "other",
    label: "Tools & Beyond",
    blurb: "Shipping, collaborating, and learning what's next.",
    skills: [
      { name: "Git", level: "core" },
      { name: "GitHub", level: "core" },
      { name: "Cloud", level: "exploring" },
      { name: "Machine Learning", level: "exploring" },
      { name: "Data Analytics", level: "exploring" },
    ],
  },
];

export const allSkills = skillCategories.flatMap((c) => c.skills.map((s) => ({ ...s, category: c.id })));
