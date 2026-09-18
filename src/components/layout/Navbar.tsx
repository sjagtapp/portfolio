"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { research } from "@/data/research";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

/**
 * Sticky navbar. Transparent at the top, glass once you scroll; the active
 * section is tracked with an IntersectionObserver and highlighted with a
 * sliding gold underline. On sub-pages (project detail) links point back home.
 */
export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduce = useReducedMotion();
  const items = useMemo(() => navigation.filter((n) => n.id !== "research" || research.length > 0), []);
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const active = useActiveSection(isHome ? ids : []);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open ? "glass border-b border-line" : "border-b border-transparent",
        )}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between md:h-[72px]">
          <Link href="/" className="group flex items-center gap-3" data-cursor="hover" aria-label={`${site.name} — home`}>
            <span className="relative grid h-8 w-8 place-items-center rounded-md border border-gold/50 font-display text-[13px] font-bold text-gold">
              {site.handle.slice(0, 1).toUpperCase()}
              <span aria-hidden="true" className="absolute -inset-px rounded-md bg-gold/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            <span className="hidden font-mono text-[12px] tracking-[0.18em] text-fg-muted sm:block">
              {site.handle}<span className="text-gold">@</span>portfolio
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {items.map((item) => {
              const isActive = isHome && active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={hrefFor(item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-[13px] tracking-tight transition-colors duration-300",
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                    data-cursor="hover"
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-underline"
                        aria-hidden="true"
                        className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={hrefFor("contact")}
              className="hidden items-center gap-1.5 rounded-full border border-gold/50 px-4 py-2 text-[13px] text-gold-soft transition-all duration-300 hover:border-gold hover:bg-gold-dim md:inline-flex"
              data-cursor="hover"
            >
              Let&apos;s talk <ArrowUpRight size={14} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-fg lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="menu"
            className="fixed inset-0 z-40 flex flex-col bg-bg/95 pt-24 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile" className="container-x flex flex-1 flex-col">
              <ul className="flex flex-col">
                {items.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <a
                      href={hrefFor(item.id)}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-4 font-display text-3xl font-bold tracking-tight",
                        isHome && active === item.id ? "text-gold-soft" : "text-fg",
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-[11px] text-fg-subtle">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pb-10 font-mono text-[12px] text-fg-subtle"
              >
                {site.availability}
              </motion.p>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
