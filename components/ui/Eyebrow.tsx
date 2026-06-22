import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * Bespoke section label: a short terracotta rule + uppercase text.
 * Matches the hero kicker so every section shares one motif.
 * `tone="cream"` for the light relief section. Use sparingly (max ~3 per page).
 */
export function Eyebrow({
  children,
  centered = false,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  centered?: boolean;
  tone?: "dark" | "cream";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.2em]",
        tone === "cream" ? "text-cream-muted" : "text-muted",
        centered && "justify-center",
        className,
      )}
    >
      <span className="h-px w-9 shrink-0 bg-accent" aria-hidden />
      {children}
    </span>
  );
}
