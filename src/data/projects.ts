/**
 * ─────────────────────────────────────────────────────────────
 *  WORK — the client projects shown on the home page.
 *
 *  Screenshot: save a picture of the site's home page as
 *    public/images/work/<slug>.jpg   (or .png / .webp)
 *  A wide desktop screenshot works best; it is shown 16:9, anchored top-left.
 *  It's picked up automatically — no path to set here.
 *
 *  `url`: the live website. Leave "" to hide the "Visit website" link.
 * ─────────────────────────────────────────────────────────────
 */

export interface Project {
  /** Lowercase, hyphenated. Also the screenshot file name. */
  slug: string;
  name: string;
  /** Who it was built for. Use "Own product" for your own apps. */
  client: string;
  /** Short label, e.g. "Business website", "Internal web app". */
  type: string;
  /** One or two plain-English sentences: what it is and what it does. */
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    slug: "planngo",
    name: "Plango",
    client: "Travel agency",
    type: "Travel booking website",
    description:
      "A travel agency website where travellers search destinations, browse featured tour packages and book their trip online.",
    url: "",
  },
  {
    slug: "trustloop",
    name: "TrustLoop",
    client: "Zonovva Pvt. Ltd.",
    type: "Web app",
    description:
      "A review-tracking app: each business gets a QR code and link for customer ratings, with a dashboard showing visits, ratings and trends.",
    url: "",
  },
  {
    slug: "imaginex",
    name: "ImagineX",
    client: "Zonovva Pvt. Ltd.",
    type: "Business website",
    description:
      "The website for ImagineX Web Solutions by Zonovva, showcasing its managed website plans, pricing and process so businesses can pick a plan.",
    url: "",
  },
  {
    slug: "makeup-studio",
    name: "Shubhangi Jagtap Makeup Studio",
    client: "Shubhangi Jagtap",
    type: "Academy website",
    description:
      "An elegant website for a makeup academy in Barshi, Solapur, presenting its courses and curriculum and letting students enquire or book a seat.",
    url: "",
  },
  {
    slug: "campus-compass",
    name: "CampusCompass",
    client: "Own product",
    type: "College discovery platform",
    description:
      "Helps students search and compare colleges across India, and predicts their admission chances from exam rank and past cutoffs.",
    url: "",
  },
  {
    slug: "readme-ai",
    name: "README AI",
    client: "Own product",
    type: "AI web app",
    description: "Paste any GitHub repository link and get a professional, ready-to-use README written by AI, with a live editor to refine it.",
    url: "",
  },
  {
    slug: "ai-orbit",
    name: "AI Orbit",
    client: "Own product",
    type: "AI tools directory",
    description: "A searchable directory of AI tools with filters by category, pricing and rating, plus reviews and favourites.",
    url: "",
  },
];
