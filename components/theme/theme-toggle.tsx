"use client";

import { useTheme } from "next-themes";
import { Moon, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="loading theme">
        <SunMedium className="h-5 w-5 animate-pulse" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}


