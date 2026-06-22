/**
 * Centrale site-config. VUL DE LEGE VELDEN IN met echte gegevens vóór launch.
 * Lege velden worden automatisch weggelaten uit de structured data (geen nep-data naar Google).
 */
export const site = {
  name: "HitzDigital",
  url: "https://hitzdigital.nl",
  email: "hallo@hitzdigital.nl",
  founder: "", // VUL IN: "Voornaam Achternaam"
  phone: "", // VUL IN: "+31612345678"
  whatsapp: "", // VUL IN: internationaal zonder +, bv "31612345678"
  calendly: "", // VUL IN: "https://calendly.com/jouw-naam/kennismaking"
  kvk: "", // VUL IN: KvK-nummer
  city: "", // VUL IN: plaats
  region: "", // VUL IN: provincie/regio
  socials: [] as string[], // VUL IN: ["https://www.linkedin.com/in/..."]
  formEndpoint: "", // VUL IN bij Formspree: "https://formspree.io/f/xxxxxxx"
};

/** ProfessionalService / lokale-dienstverlener schema; alleen gevulde velden worden meegestuurd. */
export function professionalServiceSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: "Moderne websites en redesigns voor kleine ondernemers.",
    url: site.url,
    email: site.email,
    image: `${site.url}/og/cover.svg`,
    knowsLanguage: "nl",
    areaServed: site.region || "NL",
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website laten maken" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website redesign" } },
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
