"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/5"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#hero"
          className="group flex items-center gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
            V
          </div>
          <span className="font-semibold text-foreground">
            Vipin <span className="gradient-text">MV</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                active === link.href.slice(1)
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="mailto:vipin.m2@gmail.com"
            className="hidden md:inline-flex h-10 px-5 items-center justify-center rounded-xl gradient-bg text-white text-sm font-medium shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200"
          >
            Hire Me
          </a>
          {/* Mobile menu button */}
          <button
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-secondary border border-border"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-xl">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:vipin.m2@gmail.com"
              className="mt-2 px-4 py-3 rounded-lg gradient-bg text-white text-sm font-medium text-center"
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
