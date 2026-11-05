# Support-zijmenu — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Op elke artikelpagina onder `/support/<slug>` staat in de hero een knop "Alle handleidingen" die een paneel van links laat inschuiven met alle handleidingen per categorie, een link naar `/hulp` en een "App me"-knop; het paneel blijft open bij doorklikken naar een ander artikel.

**Architecture:** Een nieuwe layout op `app/[lang]/(site)/support/layout.tsx` (statisch segment, blijft gemonteerd bij client-side navigatie) rendert een client-provider met de open-status en het paneel. De artikelpagina zet alleen de knop in de hero. Artikellinks in het paneel zijn `next/link`, zodat alleen het artikel eronder wisselt en de status blijft. Het dialoogpatroon (Escape, `inert`, scroll-lock, focus) is gekopieerd van het mobiele menu in `components/layout/Nav.tsx`.

**Tech Stack:** Next.js 15 (App Router, middleware-rewrite naar `/nl/…`), React 19, Tailwind v4 (`@theme inline`-tokens), Phosphor-iconen, Playwright via `../node_modules/playwright` + lokale Chromium 1243, Node 24.

**Spec:** `docs/superpowers/specs/2026-11-05-support-zijmenu-design.md`

**Werkmap:** alle commando's vanuit `/Users/nathaniel/Documents/Hitzdigital-web/site` (de git-root). Scratchmap: `/private/tmp/claude-501/-Users-nathaniel-Documents-Hitzdigital-web/14e57230-c715-4743-a5b8-bbe3687f1820/scratchpad`.

**Niet pushen.** `git push` naar main deployt direct naar Vercel. Alle tasks committen lokaal; pushen is een aparte beslissing van Nathaniel.

---

## Afwijking van de spec (vastgelegd in Task 1)

De spec plaatst de layout op `support/[slug]/layout.tsx`. Een layout ín een dynamisch segment krijgt in de App Router een cache-sleutel met de slug-waarde erin en mount opnieuw als de slug wisselt. Dan gaat de open-status verloren, precies wat we wilden voorkomen. De layout komt daarom één niveau hoger: `support/layout.tsx`. Gevolgen:

1. De layout omhult ook `/support` (het overzicht). Daar staat geen knop; het paneel is daar inert markup. Een effect sluit het paneel zodra het pad geen artikelpagina meer is, zodat de scroll-lock nooit op `/support` blijft hangen.
2. De layout (server) berekent de categorie-groepen uit `supportArticles` en geeft ze als platte props aan het paneel. Zo komt `lib/support.ts` (dat de artikel-componenten importeert) niet in de client-bundel.
3. Focus terug na sluiten: het paneel zoekt de knop via `[aria-controls="support-drawer"]` in plaats van een ref. Na doorklikken is de knop een nieuw element; de query vindt automatisch de nieuwe.

Nog een correctie: `Nav.tsx` heeft geen focus-sentinels (de "sentinel" daar is voor de scroll-detectie). Het paneel vangt Tab zelf op in een keydown-handler.

---

## Bestanden

| Bestand | Rol | Actie |
|---|---|---|
| `docs/superpowers/specs/2026-11-05-support-zijmenu-design.md` | Spec aanpassen op de afwijking hierboven | wijzigen (Task 1) |
| `tests/e2e/support-drawer.mjs` | Browsertest voor het hele gedrag uit de spec | aanmaken (Task 2) |
| `components/support/SupportDrawer.tsx` | Client: context, knop, scrim + paneel, focus, Escape, scroll-lock, sluiten-bij-verlaten | aanmaken (Task 3) |
| `app/[lang]/(site)/support/layout.tsx` | Server: groepen berekenen, provider + paneel om de kinderen | aanmaken (Task 4) |
| `app/[lang]/(site)/support/[slug]/page.tsx` | Knop in de hero, `tabIndex={-1}` op `main` | wijzigen (Task 4) |
| `tests/visual/support-drawer-shots.mjs` | Screenshots licht/donker, dicht/open, 1280 en 390 px | aanmaken (Task 6) |

