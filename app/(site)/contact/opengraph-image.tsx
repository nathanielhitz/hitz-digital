import { renderOg, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    title: "Waar kan ik je *mee helpen*?",
    kicker: "Contact",
    sub: "Gratis demo, hosting of hulp. App, bel of mail. Reactie binnen 1 werkdag.",
  });
}
