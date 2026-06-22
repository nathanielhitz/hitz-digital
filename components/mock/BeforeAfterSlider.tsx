"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowsHorizontal } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/**
 * Straight (never tilted) before/after comparison.
 * - Pointer drag (mouse + touch), `touch-pan-y` so vertical page scroll keeps working.
 * - Keyboard: arrows (±3%), Home/End. Grip is a 44×44 ARIA slider.
 * - Position is written straight to a CSS var via refs (no per-frame React re-render).
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  initial = 52,
  className,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  initial?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gripRef = useRef<HTMLButtonElement>(null);
  const dragging = useRef(false);

  const setPos = (pct: number) => {
    const v = Math.max(2, Math.min(98, pct));
    containerRef.current?.style.setProperty("--pos", `${v}%`);
    gripRef.current?.setAttribute("aria-valuenow", String(Math.round(v)));
  };

  const fromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(((clientX - rect.left) / rect.width) * 100);
  };

  useEffect(() => {
    setPos(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[clamp(260px,38vw,400px)] cursor-ew-resize touch-pan-y select-none",
        className,
      )}
      style={{ "--pos": `${initial}%` } as React.CSSProperties}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        fromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) fromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      {/* AFTER (base layer) */}
      <div className="absolute inset-0">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(max-width: 880px) 100vw, 880px"
          className="object-cover object-left-top"
        />
        <span className="absolute right-3 top-3 rounded-full border border-line bg-[rgba(244,239,231,0.10)] px-[11px] py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink">
          Na
        </span>
      </div>

      {/* BEFORE (clipped overlay) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 880px) 100vw, 880px"
          className="object-cover object-left-top"
        />
        <span className="absolute left-3 top-3 rounded-full border border-black/10 bg-black/10 px-[11px] py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#6b6b6b]">
          Voor
        </span>
      </div>

      {/* HANDLE */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-[rgba(244,239,231,0.9)]"
        style={{ left: "var(--pos)" }}
      >
        <button
          ref={gripRef}
          type="button"
          role="slider"
          aria-label="Vergelijk voor en na"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={initial}
          tabIndex={0}
          onKeyDown={(e) => {
            const cur =
              parseFloat(containerRef.current?.style.getPropertyValue("--pos") || "52") || 52;
            if (e.key === "ArrowLeft") {
              setPos(cur - 3);
              e.preventDefault();
            } else if (e.key === "ArrowRight") {
              setPos(cur + 3);
              e.preventDefault();
            } else if (e.key === "Home") {
              setPos(2);
              e.preventDefault();
            } else if (e.key === "End") {
              setPos(98);
              e.preventDefault();
            }
          }}
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-accent text-white shadow-[0_0_0_6px_rgba(226,97,60,0.18),0_8px_22px_-6px_rgba(0,0,0,0.8)]"
        >
          <ArrowsHorizontal size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}
