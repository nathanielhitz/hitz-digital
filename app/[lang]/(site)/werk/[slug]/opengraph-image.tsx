import { renderOg, ogSize } from "@/lib/og";
import { getDict } from "@/lib/i18n";
import { cases, getCase } from "@/lib/work";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  // Nog alleen Nederlands: de tweetalige OG-route volgt in een latere stap.
  const copy = c ? getDict("nl").work.cases[c.slug] : undefined;
  return renderOg({
    title: c ? `Website voor *${c.title}*` : "Werk van HitzDigital",
    kicker: c && copy ? `${copy.branche} · ${c.plaats}` : "Werk",
    sub: copy?.intro,
  });
}
