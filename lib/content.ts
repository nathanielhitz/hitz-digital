import { site } from "./site";

export const contactEmail = site.email;
export const mailto = `mailto:${site.email}`;

/**
 * One label per intent. CTA's funnelen naar de contactsectie (#contact) of Calendly,
 * i.p.v. een mailto te openen — lagere drempel, betere conversie.
 */
export const cta = {
  explore: { label: "Bekijk wat mogelijk is", href: "#voorna" },
  send: { label: "Stuur je website", href: "#contact" },
  call: { label: "Plan een korte kennismaking", href: site.calendly || "#contact" },
};

export const nav = {
  links: [
    { label: "Werk", href: "#werk" },
    { label: "Aanpak", href: "#aanpak" },
    { label: "Over", href: "#over" },
    { label: "Contact", href: "#contact" },
  ],
};
