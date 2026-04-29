import { ArrowDown, Mail, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 dark:from-violet-500/10 dark:to-indigo-500/10" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-300 dark:bg-violet-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-300 dark:bg-indigo-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 text-accent-foreground text-sm font-medium mb-8 animate-fade-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Available for freelance & remote work
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-up animate-delay-100">
          <span className="text-foreground">Vipin </span>
          <span className="gradient-text">MV</span>
        </h1>

        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-6 animate-fade-up animate-delay-200">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <p className="text-xl sm:text-2xl font-semibold text-muted-foreground">
            UI / Frontend Developer
          </p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        {/* Sub title */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animate-delay-300">
          6+ years crafting{" "}
          <span className="text-foreground font-medium">pixel-perfect</span>,{" "}
          <span className="text-foreground font-medium">high-performance</span> web apps for
          international brands. Expert in{" "}
          <span className="gradient-text font-semibold">React.js</span>,{" "}
          <span className="gradient-text font-semibold">Next.js</span> &{" "}
          <span className="gradient-text font-semibold">AI-enhanced workflows</span>.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-up animate-delay-300">
          {[
            { value: "6+", label: "Years Exp." },
            { value: "30%", label: "Page Speed ↑" },
            { value: "25%", label: "Engagement ↑" },
            { value: "40%", label: "Bundle Size ↓" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-14 animate-fade-up animate-delay-400">
          <a
            href="#work"
            className="inline-flex h-12 px-8 items-center justify-center rounded-xl gradient-bg text-white font-medium shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200 glow"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 px-8 items-center justify-center rounded-xl bg-secondary border border-border text-foreground font-medium hover:border-primary/40 hover:bg-accent transition-all duration-200"
          >
            Get In Touch
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-16 animate-fade-up animate-delay-500">
          {[
            { href: "https://linkedin.com/in/vipin-vijayakumar", icon: LinkedInIcon, label: "LinkedIn" },
            { href: "mailto:vipin.m2@gmail.com", icon: Mail, label: "Email" },
            { href: "tel:+919633491984", icon: Phone, label: "Phone" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="h-11 w-11 flex items-center justify-center rounded-xl bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-accent hover:scale-110 transition-all duration-200"
            >
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
