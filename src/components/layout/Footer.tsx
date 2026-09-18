import { Github, Linkedin, ArrowUp } from "lucide-react";
import { site } from "@/data/site";
import { navigation } from "@/data/navigation";
import { isPlaceholder } from "@/lib/placeholders";
import { XIcon } from "@/components/ui/XIcon";

const socials = [
  { label: "GitHub", href: site.socials.github, Icon: Github },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: Linkedin },
  { label: "X", href: site.socials.twitter, Icon: XIcon },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div aria-hidden="true" className="gold-line absolute inset-x-0 top-0" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-fg-muted">{site.role}. Building for the web, learning in public.</p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ label, href, Icon }) =>
              isPlaceholder(href) ? (
                <span key={label} title={`Add your ${label} URL in src/data/site.ts`} className="grid h-10 w-10 place-items-center rounded-full border border-dashed border-line-strong text-fg-subtle">
                  <Icon size={16} />
                </span>
              ) : (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-fg-muted transition-colors hover:border-gold hover:text-gold-soft" data-cursor="hover">
                  <Icon size={16} />
                </a>
              ),
            )}
          </div>
        </div>
        <nav aria-label="Footer">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-subtle">Sitemap</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navigation.map((n) => (
              <li key={n.id}><a href={`/#${n.id}`} className="text-fg-muted transition-colors hover:text-fg">{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="md:text-right">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-subtle">Colophon</p>
          <p className="text-sm text-fg-muted">Next.js · TypeScript · Tailwind · Motion</p>
          <p className="mt-1 text-sm text-fg-muted">Designed and built by hand.</p>
          <a href="#home" className="mt-6 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-gold-soft" data-cursor="hover">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-5 font-mono text-[11px] text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>{site.location}</span>
        </div>
      </div>
    </footer>
  );
}
