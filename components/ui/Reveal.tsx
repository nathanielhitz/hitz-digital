"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Fade + slide-up bij in beeld komen (één keer). Bij reduced-motion direct zichtbaar. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.16 || entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: [0, 0.16, 0.5] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-[850ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-[26px] opacity-0",
        className,
      )}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
