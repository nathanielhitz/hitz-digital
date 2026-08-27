import { renderOg, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    title: "Een website die direct *professioneler* voelt.",
    kicker: "Websites",
    sub: "Je ziet eerst een gratis demo van je eigen homepage. Daarna beslis je. Vanaf €250 incl. btw.",
  });
}
