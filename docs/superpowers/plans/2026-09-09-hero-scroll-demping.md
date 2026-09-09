# Hero-scrolldemping Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** De scroll-driven laptop-intro in de hero voelt met een muiswiel even vloeiend als met een trackpad, door de voortgang `p` gedempt richting de echte scrollpositie te laten bewegen.

**Architecture:** Eén wijziging in `initHero` in `components/hero/HeroExperience.tsx`: de loop berekent per frame een doelwaarde `pTarget` uit de scrollpositie en laat `p` daar met een framerate-onafhankelijke lerp naartoe bewegen. In drie situaties springt `p` direct naar `pTarget` (eerste frame na init, na resize, na herstart van de loop). HTML, CSS, `render()` en de mobiele/reduced-motion-tak blijven ongewijzigd.

**Tech Stack:** Next.js 15, React 19, TypeScript. Geen testframework in dit project; verificatie is handmatig via `npm run dev` plus `npm run lint` en `npm run build`.

**Spec:** `docs/superpowers/specs/2026-09-09-hero-scroll-demping-design.md`

---

## Bestandsoverzicht

- Modify: `components/hero/HeroExperience.tsx`
  - regel 231-234: state-variabelen van `initHero` (nieuwe variabelen `pTarget`, `pSnap`, `lastT`, constante `HERO_DAMP`)
  - regel 240: `startLoop` (snap bij herstart)
  - regel 248-255: `doLayout` (snap na resize)
  - regel 290-303: `loop` (gedempte voortgang)

Geen nieuwe bestanden. Alle paden zijn relatief aan `site/` (de git-root).

---

### Task 1: Gedempte voortgang in de scroll-loop

**Files:**
- Modify: `components/hero/HeroExperience.tsx:231-234`
- Modify: `components/hero/HeroExperience.tsx:240`
- Modify: `components/hero/HeroExperience.tsx:255`
- Modify: `components/hero/HeroExperience.tsx:290-303`

- [ ] **Step 1: Voeg de dempingsconstante en nieuwe state toe**

Vervang in `components/hero/HeroExperience.tsx` regel 231-234:

```ts
  let bScale = 0.8, bRY = -16, bRX = 8, shiftX = 150, ty = 0, parAmt = 1;
  let p = 0, mx = 0, my = 0, tmx = 0, tmy = 0, introStart = 0, mProg = 0;
  let mobile = false, scrollDriven = false;
  let pinLen = 1;
```

door:

```ts
  // Demping van de scroll-voortgang: deel van de resterende afstand per frame bij 60 Hz.
  // Muiswiel geeft sprongen van ~100 px; zonder demping springt de laptop zichtbaar.
  // Bereik ~0.08 (zwevender) tot ~0.18 (strakker). Zie docs/superpowers/specs/2026-09-09-hero-scroll-demping-design.md
  const HERO_DAMP = 0.12;
  const HERO_SNAP_EPS = 0.0005;
  let bScale = 0.8, bRY = -16, bRX = 8, shiftX = 150, ty = 0, parAmt = 1;
  let p = 0, mx = 0, my = 0, tmx = 0, tmy = 0, introStart = 0, mProg = 0;
  let pTarget = 0, pSnap = true, lastT = 0;
  let mobile = false, scrollDriven = false;
  let pinLen = 1;
```

- [ ] **Step 2: Laat `startLoop` snappen bij (her)start**

Vervang regel 240 (na de toevoeging van Step 1 is dit regel 245):

```ts
  const startLoop = () => { if (running) return; running = true; raf = requestAnimationFrame(loop); };
```

door:

```ts
  const startLoop = () => { if (running) return; running = true; pSnap = true; lastT = 0; raf = requestAnimationFrame(loop); };
```

Waarom: na een pauze (hero buiten beeld of tab verborgen) is de scrollpositie meestal veranderd. Zonder snap zou de laptop bij terugkeer een inhaalslag maken.

- [ ] **Step 3: Laat `doLayout` snappen na resize**

Zoek in `doLayout` de regel:

```ts
    pinLen = Math.max(1, exp ? exp.offsetHeight - window.innerHeight : 1);
```

en vervang die door:

```ts
    pinLen = Math.max(1, exp ? exp.offsetHeight - window.innerHeight : 1);
    pSnap = true;
```

Waarom: `pinLen` verandert bij resize, dus `pTarget` verandert ook bij gelijke scrollpositie. De animatie moet direct meespringen, niet dempen.

- [ ] **Step 4: Vervang de voortgangsberekening in `loop`**

Vervang het hele `loop`-blok:

```ts
  const loop = (now: number) => {
    if (!introStart) introStart = now;
    const intro = Math.min(1, (now - introStart) / 1400);
    mProg = mobile ? Math.min(1, (now - introStart) / 2800) : 0;
    if (scrollDriven) {
      const top = window.scrollY || document.documentElement.scrollTop || 0;
      p = Math.max(0, Math.min(1, top / pinLen));
    } else {
      p = 0.58;
    }
    if (reduce) { mx = 0; my = 0; } else { mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06; }
    render(intro);
    if (running) raf = requestAnimationFrame(loop);
  };
```

