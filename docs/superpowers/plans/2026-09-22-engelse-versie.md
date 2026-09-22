# Engelse versie Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** hitzdigital.nl krijgt een Engelse versie onder `/en/…` met Engelse slugs, automatische taalkeuze op de homepage, een taalschakelaar in nav, mobiel menu en footer, en een contextuele header-knop; de Nederlandse site verandert voor bezoekers en Google niets.

**Architecture:** Eén routeboom onder `app/[lang]/(site)/…`. Een eigen `middleware.ts` herschrijft Nederlandse URL's zonder prefix intern naar `/nl/…`, vertaalt publieke Engelse slugs (`/en/help`) naar de Nederlandse mapnamen (`/en/hulp`) en redirect alleen de kale homepage op basis van cookie of `Accept-Language`. Alle tekst komt uit getypte woordenboeken in `lib/i18n/{nl,en}/`; Nederlands is de bron, het Engelse woordenboek krijgt hetzelfde type zodat een ontbrekende sleutel een TypeScript-fout is. Getallen, slugs, afbeeldingen en contactgegevens blijven taalneutraal in `lib/pricing.ts`, `lib/work.ts` en `lib/site.ts`.

**Tech Stack:** Next.js 15.1 (App Router, middleware op Edge), React 19, TypeScript 5.7, Tailwind 4, next-themes, Resend, Vercel Analytics. Tests: Node 24 ingebouwde testrunner (`node --test`, draait `.ts` direct via type-stripping) voor unit- en HTTP-tests; Playwright (globaal geïnstalleerd, `npm root -g`) voor één browsertest van de cookie. Geen nieuwe dependencies.

**Spec:** `docs/superpowers/specs/2026-09-22-engelse-versie-design.md`

---

## Werkafspraken voor dit plan

- Alle paden zijn relatief aan `site/` (de git-root). Werk op branch `feature/engels`; niets gaat naar `main` vóór Task 34.
- Vier fasen (spec §9). Na elke fase een **checkpoint**: bouw slaagt, tests slagen, Nathaniel geeft akkoord vóór de volgende fase begint. In fase 2 leest Nathaniel elke Engelse pagina tegen vóór de volgende pagina.
- Elke task eindigt met `npx tsc --noEmit` (typecheck) en, waar aangegeven, `npm run build`. Een task is pas klaar als beide zonder fouten zijn.
- De dev-server draait op poort 3111 (poort 3000 is op deze machine vaak bezet): `npx next dev -p 3111`. De productie-server voor e2e-tests: `npx next start -p 3111`.
- Nederlandse tekst wordt in fase 1 **letterlijk** verplaatst, niet herschreven. Elke afwijking van een bestaande string is een fout (screenshots moeten identiek blijven).
- Afwijkingen van de spec die in dit plan bewust gemaakt zijn:
  1. Spec §4 zegt dat de layout de header-knop bepaalt. Een server-layout kent de pathname niet zonder de pagina dynamisch te maken; daarom bepaalt `Nav` (client, `usePathname()`) de knop zelf met `ctaFor()` uit de padkaart. Gedrag is identiek.
  2. Spec §3 noemt `euro(amount, lang)`. Beide talen schrijven `€250`, dus `euro(amount)` blijft ongewijzigd; "per maand" / "per month" komt uit het woordenboek.
  3. Spec §9 zet middleware-regels 3, 4 en 6 in fase 3. Ze komen in Task 18 (start fase 2), zodat Nathaniel de Engelse pagina's op hun echte URL's kan nalezen. Regel 5 (detectie) blijft fase 3.
  4. Spec §3 noemt vier woordenboekmodules per taal. De juridische teksten (privacy, voorwaarden) zijn lange JSX-prose en krijgen elk een eigen bestand (`legal-privacy.tsx`, `legal-terms.tsx`) dat vanuit `pages.tsx` wordt gerefereerd. Zelfde principe, leesbaarder.

---

## Bestandsoverzicht

**Nieuw**

| Bestand | Verantwoordelijkheid |
|---|---|
| `middleware.ts` | Rewrites/redirects per spec §2 |
| `lib/i18n/paths.ts` | Padkaart NL↔EN, `Lang`, `locales`, `href()`, `parsePublic()`, `internalPath()`, `publicPath()`, `redirectForEn()`, `counterpart()`, `ctaFor()`, `alternatesFor()`, `ogLocale()`. Geen runtime-imports (draait los onder `node --test`) |
| `lib/i18n/accept-language.ts` | `prefersEnglish(header)` |
| `lib/i18n/index.ts` | `getDict(lang)`, type `Dict` |
| `lib/i18n/nl/ui.tsx` | Nav, footer, skip-link, thema- en taalknop-labels, formulier, FAB, sticky balk, CTA-band, kruimelpad, 404, OG-onderregel, schema-teksten, WerkCard/PlanCard-labels |
| `lib/i18n/nl/pages.tsx` | Per pagina: metadata, OG-tekst, hero, secties, CTA-band |
| `lib/i18n/nl/services.ts` | Pijlers, werkwijze, zo-werk-ik, over, website-opties/-inbegrepen/-FAQ, hosting-altijd/overstappen/FAQ/pakket-labels/mailbox/domein-labels, hulp-lijsten/FAQ/tarief-labels, contact-FAQ |
| `lib/i18n/nl/work.ts` | Meta-regels, alt-teksten en case-copy per slug |
| `lib/i18n/nl/legal-privacy.tsx`, `lib/i18n/nl/legal-terms.tsx` | Body-componenten van privacy en voorwaarden (verplaatste JSX) |
| `lib/i18n/nl/index.ts` | Re-export van de NL-modules |
| `lib/i18n/en/…` | Zelfde bestanden, Engels, getypt met `typeof` van de NL-tegenhanger |
| `lib/aanvraag.ts` | De vier keuze-ids van het formulier (taalneutraal) |
| `components/ui/LangSwitch.tsx` | Taalschakelaar, varianten `text`, `segment`, `names` |
| `components/ui/NotFoundView.tsx` | 404-weergave (client); kiest de taal uit `usePathname()` |
| `app/[lang]/layout.tsx` | Voormalige root-layout, met `lang` |
| `app/[lang]/not-found.tsx` | Tweetalige 404 (rendert `NotFoundView`) |
| `app/[lang]/[...rest]/page.tsx` | Catch-all → `notFound()` |
| `tests/unit/paths.test.ts`, `tests/unit/accept-language.test.ts` | Unit-tests padkaart en header-parser |
| `tests/e2e/i18n.test.mjs` | HTTP-tests tegen `next start` (redirects, rewrites, hreflang, sitemap, lek-check) |
| `tests/e2e/switch-cookie.mjs` | Playwright: klik op schakelaar zet cookie |

**Verplaatst** (`git mv`, inhoud pas daarna aangepast)

- `app/(site)/**` → `app/[lang]/(site)/**`
- `app/layout.tsx` → `app/[lang]/layout.tsx`
- `app/not-found.tsx` → `app/[lang]/not-found.tsx`
- `app/opengraph-image.tsx` → `app/[lang]/(site)/opengraph-image.tsx`

**Blijft op `app/`-niveau:** `robots.ts`, `sitemap.ts`, `icon.tsx`, `apple-icon.tsx`, `globals.css`, `fonts/`, `actions/contact.ts`.

**Gewijzigd:** `components/layout/Nav.tsx`, `components/layout/Footer.tsx`, `components/ui/ThemeSwitch.tsx`, `components/ui/Breadcrumbs.tsx`, `components/ui/WhatsAppFab.tsx`, `components/page/StickyCallBar.tsx`, `components/page/CtaBand.tsx`, `components/page/PlanCard.tsx`, `components/page/FaqList.tsx` (ongewijzigd behalve type), `components/sections/*.tsx`, `components/hero/HeroExperience.tsx`, `lib/site.ts`, `lib/pricing.ts`, `lib/work.ts`, `lib/content.ts`, `lib/og.tsx`, `app/sitemap.ts`, `app/actions/contact.ts`, `package.json`.

**Verwijderd (Task 16):** `lib/services.ts` (opgegaan in `lib/i18n/*/services.ts`).

---

## Type-contract (geldt voor alle tasks)

Deze namen en signaturen worden in alle tasks exact zo gebruikt.

```ts
// lib/i18n/paths.ts
export type Lang = "nl" | "en";
export const locales: readonly Lang[];            // fase 1: ["nl"], vanaf Task 18: ["nl", "en"]
export const defaultLang: Lang;                   // "nl"
export function isLang(x: unknown): x is Lang;
export function isLive(lang: Lang): boolean;      // staat in `locales`
export function langOf(raw: unknown): Lang;       // isLang(raw) ? raw : defaultLang (vangnet voor params)
export type CtaKind = "demo" | "hosting" | "hulp" | "contact";
export type RouteKey = "home" | "websites" | "hosting" | "hulp" | "werk" | "contact" | "privacy" | "voorwaarden" | "support";
export type Parsed = { lang: Lang; key: RouteKey; slug?: string };
export function href(lang: Lang, key: RouteKey, slug?: string): string;   // publiek pad
export function parsePublic(pathname: string): Parsed | null;
export function internalPath(p: Parsed): string;                          // "/nl/hulp", "/en/hulp", "/en", "/nl"
export function publicPath(pathname: string): string;                     // omgekeerde: "/nl/hulp" → "/hulp", "/en/hulp" → "/en/help"
export function redirectForEn(pathname: string): string | null;           // "/en/hulp" → "/en/help"; "/en/support/x" → "/support/x"
export function counterpart(pathname: string, target: Lang): string;
export function ctaFor(pathname: string): CtaKind | null;
export type Alternates = { canonical: string; languages?: { nl: string; en: string; "x-default": string } };
export function alternatesFor(lang: Lang, key: RouteKey, slug?: string): Alternates;
export type LangParams = { params: Promise<{ lang: string }> };          // props van layout/pagina zonder slug
export type SlugParams = { params: Promise<{ lang: string; slug: string }> };
export function ogLocale(lang: Lang): "nl_NL" | "en_GB";

// lib/i18n/index.ts
export type Dict = { ui: UiDict; pages: PagesDict; services: ServicesDict; work: WorkDict };
export function getDict(lang: Lang): Dict;        // valt terug op nl zolang en niet in `dicts` staat

// lib/aanvraag.ts
export const aanvraagIds = ["website", "hosting", "hulp", "anders"] as const;
export type AanvraagKeuze = (typeof aanvraagIds)[number];
export function isAanvraagKeuze(x: unknown): x is AanvraagKeuze;

// pagina's en layouts (Next 15: params is een Promise)
type LangParams = { params: Promise<{ lang: Lang }> };
```

---

# Fase 1 — Refactor naar `[lang]`, alleen Nederlands

Doel van de fase: na Task 17 is de site voor bezoekers en Google **identiek** aan `main`, maar alle tekst komt uit `lib/i18n/nl/*`, alle pagina's staan onder `app/[lang]/(site)/` en de middleware herschrijft `/…` naar `/nl/…`.

### Task 1: Branch, testmap en npm-scripts

**Files:**
- Modify: `package.json`
- Create: `tests/unit/.gitkeep`, `tests/e2e/.gitkeep`

- [ ] **Step 1: Maak de branch**

```bash
cd /Users/nathaniel/Documents/Hitzdigital-web/site
git checkout -b feature/engels
```

- [ ] **Step 2: Voeg testscripts toe aan `package.json`**

Vervang het `scripts`-blok door:

```json
  "scripts": {
    "dev": "next dev -p 3111",
    "build": "next build",
    "start": "next start -p 3111",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test:unit": "node --test tests/unit/",
    "test:e2e": "node --test tests/e2e/i18n.test.mjs",
    "test": "npm run test:unit && npm run test:e2e"
  },
```

- [ ] **Step 3: Maak de testmappen aan**

```bash
mkdir -p tests/unit tests/e2e && touch tests/unit/.gitkeep tests/e2e/.gitkeep
```

- [ ] **Step 4: Controleer dat de testrunner werkt met een leeg resultaat**

Run: `npm run test:unit`
Expected: `ℹ tests 0` … `ℹ fail 0` (exit code 0).

- [ ] **Step 5: Commit**

```bash
git add package.json tests
git commit -m "Test-scaffold en npm-scripts voor de Engelse versie"
```

---

### Task 2: Padkaart `lib/i18n/paths.ts`

**Files:**
- Create: `lib/i18n/paths.ts`
- Test: `tests/unit/paths.test.ts`

- [ ] **Step 1: Schrijf de falende unit-tests**

`tests/unit/paths.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  href, parsePublic, internalPath, publicPath, redirectForEn, counterpart, ctaFor, alternatesFor, ogLocale, isLang, langOf,
} from "../../lib/i18n/paths.ts";

test("href: NL zonder prefix, EN met /en en Engelse slug", () => {
  assert.equal(href("nl", "home"), "/");
  assert.equal(href("en", "home"), "/en");
  assert.equal(href("nl", "hulp"), "/hulp");
  assert.equal(href("en", "hulp"), "/en/help");
  assert.equal(href("en", "voorwaarden"), "/en/terms");
  assert.equal(href("en", "werk", "mourits-schilderwerken"), "/en/work/mourits-schilderwerken");
  assert.equal(href("nl", "contact"), "/contact");
});

test("href: support bestaat alleen in NL", () => {
  assert.equal(href("en", "support"), "/support");
  assert.equal(href("en", "support", "e-mail-instellen-iphone"), "/support/e-mail-instellen-iphone");
});

test("parsePublic: bekende paden", () => {
  assert.deepEqual(parsePublic("/"), { lang: "nl", key: "home" });
  assert.deepEqual(parsePublic("/en"), { lang: "en", key: "home" });
  assert.deepEqual(parsePublic("/en/"), { lang: "en", key: "home" });
  assert.deepEqual(parsePublic("/hulp"), { lang: "nl", key: "hulp" });
  assert.deepEqual(parsePublic("/en/help"), { lang: "en", key: "hulp" });
  assert.deepEqual(parsePublic("/werk/volmer-techniek"), { lang: "nl", key: "werk", slug: "volmer-techniek" });
  assert.deepEqual(parsePublic("/en/work/volmer-techniek?x=1#y"), { lang: "en", key: "werk", slug: "volmer-techniek" });
  assert.deepEqual(parsePublic("/support/e-mail-instellingen"), { lang: "nl", key: "support", slug: "e-mail-instellingen" });
});

test("parsePublic: onbekende paden geven null", () => {
  assert.equal(parsePublic("/en/hulp"), null); // interne slug is niet publiek in EN
  assert.equal(parsePublic("/foo"), null);
  assert.equal(parsePublic("/websites/extra"), null); // niet-dynamische route met slug
  assert.equal(parsePublic("/en/support"), null); // support heeft geen EN
});

test("internalPath: mapnaam blijft Nederlands", () => {
  assert.equal(internalPath({ lang: "nl", key: "home" }), "/nl");
  assert.equal(internalPath({ lang: "en", key: "home" }), "/en");
  assert.equal(internalPath({ lang: "en", key: "hulp" }), "/en/hulp");
  assert.equal(internalPath({ lang: "en", key: "werk", slug: "x" }), "/en/werk/x");
  assert.equal(internalPath({ lang: "nl", key: "voorwaarden" }), "/nl/voorwaarden");
});

test("publicPath: intern (herschreven) pad terug naar het publieke adres", () => {
  assert.equal(publicPath("/nl"), "/");
  assert.equal(publicPath("/en"), "/en");
  assert.equal(publicPath("/nl/hulp"), "/hulp");
  assert.equal(publicPath("/en/hulp"), "/en/help");
  assert.equal(publicPath("/nl/werk/monster-zorg"), "/werk/monster-zorg");
  assert.equal(publicPath("/nl/support/e-mail-instellingen"), "/support/e-mail-instellingen");
  assert.equal(publicPath("/nl/contact?voor=hosting"), "/contact?voor=hosting");
  assert.equal(publicPath("/en/does-not-exist"), "/en/does-not-exist"); // niet herschreven: onveranderd
  assert.equal(publicPath("/hulp"), "/hulp"); // al publiek: onveranderd
  assert.equal(publicPath("/nl/hulp/extra"), "/nl/hulp/extra"); // geen route: onveranderd
});

test("redirectForEn: interne slug en support onder /en", () => {
  assert.equal(redirectForEn("/en/hulp"), "/en/help");
  assert.equal(redirectForEn("/en/werk/volmer-techniek"), "/en/work/volmer-techniek");
  assert.equal(redirectForEn("/en/voorwaarden"), "/en/terms");
  assert.equal(redirectForEn("/en/support"), "/support");
  assert.equal(redirectForEn("/en/support/e-mail-instellingen"), "/support/e-mail-instellingen");
  assert.equal(redirectForEn("/en/websites"), null); // gelijke slug: geen redirect
  assert.equal(redirectForEn("/en/help"), null);
  assert.equal(redirectForEn("/en"), null);
  assert.equal(redirectForEn("/en/onbekend"), null);
});

test("counterpart: tegenhanger van de huidige pagina", () => {
  assert.equal(counterpart("/hulp", "en"), "/en/help");
  assert.equal(counterpart("/en/help", "nl"), "/hulp");
  assert.equal(counterpart("/", "en"), "/en");
  assert.equal(counterpart("/en", "nl"), "/");
  assert.equal(counterpart("/werk/monster-zorg", "en"), "/en/work/monster-zorg");
  assert.equal(counterpart("/support/e-mail-instellingen", "en"), "/en"); // geen tegenhanger → EN home
  assert.equal(counterpart("/bestaat-niet", "en"), "/en");
});

test("ctaFor: header-knop per route", () => {
  assert.equal(ctaFor("/"), "demo");
  assert.equal(ctaFor("/en"), "demo");
  assert.equal(ctaFor("/websites"), "demo");
  assert.equal(ctaFor("/werk"), "demo");
  assert.equal(ctaFor("/en/work/volmer-techniek"), "demo");
  assert.equal(ctaFor("/hosting"), "hosting");
  assert.equal(ctaFor("/en/help"), "hulp");
  assert.equal(ctaFor("/privacy"), "contact");
  assert.equal(ctaFor("/en/terms"), "contact");
  assert.equal(ctaFor("/support"), "contact");
  assert.equal(ctaFor("/onbekend"), "contact");
  assert.equal(ctaFor("/contact"), null);
  assert.equal(ctaFor("/en/contact"), null);
});

test("alternatesFor: alleen canonical zolang EN niet live is of geen tegenhanger heeft", () => {
  const a = alternatesFor("nl", "support");
  assert.equal(a.canonical, "/support");
  assert.equal(a.languages, undefined);
});

test("ogLocale en isLang", () => {
  assert.equal(ogLocale("nl"), "nl_NL");
  assert.equal(ogLocale("en"), "en_GB");
  assert.equal(isLang("en"), true);
  assert.equal(isLang("fr"), false);
  assert.equal(isLang(undefined), false);
  assert.equal(langOf("en"), "en");
  assert.equal(langOf("fr"), "nl");
});
```

- [ ] **Step 2: Run de tests, verwacht falen**

Run: `npm run test:unit`
Expected: FAIL met `Cannot find module '.../lib/i18n/paths.ts'`.

- [ ] **Step 3: Schrijf `lib/i18n/paths.ts`**

```ts
/**
 * Padkaart NL↔EN. Enige bron voor vertaalde slugs en de header-knop per route (spec §1, §4).
 * Geen runtime-imports: dit bestand draait ook los onder `node --test` en in de Edge-middleware.
 */
export type Lang = "nl" | "en";

/** Talen die live zijn. Fase 1: alleen nl. Task 18 zet en erbij. */
export const locales: readonly Lang[] = ["nl"];
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

/** Interne route (Nederlandse mapnaam) onder de taalprefix. */
export function internalPath(p: Parsed): string {
  if (p.key === "home") return `/${p.lang}`;
  return `/${p.lang}/${segments[p.key].nl}${p.slug ? `/${p.slug}` : ""}`;
}

/**
 * Omgekeerde van `internalPath`: het publieke adres van een intern (herschreven) pad, mét query en hash.
 * De middleware herschrijft elk verzoek, dus `usePathname()` in een client-component geeft `/nl/hulp`
 * of `/en/hulp` terug, niet `/hulp` of `/en/help`. Paden die niet herschreven zijn (404 onder /en) en
 * paden buiten de padkaart komen ongewijzigd terug.
 */
export function publicPath(pathname: string): string {
  const path = pathname.split(/[?#]/)[0];
  const suffix = pathname.slice(path.length);
  const [first, second, third, ...rest] = path.split("/").filter(Boolean);
  if (!isLang(first)) return pathname;
  if (second === undefined) return href(first, "home") + suffix;
  for (const key of segmentKeys) {
    const seg = segments[key];
    if (seg.nl !== second) continue;
    if (third !== undefined && (!seg.dynamic || rest.length > 0)) return pathname;
    return href(first, key, third) + suffix;
  }
  return pathname;
}

/**
 * Een /en-pad dat de interne (Nederlandse) slug gebruikt of naar support wijst,
 * krijgt het publieke adres terug; anders null. Alleen voor routes waar NL- en EN-slug verschillen.
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

/** Tegenhanger van de huidige pagina in de andere taal; zonder tegenhanger de homepage. */
export function counterpart(pathname: string, target: Lang): string {
  const p = parsePublic(pathname);
  if (!p || (p.key !== "home" && segments[p.key][target] === null)) return href(target, "home");
  return href(target, p.key, p.slug);
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
```

- [ ] **Step 4: Run de tests, verwacht slagen**

Run: `npm run test:unit`
Expected: `ℹ pass 10`, `ℹ fail 0`.

- [ ] **Step 5: Typecheck en commit**

```bash
npx tsc --noEmit
git add lib/i18n/paths.ts tests/unit/paths.test.ts
git commit -m "i18n: padkaart NL/EN met helpers en unit-tests"
```

---

### Task 3: Accept-Language-parser

**Files:**
- Create: `lib/i18n/accept-language.ts`
- Test: `tests/unit/accept-language.test.ts`

- [ ] **Step 1: Schrijf de falende tests**

`tests/unit/accept-language.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { prefersEnglish } from "../../lib/i18n/accept-language.ts";

test("geen header of lege header → geen Engels", () => {
  assert.equal(prefersEnglish(null), false);
  assert.equal(prefersEnglish(""), false);
});

test("Engelse browser → Engels", () => {
  assert.equal(prefersEnglish("en-GB,en;q=0.9"), true);
  assert.equal(prefersEnglish("en-US,en;q=0.9,nl;q=0.5"), true);
  assert.equal(prefersEnglish("EN"), true);
});

test("Nederlandse browser → Nederlands, ook met Engels als tweede", () => {
  assert.equal(prefersEnglish("nl-NL,nl;q=0.9,en;q=0.8"), false);
  assert.equal(prefersEnglish("nl"), false);
});

test("gelijkspel of andere talen → Nederlands", () => {
  assert.equal(prefersEnglish("en;q=0.8,nl;q=0.8"), false);
  assert.equal(prefersEnglish("de-DE,de;q=0.9"), false);
  assert.equal(prefersEnglish("*"), false);
});

test("rare q-waarden worden als 0 gelezen", () => {
  assert.equal(prefersEnglish("en;q=abc,nl;q=0.1"), false);
  assert.equal(prefersEnglish("en;q=0.2,nl;q=abc"), true);
});
```

- [ ] **Step 2: Run, verwacht falen**

Run: `npm run test:unit`
Expected: FAIL met `Cannot find module '.../accept-language.ts'`.

- [ ] **Step 3: Schrijf `lib/i18n/accept-language.ts`**

```ts
/**
 * Leest een Accept-Language-header en zegt of Engels strikt boven Nederlands staat (spec §2, regel 5).
 * Geen header, geen van beide talen, of gelijkspel → false (Nederlands).
 */
export function prefersEnglish(header: string | null): boolean {
  if (!header) return false;
  let en = 0;
  let nl = 0;
  for (const part of header.split(",")) {
    const [tagRaw, ...params] = part.trim().split(";");
    const tag = tagRaw.trim().toLowerCase();
    if (!tag) continue;
    let q = 1;
    for (const p of params) {
      const m = p.trim().match(/^q=(.+)$/);
      if (m) {
        const n = Number.parseFloat(m[1]);
        q = Number.isFinite(n) ? n : 0;
      }
    }
    if (tag === "en" || tag.startsWith("en-")) en = Math.max(en, q);
    if (tag === "nl" || tag.startsWith("nl-")) nl = Math.max(nl, q);
  }
  return en > nl;
}
```

- [ ] **Step 4: Run, verwacht slagen**

Run: `npm run test:unit`
Expected: `ℹ pass 15`, `ℹ fail 0`.

- [ ] **Step 5: Commit**

```bash
npx tsc --noEmit
git add lib/i18n/accept-language.ts tests/unit/accept-language.test.ts
git commit -m "i18n: Accept-Language-parser met unit-tests"
```

---

### Task 4: NL-woordenboek `ui` en `getDict`

**Files:**
- Create: `lib/aanvraag.ts`
- Create: `lib/i18n/nl/ui.tsx`
- Create: `lib/i18n/nl/index.ts`
- Create: `lib/i18n/index.ts`

Alle strings hieronder zijn **letterlijk** overgenomen uit `lib/content.ts`, `components/layout/Nav.tsx`, `components/layout/Footer.tsx`, `components/ui/ThemeSwitch.tsx`, `components/ui/Breadcrumbs.tsx`, `components/ui/WhatsAppFab.tsx`, `components/page/StickyCallBar.tsx`, `components/page/CtaBand.tsx`, `components/page/PlanCard.tsx`, `components/sections/WerkCard.tsx`, `components/sections/AanvraagForm.tsx`, `app/not-found.tsx`, `lib/og.tsx` en `lib/site.ts`. Niets herformuleren.

- [ ] **Step 1: Maak `lib/aanvraag.ts`**

```ts
/** De vier keuzes van het aanvraagformulier. Ids zijn taalneutraal (ook in `?voor=`); labels staan in lib/i18n. */
export const aanvraagIds = ["website", "hosting", "hulp", "anders"] as const;
export type AanvraagKeuze = (typeof aanvraagIds)[number];
export function isAanvraagKeuze(x: unknown): x is AanvraagKeuze {
  return (aanvraagIds as readonly unknown[]).includes(x);
}
```

- [ ] **Step 2: Maak `lib/i18n/nl/ui.tsx`**

```tsx
import { site } from "@/lib/site";
import { href, type CtaKind } from "../paths";
import type { AanvraagKeuze } from "@/lib/aanvraag";

const L = "nl" as const;
const contact = (voor?: AanvraagKeuze) => `${href(L, "contact")}${voor ? `?voor=${voor}` : ""}`;

/** mailto met onderwerp + korte invul-template, zodat elke mail met context binnenkomt. */
const mailBody = [
  "Hoi Nathaniel,",
  "",
  "- Waarvoor ik je nodig heb (website / hosting / hulp): ",
  "- Mijn huidige website (of: ik heb er nog geen): ",
  "- Wat voor bedrijf ik heb en waar: ",
  "",
  "Groet,",
].join("\n");

/** Knoppen naar het contactformulier. `nav.cta` leidt zijn labels hiervan af, zodat ze niet uiteenlopen. */
const cta = {
  contact: { label: "Neem contact op", href: contact() },
  demo: { label: "Gratis demo", href: contact("website") },
  demoLang: { label: "Vraag je gratis demo aan", href: contact("website") },
  hosting: { label: "Vraag hosting aan", href: contact("hosting") },
  hulp: { label: "Vraag hulp aan", href: contact("hulp") },
  whatsapp: "App via WhatsApp",
  call: "Bel",
};

/** Alle tekst van de site-schil (nav, footer, formulier, 404, schema). Nederlands is de bron; en/ui.tsx krijgt `typeof ui`. */
export const ui = {
  skipLink: "Naar inhoud",
  nav: {
    aria: "Hoofdnavigatie",
    homeAria: "HitzDigital home",
    links: [
      { label: "Websites", href: href(L, "websites") },
      { label: "Hosting", href: href(L, "hosting") },
      { label: "Hulp", href: href(L, "hulp") },
      { label: "Werk", href: href(L, "werk") },
      { label: "Over", href: `${href(L, "home")}#over` },
    ],
    menuOpen: "Menu openen",
    menuClose: "Menu sluiten",
    menu: "Menu",
    themeRow: "Weergave",
    langRow: "Taal",
    /** Header-knop per soort (spec §4). Fase 1 gebruikt alleen `demo`. */
    cta: { demo: cta.demo.label, hosting: cta.hosting.label, hulp: cta.hulp.label, contact: "Contact" } satisfies Record<CtaKind, string>,
  },
  theme: {
    toLight: "Schakel naar licht thema",
    toDark: "Schakel naar donker thema",
    light: "Licht thema",
    dark: "Donker thema",
  },
  lang: {
    nl: "Nederlands",
    en: "English",
    /** aria-label van de link naar de andere taal, in die taal. */
    switchTo: { nl: "Schakel naar Nederlands", en: "Switch to English" },
  },
  footer: {
    tagline: "Alles rond je website. Eén aanspreekpunt.",
    place: `${site.city}, Hoeksche Waard`,
    services: "Diensten",
    more: "Meer",
    moreLinks: [
      { label: "Werkwijze", href: `${href(L, "websites")}#werkwijze` },
      { label: "Werk", href: href(L, "werk") },
      { label: "Contact", href: href(L, "contact") },
      { label: "Support", href: href(L, "support") },
    ],
    contact: "Contact",
    whatsapp: "WhatsApp",
    legal: [
      { label: "Privacybeleid", href: href(L, "privacy") },
      { label: "Voorwaarden", href: href(L, "voorwaarden") },
    ],
    vat: "Prijzen incl. btw",
  },
  crumbs: { aria: "Kruimelpad", home: "Home" },
  cta,
  ctaBand: { orCall: "Of bel", reply: "Reactie binnen 1 werkdag, vrijblijvend." },
  fab: { label: "Heb je een vraag?", aria: "Heb je een vraag? Stuur een WhatsApp" },
  stickyBar: { aria: "Direct contact", call: "Bel", whatsapp: "WhatsApp" },
  mailto: `mailto:${site.email}?subject=${encodeURIComponent("Aanvraag via hitzdigital.nl")}&body=${encodeURIComponent(mailBody)}`,
  form: {
    legend: "Waarvoor kan ik je helpen?",
    choices: {
      website: { label: "Nieuwe website", submit: "Vraag je gratis demo aan" },
      hosting: { label: "Hosting & domein", submit: "Vraag hosting aan" },
      hulp: { label: "Ik zit vast", submit: "Vraag hulp aan" },
      anders: { label: "Iets anders", submit: "Verstuur" },
    } satisfies Record<AanvraagKeuze, { label: string; submit: string }>,
    name: "Naam",
    email: "E-mailadres",
    required: "(verplicht)",
    phone: "Telefoon (mag)",
    website: "Je website, als je die hebt",
    websitePlaceholder: "https://… of: nog geen site",
    company: "Wat voor bedrijf heb je en waar zit je?",
    companyPlaceholder: "bv. schildersbedrijf in Oud-Beijerland",
    message: "Wat speelt er?",
    messagePlaceholder: "Kort is prima.",
    sending: "Versturen…",
    privacy: "Zie privacybeleid",
    privacyHref: href(L, "privacy"),
    ok: "Gelukt! Je aanvraag is verstuurd. Ik reageer binnen 1 werkdag.",
    failed: "Versturen lukte niet. Mail me gerust direct via",
    errors: {
      name: "Vul je naam in, dan weet ik wie ik terugbel of mail.",
      email: "Vul een e-mailadres in waarop ik je kan bereiken.",
    },
    /** Alleen strings: dit blok gaat als prop naar een client-component. `{pakket}` en `{voor}` worden in de component vervangen. */
    packageInterest: "Ik heb interesse in het pakket {pakket}.",
    /** Nette pakketnamen voor `{pakket}`; onbekende ids vallen terug op de id met hoofdletter. */
    packageNames: { online: "Online", onderhoud: "Onderhoud", webshop: "Webshop", "computer-apk": "Computer APK", "website-apk": "Website APK" },
    mailtoSubject: "Aanvraag {voor} via hitzdigital.nl",
    mailtoFields: { voor: "Waarvoor", naam: "Naam", email: "E-mail", telefoon: "Telefoon", website: "Website", bedrijf: "Bedrijf en plaats" },
  },
  notFound: {
    title: "Deze pagina bestaat niet (meer).",
    body: "Mogelijk klopt de link niet meer, of is de pagina verplaatst. Ga terug naar de homepage om verder te kijken.",
    back: "Terug naar hitzdigital.nl",
    href: href(L, "home"),
  },
  og: { footer: "Puttershoek, Hoeksche Waard" },
  schema: {
    description: "Websites, hosting en computerhulp voor ondernemers in de Hoeksche Waard. Eén aanspreekpunt, gevestigd in Puttershoek.",
    offers: [
      {
        name: "Website laten maken",
        description: "Nieuwe website of vernieuwing van een bestaande site voor ondernemers zoals cafés, schilders, installateurs en hoveniers. Eerst een gratis demo, dan pas beslissen.",
      },
      {
        name: "Hosting, domein en onderhoud",
        description: "Domein, hosting, zakelijke e-mail en kleine wijzigingen in één maandbedrag. Maandelijks opzegbaar.",
      },
      {
        name: "Computer- en websitehulp",
        description: "Hulp bij computer, e-mail, domein, netwerk of website. Op afstand of aan huis in de Hoeksche Waard. Niet opgelost, dan niet betalen.",
      },
    ],
  },
  workCard: { viewCase: "Bekijk de case", tags: { demo: "Demo", eigen: "Eigen project" } },
  plan: { mostChosen: "Meest gekozen", perMonthShort: "/mnd", choose: (name: string) => `Kies ${name}` },
  faq: { eyebrow: "Veelgestelde vragen", title: "Wat mensen me vaak vragen." },
  voorNa: { before: "Voor", after: "Na", aria: "Vergelijk voor en na" },
};

