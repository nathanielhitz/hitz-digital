import type { Metadata } from "next";
import { site } from "@/lib/site";
import { alternatesFor, href, ogLocale, type Lang, type RouteKey } from "./paths";

type Texts = { title: string; description: string };
type Opts = { slug?: string; type?: "website" | "article" };

/** Metadata voor één pagina: titel, beschrijving, canonical + hreflang, OpenGraph en Twitter. */
export function pageMetadata(lang: Lang, key: RouteKey, t: Texts, opts: Opts = {}): Metadata {
  const url = href(lang, key, opts.slug);
  return {
    title: t.title,
    description: t.description,
    alternates: alternatesFor(lang, key, opts.slug),
    openGraph: {
      title: t.title,
      description: t.description,
      url,
      siteName: site.name,
      locale: ogLocale(lang),
      type: opts.type ?? "website",
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  };
}
