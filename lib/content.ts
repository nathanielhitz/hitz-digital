import { site } from "./site";

export const contactEmail = site.email;

/** mailto met onderwerp + korte invul-template, zodat elke mail met context binnenkomt. */
const mailBody = [
  "Hoi Nathaniel,",
  "",
  "- Waarvoor ik je nodig heb (website / hosting / hulp): ",
  "- Mijn huidige website (of: ik heb er nog geen): ",
  "- Wat voor bedrijf ik heb en waar: ",
  "",
  "Groet,",
].join("\n");
export const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
  "Aanvraag via hitzdigital.nl",
)}&body=${encodeURIComponent(mailBody)}`;

export const whatsapp = `https://wa.me/${site.whatsapp}`;
export const tel = `tel:${site.phone}`;
export const telDisplay = "+31 6 3741 9404";

/** Navigatie (fase 2: anker-secties; fase 3–5 worden dit routes). */
export const nav = {
  links: [
    { label: "Diensten", href: "/#pijlers" },
    { label: "Websites", href: "/websites" },
    { label: "Werk", href: "/werk" },
    { label: "Over", href: "/#over" },
  ],
};

/** Eén label per intentie. */
export const cta = {
  primary: { label: "Bekijk wat ik doe", href: "#pijlers" },
  contact: { label: "Neem contact op", href: "/#contact" },
  /** Query vóór de hash: zo scrolt de browser naar #contact én leest het formulier ?voor=. */
  demo: { label: "Gratis demo", href: "/?voor=website#contact" },
  demoLang: { label: "Vraag je gratis demo aan", href: "/?voor=website#contact" },
};
