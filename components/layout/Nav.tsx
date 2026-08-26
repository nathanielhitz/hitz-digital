"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";
import { nav, cta } from "@/lib/content";

/**
 * Vaste navigatie. Condenseert (blur + hairline) na 24px scroll via een
 * IntersectionObserver-sentinel (geen scroll-listener). Onder 901px: hamburger
 * + fullscreen menu met focus-beheer, Escape en scroll-lock.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:24px;left:0;width:1px;height:1px;pointer-events:none;";
    document.body.appendChild(sentinel);
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), { threshold: 0 });
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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (open) panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    else toggleRef.current?.focus();
  }, [open]);

  // Sluit het menu als het scherm breed genoeg wordt voor de desktop-links.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-[350ms]",
          scrolled ? "border-line bg-[rgba(9,9,8,0.72)] backdrop-blur-[14px]" : "border-transparent",
        )}
      >
        <nav
          aria-label="Hoofdnavigatie"
          className="mx-auto flex max-w-[1280px] items-center justify-between px-[clamp(20px,5vw,64px)] py-5"
        >
          <a href="/" aria-label="HitzDigital home" className="inline-flex items-center">
            <Wordmark />
          </a>

          <div className="hidden items-center gap-8 text-[14px] text-muted min-[901px]:flex">
            {nav.links.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
            <a
              href={cta.demo.href}
              className="inline-flex items-center gap-2 rounded-full border border-line px-[17px] py-[9px] font-medium text-ink transition-[border-color,background-color] duration-[250ms] hover:border-accent/55 hover:bg-accent/12"
            >
              {cta.demo.label}
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center text-ink min-[901px]:hidden"
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
        </nav>
      </header>

      {/* Fullscreen menu (mobiel) */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-[rgba(7,7,6,0.97)] px-[clamp(20px,7vw,40px)] pb-11 pt-[22px] backdrop-blur-[12px] transition-opacity duration-[260ms] min-[901px]:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <Wordmark />
          <button
            type="button"
            aria-label="Menu sluiten"
            onClick={close}
            className="h-11 w-11 text-[30px] leading-none text-ink"
          >
            ×
          </button>
        </div>
        <div className="my-auto flex flex-col gap-0.5">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="py-[10px] font-display text-[clamp(30px,9vw,42px)] font-semibold tracking-[-0.025em] text-ink transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </div>
        <Button href={cta.demo.href} className="w-full py-4 text-[16px]" onClick={close}>
          {cta.demo.label}
        </Button>
      </div>
    </>
  );
}
