/**
 * ─────────────────────────────────────────────────────────────
 *  ABOUT — highlights shown next to the bio.
 * ─────────────────────────────────────────────────────────────
 */

/** Plain-English promises a non-technical client cares about. `icon` is mapped in sections/About.tsx. */
export const benefits = [
  { icon: "phone", title: "Looks great on every phone", description: "Most of your customers visit from a mobile. Your site will look sharp on every screen." },
  { icon: "speed", title: "Loads in a blink", description: "Fast pages keep visitors from leaving before they see what you offer." },
  { icon: "search", title: "Easy to find on Google", description: "Set up so people searching for your service can actually find you." },
  { icon: "support", title: "Support after launch", description: "Need a change or stuck on something? I'm one message away." },
] as const;

/** Work experience. Newest first. */
export const experience = [
  {
    role: "Freelance Full Stack Web Developer",
    place: "Self-employed · clients across India and abroad",
    period: "4+ years",
    description: "Designing, building and launching websites and web apps for businesses, from first call to go-live and ongoing support.",
  },
];

/** Published research. Leave `venue`/`year`/`url` as "[…]" until you have them — they stay hidden. */
export const publications = [
  {
    title: "Study on Cloud Computing: Applications with Special Focus on Education",
    venue: "[PUBLICATION / JOURNAL NAME]",
    year: "[YEAR]",
    url: "[ADD PAPER LINK]",
  },
];

/** Certified courses. Add each course as a string, e.g. "Advanced Java — Coursera"; the list shows under the card. */
export const certifications = {
  title: "Certified courses in advanced programming languages",
  description: "Completed certified courses covering advanced programming languages and modern web development.",
  courses: [] as string[],
};
