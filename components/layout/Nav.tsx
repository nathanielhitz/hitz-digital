"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { ThemeSwitch, type ThemeLabels } from "@/components/ui/ThemeSwitch";
import { LangSwitch, type LangSwitchLabels } from "@/components/ui/LangSwitch";
import { cn } from "@/lib/cn";
import { href, type Lang } from "@/lib/i18n/paths";

export type NavLabels = { aria: string; homeAria: string; menuOpen: string; menuClose: string; menu: string; themeRow: string; langRow: string };

type Props = {
  lang: Lang;
  links: { label: string; href: string }[];
  /** Header-knop (desktop rechts, mobiel onderin het menu). Fase 3 maakt dit contextueel. */
  cta: { label: string; href: string };
  labels: NavLabels;
  theme: ThemeLabels;
  langLabels: LangSwitchLabels;
};

/**
 * Vaste navigatie. Condenseert (blur + hairline) na 24px scroll via een
 * IntersectionObserver-sentinel (geen scroll-listener). Onder 901px: hamburger
 * + fullscreen menu met focus-beheer, Escape en scroll-lock.
 */
export function Nav({ lang, links, cta, labels, theme, langLabels }: Props) {
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
          "fixed inset-x-0 top-0 z-[70] border-b transition-[background-color,border-color,backdrop-filter] duration-[250ms]",
          scrolled ? "border-line bg-glass/72 backdrop-blur-[14px]" : "border-transparent",
        )}
      >
        <nav
          aria-label={labels.aria}
          className="mx-auto flex max-w-[1280px] items-center justify-between px-[clamp(20px,5vw,64px)] py-5"
        >
          <a href={href(lang, "home")} aria-label={labels.homeAria} className="inline-flex items-center py-2">
            <Wordmark />
          </a>

          <div className="hidden items-center gap-8 text-[14px] text-muted min-[901px]:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
            <LangSwitch lang={lang} labels={langLabels} variant="text" />
            <ThemeSwitch labels={theme} />
            <a
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-full border border-line px-[17px] py-[9px] font-medium text-ink transition-[border-color,background-color] duration-[250ms] hover:border-accent/55 hover:bg-accent/12"
            >
              {cta.label}
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center text-ink min-[901px]:hidden"
            aria-label={open ? labels.menuClose : labels.menuOpen}
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

      {/* Fullscreen menu (mobiel). De header (z-70) blijft erboven: de gemorphte hamburger is de sluitknop.
          Openen: paneel 220ms, links met 40ms stagger (opacity + 8px). Sluiten: 160ms, alles tegelijk. */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={labels.menu}
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-glass/97 px-[clamp(20px,7vw,40px)] pb-11 pt-[88px] backdrop-blur-[12px] transition-opacity ease-[cubic-bezier(.23,1,.32,1)] min-[901px]:hidden",
          open ? "opacity-100 duration-[220ms]" : "pointer-events-none opacity-0 duration-[160ms]",
        )}
      >
        <div className="my-auto flex flex-col gap-0.5">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              style={{ transitionDelay: open ? `${40 + i * 40}ms` : "0ms" }}
              className={cn(
                "py-[10px] font-display text-[clamp(30px,9vw,42px)] font-semibold tracking-[-0.025em] text-ink transition-[opacity,transform,color] ease-[cubic-bezier(.23,1,.32,1)] hover:text-accent motion-reduce:transition-none",
                open ? "translate-y-0 opacity-100 duration-[220ms]" : "translate-y-2 opacity-0 duration-[160ms]",
              )}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="mb-6 flex flex-col gap-[14px] text-[14px] text-muted">
          <div className="flex items-center justify-between">
            <span>{labels.themeRow}</span>
            <ThemeSwitch size="lg" labels={theme} />
          </div>
          <div className="flex items-center justify-between">
            <span>{labels.langRow}</span>
            <LangSwitch lang={lang} labels={langLabels} variant="segment" />
          </div>
        </div>
        <Button href={cta.href} className="w-full py-4 text-[16px]" onClick={close}>
          {cta.label}
        </Button>
      </div>
    </>
  );
}
