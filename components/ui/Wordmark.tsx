import { cn } from "@/lib/cn";

/** `hitz.` met accentpunt: het kleinste merkelement. */
export function Wordmark({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn("font-display font-semibold tracking-[-0.02em] text-ink", className)}
      style={{ fontSize: size }}
    >
      hitz<span className="text-accent">.</span>
    </span>
  );
}
