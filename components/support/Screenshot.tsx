import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Screenshot bij een support-stap. `src` is het pad vanaf /public zónder extensie,
 * bv. "/support/iphone/01-instellingen-mail"; .webp heeft voorrang op .png.
 * Rendert niets als het bestand ontbreekt, zodat een artikel live kan vóór alle plaatjes er zijn.
 */
export function Screenshot({ src, alt, width = 300 }: { src: string; alt: string; width?: number }) {
  const ext = [".webp", ".png", ".jpg"].find((e) => existsSync(join(process.cwd(), "public", src + e)));
  if (!ext) return null;
  return (
    <figure className="my-5">
      {/* eslint-disable-next-line @next/next/no-img-element -- statische screenshot met vaste breedte; lazy geladen */}
      <img
        src={src + ext}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ width, maxWidth: "100%" }}
        className="rounded-[28px] border border-line bg-panel shadow-card"
      />
      <figcaption className="mt-2 text-[13px] text-faint">{alt}</figcaption>
    </figure>
  );
}
