"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, Mail, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";

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
  const menuRef = useRef<HTMLElement>(null);

  /* ── Scroll tracking ──────────────────────────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (menuOpen) setMenuOpen(false);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(s); break; }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  /* ── Lock body scroll when overlay open ──────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Sticky header bar ───────────────────────────────────────────── */}
      <header
        ref={menuRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden transition-all duration-500",
          scrolled
            ? "py-3 bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/5"
            : "py-5 bg-transparent"
        )}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="xl:max-w-6xl w-full mx-auto flex items-center justify-between gap-2">

            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 shrink-0 z-10"
              onClick={() => { close(); window.scrollTo({ top: 0 }); }}
            >
              <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0">
                V
              </div>
              <span className="font-semibold text-foreground whitespace-nowrap">
                Vipin <span className="gradient-text">MV</span>
              </span>
            </Link>

            {/* Desktop nav */}
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

            {/* Right controls */}
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />

              <a
                href="mailto:vipin.m2@gmail.com"
                className="hidden md:inline-flex h-9 lg:h-10 px-3 lg:px-5 items-center justify-center rounded-xl gradient-bg text-white text-sm font-medium shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200 whitespace-nowrap"
              >
                Hire Me
              </a>

              {/* Hamburger / close toggle */}
              <button
                className="lg:hidden relative h-9 w-9 flex items-center justify-center rounded-xl bg-secondary border border-border hover:bg-accent transition-colors duration-200 shrink-0 overflow-hidden"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span className={cn(
                  "absolute transition-all duration-300",
                  menuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                )}>
                  <Menu className="h-4 w-4" />
                </span>
                <span className={cn(
                  "absolute transition-all duration-300",
                  menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                )}>
                  <X className="h-4 w-4" />
                </span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Fullscreen mobile overlay ──────────────────────────────────────── */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        style={{ background: "rgba(4, 4, 10, 0.97)" }}
        aria-hidden={!menuOpen}
      >
        {/* Decorative gradient blobs — subtle purple glow */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

        {/* Slide-in panel from top */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out",
            menuOpen ? "translate-y-0" : "-translate-y-8"
          )}
        >
          {/* Nav links — staggered fade-up */}
          <nav className="flex flex-col items-center gap-2 w-full px-8 mb-10">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="group flex items-center w-full max-w-xs py-4 border-b border-white/5 hover:border-primary/30 transition-colors duration-200"
                style={menuOpen ? {
                  animation: `menu-item-in 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 70 + 80}ms both`,
                } : { opacity: 0 }}
              >
                <span className={cn(
                  "text-3xl font-bold tracking-tight transition-colors duration-200",
                  active === link.href.slice(1)
                    ? "gradient-text"
                    : "text-white/80 group-hover:text-white"
                )}>
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Hire Me button */}
          <div
            className="w-full max-w-xs px-8"
            style={menuOpen ? {
              animation: `menu-item-in 0.5s cubic-bezier(0.22,1,0.36,1) ${navLinks.length * 70 + 100}ms both`,
            } : { opacity: 0 }}
          >
            <a
              href="mailto:vipin.m2@gmail.com"
              onClick={close}
              className="flex items-center justify-center h-12 w-full rounded-xl gradient-bg text-white font-semibold text-base shadow-lg hover:opacity-90 transition-opacity duration-200"
            >
              Hire Me
            </a>
          </div>

          {/* Social icons row */}
          <div
            className="flex items-center gap-4 mt-8"
            style={menuOpen ? {
              animation: `menu-item-in 0.5s cubic-bezier(0.22,1,0.36,1) ${navLinks.length * 70 + 200}ms both`,
            } : { opacity: 0 }}
          >
            {[
              { href: "https://linkedin.com/in/vipin-vijayakumar", icon: LinkedInIcon, label: "LinkedIn" },
              { href: "mailto:vipin.m2@gmail.com", icon: Mail, label: "Email" },
              { href: "tel:+919633491984", icon: Phone, label: "Phone" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                onClick={close}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="h-10 w-10 flex items-center justify-center rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-primary/40 transition-all duration-200"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
