# Donker als standaardthema — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** De site toont standaard het donkere thema; licht is alleen nog een bewuste keuze via de zon/maan-knop. De OS-instelling (`prefers-color-scheme`) telt niet meer mee.

**Architecture:** Twee bronnen draaien om. In `app/globals.css` worden de donkere tokens de basis op `:root` (ook de fallback zonder JS) en de lichte tokens de uitzondering onder `:root[data-theme="light"]`; de `prefers-color-scheme`-blokken vervallen. In `app/[lang]/layout.tsx` krijgt next-themes `defaultTheme="dark"` en `enableSystem={false}`, zodat het inline script vóór hydration `data-theme="dark"` zet als er niets in localStorage staat en `data-theme="light"` als de bezoeker ooit op de zon klikte. Tokenwaarden veranderen niet; componenten raken niets.

**Tech Stack:** Next.js (App Router), next-themes 0.4.6, Tailwind v4 (`@theme inline`), Node 24 test runner (`node --test`), Playwright via `../node_modules/playwright` + lokale Chromium 1243, Python 3 + Pillow voor `tests/visual/diff.py`.

**Spec:** `docs/superpowers/specs/2026-11-04-donker-als-standaard-design.md`

**Werkmap:** alle commando's vanuit `/Users/nathaniel/Documents/Hitzdigital-web/site` (de git-root). Scratchmap voor screenshots: `/private/tmp/claude-501/-Users-nathaniel-Documents-Hitzdigital-web/089afe37-ab88-4618-9c0c-ea8b5c0b7f69/scratchpad`.

---

## Bestanden

| Bestand | Rol | Actie |
|---|---|---|
| `tests/visual/theme-shots.mjs` | Maakt screenshots van `/` en `/en` in licht en donker op 390 en 1280 px, met het thema expliciet in localStorage, zodat "voor" en "na" vergelijkbaar zijn | aanmaken (Task 1) |
| `tests/unit/theme-css.test.ts` | Bewaakt de structuur van `globals.css`: donker op `:root`, licht onder `[data-theme="light"]`, geen `prefers-color-scheme` | aanmaken (Task 2) |
| `app/globals.css` | Tokenblokken omdraaien, mediablokken weg, grain-regel vereenvoudigen, kopcommentaar | wijzigen (Task 2) |
| `app/[lang]/layout.tsx` | `ThemeProvider` op donker als standaard, systeem uit | wijzigen (Task 3) |
| `components/ui/ThemeSwitch.tsx` | Commentaar | wijzigen (Task 3) |
| `tests/e2e/theme-default.mjs` | Browsertest voor het gedrag uit de spec: schone sessie, opgeslagen keuze, wisselen, JS uit | aanmaken (Task 5) |

---

### Task 1: Nulmeting — screenshots van de huidige site

Vóór de wijziging leggen we vast hoe licht en donker er nu uitzien. Na afloop (Task 6) vergelijken we: binnen een thema mag niets veranderen.

**Files:**
- Create: `tests/visual/theme-shots.mjs`

- [x] **Step 1: Schrijf het screenshot-script**

```js
// Screenshots van de homepage (NL en EN) in licht en donker op 390 en 1280 px.
// Het thema wordt expliciet in localStorage gezet, dus het script werkt vóór en ná de wissel naar donker-als-standaard.
// Draaien: server op 3111 (`npm run build && npm start`), dan `node tests/visual/theme-shots.mjs <uitvoermap>`.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const out = process.argv[2];
if (!out) { console.error("gebruik: node tests/visual/theme-shots.mjs <uitvoermap>"); process.exit(2); }
mkdirSync(out, { recursive: true });

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const CHROME = process.env.CHROME_PATH ?? "/Users/nathaniel/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const browser = await chromium.launch({ executablePath: CHROME });
try {
  for (const theme of ["light", "dark"]) {
    for (const width of [390, 1280]) {
      const ctx = await browser.newContext({
        viewport: { width, height: width === 390 ? 844 : 800 },
        reducedMotion: "reduce",
        colorScheme: "light", // OS op licht: de strengste situatie voor donker-als-standaard
      });
      await ctx.addInitScript((t) => localStorage.setItem("theme", t), theme);
      const page = await ctx.newPage();
      for (const [path, name] of [["/", "nl"], ["/en", "en"]]) {
        await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
        await page.waitForTimeout(400);
        await page.screenshot({ path: join(out, `${name}-${theme}-${width}.png`), fullPage: true });
      }
      await ctx.close();
    }
  }
  console.log(`theme-shots: 8 screenshots in ${out}`);
} finally {
  await browser.close();
}
```

