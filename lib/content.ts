import { site } from "./site";

export const contactEmail = site.email;

/** mailto met onderwerp + korte invul-template, zodat elke mail met context binnenkomt. */
const mailBody = [
  "Hoi Nathaniel,",
  "",
  "- Mijn huidige website (of: ik heb er nog geen): ",
  "- Wat voor bedrijf ik heb en waar: ",
  "- Wat ik zoek: ",
  "",
  "Groet,",
].join("\n");
export const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
  "Aanvraag preview via hitzdigital.nl",
)}&body=${encodeURIComponent(mailBody)}`;

/** Navigatie (fase 1: anker-secties; fase 3–5: routes). */
export const nav = {
  links: [
    { label: "Werk", href: "#werk" },
    { label: "Diensten", href: "#diensten" },
    { label: "Werkwijze", href: "#werkwijze" },
    { label: "Over", href: "#over" },
  ],
};

/** Eén label per intentie. */
export const cta = {
  explore: { label: "Bekijk wat mogelijk is", href: "#werk" },
  send: { label: "Stuur je website", href: mailto },
};
