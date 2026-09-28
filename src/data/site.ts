/**
 * ─────────────────────────────────────────────────────────────
 *  SITE IDENTITY — who you are and how clients reach you.
 *  Anything wrapped in [BRACKETS] is "not added yet" and is
 *  hidden on the site until you replace it (see lib/placeholders.ts).
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Nakshtraa Jagtap",
  /** Shown under your name in the hero, and in page titles. */
  role: "Full Stack Web Developer & Freelancer",
  /** Your one-line pitch to clients. Also the <meta description>. */
  pitch: "I build fast, modern websites and web apps that help businesses grow online.",
  location: "Pune, India",
  email: "nakshtraajagtap004@gmail.com",
  /** Display format for the phone number. */
  phone: "+91 90114 60436",
  /** Digits only, with country code — used for tel: and WhatsApp links. */
  phoneDigits: "919011460436",
  /** Pre-filled first message when a visitor taps "WhatsApp me". */
  whatsappMessage: "Hi Nakshtraa, I found your portfolio and I'd like to talk about a website.",
  /** Opening line in the hero pill. Set to "" to hide it. */
  tagline: "Every big business starts with one small step online",
  /** Public site URL — used for Open Graph, sitemap and robots. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Headline numbers shown in the hero. */
  stats: [
    { value: "4+", label: "Years of experience" },
    { value: "12+", label: "Happy clients" },
  ],
  /** Social links. Leave the [BRACKETS] in place until you have the URL — they stay hidden. */
  socials: {
    linkedin: "[ADD LINKEDIN URL]",
    github: "[ADD GITHUB URL]",
    instagram: "[ADD INSTAGRAM URL]",
  },
  /** About-section paragraphs. */
  bio: [
    "I'm a full stack web developer and freelancer based in Pune, with 4+ years of experience building websites and web apps for businesses, and hands-on experience working directly with real clients on live projects.",
    "I handle everything from design to going live, so you have one person to talk to. Where your business lacks tech know-how, my technical support fills the gap — you focus on your customers, I take care of the website.",
    "I keep things simple: clear communication, honest timelines, and a website you're proud to share with your customers.",
  ],
} as const;

export type Site = typeof site;

/** "Nakshtraa Jagtap" → "NJ". Used for the logo mark and the photo placeholder. */
export const initials = site.name
  .split(/\s+/)
  .map((w) => w[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export const whatsappUrl = `https://wa.me/${site.phoneDigits}?text=${encodeURIComponent(site.whatsappMessage)}`;
export const phoneUrl = `tel:+${site.phoneDigits}`;
export const emailUrl = `mailto:${site.email}`;
