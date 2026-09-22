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
const websitesH1 = { pre: "A website that instantly feels more ", accent: "professional", post: "." };
const hostingH1 = { pre: "Stay online, ", accent: "without the hassle", post: "." };
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
      teaserTitle: "Businesses that came before you.",
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
      title: "Website design for small businesses | HitzDigital",
      description: `A modern website for your business, from ${websiteFrom} incl. VAT. You see a free demo of your own homepage first, then you decide. For trades, hospitality and independent professionals, in the Netherlands and abroad.`,
    },
    og: {
      title: star(websitesH1),
      kicker: "Websites",
      sub: `You see a free demo of your own homepage first. Then you decide. From ${websiteFrom} incl. VAT.`,
    },
    crumb: "Websites",
    werkwijzeTitle: "A better website in three steps.",
    hero: {
      title: accented(websitesH1),
      lead: "For cafés, painters, installers, landscapers and other hands-on businesses, wherever you're based. You see a real demo of your own site first. Then you decide.",
      secondary: "See my work",
      asideAlt: "Website of Mourits Schilderwerken on desktop",
    },
    options: { title: "Two starting points, one approach." },
    included: {
      title: "Everything a good site needs.",
      lead: (from: string) => `No loose extras or surprises afterwards. This comes as standard, even with a site from ${from}.`,
    },
    price: {
      title: (from: string) => `A complete website from ${from}.`,
      lead: (note: string, monthly: string) =>
        `Incl. VAT. ${note} Want me to keep it online too? Hosting & maintenance is ${monthly} a month, including your domain and one small change per month. Cancel monthly.`,
      moreHosting: "More about hosting",
      card: {
        name: "Website",
        from: (from: string) => `from ${from}`,
        bullets: ["Free demo of your homepage upfront", "Complete site, on your own domain", "Copy and photos taken care of", "Easy to edit yourself"],
        hostingRow: "Hosting & maintenance",
        perMonth: (amount: string) => `${amount} a month`,
        vat: "All prices incl. 21% VAT. VAT may differ for businesses outside the Netherlands.",
      },
    },
    voorNa: {
      eyebrow: "Before and after",
      title: "From dated to polished.",
      lead: (title: string, branche: string, plaats: string) =>
        `${title}, a ${branche.toLowerCase()} in ${plaats}. Drag the handle to compare the old and the new site, exactly as your customer sees them on their phone.`,
      link: "Read the full case",
    },
    ctaBand: {
      title: "Curious what your website could look like?",
      body: "Send me your current site or tell me briefly what you do. You get a real demo of your homepage, free and with no obligation.",
    },
  },

  hosting: {
    meta: {
      title: "Website hosting, domain and maintenance | HitzDigital",
      description: `Hosting from ${euro(online.monthly)} a month, or maintenance with domain and one small change per month for ${euro(onderhoud.monthly)}. Cancel monthly, all incl. VAT. I handle the switch from your current host.`,
    },
    og: {
      title: star(hostingH1),
      kicker: "Hosting & domains",
      sub: "Domain, hosting, email and one small change per month in one fee. Cancel monthly.",
    },
    crumb: "Hosting & domains",
    hero: {
      title: accented(hostingH1),
      lead: "Domain, hosting, email and one small change per month in one fee. Cancel monthly. And if anything comes up, you message me. No ticket system.",
      primary: "Choose your plan",
      secondary: "Switching? I'll handle it",
      asideLabel: "Always included",
    },
    packages: {
      title: "Two plans, one monthly fee.",
      lead: (mailOne: string) =>
        `All prices incl. 21% VAT, cancel monthly. Pay monthly or yearly, whichever you prefer. A business mailbox on your own domain can be added to either plan, from ${mailOne} a month extra.`,
      everyPlan: "With either plan.",
      tierPerMonth: (label: string) => `${label}, per month`,
    },
    domain: {
      eyebrow: "Domain name & email",
      title: "Your domain, in your name.",
      p1: (included: string, other: string) =>
        `${included} If you choose hosting only, I register or renew your domain separately. I manage it, you remain the owner. ${other}`,
      p2: (one: string, multi: string, gb: number, more: string) =>
        `Business email on your own domain (you@yourbusiness.com) is ${one} a month for one mailbox and ${multi} a month for two to five mailboxes together, each with ${gb} GB of storage, calendar and spam filter, working on your phone and laptop. ${more}`,
      rowDomain: "domain, per year",
      note: "Incl. 21% VAT. Other extensions on request. VAT may differ for businesses outside the Netherlands.",
    },
    switch: {
      title: "Leaving your current host? I'll handle it.",
      lead: "Even if I didn't build your site. You don't have to move anything yourself, and nothing goes offline.",
    },
    ctaBand: {
      title: "Want to be sure your site just works?",
      body: "Tell me briefly where your site and domain are hosted now. I'll let you know what it comes to and handle the switch.",
    },
    schema: { name: "Hosting, domain and maintenance", serviceType: "Web hosting and website maintenance", unit: "month" },
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