export type UiDict = typeof ui;
```

- [ ] **Step 3: Maak `lib/i18n/nl/index.ts` en `lib/i18n/index.ts`**

`lib/i18n/nl/index.ts` (groeit in Task 6 en 14):

```ts
export { ui } from "./ui";
```

`lib/i18n/index.ts`:

```ts
import { defaultLang, type Lang } from "./paths";
import * as nl from "./nl";

/** Vorm van een compleet woordenboek: afgeleid van het Nederlands (de bron). */
export type Dict = typeof nl;

/** Beschikbare woordenboeken. Task 18 voegt `en` toe. */
const dicts: Partial<Record<Lang, Dict>> = { nl };

export function getDict(lang: Lang): Dict {
  return dicts[lang] ?? (dicts[defaultLang] as Dict);
}
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: geen fouten.

- [ ] **Step 5: Commit**

```bash
git add lib/aanvraag.ts lib/i18n
git commit -m "i18n: NL-woordenboek voor de site-schil en getDict()"
```

---

### Task 5: Verhuizing naar `app/[lang]`, middleware (regels 1, 2, 7), 404

**Files:**
- Move: `app/(site)` → `app/[lang]/(site)`; `app/layout.tsx` → `app/[lang]/layout.tsx`; `app/not-found.tsx` → `app/[lang]/not-found.tsx`; `app/opengraph-image.tsx` → `app/[lang]/(site)/opengraph-image.tsx`
- Create: `middleware.ts`, `app/[lang]/[...rest]/page.tsx`, `components/ui/NotFoundView.tsx`
- Modify: `app/[lang]/layout.tsx`, `app/[lang]/not-found.tsx`
- Test: `tests/e2e/i18n.test.mjs`

- [ ] **Step 1: Verplaats de bestanden met git**

```bash
mkdir -p "app/[lang]"
git mv "app/(site)" "app/[lang]/(site)"
git mv app/layout.tsx "app/[lang]/layout.tsx"
git mv app/not-found.tsx "app/[lang]/not-found.tsx"
git mv app/opengraph-image.tsx "app/[lang]/(site)/opengraph-image.tsx"
```

- [ ] **Step 2: Herschrijf `app/[lang]/layout.tsx`**

Volledige inhoud (fontpaden en CSS-import zijn één map dieper; `lang` komt uit de params; de homepage-metadata blijft hier staan tot Task 8 ze naar de homepage verplaatst):

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site, professionalServiceSchema, websiteSchema, faqPageSchema } from "@/lib/site";
import { locales, langOf, type LangParams } from "@/lib/i18n/paths";
import "../globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-src",
  display: "swap",
});

