import { renderOg, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    title: "Voorbeelden van mijn *werk*.",
    kicker: "Werk",
    sub: "Websites voor bedrijven in de Hoeksche Waard: metaalbewerking, schilderwerk, zorg en meer.",
  });
}
