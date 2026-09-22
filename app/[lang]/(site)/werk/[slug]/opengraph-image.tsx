import { renderOg, ogSize } from "@/lib/og";
import { cases, getCase } from "@/lib/work";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  return renderOg({
    title: c ? `Website voor *${c.title}*` : "Werk van HitzDigital",
    kicker: c ? `${c.branche} · ${c.plaats}` : "Werk",
    sub: c?.intro,
  });
}
