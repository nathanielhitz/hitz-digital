"use client";

import { useEffect, useRef } from "react";
import { BrowserFrame } from "@/components/mock/BrowserFrame";

/**
 * Hero preview with a subtle premium 3D feel:
 * - resting state: static CSS tilt + soft glow/shadow depth (see globals.css)
 * - on mouse move (desktop only): pointer-parallax — frame, backdrop sheet and
 *   glow shift by different amounts for layered depth (CSS vars, no re-render)
 * - idle float keeps it gently alive
 * All effects are desktop-only and disabled under prefers-reduced-motion.
 */
export function HeroMockup() {
  const zoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;
    const allowed =
      window.matchMedia("(min-width: 768px)").matches &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!allowed) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = zone.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        zone.style.setProperty("--mx", mx.toFixed(3));
        zone.style.setProperty("--my", my.toFixed(3));
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      zone.style.setProperty("--mx", "0");
      zone.style.setProperty("--my", "0");
    };

    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", reset);
    return () => {
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={zoneRef} className="hero-mock relative">
      <div
        className="hero-mock__glow pointer-events-none absolute -inset-x-6 -bottom-12 -top-6 -z-10 blur-[46px]"
        style={{
          background: "radial-gradient(55% 55% at 64% 44%, rgba(226,97,60,0.20), transparent 68%)",
        }}
        aria-hidden
      />
      <div
        className="hero-mock__backdrop pointer-events-none absolute -right-5 -top-5 -z-[1] hidden h-full w-full rounded-[14px] border border-line bg-panel/50 md:block"
        aria-hidden
      />
      <div className="hero-mock__frame">
        <BrowserFrame
          url="atelier-noord.nl"
          src="/images/sample-site.svg"
          alt="Premium website-preview gemaakt door HitzDigital"
          priority
          className="shadow-[0_40px_90px_-44px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.06] md:shadow-[-40px_52px_104px_-46px_rgba(0,0,0,0.95)]"
        />
      </div>
    </div>
  );
}
