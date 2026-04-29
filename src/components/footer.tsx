import { Mail, Phone, Heart } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm shadow">
            V
          </div>
          <span className="font-semibold text-foreground">
            Vipin <span className="gradient-text">MV</span>
          </span>
        </div>

        {/* Copyright — centered on mobile, auto on desktop */}
        <p className="text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center justify-center gap-1 text-center">
          © {year} Vipin MV · Built with{" "}
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 shrink-0" />
          {" "}using Next.js 15 &amp; ShadCN
        </p>

        {/* Social links */}
        <div className="flex items-center gap-3 shrink-0">
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
              className="h-9 w-9 flex items-center justify-center rounded-lg bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
