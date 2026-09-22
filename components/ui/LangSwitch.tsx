"use client";

import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { counterpart, publicPath, type Lang } from "@/lib/i18n/paths";
import { cn } from "@/lib/cn";

export type LangSwitchLabels = { nl: string; en: string; switchTo: { nl: string; en: string } };
export type LangSwitchVariant = "text" | "segment" | "names";

const LANGS: readonly Lang[] = ["nl", "en"];
const other = (lang: Lang): Lang => (lang === "nl" ? "en" : "nl");

/** Onthoudt de keuze een jaar (spec §2). Alleen een klik zet de cookie, nooit de middleware. */
function remember(target: Lang) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `lang=${target}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
}

/**
 * Taalschakelaar (spec §4): een gewone link naar de tegenhanger van de huidige pagina, werkt ook zonder JS.
 * - text:    desktop-nav, "NL · EN", actieve taal in inkt
 * - segment: mobiel menu, exacte tweeling van ThemeSwitch size="lg" (76×40, knop 32px), NL links / EN rechts
 * - names:   footer-onderbalk, "Nederlands | English"
 */
export function LangSwitch({ lang, labels, variant, className }: { lang: Lang; labels: LangSwitchLabels; variant: LangSwitchVariant; className?: string }) {
  // publicPath: de middleware herschrijft, dus usePathname() geeft /nl/hulp in plaats van /hulp.
  const route = publicPath(usePathname() ?? "/");
  // Query en hash staan niet in usePathname(); ze komen na hydration uit de URL, net als in AanvraagForm.
  // (useSearchParams zou elke statische pagina naar client-rendering trekken.)
  const [suffix, setSuffix] = useState("");
  useEffect(() => {
    const apply = () => setSuffix(`${window.location.search}${window.location.hash}`);
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);
  const pathname = route + suffix;
  const target = other(lang);
  const link = {
    href: counterpart(pathname, target),
    hrefLang: target,
    lang: target,
    "aria-label": labels.switchTo[target],
    onClick: () => remember(target),
  };

  if (variant === "segment") {
    return (
      <a
        {...link}
        className={cn(
          "group relative inline-flex h-10 w-[76px] flex-none items-center rounded-full border border-line bg-field p-[3px] transition-[border-color,background-color] duration-200 hover:border-accent/55",
          className,
        )}
      >
        {/* knop: 32px, schuift 36px, zelfde maten en easing als ThemeSwitch size="lg" */}
        <span
          aria-hidden
          className={cn(
            "absolute left-[3px] top-[3px] aspect-square h-[calc(100%-6px)] rounded-full bg-panel shadow-[0_1px_2px_var(--shadow-ink)] transition-transform duration-[260ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
            lang === "en" ? "translate-x-[36px]" : "translate-x-0",
          )}
        />
        <span className="relative z-10 flex h-full w-full items-center justify-between text-[11px] font-semibold tracking-[0.04em]">
          {LANGS.map((l) => (
            <span key={l} className={cn("w-8 text-center transition-colors duration-200", l === lang ? "text-ink" : "text-faint")}>
              {l.toUpperCase()}
            </span>
          ))}
        </span>
      </a>
    );
  }

  const names = variant === "names";
  const label = (l: Lang) => (names ? labels[l] : l.toUpperCase());
  return (
    <span className={cn("inline-flex items-center", names ? "gap-3" : "gap-[7px] text-[13px] font-medium tracking-[0.02em]", className)}>
      {LANGS.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && (names ? <span aria-hidden className="select-none">|</span> : <span aria-hidden className="h-3 w-px bg-line" />)}
          {l === lang ? (
            <span aria-current="true" className={cn("inline-block py-1", names ? "text-faint" : "text-ink")}>
              {label(l)}
            </span>
          ) : (
            <a {...link} className={cn("inline-block py-1 transition-colors hover:text-ink", names ? "text-muted" : "text-faint")}>
              {label(l)}
            </a>
          )}
        </Fragment>
      ))}
    </span>
  );
}
