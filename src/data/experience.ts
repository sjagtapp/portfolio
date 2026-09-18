/**
 * ─────────────────────────────────────────────────────────────
 *  EXPERIENCE — most recent first.
 *  Replace placeholders; delete entries you don't need; add more.
 * ─────────────────────────────────────────────────────────────
 */

export interface Experience {
  company: string;
  role: string;
  /** e.g. "Jun 2024 – Present" */
  duration: string;
  /** e.g. "Remote" or "Pune, India" */
  location?: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  /** Optional company URL. */
  url?: string;
}

export const experience: Experience[] = [
  {
    company: "[COMPANY NAME]",
    role: "[ROLE — e.g. Full Stack Developer Intern]",
    duration: "[START] – [END]",
    location: "[LOCATION]",
    responsibilities: ["[RESPONSIBILITY 1]", "[RESPONSIBILITY 2]", "[RESPONSIBILITY 3]"],
    technologies: ["[TECH]", "[TECH]"],
    achievements: ["[ACHIEVEMENT — optional; delete this line if none]"],
    url: "[ADD COMPANY URL]",
  },
  {
    company: "[PREVIOUS COMPANY / FREELANCE]",
    role: "[ROLE]",
    duration: "[START] – [END]",
    location: "[LOCATION]",
    responsibilities: ["[RESPONSIBILITY 1]", "[RESPONSIBILITY 2]"],
    technologies: ["[TECH]"],
    achievements: [],
  },
];
