"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Licht/donker-schakelaar: pil-track, schuivende knop, zon links / maan rechts.
 * Standaard volgt de site het systeem (next-themes); één klik overschrijft dat en
 * bewaart de keuze in localStorage. Vóór hydration rendert een lege placeholder
 * van dezelfde maat, zodat er geen layout-shift is.
 */
export function ThemeSwitch({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dims = size === "lg" ? "h-10 w-[76px]" : "h-8 w-[60px]";
  if (!mounted) return <span className={cn("inline-block", dims, className)} aria-hidden />;

  const dark = resolvedTheme === "dark";
  const icon = size === "lg" ? 16 : 14;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Schakel naar licht thema" : "Schakel naar donker thema"}
      title={dark ? "Licht thema" : "Donker thema"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cn(
        "group relative inline-flex flex-none items-center rounded-full border border-line bg-field p-[3px] transition-[border-color,background-color] duration-200 hover:border-accent/55",
        dims,
        className,
      )}
    >
      {/* thumb */}
      <span
        aria-hidden
        className={cn(
          "absolute top-[3px] aspect-square h-[calc(100%-6px)] rounded-full bg-panel shadow-[0_1px_2px_var(--shadow-ink)] transition-transform duration-[260ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
          dark ? "translate-x-[var(--shift)]" : "translate-x-0",
        )}
        style={{ left: 3, ["--shift" as string]: size === "lg" ? "36px" : "28px" } as React.CSSProperties}
      />
      <span className="relative z-10 flex h-full w-full items-center justify-between px-[6px]">
        <Sun
          size={icon}
          weight={dark ? "regular" : "fill"}
          className={cn("transition-[color,transform] duration-200", dark ? "text-faint" : "scale-110 text-accent")}
        />
        <Moon
          size={icon}
          weight={dark ? "fill" : "regular"}
          className={cn("transition-[color,transform] duration-200", dark ? "scale-110 text-accent" : "text-faint")}
        />
      </span>
    </button>
  );
}
