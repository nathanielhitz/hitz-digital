/**
 * Alle verkoopprijzen op de site komen hieruit (besloten 26-08-2026, zie docs 11 §7 en 12).
 * Regel: alle bedragen INCL. 21% btw. Kostprijzen staan niet in de code. Labels: lib/i18n/{nl,en}/services.ts (plans, mailbox, hulpTarief).
 */
export const pricing = {
  website: { from: 250 },

  hosting: [
    { id: "online", monthly: 5, featured: false },
    { id: "onderhoud", monthly: 15, featured: true },
    // Tijdelijk niet op de site (29-08-2026): eerst zelf de Shopify-flow testen of eerste aanvraag afwachten.
    // Zet `live: true` om de kaart terug te zetten. Prijs is all-in: het Shopify-abonnement (≈ €21) zit erin,
    // HitzDigital betaalt Shopify en het account staat op naam van de klant.
    { id: "webshop", live: false, monthly: 35, featured: false },
  ],

  addons: [
    {
      id: "mailbox",
      /** Staffel (besloten 29-08-2026): 1 mailbox €3, 2 t/m 5 mailboxen samen €5; meer op aanvraag. */
      tiers: [
        { id: "one", monthly: 3 },
        { id: "multi", monthly: 5 },
      ],
      quotaGb: 2,
    },
  ],

  domains: {
    table: [
      { tld: ".nl", yearly: 15 },
      { tld: ".com", yearly: 20 },
    ],
  },

  hulp: {
    quarter: 15,
    card: { quarters: 20, price: 270 },
    apk: { computer: 59, website: 59 },
  },
} as const;

export type PlanId = (typeof pricing.hosting)[number]["id"];

/** Geldnotatie zonder decimalen (alle prijzen zijn hele euro's). */
export const euro = (amount: number) => `€${amount}`;

/** Pakketten die op de site getoond worden (pakketten met `live: false` blijven in de data maar niet in beeld). */
export const liveHosting = pricing.hosting.filter((h) => !("live" in h) || h.live !== false);
