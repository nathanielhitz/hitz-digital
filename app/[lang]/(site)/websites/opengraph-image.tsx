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
    title: "Een website die direct *professioneler* voelt.",
    kicker: "Websites",
    sub: "Je ziet eerst een gratis demo van je eigen homepage. Daarna beslis je. Vanaf €250 incl. btw.",
  });
}
