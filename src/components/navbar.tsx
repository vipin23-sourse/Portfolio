"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Experience", href: "#experience" },
  { label: "Work",       href: "#work"       },
  { label: "Contact",    href: "#contact"    },
];

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* ── Scroll tracking ──────────────────────────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (menuOpen) setMenuOpen(false);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  /* ── Close menu on outside click ──────────────────────────────────────── */
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  /* ── Lock body scroll when mobile menu open ───────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      ref={menuRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-3 bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/5"
          : "py-5 bg-transparent"
      )}
    >
      {/* Padding wrapper matches section-padding px exactly */}
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Inner container — same max-w-6xl as all page sections */}
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* ── Logo ────────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="group flex items-center gap-2 shrink-0 z-10"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
              V
            </div>
            <span className="font-semibold text-foreground">
              Vipin <span className="gradient-text">MV</span>
            </span>
          </Link>

          {/* ── Desktop nav (lg+) ───────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  active === link.href.slice(1)
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Right side ──────────────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Hire Me — visible from md+ */}
            <a
              href="mailto:vipin.m2@gmail.com"
              className="hidden md:inline-flex h-9 lg:h-10 px-4 lg:px-5 items-center justify-center rounded-xl gradient-bg text-white text-sm font-medium shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200 whitespace-nowrap"
            >
              Hire Me
            </a>

            {/* Hamburger — hidden on lg+ */}
            <button
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-secondary border border-border hover:bg-accent transition-colors duration-200 shrink-0"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen
                ? <X    className="h-4 w-4 transition-all duration-200" />
                : <Menu className="h-4 w-4 transition-all duration-200" />
              }
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile / Tablet slide-down drawer ─────────────────────────────── */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out",
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="bg-background/98 backdrop-blur-xl border-b border-border shadow-2xl">
          {/* Same padding as sections so the menu content aligns too */}
          <div className="px-4 sm:px-6 lg:px-8">
            <nav className="max-w-6xl mx-auto py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    active === link.href.slice(1)
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:vipin.m2@gmail.com"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl gradient-bg text-white text-sm font-semibold text-center shadow-lg"
              >
                Hire Me
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
