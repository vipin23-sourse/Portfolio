"use client";

import { User, Code2, Sparkles, TrendingUp } from "lucide-react";

const highlights = [
  {
    icon: TrendingUp,
    label: "30% page speed improvement",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Sparkles,
    label: "25% user engagement boost",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    icon: Code2,
    label: "40% JS bundle reduction",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: User,
    label: "~20% dev time saved with AI",
    gradient: "from-rose-500 to-orange-500",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <div className="relative order-2 lg:order-1">
            {/* Decorative element */}
            <div className="relative w-full max-w-sm mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl border border-border bg-card p-8 shadow-2xl">
                {/* Avatar placeholder */}
                <div className="h-24 w-24 rounded-2xl gradient-bg flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-6">
                  V
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">Vipin MV</h3>
                <p className="text-primary font-medium mb-4">UI Architect @ Webandcrafts</p>
                <div className="space-y-3">
                  {highlights.map((h) => {
                    const Icon = h.icon;
                    return (
                      <div key={h.label} className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-lg bg-gradient-to-br ${h.gradient} flex items-center justify-center shrink-0`}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm text-foreground font-medium">{h.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Status */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <span className="text-muted-foreground">
                      Available for opportunities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              About Me
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Building the <span className="gradient-text">web of tomorrow</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m a <strong className="text-foreground">UI / Frontend Developer</strong> with 6+ years of
                experience delivering pixel-perfect, high-performance web applications for international brands
                across multiple industries.
              </p>
              <p>
                My work spans from architecting scalable UI systems to integrating{" "}
                <strong className="text-foreground">AI-powered workflows</strong> that accelerate delivery and
                personalise UX. I&apos;m passionate about the intersection of design precision and engineering
                excellence.
              </p>
              <p>
                Currently serving as <strong className="text-foreground">UI Architect at Webandcrafts</strong>,
                where I lead UI strategy, mentor developers, and drive measurable business impact through
                performance optimisation and modern development practices.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: "Location", value: "Kerala, India" },
                { label: "Experience", value: "6+ Years" },
                { label: "Focus", value: "React / Next.js" },
                { label: "Availability", value: "Open to Work" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl bg-card border border-border p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                  <p className="font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex h-11 px-6 items-center justify-center rounded-xl gradient-bg text-white font-medium shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200"
              >
                Let&apos;s Talk
              </a>
              <a
                href="/vipin2026.pdf"
                download="Vipin_MV_Resume.pdf"
                className="inline-flex h-11 px-6 items-center justify-center rounded-xl bg-secondary border border-border text-foreground font-medium hover:border-primary/40 hover:bg-accent transition-all duration-200"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
