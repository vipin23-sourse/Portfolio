"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
        "bg-secondary hover:bg-accent hover:text-accent-foreground",
        "border border-border hover:border-primary/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all duration-500",
          isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-500",
          isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        )}
      />
    </button>
  );
}
