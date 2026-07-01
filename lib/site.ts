/**
 * Centrale site-config. VUL DE LEGE VELDEN IN met echte gegevens vóór launch.
 * Lege velden worden automatisch weggelaten uit de structured data (geen nep-data naar Google).
 */
export const site = {
  name: "HitzDigital",
  url: "https://www.hitzdigital.nl",
  email: "info@hitzdigital.nl",
  founder: "Nathaniel",
  phone: "", // VUL IN: "+31612345678"
  whatsapp: "", // VUL IN: internationaal zonder +, bv "31612345678"
  calendly: "", // VUL IN: "https://calendly.com/jouw-naam/kennismaking"
  kvk: "", // VUL IN: KvK-nummer
  city: "", // VUL IN: plaats
  region: "", // VUL IN: provincie/regio (voor een eventueel vestigingsadres)
  serviceArea: ["Hoeksche Waard", "Puttershoek"], // regio's die actief bediend worden
  socials: [] as string[], // VUL IN: ["https://www.linkedin.com/in/..."]
  formEndpoint: "", // VUL IN bij Formspree: "https://formspree.io/f/xxxxxxx"
};

/** ProfessionalService / lokale-dienstverlener schema; alleen gevulde velden worden meegestuurd. */
export function professionalServiceSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: "Moderne websites en redesigns voor kleine lokale ondernemers in de Hoeksche Waard.",
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
          description: "Nieuwe, moderne website voor kleine ondernemers zoals cafés, restaurants, schilders en installateurs.",
          areaServed: site.serviceArea.length
            ? site.serviceArea.map((name) => ({ "@type": "Place", name }))
            : undefined,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website redesign",
          description: "Redesign van een bestaande website: professioneler, mobielvriendelijk en zelf te beheren.",
          areaServed: site.serviceArea.length
            ? site.serviceArea.map((name) => ({ "@type": "Place", name }))
            : undefined,
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
