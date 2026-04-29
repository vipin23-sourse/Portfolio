"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Mail, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";

// ── Canvas constants ─────────────────────────────────────────────────────────
const CELL          = 60;        // px — must match background grid
const GLOW_PX       = CELL * 3.6;// hover glow radius in pixels
const MAX_OPACITY   = 0.17;      // max hover fill opacity
const LERP          = 0.08;      // 0–1 — lower = silkier follow

const WAVE_SPEED    = 280;       // px / second  — how fast the ring expands
const WAVE_DURATION = 1400;      // ms           — lifetime of one ripple
const WAVE_SIGMA    = 38;        // px           — Gaussian ring width
const WAVE_OPACITY  = 0.55;      // peak opacity at the ring front

type Wave = { x: number; y: number; t: number };

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const mouseRef   = useRef({ x: -9999, y: -9999 });  // raw target
  const posRef     = useRef({ x: -9999, y: -9999 });  // lerped draw position
  const wavesRef   = useRef<Wave[]>([]);
  const rafRef     = useRef<number>(0);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── Resize ─────────────────────────────────────────────────────────── */
    const resize = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    /* ── Mouse tracking ─────────────────────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    /* ── Click → spawn ripple wave ──────────────────────────────────────── */
    const onClick = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      wavesRef.current.push({
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        t: performance.now(),
      });
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    section.addEventListener("click", onClick);

    /* ── RAF draw loop ──────────────────────────────────────────────────── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();

      // 1 ── Lerp draw position toward mouse ────────────────────────────────
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dp = posRef.current;

      // Snap on first enter so there's no "fly-in" from off-screen
      if (dp.x < 0 && mx > 0) { dp.x = mx; dp.y = my; }
      else {
        dp.x += (mx - dp.x) * LERP;
        dp.y += (my - dp.y) * LERP;
      }

      // 2 ── Hover glow (pixel-space distance to each cell centre) ──────────
      if (dp.x > 0) {
        const c0 = Math.max(0, Math.floor((dp.x - GLOW_PX) / CELL));
        const c1 = Math.min(Math.ceil(canvas.width  / CELL), Math.ceil((dp.x + GLOW_PX) / CELL));
        const r0 = Math.max(0, Math.floor((dp.y - GLOW_PX) / CELL));
        const r1 = Math.min(Math.ceil(canvas.height / CELL), Math.ceil((dp.y + GLOW_PX) / CELL));

        for (let cx = c0; cx < c1; cx++) {
          for (let cy = r0; cy < r1; cy++) {
            // Distance from lerped cursor to this cell's centre (pixels)
            const ccx  = cx * CELL + CELL * 0.5;
            const ccy  = cy * CELL + CELL * 0.5;
            const dist = Math.sqrt((ccx - dp.x) ** 2 + (ccy - dp.y) ** 2);
            if (dist > GLOW_PX) continue;

            // Cubic smooth-step falloff — continuous across cell edges
            const t       = 1 - dist / GLOW_PX;
            const opacity = t * t * (3 - 2 * t) * MAX_OPACITY;

            ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.fillRect(cx * CELL + 1, cy * CELL + 1, CELL - 2, CELL - 2);
          }
        }

        // Crisp outline on directly-hovered cell
        const hx = Math.floor(dp.x / CELL);
        const hy = Math.floor(dp.y / CELL);
        ctx.strokeStyle = "rgba(139, 92, 246, 0.4)";
        ctx.lineWidth   = 1;
        ctx.strokeRect(hx * CELL + 1, hy * CELL + 1, CELL - 2, CELL - 2);
      }

      // 3 ── Ripple waves ────────────────────────────────────────────────────
      wavesRef.current = wavesRef.current.filter(w => now - w.t < WAVE_DURATION);

      for (const wave of wavesRef.current) {
        const elapsed = now - wave.t;
        const radius  = (elapsed / 1000) * WAVE_SPEED;
        const fade    = 1 - elapsed / WAVE_DURATION; // linear fade-out

        // Only iterate cells that could be touched by the ring ± 3σ
        const searchPx = radius + WAVE_SIGMA * 3;
        const c0 = Math.max(0, Math.floor((wave.x - searchPx) / CELL));
        const c1 = Math.min(Math.ceil(canvas.width  / CELL), Math.ceil((wave.x + searchPx) / CELL));
        const r0 = Math.max(0, Math.floor((wave.y - searchPx) / CELL));
        const r1 = Math.min(Math.ceil(canvas.height / CELL), Math.ceil((wave.y + searchPx) / CELL));

        for (let cx = c0; cx < c1; cx++) {
          for (let cy = r0; cy < r1; cy++) {
            const ccx  = cx * CELL + CELL * 0.5;
            const ccy  = cy * CELL + CELL * 0.5;
            const dist = Math.sqrt((ccx - wave.x) ** 2 + (ccy - wave.y) ** 2);

            // Gaussian bell peaked at the expanding ring radius
            const delta    = dist - radius;
            const gaussian = Math.exp(-(delta * delta) / (2 * WAVE_SIGMA * WAVE_SIGMA));
            const opacity  = gaussian * fade * WAVE_OPACITY;

            if (opacity < 0.01) continue;

            ctx.fillStyle = `rgba(168, 85, 247, ${opacity})`; // purple-500
            ctx.fillRect(cx * CELL + 1, cy * CELL + 1, CELL - 2, CELL - 2);
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      section.removeEventListener("click", onClick);
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-crosshair"
    >
      {/* ── Static background ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 dark:from-violet-500/10 dark:to-indigo-500/10" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-300 dark:bg-violet-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-300 dark:bg-indigo-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: `${CELL}px ${CELL}px`,
          }}
        />
      </div>

      {/* ── Canvas: hover glow + ripple waves ────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-12 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-accent border border-primary/20 text-accent-foreground text-xs sm:text-sm font-medium mb-8 animate-fade-up">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Available for freelance &amp; remote work
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-up animate-delay-100">
          <span className="text-foreground">Vipin </span>
          <span className="gradient-text">MV</span>
        </h1>

        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-5 animate-fade-up animate-delay-200">
          <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <p className="text-lg sm:text-2xl font-semibold text-muted-foreground whitespace-nowrap">
            UI / Frontend Developer
          </p>
          <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animate-delay-300">
          6+ years crafting{" "}
          <span className="text-foreground font-medium">pixel-perfect</span>,{" "}
          <span className="text-foreground font-medium">high-performance</span> web apps for
          international brands. Expert in{" "}
          <span className="gradient-text font-semibold">React.js</span>,{" "}
          <span className="gradient-text font-semibold">Next.js</span> &amp;{" "}
          <span className="gradient-text font-semibold">AI-enhanced workflows</span>.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-y-6 gap-x-8 sm:gap-8 mb-12 animate-fade-up animate-delay-300">
          {[
            { value: "6+",  label: "Years Exp."    },
            { value: "30%", label: "Page Speed ↑"  },
            { value: "25%", label: "Engagement ↑"  },
            { value: "40%", label: "Bundle Size ↓"  },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-14 animate-fade-up animate-delay-400 px-2 sm:px-0">
          <a href="#work" className="w-full sm:w-auto inline-flex h-12 px-8 items-center justify-center rounded-xl gradient-bg text-white font-medium shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200 glow">
            View My Work
          </a>
          <a href="#contact" className="w-full sm:w-auto inline-flex h-12 px-8 items-center justify-center rounded-xl bg-secondary border border-border text-foreground font-medium hover:border-primary/40 hover:bg-accent transition-all duration-200">
            Get In Touch
          </a>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-16 animate-fade-up animate-delay-500">
          {[
            { href: "https://linkedin.com/in/vipin-vijayakumar", icon: LinkedInIcon, label: "LinkedIn" },
            { href: "mailto:vipin.m2@gmail.com", icon: Mail,         label: "Email"    },
            { href: "tel:+919633491984",          icon: Phone,        label: "Phone"    },
          ].map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" aria-label={label}
              className="h-11 w-11 flex items-center justify-center rounded-xl bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-accent hover:scale-110 transition-all duration-200">
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="animate-float">
          <a href="#about" className="inline-flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-primary transition-colors duration-200">
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
