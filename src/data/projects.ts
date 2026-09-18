/**
 * ─────────────────────────────────────────────────────────────
 *  PROJECTS — add / edit your real projects here.
 *  The UI (cards, detail pages, terminal, sitemap) is generated
 *  from this array. You never need to touch a component.
 *
 *  Images: drop files into  public/images/projects/<slug>/
 *    thumbnail.jpg      → card image           (16:10 recommended)
 *    cover.jpg          → detail page hero     (21:9 recommended)
 *    screenshot-1.jpg … → detail page gallery
 *  Then set the paths below. Missing files fall back to a designed
 *  placeholder automatically — nothing ever renders broken.
 *
 *  Placeholders: any "[BRACKETED]" string renders as a placeholder.
 * ─────────────────────────────────────────────────────────────
 */

export type ProjectCategory = "Web App" | "Website" | "Machine Learning" | "Tool" | "Other";

export interface ProjectLinks {
  /** Full GitHub repository URL, or "[ADD GITHUB LINK]". */
  github?: string;
  /** Live demo URL, or "[ADD LIVE DEMO LINK]". */
  live?: string;
}

export interface Project {
  /** URL slug: /projects/<slug>. Lowercase, hyphenated, unique. */
  slug: string;
  name: string;
  /** One line under the name. */
  tagline: string;
  /** 1–2 sentence description for the card. */
  description: string;
  category: ProjectCategory;
  /** Year or range, e.g. "2025" or "2024 – 2025". */
  year: string;
  /** Show in the featured (large) row on the home page. */
  featured?: boolean;
  /** Enables the "Case study" button + detail page sections below. */
  caseStudy?: boolean;
  techStack: string[];
  /** Detail-page content. Use placeholders until you fill them in. */
  problem: string;
  solution: string;
  features: string[];
  process: string[];
  challenges: string[];
  results: string[];
  images: {
    thumbnail?: string;
    cover?: string;
    screenshots?: string[];
  };
  links: ProjectLinks;
}

export const projects: Project[] = [
  {
    slug: "planngo",
    name: "PlanNGo",
    tagline: "Travel planning web application",
    description: "[PROJECT DESCRIPTION — what PlanNGo does and who it is for, in one or two sentences.]",
    category: "Web App",
    year: "[YEAR]",
    featured: true,
    caseStudy: true,
    techStack: ["[TECH STACK]"],
    problem: "[PROBLEM — what was hard or broken before this project existed?]",
    solution: "[SOLUTION — how PlanNGo approaches that problem.]",
    features: ["[KEY FEATURE 1]", "[KEY FEATURE 2]", "[KEY FEATURE 3]"],
    process: ["[DEVELOPMENT PROCESS — research, design, build, test…]"],
    challenges: ["[CHALLENGE — something that was genuinely difficult and how you handled it.]"],
    results: ["[RESULT — outcome, usage, learning, or metric.]"],
    images: {
      thumbnail: "[ADD SCREENSHOT] /images/projects/planngo/thumbnail.jpg",
      cover: "[ADD SCREENSHOT] /images/projects/planngo/cover.jpg",
      screenshots: [],
    },
    links: { github: "[ADD GITHUB LINK]", live: "[ADD LIVE DEMO LINK]" },
  },
  {
    slug: "trustloop",
    name: "TrustLoop",
    tagline: "QR-based feedback, ratings, analytics and dashboards",
    description:
      "[PROJECT DESCRIPTION — a modern web application involving QR/scanning, feedback, ratings, analytics and dashboards.]",
    category: "Web App",
    year: "[YEAR]",
    featured: true,
    caseStudy: true,
    techStack: ["[TECH STACK]"],
    problem: "[PROBLEM]",
    solution: "[SOLUTION]",
    features: ["[KEY FEATURE 1]", "[KEY FEATURE 2]", "[KEY FEATURE 3]"],
    process: ["[DEVELOPMENT PROCESS]"],
    challenges: ["[CHALLENGE]"],
    results: ["[RESULT]"],
    images: {
      thumbnail: "[ADD SCREENSHOT] /images/projects/trustloop/thumbnail.jpg",
      cover: "[ADD SCREENSHOT] /images/projects/trustloop/cover.jpg",
      screenshots: [],
    },
    links: { github: "[ADD GITHUB LINK]", live: "[ADD LIVE DEMO LINK]" },
  },
  {
    slug: "zonovva",
    name: "Zonovva",
    tagline: "Creative agency / web development project",
    description: "[PROJECT DESCRIPTION — what Zonovva is and what you built for it.]",
    category: "Website",
    year: "[YEAR]",
    featured: false,
    caseStudy: false,
    techStack: ["[TECH STACK]"],
    problem: "[PROBLEM]",
    solution: "[SOLUTION]",
    features: ["[KEY FEATURE 1]", "[KEY FEATURE 2]"],
    process: ["[DEVELOPMENT PROCESS]"],
    challenges: ["[CHALLENGE]"],
    results: ["[RESULT]"],
    images: {
      thumbnail: "[ADD SCREENSHOT] /images/projects/zonovva/thumbnail.jpg",
      cover: "[ADD SCREENSHOT] /images/projects/zonovva/cover.jpg",
      screenshots: [],
    },
    links: { github: "[ADD GITHUB LINK]", live: "[ADD LIVE DEMO LINK]" },
  },
  {
    slug: "ml-disease-prediction",
    name: "[ML PROJECT NAME]",
    tagline: "Machine learning project (e.g. disease prediction)",
    description: "[PROJECT DESCRIPTION — the dataset, the model, and what it predicts.]",
    category: "Machine Learning",
    year: "[YEAR]",
    featured: false,
    caseStudy: true,
    techStack: ["Python", "[ADD LIBRARIES — e.g. scikit-learn, pandas]"],
    problem: "[PROBLEM]",
    solution: "[SOLUTION — model choice, training approach, evaluation.]",
    features: ["[KEY FEATURE 1]", "[KEY FEATURE 2]"],
    process: ["[DEVELOPMENT PROCESS — data cleaning, feature engineering, training, evaluation]"],
    challenges: ["[CHALLENGE]"],
    results: ["[RESULT — accuracy / F1 / what you learned]"],
    images: {
      thumbnail: "[ADD SCREENSHOT] /images/projects/ml-disease-prediction/thumbnail.jpg",
      cover: "[ADD SCREENSHOT] /images/projects/ml-disease-prediction/cover.jpg",
      screenshots: [],
    },
    links: { github: "[ADD GITHUB LINK]" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