door:

```ts
  const loop = (now: number) => {
    if (!introStart) introStart = now;
    const intro = Math.min(1, (now - introStart) / 1400);
    mProg = mobile ? Math.min(1, (now - introStart) / 2800) : 0;
    if (scrollDriven) {
      const top = window.scrollY || document.documentElement.scrollTop || 0;
      pTarget = Math.max(0, Math.min(1, top / pinLen));
      if (pSnap) {
        // eerste frame na init / resize / herstart: geen inhaalslag
        p = pTarget;
        pSnap = false;
      } else {
        // framerate-onafhankelijke lerp; dt geclampt tegen sprongen na een trage frame
        const dt = lastT ? Math.min(50, now - lastT) : 16.667;
        const k = 1 - Math.pow(1 - HERO_DAMP, dt / 16.667);
        p += (pTarget - p) * k;
        if (Math.abs(pTarget - p) < HERO_SNAP_EPS) p = pTarget;
      }
    } else {
      p = 0.58;
    }
    lastT = now;
    if (reduce) { mx = 0; my = 0; } else { mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06; }
    render(intro);
    if (running) raf = requestAnimationFrame(loop);
  };
```

- [ ] **Step 5: Lint en typecheck**

Run:

```bash
npm run lint && npx tsc --noEmit
```

Expected: geen fouten. `no-explicit-any` staat bovenaan het bestand al uit voor dit bestand.

- [ ] **Step 6: Commit**

```bash
git add components/hero/HeroExperience.tsx
git commit -m "Hero: scroll-voortgang gedempt zodat muiswiel vloeiend animeert

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: Handmatige verificatie op desktop

**Files:** geen wijzigingen, alleen testen.

- [ ] **Step 1: Start de dev-server**

Run:

```bash
npm run dev
```

Expected: `Ready` op `http://localhost:3000`. Open de homepage in een desktopbrowser met vensterbreedte > 900 px.

- [ ] **Step 2: Muiswiel klik voor klik**

Scrol met een fysiek muiswiel, één klik tegelijk, van boven tot Diensten.

Expected: de laptop draait en de lagen vliegen in met een korte, vloeiende beweging per klik (circa 300 ms). Geen zichtbare sprongen. De tekst links fadet vloeiend uit.

- [ ] **Step 3: Snel doorscrollen naar Diensten**

Scrol in één beweging naar beneden tot voorbij de hero.

Expected: eindtoestand identiek aan vóór de wijziging: hero volledig uitgefaded, de sectie Diensten ("Drie dingen die ik voor je regel.") staat op zijn plek en is klikbaar (hero heeft `pointer-events: none`).

- [ ] **Step 4: Trackpad**

Scrol met een trackpad of Magic Mouse door de hero.

Expected: voelt nog direct. Als het te "zwevend" is, verhoog `HERO_DAMP` naar 0.15 of 0.18 en test opnieuw. Als het muiswiel nog te schokkerig is, verlaag naar 0.10 of 0.08.

- [ ] **Step 5: Refresh halverwege**

Scrol tot halverwege de hero (laptop half gedraaid) en druk op refresh.

Expected: de pagina laadt direct in de juiste tussenstand. Geen inhaalanimatie vanaf de beginstand.

- [ ] **Step 6: Terugkeer na uitscrollen**

Scrol tot ver onder de hero (bijv. tot Werk), wacht 2 seconden, scrol snel terug naar boven.

Expected: zodra de hero weer in beeld komt staat hij direct in de stand die bij de scrollpositie hoort. Geen inhaalslag.

- [ ] **Step 7: Resize over de 900 px-grens**

Verklein het venster tot onder 900 px breed en vergroot weer.

Expected: mobiel toont de statische compositie met telefoon; terug op desktop staat de laptop direct in de juiste stand voor de huidige scrollpositie.

- [ ] **Step 8: Reduced motion**

Zet in Chrome devtools (Rendering-paneel) `prefers-reduced-motion: reduce` aan en herlaad.

Expected: statische compositie, geen scroll-driven animatie. Ongewijzigd ten opzichte van vóór de wijziging.

- [ ] **Step 9: Als `HERO_DAMP` is aangepast in Step 4, commit de tuning**

```bash
git add components/hero/HeroExperience.tsx
git commit -m "Hero: HERO_DAMP afgestemd na test met muiswiel en trackpad

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: Productie-build

**Files:** geen wijzigingen.

- [ ] **Step 1: Build**

Run:

```bash
npm run build
```

Expected: build slaagt, geen type- of lintfouten. Homepage (`/`) staat in de route-lijst.

- [ ] **Step 2: Klaar voor deploy**

Nathaniel bepaalt zelf het moment van pushen naar Vercel (zie werkwijze: checkpoint en expliciet akkoord vóór elke stap).
