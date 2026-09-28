import type { Metadata } from "next";
import { AppWindow, ArrowRight, Check, FileText, Gift, Globe, HeartHandshake, RefreshCcw, Search, ShoppingCart, UserSquare } from "lucide-react";
import { freeSupportMonths, packages, type PackageIcon, type PricingPackage } from "@/data/pricing";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { SpotlightGroup } from "@/components/fx/SpotlightGroup";
import { Reveal, Stagger, StaggerItem } from "@/components/fx/Reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Websites, webpages, portfolios, online stores and web apps — every build includes ${freeSupportMonths} months of free support.`,
};

const icons: Record<PackageIcon, typeof Globe> = {
  page: FileText,
  website: Globe,
  portfolio: UserSquare,
  shop: ShoppingCart,
  app: AppWindow,
  redesign: RefreshCcw,
  seo: Search,
  care: HeartHandshake,
};

/** WhatsApp chat pre-filled with the package the visitor is asking about. */
const startChat = (p: PricingPackage) =>
  `https://wa.me/${site.phoneDigits}?text=${encodeURIComponent(
    `Hi ${site.name.split(" ")[0]}, ${p.title.replace(/^Want/, "I want").replace(/\?$/, ".")} Can we talk about it?`,
  )}`;

export default function PricingPage() {
  return (
    <section aria-labelledby="pricing-title" className="container-x relative pt-28 pb-20 sm:pt-32 md:pb-28">
      <Reveal className="relative max-w-3xl">
        <span aria-hidden="true" className="orb animate-breathe -left-16 -top-10 h-44 w-72 opacity-50" />
        <p className="relative font-mono text-[13px] text-accent-ink">
          <span className="text-ink-subtle">{"//"}</span> pricing
        </p>
        <h1 id="pricing-title" className="relative mt-4 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-6xl">
          What do you <span className="text-gradient">need?</span>
        </h1>
        <p className="relative mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted text-pretty">
          Pick what fits your business. You&apos;ll always know the cost before any work starts, with no surprises along the way.
        </p>
      </Reveal>

      {/* Free support banner */}
      <Reveal delay={0.1} className="mt-10">
        <div className="glow-border rounded-2xl">
          <div className="flex flex-col gap-4 rounded-[calc(1rem-1px)] bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent-ink">
                <Gift size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-lg font-bold tracking-tight">
                  + Full support, free for {freeSupportMonths} months after handover
                </p>
                <p className="text-sm text-ink-muted">Fixes, small changes and help using your site. Included with every build.</p>
              </div>
            </div>
            <p className="shrink-0 font-mono text-[13px] text-success">
              <span className="text-ink-subtle">$</span> support --months={freeSupportMonths} --free
            </p>
          </div>
        </div>
      </Reveal>

      <SpotlightGroup className="mt-10">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => {
            const Icon = icons[p.icon];
            return (
              <StaggerItem
                key={p.title}
                className={cn(
                  "glass spotlight group relative flex flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1",
                  p.highlighted && "border-accent-ink/50 shadow-glow",
                )}
              >
                {p.highlighted ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-[11px] font-bold text-on-accent">Most popular</span>
                ) : null}

                <p className="font-mono text-[12px] text-ink-subtle">
                  <span className="text-accent-ink">$</span> {p.command}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent-ink transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h2 className="text-lg font-bold leading-tight tracking-tight">{p.title}</h2>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{p.description}</p>

                <ul className="mt-5 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2 text-[14px]">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-ink" aria-hidden="true" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  {p.freeSupport ? (
                    <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[12px] font-semibold text-success">
                      <Gift size={13} aria-hidden="true" /> {freeSupportMonths} months free support
                    </p>
                  ) : null}
                  {p.price ? (
                    <p className="mb-4 font-display text-3xl font-extrabold tracking-tight">
                      {p.price} {p.priceNote ? <span className="font-sans text-sm font-medium text-ink-muted">{p.priceNote}</span> : null}
                    </p>
                  ) : null}
                  <Button href={startChat(p)} variant={p.highlighted ? "primary" : "secondary"} className="w-full">
                    Let&apos;s build this <ArrowRight size={15} aria-hidden="true" />
                  </Button>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </SpotlightGroup>

      <Reveal className="mt-14">
        <div className="glass flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold tracking-tight">Need something else?</p>
            <p className="text-ink-muted">Tell me what your business needs and I&apos;ll put together a plan that fits.</p>
          </div>
          <Button href={`https://wa.me/${site.phoneDigits}`}>
            <WhatsappIcon size={16} /> Chat on WhatsApp
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