---

### Task 1: Spec bijwerken op de layout-positie

**Files:**
- Modify: `docs/superpowers/specs/2026-11-05-support-zijmenu-design.md`

- [ ] **Step 1: Vervang de structuursectie van de layout**

Zoek in de spec het kopje `### \`app/[lang]/(site)/support/[slug]/layout.tsx\` (nieuw)` met de alinea eronder en vervang door:

```markdown
### `app/[lang]/(site)/support/layout.tsx` (nieuw)

Omhult het overzicht `/support` en alle artikelpagina's. Een layout ín het dynamische segment `[slug]` zou bij een slug-wissel opnieuw mounten (de cache-sleutel bevat de slug), waardoor de open-status verloren gaat; op het statische segment `support` blijft de layout gemonteerd bij client-side navigatie tussen artikelen.

De layout is een server-component. Hij berekent uit `supportArticles` de groepen `{ category, items: { slug, title }[] }[]` in bestandsvolgorde en geeft die als props aan het paneel, zodat `lib/support.ts` (dat de artikel-componenten importeert) buiten de client-bundel blijft. Rendert `SupportDrawerProvider` met daarin `children` en `SupportDrawerPanel`.

Op `/support` staat geen knop; het paneel is daar inert markup. Een effect in de provider sluit het paneel zodra het pad geen `/support/<slug>` meer is, zodat de scroll-lock nooit op het overzicht blijft hangen.
```

- [ ] **Step 2: Pas de tabel "Keuzes" en de focus-regel aan**

In de rij `Techniek` van de tabel "Keuzes": vervang `Paneel in een eigen layout voor de artikelroute` door `Paneel in een layout op het segment support`.

In "Openen en sluiten", de regel die begint met `Focus blijft binnen het paneel via sentinels, zoals in \`Nav\`.`: vervang door `Focus blijft binnen het paneel: een keydown-handler op het paneel vangt Tab en Shift+Tab op en springt rond tussen het eerste en laatste focusbare element.`

De regel `Bij sluiten gaat focus terug naar de heroknop als die nog in de DOM staat. Na doorklikken is het een nieuwe knop; dan krijgt die de focus, anders \`main\`.` vervang door `Bij sluiten gaat focus naar het element met \`aria-controls="support-drawer"\` (de heroknop, na doorklikken automatisch de nieuwe), anders naar \`main\` (dat daarvoor \`tabIndex={-1}\` krijgt).`

In de tabel "Randgevallen", rij `Navigatie naar /support of elders`: vervang de gedragskolom door `Naar /support: layout blijft, effect sluit het paneel en de cleanup herstelt de scroll. Elders: layout unmount, cleanup herstelt de scroll`.

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/specs/2026-11-05-support-zijmenu-design.md
git commit -m "Spec: zijmenu-layout op segment support, focus zonder sentinels

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: Browsertest schrijven (faalt eerst)

**Files:**
- Create: `tests/e2e/support-drawer.mjs`

- [ ] **Step 1: Schrijf de test**

