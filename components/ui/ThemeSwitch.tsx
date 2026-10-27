"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type ThemeLabels = { toLight: string; toDark: string; light: string; dark: string };

/**
 * Licht/donker-knop: één icoon dat het huidige thema toont (zon = licht, maan = donker);
 * een klik wisselt. Standaard volgt de site het systeem (next-themes); een klik overschrijft dat
 * en bewaart de keuze in localStorage. Vóór hydration rendert een lege placeholder van dezelfde
 * maat, zodat er geen layout-shift is.
 */
export function ThemeSwitch({ className, size = "md", labels }: { className?: string; size?: "md" | "lg"; labels: ThemeLabels }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);
  const clicked = useRef(false);
  useEffect(() => setMounted(true), []);

  const dark = resolvedTheme === "dark";

  // Icoon draait en schaalt in na een klik. Web Animations i.p.v. een CSS-transition:
  // next-themes (disableTransitionOnChange) zet tijdens de wissel alle transitions uit.
  useEffect(() => {
    if (!clicked.current || !iconRef.current) return;
    clicked.current = false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    iconRef.current.animate(
      [
        { transform: "rotate(-90deg) scale(0.5)", opacity: 0 },
        { transform: "rotate(0) scale(1)", opacity: 1 },
      ],
      { duration: 320, easing: "cubic-bezier(.22,1,.36,1)" },
    );
  }, [dark]);

  const dims = size === "lg" ? "h-10 w-10" : "h-8 w-8";
  if (!mounted) return <span className={cn("inline-block", dims, className)} aria-hidden />;

  const Icon = dark ? Moon : Sun;

  return (
    <button
      type="button"
      aria-label={dark ? labels.toLight : labels.toDark}
      title={dark ? labels.toLight : labels.toDark}
      onClick={() => {
        clicked.current = true;
        setTheme(dark ? "light" : "dark");
      }}
      className={cn(
        "inline-flex flex-none items-center justify-center rounded-[10px] border border-line text-muted transition-[border-color,background-color,color] duration-200 hover:border-accent/55 hover:bg-accent/12 hover:text-ink",
        dims,
        className,
      )}
    >
      <span ref={iconRef} aria-hidden className="inline-flex">
        <Icon size={size === "lg" ? 18 : 16} />
      </span>
    </button>
  );
}
