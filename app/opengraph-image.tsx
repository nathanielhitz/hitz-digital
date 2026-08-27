import { renderOg, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    title: "Alles rond je *website*. Eén aanspreekpunt.",
    kicker: "Websites · Hosting · Hulp",
    sub: "Websites, hosting en computerhulp voor ondernemers in de Hoeksche Waard. Eén persoon, korte lijnen.",
  });
}