- [x] **Step 2: Bouw en start de huidige site**

Run:
```bash
npm run build && (npm start > /private/tmp/claude-501/-Users-nathaniel-Documents-Hitzdigital-web/089afe37-ab88-4618-9c0c-ea8b5c0b7f69/scratchpad/server.log 2>&1 &) && sleep 3 && curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3111/
```
Expected: build zonder fouten, daarna `200`.

- [x] **Step 3: Maak de "voor"-screenshots**

Run:
```bash
node tests/visual/theme-shots.mjs /private/tmp/claude-501/-Users-nathaniel-Documents-Hitzdigital-web/089afe37-ab88-4618-9c0c-ea8b5c0b7f69/scratchpad/voor && ls /private/tmp/claude-501/-Users-nathaniel-Documents-Hitzdigital-web/089afe37-ab88-4618-9c0c-ea8b5c0b7f69/scratchpad/voor
```
Expected: `theme-shots: 8 screenshots in …/voor` en acht bestanden: `nl-light-390.png`, `nl-light-1280.png`, `nl-dark-390.png`, `nl-dark-1280.png`, `en-light-390.png`, `en-light-1280.png`, `en-dark-390.png`, `en-dark-1280.png`.

- [x] **Step 4: Stop de server**

Run:
```bash
pkill -f "next start -p 3111"; sleep 1; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3111/ || echo "server gestopt"
```
Expected: `server gestopt` (curl faalt omdat niets meer luistert).

- [x] **Step 5: Commit**

```bash
git add tests/visual/theme-shots.mjs
git commit -m "Visueel: screenshot-script voor licht/donker per viewport

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: CSS omdraaien — donker op `:root`, licht onder `[data-theme="light"]`

**Files:**
- Create: `tests/unit/theme-css.test.ts`
- Modify: `app/globals.css` (kopcommentaar regel 5–8, lichte blok regel 33–35, dark-mediablok regel 100–124, dark-blok regel 125, grain regel 240–244)

- [x] **Step 1: Schrijf de falende structuurtest**

```ts
// Bewaakt de thema-structuur van globals.css: donker is de basis (:root, ook zonder JS),
// licht is opt-in via [data-theme="light"], en de OS-voorkeur speelt geen rol.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../../app/globals.css", import.meta.url), "utf8");

test("geen prefers-color-scheme meer: de OS-instelling telt niet", () => {
  assert.doesNotMatch(css, /prefers-color-scheme/);
});

