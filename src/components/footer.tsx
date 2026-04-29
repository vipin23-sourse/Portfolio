"use client";

import { Mail, Phone, Heart } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm shadow">
            V
          </div>
          <span className="font-semibold text-foreground">
            Vipin <span className="gradient-text">MV</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          © {year} Vipin MV · Built with{" "}
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          using Next.js 15 & ShadCN
        </p>

        {/* Links */}
        <div className="flex items-center gap-3">
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
