"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { nav, cta } from "@/lib/content";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function Wordmark() {
  return (
    <span className="font-display text-[20px] font-bold tracking-[-0.04em]">
      hitz<span className="text-accent">.</span>
    </span>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // Scrolled-state zonder scroll-listener: sentinel net onder de top.
  useEffect(() => {
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

  // Scroll-lock + Escape zolang open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Focus: bij openen naar het eerste item, bij sluiten terug naar de knop.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (open) panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    else toggleRef.current?.focus();
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] border-b transition-[background-color,border-color,backdrop-filter] duration-300",
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
              ref={toggleRef}
              type="button"
              className="-mr-1.5 p-1.5 text-ink md:hidden"
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="ham" data-open={open}>
                <span className="line line1" />
                <span className="line line2" />
                <span className="line line3" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Scrim — dimt + blurt de pagina (nog herkenbaar); klik sluit. Sibling van header. */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] transition-opacity duration-[260ms] md:hidden",
          EASE,
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer — schuift in met translateX, opaque, items gestaffeld. */}
      <aside
        ref={panelRef}
        id="mobile-menu"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex flex-col rounded-b-[28px] border-b border-line bg-base transition-transform duration-[260ms] will-change-transform md:hidden",
          EASE,
          open ? "translate-y-0" : "-translate-y-full",
        )}
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 92px)",
          paddingBottom: "40px",
        }}
      >
        <ul className="flex flex-col gap-1 px-7">
          {nav.links.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${130 + i * 55}ms` : "0ms" }}
                className={cn(
                  "block py-3 font-display text-[32px] font-semibold tracking-[-0.03em] transition-[opacity,transform] duration-[280ms] motion-reduce:transition-none",
                  EASE,
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div
          style={{ transitionDelay: open ? `${130 + nav.links.length * 55}ms` : "0ms" }}
          className={cn(
            "mt-6 px-7 transition-[opacity,transform] duration-[280ms] motion-reduce:transition-none",
            EASE,
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          <Button href={cta.explore.href} className="w-full" onClick={() => setOpen(false)}>
            {cta.explore.label}
          </Button>
        </div>
      </aside>
    </>
  );
}
