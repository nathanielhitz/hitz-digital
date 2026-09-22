import { renderOg, ogSize } from "@/lib/og";
import { locales } from "@/lib/i18n/paths";

export const size = ogSize;
export const contentType = "image/png";

/** Zonder deze params blijft de route dynamisch: de OG-afbeelding wordt dan bij elke request opnieuw gerenderd. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function OpengraphImage() {
  return renderOg({
    title: "Vastgelopen? Ik kijk *direct* mee.",
    kicker: "Computer- en websitehulp",
    sub: "€15 per kwartier incl. btw. Op afstand of aan huis in de Hoeksche Waard. Niet opgelost? Dan betaal je niets.",
  });
}
