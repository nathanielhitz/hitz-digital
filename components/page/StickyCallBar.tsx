"use client";

import { whatsapp, tel } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useRangeVisible } from "@/lib/useRangeVisible";

/**
 * Vaste bel/app-balk onderaan op mobiel (verborgen vanaf 901px).
 * Verschijnt pas als de knoppen in de paginakop uit beeld zijn (bovenkant van `afterId`
 * in de bovenste 15% van het scherm) en verdwijnt bij `untilId`, waar dezelfde knoppen al staan.
 * Zo staan er nooit twee keer "Bel" en "WhatsApp" in één schermhoogte.
 */
export function StickyCallBar({ afterId, untilId }: { afterId: string; untilId?: string }) {
  const visible = useRangeVisible(afterId, untilId, 0.15);
  return (
    <div
      role="region"
      aria-label="Direct contact"
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-glass/86 px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-[10px] backdrop-blur-[14px] min-[901px]:hidden",
        "transition-[transform,opacity] duration-[220ms] ease-[cubic-bezier(.23,1,.32,1)] motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      <div className="mx-auto grid max-w-[560px] grid-cols-2 gap-3">
        <a
          href={tel}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line py-3 text-[15px] font-semibold text-ink transition-transform duration-[120ms] active:scale-[0.98]"
        >
          Bel
        </a>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent py-3 text-[15px] font-semibold text-on-accent transition-transform duration-[120ms] active:scale-[0.98]"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
