# Engelse versie van hitzdigital.nl

**Datum:** 2026-09-22
**Status:** ontwerp goedgekeurd, klaar voor implementatieplan

## Aanleiding

HitzDigital wil naast de Nederlandse markt ook Engelstaligen bedienen: expats en internationale ondernemers in Nederland én klanten buiten Nederland (met name VK en Ierland) die op afstand een website of hosting willen. De site is nu volledig Nederlands en hyperlokaal geschreven ("voor ondernemers in de Hoeksche Waard", hulp aan huis, schema met Puttershoek als vestiging).

Besluiten uit de brainstorm (22-09-2026):

- Doelgroep EN: beide groepen. De Engelse versie is daarom een **herpositionering**, geen letterlijke vertaling.
- Omvang: kernpagina's + juridisch. Support-artikelen blijven alleen Nederlands.
- Automatische taalkeuze: alleen op de kale homepage, keuze wordt onthouden. Diepe links redirecten nooit.
- Domein: alleen hitzdigital.nl; hitzdigital.com nog niet in gebruik, wordt later een redirect naar `/en`.
- Copy: Claude schrijft de Engelse teksten, Nathaniel leest per pagina tegen.
- Prijzen EN: zelfde bedragen, "incl. 21% VAT".
- Technische aanpak: één routeboom onder `app/[lang]`, eigen middleware, getypte woordenboeken. Geen i18n-bibliotheek.
- Taalschakelaar: in de nav naast de themaknop (tekst), in het mobiele menu als pil-schakelaar zoals de themaknop, en herhaald in de footer-onderbalk. Geen suggestiebalk bij diepe links.
- Uitrol: alles in één keer live, ook de refactor van fase 1 blijft op de branch tot de EN-versie compleet is.

## Doel

Een Engelstalige bezoeker ziet op `/` automatisch de Engelse homepage en kan op elke pagina met één klik van taal wisselen. De Nederlandse site verandert voor bezoekers en voor Google niets: geen andere URL's, geen andere teksten, geen andere weergave. Beide talen zijn statisch gebouwd, correct gelinkt via hreflang en volledig in de sitemap.

## Niet in scope

- Support-artikelen (`/support`, `/support/[slug]`) in het Engels.
- Een derde taal. Het ontwerp sluit die niet uit, maar er wordt niets voor voorbereid.
- hitzdigital.com kopen en koppelen (wél beschreven hoe dat later in één stap kan).
- Prijzen exclusief btw of een aparte prijslijst voor het buitenland.
- Een suggestiebalk "This page is also available in English" bij diepe links.
- Wijzigingen aan design, layout of animaties buiten wat de taalschakelaar nodig heeft.

## Ontwerp

### 1. URL-structuur

Nederlands is de standaardtaal zonder prefix; alle huidige URL's blijven exact bestaan. Engels staat onder `/en/` met Engelse slugs.

| NL (publiek) | EN (publiek) | Interne route onder `app/[lang]/(site)/` |
|---|---|---|
| `/` | `/en` | `page.tsx` |
| `/websites` | `/en/websites` | `websites/` |
| `/hosting` | `/en/hosting` | `hosting/` |
| `/hulp` | `/en/help` | `hulp/` |
| `/werk` | `/en/work` | `werk/` |
| `/werk/[slug]` | `/en/work/[slug]` | `werk/[slug]/` (zelfde case-slugs) |
| `/contact` | `/en/contact` | `contact/` |
| `/privacy` | `/en/privacy` | `privacy/` |
| `/voorwaarden` | `/en/terms` | `voorwaarden/` |
| `/support`, `/support/[slug]` | geen EN | `support/` (alleen `lang = nl`) |

Regels:

