# Hero-scrollanimatie: demping voor muiswiel

**Datum:** 2026-09-09
**Status:** ontwerp goedgekeurd, klaar voor implementatieplan

## Probleem

De laptop-intro in de hero (`components/hero/HeroExperience.tsx`) is scroll-driven op desktop. De voortgang `p` wordt elke frame rechtstreeks berekend als `scrollY / pinLen`, zonder demping. Een trackpad levert honderden kleine scrollstappen per seconde en voelt vloeiend. Een muiswiel levert per klik één sprong van circa 100 px. Op een pinlengte van 140vh (ruim 1.300 px) is dat 7 tot 8 procent van de animatie per klik: de laptop springt zichtbaar in stapjes.

Bevestigd door Nathaniel: trackpad is vloeiend, alleen muiswiel schokt.

## Doel

De hero-animatie voelt met een muiswiel even vloeiend als met een trackpad. Eindtoestand, timing van de fases en het gedrag op mobiel en bij reduced-motion blijven identiek.

## Niet in scope

- Een extra knop om de intro af te spelen (overwogen, bewust niet gekozen: lost het inputprobleem niet op voor wie gewoon scrolt).
- Wijzigingen aan de bestaande knop "Bekijk wat ik doe" (`href="#pijlers"`, browser-smooth-scroll).
- Wijzigingen aan HTML, CSS of de mobiele/composed-tak.

## Ontwerp

Alleen de scroll-loop in `initHero` verandert.

### Werking

1. Nieuwe variabele `pTarget`: elke frame berekend zoals `p` nu (`scrollY / pinLen`, geclampt op 0..1).
2. `p` beweegt elke frame een vast deel richting `pTarget` (lerp). Startfactor `HERO_DAMP = 0.12` per frame bij 60 Hz.
3. De factor wordt geschaald op de werkelijke frametijd zodat 60 Hz en 120 Hz hetzelfde tempo geven:
   `k = 1 - Math.pow(1 - HERO_DAMP, dt / 16.667)`, met `dt` de tijd sinds de vorige frame (geclampt, bijv. max 50 ms, tegen sprongen na een gepauzeerde tab).
4. Snap: is `|pTarget - p| < 0.0005`, dan `p = pTarget`. Zo staat de animatie exact stil en trilt niet na.
5. `render()` blijft `p` gebruiken; verder ongewijzigd.

### Uitzonderingen (geen demping, `p` springt direct naar `pTarget`)

- **Eerste frame na init**: pagina geladen op een scrollpositie (refresh halverwege, terugknop). Geen inhaalslag vanaf 0.
- **Resize** (`doLayout`): `pinLen` wordt al herberekend; `p` volgt direct.
- **Herstart van de loop** na pauze (IntersectionObserver / `visibilitychange`): `p = pTarget` bij `startLoop`, anders is er een inhaalslag zodra de hero weer in beeld komt.
- **Mobiel en reduced-motion** (`!scrollDriven`): `p` blijft vast op 0,58, zoals nu.

### Tuning

`HERO_DAMP` als één constante bovenaan `initHero`. Bruikbaar bereik circa 0,08 (zwevender) tot 0,18 (strakker). Startwaarde 0,12: een muiswielklik wordt dan een beweging van circa 300 ms.

## Testen

Geen geautomatiseerde tests in dit project. Handmatig op desktopbreedte (> 900 px):

1. Muiswiel klik voor klik door de hero: laptop beweegt vloeiend, geen sprongen.
2. Snel doorscrollen naar Diensten: eindtoestand identiek aan huidige versie (hero volledig uitgefaded, `pointer-events: none`, Diensten netjes op zijn plek).
3. Trackpad: voelt nog direct, niet zwevend.
4. Refresh halverwege de hero: geen inhaalanimatie vanaf 0.
5. Uitscrollen tot voorbij de hero, wachten, terugscrollen: geen inhaalslag bij terugkeer.
6. Venster verkleinen tot < 900 px en terug: geen rare tussenstand.
7. `prefers-reduced-motion: reduce` in devtools: gedrag ongewijzigd (statische compositie).
