# Donker als standaardthema

**Datum:** 4 november 2026
**Status:** ontwerp akkoord, wacht op implementatieplan

## Waarom

De site volgt nu de OS-instelling van de bezoeker (`defaultTheme="system"`). De meeste bezoekers hebben hun apparaat, vaak zonder dat bewust te kiezen, op licht staan en zien daardoor de lichte variant. De donkere variant is het oorspronkelijke ontwerp: hero, glow, grain en mockups zijn daarop gemaakt. Licht is in augustus 2026 als tweede thema toegevoegd. Donker wordt de standaard; licht blijft als bewuste keuze via de bestaande zon/maan-knop.

## Gedrag

| Situatie | Thema |
|---|---|
| Geen opgeslagen keuze in localStorage | donker |
| localStorage `theme` = `light` | licht |
| localStorage `theme` = `dark` | donker |
| JavaScript uit of nog niet uitgevoerd | donker |

- De OS-instelling (`prefers-color-scheme`) speelt geen rol meer, in geen enkele situatie.
- Er zijn precies twee standen. Geen derde stand "systeem volgen".
- De knop wisselt tussen licht en donker en bewaart de keuze in localStorage, zoals nu. Bezoekers die eerder op de zon hebben geklikt, houden licht.
- De Nederlandse en Engelse versie delen dezelfde layout en gedragen zich identiek.

## Wijzigingen

### `app/[lang]/layout.tsx`

`ThemeProvider` krijgt `defaultTheme="dark"` en `enableSystem={false}`. `attribute="data-theme"` en `disableTransitionOnChange` blijven. Het commentaar erboven beschrijft het nieuwe gedrag: donker als standaard, handmatige keuze in localStorage.

### `app/globals.css`

De rolverdeling van de tokenblokken draait om. Tokenwaarden zelf veranderen niet.

| Nu | Straks |
|---|---|
| `:root` = lichte tokens, `color-scheme: light` | `:root` = donkere tokens, `color-scheme: dark` |
| `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` = donkere tokens | vervalt |
| `:root[data-theme="dark"]` = donkere tokens | vervalt |
| (geen) | `:root[data-theme="light"]` = lichte tokens, `color-scheme: light` |
| `.hd-grain` donker; `:root[data-theme="light"] .hd-grain` en `@media (prefers-color-scheme: light) { :root:not([data-theme="dark"]) .hd-grain }` licht | `.hd-grain` donker; alleen `:root[data-theme="light"] .hd-grain` licht |

Het kopcommentaar van het bestand beschrijft de nieuwe volgorde: `:root` is donker en tevens de fallback zonder JS; `[data-theme="light"]` is licht, gezet door next-themes vóór hydration. De dubbele declaratie van `--accent-sheen` en `--accent-halo` (design-audit, doc 13) verdwijnt doordat het dark-mediablok vervalt; het overgebleven blok bevat elk token één keer.

### `components/ui/ThemeSwitch.tsx`

Het commentaar: "Standaard volgt de site het systeem" wordt "Standaard is de site donker". Eén gedragsdetail: de knop leest `theme` in plaats van `resolvedTheme` (`dark = theme !== "light"`), zodat hij exact de CSS-regel volgt, ook bij een oude localStorage-waarde `system` op een licht OS. Wisselen en bewaren blijven gelijk.

## Niet in scope

- Geen derde stand of menu voor het thema.
- Geen `theme-color`-meta.
- Geen kleur- of tokenwijzigingen.
- Geen aanpassing aan de Engelse versie los van de gedeelde layout.

## Verificatie

1. `npm run build` slaagt; bestaande unit- en e2e-tests slagen.
2. Playwright (lokale Chromium, poort 3111), telkens op een pagina in NL en EN:
   - schone context met `colorScheme: "light"` en lege localStorage: `html[data-theme="dark"]` en donkere achtergrond;
   - localStorage `theme=light`: `html[data-theme="light"]` en lichte achtergrond;
   - klik op de themaknop wisselt; na herladen blijft de keuze staan;
   - JavaScript uit: pagina is donker.
3. Screenshots in licht en donker op 390 en 1280 px vergeleken met de huidige site: geen visueel verschil binnen een thema, alleen de standaard is veranderd.
