import { renderOg, ogSize } from "@/lib/og";
import { getDict } from "@/lib/i18n";
import { locales, langOf, type LangParams } from "@/lib/i18n/paths";

export const size = ogSize;
export const contentType = "image/png";

/** Zonder deze params blijft de route dynamisch: de OG-afbeelding wordt dan bij elke request opnieuw gerenderd. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpengraphImage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, ui } = getDict(lang);
  return renderOg({ ...pages.werk.og, footer: ui.og.footer });
}