```js
// Browsertest voor het support-zijmenu (spec 2026-11-05-support-zijmenu-design.md, sectie Test).
// Draaien: server op 3111 (`npm run build && npm start`), symlink ../node_modules/playwright, dan `node tests/e2e/support-drawer.mjs`.
import { chromium } from "playwright";
import assert from "node:assert/strict";

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const CHROME = process.env.CHROME_PATH ?? "/Users/nathaniel/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const A = "/support/e-mail-instellingen";
const B = "/support/e-mail-instellen-iphone";
const B_TITLE = "E-mail instellen op iPhone of iPad";

const state = (page) =>
  page.evaluate(() => {
    const panel = document.getElementById("support-drawer");
    const btn = document.querySelector('[aria-controls="support-drawer"]');
    return {
      hidden: panel?.getAttribute("aria-hidden"),
      inert: panel?.hasAttribute("inert") ?? null,
      expanded: btn?.getAttribute("aria-expanded") ?? null,
      overflow: document.body.style.overflow,
      focused: document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.textContent?.trim() ?? null,
      current: panel?.querySelector('[aria-current="page"]')?.textContent?.trim() ?? null,
      path: location.pathname,
      h1: document.querySelector("h1")?.textContent?.trim() ?? null,
    };
  });

const browser = await chromium.launch({ executablePath: CHROME });
try {
  // 1. Dicht bij laden.
  let ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  let page = await ctx.newPage();
  await page.goto(BASE + A);
  let s = await state(page);
  assert.equal(s.hidden, "true", "paneel aria-hidden bij laden");
  assert.equal(s.inert, true, "paneel inert bij laden");
  assert.equal(s.expanded, "false", "knop aria-expanded bij laden");

  // 2. Openen: open, focus op kruisje, scroll-lock.
  const openBtn = page.getByRole("button", { name: "Alle handleidingen" });
  await openBtn.click();
  await page.waitForTimeout(400);
  s = await state(page);
  assert.equal(s.hidden, "false", "paneel zichtbaar na klik");
  assert.equal(s.inert, false, "paneel niet inert na klik");
  assert.equal(s.expanded, "true", "knop aria-expanded na klik");
  assert.equal(s.focused, "Menu sluiten", "focus op kruisje");
  assert.equal(s.overflow, "hidden", "body scroll-lock");

  // 3a. Escape sluit, overflow hersteld, focus terug op de knop.
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);
  s = await state(page);
  assert.equal(s.hidden, "true", "dicht na Escape");
  assert.equal(s.overflow, "", "overflow hersteld na Escape");
  assert.equal(s.focused, "Alle handleidingen", "focus terug op knop na Escape");

  // 3b. Scrim-klik sluit.
  await openBtn.click();
  await page.waitForTimeout(400);
  await page.mouse.click(1000, 500);
  await page.waitForTimeout(250);
  s = await state(page);
  assert.equal(s.hidden, "true", "dicht na scrim-klik");

  // 3c. Kruisje sluit.
  await openBtn.click();
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: "Menu sluiten" }).click();
  await page.waitForTimeout(250);
  s = await state(page);
  assert.equal(s.hidden, "true", "dicht na kruisje");

  // 4. Doorklikken: paneel blijft open, actieve markering verspringt.
  await openBtn.click();
  await page.waitForTimeout(400);
  s = await state(page);
  assert.equal(s.current, "E-mailinstellingen: IMAP, POP3 en SMTP", "actief item bij start");
  await page.getByRole("dialog", { name: "Handleidingen" }).getByRole("link", { name: B_TITLE }).click();
  await page.waitForURL(BASE + B);
  await page.waitForTimeout(400);
  s = await state(page);
  assert.equal(s.path, B, "URL na doorklikken");
  assert.equal(s.h1, B_TITLE, "H1 na doorklikken");
  assert.equal(s.hidden, "false", "paneel blijft open na doorklikken");
  assert.equal(s.overflow, "hidden", "scroll-lock blijft na doorklikken");
  assert.equal(s.current, B_TITLE, "actief item verspringt");

  // 5. Klik op het actieve artikel sluit zonder navigatie.
  await page.getByRole("dialog", { name: "Handleidingen" }).getByRole("link", { name: B_TITLE }).click();
  await page.waitForTimeout(250);
  s = await state(page);
  assert.equal(s.path, B, "geen navigatie bij klik op actief item");
  assert.equal(s.hidden, "true", "dicht na klik op actief item");
  assert.equal(s.overflow, "", "overflow hersteld na klik op actief item");

  // 6. Onderin: link naar /hulp en App me aanwezig.
  await page.getByRole("button", { name: "Alle handleidingen" }).click();
  await page.waitForTimeout(400);
  const dialog = page.getByRole("dialog", { name: "Handleidingen" });
  assert.equal(await dialog.getByRole("link", { name: "Computer- en websitehulp" }).getAttribute("href"), "/hulp", "link naar /hulp");
  assert.match(await dialog.getByRole("link", { name: "App me" }).getAttribute("href"), /^https:\/\/wa\.me\//, "App me naar WhatsApp");
  await ctx.close();

  // 7. 375px: geen horizontale scroll, scrimstrook rechts sluit.
  ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  page = await ctx.newPage();
  await page.goto(BASE + A);
  await page.getByRole("button", { name: "Alle handleidingen" }).click();
  await page.waitForTimeout(400);
  const widths = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
    panel: document.getElementById("support-drawer").getBoundingClientRect().width,
  }));
  assert.equal(widths.scroll, widths.client, "geen horizontale scroll op 375px");
  assert.equal(widths.panel, 375 - 48, "paneel 100% min 48px op 375px");
  await page.mouse.click(365, 400);
  await page.waitForTimeout(250);
  s = await state(page);
  assert.equal(s.hidden, "true", "scrimstrook sluit op 375px");
  await ctx.close();

  // 8. Reduced motion: geen transform-overgang op het paneel.
  ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  page = await ctx.newPage();
  await page.goto(BASE + A);
  await page.getByRole("button", { name: "Alle handleidingen" }).click();
  const tp = await page.evaluate(() => getComputedStyle(document.getElementById("support-drawer")).transitionProperty);
  assert.doesNotMatch(tp, /transform/, `reduced motion: transitionProperty = ${tp}`);
  await ctx.close();

  console.log("support-drawer: alle checks geslaagd");
} finally {
  await browser.close();
}
```

