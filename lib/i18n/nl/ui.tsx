import { site } from "@/lib/site";
import { href, type CtaKind } from "../paths";
import type { AanvraagKeuze } from "@/lib/aanvraag";
import type { WorkTag } from "@/lib/work";

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
  workCard: { viewCase: "Bekijk de case", tags: { demo: "Demo", eigen: "Eigen project" } satisfies Record<WorkTag, string> },
  plan: { mostChosen: "Meest gekozen", perMonthShort: "/mnd", choose: (name: string) => `Kies ${name}` },
  faq: { eyebrow: "Veelgestelde vragen", title: "Wat mensen me vaak vragen." },
};

export type UiDict = typeof ui;
