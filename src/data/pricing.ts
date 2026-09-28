/**
 * ─────────────────────────────────────────────────────────────
 *  PRICING — the "Want a …?" package cards on /pricing.
 *
 *  `price` is optional: leave it "" and the card just shows the
 *  "Let's build this" button (opens WhatsApp with the package pre-filled).
 *  Add a price like "₹9,999" when you're ready and it appears on the card.
 *  `freeSupport: true` shows the "3 months free support" badge.
 * ─────────────────────────────────────────────────────────────
 */

export type PackageIcon = "page" | "website" | "portfolio" | "shop" | "app" | "redesign" | "seo" | "care";

export interface PricingPackage {
  /** Code-style label, e.g. "need --website". */
  command: string;
  /** Short question, e.g. "Want a website?" */
  title: string;
  /** Who it's for / what it is, in one line. */
  description: string;
  features: string[];
  icon: PackageIcon;
  /** e.g. "₹9,999" — leave "" until you decide. */
  price: string;
  /** e.g. "one-time", "per month", "starting from". */
  priceNote?: string;
  freeSupport?: boolean;
  /** Visually emphasises one card, e.g. your most popular package. */
  highlighted?: boolean;
}

/** Months of free support after handover, shown on the page banner and badges. */
export const freeSupportMonths = 3;

export const packages: PricingPackage[] = [
  {
    command: "need --webpage",
    title: "Want a webpage?",
    description: "One focused page for a product, offer, event or launch.",
    icon: "page",
    features: ["Single scrolling page", "Mobile-friendly design", "Enquiry form + WhatsApp button", "Live in days, not weeks"],
    price: "",
    freeSupport: true,
  },
  {
    command: "need --website",
    title: "Want a website?",
    description: "A complete, professional site for your business.",
    icon: "website",
    features: ["Up to 6 pages (Home, About, Services…)", "Your logo, colours and content", "Google Maps, contact form & WhatsApp", "Basic Google (SEO) setup"],
    price: "",
    freeSupport: true,
    highlighted: true,
  },
  {
    command: "need --portfolio",
    title: "Want a portfolio?",
    description: "Show your work: for doctors, artists, coaches, creators and freelancers.",
    icon: "portfolio",
    features: ["Gallery of your work", "About + services + testimonials", "Easy booking or contact", "Looks great when you share the link"],
    price: "",
    freeSupport: true,
  },
  {
    command: "need --online-store",
    title: "Want to sell online?",
    description: "An online shop that takes orders and payments 24/7.",
    icon: "shop",
    features: ["Product catalogue with categories", "Cart, checkout & online payments", "Order notifications", "Simple admin to add products"],
    price: "",
    freeSupport: true,
  },
  {
    command: "need --web-app",
    title: "Want a custom web app?",
    description: "Booking systems, dashboards, trackers — built around how you work.",
    icon: "app",
    features: ["Built for your exact workflow", "Login for your team or customers", "Reports and dashboards", "Scales as your business grows"],
    price: "",
    freeSupport: true,
  },
  {
    command: "need --redesign",
    title: "Want a fresh look?",
    description: "Turn an old or slow website into a modern, fast one.",
    icon: "redesign",
    features: ["Modern design, same content (or better)", "Faster loading", "Works properly on phones", "No downtime while switching"],
    price: "",
    freeSupport: true,
  },
  {
    command: "need --google",
    title: "Want to be found on Google?",
    description: "Get your business showing up when customers search.",
    icon: "seo",
    features: ["Google Business Profile setup", "On-page SEO for your site", "Search Console & analytics", "Monthly tips to rank better"],
    price: "",
  },
  {
    command: "need --care-plan",
    title: "Want zero website worries?",
    description: "Ongoing care after your free support ends.",
    icon: "care",
    features: ["Updates, backups & security", "Small text and photo changes", "Uptime monitoring", "Priority help on WhatsApp"],
    price: "",
    priceNote: "per month",
  },
];
