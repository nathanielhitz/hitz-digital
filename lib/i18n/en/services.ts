import { pricing, euro } from "@/lib/pricing";
import { href } from "../paths";
import type { ServicesDict } from "../nl/services";

const L = "en" as const;
const online = pricing.hosting.find((h) => h.id === "online")!;
const onderhoud = pricing.hosting.find((h) => h.id === "onderhoud")!;
const nlDomain = pricing.domains.table.find((d) => d.tld === ".nl")!;
const guaranteeLine = "Niet opgelost? Dan betaal je niets.";

/** Dienst-teksten: pijlers, lijsten, FAQ's, pakket- en tarieflabels. Getallen komen uit lib/pricing.ts. */
export const services: ServicesDict = {
  pijlers: [
    {
      id: "websites" as const,
      n: "01",
      title: "Websites",
      body: "A modern site that fits your business. You see a real demo of your own homepage first; only then do you decide.",
      price: `From ${euro(pricing.website.from)}`,
      href: href(L, "websites"),
    },
    {
      id: "hosting" as const,
      n: "02",
      title: "Hosting & domains",
      body: "Domain, hosting, email and one small change per month in one fee. Cancel monthly.",
      price: `From ${euro(online.monthly)} a month`,
      href: href(L, "hosting"),
    },
    {
      id: "hulp" as const,
      n: "03",
      title: "Help",
      body: "Computer, email, domain or website: I fix it and explain it. Usually remote, via screen sharing, wherever you are.",
      price: `${euro(pricing.hulp.quarter)} per quarter hour · No fix, no fee.`,
      href: href(L, "hulp"),
    },
  ],

  werkwijze: [
    { n: "01", title: "Send me your site or tell me your idea", body: "A message, a link or a short description is enough." },
    {
      n: "02",
      title: "I build a concrete demo",
      body: "You get to see a real demo site, focused on your new homepage. No pitch or PowerPoint, but something you can click through yourself.",
    },
    {
      n: "03",
      title: "Then you decide",
      body: "Like it? Then we develop it together into a complete website. Not for you? Then you're not tied to anything. The demo stays free.",
    },
  ],

  zoWerkIk: [
    { title: "Yours, and it stays that way", body: "Your website and domain are registered in your name. No lock-in, no being stuck with me." },
    {
      title: "Clear pricing upfront",
      body: `Websites from ${euro(pricing.website.from)}, hosting from ${euro(online.monthly)} a month, maintenance ${euro(onderhoud.monthly)} a month, help ${euro(pricing.hulp.quarter)} per quarter hour. All incl. VAT, no small print.`,
    },
    { title: "Cancel monthly", body: "Hosting included. Your domain simply runs until the end of the year it's registered for." },
    { title: "One message is enough", body: "No account manager, no ticket system. You message or call me, and I reply myself." },
  ],

  over: {
    title: "One person. Short lines. No hassle.",
    body: "I'm Nathaniel, from Puttershoek in the Netherlands. I run HitzDigital on my own, for small businesses here and abroad. I build your website, keep it online and step in the moment your computer or email lets you down. No big agency with templates, but one person you can simply message.",
    facts: ["One point of contact", "Clear agreements", "Based in the Netherlands"],
    portraitAlt: "Nathaniel, founder of HitzDigital",
  },

  websiteOpties: [
    {
      title: "No decent site yet",
      body: "I build a modern website that's clean, fast and clear. A site that builds trust and fits your business, with copy and photos that are right.",
    },
    {
      title: "Your site is dated",
      body: "I give your current site a fresh look and a better structure. What works stays, what gets in the way goes. You don't have to start over.",
    },
  ],
  websiteInbegrepen: [
    "Designed for your phone, because that's where your customers look",
    "Fast, even on a slow connection",
    "Findable in Google for your service and your area",
    "Edit copy, photos and prices yourself",
    "Copy and photos taken care of, or you supply them",
    "Domain in your name",
    "Hosting with me or elsewhere, your choice",
  ],
  websiteFaq: [
    { q: "How long does it take?", a: "The demo of your homepage is usually ready within a week. The complete website then goes live in two to four weeks, depending on how quickly copy and photos come together." },
    { q: "What exactly is the demo?", a: "A real, working preview of your new homepage that you can open in your own browser. No sketch or PowerPoint. So you see what your site will look like before you decide anything." },
    { q: "What if I don't like the demo?", a: "Then it ends there, with no cost and no obligation. The demo is and stays free." },
    { q: "Do I have to write the copy myself?", a: "No. You're welcome to supply it, but I also write it for you based on a short conversation. You supply photos, or I source fitting imagery." },
    { q: "Can I edit the site myself?", a: "Yes. You change copy, photos, prices and opening hours yourself, without technical knowledge. Rather not? Then one small change per month is included in the maintenance plan." },
    { q: "Do you work with clients outside the Netherlands?", a: "Yes. I'm based in Puttershoek, near Rotterdam, and building a website works just as well remotely: we talk by video call, email or WhatsApp. On-site help is limited to my own region, the Hoeksche Waard." },
  ],
  websiteNote: "You hear the exact price after the free demo. Until then you're not tied to anything.",

  hostingAltijd: [
    "Servers in the Netherlands (EU)",
    "Daily backups",
    "SSL certificate (the padlock)",
    "Updates and security",
    "Monitoring: I notice when your site goes down",
    "Domain in your name",
    "Cancel monthly",
  ],
  overstappen: [
    { n: "01", title: "You give me access", body: "To your current hosting or domain. Not sure where that is? We'll figure it out together." },
    { n: "02", title: "I move your site, domain and email", body: "At a time that suits you. You don't have to set anything up yourself." },
    { n: "03", title: "Nothing goes offline", body: "Only once everything runs and works with me does the domain switch over. Your email keeps arriving as usual." },
  ],
  hostingFaq: [
    { q: "What counts as a small change?", a: "Changing a text, photo, price or opening time. Something that's done within a quarter of an hour. A new page or design work falls outside it; I'm happy to do that, but at my quarter-hour rate. Unused time expires at the end of the month." },
    { q: "What if I want to stop?", a: "You cancel per month, with no notice period of months. Your domain runs until the end of the year it's registered for; after that you can renew it or take it to another provider. Your site and your domain are and remain yours." },
    { q: "Does my domain stay mine?", a: "Yes. I register it in your name and with your details. I manage it for you, but you're the owner. If you ever want to leave, you simply take the domain with you." },
    { q: "How fast do you respond to an outage?", a: "I get an alert myself when your site goes down and usually get straight on it. If you notice something odd, message or call me; you don't need to open a ticket." },
    { q: "Can I host my old WordPress site with you?", a: "Yes. Even if I didn't build the site, I can take over hosting, domain and email. I'll first take a quick look at whether the site is technically healthy." },
    { q: "Do I pay monthly or yearly?", a: "Whichever you prefer. Yearly is my preference: one invoice, done. If you cancel partway through, you get the remaining full months back. You pay by bank transfer, direct debit or iDEAL and always receive a proper invoice with VAT. All prices are incl. 21% VAT; VAT may differ for businesses outside the Netherlands." },
  ],
  /** Labels per pakket-id uit lib/pricing.ts. */
  plans: {
    online: {
      name: "Online",
      summary: "Hosting of your website only.",
      includes: ["SSL certificate", "Daily backups", "Updates", "Monitoring"],
      excludes: [`Domain name (separately, from ${euro(nlDomain.yearly)} a year)`, "Changes (at quarter-hour rate)"],
      fairUse: undefined as string | undefined,
    },
    onderhoud: {
      name: "Maintenance",
      summary: "Hosting, your domain and one small change per month.",
      includes: ["Everything in Online", "Domain in your name", "1 small change per month (up to 15 minutes)", "Yearly check on speed and copy"],
      excludes: [] as string[],
      fairUse: "A small change is, for example, a text, photo, price or opening time. No new pages or design work. Unused time expires." as string | undefined,
    },
    webshop: {
      name: "Webshop",
      summary: "Your complete webshop online, managed and up to date.",
      includes: ["Domain in your name", "Shopify subscription included", "Payments with iDEAL and shipping integrations", "Theme and app updates", "1 small change per month (up to 15 minutes)"],
      excludes: [] as string[],
      fairUse: "A small change is, for example, a product, price, photo or text. No new pages or design work. Unused time expires." as string | undefined,
    },
  },
  mailbox: {
    name: "Business mailbox",
    summary: "On your own domain.",
    tiers: { one: "1 mailbox", multi: "2 to 5 mailboxes" },
    more: "More than 5 mailboxes on request.",
  },
  domains: {
    included: "The Maintenance plan includes a .nl domain.",
    other: "Other extensions, such as .com, on request.",
  },

  hulpHelp: [
    { title: "E-mail, domein en hosting", body: "Zakelijke mail instellen, overstappen, DNS, een verlopen domein." },
    { title: "Je website, ook als ik hem niet gebouwd heb", body: "WordPress-fixes, updates, een formulier dat niet werkt, een trage site." },
    { title: "Google Bedrijfsprofiel, Maps en reviews", body: "Goed vindbaar, met juiste openingstijden, foto's en een link naar je site." },
    { title: "Werkplek", body: "Laptop of pc inrichten, opschonen, sneller maken, back-up en beveiliging." },
    { title: "Printers, wifi, telefoon en tablet", body: "Alles wat moet samenwerken met je mail en je site." },
    { title: "Netwerk op kantoor met TP-Link Omada", body: "Wifi-punten, gastnetwerk en beheer, netjes ingericht en uitgelegd." },
    { title: "Lichte hardware-check en schoonmaak", body: "Stof eruit, ventilatie na, schijf en geheugen gecontroleerd." },
    { title: "Bestanden terughalen", body: "Per ongeluk gewist of een schijf die hapert? Softwarematig herstel ik wat te redden is. Fysiek defecte schijven verwijs ik door." },
  ],
  hulpNiet: [
    "Een pc vanaf nul bouwen of repareren op onderdelenniveau (scherm, moederbord, voeding)",
    "Datarecovery van kapotte schijven",
    "Kassasystemen en boekhoudsoftware inrichten",
  ],
  hulpStappen: [
    { n: "01", title: "Je belt of appt", body: "Vertel kort wat er misgaat. Een foto van het scherm helpt al." },
    { n: "02", title: "Ik kijk direct mee", body: "Via schermdeling, meestal binnen een kwartier begonnen. Moet ik langskomen? Dan kom ik langs." },
    { n: "03", title: "Je betaalt alleen de tijd die het kost", body: "Per kwartier, incl. btw. En niks als het niet lukt." },
  ],
  hulpFaq: [
    { q: "Kom je aan huis?", a: "Ja, in de Hoeksche Waard zonder voorrijkosten. De meeste problemen los ik sneller op afstand op, dus dat probeer ik eerst. Aan huis reken ik per half uur, met een minimum van een uur." },
    { q: "Hoe snel kun je?", a: "Op afstand vaak dezelfde dag, soms direct. Aan huis meestal binnen een paar werkdagen." },
    { q: "Hoe werkt op afstand meekijken?", a: "Je opent een link die ik je stuur, en ik zie je scherm terwijl we bellen. Jij houdt de controle en kunt altijd afsluiten. Er blijft niets achter op je computer." },
    { q: "Wat als het niet lukt?", a: "Dan betaal je niets voor die hulp. We spreken vooraf af wat het probleem is; los ik dat niet op, dan kost het je niks. Voor de APK's, uitleg en advies geldt dat niet, en ook niet als de oorzaak buiten mijn bereik ligt en ik je dat gemeld heb." },
    { q: "Help je ook met mijn telefoon of tablet?", a: "Ja. Mail instellen, foto's overzetten, een nieuwe telefoon inrichten, opruimen en beveiligen: het hoort er allemaal bij." },
    { q: "Help je ook particulieren?", a: `Ja, in de Hoeksche Waard, tegen hetzelfde tarief: ${euro(pricing.hulp.quarter)} per kwartier incl. btw. Ondernemers gaan voor als het druk is, maar je bent welkom.` },
  ],
  hulpTarief: {
    billing: "Op afstand per kwartier; aan huis per half uur, minimaal een uur.",
    travel: "Geen voorrijkosten in de Hoeksche Waard.",
    cardValidity: "12 maanden geldig",
    guarantee: {
      line: guaranteeLine,
      conditions: [
        "Geldt per probleem dat we vooraf samen benoemen.",
        "Niet voor de APK's, uitleg en advies; die lever ik altijd.",
        "Niet als de oorzaak buiten mijn bereik ligt (kapotte hardware, storing bij je provider) en ik je dat gemeld heb.",
      ],
    },
  },

  contactFaq: [
    { q: "Wat gebeurt er na mijn bericht?", a: "Je krijgt binnen 1 werkdag antwoord van mij, per mail of app. Bij een website-aanvraag stel ik een paar korte vragen en ga ik aan de slag met je gratis demo." },
    { q: "Kom je langs?", a: "Voor hulp kom ik langs in de Hoeksche Waard als op afstand niet lukt. Voor een website-gesprek kom ik graag even bij je kijken, maar het kan ook telefonisch." },
    { q: "Is een demo echt gratis?", a: "Ja. Je krijgt een echte, werkende voorproef van je homepage. Bevalt hij niet, dan stopt het daar, zonder kosten." },
  ],
};
