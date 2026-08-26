import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Sectielabel: kort accentstreepje + uppercase tekst. Max ~3 per pagina. */
export function Eyebrow({
  children,
  bar = true,
  className,
}: {
  children: ReactNode;
  bar?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-[22px] inline-flex items-center gap-[10px] text-[12px] uppercase tracking-[0.14em] text-muted",
        className,
      )}
    >
      {bar && <span className="h-[2px] w-[22px] shrink-0 bg-accent" aria-hidden />}
      {children}
    </div>
  );
}
