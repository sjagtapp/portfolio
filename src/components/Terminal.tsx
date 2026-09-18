"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type FormEvent } from "react";
import { site } from "@/data/site";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";
import { education } from "@/data/education";
import { isPlaceholder, humanize } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

type Line = { kind: "in" | "out" | "err" | "ok" | "dim"; text: string };

const show = (v: string) => (isPlaceholder(v) ? `⟨${humanize(v)}⟩` : v);

/** Commands are generated from the data files — the terminal is always in sync with the site. */
const COMMANDS: Record<string, { desc: string; run: () => Line[] }> = {
  help: {
    desc: "list commands",
    run: () => [
      { kind: "dim", text: "available commands:" },
      ...Object.entries(COMMANDS).map(([k, v]) => ({ kind: "out" as const, text: `  ${k.padEnd(12)} ${v.desc}` })),
    ],
  },
  whoami: { desc: "who is this", run: () => [{ kind: "ok", text: `${show(site.name)} — ${site.role}` }, { kind: "out", text: show(site.location) }] },
  skills: {
    desc: "tech stack",
    run: () => skillCategories.map((c) => ({ kind: "out" as const, text: `${c.label.toLowerCase().padEnd(12)} ${c.skills.map((s) => s.name).join("  ")}` })),
  },
  projects: {
    desc: "list projects",
    run: () => projects.map((p) => ({ kind: "out" as const, text: `${p.slug.padEnd(24)} ${show(p.name)} — ${p.tagline}` })),
  },
  open: {
    desc: "open <slug>",
    run: () => [{ kind: "dim", text: "usage: open <project-slug>   e.g. open planngo" }],
  },
  education: { desc: "where I studied", run: () => education.map((e) => ({ kind: "out" as const, text: `${show(e.degree)} · ${show(e.institution)} (${show(e.year)})` })) },
  contact: {
    desc: "how to reach me",
    run: () => [
      { kind: "out", text: `email     ${show(site.email)}` },
      { kind: "out", text: `github    ${show(site.socials.github)}` },
      { kind: "out", text: `linkedin  ${show(site.socials.linkedin)}` },
    ],
  },
  resume: { desc: "download resume", run: () => [{ kind: "ok", text: `opening ${site.resumePath} …` }] },
  status: { desc: "availability", run: () => [{ kind: "ok", text: site.availability }] },
  clear: { desc: "clear screen", run: () => [] },
};

const WELCOME: Line[] = [
  { kind: "dim", text: `${site.handle}@portfolio v1.0.0 — type "help" to start` },
  { kind: "in", text: "whoami" },
  ...COMMANDS.whoami.run(),
];

/**
 * A small, genuinely functional terminal. Commands read live from src/data,
 * "open <slug>" navigates to a project page, "resume" opens the PDF.
 * Keyboard: ↑/↓ history, Tab to autocomplete, Enter to run.
 */
export function Terminal({ className }: { className?: string }) {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const [name, ...args] = cmd.split(/\s+/);
    const next: Line[] = [{ kind: "in", text: cmd }];

    if (name === "clear") { setLines([]); setHistory((h) => [cmd, ...h]); setCursor(-1); return; }
    if (name === "open") {
      const p = projects.find((x) => x.slug === args[0]);
      if (p) { next.push({ kind: "ok", text: `→ /projects/${p.slug}` }); setTimeout(() => { window.location.href = `/projects/${p.slug}`; }, 350); }
      else next.push({ kind: "err", text: args[0] ? `no project named "${args[0]}"` : "usage: open <project-slug>" }, { kind: "dim", text: `slugs: ${projects.map((x) => x.slug).join(", ")}` });
    } else if (name === "resume") {
      next.push(...COMMANDS.resume.run());
      setTimeout(() => window.open(site.resumePath, "_blank", "noopener"), 350);
    } else if (COMMANDS[name]) {
      next.push(...COMMANDS[name].run());
    } else {
      next.push({ kind: "err", text: `command not found: ${name}` }, { kind: "dim", text: 'try "help"' });
    }
    setLines((l) => [...l, ...next]);
    setHistory((h) => [cmd, ...h]);
    setCursor(-1);
  };

  const onSubmit = (e: FormEvent) => { e.preventDefault(); run(input); setInput(""); };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") { e.preventDefault(); const c = Math.min(cursor + 1, history.length - 1); setCursor(c); setInput(history[c] ?? ""); }
    else if (e.key === "ArrowDown") { e.preventDefault(); const c = Math.max(cursor - 1, -1); setCursor(c); setInput(c === -1 ? "" : history[c]); }
    else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find((k) => k.startsWith(input.toLowerCase()) && input);
      if (match) setInput(match);
    }
  };

  return (
    <div
      className={cn("glass flex flex-col overflow-hidden rounded-2xl shadow-panel", className)}
      onClick={() => inputRef.current?.focus()}
      data-cursor-label="type"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-auto font-mono text-[11px] tracking-wider text-fg-subtle">{site.handle}@portfolio — zsh</span>
      </div>
      <div ref={bodyRef} className="h-[280px] overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-[1.75] sm:h-[320px]" aria-live="polite">
        {lines.map((l, i) => (
          <div
            key={i}
            className={cn(
              "whitespace-pre-wrap break-words",
              l.kind === "in" && "text-fg",
              l.kind === "out" && "text-fg-muted",
              l.kind === "ok" && "text-gold-soft",
              l.kind === "err" && "text-[#ff7b72]",
              l.kind === "dim" && "text-fg-subtle",
            )}
          >
            {l.kind === "in" ? <><span className="text-gold">❯</span> {l.text}</> : l.text}
          </div>
        ))}
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <label htmlFor="terminal-input" className="sr-only">Terminal command</label>
          <span className="text-gold">❯</span>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="help"
            className="min-w-0 flex-1 bg-transparent text-fg caret-gold outline-none placeholder:text-fg-subtle"
            aria-describedby="terminal-hint"
          />
        </form>
      </div>
      <p id="terminal-hint" className="border-t border-line px-4 py-2 font-mono text-[10px] tracking-wider text-fg-subtle">
        ↑↓ history · Tab autocomplete · try <span className="text-fg-muted">skills</span>, <span className="text-fg-muted">projects</span>, <span className="text-fg-muted">open planngo</span>
      </p>
    </div>
  );
}