- [ ] **Step 2: Build en start de server, draai de test, verwacht falen**

```bash
ls node_modules/playwright >/dev/null 2>&1 || ln -s ../node_modules/playwright node_modules/playwright
npm run build && (npm start > /private/tmp/claude-501/-Users-nathaniel-Documents-Hitzdigital-web/14e57230-c715-4743-a5b8-bbe3687f1820/scratchpad/server.log 2>&1 &)
sleep 3
node tests/e2e/support-drawer.mjs
```

Verwacht: `AssertionError … paneel aria-hidden bij laden` (expected `'true'`, actual `undefined`), want het paneel bestaat nog niet.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/support-drawer.mjs
git commit -m "Test: browsertest support-zijmenu (faalt nog)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: SupportDrawer-component

**Files:**
- Create: `components/support/SupportDrawer.tsx`

- [ ] **Step 1: Schrijf het component**

```tsx
"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
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

  return <DrawerContext.Provider value={{ open, setOpen }}>{children}</DrawerContext.Provider>;
}

/** Ghost-pil in de hero van een artikelpagina. Wordt gevonden via aria-controls voor de focus-teruggave. */
export function SupportDrawerButton() {
  const { open, setOpen } = useContext(DrawerContext);
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={PANEL_ID}
      onClick={() => setOpen(true)}
      className="inline-flex items-center gap-[10px] rounded-full border border-line px-[17px] py-[9px] text-[14px] font-medium leading-none text-ink transition-[transform,border-color,background-color] duration-[250ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-0.5 hover:border-accent/55 hover:bg-accent/10 active:translate-y-0 active:scale-[0.98] active:duration-[120ms]"
    >
      <List size={16} weight="bold" aria-hidden />
      Alle handleidingen
    </button>
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
  const firstRender = useRef(true);
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

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (open) {
      closeRef.current?.focus();
      return;
    }
    const back = document.querySelector<HTMLElement>(`[aria-controls="${PANEL_ID}"]`) ?? document.getElementById("main");
    back?.focus();
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
          "fixed inset-0 z-[60] bg-deep/55 backdrop-blur-[6px] transition-opacity",
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
          "fixed inset-y-0 left-0 z-[60] flex w-[360px] max-w-[calc(100%-48px)] flex-col border-r border-line bg-glass/97 pt-[88px] backdrop-blur-[12px]",
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
          <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" size="sm" className="mt-4">
            App me
          </Button>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

Verwacht: geen fouten. Als `inert` een type-fout geeft: React 19-types kennen `inert?: boolean`; `Nav.tsx` gebruikt het al, dus de fout zit dan elders.

- [ ] **Step 3: Commit**

```bash
git add components/support/SupportDrawer.tsx
git commit -m "Support: zijmenu-component (provider, knop, paneel)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: Layout en knop in de hero

