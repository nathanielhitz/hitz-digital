"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { whatsapp } from "@/lib/content";
import { cn } from "@/lib/cn";

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
 * - verschijnt zodra het kopje van de sectie `afterId` in beeld komt
 * - verdwijnt weer zodra `untilId` in beeld komt (daar staat WhatsApp al)
 * - rAF-throttled, passieve listeners, SSR-safe (start verborgen)
 */
export function WhatsAppFab({ afterId = "pijlers", untilId = "contact", className }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const after = document.getElementById(afterId);
    if (!after) return;
    const until = untilId ? document.getElementById(untilId) : null;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      // Zichtbaar zodra het kopje van de sectie in beeld komt (bovenkant in de bovenste 60% van het scherm).
      const pastAfter = after.getBoundingClientRect().top < vh * 0.6;
      const beforeUntil = until ? until.getBoundingClientRect().top > vh * 0.85 : true;
      setVisible(pastAfter && beforeUntil);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [afterId, untilId]);

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
        "hover:-translate-y-0.5 hover:brightness-[1.04] hover:shadow-btn-hover active:translate-y-0",
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
