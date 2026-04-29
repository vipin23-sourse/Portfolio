"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Navbar height offset so sections don't hide behind the sticky header
const HEADER_OFFSET = -80;

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration:    1.2,
      easing:      (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    // Keep GSAP ScrollTrigger in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // ── Intercept ALL <a href="#..."> anchor clicks ───────────────────────
    //    Native anchor clicks jump instantly; we delegate them to Lenis so
    //    they use the same smooth easing as wheel scrolling.
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const id = href.slice(1);
      if (!id) {
        // href="#" — scroll to top
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.4 });
        return;
      }

      const section = document.getElementById(id);
      if (!section) return;

      e.preventDefault();
      lenis.scrollTo(section, {
        offset:   HEADER_OFFSET,
        duration: 1.4,
        easing:   (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
