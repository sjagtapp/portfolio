/**
 * ─────────────────────────────────────────────────────────────
 *  SITE IDENTITY — edit this file first.
 *  Anything wrapped in [BRACKETS] is a placeholder. Components
 *  detect placeholders (see lib/placeholders.ts) and render them
 *  as disabled / "not set" states instead of broken links.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  /** Your full name. Used in the hero, navbar, metadata and JSON-LD. */
  name: "[YOUR NAME]",
  /** Short handle used in the terminal prompt, e.g. "arjun" → arjun@portfolio */
  handle: "dev",
  /** Primary title shown under your name. */
  role: "Full Stack Developer",
  /** Rotating secondary titles in the hero (keep 2–4, short). */
  roles: ["Full Stack Developer", "Software Developer", "AI-curious Builder"],
  /** One or two sentences. Shown in the hero and in <meta description>. */
  intro:
    "[ADD A SHORT PROFESSIONAL INTRODUCTION — e.g. I build fast, accessible web applications with React, Next.js and Node.js, and I'm exploring how AI can make software feel more human.]",
  /** Location shown in About and Contact. */
  location: "[YOUR CITY, COUNTRY]",
  /** Contact email. Set a real address to enable the mailto fallback in the contact form. */
  email: "[YOUR EMAIL]",
  /** Public site URL — used for Open Graph, sitemap and robots. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** GitHub username (no @). Leave empty to show the "connect GitHub" placeholder. */
  githubUsername: "",
  /** Path to your resume inside /public. Drop the file at public/resume.pdf. */
  resumePath: "/resume.pdf",
  /** Profile photo path inside /public. Replace public/images/profile.jpg with your photo. */
  profileImage: "/images/profile.jpg",
  /** About-section photo path inside /public. Replace public/images/about.jpg. */
  aboutImage: "/images/about.jpg",
  /** Social links. Replace placeholders with full URLs. */
  socials: {
    github: "[ADD GITHUB URL]",
    linkedin: "[ADD LINKEDIN URL]",
    twitter: "[ADD X/TWITTER URL]",
  },
  /** Availability line shown in the hero status pill. */
  availability: "Open to full-time roles and freelance projects",
} as const;

export type Site = typeof site;
