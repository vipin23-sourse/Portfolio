"use client";

import { Briefcase, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
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
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.company}
                className={cn(
                  "relative flex flex-col md:flex-row gap-8",
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 top-6 md:-translate-x-1/2 -translate-x-1/2">
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border-2 z-10 relative",
                      exp.current
                        ? "bg-primary border-primary shadow-lg shadow-primary/40"
                        : "bg-background border-primary/50"
                    )}
                  >
                    {exp.current && (
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                    )}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={cn(
                    "md:w-1/2 ml-12 md:ml-0",
                    i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  )}
                >
                  <div
                    className={cn(
                      "group relative rounded-2xl p-6 bg-card border border-border",
                      "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                    )}
                  >
                    {/* Current badge */}
                    {exp.current && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        Current
                      </div>
                    )}

                    <div className="flex items-start gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-md">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{exp.role}</h3>
                        <p className="text-primary font-semibold">{exp.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((h, hi) => (
                        <li
                          key={hi}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
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

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
