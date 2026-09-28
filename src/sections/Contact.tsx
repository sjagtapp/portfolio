import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { emailUrl, site, whatsappUrl } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { SpotlightGroup } from "@/components/fx/SpotlightGroup";
import { Reveal, Stagger, StaggerItem } from "@/components/fx/Reveal";

const methods = [
  { label: "Email me", value: site.email, href: emailUrl, Icon: Mail, external: false },
  { label: "Chat on WhatsApp", value: site.phone, href: whatsappUrl, Icon: WhatsappIcon, external: true },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(ellipse_at_bottom,rgb(var(--glow)/0.12),transparent_70%)]" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading id="contact-title" index="05" eyebrow="Contact" title={<>Let&apos;s <span className="text-gradient">talk</span></>}>
            Tell me a little about your business and what you need. I&apos;ll get back to you with ideas and a free quote.
          </SectionHeading>

          <SpotlightGroup className="mt-9">
            <Stagger className="space-y-3">
              {methods.map(({ label, value, href, Icon, external }) => (
                <StaggerItem key={label} className="spotlight rounded-xl">
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="glass group flex items-center gap-4 rounded-xl p-4 transition-colors"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent-ink">
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-subtle">{label}</span>
                      <span className="block truncate font-semibold">{value}</span>
                    </span>
                    <ArrowUpRight size={18} className="shrink-0 text-ink-subtle transition-[transform,color] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink" aria-hidden="true" />
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </SpotlightGroup>

          <Reveal delay={0.2}>
            <p className="mt-6 flex items-center gap-2 text-ink-muted">
              <MapPin size={17} className="text-accent-ink" aria-hidden="true" /> Based in {site.location} · working with clients worldwide
            </p>
            <SocialLinks className="mt-6" />
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="glow-border rounded-2xl">
            <div className="rounded-[calc(1rem-1px)] bg-surface p-6 sm:p-8">
              <p className="font-mono text-xs text-ink-subtle">
                <span className="text-accent-ink">$</span> send --message
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight">Send a message</h3>
              <p className="mt-1 text-sm text-ink-muted">All fields except phone are required.</p>
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
