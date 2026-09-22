import { renderOg, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    title: "Support & *handleidingen*",
    kicker: "Voor klanten",
    sub: "E-mail instellen, domein, website en meer. Stap voor stap, in gewoon Nederlands.",
  });
}
