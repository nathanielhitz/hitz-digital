import { renderOg, ogSize } from "@/lib/og";
import { getDict } from "@/lib/i18n";
import { langOf, type SlugParams } from "@/lib/i18n/paths";
import { cases, getCase } from "@/lib/work";

export const size = ogSize;
export const contentType = "image/png";

/** Alleen de slugs; de `lang` komt uit generateStaticParams van de layout. */
export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export default async function OpengraphImage({ params }: SlugParams) {
  const { lang: raw, slug } = await params;
  const lang = langOf(raw);
  const { pages, ui, work } = getDict(lang);
  const c = getCase(slug);
  const copy = c ? work.cases[c.slug] : undefined;
  return renderOg({
    title: c ? pages.case.ogTitle(c.title) : pages.case.ogFallback.title,
    kicker: c && copy ? `${copy.branche} · ${c.plaats}` : pages.case.ogFallback.kicker,
    sub: copy?.intro,
    footer: ui.og.footer,
  });
}
