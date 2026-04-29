"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Webandcrafts",
    role: "UI Architect",
    period: "Oct 2022 – Present",
    location: "Kerala, India",
    current: true,
    highlights: [
      "Built scalable UI with Next.js, improving page load speed by 30%",
      "Led full UI revamp that increased user engagement by 25%",
      "Reduced JS bundle size by 40% via code splitting & lazy loading",
      "Mentored junior developers; led code reviews and agile sprint planning",
      "Integrated AI-assisted workflows cutting dev time by ~20%",
    ],
    tags: ["Next.js", "React.js", "AI Workflows", "Team Lead"],
  },
  {
    company: "Bridge Global",
    role: "UI Developer",
    period: "Jun 2022 – Oct 2022",
    location: "Remote",
    current: false,
    highlights: [
      "Redesigned UI/UX for a cyber insurance platform, improving usability",
      "Boosted Lighthouse performance score and WCAG accessibility compliance",
    ],
    tags: ["UI/UX", "Accessibility", "Performance"],
  },
  {
    company: "Mobiiworld",
    role: "UI Developer",
    period: "Jun 2020 – Dec 2021",
    location: "Kerala, India",
    current: false,
    highlights: [
      "Built high-performance web apps using Next.js & GSAP for global brands",
      "Delivered pixel-perfect interfaces with smooth animations & interactions",
      "Collaborated with PHP & Drupal developers on full-stack feature delivery",
    ],
    tags: ["Next.js", "GSAP", "Animations"],
  },
  {
    company: "Kreative Sparkz",
    role: "UI Designer & Developer",
    period: "Mar 2018 – May 2020",
    location: "India",
    current: false,
    highlights: [
      "Designed and developed responsive websites for SME clients",
    ],
    tags: ["UI Design", "Responsive", "WordPress"],
  },
  {
    company: "DDinfoways",
    role: "UI Designer",
    period: "Aug 2016 – Mar 2018",
    location: "India",
    current: false,
    highlights: [
      "Designed websites and landing pages with focus on visual appeal and conversion",
    ],
    tags: ["UI Design", "Landing Pages", "Conversion"],
  },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── 1. Section header fade-up ─────────────────────────────────────
      gsap.from(".exp-header", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // ── 2. Timeline line draws from top → bottom ───────────────────────
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );

      // ── 3. Each dot: empty ➜ filled as line reaches it ────────────────
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;

        // The inner fill circle scales from 0 → 1
        const fill = dot.querySelector(".dot-fill");
        const ring = dot.querySelector(".dot-ring");

        gsap.fromTo(
          fill,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Ring pulse
        gsap.fromTo(
          ring,
          { scale: 1, opacity: 0.7 },
          {
            scale: 2.2,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: dot,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ── 4. Cards slide in from alternating sides ───────────────────────
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isLeft = i % 2 === 0;

        gsap.fromTo(
          card,
          {
            x: isLeft ? -60 : 60,
            opacity: 0,
            rotateY: isLeft ? -6 : 6,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Stagger list items inside card
        const items = card.querySelectorAll(".exp-highlight");
        gsap.fromTo(
          items,
          { x: 12, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-padding bg-secondary/30">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="exp-header text-center mb-20">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            My Journey
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            8+ years of building exceptional digital products for brands across the globe.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* ── Animated vertical line ───────────────────────────────────── */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-border/40 md:-translate-x-px" />
          <div
            ref={lineRef}
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px origin-top"
            style={{
              background:
                "linear-gradient(to bottom, hsl(262,83%,65%), hsl(230,83%,65%), hsl(262,83%,65%))",
              transform: "scaleY(0)",
              transformOrigin: "top center",
            }}
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={cn(
                  "relative flex flex-col md:flex-row gap-0",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* ── Animated dot ─────────────────────────────────────── */}
                <div
                  ref={(el) => { dotRefs.current[index] = el; }}
                  className="absolute left-5 md:left-1/2 top-8 md:-translate-x-1/2 -translate-x-1/2 z-10"
                >
                  {/* Ghost ring (outer pulse) */}
                  <div className="dot-ring absolute inset-0 rounded-full border-2 border-primary scale-1 opacity-0" />
                  {/* Outer border circle (always visible) */}
                  <div
                    className={cn(
                      "relative h-5 w-5 rounded-full border-2 flex items-center justify-center",
                      exp.current ? "border-primary" : "border-primary/50"
                    )}
                    style={{ background: "hsl(var(--background))" }}
                  >
                    {/* Inner fill — animated by GSAP */}
                    <div
                      className="dot-fill h-2.5 w-2.5 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(262,83%,65%), hsl(230,83%,65%))",
                        transform: "scale(0)",
                      }}
                    />
                  </div>
                </div>

                {/* ── Card ────────────────────────────────────────────── */}
                <div
                  className={cn(
                    "md:w-1/2 ml-16 md:ml-0",
                    index % 2 === 0 ? "md:pr-14" : "md:pl-14"
                  )}
                >
                  <div
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className={cn(
                      "group relative rounded-2xl p-6 bg-card border border-border",
                      "hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/8",
                      "transition-shadow duration-300"
                    )}
                    style={{ perspective: "800px" }}
                  >
                    {/* Current badge */}
                    {exp.current && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        Current
                      </div>
                    )}

                    {/* Top gradient shimmer on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(262,83%,65%,0.04) 0%, transparent 60%)",
                      }}
                    />

                    <div className="flex items-start gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-md">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground leading-tight">
                          {exp.role}
                        </h3>
                        <p className="text-primary font-semibold text-sm">{exp.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-5">
                      {exp.highlights.map((h, hi) => (
                        <li
                          key={hi}
                          className="exp-highlight flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-accent text-accent-foreground border border-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
