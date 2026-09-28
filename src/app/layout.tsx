import type { Metadata, Viewport } from "next";
import { Geist_Mono, Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/data/site";
import { allSkills } from "@/data/skills";
import { services } from "@/data/services";
import { isPlaceholder } from "@/lib/placeholders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Background } from "@/components/fx/Background";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
/* Wide, bold geometric face for headings */
const montserrat = Montserrat({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-montserrat", display: "swap" });

const title = `${site.name} — ${site.role} in ${site.location.split(",")[0]}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.pitch,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: ["freelance web developer", `web developer ${site.location}`, ...services.map((s) => s.title), ...allSkills],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title,
    description: site.pitch,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description: site.pitch },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** schema.org Person, for search engines. Placeholder links are omitted. */
function jsonLd() {
  const sameAs = Object.values(site.socials).filter((u) => !isPlaceholder(u));
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.pitch,
    url: site.url,
    email: `mailto:${site.email}`,
    telephone: `+${site.phoneDigits}`,
    address: { "@type": "PostalAddress", addressLocality: site.location },
    knowsAbout: allSkills,
    ...(sameAs.length ? { sameAs } : {}),
  });
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${geistMono.variable} ${montserrat.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-on-accent"
        >
          Skip to content
        </a>
        <Background />
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      </body>
    </html>
  );
}
