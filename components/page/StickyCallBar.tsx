import { whatsapp, tel } from "@/lib/content";

/** Vaste bel/app-balk onderaan op mobiel (verborgen vanaf 901px). */
export function StickyCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[rgba(7,7,6,0.86)] px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-[10px] backdrop-blur-[14px] min-[901px]:hidden"
      role="region"
      aria-label="Direct contact"
    >
      <div className="mx-auto grid max-w-[560px] grid-cols-2 gap-3">
        <a
          href={tel}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line py-3 text-[15px] font-semibold text-ink"
        >
          Bel
        </a>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent py-3 text-[15px] font-semibold text-on-accent"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
