/**
 * ─────────────────────────────────────────────────────────────
 *  RESEARCH / PUBLICATIONS
 *  Leave the array empty to hide the section entirely.
 * ─────────────────────────────────────────────────────────────
 */

export interface Publication {
  title: string;
  /** Journal / conference / platform */
  venue: string;
  year: string;
  authors?: string;
  abstract: string;
  /** Link to the paper (DOI, PDF in /public, or publisher page). */
  url?: string;
  tags?: string[];
}

export const research: Publication[] = [
  {
    title: "Study on Cloud Computing: Applications with Special Focus on Education",
    venue: "[PUBLICATION / CONFERENCE NAME]",
    year: "[YEAR]",
    authors: "[AUTHORS]",
    abstract:
      "[SHORT ABSTRACT — 2–4 sentences summarising the scope of the study, the applications examined, and the findings about cloud computing in education.]",
    url: "[ADD PAPER LINK]",
    tags: ["Cloud Computing", "Education", "Research"],
  },
];