- Mapnamen in `app/` blijven Nederlands. De vertaling van slugs zit uitsluitend in de padkaart `lib/i18n/paths.ts`: één object met per route de publieke NL- en EN-slug. Middleware, taalschakelaar, hreflang en sitemap gebruiken alle vier deze kaart; er staat nergens anders een hardgecodeerde EN-slug.
- Ankers (`#over`, `#pijlers`, `#werkwijze`, `#werk`, `#aanvraag`, `#contact`, `#zo-werk-ik`) en queryparameters (`?voor=website|hosting|hulp|anders`, `?pakket=`) blijven in beide talen identiek. Het zijn technische ids; de labels erbij komen uit het woordenboek.
- `generateStaticParams` levert `nl` en `en`; `dynamicParams = false` als extra waarborg. Een pad als `/fr` behandelt de middleware als Nederlands pad (regel 7 in §2) en eindigt in de NL-404.
- 404: `app/[lang]/[...rest]/page.tsx` roept `notFound()` aan; `app/[lang]/not-found.tsx` rendert de bestaande 404 (zonder nav/footer) in de taal van het pad. Het huidige `app/not-found.tsx` vervalt.
- `app/layout.tsx` (fonts, ThemeProvider, `<html lang>`, schema's, Analytics) verhuist naar `app/[lang]/layout.tsx` en leest `lang` uit de params. Er is geen root-layout meer op `app/`-niveau; dat is het patroon uit de Next.js-documentatie voor i18n.
- Root-metadata-routes blijven op `app/`-niveau: `robots.ts`, `sitemap.ts`, `icon.tsx`, `apple-icon.tsx`. Pagina-OG-afbeeldingen (`opengraph-image.tsx`) verhuizen mee naar `[lang]/(site)/…` en lezen `lang` uit de params; het huidige `app/opengraph-image.tsx` wordt `app/[lang]/(site)/opengraph-image.tsx`.

### 2. Middleware

Eén bestand `middleware.ts` (Next 15.1). Volgorde van regels per verzoek:

1. **Uitsluiten:** paden die beginnen met `/_next`, `/api`, `/images`, paden met een bestandsextensie, en `/sitemap.xml`, `/robots.txt`, `/icon`, `/apple-icon`, `/opengraph-image` op rootniveau. Middleware doet daar niets.
2. **`/nl` of `/nl/…`:** 301 naar hetzelfde pad zonder prefix. Query en hash blijven behouden.
3. **`/en/<interne NL-slug>`**, alleen voor routes waar NL- en EN-slug verschillen (bijv. `/en/hulp`, `/en/werk/x`, `/en/voorwaarden`): 301 naar de publieke EN-slug uit de padkaart (`/en/help`, `/en/work/x`, `/en/terms`). Gelijke slugs (`/en/websites`, `/en/hosting`, `/en/contact`, `/en/privacy`) vallen onder regel 6.
4. **`/en/support` en `/en/support/…`:** 301 naar `/support…` (support is alleen NL).
5. **`/` (exact):**
   - cookie `lang=en` → 307 naar `/en`;
   - cookie `lang=nl` → doorgaan als NL;
   - geen cookie → `Accept-Language` parsen op q-waarden. Alleen als de hoogste voorkeur voor Engels strikt hoger is dan die voor Nederlands (of Nederlands ontbreekt en Engels aanwezig is) → 307 naar `/en`. Geen header, geen van beide talen, of gelijkspel → NL.
   - Het antwoord op `/` krijgt `Vary: Cookie, Accept-Language`.
6. **`/en` of `/en/<publieke EN-slug>`:** rewrite naar de interne route (`/en/help` → `/en/hulp`). `/en` zelf blijft `/en`.
7. **Alles overig (NL zonder prefix):** rewrite naar `/nl/<pad>`.

Cookie: naam `lang`, waarde `nl` of `en`, `Max-Age` 1 jaar, `Path=/`, `SameSite=Lax`, `Secure` in productie. De middleware **zet nooit zelf** de cookie; alleen een klik op de taalschakelaar doet dat. Zo legt een gedeelde `/en`-link geen voorkeur vast.

Googlebot stuurt standaard geen `Accept-Language` en ziet dus de Nederlandse homepage. De Engelse versie vindt hij via hreflang en de sitemap.

### 3. Content-architectuur

Alles wat een bezoeker leest komt uit `lib/i18n/`:

```
lib/i18n/
  paths.ts        padkaart NL↔EN (zie §1) + helpers: counterpart(lang, pathname), href(lang, routeKey, slug?)
  types.ts        Lang = "nl" | "en"; Dictionary-type afgeleid van het NL-woordenboek
  index.ts        getDict(lang), isLang(x), locales, defaultLang = "nl"
  nl/ui.tsx       nav, footer, skip-link, themaknop-labels, taalschakelaar-labels, formulier (labels, keuzes, fouten, bevestiging, mailto-tekst), WhatsApp-FAB, kruimelpad "Home", 404
  nl/pages.tsx    per pagina: metadata (title, description), OG-teksten, hero, secties, CTA-labels
  nl/services.ts  pijlers, werkwijze, websiteOpties, websiteInbegrepen, FAQ's, pakketten-labels, aanvraagKeuzes-labels
  nl/work.ts      case-teksten (meta-regel, alt-teksten, casepagina-copy)
  en/…            zelfde vier bestanden
```

Regels:

- **Nederlands is de bron.** `types.ts` leidt `Dictionary` af van het NL-woordenboek; `en/*` wordt gedeclareerd met datzelfde type. Een ontbrekende of extra sleutel in EN is een TypeScript-fout, geen lege plek op de site.
- **Rijke tekst blijft JSX.** Woordenboeken zijn `.tsx` waar accentwoorden (`<em className="hd-accent-word …">`) voorkomen. Die worden alleen in server-componenten gebruikt.
- **Client-componenten krijgen strings als props.** `Nav`, `AanvraagForm`, `ThemeSwitch`, `WhatsAppFab`, `StickyCallBar` en `LangSwitch` importeren geen woordenboek; de server-layout of -pagina geeft het benodigde deel (alleen serialiseerbare strings) door.
- **Taalneutraal blijft waar het staat:** bedragen en pakket-ids in `lib/pricing.ts`, contactgegevens en schema-bouwstenen in `lib/site.ts`, slugs/afbeeldingen/klantvlag/externe links in `lib/work.ts`, artikelen in `lib/support.ts`. Alleen tekstvelden verhuizen; `lib/services.ts` en `lib/content.ts` worden daarmee grotendeels leeg en gaan op in `i18n`.
- `euro(amount, lang)` formatteert "€250" in beide talen; "per maand" / "per month" en "incl. btw" / "incl. VAT" komen uit het woordenboek, niet uit de helper.
- Pagina's ontvangen `params: Promise<{ lang: Lang }>` (Next 15), roepen `getDict(lang)` aan en geven delen door. Elke pagina exporteert `generateMetadata` in plaats van een statische `metadata`.
- `professionalServiceSchema(lang)` en `websiteSchema(lang)` krijgen een taalparameter voor beschrijving en `inLanguage`.
- De EN-nav heeft dezelfde vijf links als NL (Websites, Hosting, Help, Work, About). In de EN-footer ontbreekt de link Support; verder is de footer gelijk.

### 4. Taalschakelaar

Component `components/ui/LangSwitch.tsx` (client, klein) met prop `variant`:

| Variant | Plek | Weergave |
|---|---|---|
| `text` | Desktop-nav, links van `ThemeSwitch` | "NL · EN", actieve taal in `text-ink`, andere in `text-faint`, hairline-scheiding; hover zoals de nav-links |
| `segment` | Mobiel fullscreen-menu, rij "Taal" / "Language" direct onder de rij "Weergave" | exacte tweeling van `ThemeSwitch size="lg"`: zelfde 76×40-track (`bg-field`, `border-line`), zelfde 32px schuivende knop (`bg-panel`), zelfde easing en `motion-reduce`. In plaats van zon en maan staan de labels "NL" (links) en "EN" (rechts), 11px semibold; de knop staat onder de actieve taal, het actieve label in `text-ink`, het andere in `text-faint`. Niet breder dan de themaknop, zodat de twee rijen exact uitlijnen |
| `names` | Footer-onderbalk, tussen de juridische links en "Prijzen incl. btw" | "Nederlands | English", actieve in `text-muted`, andere als link |

Gedrag:

- Het is een gewone `<a>` naar de tegenhanger van de huidige pagina (`counterpart(lang, pathname)` uit de padkaart), met `hreflang` en `lang`-attributen op de link. Zonder JavaScript werkt de link; alleen de voorkeur wordt dan niet onthouden.
- Bij klik: `document.cookie = "lang=<doel>; …"` (zie §2), daarna normale navigatie. Geen `preventDefault`.
- Op een pagina zonder tegenhanger (support) linkt EN naar `/en`.
- De huidige taal is niet klikbaar (`aria-current="true"`), de andere heeft een `aria-label` als "Switch to English" / "Schakel naar Nederlands".
- `Nav` krijgt de pathname via `usePathname()` en geeft die door; de layout geeft `lang` en labels door als props.

### 5. SEO en metadata

- `<html lang="nl">` of `lang="en"` in `app/[lang]/layout.tsx`.
- Elke pagina met tegenhanger: `alternates.canonical` naar zichzelf en `alternates.languages` met `nl`, `en` en `x-default` (= NL-URL), allemaal afgeleid van de padkaart. Support-pagina's: alleen canonical.
- `sitemap.ts` levert beide talen, elk met `alternates.languages`. Support alleen NL.
- OpenGraph `locale`: `nl_NL` respectievelijk `en_GB`; `alternateLocale` de andere.
- OG-afbeeldingen renderen de tekst uit `pages.tsx` van de eigen taal. Onderregel in EN: "Puttershoek, the Netherlands". `renderOg` krijgt de onderregel als parameter.
- Schema: `inLanguage` per taal, `knowsLanguage: ["nl", "en"]`. EN-beschrijving: gevestigd in Nederland, werkt op afstand voor klanten in Nederland en daarbuiten. `areaServed` blijft de bestaande regio-lijst; werken op afstand staat in de beschrijving, niet als Place.
- `Breadcrumbs`: "Home" → "/" of "/en", labels uit het woordenboek.
- Engelse spelling: Brits (colour, organise, favourite).

### 6. Formulier en e-mail

- Labels, keuzes (`aanvraagKeuzes`), knopteksten, validatiefouten, bevestiging en de mailto-terugvaltekst komen uit `ui.tsx`. De ids `website | hosting | hulp | anders` blijven.
- Het formulier stuurt een verborgen veld `lang` mee. `sendAanvraag` leest het: bij `en` krijgt het onderwerp de prefix `[EN] ` en de mailtekst de regel "Taal van aanvraag: Engels". De mail aan Nathaniel blijft verder Nederlands.
- Het Vercel Analytics-event van het formulier krijgt `lang` als eigenschap.
- Server-fouten (`config | invalid | send`) worden in de taal van de pagina getoond; de foutcodes zelf veranderen niet.

### 7. Engelse positionering

Toon gelijk aan NL: kort, direct, ik-vorm, geen jargon, geen superlatieven. Inhoudelijke verschillen:

- **Home:** "Websites, hosting and tech help for small businesses. One person, based in the Netherlands, working with clients here and abroad." De Hoeksche Waard is thuisbasis, niet doelgroep. Werk-teaser en "Over" worden herschreven met die insteek.
- **Websites en Hosting:** volledig op afstand, voor klanten in Nederland en daarbuiten. Bedragen ongewijzigd, aanduiding "incl. 21% VAT". Eén voetnoot bij de prijzen: "VAT may differ for businesses outside the Netherlands." **Actie Nathaniel:** deze zin met de boekhouder checken vóór live.
- **Help:** op afstand via schermdelen voor iedereen; aan huis alleen in de regio Hoeksche Waard. De garantie "niet opgelost, dan niet betalen" blijft als "No fix, no fee." Kwartiertarief ongewijzigd.
- **Work:** Engelse meta-regels en case-samenvattingen; klantnamen, plaatsen en labels als "Demo" / "Own project" ongewijzigd.
- **Terms:** Engelse vertaling van de voorwaarden met als eerste alinea: "This is a translation for convenience. The Dutch version (Algemene voorwaarden) is legally binding." Link naar `/voorwaarden`.
- **Privacy:** volledige vertaling, zelfde structuur en dezelfde stack-vermeldingen (Vercel fra1, Resend EU).
- **Contact:** "I reply within one working day." Reactietijd en kanalen ongewijzigd.
- **Review:** Nathaniel leest elke EN-pagina tegen; pas na akkoord per pagina wordt de branch samengevoegd.

### 8. Testen

Playwright (bestaande opzet: `npx playwright`, lokale Chromium, poort 3111), nieuw bestand `tests/i18n.spec.ts`:

- **Redirect-matrix op `/`:** geen header → 200 NL; `Accept-Language: en-GB,en;q=0.9` → 307 `/en`; `nl-NL,nl;q=0.9,en;q=0.8` → 200 NL; `en;q=0.8,nl;q=0.8` → 200 NL; cookie `lang=en` zonder header → `/en`; cookie `lang=nl` met Engelse header → NL.
- **Diepe links redirecten nooit:** `/websites` met Engelse header → 200 NL; `/en/websites` met Nederlandse header → 200 EN.
- **Canonieke URL's:** `/nl/hosting` → 301 `/hosting`; `/en/hulp` → 301 `/en/help`; `/en/support` → 301 `/support`; `/fr` → 404.
- **Schakelaar:** op elke route uit de padkaart wijst de schakelaar (alle drie de varianten) naar de juiste tegenhanger; klik zet de cookie.
- **Metadata:** `<html lang>` klopt; hreflang-tags zijn symmetrisch (NL noemt EN, EN noemt NL, beide noemen `x-default`); sitemap bevat elke route in beide talen met alternates.
- **Lek-check:** elke EN-pagina wordt gescand op een vaste lijst Nederlandse woorden (o.a. "Gratis", "Vraag", "Neem contact", "per maand", "incl. btw", "Hoeksche Waard" buiten de adresregel). Elke treffer is een falende test.
- **Nul-verandering NL:** de bestaande screenshots in `../screenshots/` worden opnieuw gemaakt en visueel vergeleken; afwijkingen zijn alleen toegestaan in nav (schakelaar) en footer-onderbalk.
- `tsc --noEmit` en `next build` slagen; de build toont alle routes in beide talen als statisch.

### 9. Uitrol

Alles op één branch (`feature/engels`), in vier bouwfasen met checkpoint en akkoord van Nathaniel na elke fase. Niets gaat live vóór fase 4 klaar is.

1. **Refactor naar `[lang]`, alleen NL.** Woordenboeken `nl/*` gevuld vanuit de huidige inline copy, middleware doet alleen rewrites (regels 1, 2, 7). Controle: nul zichtbare verandering (screenshots), alle huidige URL's 200.
2. **Engelse woordenboeken en copy**, pagina voor pagina in deze volgorde: ui (nav/footer/formulier/404), home, websites, hosting, help, work + cases, contact, privacy, terms. Nathaniel leest per pagina tegen.
3. **Taalschakelaar, cookie, homepage-detectie** (middleware regels 3 t/m 6), tests uit §8.
4. **hreflang, sitemap, OG-afbeeldingen, schema.** Daarna merge naar `main` → Vercel deploy → sitemap opnieuw indienen in Search Console en de redirect-matrix op productie nalopen.

**Later, zodra hitzdigital.com gekocht is:** domein in Vercel toevoegen als redirect-domein (301) naar `https://www.hitzdigital.nl/en` met behoud van pad. Geen codewijziging nodig.

## Openstaande acties voor Nathaniel

- VAT-voetnoot (§7) laten bevestigen door de boekhouder.
- Per EN-pagina tegenlezen in fase 2.
- Na live: sitemap indienen in Search Console.
