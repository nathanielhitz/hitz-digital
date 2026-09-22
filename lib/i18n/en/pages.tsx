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
const hulpH1 = { pre: "Stuck? I'll take a look ", accent: "right away", post: "." };

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
      title: "Computer and website help, remote or on-site | HitzDigital",
      description: `Stuck? I'll take a look right away. Help with your computer, email, domain, network or website: remote via screen sharing wherever you are, on-site in the Hoeksche Waard area. ${quarter} per quarter hour incl. VAT. No fix? No fee.`,
    },
    og: {
      title: star(hulpH1),
      kicker: "Computer and website help",
      sub: `${quarter} per quarter hour incl. VAT. Remote wherever you are, on-site in the Hoeksche Waard. No fix? No fee.`,
    },
    crumb: "Help",
    hero: {
      title: accented(hulpH1),
      lead: "For small businesses, and for home users too. Your laptop, email, domain, network or website: I fix it and explain it in plain language. Usually remote via screen sharing, started within fifteen minutes. Need me on-site? In the Hoeksche Waard area, I'll come to you.",
      aside: {
        rate: "Rate",
        vat: "incl. VAT",
        perQuarter: "per quarter hour",
        guaranteeBody: "We agree upfront what the problem is. If I don't fix it, it costs you nothing.",
      },
    },
    apk: {
      title: "One fixed price, no surprises.",
      items: [
        {
          id: "computer-apk" as const,
          title: "Computer check-up",
          body: "Updates and clean-up, virus and malware scan, speed check, backup and passwords with two-step verification checked. You get a short list of what I did and what you can still do yourself. About 45 minutes, remote or on-site.",
        },
        {
          id: "website-apk" as const,
          title: "Website check-up",
          body: "Speed, mobile, findability, SSL, backups and outdated plugins, with a short report in plain language. Even if I didn't build your site. Disappointing result? Then I'll build a free demo of how it could be.",
        },
      ],
      plan: (title: string) => `Book a ${title}`,
      card: (quarters: number, price: string, validity: string) => `Need help more often? Prepaid card: ${quarters} quarter hours for ${price}, ${validity}.`,
    },
    help: {
      eyebrow: "What I help with",
      title: "From mailbox to office network.",
      notTitle: "What I don't do",
      notBody: "For these I'll point you to someone who does them well. Not sure whether something fits? Send me a message and I'll tell you honestly whether I can do it.",
    },
    how: {
      title: "Call, share your screen, sorted.",
      homeLead: "Stuck at home?",
      homeBody: (quarter: string) => `I also help private individuals in the Hoeksche Waard area, at the same rate: ${quarter} per quarter hour, incl. VAT.`,
    },
    ctaBand: { title: "Stuck right now?", body: "Call or message me and I'll take a look straight away. Prefer to send a message first? Tell me briefly what's going on." },
    schema: {
      name: "Computer and website help",
      serviceType: "Computer support and website support",
      perQuarter: "Help per quarter hour",
      unit: "quarter hour",
      card: (quarters: number) => `Prepaid card, ${quarters} quarter hours`,
    },
  },

  werk: {
    meta: {
      title: "Work: websites for small businesses | HitzDigital",
      description: "Examples of websites I've built: for a metalworking company, a painting company, a care professional and more. Click through to the cases.",
    },
    og: {
      title: "Examples of my *work*.",
      kicker: "Work",
      sub: "Websites for small businesses: metalworking, painting, care and more.",
    },
    crumb: "Work",
    hero: {
      title: "Examples of my work.",
      lead: "No templates, no stock photos. Sites I built for businesses in my region, plus a few projects of my own. For the clients, you can read how it went.",
    },
    ctaBand: {
      title: "Want this for your business too?",
      body: "Send me your current site or tell me briefly what you do. You get a real demo of your homepage, free and with no obligation.",
    },
  },

  case: {
    metaTitle: (title: string, branche: string, plaats: string) => `Website for ${title}, ${branche.toLowerCase()} in ${plaats} | HitzDigital`,
    ogTitle: (title: string) => `Website for *${title}*`,
    ogFallback: { title: "Work by HitzDigital", kicker: "Work" },
    viewSite: "Visit the site",
    desktopAlt: (title: string) => `Website of ${title} on desktop`,
    situation: "Situation",
    approach: "Approach",
    result: "Result",
    voorNa: {
      eyebrow: "Before and after",
      title: "How it looked, and how it looks now.",
      lead: "Drag the handle to compare the old and the new site, as a customer sees them on their phone.",
    },
    others: "Also built.",
    schemaName: (title: string) => `Website for ${title}`,
  },

  contact: {
    meta: {
      title: "Contact | HitzDigital",
      description: "Request a free demo, arrange hosting or ask for help. Message, call or email Nathaniel in the Netherlands. Reply within one working day, no obligation.",
    },
    og: { title: "What can I *help you with*?", kicker: "Contact", sub: "Free demo, hosting or help. Message, call or email. Reply within one working day." },
    crumb: "Contact",
    hero: {
      title: "What can I help you with?",
      lead: "Pick what you need me for and tell me briefly what's going on. I reply within one working day, no obligation. Site down or urgent? Call.",
    },
    direct: { eyebrow: "Prefer to skip the form", whatsappNote: "quickest for short questions", callNote: "call if your site is down or it's urgent" },
    about: {
      place: (founder: string, city: string) => `${founder} · ${city}, the Netherlands`,
      kvk: (kvk: string) => `Chamber of Commerce (KvK) ${kvk}`,
      reply: "Reply within one working day. Remote, or on-site in my region.",
    },
    faqTitle: "Quick questions",
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
