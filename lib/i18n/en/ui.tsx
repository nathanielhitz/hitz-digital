import { site } from "@/lib/site";
import { href } from "../paths";
import type { AanvraagKeuze } from "@/lib/aanvraag";
import type { UiDict } from "../nl/ui";

const L = "en" as const;
const contact = (voor?: AanvraagKeuze) => `${href(L, "contact")}${voor ? `?voor=${voor}` : ""}`;

/** mailto met onderwerp + korte invul-template, zodat elke mail met context binnenkomt. */
const mailBody = [
  "Hi Nathaniel,",
  "",
  "- What I need you for (website / hosting / help): ",
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
  whatsapp: "Message me on WhatsApp",
  call: "Call",
};

/** Alle tekst van de Engelse site-schil (nav, footer, formulier, 404, schema). */
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
    /** Header-knop per soort (spec §4). */
    cta: { demo: cta.demo.label, hosting: cta.hosting.label, hulp: cta.hulp.label, contact: "Contact" },
  },
  theme: {
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
    light: "Light theme",
    dark: "Dark theme",
  },
  lang: {
    nl: "Nederlands",
    en: "English",
    /** aria-label van de link naar de andere taal, in die taal. */
    switchTo: { nl: "Schakel naar Nederlands", en: "Switch to English" },
  },
  footer: {
    tagline: "Everything around your website. One point of contact.",
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
  ctaBand: { orCall: "Or call", reply: "Reply within one working day, no obligation." },
  fab: { label: "Got a question?", aria: "Got a question? Send me a WhatsApp message" },
  stickyBar: { aria: "Direct contact", call: "Call", whatsapp: "WhatsApp" },
  mailto: `mailto:${site.email}?subject=${encodeURIComponent("Enquiry via hitzdigital.nl")}&body=${encodeURIComponent(mailBody)}`,
  form: {
    legend: "What can I help you with?",
    choices: {
      website: { label: "New website", submit: "Request your free demo" },
      hosting: { label: "Hosting & domain", submit: "Request hosting" },
      hulp: { label: "I'm stuck", submit: "Request help" },
      anders: { label: "Something else", submit: "Send" },
    },
    name: "Name",
    email: "Email address",
    required: "(required)",
    phone: "Phone (optional)",
    website: "Your website, if you have one",
    websitePlaceholder: "https://… or: no site yet",
    company: "What kind of business do you run, and where?",
    companyPlaceholder: "e.g. a painting company in Rotterdam",
    message: "What's going on?",
    messagePlaceholder: "Short is fine.",
    sending: "Sending…",
    privacy: "See privacy policy",
    privacyHref: href(L, "privacy"),
    ok: "Done! Your enquiry has been sent. I'll reply within one working day.",
    failed: "Sending didn't work. Feel free to email me directly at",
    errors: {
      name: "Please enter your name, so I know who to call or email back.",
      email: "Please enter an email address I can reach you on.",
    },
    /** Alleen strings: dit blok gaat als prop naar een client-component. `{pakket}` en `{voor}` worden in de component vervangen. */
    packageInterest: "I'm interested in the {pakket} plan.",
    /** Nette pakketnamen voor `{pakket}`; onbekende ids vallen terug op de id met hoofdletter. */
    packageNames: { online: "Online", onderhoud: "Maintenance", webshop: "Webshop", "computer-apk": "Computer check-up", "website-apk": "Website check-up" },
    mailtoSubject: "Enquiry: {voor} via hitzdigital.nl",
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
        description: "Domain, hosting, business email and small changes in one monthly fee. Cancel monthly.",
      },
      {
        name: "Computer and website help",
        description:
          "Help with your computer, email, domain, network or website. Remote via screen sharing anywhere; on-site in the Hoeksche Waard area. No fix, no fee.",
      },
    ],
  },
  workCard: { viewCase: "View the case", tags: { demo: "Demo", eigen: "Own project" } },
  plan: { mostChosen: "Most popular", perMonthShort: "/mo", choose: (name: string) => `Choose ${name}` },
  faq: { eyebrow: "Frequently asked", title: "Questions I often get." },
};
