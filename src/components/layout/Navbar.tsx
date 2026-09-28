"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { navigation, navHref } from "@/data/navigation";
import { site, whatsappUrl } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/fx/Magnetic";
import { cn } from "@/lib/utils";

/** Sticky glass top bar: name, section links with a sliding highlight, and a "Let's build" chat button. */
export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const reduce = useReducedMotion();
  // "home" is observed but has no link, so nothing is highlighted while the intro is in view.
  const sectionIds = useMemo(() => (onHome ? ["home", ...navigation.flatMap((n) => (n.id ? [n.id] : []))] : []), [onHome]);
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("is-locked");
    };
  }, [open]);

  const isActive = (id?: string, href?: string) => (href ? pathname === href : onHome && active === id);
  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open ? "border-line bg-bg/70 backdrop-blur-xl" : "border-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-x flex h-16 items-center gap-8 md:h-[72px]">
        <Link href="/" onClick={close} className="shrink-0 font-display text-base font-extrabold tracking-tight transition-colors hover:text-accent-ink sm:text-lg" aria-label={`${site.name} — home`}>
          {site.name}
        </Link>

        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const current = isActive(item.id, item.href);
            return (
              <li key={item.label} className="relative">
                <Link
                  href={navHref(item, onHome)}
                  aria-current={current ? (item.href ? "page" : "location") : undefined}
                  className={cn("relative z-10 block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors", current ? "text-ink" : "text-ink-muted hover:text-ink")}
                >
                  {item.label}
                </Link>
                {current ? (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg border border-line bg-white/[0.05]"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                  >
                    <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                  </motion.span>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Magnetic className="hidden sm:block">
            <Button href={whatsappUrl} size="sm" title="Chat with me on WhatsApp">
              <MessageCircle size={15} aria-hidden="true" /> Let&apos;s build together
            </Button>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink hover:bg-white/5 lg:hidden"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-y-auto border-t border-line bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x py-6">
              <ul className="flex flex-col">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <Link
                      href={navHref(item, onHome)}
                      onClick={close}
                      className={cn("flex items-baseline gap-3 py-4 text-2xl font-bold tracking-tight", isActive(item.id, item.href) ? "text-accent-ink" : "text-ink")}
                    >
                      <span className="font-mono text-xs font-normal text-ink-subtle">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Button href={whatsappUrl} onClick={close} size="lg" className="mt-8 w-full">
                <MessageCircle size={17} aria-hidden="true" /> Let&apos;s build together
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
