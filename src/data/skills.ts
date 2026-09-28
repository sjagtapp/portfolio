/**
 * ─────────────────────────────────────────────────────────────
 *  SKILLS — shown in the scrolling tech strip under the intro.
 *  Remove anything you don't use; add what you do.
 * ─────────────────────────────────────────────────────────────
 */

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  { label: "Frontend", skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
  { label: "Backend", skills: ["Node.js", "Express", "PHP"] },
  { label: "Databases", skills: ["MySQL", "MongoDB", "Firebase"] },
  { label: "Languages & tools", skills: ["Java", "Python", "Git"] },
];

export const allSkills = skillGroups.flatMap((g) => g.skills);
