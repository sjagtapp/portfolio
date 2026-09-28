import { site } from "@/data/site";
import { isPlaceholder } from "@/lib/placeholders";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

const all = [
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", href: site.socials.github, Icon: GithubIcon },
  { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
];

/** Social icons. Links still set to "[ADD … URL]" are left out; renders nothing if none are set. */
export function SocialLinks({ className }: { className?: string }) {
  const links = all.filter((s) => !isPlaceholder(s.href));
  if (!links.length) return null;

  return (
    <ul className={cn("flex gap-2", className)}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white/[0.03] text-ink-muted transition-[border-color,color,box-shadow] hover:border-accent/60 hover:text-ink hover:shadow-[0_0_16px_rgb(var(--glow)/0.4)]"
          >
            <Icon size={16} />
          </a>
        </li>
      ))}
    </ul>
  );
}
