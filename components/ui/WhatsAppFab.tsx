"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { whatsapp } from "@/lib/content";
import { cn } from "@/lib/cn";
import { useRangeVisible } from "@/lib/useRangeVisible";

type Props = {
  /** Sectie-id waar de knop ná verschijnt (standaard: Diensten). */
  afterId?: string;
  /** Sectie-id waar de knop weer verdwijnt (daar staat contact al). */
  untilId?: string;
  /** Extra klassen, bv. `max-[900px]:hidden` op pagina's met de mobiele StickyCallBar. */
  className?: string;
};

/**
 * Zwevende "Heb je een vraag?"-knop naar WhatsApp.
 * - verschijnt zodra het kopje van de sectie `afterId` in de bovenste 60% van het scherm komt
 * - verdwijnt weer zodra `untilId` in beeld komt (daar staat WhatsApp al)
 * - IntersectionObserver (zie useRangeVisible), geen scroll-listener; SSR-safe (start verborgen)
 */
export function WhatsAppFab({ afterId = "pijlers", untilId = "contact", className }: Props) {
  const visible = useRangeVisible(afterId, untilId, 0.6);

  return (
    <a
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Heb je een vraag? Stuur een WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-[calc(env(safe-area-inset-bottom)+20px)] right-5 z-40 inline-flex items-center gap-[10px] rounded-full bg-btn py-[13px] pl-[16px] pr-[22px] text-[15px] font-semibold leading-none text-on-accent shadow-btn",
        "transition-[transform,opacity,box-shadow,filter] duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)] will-change-transform",
        "hover:-translate-y-0.5 hover:brightness-[1.04] hover:shadow-btn-hover active:translate-y-0 active:scale-[0.98] active:duration-[120ms]",
        "min-[901px]:bottom-7 min-[901px]:right-7",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        className,
      )}
    >
      <WhatsappLogo size={22} weight="fill" aria-hidden />
      <span>Heb je een vraag?</span>
    </a>
  );
}
