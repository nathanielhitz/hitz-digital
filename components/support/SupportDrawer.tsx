"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { publicPath } from "@/lib/i18n/paths";

export type SupportDrawerGroup = { category: string; items: { slug: string; title: string }[] };

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const DrawerContext = createContext<Ctx>({ open: false, setOpen: () => {} });

const PANEL_ID = "support-drawer";
const EASE = "ease-[cubic-bezier(.23,1,.32,1)]";

/**
 * Open-status van het zijmenu. Leeft in app/[lang]/(site)/support/layout.tsx, dus blijft staan
 * bij client-side navigatie tussen artikelen. Sluit zichzelf zodra het pad geen artikelpagina is
 * (bijvoorbeeld terug naar /support), zodat de scroll-lock nooit achterblijft.
 */
export function SupportDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = publicPath(usePathname() ?? "/");
  const onArticle = pathname.startsWith("/support/");

  useEffect(() => {
    if (!onArticle) setOpen(false);
  }, [onArticle]);

  // Buiten een artikelpagina is het paneel altijd dicht, ook in de render vóór het effect hierboven.
  const value = useMemo(() => ({ open: open && onArticle, setOpen }), [open, onArticle]);

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

/** Ghost-pil in de hero van een artikelpagina. Wordt gevonden via aria-controls voor de focus-teruggave. */
export function SupportDrawerButton() {
  const { open, setOpen } = useContext(DrawerContext);
  return (
    <Button variant="ghost" size="sm" ariaExpanded={open} ariaControls={PANEL_ID} onClick={() => setOpen(true)}>
      <List size={16} weight="bold" aria-hidden />
      Alle handleidingen
    </Button>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Scrim + paneel. Dialoogpatroon zoals het mobiele menu in Nav: Escape, inert als dicht, scroll-lock,
 * focus naar het kruisje bij openen en terug naar de heroknop bij sluiten. Tab blijft binnen het paneel.
 * Openen: scrim 220ms, paneel 320ms van links. Sluiten: beide 180ms. Reduced motion: alleen opacity.
 */
export function SupportDrawerPanel({ groups, hulpHref, whatsappHref }: { groups: SupportDrawerGroup[]; hulpHref: string; whatsappHref: string }) {
  const { open, setOpen } = useContext(DrawerContext);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(open);
  const current = publicPath(usePathname() ?? "/");
  const close = useCallback(() => setOpen(false), [setOpen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  // Alleen bij een echte wissel (ook veilig bij de dubbele effect-run van StrictMode).
  useEffect(() => {
    if (prevOpen.current === open) return;
    prevOpen.current = open;
    if (open) {
      closeRef.current?.focus();
      return;
    }
    const back = document.querySelector<HTMLElement>(`[aria-controls="${PANEL_ID}"]`);
    if (back) back.focus({ preventScroll: true });
    else {
      // main krijgt tabindex pas hier, zodat Next bij navigatie niet zelf main focust (dan verlaat focus het paneel).
      const m = document.getElementById("main");
      if (m) {
        m.setAttribute("tabindex", "-1");
        m.style.outline = "none";
        m.focus({ preventScroll: true });
      }
    }
  }, [open]);

  // Tab en Shift+Tab blijven binnen het paneel.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <div
        aria-hidden
        onClick={close}
        className={cn(
          "fixed inset-0 z-[55] bg-deep/55 backdrop-blur-[6px] transition-opacity",
          EASE,
          open ? "opacity-100 duration-[220ms]" : "pointer-events-none opacity-0 duration-[180ms]",
        )}
      />
      <div
        ref={panelRef}
        id={PANEL_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Handleidingen"
        aria-hidden={!open}
        inert={!open}
        onKeyDown={onKeyDown}
        className={cn(
          "fixed bottom-0 left-0 top-[88px] z-[55] flex w-[360px] max-w-[calc(100%-48px)] flex-col border-r border-line bg-glass/97 backdrop-blur-[12px]",
          "transition-transform motion-reduce:transition-opacity",
          EASE,
          open
            ? "translate-x-0 duration-[320ms] motion-reduce:opacity-100"
            : "-translate-x-full duration-[180ms] motion-reduce:translate-x-0 motion-reduce:opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-6 pb-4">
          <span className="font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">Handleidingen</span>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Menu sluiten"
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-accent/10 hover:text-ink"
          >
            <X size={18} weight="bold" aria-hidden />
          </button>
        </div>

        <nav aria-label="Alle handleidingen" className="flex-1 overflow-y-auto px-6 pb-6">
          {groups.map((g) => (
            <div key={g.category} className="mb-7">
              <h2 className="mb-2 text-[12px] uppercase tracking-[0.14em] text-faint">{g.category}</h2>
              <ul>
                {g.items.map((a) => {
                  const href = `/support/${a.slug}`;
                  const active = current === href;
                  return (
                    <li key={a.slug}>
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        onClick={(e) => {
                          if (active) {
                            e.preventDefault();
                            close();
                          }
                        }}
                        className={cn(
                          "-ml-3 block border-l-2 py-[7px] pl-3 pr-2 text-[14.5px] leading-[1.4] transition-colors",
                          active ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink",
                        )}
                      >
                        {a.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-line px-6 py-5">
          <p className="text-[14px] text-muted">
            Staat je vraag er niet bij?{" "}
            <a href={hulpHref} className="text-accent-bright underline-offset-2 hover:underline">
              Computer- en websitehulp
            </a>
          </p>
          <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" size="sm" onClick={close} className="mt-4">
            App me
          </Button>
        </div>
      </div>
    </>
  );
}
