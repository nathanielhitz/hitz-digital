import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cases } from "@/lib/work";
import { supportArticles } from "@/lib/support";
import { alternatesFor, isLive, type Lang, type RouteKey } from "@/lib/i18n/paths";

type Entry = MetadataRoute.Sitemap[number];
type Base = Pick<Entry, "lastModified" | "changeFrequency" | "priority">;

const abs = (p: string) => `${site.url}${p === "/" ? "" : p}`;

/** Eén regel per taal waarin de route bestaat, met hreflang-alternates zodra EN live is. */
function entries(key: RouteKey, slug: string | undefined, base: Base): Entry[] {
  const langs: Lang[] = isLive("en") ? ["nl", "en"] : ["nl"];
  return langs.flatMap((lang) => {
    const alt = alternatesFor(lang, key, slug);
    if (lang === "en" && !alt.languages) return []; // geen EN-versie (support)
    const entry: Entry = { url: abs(alt.canonical), ...base };
    if (alt.languages) {
      entry.alternates = {
        languages: { nl: abs(alt.languages.nl), en: abs(alt.languages.en), "x-default": abs(alt.languages["x-default"]) },
      };
    }
    return [entry];
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...entries("home", undefined, { lastModified: now, changeFrequency: "monthly", priority: 1 }),
    ...entries("websites", undefined, { lastModified: now, changeFrequency: "monthly", priority: 0.9 }),
    ...entries("hosting", undefined, { lastModified: now, changeFrequency: "monthly", priority: 0.9 }),
    ...entries("hulp", undefined, { lastModified: now, changeFrequency: "monthly", priority: 0.9 }),
    ...entries("contact", undefined, { lastModified: now, changeFrequency: "yearly", priority: 0.7 }),
    ...entries("werk", undefined, { lastModified: now, changeFrequency: "monthly", priority: 0.8 }),
    ...cases.flatMap((c) => entries("werk", c.slug, { lastModified: now, changeFrequency: "yearly", priority: 0.6 })),
    ...entries("support", undefined, { lastModified: now, changeFrequency: "monthly", priority: 0.6 }),
    ...supportArticles.flatMap((a) =>
      entries("support", a.slug, { lastModified: new Date(a.updatedIso), changeFrequency: "yearly", priority: 0.5 }),
    ),
    ...entries("voorwaarden", undefined, { lastModified: now, changeFrequency: "yearly", priority: 0.3 }),
    ...entries("privacy", undefined, { lastModified: now, changeFrequency: "yearly", priority: 0.3 }),
  ];
}
