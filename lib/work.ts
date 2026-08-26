export type WorkTag = "Demo" | "Eigen project";

export type WorkItem = {
  slug: string;
  title: string;
  meta: string;
  href: string;
  src: string;
  alt: string;
  /** Alleen bij afwijkingen; klanten en ander gebouwd werk krijgen geen label. */
  tag?: WorkTag;
  /** Betalende klant → krijgt in fase 3 een casepagina. */
  client?: boolean;
};

/** Alle voorbeelden van werk, klanten eerst (besluit 26-08-2026). */
export const work: WorkItem[] = [
  {
    slug: "volmer-techniek",
    title: "Volmer Techniek",
    meta: "Metaalbewerking · Hoeksche Waard",
    href: "https://volmer-techniek.vercel.app/nl",
    src: "/images/volmertechniek.webp",
    alt: "Website van Volmer Techniek op mobiel",
    client: true,
  },
  {
    slug: "maurits-schilderwerken",
    title: "Maurits Schilderwerken",
    meta: "Schildersbedrijf · Hoeksche Waard",
    href: "https://maurits-site-nine.vercel.app",
    src: "/images/mauritsschilderwerken.webp",
    alt: "Website van Maurits Schilderwerken op mobiel",
    client: true,
  },
  {
    slug: "monsterzorg",
    title: "Monster Zorg",
    meta: "Zzp-zorgverlener en toegepast psycholoog",
    href: "https://monsterzorg.nl",
    src: "/images/monsterzorg.webp",
    alt: "Website van Monster Zorg op mobiel",
    client: true,
  },
  {
    slug: "youniek-art",
    title: "Youniek Art",
    meta: "Fotografie portfolio",
    href: "https://youniekart.vercel.app",
    src: "/images/youniekart.webp",
    alt: "Website van Youniek Art op mobiel",
  },
  {
    slug: "lesbosreizen",
    title: "LesbosReizen",
    meta: "Reisinformatie over Lesbos",
    href: "https://lesbosreizen.nl",
    src: "/images/lesbosreizen.webp",
    alt: "Website van LesbosReizen op mobiel",
  },
  {
    slug: "cafe-centrum",
    title: "Café 't Centrum",
    meta: "Lokaal café · Hoeksche Waard",
    href: "https://cafe-centrum.vercel.app",
    src: "/images/cafecentrum.webp",
    alt: "Demo-website voor Café 't Centrum op mobiel",
    tag: "Demo",
  },
  {
    slug: "opgietingen",
    title: "Opgietingen.nl",
    meta: "Agenda voor opgiet-evenementen",
    href: "https://www.opgietingen.nl/",
    src: "/images/opgietingen.webp",
    alt: "Opgietingen.nl op mobiel",
    tag: "Eigen project",
  },
  {
    slug: "festivaldiscounter",
    title: "Festivaldiscounter",
    meta: "Festivaltickets vergelijken",
    href: "https://festivaldiscounter.nl/",
    src: "/images/festivaldiscounter.webp",
    alt: "Festivaldiscounter op mobiel",
    tag: "Eigen project",
  },
];
