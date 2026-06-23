"use client";

import { useEffect, useRef } from "react";

/**
 * Subtiele scroll-voortgangsbalk onderaan de header.
 * - progress = scrollY / (scrollHeight - innerHeight)
 * - schrijft `transform: scaleX()` direct naar de DOM (geen React re-render)
 * - rAF-throttled + passieve listeners; read-then-write (geen layout thrashing)
 * - transform + origin-left = GPU, geen layout shift
 * - werkt op alle browsers incl. iOS Safari; SSR-safe (start op scaleX(0))
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
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
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[2.5px]"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
