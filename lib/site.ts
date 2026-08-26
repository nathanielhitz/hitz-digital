/**
 * Centrale site-config. VUL DE LEGE VELDEN IN met echte gegevens vóór launch.
 * Lege velden worden automatisch weggelaten uit de structured data (geen nep-data naar Google).
 */
export const site = {
  name: "HitzDigital",
  url: "https://www.hitzdigital.nl",
  email: "info@hitzdigital.nl",
  founder: "Nathaniel",
  phone: "+31637419404",
  whatsapp: "31637419404",
  calendly: "", // VUL IN: "https://calendly.com/jouw-naam/kennismaking"
  kvk: "", // VUL IN: KvK-nummer
  city: "Puttershoek",
  region: "Zuid-Holland",
  serviceArea: ["Hoeksche Waard", "Oud-Beijerland", "Puttershoek", "Strijen", "Numansdorp", "'s-Gravendeel", "Klaaswaal"], // regio's die actief bediend worden
  socials: [] as string[], // VUL IN: ["https://www.linkedin.com/in/..."]
  // VUL IN met ECHTE reviews (met toestemming). Zolang leeg wordt er GEEN Review/AggregateRating-schema meegestuurd.
  reviews: [] as { author: string; rating: number; text: string }[],
  // VUL IN met veelgestelde vragen. LET OP: koppel dit aan een ZICHTBAAR FAQ-blok op de pagina
  // vóór je erop leunt — schema zonder bijbehorende zichtbare tekst geldt als schema-spam.
  faq: [] as { q: string; a: string }[],
};

/** ProfessionalService / lokale-dienstverlener schema; alleen gevulde velden worden meegestuurd. */
export function professionalServiceSchema() {
  const area = site.serviceArea.length
    ? site.serviceArea.map((name) => ({ "@type": "Place", name }))
    : undefined;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: "Websites, hosting en computerhulp voor ondernemers in de Hoeksche Waard. Eén aanspreekpunt, gevestigd in Puttershoek.",
    url: site.url,
    email: site.email,
    image: `${site.url}/og/cover.svg`,
    knowsLanguage: "nl",
    areaServed: site.serviceArea.length
      ? site.serviceArea.map((name) => ({ "@type": "Place", name }))
      : "NL",
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website laten maken",
          description: "Nieuwe website of vernieuwing van een bestaande site voor ondernemers zoals cafés, schilders, installateurs en hoveniers. Eerst een gratis demo, dan pas beslissen.",
          areaServed: area,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hosting, domein en onderhoud",
          description: "Domein, hosting, zakelijke e-mail en kleine wijzigingen in één maandbedrag. Maandelijks opzegbaar.",
          areaServed: area,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Computer- en websitehulp",
          description: "Hulp bij computer, e-mail, domein, netwerk of website. Op afstand of aan huis in de Hoeksche Waard. Niet opgelost, dan niet betalen.",
          areaServed: area,
        },
      },
    ],
  };
  if (site.founder) schema.founder = { "@type": "Person", name: site.founder };
  if (site.phone) schema.telephone = site.phone;
  if (site.city || site.region) {
    schema.address = {
      "@type": "PostalAddress",
      ...(site.city ? { addressLocality: site.city } : {}),
      ...(site.region ? { addressRegion: site.region } : {}),
      addressCountry: "NL",
    };
  }
  if (site.socials.length) schema.sameAs = site.socials;
  // Alleen echte reviews → AggregateRating + Review (nooit verzinnen; zie audit-regel).
  if (site.reviews.length) {
    const sum = site.reviews.reduce((acc, r) => acc + r.rating, 0);
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: (sum / site.reviews.length).toFixed(1),
      reviewCount: site.reviews.length,
    };
    schema.review = site.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
    }));
  }
  return schema;
}

/** WebSite-schema; versterkt het "dit is de officiële site van deze entiteit"-signaal. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: site.url,
    name: site.name,
    inLanguage: "nl",
    publisher: { "@type": "ProfessionalService", name: site.name },
  };
}

/**
 * FAQPage-schema. Geeft `null` zolang er geen FAQ-items zijn, zodat er niets leegs
 * naar Google gaat. Activeer pas als de vragen OOK zichtbaar op de pagina staan.
 */
export function faqPageSchema() {
  if (!site.faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
