import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cases } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/websites`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/werk`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...cases.map((c) => ({
      url: `${site.url}/werk/${c.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
