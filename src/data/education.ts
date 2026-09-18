/**
 * ─────────────────────────────────────────────────────────────
 *  EDUCATION — most recent first.
 * ─────────────────────────────────────────────────────────────
 */

export interface Education {
  degree: string;
  institution: string;
  /** e.g. "2022 – 2026" */
  year: string;
  location?: string;
  coursework: string[];
  achievements: string[];
}

export const education: Education[] = [
  {
    degree: "[DEGREE — e.g. B.E. in Computer Engineering]",
    institution: "[COLLEGE / UNIVERSITY]",
    year: "[START YEAR] – [END YEAR]",
    location: "[LOCATION]",
    coursework: ["[RELEVANT COURSE 1]", "[RELEVANT COURSE 2]", "[RELEVANT COURSE 3]"],
    achievements: ["[ACHIEVEMENT — optional; delete if none]"],
  },
];
