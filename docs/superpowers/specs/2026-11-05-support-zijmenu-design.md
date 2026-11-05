# Support-zijmenu op artikelpagina's

**Datum:** 5 november 2026
**Status:** ontwerp akkoord, wacht op implementatieplan

## Waarom

Op een artikelpagina onder `/support/<slug>` is de enige weg naar andere handleidingen het kruimelpad terug naar `/support`. Een zijmenu met alle handleidingen maakt doorklikken mogelijk zonder de pagina te verlaten. Voorbeeld is het paneel "Alle handleidingen" van Vimexx: knop boven de titel, paneel schuift van links in, blijft open bij doorklikken.

Er zijn nu twee artikelen, beide in de categorie E-mail. Het menu is gebouwd voor groei: een artikel registreren in `lib/support.ts` is automatisch een menu-item. Om het paneel nu al nuttig te maken staan onderin vaste ingangen naar computer- en websitehulp en naar WhatsApp.

## Keuzes

| Vraag | Keuze |
|---|---|
| Inhoud | Support-artikelen per categorie, plus link naar `/hulp` en knop "App me" onderin |
| Gedrag desktop en mobiel | Standaard dicht, knop in de hero, paneel schuift van links in. Eén gedrag, overal |
| Open blijven | Ja. Na klik op een artikel in het paneel blijft het paneel open en verspringt de actieve markering |
| Waar de knop staat | Alleen op artikelpagina's, in de hero tussen kruimelpad en titel. Niet op `/support` zelf |
| Scrim | Pagina dimt en vervaagt (glas), scroll van de pagina staat vast zolang het paneel open is |
| Sluiten | Kruisje, Escape, klik op de scrim |
| Techniek | Paneel in een layout op het segment support, links in het paneel via `next/link`, zodat de open-status navigatie overleeft zonder flits |

Niet in scope: zoekveld, "Meer weergeven", inhoudsopgave van het artikel, vaste knop aan de linkerrand bij scrollen, Engelse versie (support bestaat alleen in het Nederlands).

## Structuur

### `app/[lang]/(site)/support/layout.tsx` (nieuw)

Omhult het overzicht `/support` en alle artikelpagina's. Een layout ín het dynamische segment `[slug]` zou bij een slug-wissel opnieuw mounten (de cache-sleutel bevat de slug), waardoor de open-status verloren gaat; op het statische segment `support` blijft de layout gemonteerd bij client-side navigatie tussen artikelen.

De layout is een server-component. Hij berekent uit `supportArticles` de groepen `{ category, items: { slug, title }[] }[]` in bestandsvolgorde en geeft die als props aan het paneel, zodat `lib/support.ts` (dat de artikel-componenten importeert) buiten de client-bundel blijft. Rendert `SupportDrawerProvider` met daarin `children` en `SupportDrawerPanel`.

Op `/support` staat geen knop; het paneel is daar inert markup. Een effect in de provider sluit het paneel zodra het pad geen `/support/<slug>` meer is, zodat de scroll-lock nooit op het overzicht blijft hangen.

### `components/support/SupportDrawer.tsx` (nieuw, client)

Eén bestand met drie exports die dezelfde status delen:

- `SupportDrawerProvider`: context met `open` en `setOpen`.
- `SupportDrawerButton`: ghost-pil (variant `ghost`, maat `sm`) met Phosphor-icoon `List` en tekst "Alle handleidingen". Heeft `aria-expanded` en `aria-controls="support-drawer"`.
- `SupportDrawerPanel`: scrim en paneel. `role="dialog"`, `aria-modal="true"`, `aria-label="Handleidingen"`, `id="support-drawer"`, `aria-hidden` en `inert` als dicht.

Het paneel krijgt de groepen als props van de layout (zie hierboven). Actief artikel komt uit `publicPath(usePathname())`, want de middleware herschrijft naar `/nl/…`.

### `app/[lang]/(site)/support/[slug]/page.tsx` (bestaand)

`PageHero` krijgt een optionele slot `before` (tussen kruimelpad en titel); de pagina geeft daar `<SupportDrawerButton />` in. `components/ui/Button.tsx` krijgt optionele props `ariaExpanded` en `ariaControls`.

### `lib/support.ts` (bestaand)

Geen wijziging.

### Afhankelijkheden

Geen nieuwe. Overgangen in CSS, icoon uit `@phosphor-icons/react`, dialoogpatroon gelijk aan het mobiele menu in `components/layout/Nav.tsx` (Escape, `inert`, scroll-lock via `document.body.style.overflow`).

## Uiterlijk

### Lagen

| Laag | z-index | Opmerking |
|---|---|---|
| Header (`Nav`) | 70 | Blijft zichtbaar en bruikbaar boven de scrim |
| Scrim en paneel | 55 | Onder het mobiele menu van Nav (60), zodat de hamburger het zijmenu afdekt |
| WhatsApp-knop | lager | Valt onder de scrim |

### Scrim

Volledig scherm, `fixed inset-0`, `bg-deep/55` met `backdrop-blur-[6px]`. Klik sluit het paneel.

### Paneel

