"use client";

import { useEffect, useRef, useState } from "react";
import { allSkills, skillCategories, type SkillLevel } from "@/data/skills";
import { useFinePointer } from "@/hooks/useFinePointer";

/**
 * Technology constellation — every skill is a node drifting slowly in a
 * canvas; nearby nodes are connected by faint lines, nodes in the same
 * category by gold lines. Hovering a node highlights its category and shows
 * its name; hovering a category chip (via `activeCategory`) lights up the
 * whole cluster. Canvas + rAF, DPR-aware, paused when off-screen.
 */
interface Node {
  name: string;
  category: string;
  level: SkillLevel;
  x: number; y: number; vx: number; vy: number; r: number;
}

const RADIUS: Record<SkillLevel, number> = { core: 5.5, working: 4.2, exploring: 3.2 };
const GOLD = "201,162,74";

export function Constellation({ activeCategory }: { activeCategory: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodes = useRef<Node[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const hoverRef = useRef<Node | null>(null);
  const activeRef = useRef<string | null>(activeCategory);
  const [hover, setHover] = useState<{ name: string; category: string; x: number; y: number } | null>(null);
  const fine = useFinePointer();
  const reduce = useRef(false);

  useEffect(() => { activeRef.current = activeCategory; }, [activeCategory]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, raf = 0, running = true, last = performance.now();
    const fontFamily = getComputedStyle(canvas).fontFamily || "ui-monospace, monospace";

    const seed = () => {
      const cats = skillCategories.map((c) => c.id);
      nodes.current = allSkills.map((s, i) => {
        // Start each category in its own sector so clusters read as groups.
        const ci = cats.indexOf(s.category);
        const angle = (ci / cats.length) * Math.PI * 2 + (i % 5) * 0.35;
        const dist = 0.25 + (i % 3) * 0.08;
        return {
          name: s.name, category: s.category, level: s.level,
          x: w / 2 + Math.cos(angle) * w * dist * 0.9,
          y: h / 2 + Math.sin(angle) * h * dist,
          vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
          r: RADIUS[s.level],
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!nodes.current.length) seed();
      else nodes.current.forEach((n) => { n.x = Math.min(Math.max(n.x, 20), w - 20); n.y = Math.min(Math.max(n.y, 20), h - 20); });
    };

    const draw = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 16.67, 2); last = now;
      ctx.clearRect(0, 0, w, h);
      const ns = nodes.current;
      const active = activeRef.current;
      const hov = hoverRef.current;
      const focus = hov?.category ?? active;

      // integrate
      if (!reduce.current) {
        for (const n of ns) {
          n.x += n.vx * dt; n.y += n.vy * dt;
          if (n.x < 16 || n.x > w - 16) n.vx *= -1;
          if (n.y < 16 || n.y > h - 16) n.vy *= -1;
          // gentle pull toward cursor
          const dx = mouse.current.x - n.x, dy = mouse.current.y - n.y, d = Math.hypot(dx, dy);
          if (d < 160 && d > 1) { n.x += (dx / d) * 0.25 * dt; n.y += (dy / d) * 0.25 * dt; }
        }
      }

      // links
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const a = ns[i], b = ns[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const same = a.category === b.category;
          const maxD = same ? 200 : 120;
          if (d > maxD) continue;
          const t = 1 - d / maxD;
          const lit = focus && same && a.category === focus;
          const dim = focus && !lit;
          ctx.strokeStyle = lit ? `rgba(${GOLD},${0.15 + t * 0.55})` : same ? `rgba(${GOLD},${(dim ? 0.03 : 0.08) + t * 0.12})` : `rgba(255,255,255,${(dim ? 0.02 : 0.04) + t * 0.06})`;
          ctx.lineWidth = lit ? 1 : 0.6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      // nodes + labels
      ctx.textAlign = "center";
      ctx.font = `500 11px ${fontFamily}`;
      for (const n of ns) {
        const lit = focus ? n.category === focus : true;
        const isHover = hov === n;
        const r = n.r * (isHover ? 1.6 : 1);
        if (lit) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
          g.addColorStop(0, `rgba(${GOLD},${isHover ? 0.5 : 0.22})`); g.addColorStop(1, `rgba(${GOLD},0)`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = lit ? (n.level === "core" ? "#e9d08f" : n.level === "working" ? "#c9a24a" : "#8d7a4a") : "rgba(255,255,255,0.12)";
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill();
        if (n.level !== "exploring" || lit) {
          ctx.fillStyle = lit ? "rgba(244,243,238,0.85)" : "rgba(244,243,238,0.18)";
          ctx.fillText(n.name, n.x, n.y + r + 14);
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      let best: Node | null = null, bd = 22;
      for (const n of nodes.current) { const d = Math.hypot(n.x - mouse.current.x, n.y - mouse.current.y); if (d < bd) { bd = d; best = n; } }
      if (best !== hoverRef.current) {
        hoverRef.current = best;
        setHover(best ? { name: best.name, category: best.category, x: best.x, y: best.y } : null);
      }
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; hoverRef.current = null; setHover(null); };

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) { last = performance.now(); raf = requestAnimationFrame(draw); }
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    canvas.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      running = false; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const catLabel = hover ? skillCategories.find((c) => c.id === hover.category)?.label : null;

  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-line bg-bg-elevated sm:h-[440px]">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,74,0.06),transparent_65%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full font-mono" role="img" aria-label={`Technology constellation: ${allSkills.map((s) => s.name).join(", ")}`} />
      {hover && fine ? (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+18px)] whitespace-nowrap rounded-md border border-gold/40 bg-bg px-2.5 py-1.5 font-mono text-[11px] text-fg"
          style={{ left: hover.x, top: hover.y }}
        >
          {hover.name} <span className="text-fg-subtle">· {catLabel}</span>
        </div>
      ) : null}
      <p className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
        <span className="mr-3"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gold-soft" />core</span>
        <span className="mr-3"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gold" />working</span>
        <span><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#8d7a4a]" />exploring</span>
      </p>
    </div>
  );
}