test("licht is opt-in onder [data-theme=light]", () => {
  assert.match(css, /:root\[data-theme="light"\]\s*\{\s*color-scheme:\s*light;/);
});

test("er is geen apart [data-theme=dark]-blok: donker ís :root", () => {
  assert.doesNotMatch(css, /:root\[data-theme="dark"\]/);
});

test(":root zet color-scheme: dark en de donkere achtergrond", () => {
  // Het blok dat color-scheme: dark zet, is een kale :root-regel (geen attribuutselector, geen media query).
  assert.match(css, /\n:root\s*\{\s*color-scheme:\s*dark;\s*--deep:\s*#070706;/);
});

test("grain: één lichte uitzondering, geen media query", () => {
  assert.match(css, /:root\[data-theme="light"\] \.hd-grain/);
  assert.doesNotMatch(css, /:root:not\(\[data-theme="dark"\]\) \.hd-grain/);
});
```

- [x] **Step 2: Draai de test en zie hem falen**

Run: `node --test tests/unit/theme-css.test.ts`
Expected: minstens 4 van de 5 tests FAIL (`prefers-color-scheme` staat er nog, `:root[data-theme="light"] {` bestaat niet, `:root[data-theme="dark"]` bestaat wel, `:root { color-scheme: dark` ontbreekt, en de grain-mediaquery bestaat nog). Wat telt is dat Step 4 alles groen maakt.

- [x] **Step 3: Pas `app/globals.css` aan**

Vijf wijzigingen, met het Edit-tool (exacte strings). Tokenwaarden niet aanraken.

**3a. Kopcommentaar** (regel 5–8). Oud:
```css
   Twee thema's, één bron.
   1. :root            = light ("Warm Paper"), tevens de fallback zonder JS.
   2. prefers dark     = dark, tenzij expliciet data-theme="light".
   3. [data-theme=dark]= dark, gezet door next-themes (localStorage) vóór hydration.
```
Nieuw:
```css
   Twee thema's, één bron. Donker is de standaard.
   1. :root               = dark, tevens de fallback zonder JS en de eerste paint.
   2. [data-theme=light]  = light ("Warm Paper"), alleen na een klik op de themaknop;
                            next-themes zet het attribuut uit localStorage vóór hydration.
   De OS-voorkeur (prefers-color-scheme) speelt geen rol.
```

**3b. Lichte blok wordt opt-in** (regel 33–35). Oud:
```css
/* ---- Light: Warm Paper ---- */
:root {
  color-scheme: light;
```
Nieuw:
```css
/* ---- Light: Warm Paper (opt-in via de themaknop) ---- */
:root[data-theme="light"] {
  color-scheme: light;
```

**3c. Dark-mediablok verwijderen** (regel 100–124). Verwijder het hele blok dat begint met
```css
/* ---- Dark (huidige site) ---- */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
```
en eindigt met
```css
    --sh-grip: 0 0 0 6px rgba(95, 164, 126, 0.18), 0 8px 22px -6px rgba(0, 0, 0, 0.8);
  }
}
```
Let op: het blok direct erónder (`:root[data-theme="dark"] {`) eindigt met dezelfde `--sh-grip`-regel maar met één sluithaak; verwijder alleen het mediablok met de dubbele sluithaak `  }\n}`.

**3d. Dark-blok wordt de basis** (was regel 125, na 3c direct onder het lichte blok). Oud:
```css
:root[data-theme="dark"] {
  color-scheme: dark;
  --deep: #070706; --base: #0c0b09; --panel: #11100e;
```
Nieuw:
```css
/* ---- Dark: standaard, tevens de fallback zonder JS ---- */
:root {
  color-scheme: dark;
  --deep: #070706; --base: #0c0b09; --panel: #11100e;
```
Volgorde in het bestand: het lichte blok staat vóór het donkere `:root`-blok. Dat is correct: `:root[data-theme="light"]` (specificiteit 0,1,1) wint altijd van `:root` (0,1,0), ongeacht de volgorde. Het blok verplaatsen is niet nodig.

**3e. Grain-regel** (rond regel 215 na 3c). Oud:
```css
/* Hero-grain: overlay op donker, multiply op papier. */
.hd-grain { opacity: 0.045; mix-blend-mode: overlay; }
:root[data-theme="light"] .hd-grain { opacity: 0.035; mix-blend-mode: multiply; }
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) .hd-grain { opacity: 0.035; mix-blend-mode: multiply; }
}
```
Nieuw:
```css
/* Hero-grain: overlay op donker, multiply op papier. */
.hd-grain { opacity: 0.045; mix-blend-mode: overlay; }
:root[data-theme="light"] .hd-grain { opacity: 0.035; mix-blend-mode: multiply; }
```

- [x] **Step 4: Draai de structuurtest en zie hem slagen**

Run: `node --test tests/unit/theme-css.test.ts`
Expected: `pass 5`, `fail 0`.

- [x] **Step 5: Controleer dat elk token in het donkere blok precies één keer staat**

Run:
```bash
awk '/^:root \{$/{f=1} f&&/^\}$/{f=0} f' app/globals.css | grep -o -- '--[a-z0-9-]*:' | sort | uniq -d
```
Expected: geen uitvoer (geen dubbele declaraties; dit sluit het audit-punt over `--accent-sheen`/`--accent-halo` af). Let op: `awk` matcht twee `:root {`-blokken (merk-invariant bovenaan en het donkere blok); die delen geen tokennamen, dus lege uitvoer blijft het criterium.

- [x] **Step 6: Commit**

```bash
git add tests/unit/theme-css.test.ts app/globals.css
git commit -m "Thema: donkere tokens op :root, licht als opt-in; prefers-color-scheme weg

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: next-themes op donker als standaard, commentaar bijwerken

**Files:**
- Modify: `app/[lang]/layout.tsx:58-62`
- Modify: `components/ui/ThemeSwitch.tsx:10-15`

- [x] **Step 1: Pas de ThemeProvider aan**

In `app/[lang]/layout.tsx`. Oud:
```tsx
        {/* next-themes zet data-theme + color-scheme op <html> via een inline script vóór hydration:
            systeemvoorkeur als default, handmatige keuze in localStorage ("theme"). Geen flash. */}
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
```
Nieuw:
```tsx
        {/* next-themes zet data-theme + color-scheme op <html> via een inline script vóór hydration:
            donker als standaard, handmatige keuze in localStorage ("theme"). De OS-voorkeur telt niet;
            de CSS-basis (:root) is óók donker, dus geen flash, ook niet zonder JS. */}
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
```

- [x] **Step 2: Pas het commentaar in ThemeSwitch aan**

In `components/ui/ThemeSwitch.tsx`. Oud:
```tsx
 * Licht/donker-knop: één icoon dat het huidige thema toont (zon = licht, maan = donker);
 * een klik wisselt. Standaard volgt de site het systeem (next-themes); een klik overschrijft dat
 * en bewaart de keuze in localStorage. Vóór hydration rendert een lege placeholder van dezelfde
 * maat, zodat er geen layout-shift is.
```
Nieuw:
```tsx
 * Licht/donker-knop: één icoon dat het huidige thema toont (zon = licht, maan = donker);
 * een klik wisselt. Standaard is de site donker (next-themes, defaultTheme="dark", geen systeem);
 * een klik bewaart de keuze in localStorage. Vóór hydration rendert een lege placeholder van dezelfde
 * maat, zodat er geen layout-shift is.
```

- [x] **Step 3: Typecheck en lint**

Run: `npm run typecheck && npm run lint`
Expected: beide zonder fouten (`enableSystem` accepteert een boolean; `defaultTheme` een string).

- [x] **Step 4: Commit**

```bash
git add "app/[lang]/layout.tsx" components/ui/ThemeSwitch.tsx
git commit -m "Thema: donker als standaard, systeemvoorkeur uit

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: Build, bestaande tests

**Files:** geen wijzigingen.

- [x] **Step 1: Build en start**

Run:
```bash
npm run build && (npm start > /private/tmp/claude-501/-Users-nathaniel-Documents-Hitzdigital-web/089afe37-ab88-4618-9c0c-ea8b5c0b7f69/scratchpad/server.log 2>&1 &) && sleep 3 && curl -s http://localhost:3111/ | grep -o '<html[^>]*>'
```
Expected: build zonder fouten; de `<html>`-tag bevat `lang="nl"` en `suppressHydrationWarning` wordt niet uitgeschreven. `data-theme` staat er server-side nog niet op (next-themes zet het client-side vóór hydration); dat is normaal.

- [x] **Step 2: Unit- en e2e-tests**

Run: `npm test`
Expected: alle unit-tests (inclusief de nieuwe `theme-css.test.ts`) en alle e2e-tests slagen, `fail 0` in beide runs.

---

### Task 5: Browsertest voor het gedrag uit de spec

**Files:**
- Create: `tests/e2e/theme-default.mjs`

- [x] **Step 1: Schrijf de browsertest**

```js
// Browsertest: donker is de standaard, ongeacht de OS-voorkeur; licht alleen via localStorage/themaknop.
// Draaien: server op 3111 (`npm start`), dan `node tests/e2e/theme-default.mjs`.
import { chromium } from "playwright";
import assert from "node:assert/strict";

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const CHROME = process.env.CHROME_PATH ?? "/Users/nathaniel/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const DARK_BG = "rgb(7, 7, 6)";       // --deep donker (#070706), body background-color
const LIGHT_BG = "rgb(246, 243, 237)"; // --deep licht (#f6f3ed)

const state = (page) =>
  page.evaluate(() => ({
    theme: document.documentElement.getAttribute("data-theme"),
    bg: getComputedStyle(document.body).backgroundColor,
    stored: localStorage.getItem("theme"),
  }));

const browser = await chromium.launch({ executablePath: CHROME });
try {
  for (const path of ["/", "/en"]) {
    // 1. Schone sessie, OS op licht: toch donker.
    let ctx = await browser.newContext({ colorScheme: "light" });
    let page = await ctx.newPage();
    await page.goto(`${BASE}${path}`);
    let s = await state(page);
    assert.equal(s.theme, "dark", `${path}: data-theme zonder opgeslagen keuze`);
    assert.equal(s.bg, DARK_BG, `${path}: achtergrond zonder opgeslagen keuze`);
    assert.equal(s.stored, null, `${path}: next-themes schrijft de standaard niet weg`);
    await ctx.close();

    // 2. Opgeslagen keuze "light": licht.
    ctx = await browser.newContext({ colorScheme: "dark" });
    await ctx.addInitScript(() => localStorage.setItem("theme", "light"));
    page = await ctx.newPage();
    await page.goto(`${BASE}${path}`);
    s = await state(page);
    assert.equal(s.theme, "light", `${path}: data-theme met theme=light`);
    assert.equal(s.bg, LIGHT_BG, `${path}: achtergrond met theme=light`);
    await ctx.close();

    // 3. Knop wisselt donker → licht en de keuze blijft na herladen.
    ctx = await browser.newContext({ colorScheme: "light", viewport: { width: 1280, height: 800 } });
    page = await ctx.newPage();
    await page.goto(`${BASE}${path}`);
    const toLight = path === "/en" ? "Switch to light theme" : "Schakel naar licht thema";
    await page.getByRole("button", { name: toLight }).click();
    s = await state(page);
    assert.equal(s.theme, "light", `${path}: na klik`);
    assert.equal(s.stored, "light", `${path}: keuze bewaard`);
    await page.reload();
    s = await state(page);
    assert.equal(s.theme, "light", `${path}: na herladen`);
    assert.equal(s.bg, LIGHT_BG, `${path}: achtergrond na herladen`);
    await ctx.close();

    // 4. JavaScript uit: de CSS-basis is donker.
    ctx = await browser.newContext({ colorScheme: "light", javaScriptEnabled: false });
    page = await ctx.newPage();
    await page.goto(`${BASE}${path}`);
    s = await state(page);
    assert.equal(s.theme, null, `${path}: zonder JS geen data-theme`);
    assert.equal(s.bg, DARK_BG, `${path}: zonder JS donker`);
    await ctx.close();
  }
  console.log("theme-default: OK");
} finally {
  await browser.close();
}
```

De knoplabels komen uit `lib/i18n/nl/ui.tsx` (`"Schakel naar licht thema"`) en `lib/i18n/en/ui.tsx` (`"Switch to light theme"`), beide onder `theme.toLight`.

- [x] **Step 2: Draai de browsertest (server uit Task 4 draait nog)**

Run: `node tests/e2e/theme-default.mjs`
Expected: `theme-default: OK`.

Faalt alleen blok 4 (JS uit) met een fout van `page.evaluate` (Chromium weigert soms scripts in een context zonder JavaScript), vervang dan in de test de twee asserts van blok 4 door een 1×1-screenshot en controleer het pixel met Pillow:
```js
    await page.screenshot({ path: `/private/tmp/claude-501/-Users-nathaniel-Documents-Hitzdigital-web/089afe37-ab88-4618-9c0c-ea8b5c0b7f69/scratchpad/nojs${path === "/en" ? "-en" : ""}.png`, clip: { x: 0, y: 0, width: 1, height: 1 } });
```
```bash
python3 -c "from PIL import Image; [print(n, Image.open(f'/private/tmp/claude-501/-Users-nathaniel-Documents-Hitzdigital-web/089afe37-ab88-4618-9c0c-ea8b5c0b7f69/scratchpad/{n}.png').convert('RGB').getpixel((0,0))) for n in ('nojs','nojs-en')]"
```
Expected: twee regels met `(7, 7, 6)` (de donkere `--deep`).

- [x] **Step 3: Commit**

```bash
git add tests/e2e/theme-default.mjs
git commit -m "Test: browsertest donker-als-standaard (schone sessie, keuze, knop, JS uit)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6: Visuele vergelijking "voor" en "na"

**Files:** geen wijzigingen.

- [x] **Step 1: Maak de "na"-screenshots (server uit Task 4 draait nog)**

Run:
```bash
node tests/visual/theme-shots.mjs /private/tmp/claude-501/-Users-nathaniel-Documents-Hitzdigital-web/089afe37-ab88-4618-9c0c-ea8b5c0b7f69/scratchpad/na
```
Expected: `theme-shots: 8 screenshots in …/na`.

- [x] **Step 2: Vergelijk**

Run:
```bash
python3 tests/visual/diff.py /private/tmp/claude-501/-Users-nathaniel-Documents-Hitzdigital-web/089afe37-ab88-4618-9c0c-ea8b5c0b7f69/scratchpad/voor /private/tmp/claude-501/-Users-nathaniel-Documents-Hitzdigital-web/089afe37-ab88-4618-9c0c-ea8b5c0b7f69/scratchpad/na 0.5
```
Expected: acht regels `OK  …: 0.000% pixels anders` (of een fractie onder 0,5 % door font-rendering) en exit 0. Een `DIFF` betekent dat de tokenverhuizing iets veranderd heeft binnen een thema: open beide PNG's met het Read-tool, zoek de afwijking en herstel in `globals.css` (meestal een token dat per ongeluk in het verkeerde blok staat). Draai daarna Task 2 Step 4 en deze stap opnieuw.

- [x] **Step 3: Stop de server**

Run:
```bash
pkill -f "next start -p 3111"; sleep 1; curl -s -o /dev/null http://localhost:3111/ || echo "server gestopt"
```
Expected: `server gestopt`.

---

### Task 7: Afronden

**Files:** geen wijzigingen.

- [x] **Step 1: Schone werkboom**

Run: `git status --short && git log --oneline -5`
Expected: geen ongecommitte wijzigingen; de laatste vier commits zijn (nieuw → oud) de browsertest, de ThemeProvider-wissel, de CSS-omdraai en het screenshot-script, daarboven `4639dfb Spec: donker als standaardthema`.

- [x] **Step 2: Vink het plan af en meld**

Meld aan Nathaniel: donker is de standaard, licht blijft via de knop, alle checks groen (structuurtest, `npm test`, browsertest, visuele diff). Deploy is `git push origin main` (Vercel bouwt automatisch) en gebeurt pas na zijn akkoord; niet zelf pushen.
