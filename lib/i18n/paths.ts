/**
 * Padkaart NL↔EN. Enige bron voor vertaalde slugs en de header-knop per route (spec §1, §4).
 * Geen runtime-imports: dit bestand draait ook los onder `node --test` en in de Edge-middleware.
 */
export type Lang = "nl" | "en";

/** Talen die live zijn. */
export const locales: readonly Lang[] = ["nl", "en"];
export const defaultLang: Lang = "nl";

export function isLang(x: unknown): x is Lang {
  return x === "nl" || x === "en";
}
export function isLive(lang: Lang): boolean {
  return locales.includes(lang);
}
/** Vangnet voor `params.lang`: de middleware laat alleen nl/en door. */
export function langOf(raw: unknown): Lang {
  return isLang(raw) ? raw : defaultLang;
}

export type CtaKind = "demo" | "hosting" | "hulp" | "contact";
export type RouteKey = "home" | "websites" | "hosting" | "hulp" | "werk" | "contact" | "privacy" | "voorwaarden" | "support";
type SegmentKey = Exclude<RouteKey, "home">;

type Segment = {
  /** Mapnaam in app/[lang]/(site)/ én publieke NL-slug. */
  nl: string;
  /** Publieke EN-slug; null = bestaat niet in het Engels. */
  en: string | null;
  /** Header-knop op deze route; null = geen knop. */
  cta: CtaKind | null;
  /** Heeft een [slug]-kind. */
  dynamic: boolean;
};

export const segments: Record<SegmentKey, Segment> = {
  websites: { nl: "websites", en: "websites", cta: "demo", dynamic: false },
  hosting: { nl: "hosting", en: "hosting", cta: "hosting", dynamic: false },
  hulp: { nl: "hulp", en: "help", cta: "hulp", dynamic: false },
  werk: { nl: "werk", en: "work", cta: "demo", dynamic: true },
  contact: { nl: "contact", en: "contact", cta: null, dynamic: false },
  privacy: { nl: "privacy", en: "privacy", cta: "contact", dynamic: false },
  voorwaarden: { nl: "voorwaarden", en: "terms", cta: "contact", dynamic: false },
  support: { nl: "support", en: null, cta: "contact", dynamic: true },
};

const segmentKeys = Object.keys(segments) as SegmentKey[];
const prefix = (lang: Lang) => (lang === "nl" ? "" : `/${lang}`);

/** Publiek pad. Routes zonder EN-versie (support) geven altijd het NL-pad. */
export function href(lang: Lang, key: RouteKey, slug?: string): string {
  if (key === "home") return prefix(lang) || "/";
  const seg = segments[key];
  const l: Lang = seg[lang] === null ? "nl" : lang;
  return `${prefix(l)}/${seg[l] as string}${slug ? `/${slug}` : ""}`;
}

export type Parsed = { lang: Lang; key: RouteKey; slug?: string };

/** Ontleedt een publiek pad (query en hash worden genegeerd). null = geen bekende route. */
export function parsePublic(pathname: string): Parsed | null {
  const parts = pathname.split(/[?#]/)[0].split("/").filter(Boolean);
  let lang: Lang = "nl";
  if (parts[0] === "en") {
    lang = "en";
    parts.shift();
  }
  if (parts.length === 0) return { lang, key: "home" };
  const [first, second, ...rest] = parts;
  for (const key of segmentKeys) {
    const seg = segments[key];
    if (seg[lang] !== first) continue;
    if (second === undefined) return { lang, key };
    if (seg.dynamic && rest.length === 0) return { lang, key, slug: second };
    return null;
  }
  return null;
}

/** Interne route (Nederlandse mapnaam) onder de taalprefix. Voorwaarde: de route bestaat in deze taal (parsePublic garandeert dat). */
export function internalPath(p: Parsed): string {
  if (p.key === "home") return `/${p.lang}`;
  return `/${p.lang}/${segments[p.key].nl}${p.slug ? `/${p.slug}` : ""}`;
}

/**
 * Een /en-pad dat de interne (Nederlandse) slug gebruikt of naar support wijst,
 * krijgt het publieke adres terug; anders null. Alleen voor routes waar NL- en EN-slug verschillen.
 * Geeft alleen het pad terug; de middleware zet dat op een clone van req.nextUrl, zodat de query behouden blijft.
 */
export function redirectForEn(pathname: string): string | null {
  const parts = pathname.split(/[?#]/)[0].split("/").filter(Boolean);
  if (parts[0] !== "en" || parts.length < 2) return null;
  const [, first, second, ...rest] = parts;
  for (const key of segmentKeys) {
    const seg = segments[key];
    if (seg.nl !== first) continue;
    if (seg.en === seg.nl) return null;
    if (second !== undefined && (!seg.dynamic || rest.length > 0)) return null;
    return href("en", key, second);
  }
  return null;
}

/** Tegenhanger van de huidige pagina in de andere taal, mét query en hash; zonder tegenhanger de homepage (zonder query). */
export function counterpart(pathname: string, target: Lang): string {
  const path = pathname.split(/[?#]/)[0];
  const suffix = pathname.slice(path.length);
  const p = parsePublic(path);
  if (!p || (p.key !== "home" && segments[p.key][target] === null)) return href(target, "home");
  return href(target, p.key, p.slug) + suffix;
}

/** Header-knop voor een pad. Onbekende paden (404) tonen "Contact". */
export function ctaFor(pathname: string): CtaKind | null {
  const p = parsePublic(pathname);
  if (!p) return "contact";
  if (p.key === "home") return "demo";
  return segments[p.key].cta;
}

export type Alternates = { canonical: string; languages?: { nl: string; en: string; "x-default": string } };

/** `alternates` voor Metadata: canonical + hreflang zodra EN live is en de route een EN-versie heeft. */
export function alternatesFor(lang: Lang, key: RouteKey, slug?: string): Alternates {
  const canonical = href(lang, key, slug);
  const hasEn = key === "home" || segments[key].en !== null;
  if (!hasEn || !isLive("en")) return { canonical };
  const nl = href("nl", key, slug);
  return { canonical, languages: { nl, en: href("en", key, slug), "x-default": nl } };
}

export function ogLocale(lang: Lang): "nl_NL" | "en_GB" {
  return lang === "nl" ? "nl_NL" : "en_GB";
}

/** Props van layouts en pagina's onder app/[lang] (Next 15: params is een Promise). */
export type LangParams = { params: Promise<{ lang: string }> };
export type SlugParams = { params: Promise<{ lang: string; slug: string }> };
