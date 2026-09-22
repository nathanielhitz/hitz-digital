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
    title: "Alles rond je *website*. Eén aanspreekpunt.",
    kicker: "Websites · Hosting · Hulp",
    sub: "Websites, hosting en computerhulp voor ondernemers in de Hoeksche Waard. Eén persoon, korte lijnen.",
  });
}
