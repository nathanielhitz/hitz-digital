"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { nav, cta } from "@/lib/content";

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[20px] font-bold tracking-[-0.04em]", className)}>
      hitz<span className="text-accent">.</span>
    </span>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // No scroll listeners (taste skill §5.D). Observe a 1px sentinel near the top instead.
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:24px;left:0;width:1px;height:1px;pointer-events:none;";
    document.body.appendChild(sentinel);
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled ? "border-line bg-deep/70 backdrop-blur-xl" : "border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-[1140px] items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-10">
        <a href="#" aria-label="HitzDigital home" className="flex items-center gap-3">
          <Wordmark />
          <span className="hidden h-3.5 w-px bg-line lg:block" />
          <span className="hidden text-[11px] uppercase tracking-[0.22em] text-faint lg:block">
            Webstudio
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-[13.5px] tracking-[0.01em] text-muted transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button href={cta.explore.href} size="sm" className="hidden sm:inline-flex">
            {cta.explore.label}
          </Button>
          <button
            type="button"
            className="text-ink md:hidden"
            aria-label="Menu openen"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <List size={24} weight="bold" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-base/95 backdrop-blur-xl md:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <Wordmark />
            <button
              type="button"
              autoFocus
              className="text-ink"
              aria-label="Menu sluiten"
              onClick={() => setOpen(false)}
            >
              <X size={26} weight="bold" />
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center gap-1 px-6">
            {nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-display text-3xl font-semibold tracking-[-0.03em]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-10">
            <Button href={cta.explore.href} className="w-full" onClick={() => setOpen(false)}>
              {cta.explore.label}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
