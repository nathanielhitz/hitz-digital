import type { ReactNode } from "react";
import { pricing, euro } from "@/lib/pricing";
import type { PagesDict } from "../nl/pages";

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

const homeH1 = { pre: "Everything around your ", accent: "website", post: ". One point of contact." };
const websitesH1 = { pre: "Een website die direct ", accent: "professioneler", post: " voelt." };
const hostingH1 = { pre: "Online blijven, ", accent: "zonder gedoe", post: "." };
const hulpH1 = { pre: "Vastgelopen? Ik kijk ", accent: "direct", post: " mee." };

/** Lead van de juridische pagina's: staat zowel in de hero als op de OG-afbeelding. */
const privacyLead = "Ik vind het belangrijk dat je weet wat ik met jouw gegevens doe. Op deze pagina lees je hoe ik dat doe.";
const voorwaardenLead = "Geen kleine lettertjes, maar wel duidelijke afspraken. Dit is wat je van mij kunt verwachten en wat ik van jou verwacht.";

/** Copy per pagina: metadata, OG-afbeelding, hero, secties, CTA-band. */
export const pages: PagesDict = {
  home: {
    meta: {
      title: "Websites, hosting and tech help for small businesses | HitzDigital",
      description: `I build websites for small businesses, keep them online and help when your computer or site lets you down. One person, short lines, based in the Netherlands and working with clients here and abroad. Websites from ${websiteFrom}, hosting from ${euro(online.monthly)} a month, all incl. VAT.`,
    },
    og: {
      title: star(homeH1),
      kicker: "Websites · Hosting · Help",
      sub: "Websites, hosting and tech help for small businesses. One person, based in the Netherlands, working with clients here and abroad.",
    },
    hero: {
      h1: homeH1,
      sub: "Websites, hosting and tech help for small businesses. One person, based in the Netherlands, working with clients here and abroad. I build your site, keep it online and step in the moment something breaks.",
      primary: "See what I do",
      secondary: "Get in touch",
      /** Labels in de mock-apparaten. De mock-site zelf (klantcontent) blijft in beide talen gelijk. */
      chips: {
        mobile: "Mobile-friendly",
        fast: "Fast loading",
        seo: "SEO-ready",
        structure: "Clear structure",
        modern: "Modern look",
        selfManaged: "Easy to manage yourself",
        friendly: "User-friendly",
        professional: "Professional impression",
      },
    },
    pijlers: { title: "Three things I take care of for you." },
    zoWerkIk: { title: "Clear upfront. No surprises afterwards." },
    werk: {
      eyebrow: "Work",
      teaserTitle: "Businesses that went before you.",
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