**Files:**
- Create: `app/[lang]/(site)/support/layout.tsx`
- Modify: `app/[lang]/(site)/support/[slug]/page.tsx`

- [ ] **Step 1: Schrijf de layout**

```tsx
import type { ReactNode } from "react";
import { SupportDrawerPanel, SupportDrawerProvider, type SupportDrawerGroup } from "@/components/support/SupportDrawer";
import { supportArticles } from "@/lib/support";
import { whatsapp } from "@/lib/content";

/**
 * Omhult /support en /support/<slug>. Staat op het statische segment "support", zodat de layout
 * (en daarmee de open-status van het zijmenu) blijft bij client-side navigatie tussen artikelen.
 * Groepen worden hier berekend, zodat lib/support.ts (met de artikel-componenten) buiten de client-bundel blijft.
 */
export default function SupportLayout({ children }: { children: ReactNode }) {
  const groups: SupportDrawerGroup[] = [];
  for (const a of supportArticles) {
    let g = groups.find((x) => x.category === a.category);
    if (!g) {
      g = { category: a.category, items: [] };
      groups.push(g);
    }
    g.items.push({ slug: a.slug, title: a.title });
  }
  return (
    <SupportDrawerProvider>
      {children}
      <SupportDrawerPanel groups={groups} hulpHref="/hulp" whatsappHref={whatsapp} />
    </SupportDrawerProvider>
  );
}
```

- [ ] **Step 2: Knop in de hero en focusbare main**

In `app/[lang]/(site)/support/[slug]/page.tsx`:

Voeg bij de imports toe:

```tsx
import { SupportDrawerButton } from "@/components/support/SupportDrawer";
```

Vervang

```tsx
    <main id="main" className="relative z-[2] bg-deep">
```

door

```tsx
    <main id="main" tabIndex={-1} className="relative z-[2] bg-deep outline-none">
```

Vervang

```tsx
      <PageHero lang="nl" crumbs={[{ label: "Support", href: "/support" }, { label: a.title }]} title={a.title} lead={a.summary} />
```

door

```tsx
      <PageHero
        lang="nl"
        crumbs={[{ label: "Support", href: "/support" }, { label: a.title }]}
        title={a.title}
        lead={a.summary}
        actions={<SupportDrawerButton />}
      />
```

- [ ] **Step 3: Typecheck en build**

```bash
npm run typecheck && npm run build
```

Verwacht: beide slagen. Let in de build-uitvoer op `/support/[slug]` als statische route (●) met de twee slugs.

- [ ] **Step 4: Server herstarten en browsertest draaien**

```bash
pkill -f "next start" ; sleep 1
(npm start > /private/tmp/claude-501/-Users-nathaniel-Documents-Hitzdigital-web/14e57230-c715-4743-a5b8-bbe3687f1820/scratchpad/server.log 2>&1 &)
sleep 3
node tests/e2e/support-drawer.mjs
```

Verwacht: `support-drawer: alle checks geslaagd`.

Als check 4 ("paneel blijft open na doorklikken") faalt met `hidden = "true"`: de layout is opnieuw gemount. Controleer dat `layout.tsx` in `support/` staat en niet in `support/[slug]/`, en dat de link een `next/link` is (geen `<a href>`).

