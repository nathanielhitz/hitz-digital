import { pricing, euro } from "./pricing";

const onderhoud = pricing.hosting.find((h) => h.id === "onderhoud")!;
const online = pricing.hosting.find((h) => h.id === "online")!;

/** De drie pijlers (homepage #pijlers; fase 3–5 krijgt elke pijler een eigen route). */
export const pijlers = [
  {
    id: "websites",
    n: "01",
    title: "Websites",
    promise: "Eerst zien. Dan beslissen.",
    body: "Een moderne site die past bij je bedrijf. Je ziet eerst een echte demo van je eigen homepage, daarna beslis je pas.",
    price: `Vanaf ${euro(pricing.website.from)}`,
    href: "/websites",
    live: true,
  },
  {
    id: "hosting",
    n: "02",
    title: "Hosting & domeinen",
    promise: "Online blijven, zonder gedoe.",
    body: "Domein, hosting, e-mail en een kleine wijziging per maand in één bedrag. Maandelijks opzegbaar.",
    price: `Vanaf ${euro(online.monthly)} per maand`,
    href: "/hosting",
    live: false,
  },
  {
    id: "hulp",
    n: "03",
    title: "Hulp",
    promise: "Vastgelopen? Ik kijk direct mee.",
    body: "Computer, e-mail, domein of website: ik los het op en leg het uit. Meestal op afstand, en anders kom ik langs.",
    price: `${euro(pricing.hulp.quarter)} per kwartier · ${pricing.hulp.guarantee.line}`,
    href: "/hulp",
    live: false,
  },
] as const;

/** Sectie "Werkwijze": eerst zien, dan beslissen (verhuist in fase 3 naar /websites). */
export const werkwijze = [
  { n: "01", title: "Stuur je site of vertel je idee", body: "Een appje, link of korte uitleg is genoeg." },
  {
    n: "02",
    title: "Ik maak een concrete demo",
    body: "Je krijgt een echte demo-site te zien, met vooral je nieuwe homepage. Geen praatje of PowerPoint, maar iets wat je zelf kunt bekijken.",
  },
  {
    n: "03",
    title: "Dan pas beslis je",
    body: "Bevalt het? Dan werk ik het samen met jou uit tot een complete website. Zo niet? Dan zit je nergens aan vast. De demo blijft gratis.",
  },
];

/** Sectie "Zo werk ik": vier afspraken die voor alles gelden. */
export const zoWerkIk = [
  {
    title: "Van jou, en dat blijft zo",
    body: "Je website en domein staan op jouw naam. Geen gijzeling, geen vastzitten aan mij.",
  },
  {
    title: "Duidelijke prijs vooraf",
    body: `Website vanaf ${euro(pricing.website.from)}, hosting vanaf ${euro(online.monthly)} per maand, onderhoud ${euro(onderhoud.monthly)} per maand, hulp ${euro(pricing.hulp.quarter)} per kwartier. Alles incl. btw, geen kleine lettertjes.`,
  },
  {
    title: "Maandelijks opzegbaar",
    body: "Ook de hosting. Je domein loopt gewoon door tot het einde van het jaar waarvoor het geregistreerd is.",
  },
  {
    title: "Eén appje is genoeg",
    body: "Geen accountmanager, geen ticketsysteem. Je appt of belt mij, en ik reageer zelf.",
  },
];

/** Sectie "Over". */
export const over = {
  title: "Eén persoon. Korte lijnen. Geen gedoe.",
  body: "Ik ben Nathaniel, uit Puttershoek. Ik bouw HitzDigital in mijn eentje voor ondernemers in de Hoeksche Waard. Ik maak je website, zorg dat hij online blijft en kijk direct mee als je computer of mail niet meewerkt. Geen landelijk bureau met sjablonen, maar iemand uit de regio die je gewoon kunt appen.",
  facts: ["Eén aanspreekpunt", "Duidelijke afspraken", "Uit de Hoeksche Waard"],
};

/** Keuzes in het aanvraagformulier; bepalen het submit-label en de mail. */
export const aanvraagKeuzes = [
  { id: "website", label: "Nieuwe website", submit: "Vraag je gratis demo aan" },
  { id: "hosting", label: "Hosting & domein", submit: "Vraag hosting aan" },
  { id: "hulp", label: "Ik zit vast", submit: "Vraag hulp aan" },
  { id: "anders", label: "Iets anders", submit: "Verstuur" },
] as const;
export type AanvraagKeuze = (typeof aanvraagKeuzes)[number]["id"];

/** /websites: nieuw of vernieuwen. */
export const websiteOpties = [
  {
    title: "Nog geen goede site",
    body: "Ik bouw een moderne website die strak, snel en duidelijk is. Een site die vertrouwen wekt en past bij je bedrijf, met teksten en foto's die kloppen.",
  },
  {
    title: "Je site is verouderd",
    body: "Ik geef je huidige site een nieuwe uitstraling en een betere structuur. Wat goed is blijft, wat in de weg zit gaat eruit. Je hoeft niet opnieuw te beginnen.",
  },
];

/** /websites: wat er standaard bij zit. */
export const websiteInbegrepen = [
  "Ontworpen voor je telefoon, want daar kijken je klanten",
  "Snel, ook op een trage verbinding",
  "Vindbaar in Google op je dienst en je plaats",
  "Zelf teksten, foto's en prijzen aanpassen",
  "Teksten en foto's geregeld, of je levert ze zelf aan",
  "Domein op jouw naam",
  "Hosting bij mij of ergens anders, jouw keuze",
];

/** /websites: veelgestelde vragen (ook als FAQPage-schema). */
export const websiteFaq = [
  {
    q: "Hoe lang duurt het?",
    a: "De demo van je homepage heb je meestal binnen een week. De complete website staat daarna in twee tot vier weken live, afhankelijk van hoe snel teksten en foto's rond zijn.",
  },
  {
    q: "Wat is de demo precies?",
    a: "Een echte, werkende voorproef van je nieuwe homepage die je zelf in je browser kunt bekijken. Geen schets of PowerPoint. Zo zie je hoe je site eruit gaat zien voordat je iets beslist.",
  },
  {
    q: "Wat als de demo niet bevalt?",
    a: "Dan stopt het daar, zonder kosten en zonder verplichtingen. De demo is en blijft gratis.",
  },
  {
    q: "Moet ik zelf teksten schrijven?",
    a: "Nee. Je mag ze zelf aanleveren, maar ik schrijf ze ook voor je op basis van een kort gesprek. Foto's lever je aan, of ik zorg voor passende beelden.",
  },
  {
    q: "Kan ik de site zelf aanpassen?",
    a: "Ja. Teksten, foto's, prijzen en openingstijden pas je zelf aan zonder technische kennis. Wil je dat liever niet zelf doen, dan zit een kleine wijziging per maand in het onderhoudspakket.",
  },
  {
    q: "Werk je ook buiten de Hoeksche Waard?",
    a: "Ja. Ik kom uit Puttershoek en de meeste klanten zitten in de regio, maar een website bouwen kan overal. Voor hulp aan huis blijf ik in de Hoeksche Waard.",
  },
];
