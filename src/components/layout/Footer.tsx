import Link from "next/link";
import { emailUrl, site, whatsappUrl } from "@/data/site";
import { navigation, navHref } from "@/data/navigation";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg/60">
      <div aria-hidden="true" className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-mono text-sm text-ink-muted">
            <span className="text-accent-ink">console</span>.log(<span className="text-code-str">&quot;Let&apos;s build something great&quot;</span>);
          </p>
          <p className="mt-5 text-lg font-extrabold tracking-tight">{site.name}</p>
          <p className="mt-1 text-sm text-ink-muted">{site.role}</p>
          <p className="mt-1 text-sm text-ink-muted">{site.location}</p>
          <SocialLinks className="mt-5" />
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-xs text-ink-subtle">{"// explore"}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {navigation.map((n) => (
              <li key={n.label}>
                <Link href={navHref(n, false)} className="text-sm text-ink-muted transition-colors hover:text-accent-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-xs text-ink-subtle">{"// get in touch"}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={emailUrl} className="text-ink-muted transition-colors hover:text-accent-ink">
                {site.email}
              </a>
            </li>
            <li>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-ink-muted transition-colors hover:text-accent-ink">
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="container-x flex flex-wrap justify-between gap-2 py-6 text-[13px] text-ink-subtle">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Designed &amp; developed by {site.name}</span>
        </p>
      </div>
    </footer>
  );
}
