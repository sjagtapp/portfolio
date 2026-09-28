import { AppWindow, ArrowRight, Building2, LayoutTemplate, MessageCircleQuestion, RefreshCcw, Search, ShoppingCart, Wrench } from "lucide-react";
import { services, type ServiceIcon } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/fx/SpotlightGroup";
import { Stagger, StaggerItem } from "@/components/fx/Reveal";

const icons: Record<ServiceIcon, typeof Building2> = {
  business: Building2,
  landing: LayoutTemplate,
  shop: ShoppingCart,
  app: AppWindow,
  redesign: RefreshCcw,
  maintenance: Wrench,
  seo: Search,
};

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading id="services-title" index="01" eyebrow="Services" title="What I do">
          Websites and web apps for your business, explained without the tech jargon.
        </SectionHeading>

        <SpotlightGroup className="mt-14">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = icons[s.icon];
              return (
                <StaggerItem key={s.title} className="glass spotlight group flex flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent-ink transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="font-display text-2xl font-extrabold text-white/10 transition-colors duration-300 group-hover:text-accent-ink/40">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{s.description}</p>
                </StaggerItem>
              );
            })}

            <StaggerItem className="relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-[#1e3a8a] p-6 text-on-accent shadow-glow">
              <span aria-hidden="true" className="animate-drift absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
              <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/15">
                <MessageCircleQuestion size={20} aria-hidden="true" />
              </span>
              <h3 className="relative mt-5 text-lg font-bold tracking-tight">Not sure what you need?</h3>
              <p className="relative mt-2 text-[15px] leading-relaxed text-white/85">
                Tell me about your business and I&apos;ll suggest the right option. The first chat is free.
              </p>
              <a href="#contact" className="group/link relative mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold">
                Let&apos;s talk <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
              </a>
            </StaggerItem>
          </Stagger>
        </SpotlightGroup>
      </div>
    </section>
  );
}
