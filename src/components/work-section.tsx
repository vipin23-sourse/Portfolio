"use client";

import { ExternalLink, Globe, Zap, Shield, ShoppingBag, Layout, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Enterprise E-Commerce Platform",
    description:
      "Built a high-performance e-commerce platform with Next.js and Strapi CMS for a global retail brand. Implemented advanced SEO, lazy loading, and code splitting to achieve a 95+ Lighthouse score.",
    tags: ["Next.js", "Strapi", "TypeScript", "Tailwind CSS"],
    icon: ShoppingBag,
    gradient: "from-violet-500 to-purple-600",
    metrics: ["95+ Lighthouse", "40% Faster Load", "3x Conversion"],
    link: "#",
  },
  {
    title: "Cyber Insurance Portal",
    description:
      "Redesigned the UI/UX for a cyber insurance SaaS platform, improving WCAG accessibility compliance and boosting Lighthouse performance scores significantly.",
    tags: ["React.js", "SCSS", "Accessibility", "REST API"],
    icon: Shield,
    gradient: "from-indigo-500 to-blue-600",
    metrics: ["WCAG AA", "90+ Perf Score", "25% More Users"],
    link: "#",
  },
  {
    title: "Global Brand Web Experience",
    description:
      "Crafted pixel-perfect, animation-rich web experiences using Next.js and GSAP for global consumer brands. Focused on immersive storytelling and brand consistency.",
    tags: ["Next.js", "GSAP", "JavaScript", "CSS3"],
    icon: Globe,
    gradient: "from-purple-500 to-pink-600",
    metrics: ["Pixel Perfect", "60fps Animations", "5 Markets"],
    link: "#",
  },
  {
    title: "AI-Enhanced Dev Workflow",
    description:
      "Integrated AI-assisted development workflows using Claude AI, GitHub Copilot, and custom MCP pipelines to reduce team development time by approximately 20%.",
    tags: ["Claude AI", "MCP", "Copilot", "Automation"],
    icon: Cpu,
    gradient: "from-rose-500 to-orange-500",
    metrics: ["20% Faster Dev", "AI-Powered", "Team-Wide"],
    link: "#",
  },
  {
    title: "UI Component Library",
    description:
      "Designed and built a reusable React component library with ShadCN and Tailwind, enabling consistent UI across multiple internal projects and reducing UI development time.",
    tags: ["React.js", "ShadCN", "Tailwind CSS", "TypeScript"],
    icon: Layout,
    gradient: "from-green-500 to-teal-600",
    metrics: ["50+ Components", "Design System", "Multi-project"],
    link: "#",
  },
  {
    title: "Performance Optimization Suite",
    description:
      "Led a systematic performance audit and optimization across a large-scale Next.js application, achieving significant improvements in Core Web Vitals and bundle efficiency.",
    tags: ["Next.js", "Webpack", "Lighthouse", "Web Vitals"],
    icon: Zap,
    gradient: "from-amber-500 to-yellow-600",
    metrics: ["30% Faster", "40% Less Bundle", "LCP < 2s"],
    link: "#",
  },
];

export function WorkSection() {
  return (
    <section id="work" className="section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            Portfolio
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A selection of projects showcasing performance engineering, design excellence, and AI-powered development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <article
                key={project.title}
                className={cn(
                  "group relative rounded-2xl overflow-hidden bg-card border border-border",
                  "hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1",
                  "transition-all duration-300 flex flex-col"
                )}
              >
                {/* Top gradient bar */}
                <div
                  className={cn(
                    "h-1 w-full bg-gradient-to-r",
                    project.gradient
                  )}
                />

                <div className="p-6 flex flex-col flex-1">
                  {/* Icon + title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={cn(
                        "h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
                        "bg-gradient-to-br shadow-lg",
                        project.gradient
                      )}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-200">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.metrics.map((m) => (
                      <span
                        key={m}
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-semibold",
                          "bg-gradient-to-r bg-clip-text",
                          "border border-primary/20 text-primary bg-primary/5"
                        )}
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary border border-border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <a
                    href={project.link}
                    className={cn(
                      "inline-flex items-center gap-2 text-sm font-medium text-primary",
                      "hover:underline underline-offset-4 transition-all duration-200",
                      "group/link"
                    )}
                  >
                    View Case Study
                    <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
