export type WorkItem = {
  title: string;
  meta: string;
  href: string;
  src: string;
  alt: string;
};

/** Portfolio-tegels (fase 1: zoals live; fase 3: labels + /werk-galerij). */
export const work: WorkItem[] = [
  {
    title: "Volmer Techniek",
    meta: "Metaalbewerking · Hoeksche Waard",
    href: "https://volmer-techniek.vercel.app/nl",
    src: "/images/Volmertechniek.gif",
    alt: "Volmer Techniek",
  },
  {
    title: "Youniek Art",
    meta: "Fotografie portfolio",
    href: "https://youniekart.vercel.app",
    src: "/images/youniekart.jpg",
    alt: "Youniek Art",
  },
  {
    title: "Maurits Schilderwerken",
    meta: "Schildersbedrijf · Hoeksche Waard",
    href: "https://maurits-site-nine.vercel.app",
    src: "/images/Mouritsschilderwerken.jpeg",
    alt: "Maurits Schilderwerken",
  },
  {
    title: "Opgietingen.nl",
    meta: "Agenda voor opgiet-evenementen in Nederland en België",
    href: "https://www.opgietingen.nl/",
    src: "/images/opgietingen.jpg",
    alt: "Opgietingen.nl",
  },
  {
    title: "Festivaldiscounter",
    meta: "Festival tickets vergelijker en agenda",
    href: "https://festivaldiscounter.nl/",
    src: "/images/festivaldiscounter.jpg",
    alt: "Festivaldiscounter",
  },
  {
    title: "LesbosReizen",
    meta: "Affiliate marketing · Hoeksche Waard",
    href: "https://lesbosreizen.nl",
    src: "/images/Lesbosreizen.jpg",
    alt: "LesbosReizen",
  },
  {
    title: "Café 't Centrum",
    meta: "Lokaal café · Hoeksche Waard",
    href: "https://cafe-centrum.vercel.app",
    src: "/images/cafecentrum.jpg",
    alt: "Café 't Centrum",
  },
];
