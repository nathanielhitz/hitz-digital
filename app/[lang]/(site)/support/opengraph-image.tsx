import { renderOg, ogSize } from "@/lib/og";
import { getDict } from "@/lib/i18n";

export const size = ogSize;
export const contentType = "image/png";

/** Support bestaat alleen in het Nederlands (spec §1), dus alleen `nl`. Zonder deze params
    blijft de route dynamisch: de OG-afbeelding wordt dan bij elke request opnieuw gerenderd. */
export function generateStaticParams() {
  return [{ lang: "nl" }];
}

export default function OpengraphImage() {
  return renderOg({
    title: "Support & *handleidingen*",
    kicker: "Voor klanten",
    sub: "E-mail instellen, domein, website en meer. Stap voor stap, in gewoon Nederlands.",
    footer: getDict("nl").ui.og.footer,
  });
}
