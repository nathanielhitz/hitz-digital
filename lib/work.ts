import { href, type Lang } from "@/lib/i18n/paths";

export type WorkSlug =
  | "volmer-techniek"
  | "mourits-schilderwerken"
  | "monster-zorg"
  | "youniek-art"
  | "lesbosreizen"
  | "cafe-centrum"
  | "opgietingen"
  | "festivaldiscounter";
export type CaseSlug = Extract<WorkSlug, "volmer-techniek" | "mourits-schilderwerken" | "monster-zorg">;

/** Label-id; de tekst staat in lib/i18n (ui.workCard.tags). Alleen bij afwijkingen; klanten krijgen geen label. */
export type WorkTag = "demo" | "eigen";

export type WorkItem = {
  slug: WorkSlug;
  title: string;
  href: string;
  src: string;
  tag?: WorkTag;
  /** Betalende klant → heeft een casepagina. */
  client?: boolean;
};

/** Alle voorbeelden van werk, klanten eerst (besluit 26-08-2026). Teksten: lib/i18n/<taal>/work.ts. */
export const work: WorkItem[] = [
  { slug: "volmer-techniek", title: "Volmer Techniek", href: "https://www.volmertechniek.com/nl", src: "/images/volmertechniek.webp", client: true },
  { slug: "mourits-schilderwerken", title: "Mourits Schilderwerken", href: "https://www.mouritsschilderwerken.nl/", src: "/images/mauritsschilderwerken.webp", client: true },
  { slug: "monster-zorg", title: "Monster Zorg", href: "https://monsterzorg.nl", src: "/images/monsterzorg.webp", client: true },
  { slug: "youniek-art", title: "Youniek Art", href: "https://youniekart.vercel.app", src: "/images/youniekart.webp" },
  { slug: "lesbosreizen", title: "LesbosReizen", href: "https://lesbosreizen.nl", src: "/images/lesbosreizen.webp" },
  { slug: "cafe-centrum", title: "Café 't Centrum", href: "https://cafe-centrum.vercel.app", src: "/images/cafecentrum.webp", tag: "demo" },
  { slug: "opgietingen", title: "Opgietingen.nl", href: "https://www.opgietingen.nl/", src: "/images/opgietingen.webp", tag: "eigen" },
  { slug: "festivaldiscounter", title: "Festivaldiscounter", href: "https://festivaldiscounter.nl/", src: "/images/festivaldiscounter.webp", tag: "eigen" },
];

/** Interne link voor klanten (casepagina in de taal van de bezoeker), externe link voor de rest. */
export const workHref = (item: WorkItem, lang: Lang) => (item.client ? href(lang, "werk", item.slug) : item.href);

export type CaseStudy = {
  slug: CaseSlug;
  title: string;
  plaats: string;
  desktop: string;
  voorNa?: { voor: string; na: string };
  url: string;
};

/** Casepagina's voor de drie klanten. Copy staat in lib/i18n/<taal>/work.ts onder `cases[slug]`. */
export const cases: CaseStudy[] = [
  { slug: "volmer-techniek", title: "Volmer Techniek", plaats: "Puttershoek", desktop: "/images/werk/volmer-desktop.webp", url: "https://www.volmertechniek.com/nl" },
  {
    slug: "mourits-schilderwerken",
    title: "Mourits Schilderwerken",
    plaats: "Klaaswaal",
    desktop: "/images/werk/mourits-desktop.webp",
    voorNa: { voor: "/images/werk/mourits-voor-mobiel.webp", na: "/images/werk/mourits-na-mobiel.webp" },
    url: "https://www.mouritsschilderwerken.nl/",
  },
  { slug: "monster-zorg", title: "Monster Zorg", plaats: "Gouda", desktop: "/images/werk/monsterzorg-desktop.webp", url: "https://monsterzorg.nl" },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
