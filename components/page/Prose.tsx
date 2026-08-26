import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Leesbare opmaak voor lange teksten (privacy, voorwaarden). */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-[720px] text-[15.5px] leading-[1.7] text-muted",
        "[&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[clamp(19px,2.2vw,24px)] [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink",
        "[&_h3]:mb-2 [&_h3]:mt-7 [&_h3]:font-display [&_h3]:text-[17px] [&_h3]:font-semibold [&_h3]:text-ink",
        "[&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 [&_strong]:text-ink [&_a]:text-accent-bright [&_a]:underline-offset-2 hover:[&_a]:underline",
        className,
      )}
    >
      {children}
    </div>
  );
}