- Positie: links, van de onderkant van de header tot de onderkant van het venster (`top` gelijk aan de headerhoogte, zodat logo en navigatie vrij blijven).
- Breedte: 360px, met `max-width: calc(100% - 48px)`, zodat op smalle vensters altijd een strook scrim van 48px zichtbaar en klikbaar blijft.
- Achtergrond `bg-glass/97`, `backdrop-blur-[12px]`, rechterrand `border-r border-line`.
- Inhoud scrolt zelfstandig (`overflow-y: auto`). De scrollpositie in het paneel blijft staan bij doorklikken.

### Inhoud van boven naar beneden

1. Kopregel: "Handleidingen" in `font-display`, semibold, 18px. Rechts een sluitknop met Phosphor-icoon `X`, `aria-label="Menu sluiten"`.
2. Per categorie: eyebrow `text-[12px] uppercase tracking-[0.14em] text-faint` (zelfde stijl als op `/support`), daaronder de artikeltitels als lijst. Elk item: `text-[14.5px]`, `text-muted`, hover `text-ink`. Actief artikel: `text-ink` met een groen streepje links (`border-l-2 border-accent`), `aria-current="page"`.
3. Onderin, vastgezet onder de scrollende lijst: tekst "Staat je vraag er niet bij?" in `text-muted`, link "Computer- en websitehulp" naar `/hulp` in `text-accent-bright`, en `Button` primary, maat `sm`, "App me" naar de WhatsApp-link uit `lib/content`.

Geen zoekveld, geen "Meer weergeven", geen trapsgewijze vertraging van de items.

### Beweging

| Element | Open | Dicht |
|---|---|---|
| Scrim | opacity 0 naar 1, 220ms | opacity 1 naar 0, 180ms |
| Paneel | `translateX(-100%)` naar `0`, 320ms, `cubic-bezier(.23,1,.32,1)` | terug, 180ms, zelfde curve |

Bij `prefers-reduced-motion`: geen verschuiving, alleen opacity, via `motion-reduce:`. De heroknop verandert niet van icoon bij openen, want hij ligt achter de scrim.

## Gedrag

### Openen en sluiten

- Open via de heroknop. Dicht via kruisje, Escape, klik op de scrim.
- Focus gaat bij openen naar het kruisje. Focus blijft binnen het paneel: een keydown-handler op het paneel vangt Tab en Shift+Tab op en springt rond tussen het eerste en laatste focusbare element.
- Bij sluiten gaat focus naar het element met `aria-controls="support-drawer"` (de heroknop, na doorklikken automatisch de nieuwe), anders naar `main` (krijgt op dat moment `tabindex=-1` via script, zodat Next bij navigatie niet zelf `main` focust).
- Zolang het paneel open is staat `document.body.style.overflow = "hidden"`. Hersteld bij sluiten en bij unmount van de layout.

### Doorklikken

- Artikellinks in het paneel zijn `next/link` naar `/support/<slug>`. Navigatie is client-side, de layout blijft, `open` blijft `true`, de scroll-lock blijft staan, de actieve markering verspringt.
- Klik op het actieve artikel sluit het paneel in plaats van opnieuw te laden.
- De pagina onder het paneel start bovenaan (nieuw artikel), de scroll in het paneel blijft waar hij was.
- De link naar `/hulp` is een gewone `<a href>`; de layout unmount en ruimt de scroll-lock op. De WhatsApp-knop opent in een nieuw tabblad (siteconventie) en sluit het paneel in het huidige tabblad.

### Randgevallen

| Situatie | Gedrag |
|---|---|
| Browser terug-knop tussen twee artikelen | Next herstelt de vorige artikelpagina binnen dezelfde layout; paneel houdt zijn status. Geen extra code |
| Navigatie naar `/support` of elders | Naar `/support`: layout blijft, effect sluit het paneel en de cleanup herstelt de scroll. Elders: layout unmount, cleanup herstelt de scroll |
| Themawissel terwijl open | Tokens veranderen mee, niets extra's |
| Venster smaller dan 420px | Paneel `calc(100% - 48px)`, scrimstrook blijft klikbaar |
| JavaScript uit | Knop doet niets; kruimelpad en `/support` werken. Gelijk aan het mobiele menu |
| Taal `en` | Artikelroute geeft `notFound()`, layout rendert dus geen paneel |

## Test

Playwright uit `../node_modules`, lokale Chromium 1243, productieserver op poort 3111 (`npm run build && npm start`).

1. Paneel staat dicht bij laden: `aria-hidden="true"`, `inert`, knop `aria-expanded="false"`.
2. Klik op de knop: paneel open, `aria-expanded="true"`, focus op het kruisje, `body` heeft `overflow: hidden`.
3. Escape sluit; scrim-klik sluit; kruisje sluit. Na sluiten `overflow` hersteld en focus op de knop.
4. Open, klik op het andere artikel: URL verandert, H1 verandert, paneel blijft open, `aria-current="page"` staat op het nieuwe item.
5. Klik op het actieve artikel sluit het paneel zonder navigatie.
6. Op 375px breed: geen horizontale scroll, scrimstrook rechts van het paneel sluit bij klik.
7. `prefers-reduced-motion: reduce`: paneel verschijnt zonder transform-overgang.
8. `npx tsc --noEmit` en `npm run build` slagen.
9. Screenshots light en dark, dicht en open, naar `screenshots/`.
