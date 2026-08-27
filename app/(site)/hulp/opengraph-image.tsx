import { renderOg, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    title: "Vastgelopen? Ik kijk *direct* mee.",
    kicker: "Computer- en websitehulp",
    sub: "€15 per kwartier incl. btw. Op afstand of aan huis in de Hoeksche Waard. Niet opgelost? Dan betaal je niets.",
  });
}
