/**
 * ─────────────────────────────────────────────────────────────
 *  SERVICES — what you offer, written for non-technical clients.
 *  Each `description` should answer "what do I get?" in plain words.
 *  `icon` picks one of the icons mapped in sections/Services.tsx.
 * ─────────────────────────────────────────────────────────────
 */

export type ServiceIcon = "business" | "landing" | "shop" | "app" | "redesign" | "maintenance" | "seo";

export interface Service {
  title: string;
  description: string;
  icon: ServiceIcon;
}

export const services: Service[] = [
  {
    title: "Business websites",
    icon: "business",
    description:
      "A professional website that tells people who you are, what you offer and how to reach you — so customers can find and trust you online.",
  },
  {
    title: "Landing pages",
    icon: "landing",
    description:
      "A single, focused page for one product, offer or event, designed to turn visitors into enquiries, bookings or sales.",
  },
  {
    title: "E-commerce stores",
    icon: "shop",
    description:
      "An online shop where customers can browse your products, add them to a cart and pay securely — open for business 24/7.",
  },
  {
    title: "Custom web apps",
    icon: "app",
    description:
      "Tools built around how your business works — booking systems, dashboards, internal trackers — so your team spends less time on manual work.",
  },
  {
    title: "Website redesigns",
    icon: "redesign",
    description:
      "Give an old or slow website a fresh, modern look that works well on phones and makes a better first impression.",
  },
  {
    title: "Website maintenance",
    icon: "maintenance",
    description:
      "I keep your site updated, backed up and running smoothly, and make changes whenever you need them — so you don't have to think about it.",
  },
  {
    title: "SEO basics",
    icon: "seo",
    description:
      "Setting up your site so Google understands it, helping more customers find you when they search for what you offer.",
  },
];

/** "How we'll work together" — the steps a client goes through. */
export const processSteps = [
  {
    title: "Free consultation",
    description: "Tell me about your business and what you need. We talk it through on a call or WhatsApp — no obligation.",
  },
  {
    title: "Clear plan & quote",
    description: "You get a simple plan covering what's included, the timeline and the cost, before any work starts.",
  },
  {
    title: "Design & build",
    description: "I build your site and share progress along the way, so you can give feedback early and often.",
  },
  {
    title: "Launch & support",
    description: "I put your site live, show you how to use it, and stay available for updates and maintenance.",
  },
];