/** General Sans (koppen), self-hosted: geen externe request, geen render-blocking CSS. */
const display = localFont({
  src: [
    { path: "../fonts/GeneralSans-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display-src",
  display: "swap",
  preload: true,
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Alleen de talen uit generateStaticParams renderen; elke andere `lang` is een 404 (vangnet uit spec §1).
    Zonder dit zou een pad dat de middleware overslaat (bijv. /wp-login.php) als `lang` binnenkomen en de homepage opleveren. */
export const dynamicParams = false;

const title = "Websites, hosting en computerhulp in de Hoeksche Waard | HitzDigital";
const description =
  "Ik bouw websites voor ondernemers in de Hoeksche Waard, houd ze online en help als je computer of site vastloopt. Eén persoon, korte lijnen. Website vanaf €250, hosting vanaf €5 per maand, alles incl. btw.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: site.name,
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function LangLayout({ children, params }: Readonly<{ children: React.ReactNode }> & LangParams) {
  const lang = langOf((await params).lang);
  const faqSchema = faqPageSchema();
  return (
    <html lang={lang} className={`${body.variable} ${display.variable}`} suppressHydrationWarning>
      <body>
        {/* next-themes zet data-theme + color-scheme op <html> via een inline script vóór hydration:
            systeemvoorkeur als default, handmatige keuze in localStorage ("theme"). Geen flash. */}
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

Let op: een layout- of page-bestand mag geen andere exports hebben dan de door Next toegestane (`default`, `metadata`, `generateMetadata`, `generateStaticParams`, …); Next controleert dat bij `next build`. Helpers zoals `langOf` staan daarom in `lib/i18n/paths.ts`.

- [ ] **Step 3: Maak `app/[lang]/[...rest]/page.tsx`**

```tsx
import { notFound } from "next/navigation";

/** Vangt elk onbekend pad onder /nl en /en, zodat de 404 in de taal van het pad rendert. */
export default function CatchAll() {
  notFound();
}
```

- [ ] **Step 4: Herschrijf `app/[lang]/not-found.tsx`**

`not-found.tsx` krijgt geen params. Géén `headers()` hier: elke dynamische server-API in de 404-boundary haalt **de hele site** uit de statische prerender (alle metadata verhuist dan uit `<head>`). De taal komt daarom uit het pad, in een client-component.

`components/ui/NotFoundView.tsx`:

```tsx
"use client";

import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import type { Lang } from "@/lib/i18n/paths";

export type NotFoundTexts = { title: string; body: string; back: string; href: string };

/** 404 buiten de (site)-schil: geen nav/footer, wel dezelfde tokens. Taal uit het pad (/en/… → Engels), zodat de pagina statisch blijft. */
export function NotFoundView({ texts }: { texts: Record<Lang, NotFoundTexts> }) {
  const pathname = usePathname() ?? "/";
  const lang: Lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "nl";
  const t = texts[lang];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-[18px] bg-deep px-6 text-center text-ink">
      <Wordmark size={22} />
      <h1 className="m-0 font-display text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.03em] [text-wrap:balance]">{t.title}</h1>
      <p className="m-0 max-w-[420px] text-[15px] leading-[1.6] text-muted">{t.body}</p>
      <Button href={t.href} className="mt-2">
        {t.back}
      </Button>
    </main>
  );
}
```

`app/[lang]/not-found.tsx`:

```tsx
import { NotFoundView } from "@/components/ui/NotFoundView";
import { getDict } from "@/lib/i18n";

/** Tweetalige 404. De teksten van beide talen gaan mee; de client kiest op basis van het pad (zie NotFoundView). */
export default function NotFound() {
  return <NotFoundView texts={{ nl: getDict("nl").ui.notFound, en: getDict("en").ui.notFound }} />;
}
```

(`getDict("en")` valt terug op NL zolang het Engelse woordenboek nog niet bestaat — dat is de bedoeling.)

- [ ] **Step 5: Maak `middleware.ts` (regels 1, 2 en 7 uit spec §2)**

```ts
import { NextResponse, type NextRequest } from "next/server";

/**
 * Taalrouting (spec §2). Fase 1: alleen Nederlands.
 * - Regel 1 (matcher): overgeslagen worden _next, _vercel, images, de routes /icon en /apple-icon,
 *   en elk pad met een punt erin (bestanden, dus ook sitemap.xml en robots.txt).
 * - Regel 2: /nl(/…) → 301 naar hetzelfde pad zonder prefix.
 * - Regel 7: alles overig → interne route /nl/… (rewrite).
 * Task 18 voegt regels 3, 4 en 6 toe (Engelse slugs), Task 30 regel 5 (detectie op "/").
 */
export const config = {
  matcher: ["/((?!_next/|_vercel/|images/|icon$|apple-icon$|.*\\..*).*)"],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Metadata-afbeeldingen: Next vraagt ze zelf op onder /nl/… of /en/…; een oud ongeprefixt adres krijgt /nl ervoor.
  if (/\/opengraph-image(-|$)/.test(pathname)) {
    if (pathname.startsWith("/nl/") || pathname.startsWith("/en/")) return NextResponse.next();
    return rewrite(req, `/nl${pathname}`);
  }

  // Regel 2
  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice("/nl".length) || "/";
    return NextResponse.redirect(url, 301);
  }

  // Regel 7
  return rewrite(req, pathname === "/" ? "/nl" : `/nl${pathname}`);
}

function rewrite(req: NextRequest, internal: string) {
  const url = req.nextUrl.clone();
  url.pathname = internal;
  return NextResponse.rewrite(url);
}
```

- [ ] **Step 6: Bouw en controleer de routes**

Run: `npm run build`
Expected: geen fouten; in de route-lijst staan `/[lang]`, `/[lang]/websites`, `/[lang]/werk/[slug]`, `/[lang]/[...rest]` en `ƒ Middleware`. De statische routes tonen `● (SSG)` met param `/nl`.

- [ ] **Step 7: Schrijf de eerste e2e-tests**

`tests/e2e/i18n.test.mjs`:

```js
// HTTP-tests tegen een draaiende productie-server: `npm run build && npm start` (poort 3111), dan `npm run test:e2e`.
import { test } from "node:test";
import assert from "node:assert/strict";

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const get = (path, init = {}) => fetch(BASE + path, { redirect: "manual", ...init });
const locationUrl = (res) => {
  const loc = res.headers.get("location");
  assert.ok(loc, "location header");
  return new URL(loc, BASE);
};
const location = (res) => locationUrl(res).pathname;

const NL_PAGES = [
  "/", "/websites", "/hosting", "/hulp", "/werk", "/werk/volmer-techniek", "/contact",
  "/privacy", "/voorwaarden", "/support", "/support/e-mail-instellingen",
];

test("NL-pagina's zonder prefix: 200 en <html lang=nl>", async () => {
  for (const p of NL_PAGES) {
    const res = await get(p);
    assert.equal(res.status, 200, p);
    assert.match(await res.text(), /<html[^>]*\blang="nl"/, p);
  }
});

test("/nl/… → 301 zonder prefix, query blijft", async () => {
  const res = await get("/nl/hosting?x=1");
  assert.equal(res.status, 301);
  assert.equal(location(res), "/hosting");
  assert.equal(locationUrl(res).search, "?x=1");
  const home = await get("/nl");
  assert.equal(home.status, 301);
  assert.equal(location(home), "/");
});

test("onbekend pad: 404 in het Nederlands", async () => {
  const res = await get("/bestaat-niet");
  assert.equal(res.status, 404);
  assert.match(await res.text(), /Deze pagina bestaat niet/);
});

test("metadata-routes en OG-afbeeldingen blijven bereikbaar", async () => {
  for (const p of ["/sitemap.xml", "/robots.txt", "/icon", "/apple-icon", "/images/cafecentrum.webp"]) {
    const res = await get(p);
    assert.equal(res.status, 200, p);
  }
  // Next hangt zelf een hash aan het pad van een metadata-afbeelding (/nl/opengraph-image-<hash>),
  // dus lezen we het adres uit de pagina in plaats van het hard te coderen. Hetzelfde plaatje moet
  // ook zonder /nl-prefix bereikbaar zijn: dat is de rewrite in de middleware (oude, gedeelde links).
  for (const page of ["/", "/websites"]) {
    const html = await (await get(page)).text();
    const found = html.match(/property="og:image" content="([^"]+)"/);
    assert.ok(found, `og:image ontbreekt op ${page}`);
    const { pathname, search } = new URL(found[1]);
    assert.match(pathname, /^\/nl\//, found[1]);
    for (const p of [pathname + search, pathname.slice(3) + search]) {
      const og = await get(p);
      assert.equal(og.status, 200, p);
      assert.match(og.headers.get("content-type") ?? "", /image\/png/, p);
    }
  }
});

test("paden buiten de padkaart geven 404, ook als de middleware ze overslaat", async () => {
  for (const p of ["/wp-login.php", "/foo.php", "/iconografie", "/icon-192.png", "/en/x", "/werk/onbekend"]) {
    assert.equal((await get(p)).status, 404, p);
  }
  for (const p of ["/icon", "/apple-icon"]) assert.equal((await get(p)).status, 200, p);
});
```

- [ ] **Step 8: Start de server en run de e2e-tests**

```bash
npm start &            # wacht op "Ready"
npm run test:e2e
kill %1
```
Expected: `ℹ pass 5`, `ℹ fail 0`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Routes onder app/[lang], middleware met NL-rewrite, tweetalige 404-basis"
```

---

### Task 6: NL-woordenboeken `services`, `work` en `pages`

**Files:**
- Create: `lib/i18n/nl/services.ts`, `lib/i18n/nl/work.ts`, `lib/i18n/nl/pages.tsx`
- Modify: `lib/i18n/nl/index.ts`

In deze task worden alleen woordenboeken aangemaakt; geen enkele pagina of component wijzigt nog. Alle strings zijn letterlijk overgenomen uit `lib/services.ts`, `lib/pricing.ts`, `lib/work.ts` en de pagina's onder `app/[lang]/(site)/`. Het ongebruikte veld `promise` uit `pijlers` komt niet mee (openstaand punt uit doc 13).

- [ ] **Step 1: Maak `lib/i18n/nl/services.ts`**

```ts
import { pricing, euro } from "@/lib/pricing";
import { href } from "../paths";

const L = "nl" as const;
const online = pricing.hosting.find((h) => h.id === "online")!;
const onderhoud = pricing.hosting.find((h) => h.id === "onderhoud")!;
const nlDomain = pricing.domains.table.find((d) => d.tld === ".nl")!;
const guaranteeLine = "Niet opgelost? Dan betaal je niets.";

/** Dienst-teksten: pijlers, lijsten, FAQ's, pakket- en tarieflabels. Getallen komen uit lib/pricing.ts. */
export const services = {
  pijlers: [
    {
      id: "websites" as const,
      n: "01",
      title: "Websites",
      body: "Een moderne site die past bij je bedrijf. Je ziet eerst een echte demo van je eigen homepage, daarna beslis je pas.",
      price: `Vanaf ${euro(pricing.website.from)}`,
      href: href(L, "websites"),
    },
    {
      id: "hosting" as const,
      n: "02",
      title: "Hosting & domeinen",
      body: "Domein, hosting, e-mail en een kleine wijziging per maand in één bedrag. Maandelijks opzegbaar.",
      price: `Vanaf ${euro(online.monthly)} per maand`,
      href: href(L, "hosting"),
    },
    {
      id: "hulp" as const,
      n: "03",
      title: "Hulp",
      body: "Computer, e-mail, domein of website: ik los het op en leg het uit. Meestal op afstand, en anders kom ik langs.",
      price: `${euro(pricing.hulp.quarter)} per kwartier · ${guaranteeLine}`,
      href: href(L, "hulp"),
    },
  ],

  werkwijze: [
    { n: "01", title: "Stuur je site of vertel je idee", body: "Een appje, link of korte uitleg is genoeg." },
    {
      n: "02",
      title: "Ik maak een concrete demo",
      body: "Je krijgt een echte demo-site te zien, met vooral je nieuwe homepage. Geen praatje of PowerPoint, maar iets wat je zelf kunt bekijken.",
    },
    {
      n: "03",
      title: "Dan pas beslis je",
      body: "Bevalt het? Dan werk ik het samen met jou uit tot een complete website. Zo niet? Dan zit je nergens aan vast. De demo blijft gratis.",
    },
  ],

  zoWerkIk: [
    { title: "Van jou, en dat blijft zo", body: "Je website en domein staan op jouw naam. Geen gijzeling, geen vastzitten aan mij." },
    {
      title: "Duidelijke prijs vooraf",
      body: `Website vanaf ${euro(pricing.website.from)}, hosting vanaf ${euro(online.monthly)} per maand, onderhoud ${euro(onderhoud.monthly)} per maand, hulp ${euro(pricing.hulp.quarter)} per kwartier. Alles incl. btw, geen kleine lettertjes.`,
    },
    { title: "Maandelijks opzegbaar", body: "Ook de hosting. Je domein loopt gewoon door tot het einde van het jaar waarvoor het geregistreerd is." },
    { title: "Eén appje is genoeg", body: "Geen accountmanager, geen ticketsysteem. Je appt of belt mij, en ik reageer zelf." },
  ],

  over: {
    title: "Eén persoon. Korte lijnen. Geen gedoe.",
    body: "Ik ben Nathaniel, uit Puttershoek. Ik bouw HitzDigital in mijn eentje voor ondernemers in de Hoeksche Waard. Ik maak je website, zorg dat hij online blijft en kijk direct mee als je computer of mail niet meewerkt. Geen landelijk bureau met sjablonen, maar iemand uit de regio die je gewoon kunt appen.",
    facts: ["Eén aanspreekpunt", "Duidelijke afspraken", "Uit de Hoeksche Waard"],
    portraitAlt: "Nathaniel, oprichter van HitzDigital",
  },

  websiteOpties: [
    {
      title: "Nog geen goede site",
      body: "Ik bouw een moderne website die strak, snel en duidelijk is. Een site die vertrouwen wekt en past bij je bedrijf, met teksten en foto's die kloppen.",
    },
    {
      title: "Je site is verouderd",
      body: "Ik geef je huidige site een nieuwe uitstraling en een betere structuur. Wat goed is blijft, wat in de weg zit gaat eruit. Je hoeft niet opnieuw te beginnen.",
    },
  ],
  websiteInbegrepen: [
    "Ontworpen voor je telefoon, want daar kijken je klanten",
    "Snel, ook op een trage verbinding",
    "Vindbaar in Google op je dienst en je plaats",
    "Zelf teksten, foto's en prijzen aanpassen",
    "Teksten en foto's geregeld, of je levert ze zelf aan",
    "Domein op jouw naam",
    "Hosting bij mij of ergens anders, jouw keuze",
  ],
  websiteFaq: [
    { q: "Hoe lang duurt het?", a: "De demo van je homepage heb je meestal binnen een week. De complete website staat daarna in twee tot vier weken live, afhankelijk van hoe snel teksten en foto's rond zijn." },
    { q: "Wat is de demo precies?", a: "Een echte, werkende voorproef van je nieuwe homepage die je zelf in je browser kunt bekijken. Geen schets of PowerPoint. Zo zie je hoe je site eruit gaat zien voordat je iets beslist." },
    { q: "Wat als de demo niet bevalt?", a: "Dan stopt het daar, zonder kosten en zonder verplichtingen. De demo is en blijft gratis." },
    { q: "Moet ik zelf teksten schrijven?", a: "Nee. Je mag ze zelf aanleveren, maar ik schrijf ze ook voor je op basis van een kort gesprek. Foto's lever je aan, of ik zorg voor passende beelden." },
    { q: "Kan ik de site zelf aanpassen?", a: "Ja. Teksten, foto's, prijzen en openingstijden pas je zelf aan zonder technische kennis. Wil je dat liever niet zelf doen, dan zit een kleine wijziging per maand in het onderhoudspakket." },
    { q: "Werk je ook buiten de Hoeksche Waard?", a: "Ja. Ik kom uit Puttershoek en de meeste klanten zitten in de regio, maar een website bouwen kan overal. Voor hulp aan huis blijf ik in de Hoeksche Waard." },
  ],
  websiteNote: "De exacte prijs hoor je na de gratis demo. Tot dan zit je nergens aan vast.",

  hostingAltijd: [
    "Nederlandse servers",
    "Dagelijkse back-ups",
    "SSL-certificaat (het slotje)",
    "Updates en beveiliging",
    "Monitoring: ik zie het als je site eruit ligt",
    "Domein op jouw naam",
    "Maandelijks opzegbaar",
  ],
  overstappen: [
    { n: "01", title: "Je geeft me toegang", body: "Tot je huidige hosting of domein. Weet je niet waar dat staat? Dan zoeken we het samen uit." },
    { n: "02", title: "Ik verhuis site, domein en mail", body: "Op een moment dat het jou past. Je hoeft zelf niets in te stellen." },
    { n: "03", title: "Niets ligt eruit", body: "Pas als alles bij mij draait en werkt, gaat het domein om. Je mail blijft gewoon binnenkomen." },
  ],
  hostingFaq: [
    { q: "Wat is een kleine wijziging?", a: "Een tekst, foto, prijs of openingstijd aanpassen. Iets wat in een kwartier klaar is. Een nieuwe pagina of ontwerpwerk valt erbuiten; dat doe ik graag, maar dan op kwartiertarief. Ongebruikte tijd vervalt aan het einde van de maand." },
    { q: "Wat als ik wil stoppen?", a: "Je zegt op per maand, zonder opzegtermijn van maanden. Je domein loopt door tot het einde van het jaar waarvoor het geregistreerd is; daarna kun je het verlengen of meenemen naar een andere partij. Je site en je domein zijn en blijven van jou." },
    { q: "Blijft mijn domein van mij?", a: "Ja. Ik registreer het op jouw naam en jouw gegevens. Ik beheer het voor je, maar jij bent de eigenaar. Wil je ooit weg, dan verhuis je het domein gewoon mee." },
    { q: "Hoe snel reageer je bij een storing?", a: "Ik krijg zelf een melding als je site eruit ligt en ga er meestal direct mee aan de slag. Zie je zelf iets vreemds, app of bel me dan; je hoeft geen ticket aan te maken." },
    { q: "Kan ik mijn oude WordPress-site bij jou hosten?", a: "Ja. Ook als ik de site niet gebouwd heb, kan ik hosting, domein en mail overnemen. Ik kijk dan eerst even mee of de site technisch gezond is." },
    { q: "Betaal ik per maand of per jaar?", a: "Wat jij prettig vindt. Per jaar heeft mijn voorkeur: één factuur, klaar. Zeg je tussentijds op, dan krijg je de resterende hele maanden terug. Je betaalt via automatische incasso of iDEAL en krijgt altijd een nette factuur met btw. Alle prijzen zijn incl. 21% btw." },
  ],
  /** Labels per pakket-id uit lib/pricing.ts. */
  plans: {
    online: {
      name: "Online",
      summary: "Alleen hosting van je website.",
      includes: ["SSL-certificaat", "Dagelijkse back-ups", "Updates", "Monitoring"],
      excludes: [`Domeinnaam (los ${euro(nlDomain.yearly)} per jaar)`, "Wijzigingen (op kwartiertarief)"],
      fairUse: undefined as string | undefined,
    },
    onderhoud: {
      name: "Onderhoud",
      summary: "Hosting, je .nl-domein en één kleine wijziging per maand.",
      includes: ["Alles van Online", ".nl-domein op jouw naam", "1 kleine wijziging per maand (tot 15 minuten)", "Jaarlijkse check op snelheid en teksten"],
      excludes: [] as string[],
      fairUse: "Een kleine wijziging is bijvoorbeeld een tekst, foto, prijs of openingstijd. Geen nieuwe pagina's of ontwerpwerk. Ongebruikte tijd vervalt." as string | undefined,
    },
    webshop: {
      name: "Webshop",
      summary: "Je complete webshop online, beheerd en up-to-date.",
      includes: ["Domein op jouw naam", "Shopify-abonnement inbegrepen", "Betalen met iDEAL en verzendkoppelingen", "Thema- en app-updates", "1 kleine wijziging per maand (tot 15 minuten)"],
      excludes: [] as string[],
      fairUse: "Een kleine wijziging is bijvoorbeeld een product, prijs, foto of tekst. Geen nieuwe pagina's of ontwerpwerk. Ongebruikte tijd vervalt." as string | undefined,
    },
  } satisfies Record<(typeof pricing.hosting)[number]["id"], { name: string; summary: string; includes: string[]; excludes: string[]; fairUse: string | undefined }>,
  mailbox: {
    name: "Zakelijke mailbox",
    summary: "Op je eigen domein.",
    tiers: { one: "1 mailbox", multi: "2 tot 5 mailboxen" },
    more: "Meer dan 5 mailboxen op aanvraag.",
  },
  domains: {
    included: "Bij Onderhoud zit je .nl-domein erbij.",
    other: "Andere extensies op aanvraag.",
  },

  hulpHelp: [
    { title: "E-mail, domein en hosting", body: "Zakelijke mail instellen, overstappen, DNS, een verlopen domein." },
    { title: "Je website, ook als ik hem niet gebouwd heb", body: "WordPress-fixes, updates, een formulier dat niet werkt, een trage site." },
    { title: "Google Bedrijfsprofiel, Maps en reviews", body: "Goed vindbaar, met juiste openingstijden, foto's en een link naar je site." },
    { title: "Werkplek", body: "Laptop of pc inrichten, opschonen, sneller maken, back-up en beveiliging." },
    { title: "Printers, wifi, telefoon en tablet", body: "Alles wat moet samenwerken met je mail en je site." },
    { title: "Netwerk op kantoor met TP-Link Omada", body: "Wifi-punten, gastnetwerk en beheer, netjes ingericht en uitgelegd." },
    { title: "Lichte hardware-check en schoonmaak", body: "Stof eruit, ventilatie na, schijf en geheugen gecontroleerd." },
    { title: "Bestanden terughalen", body: "Per ongeluk gewist of een schijf die hapert? Softwarematig herstel ik wat te redden is. Fysiek defecte schijven verwijs ik door." },
  ],
  hulpNiet: [
    "Een pc vanaf nul bouwen of repareren op onderdelenniveau (scherm, moederbord, voeding)",
    "Datarecovery van kapotte schijven",
    "Kassasystemen en boekhoudsoftware inrichten",
  ],
  hulpStappen: [
    { n: "01", title: "Je belt of appt", body: "Vertel kort wat er misgaat. Een foto van het scherm helpt al." },
    { n: "02", title: "Ik kijk direct mee", body: "Via schermdeling, meestal binnen een kwartier begonnen. Moet ik langskomen? Dan kom ik langs." },
    { n: "03", title: "Je betaalt alleen de tijd die het kost", body: "Per kwartier, incl. btw. En niks als het niet lukt." },
  ],
  hulpFaq: [
    { q: "Kom je aan huis?", a: "Ja, in de Hoeksche Waard zonder voorrijkosten. De meeste problemen los ik sneller op afstand op, dus dat probeer ik eerst. Aan huis reken ik per half uur, met een minimum van een uur." },
    { q: "Hoe snel kun je?", a: "Op afstand vaak dezelfde dag, soms direct. Aan huis meestal binnen een paar werkdagen." },
    { q: "Hoe werkt op afstand meekijken?", a: "Je opent een link die ik je stuur, en ik zie je scherm terwijl we bellen. Jij houdt de controle en kunt altijd afsluiten. Er blijft niets achter op je computer." },
    { q: "Wat als het niet lukt?", a: "Dan betaal je niets voor die hulp. We spreken vooraf af wat het probleem is; los ik dat niet op, dan kost het je niks. Voor de APK's, uitleg en advies geldt dat niet, en ook niet als de oorzaak buiten mijn bereik ligt en ik je dat gemeld heb." },
    { q: "Help je ook met mijn telefoon of tablet?", a: "Ja. Mail instellen, foto's overzetten, een nieuwe telefoon inrichten, opruimen en beveiligen: het hoort er allemaal bij." },
    { q: "Help je ook particulieren?", a: `Ja, in de Hoeksche Waard, tegen hetzelfde tarief: ${euro(pricing.hulp.quarter)} per kwartier incl. btw. Ondernemers gaan voor als het druk is, maar je bent welkom.` },
  ],
  hulpTarief: {
    billing: "Op afstand per kwartier; aan huis per half uur, minimaal een uur.",
    travel: "Geen voorrijkosten in de Hoeksche Waard.",
    cardValidity: "12 maanden geldig",
    guarantee: {
      line: guaranteeLine,
      conditions: [
        "Geldt per probleem dat we vooraf samen benoemen.",
        "Niet voor de APK's, uitleg en advies; die lever ik altijd.",
        "Niet als de oorzaak buiten mijn bereik ligt (kapotte hardware, storing bij je provider) en ik je dat gemeld heb.",
      ],
    },
  },

  contactFaq: [
    { q: "Wat gebeurt er na mijn bericht?", a: "Je krijgt binnen 1 werkdag antwoord van mij, per mail of app. Bij een website-aanvraag stel ik een paar korte vragen en ga ik aan de slag met je gratis demo." },
    { q: "Kom je langs?", a: "Voor hulp kom ik langs in de Hoeksche Waard als op afstand niet lukt. Voor een website-gesprek kom ik graag even bij je kijken, maar het kan ook telefonisch." },
    { q: "Is een demo echt gratis?", a: "Ja. Je krijgt een echte, werkende voorproef van je homepage. Bevalt hij niet, dan stopt het daar, zonder kosten." },
  ],
};

export type ServicesDict = typeof services;
```

- [ ] **Step 2: Maak `lib/i18n/nl/work.ts`**

Taalneutrale velden (slug, titel, plaats, url, afbeeldingen) blijven in `lib/work.ts`; hier staat alleen tekst, per slug.

```ts
/** Werk-teksten per slug. Sleutels moeten overeenkomen met `work` en `cases` in lib/work.ts (TypeScript bewaakt dat via WorkSlug/CaseSlug in Task 12). */
export const work = {
  items: {
    "volmer-techniek": { meta: "Metaalbewerking · Puttershoek", alt: "Website van Volmer Techniek op mobiel" },
    "mourits-schilderwerken": { meta: "Schildersbedrijf · Klaaswaal", alt: "Website van Mourits Schilderwerken op mobiel" },
    "monster-zorg": { meta: "Zzp-zorgverlener · Gouda", alt: "Website van Monster Zorg op mobiel" },
    "youniek-art": { meta: "Fotografie portfolio", alt: "Website van Youniek Art op mobiel" },
    lesbosreizen: { meta: "Reisinformatie over Lesbos", alt: "Website van LesbosReizen op mobiel" },
    "cafe-centrum": { meta: "Lokaal café · Hoeksche Waard", alt: "Demo-website voor Café 't Centrum op mobiel" },
    opgietingen: { meta: "Agenda voor opgiet-evenementen", alt: "Opgietingen.nl op mobiel" },
    festivaldiscounter: { meta: "Festivaltickets vergelijken", alt: "Festivaldiscounter op mobiel" },
  },
  cases: {
    "volmer-techniek": {
      branche: "Metaalbewerking",
      intro: "Een tweetalige website voor een verspanend bedrijf dat op locatie en in de eigen werkplaats werkt, met offerteformulier, projectgalerij en servicegebied.",
      situatie: "Volmer Techniek B.V. uit Puttershoek verspaant, repareert en bouwt machines, op locatie bij de klant en in de eigen werkplaats. De oude website was een standaard WordPress-site met een kant-en-klaar thema. Voor een bedrijf dat ook buiten Nederland werkt, moest de site in twee talen kunnen en de zes disciplines helder naast elkaar zetten.",
      aanpak: [
        "Zes diensten, elk met een eigen blok: on-site machining, verspaning in de werkplaats, industriële reparaties, machinebouw en maatwerk, retrofit, preventief onderhoud.",
        "Nederlands en Engels met een taalschakelaar, zodat internationale klanten dezelfde site krijgen.",
        "Werkwijze in vijf stappen en een offerteformulier met type aanvraag, naast een knop om direct te bellen.",
        "Projectgalerij met echte foto's van het werk en een kaart met het servicegebied.",
        "Certificeringen (VCA, Koninklijke Metaalunie) en 24/7-bereikbaarheid zichtbaar in beeld.",
      ],
      resultaat: [
        "Eén site voor Nederlandse en internationale klanten, op het eigen domein volmertechniek.com.",
        "Elke aanvraag komt binnen met type werk en contactgegevens, via formulier of telefoon.",
        "Donkere, industriële uitstraling die past bij het werk, met foto's van de eigen werkvloer.",
      ],
      voorNaAlt: undefined as { voor: string; na: string } | undefined,
      quote: undefined as { text: string; author: string } | undefined,
    },
    "mourits-schilderwerken": {
      branche: "Schildersbedrijf",
      intro: "Een nieuwe site voor een schildersbedrijf uit Klaaswaal dat sinds 2015 in de hele Hoeksche Waard werkt: vijf diensten, projectgalerij en direct bellen vanaf je telefoon.",
      situatie: "Mourits Schilderwerken B.V. werkt sinds 2015 vanuit Klaaswaal in de hele Hoeksche Waard: schilderwerk binnen en buiten, wandafwerking, beglazing, restauratie en spuitwerk. De oude website stamde uit de begintijd van het bedrijf, met een fotoslider en een tabel met contactgegevens bovenaan, en was op een telefoon lastig te gebruiken.",
      aanpak: [
        "Vijf dienstcategorieën met eigen pagina's, van glasvlies en kalkverf tot HR++-glas en houtrotherstel.",
        "Bel-balk bovenaan en een knop om vrijblijvend advies aan te vragen, allebei direct bereikbaar op mobiel.",
        "Projectgalerij met eigen werk, werkgebied met alle kernen van de Hoeksche Waard, garantie op het werk benoemd.",
        "Rustige, lichte vormgeving met grote foto's van gevels en kozijnen, zodat het vakwerk zelf het verhaal vertelt.",
      ],
      resultaat: [
        "Site op het eigen domein mouritsschilderwerken.nl, met contactformulier, telefoon en mobiel nummer op één plek.",
        "Op mobiel bel je met één tik; op desktop staat de advies-aanvraag altijd in beeld.",
        "Vindbaar op dienst én plaats: elke dienst heeft een eigen pagina, het werkgebied staat uitgeschreven.",
      ],
      voorNaAlt: { voor: "De oude website van Mourits Schilderwerken op mobiel", na: "De nieuwe website van Mourits Schilderwerken op mobiel" } as { voor: string; na: string } | undefined,
      quote: undefined as { text: string; author: string } | undefined,
    },
    "monster-zorg": {
      branche: "Zzp-zorgverlener",
      intro: "Een persoonlijke site vanaf nul voor een toegepast psycholoog en zorgverlener die zichzelf als zzp'er inzet: wie hij is, wat hij doet, en hoe je hem bereikt.",
      situatie: "Jarno Monster werkt als toegepast psycholoog en zorgverlener met ruim acht jaar ervaring in de woonbegeleiding, en zet zichzelf als zzp'er in bij zorgorganisaties. Er was nog geen website. Opdrachtgevers moesten snel kunnen zien wat hij doet, wat zijn achtergrond is en hoe ze hem bereiken.",
      aanpak: [
        "Eén pagina met een duidelijke volgorde: wie is Jarno, wat biedt hij, welke ervaring heeft hij, waarom Monster Zorg, en contact.",
        "Tijdlijn van 2016 tot nu die de loopbaan in één oogopslag laat zien.",
        "Bellen en LinkedIn direct vanuit de navigatie; geen omwegen.",
        "Warme, lichte vormgeving met een echt portret in plaats van stockbeeld.",
      ],
      resultaat: [
        "Een site die in één scroll uitlegt wat een opdrachtgever wil weten, op het eigen domein monsterzorg.nl.",
        "Contact in twee tikken: telefoon of LinkedIn, ook op mobiel.",
        "Klaar om uit te breiden met werkgebied en tarieven zodra die vaststaan.",
      ],
      voorNaAlt: undefined as { voor: string; na: string } | undefined,
      quote: undefined as { text: string; author: string } | undefined,
    },
  },
};

export type WorkDict = typeof work;
```

- [ ] **Step 3: Maak `lib/i18n/nl/pages.tsx`**

Functies met parameters vervangen zinnen waarin bedragen of namen staan; zo kan het Engels een andere woordvolgorde kiezen.

```tsx
import type { ReactNode } from "react";
import { pricing, euro } from "@/lib/pricing";

const accent = (word: string): ReactNode => <em className="hd-accent-word not-italic text-accent">{word}</em>;

const websiteFrom = euro(pricing.website.from);
const online = pricing.hosting.find((h) => h.id === "online")!;
const onderhoud = pricing.hosting.find((h) => h.id === "onderhoud")!;
const quarter = euro(pricing.hulp.quarter);

type Accented = { pre: string; accent: string; post: string };
/** OG-afbeelding: accentwoord tussen sterretjes (conventie van lib/og.tsx). */
const star = (h: Accented) => `${h.pre}*${h.accent}*${h.post}`;
/** H1 met accentwoord. */
const accented = (h: Accented): ReactNode => (
  <>
    {h.pre}
    {accent(h.accent)}
    {h.post}
  </>
);

const homeH1 = { pre: "Alles rond je ", accent: "website", post: ". Eén aanspreekpunt." };
const websitesH1 = { pre: "Een website die direct ", accent: "professioneler", post: " voelt." };
const hostingH1 = { pre: "Online blijven, ", accent: "zonder gedoe", post: "." };
const hulpH1 = { pre: "Vastgelopen? Ik kijk ", accent: "direct", post: " mee." };

/** Lead van de juridische pagina's: staat zowel in de hero als op de OG-afbeelding. */
const privacyLead = "Ik vind het belangrijk dat je weet wat ik met jouw gegevens doe. Op deze pagina lees je hoe ik dat doe.";
const voorwaardenLead = "Geen kleine lettertjes, maar wel duidelijke afspraken. Dit is wat je van mij kunt verwachten en wat ik van jou verwacht.";

/** Copy per pagina: metadata, OG-afbeelding, hero, secties, CTA-band. */
export const pages = {
  home: {
    meta: {
      title: "Websites, hosting en computerhulp in de Hoeksche Waard | HitzDigital",
      description: `Ik bouw websites voor ondernemers in de Hoeksche Waard, houd ze online en help als je computer of site vastloopt. Eén persoon, korte lijnen. Website vanaf ${websiteFrom}, hosting vanaf ${euro(online.monthly)} per maand, alles incl. btw.`,
    },
    og: {
      title: star(homeH1),
      kicker: "Websites · Hosting · Hulp",
      sub: "Websites, hosting en computerhulp voor ondernemers in de Hoeksche Waard. Eén persoon, korte lijnen.",
    },
    hero: {
      h1: homeH1,
      sub: "Websites, hosting en computerhulp voor ondernemers in de Hoeksche Waard. Ik bouw je site, houd hem online en kijk direct mee als iets vastloopt. Eén persoon, korte lijnen.",
      primary: "Bekijk wat ik doe",
      secondary: "Neem contact op",
      /** Labels in de mock-apparaten. De mock-site zelf (klantcontent) blijft in beide talen gelijk. */
      chips: {
        mobile: "Mobielvriendelijk",
        fast: "Snelle laadtijd",
        seo: "SEO-klaar",
        structure: "Duidelijke structuur",
        modern: "Moderne uitstraling",
        selfManaged: "Zelf te beheren",
        friendly: "Gebruiksvriendelijk",
        professional: "Professionele indruk",
        code: { fast: "// snelle laadtijd", clean: "// schone code", perf: "// betere prestaties" },
      },
    },
    pijlers: { title: "Drie dingen die ik voor je regel." },
    zoWerkIk: { title: "Duidelijk vooraf. Geen verrassingen achteraf." },
    werk: {
      eyebrow: "Werk",
      teaserTitle: "Bedrijven die je al voorgingen.",
      all: "Al mijn werk",
    },
    contact: {
      eyebrow: "Contact",
      title: "Waar kan ik je mee helpen?",
      lead: "Kies waarvoor je me nodig hebt en vertel kort wat er speelt. Ik reageer binnen 1 werkdag, vrijblijvend.",
      direct: "Liever direct?",
      urgent: "Bij een storing of spoed: bel.",
    },
  },

  websites: {
    meta: {
      title: "Website laten maken in de Hoeksche Waard | HitzDigital",
      description: `Een moderne website voor je bedrijf, vanaf ${websiteFrom} incl. btw. Je ziet eerst een gratis demo van je eigen homepage, daarna beslis je. Voor vakbedrijven en horeca in de Hoeksche Waard.`,
    },
    og: {
      title: star(websitesH1),
      kicker: "Websites",
      sub: `Je ziet eerst een gratis demo van je eigen homepage. Daarna beslis je. Vanaf ${websiteFrom} incl. btw.`,
    },
    crumb: "Websites",
    werkwijzeTitle: "In drie stappen naar een betere website.",
    hero: {
      title: accented(websitesH1),
      lead: "Voor cafés, schilders, installateurs, hoveniers en andere vakbedrijven in de Hoeksche Waard. Je ziet eerst een echte demo van je eigen site. Daarna beslis je.",
      secondary: "Bekijk mijn werk",
      asideAlt: "Website van Mourits Schilderwerken op desktop",
    },
    options: { title: "Twee vertrekpunten, één aanpak." },
    included: {
      title: "Alles wat een goede site nodig heeft.",
      lead: (from: string) => `Geen losse opties of verrassingen achteraf. Dit zit er standaard bij, ook bij een site vanaf ${from}.`,
    },
    price: {
      title: (from: string) => `Een complete website vanaf ${from}.`,
      lead: (note: string, monthly: string) =>
        `Incl. btw. ${note} Wil je dat ik hem ook online houd? Hosting & onderhoud is ${monthly} per maand, inclusief je .nl-domein en een kleine wijziging per maand. Maandelijks opzegbaar.`,
      moreHosting: "Meer over hosting",
      card: {
        name: "Website",
        from: (from: string) => `vanaf ${from}`,
        bullets: ["Gratis demo van je homepage vooraf", "Complete site, op je eigen domein", "Teksten en foto's geregeld", "Zelf aan te passen"],
        hostingRow: "Hosting & onderhoud",
        perMonth: (amount: string) => `${amount} per maand`,
        vat: "Alle prijzen incl. 21% btw.",
      },
    },
    voorNa: {
      eyebrow: "Voor en na",
      title: "Van verouderd naar verzorgd.",
      lead: (title: string, branche: string, plaats: string) =>
        `${title}, ${branche.toLowerCase()} in ${plaats}. Sleep de greep om de oude en de nieuwe site te vergelijken, precies zoals je klant ze op zijn telefoon ziet.`,
      link: "Lees de hele case",
    },
    ctaBand: {
      title: "Benieuwd hoe jouw website eruit kan zien?",
      body: "Stuur je huidige site of vertel kort wat je doet. Je krijgt een echte demo van je homepage, gratis en zonder verplichtingen.",
    },
  },

  hosting: {
    meta: {
      title: "Hosting, domein en onderhoud voor je website | HitzDigital",
      description: `Hosting vanaf ${euro(online.monthly)} per maand, onderhoud met domein en een kleine wijziging per maand voor ${euro(onderhoud.monthly)}. Maandelijks opzegbaar, alles incl. btw. Overstappen regel ik.`,
    },
    og: {
      title: star(hostingH1),
      kicker: "Hosting & domeinen",
      sub: "Domein, hosting, e-mail en een kleine wijziging per maand in één bedrag. Maandelijks opzegbaar.",
    },
    crumb: "Hosting & domeinen",
    hero: {
      title: accented(hostingH1),
      lead: "Domein, hosting, e-mail en een kleine wijziging per maand in één bedrag. Maandelijks opzegbaar. En als er iets is, app je mij, geen ticketsysteem.",
      primary: "Kies je pakket",
      secondary: "Overstappen? Ik regel het",
      asideLabel: "Zit er altijd bij",
    },
    packages: {
      title: "Twee pakketten, één maandbedrag.",
      lead: (mailOne: string) =>
        `Alle prijzen incl. 21% btw en maandelijks opzegbaar. Betalen per maand of per jaar, wat jij prettig vindt. Een zakelijke mailbox op je eigen domein kan bij elk pakket, vanaf ${mailOne} per maand extra.`,
      everyPlan: "Bij elk pakket.",
      tierPerMonth: (label: string) => `${label}, per maand`,
    },
    domain: {
      eyebrow: "Domeinnaam & e-mail",
      title: "Je domein op jouw naam.",
      p1: (included: string, other: string) =>
        `${included} Kies je alleen hosting, dan registreer of verleng ik je .nl-domein los. Ik beheer het, jij blijft de eigenaar. ${other}`,
      p2: (one: string, multi: string, gb: number, more: string) =>
        `Zakelijke e-mail op je eigen domein (jij@jouwbedrijf.nl) is ${one} per maand voor één mailbox en ${multi} per maand voor twee tot vijf mailboxen samen, elk met ${gb} GB opslag, agenda en spamfilter, werkend op je telefoon en laptop. ${more}`,
      rowDomain: "domein, per jaar",
      note: "Incl. 21% btw. Andere extensies op aanvraag.",
    },
    switch: {
      title: "Weg bij je huidige hoster? Ik regel het.",
      lead: "Ook als je site niet door mij gebouwd is. Je hoeft zelf niets over te zetten en er ligt niets uit.",
    },
    ctaBand: {
      title: "Zeker weten dat je site gewoon werkt?",
      body: "Vertel kort waar je site en domein nu staan. Ik laat je weten wat het wordt en regel de overstap.",
    },
    schema: { name: "Hosting, domein en onderhoud", serviceType: "Webhosting en websiteonderhoud", unit: "maand" },
  },

  hulp: {
    meta: {
      title: "Computer- en websitehulp in de Hoeksche Waard | HitzDigital",
      description: `Vastgelopen? Ik kijk direct mee. Hulp bij computer, e-mail, domein, netwerk of website, op afstand of aan huis in de Hoeksche Waard. ${quarter} per kwartier incl. btw. Niet opgelost? Dan betaal je niets.`,
    },
    og: {
      title: star(hulpH1),
      kicker: "Computer- en websitehulp",
      sub: `${quarter} per kwartier incl. btw. Op afstand of aan huis in de Hoeksche Waard. Niet opgelost? Dan betaal je niets.`,
    },
    crumb: "Hulp",
    hero: {
      title: accented(hulpH1),
      lead: "Voor ondernemers in de Hoeksche Waard, en ook gewoon thuis. Je laptop, je mail, je domein, je netwerk of je website: ik los het op, in gewone taal. Meestal op afstand, binnen een kwartier begonnen. Moet ik langskomen? Dan kom ik langs.",
      aside: {
        rate: "Tarief",
        vat: "incl. btw",
        perQuarter: "per kwartier",
        guaranteeBody: "We spreken vooraf af wat het probleem is. Los ik het niet op, dan kost het je niks.",
      },
    },
    apk: {
      title: "Eén vaste prijs, geen verrassingen.",
      items: [
        {
          id: "computer-apk" as const,
          title: "Computer APK",
          body: "Updates en opschonen, virus- en malwarescan, snelheidscheck, back-up en wachtwoorden met tweestapsverificatie gecheckt. Je krijgt een kort lijstje met wat ik gedaan heb en wat je zelf nog kunt doen. Ongeveer 45 minuten, op afstand of aan huis.",
        },
        {
          id: "website-apk" as const,
          title: "Website APK",
          body: "Snelheid, mobiel, vindbaarheid, SSL, back-ups en verouderde plugins, met een kort rapport in gewone taal. Ook als ik je site niet gebouwd heb. Valt de uitslag tegen? Dan maak ik gratis een demo van hoe het wél kan.",
        },
      ],
      plan: (title: string) => `Plan een ${title}`,
      card: (quarters: number, price: string, validity: string) => `Vaker hulp nodig? Strippenkaart: ${quarters} kwartier voor ${price}, ${validity}.`,
    },
    help: {
      eyebrow: "Waar ik bij help",
      title: "Van mailbox tot kantoornetwerk.",
      notTitle: "Wat ik niet doe",
      notBody: "Daar verwijs ik je door naar iemand die dat wél goed doet. Twijfel je of iets erbij hoort? App even, dan zeg ik eerlijk of ik het kan.",
    },
    how: {
      title: "Bellen, meekijken, opgelost.",
      homeLead: "Ook thuis vastgelopen?",
      homeBody: (quarter: string) => `Ik help ook particulieren in de Hoeksche Waard, tegen hetzelfde tarief: ${quarter} per kwartier, incl. btw.`,
    },
    ctaBand: { title: "Zit je nu vast?", body: "Bel of app, dan kijk ik direct mee. Liever eerst een bericht? Vertel kort wat er speelt." },
    schema: {
      name: "Computer- en websitehulp",
      serviceType: "Computerhulp en websiteondersteuning",
      perQuarter: "Hulp per kwartier",
      unit: "kwartier",
      card: (quarters: number) => `Strippenkaart ${quarters} kwartier`,
    },
  },

  werk: {
    meta: {
      title: "Werk: websites voor ondernemers in de Hoeksche Waard | HitzDigital",
      description: "Voorbeelden van websites die ik gebouwd heb: voor een metaalbedrijf, een schildersbedrijf, een zorgverlener en meer. Klik door naar de cases.",
    },
    og: {
      title: "Voorbeelden van mijn *werk*.",
      kicker: "Werk",
      sub: "Websites voor bedrijven in de Hoeksche Waard: metaalbewerking, schilderwerk, zorg en meer.",
    },
    crumb: "Werk",
    hero: {
      title: "Voorbeelden van mijn werk.",
      lead: "Geen sjablonen, geen stockfoto's. Sites die ik gebouwd heb voor bedrijven in de regio, en een paar eigen projecten. Bij de klanten lees je hoe het ging.",
    },
    ctaBand: {
      title: "Wil je dit ook voor jouw bedrijf?",
      body: "Stuur je huidige site of vertel kort wat je doet. Je krijgt een echte demo van je homepage, gratis en zonder verplichtingen.",
    },
  },

  case: {
    metaTitle: (title: string, branche: string, plaats: string) => `Website voor ${title}, ${branche.toLowerCase()} in ${plaats} | HitzDigital`,
    ogTitle: (title: string) => `Website voor *${title}*`,
    ogFallback: { title: "Werk van HitzDigital", kicker: "Werk" },
    viewSite: "Bekijk de site",
    desktopAlt: (title: string) => `Website van ${title} op desktop`,
    situation: "Situatie",
    approach: "Aanpak",
    result: "Resultaat",
    voorNa: {
      eyebrow: "Voor en na",
      title: "Zo zag het eruit, zo ziet het er nu uit.",
      lead: "Sleep de greep om de oude en de nieuwe site te vergelijken, zoals een klant ze op zijn telefoon ziet.",
    },
    others: "Ook gebouwd.",
    schemaName: (title: string) => `Website voor ${title}`,
  },

  contact: {
    meta: {
      title: "Contact | HitzDigital",
      description: "Vraag een gratis demo aan, regel hosting of vraag hulp. App, bel of mail Nathaniel in Puttershoek. Reactie binnen 1 werkdag, vrijblijvend.",
    },
    og: { title: "Waar kan ik je *mee helpen*?", kicker: "Contact", sub: "Gratis demo, hosting of hulp. App, bel of mail. Reactie binnen 1 werkdag." },
    crumb: "Contact",
    hero: {
      title: "Waar kan ik je mee helpen?",
      lead: "Kies waarvoor je me nodig hebt en vertel kort wat er speelt. Ik reageer binnen 1 werkdag, vrijblijvend. Bij een storing of spoed: bel.",
    },
    direct: { eyebrow: "Liever direct", whatsappNote: "snelste voor korte vragen", callNote: "bel bij storing of spoed" },
    about: {
      place: (founder: string, city: string) => `${founder} · ${city}, Hoeksche Waard`,
      kvk: (kvk: string) => `KvK ${kvk}`,
      reply: "Reactie binnen 1 werkdag. Op afstand of bij jou in de regio.",
    },
    faqTitle: "Korte vragen",
    schemaName: "Contact HitzDigital",
  },

  privacy: {
    meta: {
      title: "Privacybeleid | HitzDigital",
      description: "Wat HitzDigital met je gegevens doet, in gewone taal: welke gegevens ik bewaar, waarom, hoe lang, met wie ik ze deel en welke rechten je hebt.",
    },
    og: { title: "*Privacybeleid*", kicker: "Privacy", sub: privacyLead },
    crumb: "Privacy",
    title: "Privacybeleid",
    lead: privacyLead,
    versionLine: (version: string, updated: string) => `Versie ${version}, bijgewerkt op ${updated}`,
    version: "2.0",
    updated: "29 augustus 2026",
  },

  voorwaarden: {
    meta: {
      title: "Algemene voorwaarden | HitzDigital",
      description: "De afspraken van HitzDigital in gewone taal: websites, hosting en onderhoud, computer- en websitehulp, betalen, opzeggen en eigendom.",
    },
    og: { title: "Algemene *voorwaarden*", kicker: "Voorwaarden", sub: voorwaardenLead },
    crumb: "Voorwaarden",
    title: "Algemene voorwaarden",
    lead: voorwaardenLead,
    updatedLine: (updated: string) => `Laatst bijgewerkt: ${updated}`,
    updated: "26 augustus 2026",
  },
};

export type PagesDict = typeof pages;
```

- [ ] **Step 4: Werk `lib/i18n/nl/index.ts` bij**

```ts
export { ui } from "./ui";
export { pages } from "./pages";
export { services } from "./services";
export { work } from "./work";
```

- [ ] **Step 5: Typecheck en commit**

Run: `npx tsc --noEmit` — Expected: geen fouten.

```bash
git add lib/i18n/nl
git commit -m "i18n: NL-woordenboeken services, work en pages (letterlijke copy)"
```

---

### Task 7: Site-schil op het woordenboek (Nav, Footer, ThemeSwitch, Breadcrumbs, PageHero, FAB, sticky balk, CTA-band)

**Files:**
- Modify: `app/[lang]/(site)/layout.tsx`
- Modify: `components/layout/Nav.tsx`, `components/layout/Footer.tsx`, `components/ui/ThemeSwitch.tsx`, `components/ui/Breadcrumbs.tsx`, `components/page/PageHero.tsx`, `components/ui/WhatsAppFab.tsx`, `components/page/StickyCallBar.tsx`, `components/page/CtaBand.tsx`
- Modify: alle pagina's die `PageHero`, `WhatsAppFab`, `StickyCallBar` of `CtaBand` gebruiken krijgen tijdelijk `lang="nl"` als prop (wordt in Task 8–15 vervangen door de echte `lang`)

Client-componenten (`Nav`, `ThemeSwitch`, `WhatsAppFab`, `StickyCallBar`) krijgen strings als props. Server-componenten (`Footer`, `Breadcrumbs`, `PageHero`, `CtaBand`) krijgen `lang` en halen zelf `getDict(lang)`.

- [ ] **Step 1: `components/ui/ThemeSwitch.tsx`: labels als prop**

Vervang de signatuur en de vier strings:

```tsx
export type ThemeLabels = { toLight: string; toDark: string; light: string; dark: string };

export function ThemeSwitch({ className, size = "md", labels }: { className?: string; size?: "md" | "lg"; labels: ThemeLabels }) {
```

en in de JSX:

```tsx
      aria-label={dark ? labels.toLight : labels.toDark}
      title={dark ? labels.light : labels.dark}
```

- [ ] **Step 2: `components/layout/Nav.tsx`: links, knop en labels als props**

Vervang de imports en signatuur:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { ThemeSwitch, type ThemeLabels } from "@/components/ui/ThemeSwitch";
import { cn } from "@/lib/cn";
import { href, type Lang } from "@/lib/i18n/paths";

export type NavLabels = { aria: string; homeAria: string; menuOpen: string; menuClose: string; menu: string; themeRow: string };

type Props = {
  lang: Lang;
  links: { label: string; href: string }[];
  /** Header-knop (desktop rechts, mobiel onderin het menu). Fase 3 maakt dit contextueel. */
  cta: { label: string; href: string };
  labels: NavLabels;
  theme: ThemeLabels;
};

/**
 * Vaste navigatie. Condenseert (blur + hairline) na 24px scroll via een
 * IntersectionObserver-sentinel (geen scroll-listener). Onder 901px: hamburger
 * + fullscreen menu met focus-beheer, Escape en scroll-lock.
 */
export function Nav({ lang, links, cta, labels, theme }: Props) {
```

Vervang in de JSX:
- `aria-label="Hoofdnavigatie"` → `aria-label={labels.aria}`
- `<a href="/" aria-label="HitzDigital home"` → `<a href={href(lang, "home")} aria-label={labels.homeAria}` (de import van `href` uit `@/lib/i18n/paths` staat hierboven al)
- beide `nav.links.map(` → `links.map(`
- beide `<ThemeSwitch` → `<ThemeSwitch labels={theme}` (met behoud van `size="lg"` in het menu)
- `href={cta.demo.href}` → `href={cta.href}` en `{cta.demo.label}` → `{cta.label}` (twee plekken: desktop-link en `<Button>` in het menu)
- `aria-label={open ? "Menu sluiten" : "Menu openen"}` → `aria-label={open ? labels.menuClose : labels.menuOpen}`
- `aria-label="Menu"` → `aria-label={labels.menu}`
- `<span>Weergave</span>` → `<span>{labels.themeRow}</span>`

Verwijder de import `import { nav, cta } from "@/lib/content";`.

- [ ] **Step 3: `components/layout/Footer.tsx`: `lang` als prop, teksten uit het woordenboek**

Volledige inhoud:

```tsx
import { MailtoLink } from "@/components/ui/MailtoLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { contactEmail, whatsapp, tel, telDisplay } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

const linkCls = "inline-block py-1 text-muted transition-colors hover:text-ink"; // py-1: raakvlak ≥ 24px

export function Footer({ lang }: { lang: Lang }) {
  const { ui, services } = getDict(lang);
  const t = ui.footer;
  return (
    <footer className="relative z-[2] border-t border-line bg-deep px-[clamp(20px,5vw,64px)] pb-8 pt-14">
      <div className="mx-auto max-w-[1140px]">
        <div className="grid grid-cols-1 gap-10 min-[561px]:grid-cols-2 min-[901px]:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark size={18} />
            <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.6] text-muted">{t.tagline}</p>
            <p className="mt-2 text-[13px] text-faint">{t.place}</p>
          </div>

          <div>
            <h2 className="mb-3 text-[12px] uppercase tracking-[0.14em] text-faint">{t.services}</h2>
            <ul className="flex flex-col gap-0.5 text-[14px]">
              {services.pijlers.map((p) => (
                <li key={p.id}>
                  <a href={p.href} className={linkCls}>
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-[12px] uppercase tracking-[0.14em] text-faint">{t.more}</h2>
            <ul className="flex flex-col gap-0.5 text-[14px]">
              {t.moreLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkCls}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-[12px] uppercase tracking-[0.14em] text-faint">{t.contact}</h2>
            <ul className="flex flex-col gap-0.5 text-[14px]">
              <li>
                <MailtoLink href={ui.mailto} className={linkCls}>
                  {contactEmail}
                </MailtoLink>
              </li>
              <li>
                <a href={tel} className={linkCls}>
                  {telDisplay}
                </a>
              </li>
              <li>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {t.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line2 pt-5 text-[12.5px] text-faint min-[761px]:flex-row min-[761px]:items-center min-[761px]:gap-8">
          <span>© 2026 HitzDigital{site.kvk ? ` · KvK ${site.kvk}` : ""}</span>
          <ul className="flex flex-wrap items-center">
            {t.legal.map((l, i) => (
              <li key={l.href} className="flex items-center">
                {i > 0 && <span aria-hidden className="mx-3 select-none">|</span>}
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="min-[761px]:ml-auto">{t.vat}</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: `components/ui/Breadcrumbs.tsx` en `components/page/PageHero.tsx`: `lang` als prop**

`Breadcrumbs.tsx`, vervang signatuur en de twee strings:

```tsx
import { getDict } from "@/lib/i18n";
import { href, type Lang } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export type Crumb = { label: string; href?: string };

/** Kruimelpad + BreadcrumbList-schema. Laatste item is de huidige pagina (geen link). */
export function Breadcrumbs({ lang, items }: { lang: Lang; items: Crumb[] }) {
  const t = getDict(lang).ui.crumbs;
  const all: Crumb[] = [{ label: t.home, href: href(lang, "home") }, ...items];
```

en `aria-label="Kruimelpad"` → `aria-label={t.aria}`. De schema-URL-regel wordt:

```tsx
      ...(c.href ? { item: `${site.url}${c.href === "/" ? "" : c.href}` } : {}),
```
(ongewijzigd; voor `/en` levert dit `https://www.hitzdigital.nl/en`.)

`PageHero.tsx`: voeg `lang: Lang` toe aan de props (import `type { Lang } from "@/lib/i18n/paths"`) en geef hem door: `<Breadcrumbs lang={lang} items={crumbs} />`.

- [ ] **Step 5: `WhatsAppFab`, `StickyCallBar`, `CtaBand`**

`components/ui/WhatsAppFab.tsx`: voeg aan `Props` toe `label: string; aria: string;`, destructureer ze en vervang `aria-label="Heb je een vraag? Stuur een WhatsApp"` → `aria-label={aria}` en `<span>Heb je een vraag?</span>` → `<span>{label}</span>`.

`components/page/StickyCallBar.tsx`: signatuur wordt

```tsx
export function StickyCallBar({ afterId, untilId, labels }: { afterId: string; untilId?: string; labels: { aria: string; call: string; whatsapp: string } }) {
```
met `aria-label="Direct contact"` → `aria-label={labels.aria}`, de tekst `Bel` → `{labels.call}` en `WhatsApp` → `{labels.whatsapp}`.

`components/page/CtaBand.tsx`: server-component, krijgt `lang`:

```tsx
import { getDict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n/paths";
// ...
export function CtaBand({ lang, title, body, label, href }: { lang: Lang; title: string; body: string; label: string; href: string }) {
  const { ui } = getDict(lang);
```
en `App via WhatsApp` → `{ui.cta.whatsapp}`, `Of bel{" "}` → `{ui.ctaBand.orCall}{" "}`, `. Reactie binnen 1 werkdag, vrijblijvend.` → `. {ui.ctaBand.reply}`.

- [ ] **Step 6: `app/[lang]/(site)/layout.tsx`**

```tsx
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getDict } from "@/lib/i18n";
import { langOf, type LangParams } from "@/lib/i18n/paths";

/**
 * Gedeelde site-schil: skip-link, navigatie en footer voor alle publieke pagina's.
 * Pagina's renderen zelf hun <main id="main">.
 */
export default async function SiteLayout({ children, params }: Readonly<{ children: React.ReactNode }> & LangParams) {
  const lang = langOf((await params).lang);
  const { ui } = getDict(lang);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[14px] focus:font-semibold focus:text-on-accent"
      >
        {ui.skipLink}
      </a>
      <Nav lang={lang} links={ui.nav.links} cta={{ label: ui.nav.cta.demo, href: ui.cta.demo.href }} labels={ui.nav} theme={ui.theme} />
      {children}
      <Footer lang={lang} />
    </>
  );
}
```

- [ ] **Step 7: Tijdelijke `lang="nl"` in de pagina's**

Zodat de typecheck slaagt tot elke pagina in Task 8–15 aan de beurt is: voeg in alle bestanden onder `app/[lang]/(site)/` aan elke `<PageHero`, `<CtaBand` de prop `lang="nl"` toe, aan elke `<WhatsAppFab` de props `label="Heb je een vraag?" aria="Heb je een vraag? Stuur een WhatsApp"` en aan `<StickyCallBar` (alleen `hulp/page.tsx`) `labels={{ aria: "Direct contact", call: "Bel", whatsapp: "WhatsApp" }}`.

Snelle controle dat je niets mist: `npx tsc --noEmit` meldt elke plek die nog een prop mist.

- [ ] **Step 8: Bouw, controleer visueel, commit**

Run: `npx tsc --noEmit && npm run build` — Expected: geen fouten.

Start `npm run dev` en open `http://localhost:3111/` en `/hosting`: nav, footer en 404 (`/x`) zien er exact uit als vóór deze task.

```bash
git add -A
git commit -m "Site-schil leest teksten uit het woordenboek; lang als prop"
```

---

### Task 8: Homepage en hero

**Files:**
- Create: `lib/i18n/meta.ts`
- Modify: `app/[lang]/layout.tsx` (metadata inkorten), `app/[lang]/(site)/page.tsx`, `components/hero/HeroExperience.tsx`, `components/sections/Pijlers.tsx`, `components/sections/ZoWerkIk.tsx`, `components/sections/Werk.tsx`, `components/sections/Over.tsx`, `components/sections/Contact.tsx`

- [ ] **Step 1: Maak `lib/i18n/meta.ts`**

```ts
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { alternatesFor, href, ogLocale, type Lang, type RouteKey } from "./paths";

type Texts = { title: string; description: string };
type Opts = { slug?: string; type?: "website" | "article" };

/** Metadata voor één pagina: titel, beschrijving, canonical + hreflang, OpenGraph en Twitter. */
export function pageMetadata(lang: Lang, key: RouteKey, t: Texts, opts: Opts = {}): Metadata {
  const url = href(lang, key, opts.slug);
  return {
    title: t.title,
    description: t.description,
    alternates: alternatesFor(lang, key, opts.slug),
    openGraph: {
      title: t.title,
      description: t.description,
      url,
      siteName: site.name,
      locale: ogLocale(lang),
      type: opts.type ?? "website",
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  };
}
```

- [ ] **Step 2: Kort de metadata in `app/[lang]/layout.tsx` in**

Verwijder de constanten `title` en `description`, voeg `import { getDict } from "@/lib/i18n";` toe en vervang het `metadata`-blok door een `generateMetadata`:

```tsx
/** Standaardtitel op layout-niveau: de 404 (notFound()) krijgt geen page-metadata, dus zonder deze default
    rendert /bestaat-niet zonder <title>. Template "%s" laat de titel van elke pagina ongewijzigd door. */
export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: getDict(lang).pages.home.meta.title, template: "%s" },
    openGraph: { siteName: site.name, type: "website" },
    twitter: { card: "summary_large_image" },
  };
}
```

De `title.default` hoort hier en niet in `app/[lang]/[...rest]/page.tsx`: Next voert de `generateMetadata` van een page niet uit wanneer die `notFound()` gooit (de not-found-boundary vervangt het hele segment), waardoor de 404 anders zonder `<title>` rendert. `robots: noindex` zet Next zelf al op de 404.

- [ ] **Step 3: Hero-copy als parameter in `components/hero/HeroExperience.tsx`**

Voeg boven `HERO_HTML` toe (het type is afgeleid van het woordenboek, zodat het niet met de hand hoeft mee te bewegen; `import type` verdwijnt bij de build, dus de client-bundle groeit er niet van):

```tsx
import type { Dict } from "@/lib/i18n";

/** Teksten in de hero; de mock-site op het laptopscherm is klantcontent en blijft ongewijzigd. */
export type HeroCopy = Dict["pages"]["home"]["hero"];

// Woordenboekteksten zijn platte tekst; `<`, `&` en `"` mogen de template niet breken.
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
```

Maak van `const HERO_HTML = \`…\`;` een functie: `function heroHtml(c: HeroCopy, contactHref: string): string { return \`…\`; }` en vervang in de template **precies** deze stukken (elke interpolatie loopt door `esc()`; de huidige teksten bevatten geen `<`, `&` of `"`, dus de HTML blijft gelijk):

| Was | Wordt |
|---|---|
| `<span style="font-weight:300">Alles rond je </span><em class="hd-accent-word" …>website</em><span style="font-weight:300">. Eén aanspreekpunt.</span>` | `<span style="font-weight:300">${esc(c.h1.pre)}</span><em class="hd-accent-word" …>${esc(c.h1.accent)}</em><span style="font-weight:300">${esc(c.h1.post)}</span>` |
| `…margin-bottom:36px">Websites, hosting en computerhulp … Eén persoon, korte lijnen.</p>` | `…margin-bottom:36px">${esc(c.sub)}</p>` |
| `…transition:transform .25s,box-shadow .25s,filter .25s">Bekijk wat ik doe` | `…transition:transform .25s,box-shadow .25s,filter .25s">${esc(c.primary)}` |
| `<a href="/contact" class="hd-btn-ghost"` | `<a href="${esc(contactHref)}" class="hd-btn-ghost"` |
| `…transform .25s">Neem contact op</a>` | `…transform .25s">${esc(c.secondary)}</a>` |
| `Mobielvriendelijk` (2×) | `${esc(c.chips.mobile)}` |
| `Snelle laadtijd` | `${esc(c.chips.fast)}` |
| `SEO-klaar` (2×) | `${esc(c.chips.seo)}` |
| `Duidelijke structuur` (2×) | `${esc(c.chips.structure)}` |
| `Moderne uitstraling` | `${esc(c.chips.modern)}` |
| `Zelf te beheren` | `${esc(c.chips.selfManaged)}` |
| `Gebruiksvriendelijk` (2×) | `${esc(c.chips.friendly)}` |
| `Professionele indruk` | `${esc(c.chips.professional)}` |
| `// snelle laadtijd` | `${esc(c.chips.code.fast)}` |
| `// schone code` | `${esc(c.chips.code.clean)}` |
| `// betere prestaties` | `${esc(c.chips.code.perf)}` |

De mock-site op het laptopscherm (`Diensten`, `Werk`, `Contact`, `Bel direct`, `Offerte aanvragen`, `Bekijk diensten`, `Verspaning zonder stilstand.`) blijft ongewijzigd: dat is klantcontent van een Nederlandse klant en in beide talen realistisch.

Vervang de component:

```tsx
export function HeroExperience({ copy, contactHref }: { copy: HeroCopy; contactHref: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const html = heroHtml(copy, contactHref);
  // Opnieuw initialiseren zodra de HTML wisselt (andere taal): initHero houdt anders verwijzingen naar weggegooide nodes.
  useEffect(() => {
    if (!rootRef.current) return;
    return initHero(rootRef.current);
  }, [html]);
  return <div ref={rootRef} className="relative w-full" dangerouslySetInnerHTML={{ __html: html }} />;
}
```

Controle: `grep -c "Mobielvriendelijk\|Snelle laadtijd\|SEO-klaar\|Neem contact op\|Bekijk wat ik doe" components/hero/HeroExperience.tsx` geeft `0`, en `grep -rl "Eén aanspreekpunt" .next/static | wc -l` geeft na de build `0` (het woordenboek blijft uit de client-bundle).

- [ ] **Step 4: Secties krijgen `lang`**

`components/sections/Pijlers.tsx`:

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { getDict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n/paths";

/** De drie pijlers: websites, hosting & domeinen, hulp. */
export function Pijlers({ lang }: { lang: Lang }) {
  const { pages, services } = getDict(lang);
  return (
    <Section id="pijlers">
      <Container>
        <Reveal>
          <SectionTitle className="mb-[54px] max-w-[720px]">{pages.home.pijlers.title}</SectionTitle>
        </Reveal>
        <div className="grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-3">
          {services.pijlers.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <a
                href={p.href}
                className="flex h-full flex-col rounded-2xl border border-line bg-panel p-[clamp(24px,2.6vw,34px)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
              >
                <span className="mb-[16px] block font-mono text-[12px] leading-none text-accent">{p.n}</span>
                <h3 className="mb-[10px] font-display text-[clamp(22px,2.2vw,26px)] font-semibold tracking-[-0.02em]">{p.title}</h3>
                <p className="mb-[22px] text-[15px] leading-[1.6] text-muted">{p.body}</p>
                <div className="mt-auto border-t border-line pt-[18px] text-[13.5px] text-ink">{p.price}</div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```
(De `live`-vertakking is weg: alle pijlers zijn live sinds fase 5 van de herpositionering; de gerenderde HTML is identiek.)

`components/sections/ZoWerkIk.tsx`: signatuur `export function ZoWerkIk({ lang }: { lang: Lang })`, `const { pages, services } = getDict(lang);`, titel `{pages.home.zoWerkIk.title}`, lijst `services.zoWerkIk.map(...)`. Import `zoWerkIk` uit `@/lib/services` weg.

`components/sections/Over.tsx`: signatuur `export function Over({ lang }: { lang: Lang })`, `const { over } = getDict(lang).services;`, en `alt="Nathaniel, oprichter van HitzDigital"` → `alt={over.portraitAlt}`. Import uit `@/lib/services` weg.

`components/sections/Werk.tsx`:

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { WerkCard } from "@/components/sections/WerkCard";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getDict } from "@/lib/i18n";
import { href, type Lang } from "@/lib/i18n/paths";
import { work } from "@/lib/work";

/** Homepage-teaser: de klanten + link naar /werk. De volledige grid staat op /werk zelf. */
export function Werk({ lang }: { lang: Lang }) {
  const t = getDict(lang).pages.home.werk;
  const list = work.filter((w) => w.client);
  return (
    <Section id="werk" padding="large">
      <Container>
        <Reveal>
          <div className="mb-[54px] flex flex-wrap items-end justify-between gap-5">
            <div>
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <SectionTitle className="max-w-[620px]">{t.teaserTitle}</SectionTitle>
            </div>
            <a
              href={href(lang, "werk")}
              className="inline-flex items-center gap-2 py-1 text-[15px] font-medium text-ink underline-offset-4 hover:underline"
            >
              {t.all} <ArrowRight size={16} weight="bold" aria-hidden />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-[22px] min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
            {list.map((item, i) => (
              // Teaser op één kolom: twee tegels, de derde staat achter "Al mijn werk".
              <WerkCard key={item.slug} item={item} className={i >= 2 ? "max-[560px]:hidden" : undefined} />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
```
(Geen `teaser`-prop: `/werk` rendert zijn eigen grid, dus de niet-teaser-tak was onbereikbaar. `WerkCard` krijgt zijn `lang` in Task 12; tot dan blijft de huidige `WerkCard` werken met `item.meta`/`item.alt`.)

`components/sections/Contact.tsx`: signatuur `export async function Contact({ lang }: { lang: Lang })`, `const t = getDict(lang).pages.home.contact;`, vervang `Contact` (eyebrow) → `{t.eyebrow}`, `Waar kan ik je mee helpen?` → `{t.title}`, de lead-alinea → `{t.lead}`, `Liever direct?{" "}` → `{t.direct}{" "}`, `Bel {telDisplay}` → `{getDict(lang).ui.cta.call} {telDisplay}`, `Bij een storing of spoed: bel.` → `{t.urgent}`. `AanvraagForm` blijft tot Task 13 ongewijzigd.

- [ ] **Step 5: Homepage `app/[lang]/(site)/page.tsx`**

```tsx
import type { Metadata } from "next";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { Pijlers } from "@/components/sections/Pijlers";
import { ZoWerkIk } from "@/components/sections/ZoWerkIk";
import { Werk } from "@/components/sections/Werk";
import { Over } from "@/components/sections/Over";
import { Contact } from "@/components/sections/Contact";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { langOf, type LangParams } from "@/lib/i18n/paths";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "home", getDict(lang).pages.home.meta);
}

export default async function Home({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, ui } = getDict(lang);
  return (
    <>
      <HeroExperience copy={pages.home.hero} contactHref={ui.cta.contact.href} />
      <main id="main" className="hd-after-hero relative z-[2] bg-deep">
        <Pijlers lang={lang} />
        <ZoWerkIk lang={lang} />
        <Werk lang={lang} />
        <Over lang={lang} />
        <Contact lang={lang} />
      </main>
      <WhatsAppFab label={ui.fab.label} aria={ui.fab.aria} />
    </>
  );
}
```

- [ ] **Step 6: Bouw en vergelijk**

Run: `npx tsc --noEmit && npm run build` — Expected: geen fouten.

Controleer in `npm run dev` op `http://localhost:3111/`: de bron (`view-source:`) bevat `<title>Websites, hosting en computerhulp in de Hoeksche Waard | HitzDigital</title>`, `<link rel="canonical" href="https://www.hitzdigital.nl/">`, `og:locale` `nl_NL`; hero-tekst en secties zijn ongewijzigd.

```bash
git add -A
git commit -m "Homepage en hero lezen uit het woordenboek; pageMetadata-helper"
```

---

### Task 9: Werk, cases en WerkCard (met `lib/work.ts` taalneutraal)

**Files:**
- Modify: `lib/work.ts`, `lib/i18n/nl/work.ts`, `components/sections/WerkCard.tsx`, `components/sections/Werk.tsx`, `app/[lang]/(site)/werk/page.tsx`, `app/[lang]/(site)/werk/[slug]/page.tsx`

- [ ] **Step 1: `lib/work.ts` zonder tekstvelden**

Vervang de types en verwijder `meta`, `alt`, `branche`, `kicker`, `intro`, `situatie`, `aanpak`, `resultaat`, `voorAlt`, `naAlt` en `quote` uit de data (`kicker` verdwijnt helemaal: de case-pagina stelt hem samen uit `branche` en `plaats`). Tags worden ids. De overige waarden blijven exact gelijk.

```ts
import { href, type Lang } from "@/lib/i18n/paths";

export type WorkSlug =
  | "volmer-techniek"
  | "mourits-schilderwerken"
  | "monster-zorg"
  | "youniek-art"
  | "lesbosreizen"
  | "cafe-centrum"
  | "opgietingen"
  | "festivaldiscounter";
export type CaseSlug = Extract<WorkSlug, "volmer-techniek" | "mourits-schilderwerken" | "monster-zorg">;

/** Label-id; de tekst staat in lib/i18n (ui.workCard.tags). Alleen bij afwijkingen; klanten krijgen geen label. */
export type WorkTag = "demo" | "eigen";

export type WorkItem = {
  slug: WorkSlug;
  title: string;
  href: string;
  src: string;
  tag?: WorkTag;
  /** Betalende klant → heeft een casepagina. */
  client?: boolean;
};

/** Alle voorbeelden van werk, klanten eerst (besluit 26-08-2026). Teksten: lib/i18n/*/work.ts. */
export const work: WorkItem[] = [
  { slug: "volmer-techniek", title: "Volmer Techniek", href: "https://www.volmertechniek.com/nl", src: "/images/volmertechniek.webp", client: true },
  { slug: "mourits-schilderwerken", title: "Mourits Schilderwerken", href: "https://www.mouritsschilderwerken.nl/", src: "/images/mauritsschilderwerken.webp", client: true },
  { slug: "monster-zorg", title: "Monster Zorg", href: "https://monsterzorg.nl", src: "/images/monsterzorg.webp", client: true },
  { slug: "youniek-art", title: "Youniek Art", href: "https://youniekart.vercel.app", src: "/images/youniekart.webp" },
  { slug: "lesbosreizen", title: "LesbosReizen", href: "https://lesbosreizen.nl", src: "/images/lesbosreizen.webp" },
  { slug: "cafe-centrum", title: "Café 't Centrum", href: "https://cafe-centrum.vercel.app", src: "/images/cafecentrum.webp", tag: "demo" },
  { slug: "opgietingen", title: "Opgietingen.nl", href: "https://www.opgietingen.nl/", src: "/images/opgietingen.webp", tag: "eigen" },
  { slug: "festivaldiscounter", title: "Festivaldiscounter", href: "https://festivaldiscounter.nl/", src: "/images/festivaldiscounter.webp", tag: "eigen" },
];

/** Interne link voor klanten (casepagina in de taal van de bezoeker), externe link voor de rest. */
export const workHref = (item: WorkItem, lang: Lang) => (item.client ? href(lang, "werk", item.slug) : item.href);

export type CaseStudy = {
  slug: CaseSlug;
  title: string;
  plaats: string;
  desktop: string;
  voorNa?: { voor: string; na: string };
  url: string;
};

/** Casepagina's voor de drie klanten. Copy staat in lib/i18n/*/work.ts onder `cases[slug]`. */
export const cases: CaseStudy[] = [
  { slug: "volmer-techniek", title: "Volmer Techniek", plaats: "Puttershoek", desktop: "/images/werk/volmer-desktop.webp", url: "https://www.volmertechniek.com/nl" },
  {
    slug: "mourits-schilderwerken",
    title: "Mourits Schilderwerken",
    plaats: "Klaaswaal",
    desktop: "/images/werk/mourits-desktop.webp",
    voorNa: { voor: "/images/werk/mourits-voor-mobiel.webp", na: "/images/werk/mourits-na-mobiel.webp" },
    url: "https://www.mouritsschilderwerken.nl/",
  },
  { slug: "monster-zorg", title: "Monster Zorg", plaats: "Gouda", desktop: "/images/werk/monsterzorg-desktop.webp", url: "https://monsterzorg.nl" },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
```

- [ ] **Step 2: Bewaak de sleutels in `lib/i18n/nl/work.ts`**

Voeg bovenaan toe: `import type { WorkSlug, CaseSlug } from "@/lib/work";` en vervang de sluitregel `};` van het object door:

```ts
} satisfies {
  items: Record<WorkSlug, { meta: string; alt: string }>;
  cases: Record<CaseSlug, { branche: string; intro: string; situatie: string; aanpak: string[]; resultaat: string[]; voorNaAlt: { voor: string; na: string } | undefined; quote: { text: string; author: string } | undefined }>;
};
```

- [ ] **Step 3: `components/sections/WerkCard.tsx`**

```tsx
"use client";

import Image from "next/image";
import { track } from "@vercel/analytics";
import { ArrowRight } from "@phosphor-icons/react";
import { workHref, type WorkItem } from "@/lib/work";
import type { Lang } from "@/lib/i18n/paths";
import { cn } from "@/lib/cn";

export type WerkCardText = { meta: string; alt: string };
export type WerkCardLabels = { viewCase: string; tags: { demo: string; eigen: string } };

export function WerkCard({ item, lang, text, labels, className }: { item: WorkItem; lang: Lang; text: WerkCardText; labels: WerkCardLabels; className?: string }) {
  const internal = Boolean(item.client);
  return (
    <a
      href={workHref(item, lang)}
      {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      onClick={() => {
        try {
          track("portfolio_click", { project: item.title, internal });
        } catch {}
      }}
      className={cn("group block text-inherit transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-1 active:translate-y-0 active:duration-[120ms]", className)}
    >
      {/* Op één kolom (mobiel) iets minder hoog, zodat de pagina niet drie schermhoogtes aan tegels wordt. */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[13px] min-[561px]:aspect-[3/4] border border-line transition-[border-color] duration-300 group-hover:border-accent/35">
        <Image src={item.src} alt={text.alt} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 366px" className="object-cover object-top" />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--scrim)_65%,transparent)_0%,transparent_55%)]"
          aria-hidden
        />
        {item.tag && (
          <span className="absolute left-3 top-3 rounded-full border border-on-scrim/15 bg-scrim/55 px-[10px] py-[4px] text-[10.5px] uppercase tracking-[0.12em] text-on-scrim-muted backdrop-blur-[6px]">
            {labels.tags[item.tag]}
          </span>
        )}
      </div>
      <div className="mt-[14px] flex items-center justify-between gap-3">
        <span className="font-display text-[16px] font-semibold">{item.title}</span>
        {/* Meta wisselt op hover met de uitnodiging; niets ligt over het screenshot. */}
        <span className="relative text-right text-[12px] text-faint">
          <span className={internal ? "transition-opacity duration-200 group-hover:opacity-0" : undefined}>{text.meta}</span>
          {internal && (
            <span
              aria-hidden
              className="absolute inset-y-0 right-0 inline-flex items-center gap-1 whitespace-nowrap font-medium text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              {labels.viewCase} <ArrowRight size={13} weight="bold" />
            </span>
          )}
        </span>
      </div>
    </a>
  );
}
```

- [ ] **Step 4: `components/sections/Werk.tsx`: geef tekst en labels door**

Vervang `const t = getDict(lang).pages.home.werk;` door (alias `texts`, zodat hij de `w` van de `filter`-callback niet overschaduwt):

```tsx
  const { pages, ui, work: texts } = getDict(lang);
  const t = pages.home.werk;
```
en de kaart door:

```tsx
              <WerkCard
                key={item.slug}
                item={item}
                lang={lang}
                text={texts.items[item.slug]}
                labels={ui.workCard}
                className={i >= 2 ? "max-[560px]:hidden" : undefined}
              />
```

- [ ] **Step 5: `app/[lang]/(site)/werk/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WerkCard } from "@/components/sections/WerkCard";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { langOf, type LangParams } from "@/lib/i18n/paths";
import { work } from "@/lib/work";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "werk", getDict(lang).pages.werk.meta);
}

export default async function WerkPage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, ui, work: w } = getDict(lang);
  const t = pages.werk;
  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero lang={lang} crumbs={[{ label: t.crumb }]} title={t.hero.title} lead={t.hero.lead} />
      <Section id="cases" className="pt-0 border-t-0">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-[22px] min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
              {work.map((item) => (
                <WerkCard key={item.slug} item={item} lang={lang} text={w.items[item.slug]} labels={ui.workCard} />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>
      <CtaBand lang={lang} title={t.ctaBand.title} body={t.ctaBand.body} label={ui.cta.demoLang.label} href={ui.cta.demoLang.href} />
      <WhatsAppFab afterId="cases" untilId="cta" label={ui.fab.label} aria={ui.fab.aria} />
    </main>
  );
}
```

- [ ] **Step 6: `app/[lang]/(site)/werk/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfterSlider } from "@/components/mock/BeforeAfterSlider";
import { WerkCard } from "@/components/sections/WerkCard";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { href, langOf, type SlugParams } from "@/lib/i18n/paths";
import { site } from "@/lib/site";
import { cases, getCase, work } from "@/lib/work";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = langOf(raw);
  const c = getCase(slug);
  if (!c) return {};
  const { pages, work: w } = getDict(lang);
  const copy = w.cases[c.slug];
  return pageMetadata(
    lang,
    "werk",
    { title: pages.case.metaTitle(c.title, copy.branche, c.plaats), description: copy.intro },
    { slug: c.slug, type: "article" },
  );
}

export default async function CasePage({ params }: SlugParams) {
  const { lang: raw, slug } = await params;
  const lang = langOf(raw);
  const c = getCase(slug);
  if (!c) notFound();
  const { pages, ui, work: w } = getDict(lang);
  const t = pages.case;
  const copy = w.cases[c.slug];
  const others = work.filter((x) => x.client && x.slug !== c.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: t.schemaName(c.title),
    description: copy.intro,
    url: `${site.url}${href(lang, "werk", c.slug)}`,
    image: `${site.url}${c.desktop}`,
    creator: { "@type": "ProfessionalService", name: site.name, url: site.url },
    about: { "@type": "Organization", name: c.title, url: c.url },
  };

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        lang={lang}
        crumbs={[{ label: pages.werk.crumb, href: href(lang, "werk") }, { label: c.title }]}
        title={c.title}
        lead={copy.intro}
        actions={
          <>
            <Button href={c.url} variant="ghost" target="_blank" rel="noopener noreferrer">
              {t.viewSite}
            </Button>
            <span className="text-[13.5px] text-faint">{`${copy.branche} · ${c.plaats}`}</span>
          </>
        }
      />

      <section className="px-[clamp(20px,5vw,64px)] pb-6 md:pb-10">
        <Container>
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line shadow-photo">
              <Image src={c.desktop} alt={t.desktopAlt(c.title)} fill priority sizes="(max-width: 1140px) 100vw, 1140px" className="object-cover object-top" />
            </div>
          </Reveal>
        </Container>
      </section>

      <Section id="case" variant="base">
        <Container>
          <div className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-3">
            <Reveal>
              <h3 className="mb-4 font-display text-[15px] font-semibold text-ink">{t.situation}</h3>
              <p className="text-[16px] leading-[1.7] text-muted">{copy.situatie}</p>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="mb-4 font-display text-[15px] font-semibold text-ink">{t.approach}</h3>
              <ul className="flex flex-col gap-3 text-[15px] leading-[1.6] text-muted">
                {copy.aanpak.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <span className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full bg-accent" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={160}>
              <h3 className="mb-4 font-display text-[15px] font-semibold text-ink">{t.result}</h3>
              <ul className="flex flex-col gap-3 text-[15px] leading-[1.6] text-ink">
                {copy.resultaat.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full bg-accent" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {c.voorNa && copy.voorNaAlt && (
        <Section>
          <Container>
            <Reveal className="grid grid-cols-1 items-center gap-12 min-[901px]:grid-cols-[1fr_0.9fr]">
              <div>
                <Eyebrow>{t.voorNa.eyebrow}</Eyebrow>
                <SectionTitle className="max-w-[16ch]">{t.voorNa.title}</SectionTitle>
                <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.65] text-muted">{t.voorNa.lead}</p>
              </div>
              <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[22px] border border-line shadow-card">
                <BeforeAfterSlider beforeSrc={c.voorNa.voor} afterSrc={c.voorNa.na} beforeAlt={copy.voorNaAlt.voor} afterAlt={copy.voorNaAlt.na} labels={ui.voorNa} className="aspect-[3/4]" />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {copy.quote && (
        <Section variant="base">
          <Container>
            <Reveal className="mx-auto max-w-[760px] text-center">
              <p className="font-display text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.35] tracking-[-0.02em]">&ldquo;{copy.quote.text}&rdquo;</p>
              <p className="mt-5 text-[14px] text-muted">{copy.quote.author}</p>
            </Reveal>
          </Container>
        </Section>
      )}

      {others.length > 0 && (
        <Section>
          <Container>
            <Reveal>
              <SectionTitle className="mb-[44px]">{t.others}</SectionTitle>
              <div className="grid grid-cols-1 gap-[22px] min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
                {others.map((item) => (
                  <WerkCard key={item.slug} item={item} lang={lang} text={w.items[item.slug]} labels={ui.workCard} />
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      <CtaBand lang={lang} title={pages.werk.ctaBand.title} body={pages.werk.ctaBand.body} label={ui.cta.demoLang.label} href={ui.cta.demoLang.href} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WhatsAppFab afterId="case" untilId="cta" label={ui.fab.label} aria={ui.fab.aria} />
    </main>
  );
}
```

- [ ] **Step 7: Typecheck, bouw, commit**

`npx tsc --noEmit` meldt nu nog `voorNa.branche`/`voorAlt` in `websites/page.tsx` (die pagina volgt in Task 10). Los dat tijdelijk niet op; ga direct door met Task 10 en commit beide samen aan het einde van Task 10. Controleer wel `/werk` en `/werk/mourits-schilderwerken` in `npm run dev`: identiek aan voorheen (tag "Demo"/"Eigen project", meta-regels, voor/na-slider).

---

### Task 10: Websites-pagina

**Files:**
- Modify: `app/[lang]/(site)/websites/page.tsx`, `components/sections/Werkwijze.tsx`

- [ ] **Step 1: `components/sections/Werkwijze.tsx`**

Signatuur `export function Werkwijze({ lang }: { lang: Lang })`; `const { pages, services } = getDict(lang);`; titel `{pages.websites.werkwijzeTitle}`; lijst `services.werkwijze.map(...)`. Import uit `@/lib/services` weg.

- [ ] **Step 2: `app/[lang]/(site)/websites/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { FaqList } from "@/components/page/FaqList";
import { Werkwijze } from "@/components/sections/Werkwijze";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfterSlider } from "@/components/mock/BeforeAfterSlider";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { href, langOf, type LangParams } from "@/lib/i18n/paths";
import { pricing, euro } from "@/lib/pricing";
import { cases } from "@/lib/work";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "websites", getDict(lang).pages.websites.meta);
}

export default async function WebsitesPage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, services, ui, work: w } = getDict(lang);
  const t = pages.websites;
  const onderhoud = pricing.hosting.find((h) => h.id === "onderhoud")!;
  const voorNa = cases.find((c) => c.voorNa);
  const voorNaCopy = voorNa ? w.cases[voorNa.slug] : undefined;

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        lang={lang}
        crumbs={[{ label: t.crumb }]}
        title={t.hero.title}
        lead={t.hero.lead}
        actions={
          <>
            <Button href={ui.cta.demoLang.href}>{ui.cta.demoLang.label}</Button>
            <Button href={href(lang, "werk")} variant="ghost">
              {t.hero.secondary}
            </Button>
          </>
        }
        aside={
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line shadow-card">
            <Image src="/images/werk/mourits-desktop.webp" alt={t.hero.asideAlt} fill priority sizes="(max-width: 900px) 100vw, 45vw" className="object-cover object-top" />
          </div>
        }
      />

      <Werkwijze lang={lang} />

      <Section id="nieuw-of-vernieuwen">
        <Container>
          <Reveal>
            <SectionTitle className="mb-[54px] max-w-[720px]">{t.options.title}</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-2">
            {services.websiteOpties.map((o, i) => (
              <Reveal key={o.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-[clamp(24px,2.6vw,34px)]">
                  <span className="mb-[16px] block font-mono text-[12px] leading-none text-accent">0{i + 1}</span>
                  <h3 className="mb-[10px] font-display text-[clamp(22px,2.2vw,26px)] font-semibold tracking-[-0.02em]">{o.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-muted">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="wat-je-krijgt" variant="base">
        <Container>
          <Reveal className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionTitle className="max-w-[14ch]">{t.included.title}</SectionTitle>
              <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.65] text-muted">{t.included.lead(euro(pricing.website.from))}</p>
            </div>
            {/* Opsomming zonder kaders: een kader staat op deze site voor iets wat je kunt kopen of kiezen. */}
            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 self-center text-[15px] leading-[1.55] min-[561px]:grid-cols-2">
              {services.websiteInbegrepen.map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <span className="mt-[8px] h-[7px] w-[7px] flex-none rounded-full bg-accent" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section id="wat-kost-het">
        <Container>
          <Reveal className="grid grid-cols-1 items-center gap-12 min-[901px]:grid-cols-[1fr_1fr]">
            <div>
              <SectionTitle className="max-w-[16ch]">{t.price.title(euro(pricing.website.from))}</SectionTitle>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.65] text-muted">{t.price.lead(services.websiteNote, euro(onderhoud.monthly))}</p>
              <div className="mt-8 flex flex-wrap gap-[14px]">
                <Button href={ui.cta.demoLang.href}>{ui.cta.demoLang.label}</Button>
                <Button href={href(lang, "hosting")} variant="ghost">
                  {t.price.moreHosting}
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-panel p-[clamp(24px,2.6vw,34px)]">
              <div className="flex items-baseline justify-between border-b border-line pb-4">
                <span className="font-display text-[18px] font-semibold">{t.price.card.name}</span>
                <span className="font-display text-[clamp(26px,2.6vw,32px)] font-semibold tracking-[-0.02em]">{t.price.card.from(euro(pricing.website.from))}</span>
              </div>
              <ul className="mt-4 flex flex-col gap-2 text-[14.5px] text-muted">
                {t.price.card.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="mt-6 flex items-baseline justify-between border-t border-line pt-4 text-[14.5px]">
                <span className="text-muted">{t.price.card.hostingRow}</span>
                <span className="text-ink">{t.price.card.perMonth(euro(onderhoud.monthly))}</span>
              </div>
              <p className="mt-3 text-[12.5px] text-faint">{t.price.card.vat}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {voorNa?.voorNa && voorNaCopy?.voorNaAlt && (
        <Section id="voor-na" variant="base">
          <Container>
            <Reveal className="grid grid-cols-1 items-center gap-12 min-[901px]:grid-cols-[1fr_0.9fr]">
              <div>
                <Eyebrow>{t.voorNa.eyebrow}</Eyebrow>
                <SectionTitle className="max-w-[16ch]">{t.voorNa.title}</SectionTitle>
                <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.65] text-muted">{t.voorNa.lead(voorNa.title, voorNaCopy.branche, voorNa.plaats)}</p>
                <a href={href(lang, "werk", voorNa.slug)} className="mt-5 inline-flex items-center gap-2 py-1 text-[15px] font-medium text-ink underline-offset-4 hover:underline">
                  {t.voorNa.link} <ArrowRight size={16} weight="bold" aria-hidden />
                </a>
              </div>
              <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[22px] border border-line shadow-card">
                <BeforeAfterSlider beforeSrc={voorNa.voorNa.voor} afterSrc={voorNa.voorNa.na} beforeAlt={voorNaCopy.voorNaAlt.voor} afterAlt={voorNaCopy.voorNaAlt.na} labels={ui.voorNa} className="aspect-[3/4]" />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      <Section id="faq">
        <Container>
          <Reveal className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>{ui.faq.eyebrow}</Eyebrow>
              <SectionTitle className="max-w-[12ch]">{ui.faq.title}</SectionTitle>
            </div>
            <FaqList items={services.websiteFaq} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand lang={lang} title={t.ctaBand.title} body={t.ctaBand.body} label={ui.cta.demoLang.label} href={ui.cta.demoLang.href} />
      <WhatsAppFab afterId="nieuw-of-vernieuwen" untilId="cta" label={ui.fab.label} aria={ui.fab.aria} />
    </main>
  );
}
```

- [ ] **Step 3: Typecheck, bouw, vergelijk, commit (Task 9 + 10 samen)**

Run: `npx tsc --noEmit && npm run build` — Expected: geen fouten. In `npm run dev`: `/websites` identiek (let op de zin "Incl. btw. De exacte prijs hoor je …" en de voor/na-tekst "Mourits Schilderwerken, schildersbedrijf in Klaaswaal.").

```bash
git add -A
git commit -m "Werk, cases en websites lezen uit het woordenboek; lib/work.ts taalneutraal"
```

---

### Task 11: Hosting-pagina en PlanCard

**Files:**
- Modify: `components/page/PlanCard.tsx`, `app/[lang]/(site)/hosting/page.tsx`

- [ ] **Step 1: `components/page/PlanCard.tsx`**

```tsx
import { Button } from "@/components/ui/Button";
import { euro } from "@/lib/pricing";

type PlanNumbers = { id: string; monthly: number; featured: boolean };
export type PlanCopy = { name: string; summary: string; includes: readonly string[]; excludes: readonly string[]; fairUse?: string };
export type PlanLabels = { mostChosen: string; perMonthShort: string; choose: (name: string) => string };

export function PlanCard({ plan, copy, labels, href }: { plan: PlanNumbers; copy: PlanCopy; labels: PlanLabels; href: string }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-[clamp(24px,2.6vw,34px)] ${
        plan.featured ? "border-accent/50 bg-panel shadow-card-accent" : "border-line bg-panel"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-on-accent">
          {labels.mostChosen}
        </span>
      )}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[clamp(20px,2vw,24px)] font-semibold tracking-[-0.02em]">{copy.name}</h3>
        <div className="text-right">
          <span className="font-display text-[clamp(26px,2.6vw,32px)] font-semibold tracking-[-0.02em]">{euro(plan.monthly)}</span>
          <span className="ml-1 text-[13px] text-muted">{labels.perMonthShort}</span>
        </div>
      </div>
      <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">{copy.summary}</p>
      <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5 text-[14.5px] leading-[1.5]">
        {copy.includes.map((x) => (
          <li key={x} className="flex items-start gap-3">
            <span className="mt-[8px] h-[6px] w-[6px] flex-none rounded-full bg-accent" aria-hidden />
            {x}
          </li>
        ))}
        {copy.excludes.map((x) => (
          <li key={x} className="flex items-start gap-3 text-faint">
            <span className="mt-[8px] h-[6px] w-[6px] flex-none rounded-full border border-line" aria-hidden />
            {x}
          </li>
        ))}
      </ul>
      {copy.fairUse && <p className="mt-4 text-[12.5px] leading-[1.5] text-faint">{copy.fairUse}</p>}
      <div className="mt-auto pt-6">
        <Button href={href} variant={plan.featured ? "primary" : "ghost"} className="w-full">
          {labels.choose(copy.name)}
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: `app/[lang]/(site)/hosting/page.tsx`**

Mailbox-staffels worden op volgorde gekoppeld (eerste = één mailbox, tweede = twee tot vijf); dat werkt met de huidige én met de opgeschoonde `pricing.ts` uit Task 16.

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { FaqList } from "@/components/page/FaqList";
import { PlanCard } from "@/components/page/PlanCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { href, langOf, type LangParams } from "@/lib/i18n/paths";
import { liveHosting, pricing, euro } from "@/lib/pricing";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "hosting", getDict(lang).pages.hosting.meta);
}

export default async function HostingPage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, services, ui } = getDict(lang);
  const t = pages.hosting;
  const mailbox = pricing.addons.find((a) => a.id === "mailbox")!;
  const tierPrice = (id: "one" | "multi") => mailbox.tiers.find((t) => t.id === id)!.monthly;
  const tiers = [
    { id: "one", label: services.mailbox.tiers.one, monthly: tierPrice("one") },
    { id: "multi", label: services.mailbox.tiers.multi, monthly: tierPrice("multi") },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.schema.name,
    serviceType: t.schema.serviceType,
    provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    areaServed: "NL",
    url: `${site.url}${href(lang, "hosting")}`,
    offers: liveHosting.map((h) => ({
      "@type": "Offer",
      name: services.plans[h.id].name,
      description: services.plans[h.id].summary,
      price: h.monthly.toFixed(2),
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: h.monthly.toFixed(2),
        priceCurrency: "EUR",
        unitText: t.schema.unit,
        valueAddedTaxIncluded: true,
      },
    })),
  };

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        lang={lang}
        crumbs={[{ label: t.crumb }]}
        title={t.hero.title}
        lead={t.hero.lead}
        actions={
          <>
            <Button href="#pakketten">{t.hero.primary}</Button>
            <Button href="#overstappen" variant="ghost">
              {t.hero.secondary}
            </Button>
          </>
        }
        aside={
          <div className="rounded-2xl border border-line bg-panel p-[clamp(22px,2.4vw,30px)]">
            <p className="text-[12px] uppercase tracking-[0.14em] text-faint">{t.hero.asideLabel}</p>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 text-[14.5px] min-[561px]:grid-cols-2">
              {services.hostingAltijd.map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <span className="mt-[8px] h-[6px] w-[6px] flex-none rounded-full bg-accent" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section id="pakketten">
        <Container>
          <Reveal>
            <SectionTitle className="mb-4 max-w-[720px]">{t.packages.title}</SectionTitle>
            <p className="mb-[54px] max-w-[52ch] text-[16px] leading-[1.65] text-muted">{t.packages.lead(euro(tierPrice("one")))}</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-2">
            {liveHosting.map((h, i) => (
              <Reveal key={h.id} delay={i * 80}>
                <PlanCard plan={h} copy={services.plans[h.id]} labels={ui.plan} href={`${ui.cta.hosting.href}&pakket=${h.id}`} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-[18px] flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-panel/60 px-[clamp(20px,2.4vw,30px)] py-5">
              <div>
                <span className="font-display text-[17px] font-semibold">{services.mailbox.name}</span>
                <span className="ml-3 text-[14px] text-muted">
                  {services.mailbox.summary} {t.packages.everyPlan}
                </span>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                {tiers.map((tier) => (
                  <span key={tier.id} className="font-display text-[20px] font-semibold tracking-[-0.02em]">
                    {euro(tier.monthly)} <span className="text-[13px] font-normal text-muted">{t.packages.tierPerMonth(tier.label)}</span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="domein-en-email" variant="base">
        <Container>
          <Reveal className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[1fr_1fr]">
            <div>
              <Eyebrow>{t.domain.eyebrow}</Eyebrow>
              <SectionTitle className="max-w-[16ch]">{t.domain.title}</SectionTitle>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.65] text-muted">{t.domain.p1(services.domains.included, services.domains.other)}</p>
              <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.65] text-muted">
                {t.domain.p2(euro(tierPrice("one")), euro(tierPrice("multi")), mailbox.quotaGb, services.mailbox.more)}
              </p>
            </div>
            <div className="self-center rounded-2xl border border-line bg-panel p-[clamp(22px,2.4vw,30px)]">
              <table className="w-full text-[15px]">
                <tbody className="divide-y divide-line">
                  {pricing.domains.table.map((d) => (
                    <tr key={d.tld}>
                      <td className="py-3 font-mono text-[14px] text-ink">{d.tld}</td>
                      <td className="py-3 text-muted">{t.domain.rowDomain}</td>
                      <td className="py-3 text-right text-ink">{euro(d.yearly)}</td>
                    </tr>
                  ))}
                  {tiers.map((tier) => (
                    <tr key={tier.id}>
                      <td className="py-3 font-mono text-[14px] text-ink">@</td>
                      <td className="py-3 text-muted">{t.packages.tierPerMonth(tier.label)}</td>
                      <td className="py-3 text-right text-ink">{euro(tier.monthly)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-[12.5px] text-faint">{t.domain.note}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="overstappen">
        <Container>
          <Reveal>
            <SectionTitle className="mb-4 max-w-[720px]">{t.switch.title}</SectionTitle>
            <p className="mb-14 max-w-[52ch] text-[16px] leading-[1.65] text-muted">{t.switch.lead}</p>
            <div className="grid grid-cols-1 gap-[clamp(24px,4vw,56px)] min-[901px]:grid-cols-3">
              {services.overstappen.map((s) => (
                <div key={s.n}>
                  <div className="mb-[18px] flex items-center gap-[14px]">
                    <span className="h-[11px] w-[11px] rounded-full bg-accent shadow-dot" aria-hidden />
                    <span className="font-mono text-[13px] text-faint">{s.n}</span>
                  </div>
                  <h3 className="mb-[10px] font-display text-[20px] font-semibold">{s.title}</h3>
                  <p className="max-w-[300px] text-[15px] leading-[1.6] text-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="faq" variant="base">
        <Container>
          <Reveal className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>{ui.faq.eyebrow}</Eyebrow>
              <SectionTitle className="max-w-[12ch]">{ui.faq.title}</SectionTitle>
            </div>
            <FaqList items={services.hostingFaq} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand lang={lang} title={t.ctaBand.title} body={t.ctaBand.body} label={ui.cta.hosting.label} href={ui.cta.hosting.href} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WhatsAppFab afterId="pakketten" untilId="cta" label={ui.fab.label} aria={ui.fab.aria} />
    </main>
  );
}
```

- [ ] **Step 3: Typecheck, bouw, vergelijk, commit**

Run: `npx tsc --noEmit && npm run build`. In `npm run dev` op `/hosting`: pakketkaarten, mailbox-regel ("1 mailbox, per maand", "2 tot 5 mailboxen, per maand"), domeintabel en FAQ identiek.

```bash
git add -A
git commit -m "Hosting en PlanCard lezen uit het woordenboek"
```

---

### Task 12: Hulp-pagina

**Files:**
- Modify: `app/[lang]/(site)/hulp/page.tsx`

- [ ] **Step 1: Herschrijf de pagina**

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { FaqList } from "@/components/page/FaqList";
import { StickyCallBar } from "@/components/page/StickyCallBar";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { whatsapp, tel, telDisplay } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { href, langOf, type LangParams } from "@/lib/i18n/paths";
import { pricing, euro } from "@/lib/pricing";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "hulp", getDict(lang).pages.hulp.meta);
}

export default async function HulpPage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, services, ui } = getDict(lang);
  const t = pages.hulp;
  const h = pricing.hulp;
  const tarief = services.hulpTarief;
  const apkPrijs = { "computer-apk": h.apk.computer, "website-apk": h.apk.website };
  const apk = (id: "computer-apk" | "website-apk") => t.apk.items.find((a) => a.id === id)!;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.schema.name,
    serviceType: t.schema.serviceType,
    provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name })),
    url: `${site.url}${href(lang, "hulp")}`,
    offers: [
      { "@type": "Offer", name: t.schema.perQuarter, price: h.quarter.toFixed(2), priceCurrency: "EUR", priceSpecification: { "@type": "UnitPriceSpecification", price: h.quarter.toFixed(2), priceCurrency: "EUR", unitText: t.schema.unit, valueAddedTaxIncluded: true } },
      { "@type": "Offer", name: apk("computer-apk").title, price: h.apk.computer.toFixed(2), priceCurrency: "EUR" },
      { "@type": "Offer", name: apk("website-apk").title, price: h.apk.website.toFixed(2), priceCurrency: "EUR" },
      { "@type": "Offer", name: t.schema.card(h.card.quarters), price: h.card.price.toFixed(2), priceCurrency: "EUR" },
    ],
  };

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        lang={lang}
        crumbs={[{ label: t.crumb }]}
        title={t.hero.title}
        lead={t.hero.lead}
        actions={
          <>
            <Button href={tel}>
              {ui.cta.call} {telDisplay}
            </Button>
            <Button href={whatsapp} variant="ghost" target="_blank" rel="noopener noreferrer">
              {ui.cta.whatsapp}
            </Button>
          </>
        }
        aside={
          <div className="rounded-2xl border border-accent/40 bg-panel p-[clamp(22px,2.4vw,30px)] shadow-card-accent">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[12px] uppercase tracking-[0.14em] text-faint">{t.hero.aside.rate}</span>
              <span className="text-[12.5px] text-faint">{t.hero.aside.vat}</span>
            </div>
            <div className="mt-2 font-display text-[clamp(30px,3.2vw,40px)] font-semibold tracking-[-0.03em]">
              {euro(h.quarter)} <span className="text-[16px] font-normal text-muted">{t.hero.aside.perQuarter}</span>
            </div>
            <p className="mt-3 text-[14.5px] leading-[1.55] text-muted">
              {tarief.billing} {tarief.travel}
            </p>
            <div className="mt-5 border-t border-line pt-5">
              <p className="font-display text-[18px] font-semibold text-ink">{tarief.guarantee.line}</p>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-muted">{t.hero.aside.guaranteeBody}</p>
            </div>
          </div>
        }
      />

      <Section id="apk">
        <Container>
          <Reveal>
            <SectionTitle className="mb-[54px] max-w-[720px]">{t.apk.title}</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-2">
            {t.apk.items.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-[clamp(24px,2.6vw,34px)]">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[clamp(22px,2.2vw,26px)] font-semibold tracking-[-0.02em]">{a.title}</h3>
                    <span className="font-display text-[clamp(24px,2.4vw,30px)] font-semibold tracking-[-0.02em]">{euro(apkPrijs[a.id])}</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-[1.6] text-muted">{a.body}</p>
                  <div className="mt-auto pt-6">
                    <Button href={`${ui.cta.hulp.href}&pakket=${a.id}`} variant="ghost">
                      {t.apk.plan(a.title)}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 text-[14px] text-faint">{t.apk.card(h.card.quarters, euro(h.card.price), tarief.cardValidity)}</p>
          </Reveal>
        </Container>
      </Section>

      <Section id="waar-ik-bij-help" variant="base">
        <Container>
          <Reveal>
            <Eyebrow>{t.help.eyebrow}</Eyebrow>
            <SectionTitle className="mb-[54px] max-w-[720px]">{t.help.title}</SectionTitle>
          </Reveal>
          {/* Zelfde vorm als "Zo werk ik" op de homepage: punt, kop, één regel. Geen kaders voor een opsomming. */}
          <div className="grid grid-cols-1 gap-x-[clamp(24px,4vw,48px)] gap-y-8 min-[561px]:grid-cols-2">
            {services.hulpHelp.map((x, i) => (
              <Reveal key={x.title} delay={(i % 2) * 60} className="flex items-start gap-[14px]">
                <span className="mt-2 h-[9px] w-[9px] flex-none rounded-full bg-accent shadow-dot" aria-hidden />
                <div>
                  <h3 className="mb-[6px] font-display text-[17px] font-semibold">{x.title}</h3>
                  <p className="text-[14.5px] leading-[1.55] text-muted">{x.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-12 grid grid-cols-1 gap-8 rounded-2xl border border-line p-[clamp(22px,2.6vw,34px)] min-[901px]:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h3 className="font-display text-[20px] font-semibold tracking-[-0.01em]">{t.help.notTitle}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">{t.help.notBody}</p>
              </div>
              <ul className="grid grid-cols-1 gap-2.5 self-center text-[14.5px] text-muted min-[561px]:grid-cols-2">
                {services.hulpNiet.map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <span className="mt-[8px] h-[6px] w-[6px] flex-none rounded-full border border-line" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="hoe-het-werkt">
        <Container>
          <Reveal>
            <SectionTitle className="mb-14 max-w-[720px]">{t.how.title}</SectionTitle>
            <div className="grid grid-cols-1 gap-[clamp(24px,4vw,56px)] min-[901px]:grid-cols-3">
              {services.hulpStappen.map((s) => (
                <div key={s.n}>
                  <div className="mb-[18px] flex items-center gap-[14px]">
                    <span className="h-[11px] w-[11px] rounded-full bg-accent shadow-dot" aria-hidden />
                    <span className="font-mono text-[13px] text-faint">{s.n}</span>
                  </div>
                  <h3 className="mb-[10px] font-display text-[20px] font-semibold">{s.title}</h3>
                  <p className="max-w-[300px] text-[15px] leading-[1.6] text-muted">{s.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-14 max-w-[60ch] text-[15px] leading-[1.65] text-muted">
              <span className="text-ink">{t.how.homeLead}</span>
              {" "}
              {t.how.homeBody(euro(h.quarter))}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section id="faq" variant="base">
        <Container>
          <Reveal className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>{ui.faq.eyebrow}</Eyebrow>
              <SectionTitle className="max-w-[12ch]">{ui.faq.title}</SectionTitle>
            </div>
            <FaqList items={services.hulpFaq} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand lang={lang} title={t.ctaBand.title} body={t.ctaBand.body} label={ui.cta.hulp.label} href={ui.cta.hulp.href} />
      <StickyCallBar afterId="apk" untilId="cta" labels={ui.stickyBar} />
      <WhatsAppFab afterId="apk" untilId="cta" className="max-[900px]:hidden" label={ui.fab.label} aria={ui.fab.aria} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
```

- [ ] **Step 2: Typecheck, bouw, vergelijk, commit**

Run: `npx tsc --noEmit && npm run build`. In `npm run dev` op `/hulp`: let op de regel "Ook thuis vastgelopen? Ik help ook particulieren…" (de spatie na het vraagteken staat als `{" "}` in de JSX, niet in `homeBody`) en de strippenkaart-regel.

```bash
git add -A
git commit -m "Hulp leest uit het woordenboek"
```

---

### Task 13: Contact-pagina, aanvraagformulier en server action

**Files:**
- Modify: `components/sections/AanvraagForm.tsx`, `components/sections/Contact.tsx`, `app/actions/contact.ts`, `app/[lang]/(site)/contact/page.tsx`

- [ ] **Step 1: `components/sections/AanvraagForm.tsx`**

Alle strings komen uit `t` (type `UiDict["form"]`, alleen strings dus serialiseerbaar). Het formulier stuurt een verborgen veld `lang` mee.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { aanvraagIds, isAanvraagKeuze, type AanvraagKeuze } from "@/lib/aanvraag";
import type { Lang } from "@/lib/i18n/paths";
import type { UiDict } from "@/lib/i18n/nl/ui";
import { sendAanvraag } from "@/app/actions/contact";

export type FormCopy = UiDict["form"];

const field =
  "w-full rounded-[10px] border border-line bg-field px-[14px] py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-accent/60";
const label = "flex flex-col gap-[7px] text-[13px] text-muted";
const errorCls = "text-[13px] leading-[1.4] text-danger";

type Errors = { naam?: string; email?: string };
type Status = "idle" | "sending" | "ok" | "error";

function validate(d: FormData, t: FormCopy): Errors {
  const e: Errors = {};
  if (!String(d.get("naam") || "").trim()) e.naam = t.errors.name;
  const email = String(d.get("email") || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t.errors.email;
  return e;
}

function buildMailto(d: FormData, t: FormCopy) {
  const voorId = d.get("voor");
  const voor = isAanvraagKeuze(voorId) ? t.choices[voorId].label : "";
  const f = t.mailtoFields;
  const body = [
    `${f.voor}: ${voor}`,
    `${f.naam}: ${d.get("naam") || ""}`,
    `${f.email}: ${d.get("email") || ""}`,
    `${f.telefoon}: ${d.get("telefoon") || ""}`,
    `${f.website}: ${d.get("website") || ""}`,
    `${f.bedrijf}: ${d.get("bedrijf") || ""}`,
    "",
    `${d.get("bericht") || ""}`,
  ].join("\n");
  const subject = t.mailtoSubject.replace("{voor}", voor.toLowerCase());
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Kwalificerend aanvraagformulier met "Waarvoor?"-keuze. Verstuurt via de server action
 * (Resend); kan de server niet mailen (`canSend` false), dan opent het mailprogramma.
 * Voorselectie via `?voor=` en `?pakket=` in de URL.
 */
export function AanvraagForm({ lang, t, initial = "website", canSend = false }: { lang: Lang; t: FormCopy; initial?: AanvraagKeuze; canSend?: boolean }) {
  const [voor, setVoor] = useState<AanvraagKeuze>(initial);
  const [bericht, setBericht] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fallback, setFallback] = useState<string | null>(null);
  const [opened, setOpened] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const packageInterest = t.packageInterest;
  // Pakketnamen via een ref: het object is elke render nieuw en hoort niet in de deps.
  const namesRef = useRef(t.packageNames);
  namesRef.current = t.packageNames;

  useEffect(() => {
    setOpened(Date.now());
    const apply = () => {
      const raw = `${window.location.search}${window.location.hash}`;
      const v = raw.match(/[?&]voor=([a-z]+)/)?.[1];
      if (isAanvraagKeuze(v)) setVoor(v);
      const pk = raw.match(/[?&]pakket=([a-z-]+)/)?.[1];
      if (pk) {
        const names = namesRef.current;
        const naam = Object.hasOwn(names, pk)
          ? names[pk as keyof typeof names]
          : `${pk.charAt(0).toUpperCase()}${pk.slice(1)}`;
        setBericht((cur) => cur || packageInterest.replace("{pakket}", naam));
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [packageInterest]);

  const keuze = t.choices[voor];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("_gotcha")) return;

    // Inline controle vóór versturen: fout onder het veld, focus op het eerste foute veld.
    const errs = validate(d, t);
    setErrors(errs);
    const first = (Object.keys(errs) as Array<keyof Errors>)[0];
    if (first) {
      form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (!canSend) {
      window.location.href = buildMailto(d, t);
      return;
    }

    setStatus("sending");
    const res = await sendAanvraag(d);
    if (res.ok) {
      form.reset();
      setBericht("");
      setStatus("ok");
      try {
        track("form_submit", { voor, lang });
      } catch {}
    } else {
      setFallback(buildMailto(d, t));
      setStatus("error");
    }
  }

  return (
    <form id="aanvraag" ref={formRef} onSubmit={onSubmit} noValidate className="mx-auto flex max-w-[560px] flex-col gap-[14px] text-left">
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <input type="hidden" name="_t" value={opened} />
      <input type="hidden" name="lang" value={lang} />

      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-[10px] text-[13px] text-muted">{t.legend}</legend>
        <div className="flex flex-wrap gap-2">
          {aanvraagIds.map((id) => {
            const active = id === voor;
            return (
              <label
                key={id}
                className={`cursor-pointer select-none rounded-full border px-[15px] py-[9px] text-[14px] transition-[border-color,background-color,color,transform] duration-200 active:scale-[0.98] active:duration-[120ms] ${
                  active ? "border-accent/60 bg-accent/12 text-ink" : "border-line text-muted hover:border-accent/40 hover:text-ink"
                }`}
              >
                <input type="radio" name="voor" value={id} checked={active} onChange={() => setVoor(id)} className="sr-only" />
                {t.choices[id].label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[14px]">
        <label className={label}>
          <span>
            {t.name} <span className="text-faint">{t.required}</span>
          </span>
          <input
            name="naam"
            required
            autoComplete="name"
            aria-invalid={errors.naam ? true : undefined}
            aria-describedby={errors.naam ? "fout-naam" : undefined}
            onInput={() => errors.naam && setErrors((e) => ({ ...e, naam: undefined }))}
            className={`${field} aria-invalid:border-danger/70`}
          />
          {errors.naam && (
            <span id="fout-naam" className={errorCls}>
              {errors.naam}
            </span>
          )}
        </label>
        <label className={label}>
          <span>
            {t.email} <span className="text-faint">{t.required}</span>
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "fout-email" : undefined}
            onInput={() => errors.email && setErrors((e) => ({ ...e, email: undefined }))}
            className={`${field} aria-invalid:border-danger/70`}
          />
          {errors.email && (
            <span id="fout-email" className={errorCls}>
              {errors.email}
            </span>
          )}
        </label>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[14px]">
        <label className={label}>
          {t.phone}
          <input type="tel" name="telefoon" autoComplete="tel" className={field} />
        </label>
        <label className={label}>
          {t.website}
          <input name="website" placeholder={t.websitePlaceholder} className={field} />
        </label>
      </div>
      <label className={label}>
        {t.company}
        <input name="bedrijf" placeholder={t.companyPlaceholder} className={field} />
      </label>
      <label className={label}>
        {t.message}
        <textarea name="bericht" rows={4} placeholder={t.messagePlaceholder} value={bericht} onChange={(e) => setBericht(e.target.value)} className={`${field} resize-y`} />
      </label>
      <Button type="submit" className="w-full sm:w-auto sm:self-center">
        {status === "sending" ? t.sending : keuze.submit}
      </Button>
      <p className="mt-1 text-center text-[12.5px] text-muted">
        <Link href={t.privacyHref} className="inline-block py-1 underline underline-offset-2 transition-colors hover:text-ink">
          {t.privacy}
        </Link>
      </p>
      <div role="status" aria-live="polite" className="min-h-[18px] text-center text-[13.5px] text-faint">
        {status === "ok" && <span className="text-accent-bright">{t.ok}</span>}
        {status === "error" && fallback && (
          <span>
            {t.failed}{" "}
            <a href={fallback} className="underline">
              {site.email}
            </a>
            .
          </span>
        )}
      </div>
    </form>
  );
}
```

Let op: de `pakket`-regex accepteert nu ook een koppelteken (`computer-apk`), zoals de hulp-pagina meegeeft; voorheen matchte `[a-z]+` alleen `computer`. Dat is een correctie van een bestaande bug en wijzigt geen weergave.

- [ ] **Step 2: `components/sections/Contact.tsx`**

Vervang `<AanvraagForm canSend={sendable} />` door `<AanvraagForm lang={lang} t={getDict(lang).ui.form} canSend={sendable} />`.

- [ ] **Step 3: `app/actions/contact.ts`**

Vervang de import `import { aanvraagKeuzes } from "@/lib/services";` door:

```ts
import { getDict } from "@/lib/i18n";
import { isAanvraagKeuze } from "@/lib/aanvraag";
```

en het blok vanaf `const naam = clean(...)` tot en met het `resend.emails.send`-object door:

```ts
  const lang = formData.get("lang") === "en" ? "en" : "nl";
  const naam = clean(formData.get("naam"), 120);
  const email = clean(formData.get("email"), 200);
  const voorId = clean(formData.get("voor"), 20);
  // De mail aan Nathaniel is altijd Nederlands; de taal van de aanvraag staat erin.
  const choices = getDict("nl").ui.form.choices;
  const voor = isAanvraagKeuze(voorId) ? choices[voorId].label : choices.anders.label;
  const website = clean(formData.get("website"), 300);
  const bedrijf = clean(formData.get("bedrijf"), 200);
  const telefoon = clean(formData.get("telefoon"), 40);
  const bericht = String(formData.get("bericht") ?? "").trim().slice(0, 4000);

  if (!naam || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "invalid" };

  const to = process.env.CONTACT_TO || site.email;
  const from = process.env.RESEND_FROM || `HitzDigital <formulier@hitzdigital.nl>`;
  const text = [
    lang === "en" ? "Taal van aanvraag: Engels" : null,
    `Waarvoor: ${voor}`,
    `Naam: ${naam}`,
    `E-mail: ${email}`,
    telefoon ? `Telefoon: ${telefoon}` : null,
    website ? `Website: ${website}` : null,
    bedrijf ? `Bedrijf en plaats: ${bedrijf}` : null,
    "",
    bericht || "(geen toelichting)",
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `${lang === "en" ? "[EN] " : ""}Aanvraag ${voor.toLowerCase()} via hitzdigital.nl: ${naam}`,
      text,
    });
```
De rest van de functie blijft gelijk.

- [ ] **Step 4: `app/[lang]/(site)/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { FaqList } from "@/components/page/FaqList";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { MailtoLink } from "@/components/ui/MailtoLink";
import { AanvraagForm } from "@/components/sections/AanvraagForm";
import { canSend } from "@/app/actions/contact";
import { contactEmail, whatsapp, tel, telDisplay } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { href, langOf, type LangParams } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "contact", getDict(lang).pages.contact.meta);
}

export default async function ContactPage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, services, ui } = getDict(lang);
  const t = pages.contact;
  const sendable = await canSend();
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${site.url}${href(lang, "contact")}`,
    name: t.schemaName,
    about: { "@type": "ProfessionalService", name: site.name, telephone: site.phone, email: site.email },
  };

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero lang={lang} crumbs={[{ label: t.crumb }]} title={t.hero.title} lead={t.hero.lead} />
      <Section className="border-t-0 pt-0">
        <Container>
          <div className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <div className="rounded-2xl border border-line bg-panel p-[clamp(20px,2.6vw,34px)]">
                <AanvraagForm lang={lang} t={ui.form} canSend={sendable} />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-col gap-8">
                <div>
                  <Eyebrow>{t.direct.eyebrow}</Eyebrow>
                  <ul className="flex flex-col gap-1.5 text-[16px]">
                    <li>
                      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block py-1 text-ink underline-offset-4 hover:underline">
                        {ui.footer.whatsapp}
                      </a>
                      <span className="text-muted"> · {t.direct.whatsappNote}</span>
                    </li>
                    <li>
                      <a href={tel} className="inline-block py-1 text-ink underline-offset-4 hover:underline">
                        {telDisplay}
                      </a>
                      <span className="text-muted"> · {t.direct.callNote}</span>
                    </li>
                    <li>
                      <MailtoLink href={ui.mailto} className="inline-block py-1 text-ink underline-offset-4 hover:underline">
                        {contactEmail}
                      </MailtoLink>
                    </li>
                  </ul>
                </div>
                <div className="text-[14.5px] leading-[1.65] text-muted">
                  <p className="text-ink">HitzDigital</p>
                  <p>{t.about.place(site.founder, site.city)}</p>
                  {site.kvk ? <p>{t.about.kvk(site.kvk)}</p> : null}
                  <p className="mt-2">{t.about.reply}</p>
                </div>
                <div>
                  <SectionTitle size="sm" className="mb-4 text-[20px]">
                    {t.faqTitle}
                  </SectionTitle>
                  <FaqList items={services.contactFaq} />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
```

- [ ] **Step 5: Typecheck, bouw, test het formulier, commit**

Run: `npx tsc --noEmit && npm run build`. In `npm run dev`: open `/contact?voor=hosting&pakket=onderhoud` → keuze "Hosting & domein" staat aan en het bericht bevat "Ik heb interesse in het pakket Onderhoud."; open `/hulp`, klik "Plan een Computer APK" → bericht "Ik heb interesse in het pakket Computer APK.". Verstuur één testaanvraag (met `RESEND_API_KEY` in `.env.local`) en controleer dat de mail binnenkomt met onderwerp `Aanvraag nieuwe website via hitzdigital.nl: <naam>` en zonder `[EN]`.

```bash
git add -A
git commit -m "Contact, formulier en server action lezen uit het woordenboek; lang-veld in de mail"
```

---

### Task 14: Privacy en voorwaarden

**Files:**
- Create: `lib/i18n/nl/legal-privacy.tsx`, `lib/i18n/nl/legal-terms.tsx`
- Modify: `lib/i18n/nl/index.ts`, `app/[lang]/(site)/privacy/page.tsx`, `app/[lang]/(site)/voorwaarden/page.tsx`

- [ ] **Step 1: Verplaats de privacy-tekst naar `lib/i18n/nl/legal-privacy.tsx`**

Knip in `app/[lang]/(site)/privacy/page.tsx` alles tussen `<Prose>` en `</Prose>` **behalve** de eerste regel `<p className="text-[13.5px] text-faint">Versie {version}, bijgewerkt op {updated}</p>` en plak het ongewijzigd in:

```tsx
import { site } from "@/lib/site";
import { href } from "../paths";

const L = "nl" as const;

/** Body van het privacybeleid. Versie en datum staan in `pages.privacy`. */
export function PrivacyBody() {
  return (
    <>
      {/* … hier de verplaatste JSX … */}
    </>
  );
}
```

Eén wijziging in de verplaatste JSX: `<a href="/voorwaarden">algemene voorwaarden</a>` wordt `<a href={href(L, "voorwaarden")}>algemene voorwaarden</a>`. Alle `{site.…}`-interpolaties blijven werken door de import.

- [ ] **Step 2: Verplaats de voorwaarden-tekst naar `lib/i18n/nl/legal-terms.tsx`**

Zelfde procedure met `app/[lang]/(site)/voorwaarden/page.tsx`: alles tussen `<Prose>` en `</Prose>` behalve de regel `<p className="text-[13.5px] text-faint">Laatst bijgewerkt: {updated}</p>`. De berekeningen bovenin de pagina verhuizen mee en lezen labels uit het NL-servicewoordenboek:

```tsx
import { liveHosting, pricing, euro } from "@/lib/pricing";
import { site } from "@/lib/site";
import { href } from "../paths";
import { services } from "./services";

const L = "nl" as const;

/** Body van de algemene voorwaarden. Datum en losse regels staan in `pages.voorwaarden`. */
export function TermsBody() {
  const webshop = liveHosting.find((h) => h.id === "webshop");
  const mailbox = pricing.addons.find((a) => a.id === "mailbox")!;
  const tierPrice = (id: "one" | "multi") => mailbox.tiers.find((t) => t.id === id)!.monthly;
  const namen = liveHosting.map((h) => services.plans[h.id].name);
  const pakketten = namen.length > 1 ? `${namen.slice(0, -1).join(", ")} of ${namen.at(-1)}` : namen[0];
  return (
    <>
      {/* … hier de verplaatste JSX … */}
    </>
  );
}
```

Vervangingen in de verplaatste JSX: `{pricing.hulp.card.validity}` → `{services.hulpTarief.cardValidity}`; `{euro(mailOne.monthly)}` / `{euro(mailMulti.monthly)}` → `{euro(tierPrice("one"))}` / `{euro(tierPrice("multi"))}`; `{pricing.addons[0].quotaGb}` → `{mailbox.quotaGb}`; `<a href="/privacy">privacybeleid</a>` → `<a href={href(L, "privacy")}>privacybeleid</a>`. Verder niets. (`webshop`, `pakketten`, `euro`, `pricing`, `site` worden precies zo gebruikt als voorheen. De naam "Onderhoud" staat als losse tekst in de JSX, dus een `onderhoud`-const is hier niet nodig.)

- [ ] **Step 3: Registreer de bodies in `lib/i18n/nl/index.ts`**

```ts
import { PrivacyBody } from "./legal-privacy";
import { TermsBody } from "./legal-terms";

export { ui } from "./ui";
export { pages } from "./pages";
export { services } from "./services";
export { work } from "./work";
export const legal = { PrivacyBody, TermsBody };
```

- [ ] **Step 4: De twee pagina's**

`app/[lang]/(site)/privacy/page.tsx`:

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { Prose } from "@/components/page/Prose";
import { Container } from "@/components/layout/Container";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { langOf, type LangParams } from "@/lib/i18n/paths";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "privacy", getDict(lang).pages.privacy.meta);
}

export default async function PrivacyPage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, legal } = getDict(lang);
  const t = pages.privacy;
  const Body = legal.PrivacyBody;
  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero lang={lang} crumbs={[{ label: t.crumb }]} title={t.title} lead={t.lead} />
      <section className="px-[clamp(20px,5vw,64px)] pb-10 md:pb-12">
        <Container>
          <Prose>
            <p className="text-[13.5px] text-faint">{t.versionLine(t.version, t.updated)}</p>
            <Body />
          </Prose>
        </Container>
      </section>
    </main>
  );
}
```

`app/[lang]/(site)/voorwaarden/page.tsx`: identiek van opbouw met `"voorwaarden"`, `pages.voorwaarden`, `legal.TermsBody` en de regel `<p className="text-[13.5px] text-faint">{t.updatedLine(t.updated)}</p>`.

Let op: de oude `privacy/page.tsx` had geen `openGraph` in zijn metadata; `pageMetadata` voegt die toe. Dat is een verbetering in de `<head>`, geen zichtbare wijziging.

- [ ] **Step 5: Typecheck, bouw, vergelijk, commit**

Run: `npx tsc --noEmit && npm run build`. In `npm run dev`: `/privacy` en `/voorwaarden` zijn woordelijk gelijk (vergelijk met `git show main:app/(site)/privacy/page.tsx` als je twijfelt).

```bash
git add -A
git commit -m "Privacy en voorwaarden: body-componenten in het woordenboek"
```

---

### Task 15: Support (alleen NL), OG-afbeeldingen per taal

**Files:**
- Create: `app/[lang]/(site)/privacy/opengraph-image.tsx`, `app/[lang]/(site)/voorwaarden/opengraph-image.tsx`
- Modify: `app/[lang]/(site)/support/page.tsx`, `app/[lang]/(site)/support/[slug]/page.tsx`, `lib/og.tsx`, alle `opengraph-image.tsx` onder `app/[lang]/(site)/`

- [ ] **Step 1: Support-pagina's alleen voor `nl`**

In `app/[lang]/(site)/support/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { langOf, type LangParams } from "@/lib/i18n/paths";
// bestaande imports blijven, behalve `Metadata`-constanten hieronder

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "support", { title, description });
}

export default async function SupportPage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  if (lang !== "nl") notFound(); // support bestaat alleen in het Nederlands (spec §1)
```
Verwijder `export const metadata`, laat `title`/`description` als constanten staan, en geef `PageHero` de prop `lang="nl"`. De strings van deze pagina blijven inline: er komt geen Engelse versie.

In `app/[lang]/(site)/support/[slug]/page.tsx`: params-type `SlugParams`; in `generateMetadata` en de pagina `const lang = langOf(raw); if (lang !== "nl") notFound();` (in `generateMetadata`: `if (lang !== "nl" || !a) return {};`); metadata via `pageMetadata("nl", "support", { title, description: a.summary }, { slug: a.slug, type: "article" })`; `PageHero lang="nl"`; `WhatsAppFab` krijgt `label={ui.fab.label} aria={ui.fab.aria}` met `const { ui } = getDict("nl")`.

- [ ] **Step 2: `lib/og.tsx`: onderregel als parameter**

Signatuur: `export function renderOg({ title, kicker, sub, footer }: { title: string; kicker?: string; sub?: string; footer: string })` en vervang `<span>Puttershoek, Hoeksche Waard</span>` door `<span>{footer}</span>`.

- [ ] **Step 3: OG-afbeeldingen lezen uit het woordenboek**

`app/[lang]/(site)/opengraph-image.tsx`:

```tsx
import { renderOg, ogSize } from "@/lib/og";
import { getDict } from "@/lib/i18n";
import { locales, langOf, type LangParams } from "@/lib/i18n/paths";

export const size = ogSize;
export const contentType = "image/png";

/** Zonder deze params blijft de route dynamisch: de OG-afbeelding wordt dan bij elke request opnieuw gerenderd. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpengraphImage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, ui } = getDict(lang);
  return renderOg({ ...pages.home.og, footer: ui.og.footer });
}
```

Zelfde bestand voor `websites/`, `hosting/`, `hulp/`, `werk/`, `contact/`, `privacy/` en `voorwaarden/` met respectievelijk `pages.websites.og`, `pages.hosting.og`, `pages.hulp.og`, `pages.werk.og`, `pages.contact.og`, `pages.privacy.og` en `pages.voorwaarden.og`. Laat in elk bestand `generateStaticParams` staan, anders wordt de route weer dynamisch.

`privacy/opengraph-image.tsx` en `voorwaarden/opengraph-image.tsx` zijn **nieuw**: `pageMetadata` geeft die twee pagina's sinds Task 14 een eigen `openGraph`-blok, waardoor ze de OG-afbeelding van de `(site)`-laag niet meer erven. Zonder eigen route zouden `/privacy` en `/voorwaarden` helemaal geen `og:image` meer sturen.

`support/opengraph-image.tsx`: behoud de drie strings, voeg `footer: getDict("nl").ui.og.footer` toe en laat `generateStaticParams` `[{ lang: "nl" }]` teruggeven — support bestaat alleen in het Nederlands (spec §1), dus `locales` zou vanaf Task 18 een overbodige EN-variant prerenderen. De import van `locales` vervalt daarmee.

`werk/[slug]/opengraph-image.tsx`:

```tsx
import { renderOg, ogSize } from "@/lib/og";
import { getDict } from "@/lib/i18n";
import { langOf, type SlugParams } from "@/lib/i18n/paths";
import { cases, getCase } from "@/lib/work";

export const size = ogSize;
export const contentType = "image/png";

/** Alleen de slugs; de `lang` komt uit generateStaticParams van de layout. */
export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export default async function OpengraphImage({ params }: SlugParams) {
  const { lang: raw, slug } = await params;
  const lang = langOf(raw);
  const { pages, ui, work } = getDict(lang);
  const c = getCase(slug);
  const copy = c ? work.cases[c.slug] : undefined;
  return renderOg({
    title: c ? pages.case.ogTitle(c.title) : pages.case.ogFallback.title,
    kicker: c && copy ? `${copy.branche} · ${c.plaats}` : pages.case.ogFallback.kicker,
    sub: copy?.intro,
    footer: ui.og.footer,
  });
}
```

- [ ] **Step 4: Typecheck, bouw, controleer OG, commit**

Run: `npx tsc --noEmit && npm run build`. Start `npm start`, open `http://localhost:3111/opengraph-image`, `/hulp/opengraph-image` en `/werk/mourits-schilderwerken/opengraph-image`: zelfde afbeeldingen als voorheen.

```bash
git add -A
git commit -m "Support alleen NL; OG-afbeeldingen per taal uit het woordenboek"
```

---

### Task 16: Sitemap, schema, opschonen (pricing, content, services)

**Files:**
- Modify: `app/sitemap.ts`, `lib/site.ts`, `app/[lang]/layout.tsx`, `lib/pricing.ts`, `lib/content.ts`
- Delete: `lib/services.ts`

- [ ] **Step 1: `app/sitemap.ts` via de padkaart**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cases } from "@/lib/work";
import { supportArticles } from "@/lib/support";
import { alternatesFor, isLive, type Lang, type RouteKey } from "@/lib/i18n/paths";

type Entry = MetadataRoute.Sitemap[number];
type Base = Pick<Entry, "lastModified" | "changeFrequency" | "priority">;

const abs = (p: string) => `${site.url}${p === "/" ? "" : p}`;

/** Eén regel per taal waarin de route bestaat, met hreflang-alternates zodra EN live is. */
function entries(key: RouteKey, slug: string | undefined, base: Base): Entry[] {
  const langs: Lang[] = isLive("en") ? ["nl", "en"] : ["nl"];
  return langs.flatMap((lang) => {
    const alt = alternatesFor(lang, key, slug);
    if (lang === "en" && !alt.languages) return []; // geen EN-versie (support)
    const entry: Entry = { url: abs(alt.canonical), ...base };
    if (alt.languages) {
      entry.alternates = {
        languages: { nl: abs(alt.languages.nl), en: abs(alt.languages.en), "x-default": abs(alt.languages["x-default"]) },
      };
    }
    return [entry];
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...entries("home", undefined, { lastModified: now, changeFrequency: "monthly", priority: 1 }),
    ...entries("websites", undefined, { lastModified: now, changeFrequency: "monthly", priority: 0.9 }),
    ...entries("hosting", undefined, { lastModified: now, changeFrequency: "monthly", priority: 0.9 }),
    ...entries("hulp", undefined, { lastModified: now, changeFrequency: "monthly", priority: 0.9 }),
    ...entries("contact", undefined, { lastModified: now, changeFrequency: "yearly", priority: 0.7 }),
    ...entries("werk", undefined, { lastModified: now, changeFrequency: "monthly", priority: 0.8 }),
    ...cases.flatMap((c) => entries("werk", c.slug, { lastModified: now, changeFrequency: "yearly", priority: 0.6 })),
    ...entries("support", undefined, { lastModified: now, changeFrequency: "monthly", priority: 0.6 }),
    ...supportArticles.flatMap((a) =>
      entries("support", a.slug, { lastModified: new Date(a.updatedIso), changeFrequency: "yearly", priority: 0.5 }),
    ),
    ...entries("voorwaarden", undefined, { lastModified: now, changeFrequency: "yearly", priority: 0.3 }),
    ...entries("privacy", undefined, { lastModified: now, changeFrequency: "yearly", priority: 0.3 }),
  ];
}
```

- [ ] **Step 2: Schema's met taal in `lib/site.ts`**

Vervang de twee functies:

```ts
import { isLive, type Lang } from "@/lib/i18n/paths";

export type SchemaTexts = { description: string; offers: { name: string; description: string }[] };

/** ProfessionalService / lokale-dienstverlener schema; alleen gevulde velden worden meegestuurd. */
export function professionalServiceSchema(lang: Lang, t: SchemaTexts) {
  const area = site.serviceArea.length ? site.serviceArea.map((name) => ({ "@type": "Place", name })) : undefined;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: t.description,
    url: site.url,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    knowsLanguage: isLive("en") ? ["nl", "en"] : "nl",
    areaServed: area ?? "NL",
    makesOffer: t.offers.map((o) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: o.name, description: o.description, areaServed: area },
    })),
  };
  // … de rest (founder, telephone, address, sameAs, reviews) ongewijzigd …
  return schema;
}

/** WebSite-schema; versterkt het "dit is de officiële site van deze entiteit"-signaal. */
export function websiteSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: site.url,
    name: site.name,
    inLanguage: lang,
    publisher: { "@type": "ProfessionalService", name: site.name },
  };
}
```
Verwijder de nu ongebruikte `description`-string in de oude functie. `lang` in `professionalServiceSchema` wordt pas in Task 31 gebruikt (Engelse `areaServed`-tekst blijft gelijk); laat de parameter staan.

In `app/[lang]/layout.tsx`: `const { ui } = getDict(lang);` (import `getDict` uit `@/lib/i18n`) en de aanroepen worden `professionalServiceSchema(lang, ui.schema)` en `websiteSchema(lang)`.

- [ ] **Step 3: `lib/pricing.ts` alleen getallen**

```ts
/**
 * Alle verkoopprijzen op de site komen hieruit (besloten 26-08-2026, zie docs 11 §7 en 12).
 * Regel: alle bedragen INCL. 21% btw. Kostprijzen staan niet in de code. Labels: lib/i18n/{nl,en}/services.ts (plans, mailbox, hulpTarief).
 */
export const pricing = {
  website: { from: 250 },

  hosting: [
    { id: "online", monthly: 5, featured: false },
    { id: "onderhoud", monthly: 15, featured: true },
    // Tijdelijk niet op de site (29-08-2026): eerst zelf de Shopify-flow testen of eerste aanvraag afwachten.
    // Zet `live: true` om de kaart terug te zetten. Prijs is all-in: het Shopify-abonnement (≈ €21) zit erin,
    // HitzDigital betaalt Shopify en het account staat op naam van de klant.
    { id: "webshop", live: false, monthly: 35, featured: false },
  ],

  addons: [
    {
      id: "mailbox",
      /** Staffel (besloten 29-08-2026): 1 mailbox €3, 2 t/m 5 mailboxen samen €5; meer op aanvraag. */
      tiers: [
        { id: "one", monthly: 3 },
        { id: "multi", monthly: 5 },
      ],
      quotaGb: 2,
    },
  ],

  domains: {
    table: [
      { tld: ".nl", yearly: 15 },
      { tld: ".com", yearly: 20 },
    ],
  },

  hulp: {
    quarter: 15,
    card: { quarters: 20, price: 270 },
    apk: { computer: 59, website: 59 },
  },
} as const;

export type PlanId = (typeof pricing.hosting)[number]["id"];

/** Geldnotatie zonder decimalen (alle prijzen zijn hele euro's). */
export const euro = (amount: number) => `€${amount}`;

/** Pakketten die op de site getoond worden (pakketten met `live: false` blijven in de data maar niet in beeld). */
export const liveHosting = pricing.hosting.filter((h) => !("live" in h) || h.live !== false);
```

- [ ] **Step 4: `lib/content.ts` inkorten en `lib/services.ts` verwijderen**

`lib/content.ts` houdt alleen de taalneutrale contactgegevens:

```ts
import { site } from "./site";

export const contactEmail = site.email;
export const whatsapp = `https://wa.me/${site.whatsapp}`;
export const tel = `tel:${site.phone}`;
export const telDisplay = "+31 6 3741 9404";
```

```bash
git rm lib/services.ts
grep -rn "lib/services\|from \"@/lib/content\"" app components lib | grep -v "contactEmail\|whatsapp\|tel"
```
Expected van de grep: geen regels (elke overgebleven import van `@/lib/content` gebruikt alleen `contactEmail`, `whatsapp`, `tel` of `telDisplay`).

- [ ] **Step 5: Typecheck, bouw, e2e, commit**

```bash
npx tsc --noEmit && npm run build
npm start &
npm run test:e2e
kill %1
```
Expected: geen fouten; e2e `ℹ pass 4`. Controleer `http://localhost:3111/sitemap.xml`: dezelfde URL's in dezelfde volgorde als op `main`, zonder `xhtml:link`-regels (EN is nog niet live).

```bash
git add -A
git commit -m "Sitemap en schema via de padkaart; pricing alleen getallen; services.ts weg"
```

---

### Task 17: Fase 1 afsluiten: nul-verandering aantonen

**Files:**
- Create: `tests/visual/diff.py`
- Modify (buiten git): `../screenshots/tools/shots.mjs`

- [ ] **Step 1: Maak het screenshot-script instelbaar**

In `../screenshots/tools/shots.mjs` vervang de eerste twee constanten door:

```js
const BASE = process.env.BASE ?? 'http://localhost:3000';
const OUT = process.env.OUT ?? '/Users/nathaniel/Documents/Hitzdigital-web/screenshots';
```

Playwright is globaal geïnstalleerd. Node lost een ESM-import van `playwright` op via de `node_modules`-mappen boven het importerende bestand; een symlink in de projectmap `Hitzdigital-web/` (buiten git) werkt daardoor zowel voor `../screenshots/tools/*.mjs` als voor `tests/e2e/*.mjs`:

```bash
mkdir -p ../node_modules && ln -sfn "$(npm root -g)/playwright" ../node_modules/playwright
```
De globale Playwright (1.63) vraagt zelf om Chromium-build **1148**, en die staat níet in de cache; wel aanwezig zijn 1234 en 1243.
Een kale `chromium.launch()` faalt daardoor met "Executable doesn't exist". Geef daarom altijd het gecachete 1243-binary mee:

```js
const CHROME = "/Users/nathaniel/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const browser = await chromium.launch({ executablePath: CHROME });
```

Dat werkt zonder download en zonder netwerk. Zelfde regel voor `tests/e2e/switch-cookie.mjs` (Task 30) en voor `../screenshots/tools/shots.mjs`.

- [ ] **Step 2: Maak `tests/visual/diff.py`**

```python
#!/usr/bin/env python3
"""Vergelijkt twee mappen met screenshots. Gebruik: python3 tests/visual/diff.py <oud> <nieuw> [drempel-%]
Een pixel telt als anders bij een kanaalverschil > 16. Exit 1 als een pagina boven de drempel zit."""
import os, sys
from PIL import Image, ImageChops

old, new = sys.argv[1], sys.argv[2]
threshold = float(sys.argv[3]) if len(sys.argv) > 3 else 0.5
worst = 0.0
for name in sorted(n for n in os.listdir(old) if n.endswith(".png")):
    a = Image.open(os.path.join(old, name)).convert("RGB")
    path = os.path.join(new, name)
    if not os.path.exists(path):
        print(f"ONTBREEKT {name}"); worst = 100; continue
    b = Image.open(path).convert("RGB")
    if a.size != b.size:
        print(f"MAAT      {name}: {a.size} -> {b.size}"); worst = 100; continue
    mask = ImageChops.difference(a, b).convert("L").point(lambda v: 255 if v > 16 else 0)
    changed = mask.histogram()[255]
    pct = 100 * changed / (a.size[0] * a.size[1])
    worst = max(worst, pct)
    print(f"{'OK  ' if pct <= threshold else 'DIFF'} {name}: {pct:.3f}% pixels anders")
sys.exit(0 if worst <= threshold else 1)
```

- [ ] **Step 3: Baseline van `main`, dan fase 1**

```bash
# baseline (op main heeft `npm start` nog geen poortvlag, dus expliciet -p 3111)
git checkout main && npm run build && (npx next start -p 3111 & sleep 4) \
  && BASE=http://localhost:3111 OUT=../screenshots/baseline-main node ../screenshots/tools/shots.mjs; kill %1
git checkout feature/engels
# fase 1
npm run build && (npx next start -p 3111 & sleep 4) \
  && BASE=http://localhost:3111 OUT=../screenshots/fase1 node ../screenshots/tools/shots.mjs; kill %1
python3 tests/visual/diff.py ../screenshots/baseline-main ../screenshots/fase1
```
Expected: elke regel `OK`, exit 0. Bij `DIFF`: open beide PNG's naast elkaar; het enige toegestane verschil is timing van reveal-animaties (verschuiving van een hele sectie). Een afwijkende tekst is een fout die in de betreffende task hersteld moet worden.

- [ ] **Step 4: URL-vergelijking en head-controle**

```bash
npm start &
for p in / /websites /hosting /hulp /werk /werk/volmer-techniek /werk/mourits-schilderwerken /werk/monster-zorg /contact /support /support/e-mail-instellingen /support/e-mail-instellen-iphone /privacy /voorwaarden; do
  printf "%-45s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3111$p)"
done
curl -s http://localhost:3111/hosting | grep -o '<title>[^<]*</title>\|rel="canonical" href="[^"]*"\|og:locale" content="[^"]*"'
kill %1
```
Expected: alle paden `200`; titel `Hosting, domein en onderhoud voor je website | HitzDigital`, canonical `https://www.hitzdigital.nl/hosting`, `og:locale` `nl_NL`.

- [ ] **Step 5: Volledige testrun en commit**

```bash
npm run test:unit
npm run build && (npm start & sleep 4) && npm run test:e2e; kill %1
git add tests/visual/diff.py
git commit -m "Visuele diff-tool voor screenshots"
```

- [ ] **Step 6: CHECKPOINT fase 1**

Meld Nathaniel: build groen, unit + e2e groen, screenshots identiek aan `main`, alle 14 URL's 200. Wacht op akkoord vóór Task 18.

---

# Fase 2 — Engelse woordenboeken en copy

Vormafspraken uit de review van Task 6/7: bedragen altijd via `pricing`/`euro`, accentkoppen één keer als `{ pre, accent, post }` met `star()`/`accented()`, technische ids met `as const`, geen scheidingstekens of voorloopspaties in strings, `nav.cta` afgeleid van `cta`, geen `kicker`, `guaranteeLine` één keer per taal.

Doel: na Task 27 bestaat de complete Engelse site onder `/en/…`, door Nathaniel per pagina nagelezen. Nog zonder taalschakelaar en zonder automatische detectie (fase 3).

Schrijfregels voor alle Engelse copy (spec §7): Brits-Engels (colour, organise, favourite), ik-vorm, korte zinnen, geen jargon en geen superlatieven. De Hoeksche Waard is thuisbasis, niet doelgroep. Websites en hosting: op afstand, wereldwijd. Hulp aan huis: alleen in de regio. Prijzen ongewijzigd met "incl. 21% VAT". De Engelse copy hieronder is de eerste versie; Nathaniel leest per task tegen en wijzigingen worden direct in het EN-woordenboek doorgevoerd.

### Task 18: EN live in de padkaart, middleware-regels 3, 4 en 6, EN-skelet

**Files:**
- Modify: `lib/i18n/paths.ts`, `middleware.ts`, `lib/i18n/index.ts`, `tests/unit/paths.test.ts`, `tests/e2e/i18n.test.mjs`
- Create: `lib/i18n/en/ui.tsx`, `lib/i18n/en/pages.tsx`, `lib/i18n/en/services.ts`, `lib/i18n/en/work.ts`, `lib/i18n/en/legal-privacy.tsx`, `lib/i18n/en/legal-terms.tsx`, `lib/i18n/en/index.ts`

- [ ] **Step 1: Unit-test voor hreflang-alternates uitbreiden**

Voeg aan `tests/unit/paths.test.ts` toe:

```ts
test("alternatesFor: hreflang zodra EN live is", () => {
  const a = alternatesFor("nl", "hulp");
  assert.deepEqual(a, { canonical: "/hulp", languages: { nl: "/hulp", en: "/en/help", "x-default": "/hulp" } });
  const b = alternatesFor("en", "werk", "monster-zorg");
  assert.equal(b.canonical, "/en/work/monster-zorg");
  assert.equal(b.languages?.["x-default"], "/werk/monster-zorg");
  assert.deepEqual(alternatesFor("nl", "support", "x"), { canonical: "/support/x" });
});
```

Run: `npm run test:unit` — Expected: deze test faalt (`languages` is nog `undefined`).

- [ ] **Step 2: Zet `en` live in `lib/i18n/paths.ts`**

```ts
/** Talen die live zijn. */
export const locales: readonly Lang[] = ["nl", "en"];
```

Run: `npm run test:unit` — Expected: alles slaagt (`ℹ pass 18`, inclusief het `publicPath`-blok uit Task 2).

- [ ] **Step 3: EN-skelet als kopie van NL**

```bash
mkdir -p lib/i18n/en
for f in ui.tsx pages.tsx services.ts work.ts legal-privacy.tsx legal-terms.tsx index.ts; do cp "lib/i18n/nl/$f" "lib/i18n/en/$f"; done
```

Pas per bestand de kop aan zodat EN het NL-type krijgt (de inhoud blijft in deze task Nederlands; Task 19–27 vervangen die):

`lib/i18n/en/ui.tsx`: `const L = "en" as const;` en `export const ui: UiDict = {` met `import type { UiDict } from "../nl/ui";`. Verwijder de regel `export type UiDict = typeof ui;`.

`lib/i18n/en/pages.tsx`: `import type { PagesDict } from "../nl/pages";`, `export const pages: PagesDict = {`, verwijder `export type PagesDict = typeof pages;`.

`lib/i18n/en/services.ts`: `const L = "en" as const;`, `import type { ServicesDict } from "../nl/services";`, `export const services: ServicesDict = {`, verwijder de type-export.

`lib/i18n/en/work.ts`: `import type { WorkDict } from "../nl/work";`, `export const work: WorkDict = {` en verwijder het `satisfies {…}`-blok aan het einde (het type dekt dat al); verwijder `export type WorkDict = typeof work;`.

`lib/i18n/en/legal-privacy.tsx`: `const L = "en" as const;`. `lib/i18n/en/legal-terms.tsx`: `import { services } from "./services";` blijft (wijst nu naar EN).

`lib/i18n/index.ts` (volledig):

```ts
import type { Lang } from "./paths";
import * as nl from "./nl";
import * as en from "./en";

/** Vorm van een compleet woordenboek: afgeleid van het Nederlands (de bron). */
export type Dict = typeof nl;

/** Beschikbare woordenboeken. Het Nederlands is er altijd en dient als terugval. */
const dicts: Partial<Record<Lang, Dict>> & { nl: Dict } = { nl, en };

export function getDict(lang: Lang): Dict {
  return dicts[lang] ?? dicts.nl;
}
```

Run: `npx tsc --noEmit` — Expected: geen fouten. (Een fout hier betekent dat de EN-kopie niet exact het NL-type volgt; los dat op vóór je verder gaat.)

- [ ] **Step 4: Middleware-regels 3, 4 en 6**

Vervang in `middleware.ts` de import en voeg het EN-blok toe vóór "Regel 7":

```ts
import { NextResponse, type NextRequest } from "next/server";
import { isLive, parsePublic, internalPath, redirectForEn } from "@/lib/i18n/paths";
```

```ts
  // Engels (vanaf fase 2). Niet live → valt door naar regel 7 en eindigt in de NL-404.
  if (isLive("en") && (pathname === "/en" || pathname.startsWith("/en/"))) {
    // Regel 3 + 4: interne (Nederlandse) slug of support onder /en → 301 naar het publieke adres.
    const target = redirectForEn(pathname);
    if (target) {
      const url = req.nextUrl.clone();
      url.pathname = target;
      return NextResponse.redirect(url, 301);
    }
    // Regel 6: publieke EN-slug → interne route. Onbekend pad blijft staan; de catch-all geeft een 404; NotFoundView kiest client-side Engels.
    const parsed = parsePublic(pathname);
    return parsed ? rewrite(req, internalPath(parsed)) : NextResponse.next();
  }
```

Werk de doc-comment bovenin bij: regels 3, 4, 6 zijn nu aanwezig; regel 5 volgt in Task 30.

- [ ] **Step 5: e2e-tests voor de Engelse URL-regels**

Voeg toe aan `tests/e2e/i18n.test.mjs`:

```js
const EN_PAGES = ["/en", "/en/websites", "/en/hosting", "/en/help", "/en/work", "/en/work/volmer-techniek", "/en/contact", "/en/privacy", "/en/terms"];

test("EN-pagina's: 200 en <html lang=en>", async () => {
  for (const p of EN_PAGES) {
    const res = await get(p);
    assert.equal(res.status, 200, p);
    assert.match(await res.text(), /<html[^>]*\blang="en"/, p);
  }
});

test("interne slug onder /en → 301 naar de Engelse slug", async () => {
  for (const [from, to] of [["/en/hulp", "/en/help"], ["/en/werk/volmer-techniek", "/en/work/volmer-techniek"], ["/en/voorwaarden", "/en/terms"]]) {
    const res = await get(from);
    assert.equal(res.status, 301, from);
    assert.equal(location(res), to, from);
  }
});

test("support bestaat alleen in NL: /en/support → 301 /support", async () => {
  const root = await get("/en/support");
  assert.equal(root.status, 301);
  assert.equal(location(root), "/support");
  const deep = await get("/en/support/e-mail-instellingen");
  assert.equal(deep.status, 301);
  assert.equal(location(deep), "/support/e-mail-instellingen");
});

test("onbekend EN-pad en onbekende taal geven 404", async () => {
  // De 404 rendert in Next's foutdocument zonder <html lang>; NotFoundView kiest de taal client-side.
  assert.equal((await get("/en/does-not-exist")).status, 404);
  assert.equal((await get("/en/help/extra")).status, 404);
  assert.equal((await get("/fr")).status, 404);
});

test("diepe links redirecten nooit op taal", async () => {
  const nl = await get("/websites", { headers: { "accept-language": "en-GB,en;q=0.9" } });
  assert.equal(nl.status, 200);
  assert.match(await nl.text(), /<html[^>]*\blang="nl"/);
  const en = await get("/en/websites", { headers: { "accept-language": "nl-NL,nl;q=0.9" } });
  assert.equal(en.status, 200);
  assert.match(await en.text(), /<html[^>]*\blang="en"/);
});
```

- [ ] **Step 6: Bouw, e2e, commit**

```bash
npx tsc --noEmit && npm run build
npm start &
npm run test:e2e
kill %1
```
Expected: build toont routes voor `/nl/...` én `/en/...`; e2e `ℹ pass 10`, `ℹ fail 0`. De sitemap bevat nu voor elke route beide talen met `xhtml:link`-alternates (Engelse tekst is nog Nederlands, dat is de bedoeling van dit skelet).

```bash
git add -A
git commit -m "EN live in padkaart en middleware; Engels woordenboek als skelet (kopie NL)"
```

---

### Task 19: EN site-schil (`ui`)

**Files:**
- Modify: `lib/i18n/en/ui.tsx`
- Modify: `tests/e2e/i18n.test.mjs`

- [ ] **Step 1: Vervang de inhoud van `lib/i18n/en/ui.tsx`**

```tsx
import { site } from "@/lib/site";
import { href } from "../paths";
import type { AanvraagKeuze } from "@/lib/aanvraag";
import type { UiDict } from "../nl/ui";

const L = "en" as const;
const contact = (voor?: AanvraagKeuze) => `${href(L, "contact")}${voor ? `?voor=${voor}` : ""}`;

const mailBody = [
  "Hi Nathaniel,",
  "",
  "- What I need help with (website / hosting / tech help): ",
  "- My current website (or: I don't have one yet): ",
  "- What kind of business I run, and where: ",
  "",
  "Kind regards,",
].join("\n");

/** Knoppen naar het contactformulier. `nav.cta` leidt zijn labels hiervan af, zodat ze niet uiteenlopen. */
const cta = {
  contact: { label: "Get in touch", href: contact() },
  demo: { label: "Free demo", href: contact("website") },
  demoLang: { label: "Request your free demo", href: contact("website") },
  hosting: { label: "Request hosting", href: contact("hosting") },
  hulp: { label: "Request help", href: contact("hulp") },
  whatsapp: "WhatsApp me",
  call: "Call",
};

export const ui: UiDict = {
  skipLink: "Skip to content",
  nav: {
    aria: "Main navigation",
    homeAria: "HitzDigital home",
    links: [
      { label: "Websites", href: href(L, "websites") },
      { label: "Hosting", href: href(L, "hosting") },
      { label: "Help", href: href(L, "hulp") },
      { label: "Work", href: href(L, "werk") },
      { label: "About", href: `${href(L, "home")}#over` },
    ],
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menu: "Menu",
    themeRow: "Appearance",
    langRow: "Language",
    cta: { demo: cta.demo.label, hosting: cta.hosting.label, hulp: cta.hulp.label, contact: "Contact" },
  },
  theme: { toLight: "Switch to light theme", toDark: "Switch to dark theme", light: "Light theme", dark: "Dark theme" },
  lang: { nl: "Nederlands", en: "English", switchTo: { nl: "Schakel naar Nederlands", en: "Switch to English" } },
  footer: {
    tagline: "Everything to do with your website. One point of contact.",
    place: `${site.city}, the Netherlands`,
    services: "Services",
    more: "More",
    // Geen Support-link: de handleidingen bestaan alleen in het Nederlands (spec §3).
    moreLinks: [
      { label: "How it works", href: `${href(L, "websites")}#werkwijze` },
      { label: "Work", href: href(L, "werk") },
      { label: "Contact", href: href(L, "contact") },
    ],
    contact: "Contact",
    whatsapp: "WhatsApp",
    legal: [
      { label: "Privacy policy", href: href(L, "privacy") },
      { label: "Terms", href: href(L, "voorwaarden") },
    ],
    vat: "Prices incl. VAT",
  },
  crumbs: { aria: "Breadcrumb", home: "Home" },
  cta,
  ctaBand: { orCall: "Or call", reply: "I reply within one working day, no obligation." },
  fab: { label: "Got a question?", aria: "Got a question? Send me a WhatsApp message" },
  stickyBar: { aria: "Quick contact", call: "Call", whatsapp: "WhatsApp" },
  mailto: `mailto:${site.email}?subject=${encodeURIComponent("Enquiry via hitzdigital.nl")}&body=${encodeURIComponent(mailBody)}`,
  form: {
    legend: "What can I help you with?",
    choices: {
      website: { label: "New website", submit: "Request your free demo" },
      hosting: { label: "Hosting & domain", submit: "Request hosting" },
      hulp: { label: "Stuck on something", submit: "Request help" },
      anders: { label: "Something else", submit: "Send" },
    },
    name: "Name",
    email: "Email address",
    required: "(required)",
    phone: "Phone (optional)",
    website: "Your website, if you have one",
    websitePlaceholder: "https://… or: no site yet",
    company: "What kind of business do you run, and where?",
    companyPlaceholder: "e.g. a painter and decorator in Rotterdam",
    message: "What's the situation?",
    messagePlaceholder: "Short is fine.",
    sending: "Sending…",
    privacy: "Read the privacy policy",
    privacyHref: href(L, "privacy"),
    ok: "Done! Your enquiry has been sent. I'll reply within one working day.",
    failed: "That didn't send. Email me directly at",
    errors: {
      name: "Please enter your name, so I know who I'm calling or emailing back.",
      email: "Please enter an email address I can reach you on.",
    },
    packageInterest: "I'm interested in the {pakket} option.",
    /** Nette pakketnamen voor `{pakket}`; onbekende ids vallen terug op de id met hoofdletter. */
    packageNames: { online: "Online", onderhoud: "Maintenance", webshop: "Webshop", "computer-apk": "Computer check-up", "website-apk": "Website check-up" },
    mailtoSubject: "Enquiry via hitzdigital.nl: {voor}",
    mailtoFields: { voor: "Regarding", naam: "Name", email: "Email", telefoon: "Phone", website: "Website", bedrijf: "Business and location" },
  },
  notFound: {
    title: "This page doesn't exist (anymore).",
    body: "The link may be out of date, or the page has moved. Head back to the homepage to keep browsing.",
    back: "Back to hitzdigital.nl",
    href: href(L, "home"),
  },
  og: { footer: "Puttershoek, the Netherlands" },
  schema: {
    description:
      "Websites, hosting and tech help for small businesses. One person, based in Puttershoek in the Netherlands, working remotely with clients in the Netherlands and abroad.",
    offers: [
      {
        name: "Website design and build",
        description:
          "A new website, or a refresh of your existing site, for small businesses such as trades, hospitality and independent professionals. You see a free demo first, then you decide.",
      },
      {
        name: "Hosting, domain and maintenance",
        description: "Domain, hosting, business email and small changes in one monthly fee. Cancel any time.",
      },
      {
        name: "Computer and website help",
        description:
          "Help with your computer, email, domain, network or website. Remote via screen sharing anywhere; on-site in the Hoeksche Waard area. No fix, no fee.",
      },
    ],
  },
  workCard: { viewCase: "View the project", tags: { demo: "Demo", eigen: "Own project" } },
  plan: { mostChosen: "Most popular", perMonthShort: "/month", choose: (name: string) => `Choose ${name}` },
  faq: { eyebrow: "Frequently asked", title: "Questions I often get." },
  voorNa: { before: "Before", after: "After", aria: "Compare before and after" },
};
```

- [ ] **Step 2: e2e: Engelse 404-tekst**

In de 404-test geen tekstcontrole toevoegen: het foutdocument bevat de teksten van beide talen in de RSC-payload, dus tekst onderscheidt de taal niet.

- [ ] **Step 3: Typecheck, bouw, nalezen, commit**

Run: `npx tsc --noEmit && npm run build`. In `npm run dev`: `/en/does-not-exist` toont de Engelse 404; op `/en` zijn nav-links, footer en de knop "Free demo" Engels (de pagina zelf nog Nederlands).

**CHECKPOINT:** Nathaniel leest nav, footer, formulier (op `/en/contact`) en 404 na. Wijzigingen direct in `en/ui.tsx` verwerken.

```bash
git add -A
git commit -m "EN: site-schil (nav, footer, formulier, 404, schema)"
```

---

### Task 20: EN homepage

**Files:**
- Modify: `lib/i18n/en/pages.tsx` (blok `home`), `lib/i18n/en/services.ts` (blokken `pijlers`, `zoWerkIk`, `over`)

- [ ] **Step 1: Blok `home` in `lib/i18n/en/pages.tsx`**

```tsx
// Bovenin het bestand, bij de andere accentkoppen (de helpers `star`/`accented` staan er al, uit de NL-kopie):
const homeH1 = { pre: "Everything to do with your ", accent: "website", post: ". One point of contact." };

  home: {
    meta: {
      title: "Websites, hosting and tech help for small businesses | HitzDigital",
      description: `Websites and hosting for small businesses, kept online and looked after. Based in the Netherlands, working with clients here and abroad. Websites from ${websiteFrom}, hosting from ${euro(online.monthly)} a month, all incl. VAT.`,
    },
    og: {
      title: star(homeH1),
      kicker: "Websites · Hosting · Help",
      sub: "Websites, hosting and tech help for small businesses. One person, based in the Netherlands, working with clients here and abroad.",
    },
    hero: {
      h1: homeH1,
      sub: "Websites, hosting and tech help for small businesses. Based in the Netherlands, working with clients here and abroad. I build your site, keep it online and step in the moment something breaks.",
      primary: "See what I do",
      secondary: "Get in touch",
      chips: {
        mobile: "Mobile-friendly",
        fast: "Fast loading",
        seo: "SEO-ready",
        structure: "Clear structure",
        modern: "Modern look",
        selfManaged: "Manage it yourself",
        friendly: "User-friendly",
        professional: "Professional impression",
        code: { fast: "// fast loading", clean: "// clean code", perf: "// better performance" },
      },
    },
    pijlers: { title: "Three things I take care of for you." },
    zoWerkIk: { title: "Clear up front. No surprises afterwards." },
    werk: {
      eyebrow: "Work",
      teaserTitle: "Businesses I've already built for.",
      all: "All my work",
    },
    contact: {
      eyebrow: "Contact",
      title: "What can I help you with?",
      lead: "Pick what you need me for and tell me briefly what's going on. I reply within one working day, no obligation.",
      direct: "Prefer to skip the form?",
      urgent: "Site down or urgent? Call.",
    },
  },
```

- [ ] **Step 2: Blokken `pijlers`, `zoWerkIk`, `over` in `lib/i18n/en/services.ts`**

```ts
  pijlers: [
    {
      id: "websites",
      n: "01",
      title: "Websites",
      body: "A modern site that fits your business. You see a real demo of your own homepage first; only then do you decide.",
      price: `From ${euro(pricing.website.from)}`,
      href: href(L, "websites"),
    },
    {
      id: "hosting",
      n: "02",
      title: "Hosting & domains",
      body: "Domain, hosting, email and one small change per month in one monthly fee. Cancel any time.",
      price: `From ${euro(online.monthly)} a month`,
      href: href(L, "hosting"),
    },
    {
      id: "hulp",
      n: "03",
      title: "Help",
      body: "Computer, email, domain or website: I fix it and explain it. Usually remote, via screen sharing, wherever you are.",
      price: `${euro(pricing.hulp.quarter)} per 15 minutes · ${guaranteeLine}`,
      href: href(L, "hulp"),
    },
  ],
```

```ts
  zoWerkIk: [
    { title: "Yours, and it stays that way", body: "Your website and domain are registered in your name. No lock-in. You're never stuck with me." },
    {
      title: "Clear pricing up front",
      body: `Websites from ${euro(pricing.website.from)}, hosting from ${euro(online.monthly)} a month, maintenance ${euro(onderhoud.monthly)} a month, help ${euro(pricing.hulp.quarter)} per 15 minutes. All incl. VAT, no small print.`,
    },
    { title: "Cancel any time", body: "That includes the hosting. Your domain just runs to the end of the year it's registered for." },
    { title: "One message is enough", body: "No account manager, no ticket system. You message or call me, and I reply myself." },
  ],

  over: {
    title: "One person. Straight answers. No hassle.",
    body: "I'm Nathaniel, from Puttershoek in the Netherlands. I run HitzDigital on my own, for small businesses here and abroad. I build your website, keep it online and step in the moment your computer or email lets you down. Not a big agency working from templates. Just one person you can message directly.",
    facts: ["One point of contact", "Everything agreed up front", "Based in the Netherlands"],
    portraitAlt: "Nathaniel, founder of HitzDigital",
  },
```

- [ ] **Step 3: Typecheck, bouw, nalezen, commit**

Run: `npx tsc --noEmit && npm run build`. Open `http://localhost:3111/en`: hero, pijlers, "zo werk ik", werk-teaser, over en contactsectie Engels; formulier Engels (Task 19).

**CHECKPOINT:** Nathaniel leest `/en` na.

```bash
git add -A
git commit -m "EN: homepage"
```

---

### Task 21: EN websites

**Files:**
- Modify: `lib/i18n/en/pages.tsx` (blok `websites`), `lib/i18n/en/services.ts` (`werkwijze`, `websiteOpties`, `websiteInbegrepen`, `websiteFaq`, `websiteNote`)

- [ ] **Step 1: Blok `websites` in `lib/i18n/en/pages.tsx`**

```tsx
// Bovenin het bestand, bij de andere accentkoppen (de helpers `star`/`accented` staan er al, uit de NL-kopie):
const websitesH1 = { pre: "A website that instantly feels more ", accent: "professional", post: "." };

  websites: {
    meta: {
      title: "Website design for small businesses | HitzDigital",
      description: `A modern website for your business, from ${websiteFrom} incl. VAT. You see a free demo of your own homepage first, then you decide. For trades, hospitality and independent professionals, in the Netherlands and abroad.`,
    },
    og: {
      title: star(websitesH1),
      kicker: "Websites",
      sub: `You see a free demo of your own homepage first. Then you decide. From ${websiteFrom} incl. VAT.`,
    },
    crumb: "Websites",
    werkwijzeTitle: "A better website in three steps.",
    hero: {
      title: accented(websitesH1),
      lead: "For cafés, painters and decorators, plumbers and heating engineers, landscape gardeners and other hands-on businesses, wherever you're based. You see a real demo of your own site first. Then you decide.",
      secondary: "See my work",
      asideAlt: "The Mourits Schilderwerken website on desktop",
    },
    options: { title: "Two starting points, one approach." },
    included: {
      title: "Everything a good site needs.",
      lead: (from: string) => `No optional extras or surprises later. This comes as standard, even with a site from ${from}.`,
    },
    price: {
      title: (from: string) => `A complete website from ${from}.`,
      lead: (note: string, monthly: string) =>
        `Incl. VAT. ${note} Want me to keep it online too? Hosting & maintenance is ${monthly} a month, including your .nl domain and one small change per month. Cancel any time.`,
      moreHosting: "More about hosting",
      card: {
        name: "Website",
        from: (from: string) => `from ${from}`,
        bullets: ["Free demo of your homepage up front", "Complete site, on your own domain", "Copy and photos taken care of", "Easy to edit yourself"],
        hostingRow: "Hosting & maintenance",
        perMonth: (amount: string) => `${amount} a month`,
        vat: "All prices incl. 21% VAT. VAT may differ outside the Netherlands.",
      },
    },
    voorNa: {
      eyebrow: "Before and after",
      title: "From dated to polished.",
      lead: (title: string, branche: string, plaats: string) =>
        `${title}, a ${branche.toLowerCase()} in ${plaats}. Drag the handle to compare the old and the new site, exactly as your customer sees them on their phone.`,
      link: "Read the full story",
    },
    ctaBand: {
      title: "Curious what your website could look like?",
      body: "Send me your current site or tell me briefly what you do. You get a real demo of your homepage, free and with no obligation.",
    },
  },
```

- [ ] **Step 2: Website-blokken in `lib/i18n/en/services.ts`**

```ts
  werkwijze: [
    { n: "01", title: "Send me your site or tell me your idea", body: "A message, a link or a short description is enough." },
    {
      n: "02",
      title: "I build a concrete demo",
      body: "You get to see a real demo site, focused on your new homepage. No pitch or PowerPoint, but something you can click through yourself.",
    },
    {
      n: "03",
      title: "Then you decide",
      body: "Like it? Then we develop it together into a complete website. Not for you? Then you're not tied to anything. The demo stays free.",
    },
  ],
```

```ts
  websiteOpties: [
    {
      title: "No decent site yet",
      body: "I build a modern website that's clean, fast and clear. A site that builds trust and fits your business, with copy and photos that are right.",
    },
    {
      title: "Your site is dated",
      body: "I give your current site a fresh look and a better structure. What works stays, what gets in the way goes. You don't have to start over.",
    },
  ],
  websiteInbegrepen: [
    "Designed for your phone, because that's where your customers look",
    "Fast, even on a slow connection",
    "Easy to find on Google for your service and your area",
    "Edit copy, photos and prices yourself",
    "Copy and photos taken care of, or you supply them",
    "Domain in your name",
    "Hosting with me or elsewhere, your choice",
  ],
  websiteFaq: [
    { q: "How long does it take?", a: "The demo of your homepage is usually ready within a week. The complete website then goes live in two to four weeks, depending on how quickly copy and photos come together." },
    { q: "What exactly is the demo?", a: "A real, working preview of your new homepage that you can open in your own browser. No sketch or PowerPoint. So you see what your site will look like before you decide anything." },
    { q: "What if I don't like the demo?", a: "Then it ends there, with no cost and no obligation. The demo is and stays free." },
    { q: "Do I have to write the copy myself?", a: "No. You're welcome to supply it, but I also write it for you based on a short conversation. You supply photos, or I source fitting imagery." },
    { q: "Can I edit the site myself?", a: "Yes. You change copy, photos, prices and opening hours yourself, without technical knowledge. Rather not? Then one small change per month is included in the maintenance plan." },
    { q: "Do you work with clients outside the Netherlands?", a: "Yes. I'm based in Puttershoek, near Rotterdam, and building a website works just as well remotely: we talk by video call, email or WhatsApp. On-site help is limited to my own region, the Hoeksche Waard." },
  ],
  websiteNote: "You hear the exact price after the free demo. Until then you're not tied to anything.",
```

- [ ] **Step 3: Typecheck, bouw, nalezen, commit**

Run: `npx tsc --noEmit && npm run build`. Open `http://localhost:3111/en/websites`.

**CHECKPOINT:** Nathaniel leest `/en/websites` na; let vooral op de VAT-voetnoot (moet nog langs de boekhouder, spec §7).

```bash
git add -A
git commit -m "EN: websites"
```

---

### Task 22: EN hosting

**Files:**
- Modify: `lib/i18n/en/pages.tsx` (blok `hosting`), `lib/i18n/en/services.ts` (`hostingAltijd`, `overstappen`, `hostingFaq`, `plans`, `mailbox`, `domains`)

Openstaande zakelijke keuze voor Nathaniel (niet in de spec): het Onderhoud-pakket bevat een `.nl`-domein. Voor klanten buiten Nederland is een `.com` logischer (€20 per jaar in plaats van €15). De copy hieronder zegt eerlijk ".nl included, other extensions on request"; wil Nathaniel `.com` in het pakket, dan past hij `domains.included` aan.

- [ ] **Step 1: Blok `hosting` in `lib/i18n/en/pages.tsx`**

```tsx
// Bovenin het bestand, bij de andere accentkoppen (de helpers `star`/`accented` staan er al, uit de NL-kopie):
const hostingH1 = { pre: "Stay online, ", accent: "without the hassle", post: "." };

  hosting: {
    meta: {
      title: "Website hosting, domain and maintenance | HitzDigital",
      description: `Hosting from ${euro(online.monthly)} a month, or maintenance with domain and one small change per month for ${euro(onderhoud.monthly)}. Cancel any time, all incl. VAT. I handle the switch from your current host.`,
    },
    og: {
      title: star(hostingH1),
      kicker: "Hosting & domains",
      sub: "Domain, hosting, email and one small change per month in one monthly fee. Cancel any time.",
    },
    crumb: "Hosting & domains",
    hero: {
      title: accented(hostingH1),
      lead: "Domain, hosting, email and one small change per month in one monthly fee. Cancel any time. And if anything comes up, you message me. No ticket system.",
      primary: "Choose your plan",
      secondary: "Switching? I'll handle it",
      asideLabel: "Always included",
    },
    packages: {
      title: "Two plans, one monthly fee.",
      lead: (mailOne: string) =>
        `All prices incl. 21% VAT, cancel any time. Pay monthly or yearly, whichever you prefer. A business mailbox on your own domain can be added to either plan, from ${mailOne} a month extra. VAT may differ outside the Netherlands.`,
      everyPlan: "With either plan.",
      tierPerMonth: (label: string) => `${label}, per month`,
    },
    domain: {
      eyebrow: "Domain name & email",
      title: "Your domain, in your name.",
      p1: (included: string, other: string) =>
        `${included} If you choose hosting only, I register or renew your domain separately. I manage it, you remain the owner. ${other}`,
      p2: (one: string, multi: string, gb: number, more: string) =>
        `Business email on your own domain (you@yourbusiness.com) is ${one} a month for one mailbox and ${multi} a month for two to five mailboxes together, each with ${gb} GB of storage, calendar and spam filter, working on your phone and laptop. ${more}`,
      rowDomain: "domain, per year",
      note: "Incl. 21% VAT. Other extensions on request. VAT may differ outside the Netherlands.",
    },
    switch: {
      title: "Leaving your current host? I'll handle it.",
      lead: "Even if I didn't build your site. You don't have to move anything yourself, and nothing goes offline.",
    },
    ctaBand: {
      title: "Want to be sure your site just works?",
      body: "Tell me briefly where your site and domain are hosted now. I'll let you know what it comes to and handle the switch.",
    },
    schema: { name: "Hosting, domain and maintenance", serviceType: "Web hosting and website maintenance", unit: "month" },
  },
```

- [ ] **Step 2: Hosting-blokken in `lib/i18n/en/services.ts`**

```ts
  hostingAltijd: [
    "Servers in the Netherlands (EU)",
    "Daily backups",
    "SSL certificate (the padlock)",
    "Updates and security",
    "Monitoring: I notice when your site goes down",
    "Domain in your name",
    "Cancel any time",
  ],
  overstappen: [
    { n: "01", title: "You give me access", body: "To your current hosting or domain. Not sure where that is? We'll figure it out together." },
    { n: "02", title: "I move your site, domain and email", body: "At a time that suits you. You don't have to set anything up yourself." },
    { n: "03", title: "Nothing goes offline", body: "Only once everything runs and works with me does the domain switch over. Your email keeps arriving as usual." },
  ],
  hostingFaq: [
    { q: "What counts as a small change?", a: `Changing a text, photo, price or opening time. Something that's done within 15 minutes. A new page or design work falls outside it; I'm happy to do that, but at ${euro(pricing.hulp.quarter)} per 15 minutes. Unused time expires at the end of the month.` },
    { q: "What if I want to stop?", a: "You cancel per month, with no notice period of months. Your domain runs until the end of the year it's registered for; after that you can renew it or take it to another provider. Your site and your domain are and remain yours." },
    { q: "Does my domain stay mine?", a: "Yes. I register it in your name and with your details. I manage it for you, but you're the owner. If you ever want to leave, you simply take the domain with you." },
    { q: "How fast do you respond to an outage?", a: "I get an alert myself when your site goes down and usually get straight on it. If you notice something odd, message or call me; you don't need to open a ticket." },
    { q: "Can I host my old WordPress site with you?", a: "Yes. Even if I didn't build the site, I can take over hosting, domain and email. I'll first take a quick look at whether the site is technically healthy." },
    { q: "Do I pay monthly or yearly?", a: "Whichever you prefer. Yearly is my preference: one invoice, done. If you cancel partway through, you get the remaining full months back. You pay by direct debit or iDEAL and always receive a proper invoice with VAT. All prices are incl. 21% VAT; VAT may differ for businesses outside the Netherlands." },
  ],
  plans: {
    online: {
      name: "Online",
      summary: "Hosting of your website only.",
      includes: ["SSL certificate", "Daily backups", "Updates", "Monitoring"],
      excludes: ["Domain name (separately, from €15 a year)", `Changes (${euro(pricing.hulp.quarter)} per 15 minutes)`],
      fairUse: undefined,
    },
    onderhoud: {
      name: "Maintenance",
      summary: "Hosting, your .nl domain and one small change per month.",
      includes: ["Everything in Online", ".nl domain in your name (other extensions on request)", "1 small change per month (up to 15 minutes)", "Yearly check on speed and copy"],
      excludes: [],
      fairUse: "A small change is, for example, a text, photo, price or opening time. No new pages or design work. Unused time expires.",
    },
    webshop: {
      name: "Webshop",
      summary: "Your complete webshop online, managed and up to date.",
      includes: ["Domain in your name", "Shopify subscription included", "Payments with iDEAL and shipping integrations", "Theme and app updates", "1 small change per month (up to 15 minutes)"],
      excludes: [],
      fairUse: "A small change is, for example, a product, price, photo or text. No new pages or design work. Unused time expires.",
    },
  },
  mailbox: {
    name: "Business mailbox",
    summary: "On your own domain.",
    tiers: { one: "1 mailbox", multi: "2 to 5 mailboxes" },
    more: "More than 5 mailboxes on request.",
  },
  domains: {
    included: "The Maintenance plan includes a .nl domain.",
    other: "Other extensions, such as .com, on request.",
  },
```

- [ ] **Step 3: Typecheck, bouw, nalezen, commit**

Run: `npx tsc --noEmit && npm run build`. Open `http://localhost:3111/en/hosting`: kaartknoppen "Choose Online" / "Choose Maintenance", label "Most popular", "/mo".

**CHECKPOINT:** Nathaniel leest `/en/hosting` na en beslist over `.com` in het Maintenance-plan.

```bash
git add -A
git commit -m "EN: hosting"
```

---

### Task 23: EN help

**Files:**
- Modify: `lib/i18n/en/pages.tsx` (blok `hulp`), `lib/i18n/en/services.ts` (`hulpHelp`, `hulpNiet`, `hulpStappen`, `hulpFaq`, `hulpTarief`)

De Nederlandse "APK" (autokeuring) heet in het Engels "check-up". De ids `computer-apk` en `website-apk` blijven technisch gelijk.

- [ ] **Step 1: Blok `hulp` in `lib/i18n/en/pages.tsx`**

```tsx
// Bovenin het bestand, bij de andere accentkoppen (de helpers `star`/`accented` staan er al, uit de NL-kopie):
const hulpH1 = { pre: "Stuck? I'll take a look ", accent: "right away", post: "." };

  hulp: {
    meta: {
      title: "Computer and website help, remote or on-site | HitzDigital",
      description: `Stuck? I'll take a look right away. Help with your computer, email, domain, network or website: remote via screen sharing wherever you are, on-site in the Hoeksche Waard area. ${quarter} per 15 minutes incl. VAT. No fix? No fee.`,
    },
    og: {
      title: star(hulpH1),
      kicker: "Computer and website help",
      sub: `${quarter} per 15 minutes incl. VAT. Remote wherever you are, on-site in the Hoeksche Waard. No fix? No fee.`,
    },
    crumb: "Help",
    hero: {
      title: accented(hulpH1),
      lead: "For small businesses, and for home users too. Your laptop, email, domain, network or website: I fix it and explain it in plain language. Mostly remote via screen sharing, usually within 15 minutes. Need me on-site? In the Hoeksche Waard area, I'll come to you.",
      aside: {
        rate: "Rate",
        vat: "incl. VAT",
        perQuarter: "per 15 minutes",
        guaranteeBody: "We agree up front what the problem is. If I don't fix it, it costs you nothing.",
      },
    },
    apk: {
      title: "One fixed price, no surprises.",
      items: [
        {
          id: "computer-apk" as const,
          title: "Computer check-up",
          body: "Updates and clean-up, virus and malware scan, speed check, backup and passwords with two-step verification checked. You get a short list of what I did and what you can still do yourself. About 45 minutes, remote or on-site.",
        },
        {
          id: "website-apk" as const,
          title: "Website check-up",
          body: "Speed, mobile, findability, SSL, backups and outdated plugins, with a short report in plain language. Even if I didn't build your site. Disappointing result? Then I'll build a free demo of how it could be.",
        },
      ],
      plan: (title: string) => `Book a ${title}`,
      card: (quarters: number, price: string, validity: string) => `Need help more often? Prepaid card: ${quarters} blocks of 15 minutes for ${price}, ${validity}.`,
    },
    help: {
      eyebrow: "What I help with",
      title: "From mailbox to office network.",
      notTitle: "What I don't do",
      notBody: "For these I'll point you to someone who does them well. Not sure whether something fits? Send me a message and I'll tell you honestly whether I can do it.",
    },
    how: {
      title: "Call, share your screen, sorted.",
      homeLead: "Stuck at home?",
      homeBody: (quarter: string) => `I also help private individuals in the Hoeksche Waard area, at the same rate: ${quarter} per 15 minutes, incl. VAT.`,
    },
    ctaBand: { title: "Stuck right now?", body: "Call or message me and I'll take a look straight away. Prefer to send a message first? Tell me briefly what's going on." },
    schema: {
      name: "Computer and website help",
      serviceType: "Computer support and website support",
      perQuarter: "Help per 15 minutes",
      unit: "15 minutes",
      card: (quarters: number) => `Prepaid card, ${quarters} blocks of 15 minutes`,
    },
  },
```

- [ ] **Step 2: Hulp-blokken in `lib/i18n/en/services.ts`**

Vertaal bovenin ook de const: `const guaranteeLine = "No fix? No fee.";`. Die staat al in `pijlers[2].price` (`${euro(pricing.hulp.quarter)} per 15 minutes · ${guaranteeLine}`), zodat de zin één keer per taal bestaat.

```ts
  hulpHelp: [
    { title: "Email, domain and hosting", body: "Setting up business email, switching providers, DNS, an expired domain." },
    { title: "Your website, even if I didn't build it", body: "WordPress fixes, updates, a form that doesn't work, a slow site." },
    { title: "Google Business Profile, Maps and reviews", body: "Easy to find, with correct opening hours, photos and a link to your site." },
    { title: "Your computer setup", body: "Setting up, cleaning up and speeding up your laptop or PC, backup and security." },
    { title: "Printers, wifi, phone and tablet", body: "Everything that needs to work together with your email and your site." },
    { title: "Office network with TP-Link Omada", body: "Wifi access points, guest network and management, neatly set up and explained." },
    { title: "Light hardware check and cleaning", body: "Dust out, ventilation checked, disk and memory tested. On-site only." },
    { title: "Recovering files", body: "Accidentally deleted, or a drive that's acting up? I recover what can be saved using software. Physically damaged drives I refer on." },
  ],
  hulpNiet: [
    "Building a PC from scratch or component-level repairs (screen, motherboard, power supply)",
    "Data recovery from physically broken drives",
    "Setting up point-of-sale systems and accounting software",
  ],
  hulpStappen: [
    { n: "01", title: "You call or message", body: "Tell me briefly what's going wrong. A photo of the screen already helps." },
    { n: "02", title: "I take a look right away", body: "Via screen sharing, usually within 15 minutes. Need me on-site in the Hoeksche Waard area? Then I'll come to you." },
    { n: "03", title: "You only pay for the time it takes", body: "Per 15 minutes, incl. VAT. And nothing if it doesn't work out." },
  ],
  hulpFaq: [
    { q: "Do you come on-site?", a: "Yes, in the Hoeksche Waard area (near Rotterdam), without call-out charges. Most problems are solved faster remotely, so I try that first. On-site I charge per half hour, with a minimum of one hour." },
    { q: "Do you help clients outside the Netherlands?", a: "Yes, remotely. Screen sharing works the same from London or Dublin as from Rotterdam. We agree a time that suits your time zone, and you pay the same rate." },
    { q: "How fast can you help?", a: "Remotely often the same day, sometimes straight away. On-site usually within a few working days." },
    { q: "How does remote help work?", a: "You open a link I send you, and I see your screen while we talk. You stay in control and can end it at any time. Nothing is left behind on your computer." },
    { q: "What if it doesn't work out?", a: "Then you pay nothing for that help. We agree up front what the problem is; if I don't fix it, it costs you nothing. That doesn't apply to the check-ups, explanations and advice, or when the cause is beyond my reach and I've told you so." },
    { q: "Do you also help with my phone or tablet?", a: "Yes. Setting up email, transferring photos, setting up a new phone, tidying up and securing it: it's all part of it." },
    { q: "Do you help private individuals too?", a: `Yes, in the Hoeksche Waard area, at the same rate: ${euro(pricing.hulp.quarter)} per 15 minutes incl. VAT. Businesses come first when it's busy, but you're welcome.` },
  ],
  hulpTarief: {
    billing: "Remote per 15 minutes; on-site per half hour, minimum one hour.",
    travel: "No call-out charges in the Hoeksche Waard area.",
    cardValidity: "valid for 12 months",
    guarantee: {
      line: "No fix? No fee.",
      conditions: [
        "Applies per problem we name together up front.",
        "Not for the check-ups, explanations and advice; I always deliver those.",
        "Not when the cause is beyond my reach (broken hardware, an outage at your provider) and I've told you so.",
      ],
    },
  },
```

- [ ] **Step 3: Typecheck, bouw, nalezen, commit**

Run: `npx tsc --noEmit && npm run build`. Open `http://localhost:3111/en/help`: knop "Call +31 6 3741 9404", kaarten "Computer check-up" / "Website check-up", knop "Book a Computer check-up".

**CHECKPOINT:** Nathaniel leest `/en/help` na.

```bash
git add -A
git commit -m "EN: help"
```

---

### Task 24: EN work en cases

**Files:**
- Modify: `lib/i18n/en/pages.tsx` (blokken `werk`, `case`), `lib/i18n/en/work.ts`

- [ ] **Step 1: Blokken `werk` en `case` in `lib/i18n/en/pages.tsx`**

```tsx
  werk: {
    meta: {
      title: "Work: websites for small businesses | HitzDigital",
      description: "Examples of websites I've built: for a metalworking company, a painting company, a care professional and more. Click through to the projects.",
    },
    og: {
      title: "Examples of my *work*.",
      kicker: "Work",
      sub: "Websites for small businesses: metalworking, painting, care and more.",
    },
    crumb: "Work",
    hero: {
      title: "Examples of my work.",
      lead: "No templates, no stock photos. Sites I built for businesses in my region, plus a few projects of my own. For the clients, you can read how it went.",
    },
    ctaBand: {
      title: "Want this for your business too?",
      body: "Send me your current site or tell me briefly what you do. You get a real demo of your homepage, free and with no obligation.",
    },
  },

  case: {
    metaTitle: (title: string, branche: string, plaats: string) => `Website for ${title}, a ${branche.toLowerCase()} in ${plaats} | HitzDigital`,
    ogTitle: (title: string) => `Website for *${title}*`,
    ogFallback: { title: "Work by HitzDigital", kicker: "Work" },
    viewSite: "Visit the site",
    desktopAlt: (title: string) => `The ${title} website on desktop`,
    situation: "Situation",
    approach: "Approach",
    result: "Result",
    voorNa: {
      eyebrow: "Before and after",
      title: "How it looked, and how it looks now.",
      lead: "Drag the handle to compare the old and the new site, as a customer sees them on their phone.",
    },
    others: "Also built.",
    schemaName: (title: string) => `Website for ${title}`,
  },
```

- [ ] **Step 2: `lib/i18n/en/work.ts`**

```ts
import type { WorkDict } from "../nl/work";

export const work: WorkDict = {
  items: {
    "volmer-techniek": { meta: "Metalworking · Puttershoek", alt: "The Volmer Techniek website on mobile" },
    "mourits-schilderwerken": { meta: "Painting company · Klaaswaal", alt: "The Mourits Schilderwerken website on mobile" },
    "monster-zorg": { meta: "Freelance care professional · Gouda", alt: "The Monster Zorg website on mobile" },
    "youniek-art": { meta: "Photography portfolio", alt: "The Youniek Art website on mobile" },
    lesbosreizen: { meta: "Travel guide to Lesbos", alt: "The LesbosReizen website on mobile" },
    "cafe-centrum": { meta: "Local café · Hoeksche Waard", alt: "Demo website for Café 't Centrum on mobile" },
    opgietingen: { meta: "Calendar of sauna aufguss (steam-infusion) events", alt: "Opgietingen.nl on mobile" },
    festivaldiscounter: { meta: "Comparing festival tickets", alt: "Festivaldiscounter on mobile" },
  },
  cases: {
    "volmer-techniek": {
      branche: "Metalworking company",
      intro: "A bilingual website for a machining company that works on-site and in its own workshop, with a quote form, project gallery and service area.",
      situatie:
        "Volmer Techniek B.V. from Puttershoek carries out machining and repairs and builds machinery, on-site at the customer's premises and in its own workshop. The old website was a standard WordPress site with an off-the-shelf theme. For a company that also works outside the Netherlands, the site had to work in two languages and present the six disciplines clearly side by side.",
      aanpak: [
        "Six services, each with its own block: on-site machining, workshop machining, industrial repairs, machine building and custom work, retrofit, preventive maintenance.",
        "Dutch and English with a language switch, so international customers get the same site.",
        "A five-step process and a quote form with request type, next to a button to call directly.",
        "Project gallery with real photos of the work and a map of the service area.",
        "Certifications (VCA, Koninklijke Metaalunie) and 24/7 availability clearly in view.",
      ],
      resultaat: [
        "One site for Dutch and international customers, on its own domain volmertechniek.com.",
        "Every enquiry arrives with the type of work and contact details, via the form or by phone.",
        "A dark, industrial look that fits the work, with photos of their own shop floor.",
      ],
      voorNaAlt: undefined,
      quote: undefined,
    },
    "mourits-schilderwerken": {
      branche: "Painting company",
      intro: "A new site for a painting company from Klaaswaal that has worked across the Hoeksche Waard since 2015: five services, a project gallery and one-tap calling from your phone.",
      situatie:
        "Mourits Schilderwerken B.V. has worked from Klaaswaal across the whole Hoeksche Waard since 2015: interior and exterior painting, wall finishing, glazing, restoration and spray work. The old website dated from the company's early days, with a photo slider and a table of contact details at the top, and was awkward to use on a phone.",
      aanpak: [
        "Five service categories with their own pages, from glass-fibre wallcovering and lime paint to HR++ glazing and wood-rot repair.",
        "A call bar at the top and a button to request no-obligation advice, both directly reachable on mobile.",
        "Project gallery with their own work, a service area listing every village in the Hoeksche Waard, and the guarantee on the work spelled out.",
        "Calm, light design with large photos of façades and window frames, so the craftsmanship tells the story itself.",
      ],
      resultaat: [
        "Site on its own domain mouritsschilderwerken.nl, with contact form, landline and mobile number in one place.",
        "On mobile you call with one tap; on desktop the advice request is always in view.",
        "Easy to find by service and by place: every service has its own page, and the service area is written out.",
      ],
      voorNaAlt: { voor: "The old website of Mourits Schilderwerken on mobile", na: "The new website of Mourits Schilderwerken on mobile" },
      quote: undefined,
    },
    "monster-zorg": {
      branche: "Freelance care professional",
      intro: "A personal site from scratch for an applied psychologist and care professional who works freelance: who he is, what he does, and how to reach him.",
      situatie:
        "Jarno Monster works as an applied psychologist and care professional with over eight years of experience in supported living, and takes on freelance assignments with care organisations. There was no website yet. Clients needed to see quickly what he does, what his background is and how to reach him.",
      aanpak: [
        "One page with a clear running order: who is Jarno, what he offers, what experience he has, why Monster Zorg, and contact.",
        "A timeline from 2016 to now that shows his career at a glance.",
        "Calling and LinkedIn directly from the navigation; no detours.",
        "Warm, light design with a real portrait instead of stock imagery.",
      ],
      resultaat: [
        "A site that explains in one scroll what a client wants to know, on its own domain monsterzorg.nl.",
        "Contact in two taps: phone or LinkedIn, also on mobile.",
        "Ready to expand with service area and rates once those are set.",
      ],
      voorNaAlt: undefined,
      quote: undefined,
    },
  },
};
```

- [ ] **Step 3: Typecheck, bouw, nalezen, commit**

Run: `npx tsc --noEmit && npm run build`. Open `/en/work`, `/en/work/mourits-schilderwerken` (voor/na-slider met Engelse alt-teksten), `/en/work/volmer-techniek`.

**CHECKPOINT:** Nathaniel leest de werkpagina en drie cases na.

```bash
git add -A
git commit -m "EN: work en cases"
```

---

### Task 25: EN contact

**Files:**
- Modify: `lib/i18n/en/pages.tsx` (blok `contact`), `lib/i18n/en/services.ts` (`contactFaq`)

- [ ] **Step 1: Blok `contact` in `lib/i18n/en/pages.tsx`**

```tsx
  contact: {
    meta: {
      title: "Contact | HitzDigital",
      description: "Request a free demo, arrange hosting or ask for help. Message, call or email Nathaniel in the Netherlands. Reply within one working day, no obligation.",
    },
    og: { title: "What can I *help you with*?", kicker: "Contact", sub: "Free demo, hosting or help. Message, call or email. Reply within one working day." },
    crumb: "Contact",
    hero: {
      title: "What can I help you with?",
      lead: "Pick what you need me for and tell me briefly what's going on. I reply within one working day, no obligation. Site down or urgent? Call.",
    },
    direct: { eyebrow: "Prefer to skip the form", whatsappNote: "quickest for short questions", callNote: "call if your site is down or it's urgent" },
    about: {
      place: (founder: string, city: string) => `${founder} · ${city}, the Netherlands`,
      kvk: (kvk: string) => `Chamber of Commerce (KvK) ${kvk}`,
      reply: "I reply within one working day. Remote, or on-site in my region.",
    },
    faqTitle: "Quick questions",
    schemaName: "Contact HitzDigital",
  },
```

- [ ] **Step 2: `contactFaq` in `lib/i18n/en/services.ts`**

```ts
  contactFaq: [
    { q: "What happens after my message?", a: "You'll hear back from me within one working day, by email or WhatsApp. For a website enquiry I ask a few short questions and get started on your free demo." },
    { q: "Do you come to me?", a: "For help, I come on-site in the Hoeksche Waard area if remote doesn't work. For a website conversation, a video call works just as well as a visit." },
    { q: "Is the demo really free?", a: "Yes. You get a real, working preview of your homepage. If you don't like it, it ends there, at no cost." },
  ],
```

- [ ] **Step 3: Test de mail, nalezen, commit**

Run: `npx tsc --noEmit && npm run build`. Op `http://localhost:3111/en/contact?voor=hosting`: keuze "Hosting & domain" staat aan. Verstuur één testaanvraag: de mail aan Nathaniel heeft onderwerp `[EN] Aanvraag hosting & domein via hitzdigital.nl: <naam>` en de eerste regel `Taal van aanvraag: Engels`.

**CHECKPOINT:** Nathaniel leest `/en/contact` na.

```bash
git add -A
git commit -m "EN: contact"
```

---

### Task 26: EN privacy policy

**Files:**
- Modify: `lib/i18n/en/legal-privacy.tsx`, `lib/i18n/en/pages.tsx` (blok `privacy`)

- [ ] **Step 1: Blok `privacy` in `lib/i18n/en/pages.tsx`**

```tsx
  privacy: {
    meta: {
      title: "Privacy policy | HitzDigital",
      description: "What HitzDigital does with your data, in plain language: what I keep, why, for how long, who I share it with and what your rights are.",
    },
    og: { title: "*Privacy policy*", kicker: "Privacy", sub: privacyLead },
    crumb: "Privacy",
    title: "Privacy policy",
    lead: privacyLead,
    versionLine: (version: string, updated: string) => `Version ${version}, updated ${updated}`,
    version: "2.0",
    updated: "29 August 2026",
  },
```

Met, bij de consts bovenin `lib/i18n/en/pages.tsx` (net als in de NL-versie, zodat de lead niet dubbel staat):

```tsx
const privacyLead = "I think it matters that you know what I do with your data. This page explains how I handle it.";
```

- [ ] **Step 2: Vertaal `lib/i18n/en/legal-privacy.tsx`**

Vertaal de body van `lib/i18n/nl/legal-privacy.tsx` alinea voor alinea, met deze harde regels:

- Structuur identiek: dezelfde volgorde van `<h2>`, `<p>`, `<ul>`/`<li>` en `<strong>`. Geen alinea weglaten of toevoegen.
- Bovenaan de body dezelfde vertaal-disclaimer als bij de voorwaarden: `<p><strong>This is a translation for convenience.</strong> The Dutch version, <a href={href("nl", "privacy")}>Privacybeleid</a>, is the binding one.</p>`.
- Alle interpolaties (`{site.founder}`, `{site.city}`, `{site.kvk …}`, `{site.email}`) en alle `<a href=…>` blijven staan; de link naar de voorwaarden is `href(L, "voorwaarden")` met `L = "en"`.
- Koppen, in deze volgorde: "Who is responsible for your data?", "What data do I keep about you?", "Why do I use your data?", "Who do I share your data with?", "How long do I keep your data?", "Websites I host for you", "Where is your data stored?", "How do I protect your data?", "Are decisions about you made by computers alone?", "Cookies", "Your privacy rights", "Questions or complaints?", "Changes to this policy", "Who am I?".
- Termen: AVG → "the GDPR (the EU General Data Protection Regulation)" bij de eerste vermelding, daarna "the GDPR"; "Autoriteit Persoonsgegevens" blijft staan met de toevoeging "(the Dutch data protection authority)"; "verwerkersovereenkomst" → "data processing agreement"; "eenmanszaak" → "sole proprietorship"; "KvK-nummer" → "Chamber of Commerce (KvK) number".
- De openingsalinea noemt niet meer alleen de Hoeksche Waard: "HitzDigital builds and hosts websites for small businesses in the Netherlands and abroad, and helps with computer problems."
- Brits-Engels, "you/your", geen juridisch jargon dat de Nederlandse tekst ook niet gebruikt.

- [ ] **Step 3: Typecheck, bouw, nalezen, commit**

Run: `npx tsc --noEmit && npm run build`. Open `/en/privacy` naast `/privacy` en loop de koppen langs: 14 tegenover 14.

**CHECKPOINT:** Nathaniel leest `/en/privacy` na.

```bash
git add -A
git commit -m "EN: privacy policy"
```

---

### Task 27: EN terms and conditions

**Files:**
- Modify: `lib/i18n/en/legal-terms.tsx`, `lib/i18n/en/pages.tsx` (blok `voorwaarden`)

- [ ] **Step 1: Blok `voorwaarden` in `lib/i18n/en/pages.tsx`**

```tsx
  voorwaarden: {
    meta: {
      title: "Terms and conditions | HitzDigital",
      description: "HitzDigital's terms in plain language: websites, hosting and maintenance, computer and website help, payment, cancellation and ownership.",
    },
    og: { title: "Terms and *conditions*", kicker: "Terms", sub: voorwaardenLead },
    crumb: "Terms",
    title: "Terms and conditions",
    lead: voorwaardenLead,
    updatedLine: (updated: string) => `Last updated: ${updated}`,
    updated: "26 August 2026",
  },
```

Met, bij de consts bovenin `lib/i18n/en/pages.tsx`:

```tsx
const voorwaardenLead = "No small print, but clear agreements. This is what you can expect from me, and what I expect from you.";
```

- [ ] **Step 2: Vertaal `lib/i18n/en/legal-terms.tsx`**

Zelfde procedure als Task 26, met:

- **Eerste alinea, vóór "In six sentences"** (nieuw, spec §7):

```tsx
      <p>
        <strong>This is a translation for convenience.</strong> The Dutch version,{" "}
        <a href={href("nl", "voorwaarden")}>Algemene voorwaarden</a>, is the legally binding one.
      </p>
```
  (import `href` uit `../paths`).
- Koppen: "In six sentences", "1. Who and what for", "2. Websites", "3. Hosting, domain and maintenance", "4. Computer and website help", "5. If you're a private individual", "6. Liability", "7. Privacy", "8. Changes and applicable law".
- Berekeningen (`onderhoud`, `webshop`, `mailOne`, `mailMulti`, `namen`, `pakketten`) blijven; `pakketten` wordt met " or " gejoind in plaats van " of ": `` `${namen.slice(0, -1).join(", ")} or ${namen.at(-1)}` ``. `services` wijst naar `./services` (EN), dus pakketnamen zijn "Online" en "Maintenance".
- Termen: "APK" → "check-up"; "strippenkaart" → "prepaid card"; "voorrijkosten" → "call-out charges"; "incl. btw" → "incl. VAT"; "Nederlands recht" → "Dutch law"; "kantonrechter"/rechtbank blijven Nederlandse instanties, benoem ze als "the competent court in the Netherlands".
- In §1 wordt de regio-beperking op hulp aan huis benoemd: "On-site help is available in the Hoeksche Waard area only; everything else I do remotely, for clients in the Netherlands and abroad."
- De zin over btw in "In six sentences" wordt: "All prices on the site are incl. 21% VAT; VAT may differ for businesses outside the Netherlands."

- [ ] **Step 3: Typecheck, bouw, nalezen, commit**

Run: `npx tsc --noEmit && npm run build`. Open `/en/terms`: eerste alinea is de vertaalnotitie met werkende link naar `/voorwaarden`; 9 koppen tegenover 9.

**CHECKPOINT fase 2:** Nathaniel leest `/en/terms` na en bevestigt dat alle EN-pagina's akkoord zijn. Daarna fase 3.

```bash
git add -A
git commit -m "EN: terms and conditions"
```

---

# Fase 3 — Taalschakelaar, contextuele header-knop, cookie en detectie

### Task 28: `LangSwitch` in nav, mobiel menu en footer

**Files:**
- Create: `components/ui/LangSwitch.tsx`
- Modify: `components/layout/Nav.tsx`, `components/layout/Footer.tsx`, `app/[lang]/(site)/layout.tsx`

- [ ] **Step 1: Maak `components/ui/LangSwitch.tsx`**

```tsx
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
```

(Footer: de klikbare taal krijgt dezelfde `text-muted` als de andere footerlinks, de huidige taal staat als gewone footertekst in `text-faint`. Dat is de footer-conventie van de site; spec §4 noemde het andersom, de leesbaarheid wint.)

- [ ] **Step 2: `components/layout/Nav.tsx`**

Import: `import { LangSwitch, type LangSwitchLabels } from "@/components/ui/LangSwitch";`. Voeg aan `NavLabels` toe: `langRow: string;` en aan `Props`: `langLabels: LangSwitchLabels;` (destructureer `langLabels`).

Desktop, direct vóór `<ThemeSwitch labels={theme} />`:

```tsx
            <LangSwitch lang={lang} labels={langLabels} variant="text" />
```

Mobiel menu: vervang het blok met `labels.themeRow` door twee rijen:

```tsx
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
```

- [ ] **Step 3: `components/layout/Footer.tsx`**

Import `LangSwitch`. Direct na de `</ul>` van de juridische links:

```tsx
          <LangSwitch lang={lang} labels={ui.lang} variant="names" className="text-[12.5px]" />
```

- [ ] **Step 4: `app/[lang]/(site)/layout.tsx`**

Geef `Nav` de extra prop: `langLabels={ui.lang}` (`labels={ui.nav}` bevat al `langRow`).

- [ ] **Step 5: Typecheck, bouw, controleer, commit**

Run: `npx tsc --noEmit && npm run build`. In `npm run dev` op 1280px: "NL · EN" links van de themaknop; klik "EN" op `/hulp` → `/en/help`; footer toont "Nederlands | English". Op 390px: menu open → rij "Taal" met de pil onder "Weergave", beide 76×40 (meet in devtools). Cookie `lang` staat na een klik in Application → Cookies.

```bash
git add -A
git commit -m "Taalschakelaar in nav, mobiel menu en footer; cookie bij klik"
```

---

### Task 29: Contextuele header-knop met klikmeting

**Files:**
- Modify: `components/layout/Nav.tsx`, `app/[lang]/(site)/layout.tsx`
- Test: `tests/e2e/i18n.test.mjs`

- [ ] **Step 1: e2e-test voor de knop per route**

```js
test("header-knop volgt de pagina (spec §4)", async () => {
  const header = (html) => html.slice(html.indexOf("<header"), html.indexOf("</header>"));
  const expect = [
    ["/", "/contact?voor=website", "Gratis demo"],
    ["/websites", "/contact?voor=website", "Gratis demo"],
    ["/werk/monster-zorg", "/contact?voor=website", "Gratis demo"],
    ["/hosting", "/contact?voor=hosting", "Vraag hosting aan"],
    ["/hulp", "/contact?voor=hulp", "Vraag hulp aan"],
    ["/privacy", "/contact", "Contact"],
    ["/support", "/contact", "Contact"],
    ["/en", "/en/contact?voor=website", "Free demo"],
    ["/en/hosting", "/en/contact?voor=hosting", "Request hosting"],
    ["/en/help", "/en/contact?voor=hulp", "Request help"],
    ["/en/terms", "/en/contact", "Contact"],
  ];
  for (const [path, href, label] of expect) {
    const h = header(await (await get(path)).text());
    const re = new RegExp(`href="${href.replace("?", "\\?")}"[^>]*>\\s*${label}`);
    assert.match(h, re, path);
  }
  // De taalschakelaar (Task 28) linkt op de contactpagina zelf ook naar /contact resp. /en/contact;
  // die valt buiten de vraag "staat er een knop?" en wordt er eerst uitgeknipt.
  const withoutLangSwitch = (h) => h.replace(/<a [^>]*hrefLang="[a-z]{2}"[^>]*>.*?<\/a>/g, "");
  for (const path of ["/contact", "/en/contact"]) {
    const h = withoutLangSwitch(header(await (await get(path)).text()));
    assert.doesNotMatch(h, /href="\/(en\/)?contact/, `${path}: geen knop`);
  }
});
```

Run (met draaiende `npm start`): `npm run test:e2e` — Expected: deze test faalt op `/hosting` (knop is nog "Gratis demo").

- [ ] **Step 2: `components/layout/Nav.tsx`**

Imports:

```tsx
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { ctaFor, publicPath, type CtaKind, type Lang } from "@/lib/i18n/paths";
```

Vervang in `Props` de regel `cta: { label: string; href: string };` door:

```tsx
  /** Labels per knopsoort; welke soort geldt, volgt uit de pathname (padkaart). */
  ctaLabels: Record<CtaKind, string>;
  /** Contactpagina in deze taal; `?voor=` wordt hier achter gezet. */
  contactHref: string;
```

Bovenin de component (na de `useState`-regels):

```tsx
  // publicPath: de middleware herschrijft, dus usePathname() geeft /nl/hosting in plaats van /hosting.
  const pathname = publicPath(usePathname() ?? "/");
  const kind = ctaFor(pathname);
  const cta = kind
    ? { kind, label: ctaLabels[kind], href: kind === "contact" ? contactHref : `${contactHref}?voor=${kind === "demo" ? "website" : kind}` }
    : null;
  const onCta = () => {
    try {
      track("nav_cta", { cta: kind ?? "", lang, path: pathname });
    } catch {}
  };
```

Desktop-knop:

```tsx
            {cta && (
              <a
                href={cta.href}
                onClick={onCta}
                className="inline-flex items-center gap-2 rounded-full border border-line px-[17px] py-[9px] font-medium text-ink transition-[border-color,background-color] duration-[250ms] hover:border-accent/55 hover:bg-accent/12"
              >
                {cta.label}
              </a>
            )}
```

Knop onderin het mobiele menu:

```tsx
        {cta && (
          <Button
            href={cta.href}
            className="w-full py-4 text-[16px]"
            onClick={() => {
              onCta();
              close();
            }}
          >
            {cta.label}
          </Button>
        )}
```

- [ ] **Step 3: `app/[lang]/(site)/layout.tsx`**

Vervang `cta={{ label: ui.nav.cta.demo, href: ui.cta.demo.href }}` door `ctaLabels={ui.nav.cta} contactHref={href(lang, "contact")}` (import `href` uit `@/lib/i18n/paths`).

- [ ] **Step 4: Bouw, e2e, commit**

```bash
npx tsc --noEmit && npm run build
npm start &
npm run test:e2e
kill %1
```
Expected: alle e2e-tests slagen. In Vercel Analytics verschijnt na deploy het event `nav_cta` met eigenschappen `cta`, `lang`, `path`.

```bash
git add -A
git commit -m "Header-knop volgt de pagina; nav_cta-event"
```

---

### Task 30: Homepage-detectie (middleware-regel 5) en browsertest van de cookie

**Files:**
- Modify: `middleware.ts`
- Test: `tests/e2e/i18n.test.mjs`, `tests/e2e/switch-cookie.mjs`

- [ ] **Step 1: e2e-matrix schrijven**

```js
test("homepage kiest taal: cookie eerst, dan Accept-Language (spec §2 regel 5)", async () => {
  const matrix = [
    [{}, 200],
    [{ "accept-language": "en-GB,en;q=0.9" }, 307],
    [{ "accept-language": "en-US,en;q=0.9,nl;q=0.5" }, 307],
    [{ "accept-language": "nl-NL,nl;q=0.9,en;q=0.8" }, 200],
    [{ "accept-language": "en;q=0.8,nl;q=0.8" }, 200],
    [{ "accept-language": "de-DE,de;q=0.9" }, 200],
    [{ cookie: "lang=en" }, 307],
    [{ cookie: "lang=nl", "accept-language": "en-GB,en;q=0.9" }, 200],
    [{ cookie: "lang=xx", "accept-language": "en-GB,en;q=0.9" }, 307],
  ];
  for (const [headers, status] of matrix) {
    const res = await get("/", { headers });
    assert.equal(res.status, status, JSON.stringify(headers));
    if (status === 307) assert.equal(location(res), "/en", JSON.stringify(headers));
    else assert.match(await res.text(), /<html[^>]*\blang="nl"/, JSON.stringify(headers));
    assert.match(res.headers.get("vary") ?? "", /Accept-Language/i, JSON.stringify(headers));
  }
});

test("detectie geldt alleen voor de kale homepage", async () => {
  for (const p of ["/websites", "/hulp", "/contact", "/werk/volmer-techniek"]) {
    const res = await get(p, { headers: { "accept-language": "en-GB,en;q=0.9", cookie: "lang=en" } });
    assert.equal(res.status, 200, p);
  }
});
```

Run (server draait): `npm run test:e2e` — Expected: de matrix faalt (alles geeft nu 200).

- [ ] **Step 2: Regel 5 in `middleware.ts`**

Import: `import { prefersEnglish } from "@/lib/i18n/accept-language";`. Vervang het slot van `middleware()` (vanaf "Regel 7") door:

```ts
  // Regel 5: alleen de kale homepage kiest zelf een taal. Cookie eerst, anders Accept-Language.
  if (pathname === "/" && isLive("en")) {
    const cookie = req.cookies.get("lang")?.value;
    const toEn = cookie === "en" || (cookie !== "nl" && prefersEnglish(req.headers.get("accept-language")));
    if (toEn) {
      const url = req.nextUrl.clone();
      url.pathname = "/en";
      const res = NextResponse.redirect(url, 307);
      res.headers.set("Vary", "Cookie, Accept-Language");
      return res;
    }
  }

  // Regel 7: Nederlands zonder prefix → interne route /nl/…
  const res = rewrite(req, pathname === "/" ? "/nl" : `/nl${pathname}`);
  if (pathname === "/") res.headers.set("Vary", "Cookie, Accept-Language");
  return res;
```

Werk de doc-comment bovenin bij: alle regels 1 t/m 7 aanwezig.

- [ ] **Step 3: Browsertest `tests/e2e/switch-cookie.mjs`**

```js
// Browsertest: een klik op de taalschakelaar zet de cookie `lang` en de homepage volgt die cookie.
// Draaien: server op 3111 (`npm start`), symlink ../node_modules/playwright (Task 17), dan `node tests/e2e/switch-cookie.mjs`.
import { chromium } from "playwright";
import assert from "node:assert/strict";

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
// De globale Playwright vindt zijn eigen Chromium niet; wijs naar de gecachete build 1243 (Task 17 Step 1).
const CHROME = process.env.CHROME_PATH ?? "/Users/nathaniel/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const browser = await chromium.launch({ executablePath: CHROME });
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();

  // Desktop: nav-schakelaar NL → EN
  await page.goto(`${BASE}/hulp`);
  await page.locator('header a[hreflang="en"]').click();
  await page.waitForURL(`${BASE}/en/help`);
  let cookie = (await ctx.cookies()).find((c) => c.name === "lang");
  assert.equal(cookie?.value, "en", "cookie na klik in nav");
  assert.ok(cookie.expires > Date.now() / 1000 + 300 * 24 * 3600, "cookie geldt ongeveer een jaar");

  // Footer: EN → NL
  await page.locator('footer a[hreflang="nl"]').click();
  await page.waitForURL(`${BASE}/hulp`);
  cookie = (await ctx.cookies()).find((c) => c.name === "lang");
  assert.equal(cookie?.value, "nl", "cookie na klik in footer");

  // Homepage volgt de cookie
  await ctx.clearCookies();
  await ctx.addCookies([{ name: "lang", value: "en", url: BASE }]);
  await page.goto(`${BASE}/`);
  assert.equal(new URL(page.url()).pathname, "/en", "homepage volgt cookie=en");

  // Mobiel menu: segment-variant
  const mob = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await mob.newPage();
  await mp.goto(`${BASE}/websites`);
  await mp.getByRole("button", { name: "Menu openen" }).click();
  await mp.locator('#mobile-menu a[hreflang="en"]').click();
  await mp.waitForURL(`${BASE}/en/websites`);
  assert.equal((await mob.cookies()).find((c) => c.name === "lang")?.value, "en", "cookie na klik in mobiel menu");

  console.log("switch-cookie: OK");
} finally {
  await browser.close();
}
```

- [ ] **Step 4: Bouw, alle tests, commit**

```bash
npx tsc --noEmit && npm run build
npm start &
npm run test:e2e
node tests/e2e/switch-cookie.mjs
kill %1
```
Expected: e2e allemaal groen; `switch-cookie: OK`.

```bash
git add -A
git commit -m "Middleware: taalkeuze op de homepage via cookie of Accept-Language; browsertest cookie"
```

- [ ] **Step 5: CHECKPOINT fase 3**

Nathaniel test zelf in de browser: `/` met Engelse browsertaal → `/en`; klik "NL" → blijft daarna NL; mobiel menu; header-knop op Hosting/Hulp/Privacy. Akkoord vóór fase 4.

---

# Fase 4 — SEO-afronding en uitrol

### Task 31: hreflang, OpenGraph-alternates, sitemap-controle en lek-check

**Files:**
- Modify: `lib/i18n/meta.ts`
- Test: `tests/e2e/i18n.test.mjs`

- [ ] **Step 1: `alternateLocale` in `lib/i18n/meta.ts`**

```ts
  const alternates = alternatesFor(lang, key, opts.slug);
  return {
    title: t.title,
    description: t.description,
    alternates,
    openGraph: {
      title: t.title,
      description: t.description,
      url,
      siteName: site.name,
      locale: ogLocale(lang),
      ...(alternates.languages ? { alternateLocale: ogLocale(lang === "nl" ? "en" : "nl") } : {}),
      type: opts.type ?? "website",
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  };
```

- [ ] **Step 2: e2e-tests voor hreflang, sitemap en lek-check**

```js
const PAIRS = [
  ["/", "/en"], ["/websites", "/en/websites"], ["/hosting", "/en/hosting"], ["/hulp", "/en/help"],
  ["/werk", "/en/work"], ["/werk/monster-zorg", "/en/work/monster-zorg"], ["/contact", "/en/contact"],
  ["/privacy", "/en/privacy"], ["/voorwaarden", "/en/terms"],
];
const SITE = "https://www.hitzdigital.nl";
const abs = (p) => (p === "/" ? SITE : SITE + p);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");

test("hreflang is symmetrisch en heeft x-default = NL", async () => {
  for (const [nl, en] of PAIRS) {
    for (const p of [nl, en]) {
      const html = await (await get(p)).text();
      assert.match(html, new RegExp(`hreflang="nl"[^>]*href="${esc(abs(nl))}"|href="${esc(abs(nl))}"[^>]*hreflang="nl"`), `${p}: nl`);
      assert.match(html, new RegExp(`hreflang="en"[^>]*href="${esc(abs(en))}"|href="${esc(abs(en))}"[^>]*hreflang="en"`), `${p}: en`);
      assert.match(html, new RegExp(`hreflang="x-default"[^>]*href="${esc(abs(nl))}"|href="${esc(abs(nl))}"[^>]*hreflang="x-default"`), `${p}: x-default`);
      assert.match(html, new RegExp(`rel="canonical" href="${esc(abs(p))}"`), `${p}: canonical`);
    }
  }
  const support = await (await get("/support")).text();
  assert.doesNotMatch(support, /hreflang=/, "support heeft geen hreflang");
});

test("og:locale en alternate", async () => {
  const nl = await (await get("/hulp")).text();
  assert.match(nl, /property="og:locale" content="nl_NL"/);
  assert.match(nl, /property="og:locale:alternate" content="en_GB"/);
  const en = await (await get("/en/help")).text();
  assert.match(en, /property="og:locale" content="en_GB"/);
});

test("sitemap bevat beide talen met alternates, support alleen NL", async () => {
  const xml = await (await get("/sitemap.xml")).text();
  for (const [nl, en] of PAIRS) {
    assert.match(xml, new RegExp(`<loc>${esc(abs(nl))}</loc>`), nl);
    assert.match(xml, new RegExp(`<loc>${esc(abs(en))}</loc>`), en);
    assert.match(xml, new RegExp(`hreflang="en" href="${esc(abs(en))}"`), `${nl}: alternate en`);
  }
  assert.match(xml, new RegExp(`<loc>${esc(SITE)}/support</loc>`));
  assert.doesNotMatch(xml, /\/en\/support/);
});

test("lek-check: geen Nederlandse schil-teksten op Engelse pagina's", async () => {
  const forbidden = ["Gratis demo", "Vraag je", "Vraag hosting", "Vraag hulp", "Neem contact", "per maand", "incl. btw", "Werkwijze",
    "Veelgestelde", "Maandelijks opzegbaar", "Kies je pakket", "Lees de", "Weergave", "Naar inhoud", "Heb je een vraag", "Privacybeleid",
    "Deze pagina bestaat niet"];
  for (const p of [...EN_PAGES, "/en/does-not-exist"]) {
    const html = await (await get(p)).text();
    const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
    for (const w of forbidden) assert.ok(!text.includes(w), `${p} bevat "${w}"`);
    if (p !== "/en/does-not-exist") assert.match(html, /"inLanguage":"en"/, `${p}: schema inLanguage`);
  }
});
```

- [ ] **Step 3: Bouw, tests, commit**

```bash
npx tsc --noEmit && npm run build
npm start &
npm run test:e2e
kill %1
```
Expected: alles groen. Faalt de lek-check, dan staat er nog een Nederlandse string in een EN-woordenboek of in een component: herstel in het woordenboek, nooit door het woord uit de lijst te halen.

```bash
git add -A
git commit -m "SEO: og:locale:alternate; e2e voor hreflang, sitemap en lek-check"
```

---

### Task 32: Eindcontrole, merge en deploy

- [ ] **Step 1: Screenshots na fase 3 vergelijken**

```bash
npm run build && (npm start & sleep 4) \
  && BASE=http://localhost:3111 OUT=../screenshots/fase3 node ../screenshots/tools/shots.mjs; kill %1
python3 tests/visual/diff.py ../screenshots/baseline-main ../screenshots/fase3 2
```
Expected: kleine, verklaarbare verschillen (drempel 2%): de schakelaar in nav en footer op elke pagina, en het label van de header-knop op `03-hosting`, `11-hulp`, `13-privacy`, `14-voorwaarden`, `08-support` en `09/10-support-*`. Elk ander verschil is een fout.

Maak daarnaast Engelse screenshots ter controle door Nathaniel: kopieer `../screenshots/tools/shots.mjs` naar `shots-en.mjs`, vervang de `PAGES`-lijst door de Engelse paden (`/en/websites`, `/en/hosting`, `/en/work`, `/en/work/volmer-techniek`, `/en/work/mourits-schilderwerken`, `/en/work/monster-zorg`, `/en/help`, `/en/contact`, `/en/privacy`, `/en/terms`) en de homepage-URL door `/en`, en schrijf naar `OUT=../screenshots/en`.

- [ ] **Step 2: Volledige testrun**

```bash
npm run lint
npm run test:unit
npm run build && (npm start & sleep 4) && npm run test:e2e && node tests/e2e/switch-cookie.mjs; kill %1
```
Expected: lint zonder fouten, unit `fail 0`, e2e `fail 0`, `switch-cookie: OK`.

- [ ] **Step 3: Merge en deploy**

```bash
git checkout main
git merge --no-ff feature/engels -m "Engelse versie: /en met taalschakelaar, detectie op de homepage en contextuele header-knop"
git push origin main
```
Vercel bouwt automatisch (~1 min). Volg de deploy in het Vercel-dashboard; de build moet dezelfde route-lijst tonen als lokaal.

- [ ] **Step 4: Live-controle**

```bash
BASE_URL=https://www.hitzdigital.nl npm run test:e2e
```
Expected: alle e2e-tests slagen tegen productie (de matrix, redirects, hreflang, sitemap, lek-check). Controleer daarnaast handmatig in een browser met Engelse taalinstelling dat `https://www.hitzdigital.nl/` naar `/en` gaat en dat een klik op "NL" dat een jaar onthoudt.

- [ ] **Step 5: Search Console en nazorg (Nathaniel)**

- Dien `https://www.hitzdigital.nl/sitemap.xml` opnieuw in bij Google Search Console en vraag indexering aan voor `/en`.
- Controleer na een week onder "Internationale targeting" / "Pagina's" dat de `/en/`-URL's geïndexeerd worden en er geen hreflang-fouten zijn.
- Kijk na een maand in Vercel Analytics naar `nav_cta` (per `cta`, `lang`) en `form_submit` (per `lang`).
- Zodra hitzdigital.com gekocht is: in Vercel het domein toevoegen als redirect (301) naar `https://www.hitzdigital.nl/en` met behoud van pad. Geen codewijziging nodig.
- Branch opruimen: `git branch -d feature/engels`.

---

## Spec-dekking (zelfcontrole)

| Spec | Task |
|---|---|
| §1 URL-structuur, padkaart, ankers/query ongewijzigd, 404 in taal, layout onder `[lang]`, root-metadata-routes | 2, 5, 15, 16 |
| §2 middleware regels 1, 2, 7 · regels 3, 4, 6 · regel 5, cookie, Vary, Googlebot | 5 · 18 · 30 |
| §3 woordenboeken, NL als bron/typering, JSX in `.tsx`, client-componenten met string-props, taalneutrale data, `generateMetadata`, schema met taal, EN-footer zonder Support | 4, 6, 7–16, 18–27, 16, 19 |
| §4 LangSwitch drie varianten, cookie bij klik, tegenhanger, aria · header-knop per pijler, `track("nav_cta")` | 28 · 29 |
| §5 `<html lang>`, canonical + hreflang + x-default, sitemap-alternates, og:locale/alternate, OG-afbeeldingen per taal, schema `inLanguage`/`knowsLanguage`, Britse spelling | 5, 8, 16, 15, 31, 19–27 |
| §6 formulier-copy, verborgen `lang`, `[EN]`-onderwerp, analytics-eigenschap | 13, 25 |
| §7 Engelse positionering, VAT-voetnoot, No fix no fee, Terms-notitie, Privacy volledig, review per pagina | 19–27 |
| §8 tests: redirect-matrix, diepe links, canonieke 301's, schakelaar, header-knop, metadata/hreflang/sitemap, lek-check, screenshots, tsc + build | 5, 18, 29, 30, 31, 17, 32 |
| §9 fasen, checkpoints, alles in één keer live, .com later | 17, 27, 30, 32 |
