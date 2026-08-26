/**
 * Alle verkoopprijzen op de site komen hieruit (besloten 26-08-2026, zie docs 11 §7 en 12).
 * Regel: alle bedragen INCL. 21% btw. Kostprijzen staan niet in de code.
 */
export const pricing = {
  vat: { included: true, rate: 21, label: "incl. btw" },

  website: {
    from: 250,
    note: "De exacte prijs hoor je na de gratis demo. Tot dan zit je nergens aan vast.",
  },

  hosting: [
    {
      id: "online",
      name: "Online",
      monthly: 5,
      summary: "Alleen hosting van je website.",
      includes: ["SSL-certificaat", "Dagelijkse back-ups", "Updates", "Monitoring"],
      excludes: ["Domeinnaam (los €15 per jaar)", "Wijzigingen (op kwartiertarief)"],
      featured: false,
    },
    {
      id: "onderhoud",
      name: "Onderhoud",
      monthly: 15,
      summary: "Hosting, je .nl-domein en één kleine wijziging per maand.",
      includes: [
        "Alles van Online",
        ".nl-domein op jouw naam",
        "1 kleine wijziging per maand (tot 15 minuten)",
        "Jaarlijkse check op snelheid en teksten",
      ],
      excludes: [],
      featured: true,
      fairUse:
        "Een kleine wijziging is bijvoorbeeld een tekst, foto, prijs of openingstijd. Geen nieuwe pagina's of ontwerpwerk. Ongebruikte tijd vervalt.",
    },
    {
      id: "webshop",
      name: "Webshop",
      monthly: 30,
      summary: "Beheer van je Shopify-webshop.",
      includes: [
        "Domein op jouw naam",
        "Thema- en app-updates",
        "Koppelingen (iDEAL, verzending) in de gaten houden",
        "2 kleine wijzigingen per maand (tot 30 minuten)",
      ],
      excludes: ["Shopify-abonnement (circa €21 per maand, rechtstreeks aan Shopify)"],
      featured: false,
    },
  ],

  addons: [{ id: "mailbox", name: "Zakelijke mailbox", monthly: 5, per: "mailbox", summary: "Op je eigen domein." }],

  domains: {
    included: "Bij Onderhoud en Webshop zit je .nl-domein erbij.",
    table: [
      { tld: ".nl", yearly: 15 },
      { tld: ".com", yearly: 20 },
    ],
    other: "Andere extensies op aanvraag.",
  },

  hulp: {
    quarter: 15,
    billing: "Op afstand per kwartier; aan huis per half uur, minimaal een uur.",
    travel: "Geen voorrijkosten in de Hoeksche Waard.",
    card: { quarters: 20, price: 270, validity: "12 maanden geldig" },
    apk: { computer: 59, website: 59 },
    guarantee: {
      line: "Niet opgelost? Dan betaal je niets.",
      conditions: [
        "Geldt per probleem dat we vooraf samen benoemen.",
        "Niet voor de APK's, uitleg en advies; die lever ik altijd.",
        "Niet als de oorzaak buiten mijn bereik ligt (kapotte hardware, storing bij je provider) en ik je dat gemeld heb.",
      ],
    },
  },

  terms: {
    cancellation: "Maandelijks opzegbaar. Je domein loopt door tot het einde van het registratiejaar.",
    billing: "Betalen per maand of per jaar (voorkeur: per jaar). Bij jaarbetaling en tussentijds opzeggen gaan de resterende hele maanden retour.",
  },
} as const;

/** Geldnotatie zonder decimalen (alle prijzen zijn hele euro's). */
export const euro = (amount: number) => `€${amount}`;
