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
  /** Betalende klant → heeft een casepagina op /werk/[slug]. */
  client?: boolean;
};

/** Alle voorbeelden van werk, klanten eerst (besluit 26-08-2026). */
export const work: WorkItem[] = [
  {
    slug: "volmer-techniek",
    title: "Volmer Techniek",
    meta: "Metaalbewerking · Puttershoek",
    href: "https://www.volmertechniek.com/nl",
    src: "/images/volmertechniek.webp",
    alt: "Website van Volmer Techniek op mobiel",
    client: true,
  },
  {
    slug: "mourits-schilderwerken",
    title: "Mourits Schilderwerken",
    meta: "Schildersbedrijf · Klaaswaal",
    href: "https://www.mouritsschilderwerken.nl/",
    src: "/images/mauritsschilderwerken.webp",
    alt: "Website van Mourits Schilderwerken op mobiel",
    client: true,
  },
  {
    slug: "monster-zorg",
    title: "Monster Zorg",
    meta: "Zzp-zorgverlener · Gouda",
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

/** Interne link voor klanten (casepagina), externe link voor de rest. */
export const workHref = (item: WorkItem) => (item.client ? `/werk/${item.slug}` : item.href);

export type CaseStudy = {
  slug: string;
  title: string;
  branche: string;
  plaats: string;
  kicker: string;
  /** Eén zin die de case samenvat; wordt ook de meta-description. */
  intro: string;
  situatie: string;
  aanpak: string[];
  /** Wat de site nu concreet doet (feiten, geen cijfers die niet gemeten zijn). */
  resultaat: string[];
  desktop: string;
  voorNa?: { voor: string; na: string; voorAlt: string; naAlt: string };
  /** Alleen invullen met een echte quote en toestemming. */
  quote?: { text: string; author: string };
  url: string;
};

/**
 * Casepagina's voor de drie klanten. Inhoud is beperkt tot wat controleerbaar
 * op de sites staat; quotes volgen zodra ze binnen zijn (blok blijft tot dan verborgen).
 */
export const cases: CaseStudy[] = [
  {
    slug: "volmer-techniek",
    title: "Volmer Techniek",
    branche: "Metaalbewerking",
    plaats: "Puttershoek",
    kicker: "Metaalbewerking · Puttershoek",
    intro:
      "Een tweetalige website voor een verspanend bedrijf dat op locatie en in de eigen werkplaats werkt, met offerteformulier, projectgalerij en servicegebied.",
    situatie:
      "Volmer Techniek B.V. uit Puttershoek verspaant, repareert en bouwt machines, op locatie bij de klant en in de eigen werkplaats. De oude website was een standaard WordPress-site met een kant-en-klaar thema. Voor een bedrijf dat ook buiten Nederland werkt, moest de site in twee talen kunnen en de zes disciplines helder naast elkaar zetten.",
    aanpak: [
      "Zes diensten, elk met een eigen blok: on-site machining, verspaning in de werkplaats, industriële reparaties, machinebouw en maatwerk, retrofit, preventief onderhoud.",
      "Nederlands en Engels met een taalschakelaar, zodat internationale klanten dezelfde site krijgen.",
      "Werkwijze in vijf stappen en een offerteformulier met type aanvraag, naast een knop om direct te bellen.",
      "Projectgalerij met echte foto's van het werk en een kaart met het servicegebied.",
      "Certificeringen (VCA, Koninklijke Metaalunie) en 24/7-bereikbaarheid zichtbaar in beeld.",
    ],
    resultaat: [
      "Eén site voor Nederlandse en internationale klanten, op het eigen domein volmertechniek.com.",
      "Elke aanvraag komt binnen met type werk en contactgegevens, via formulier of telefoon.",
      "Donkere, industriële uitstraling die past bij het werk, met foto's van de eigen werkvloer.",
    ],
    desktop: "/images/werk/volmer-desktop.webp",
    url: "https://www.volmertechniek.com/nl",
  },
  {
    slug: "mourits-schilderwerken",
    title: "Mourits Schilderwerken",
    branche: "Schildersbedrijf",
    plaats: "Klaaswaal",
    kicker: "Schildersbedrijf · Klaaswaal",
    intro:
      "Een nieuwe site voor een schildersbedrijf uit Klaaswaal dat sinds 2015 in de hele Hoeksche Waard werkt: vijf diensten, projectgalerij en direct bellen vanaf je telefoon.",
    situatie:
      "Mourits Schilderwerken B.V. werkt sinds 2015 vanuit Klaaswaal in de hele Hoeksche Waard: schilderwerk binnen en buiten, wandafwerking, beglazing, restauratie en spuitwerk. De oude website stamde uit de begintijd van het bedrijf, met een fotoslider en een tabel met contactgegevens bovenaan, en was op een telefoon lastig te gebruiken.",
    aanpak: [
      "Vijf dienstcategorieën met eigen pagina's, van glasvlies en kalkverf tot HR++-glas en houtrotherstel.",
      "Bel-balk bovenaan en een knop om vrijblijvend advies aan te vragen, allebei direct bereikbaar op mobiel.",
      "Projectgalerij met eigen werk, werkgebied met alle kernen van de Hoeksche Waard, garantie op het werk benoemd.",
      "Rustige, lichte vormgeving met grote foto's van gevels en kozijnen, zodat het vakwerk zelf het verhaal vertelt.",
    ],
    resultaat: [
      "Site op het eigen domein mouritsschilderwerken.nl, met contactformulier, telefoon en mobiel nummer op één plek.",
      "Op mobiel bel je met één tik; op desktop staat de advies-aanvraag altijd in beeld.",
      "Vindbaar op dienst én plaats: elke dienst heeft een eigen pagina, het werkgebied staat uitgeschreven.",
    ],
    desktop: "/images/werk/mourits-desktop.webp",
    voorNa: {
      voor: "/images/werk/mourits-voor-mobiel.webp",
      na: "/images/werk/mourits-na-mobiel.webp",
      voorAlt: "De oude website van Mourits Schilderwerken op mobiel",
      naAlt: "De nieuwe website van Mourits Schilderwerken op mobiel",
    },
    url: "https://www.mouritsschilderwerken.nl/",
  },
  {
    slug: "monster-zorg",
    title: "Monster Zorg",
    branche: "Zzp-zorgverlener",
    plaats: "Gouda",
    kicker: "Zzp-zorgverlener · Gouda",
    intro:
      "Een persoonlijke site vanaf nul voor een toegepast psycholoog en zorgverlener die zichzelf als zzp'er inzet: wie hij is, wat hij doet, en hoe je hem bereikt.",
    situatie:
      "Jarno Monster werkt als toegepast psycholoog en zorgverlener met ruim acht jaar ervaring in de woonbegeleiding, en zet zichzelf als zzp'er in bij zorgorganisaties. Er was nog geen website. Opdrachtgevers moesten snel kunnen zien wat hij doet, wat zijn achtergrond is en hoe ze hem bereiken.",
    aanpak: [
      "Eén pagina met een duidelijke volgorde: wie is Jarno, wat biedt hij, welke ervaring heeft hij, waarom Monster Zorg, en contact.",
      "Tijdlijn van 2016 tot nu die de loopbaan in één oogopslag laat zien.",
      "Bellen en LinkedIn direct vanuit de navigatie; geen omwegen.",
      "Warme, lichte vormgeving met een echt portret in plaats van stockbeeld.",
    ],
    resultaat: [
      "Een site die in één scroll uitlegt wat een opdrachtgever wil weten, op het eigen domein monsterzorg.nl.",
      "Contact in twee tikken: telefoon of LinkedIn, ook op mobiel.",
      "Klaar om uit te breiden met werkgebied en tarieven zodra die vaststaan.",
    ],
    desktop: "/images/werk/monsterzorg-desktop.webp",
    url: "https://monsterzorg.nl",
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