Als check 3a faalt op `focus terug op knop`: de knop zit in een `Reveal`; die verandert alleen opacity/transform, dus focus werkt. Controleer dan of `aria-controls` exact `support-drawer` is.

- [ ] **Step 5: Bestaande e2e-tests blijven groen**

```bash
npm run test:e2e
```

Verwacht: alle tests slagen (de i18n-test bezoekt `/support/e-mail-instellingen` en verwacht 200).

- [ ] **Step 6: Commit**

```bash
git add "app/[lang]/(site)/support/layout.tsx" "app/[lang]/(site)/support/[slug]/page.tsx"
git commit -m "Support: zijmenu-layout op segment support, knop in de hero

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5: Visuele controle in beide thema's

**Files:**
- Create: `tests/visual/support-drawer-shots.mjs`

- [ ] **Step 1: Schrijf het screenshot-script**

```js
// Screenshots van het support-zijmenu: licht en donker, dicht en open, op 1280 en 390 px.
// Draaien: server op 3111 (`npm start`), dan `node tests/visual/support-drawer-shots.mjs <uitvoermap>`.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const out = process.argv[2];
if (!out) { console.error("gebruik: node tests/visual/support-drawer-shots.mjs <uitvoermap>"); process.exit(2); }
mkdirSync(out, { recursive: true });

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const CHROME = process.env.CHROME_PATH ?? "/Users/nathaniel/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const browser = await chromium.launch({ executablePath: CHROME });
try {
  for (const theme of ["dark", "light"]) {
    for (const width of [1280, 390]) {
      const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 800 }, reducedMotion: "reduce" });
      await ctx.addInitScript((t) => localStorage.setItem("theme", t), theme);
      const page = await ctx.newPage();
      await page.goto(`${BASE}/support/e-mail-instellingen`);
      await page.waitForTimeout(700);
      await page.screenshot({ path: join(out, `zijmenu-${theme}-${width}-dicht.png`) });
      await page.getByRole("button", { name: "Alle handleidingen" }).click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: join(out, `zijmenu-${theme}-${width}-open.png`) });
      await ctx.close();
    }
  }
  console.log(`screenshots in ${out}`);
} finally {
  await browser.close();
}
```

- [ ] **Step 2: Draai het script naar de projectmap met screenshots**

```bash
node tests/visual/support-drawer-shots.mjs ../screenshots/support-zijmenu
```

Verwacht: 8 PNG's in `/Users/nathaniel/Documents/Hitzdigital-web/screenshots/support-zijmenu/`.

- [ ] **Step 3: Bekijk de 4 "open"-screenshots met de Read-tool en controleer**

- Paneel staat links, begint onder de header, logo en navigatie zijn vrij.
- Scrim dimt de pagina, paneel is leesbaar in licht en donker.
- Actief artikel heeft een groen streepje links en ink-kleur; het andere is gedempt.
- Onderin: tekst, link "Computer- en websitehulp", groene knop "App me".
- Op 390 px: strook scrim van 48 px rechts zichtbaar.

Wijkt iets af, pas de klassen in `components/support/SupportDrawer.tsx` aan, build opnieuw, herstart de server en maak de screenshots opnieuw.

- [ ] **Step 4: Commit**

```bash
git add tests/visual/support-drawer-shots.mjs
git commit -m "Test: screenshots support-zijmenu in licht en donker

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6: Afronden

- [ ] **Step 1: Server stoppen en checklist afvinken**

```bash
pkill -f "next start"
git status --short
```

Verwacht: schone werkboom. Vink alle stappen in dit plan af (`- [x]`) en commit het plan:

```bash
git add docs/superpowers/plans/2026-11-05-support-zijmenu.md
git commit -m "Plan: alle stappen afgevinkt

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

- [ ] **Step 2: Rapporteer aan Nathaniel, zonder te pushen**

Meld: welke commits er staan, dat de browsertest slaagt, waar de screenshots staan, en dat `git push origin main` de deploy naar Vercel start. Pushen is zijn beslissing.
