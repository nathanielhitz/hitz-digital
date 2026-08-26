import { pricing, euro } from "./pricing";

/** Sectie "Diensten" (fase 1: huidige copy; fase 2: drie pijlers). */
export const diensten = [
  {
    n: "01",
    title: "Nieuwe website",
    body: "Nog geen goede site? Ik bouw een moderne website die strak, snel en duidelijk is. Een site die vertrouwen wekt en past bij je bedrijf.",
  },
  {
    n: "02",
    title: "Redesign",
    body: "Is je huidige website verouderd? Ik geef hem een moderne uitstraling en betere structuur, zonder dat je helemaal opnieuw hoeft te beginnen.",
  },
  {
    n: "03",
    title: "Mobielvriendelijk & snel",
    body: "Elke website werkt vlekkeloos op mobiel en laadt snel. Ook technisch SEO-klaar, zodat je vindbaar bent in Google.",
  },
  {
    n: "04",
    title: "Zelf te beheren",
    body: "Je kunt je site zelf eenvoudig bijhouden via een overzichtelijk CMS. Geen technische kennis nodig.",
  },
];

/** Sectie "Werkwijze": eerst zien, dan beslissen. */
export const werkwijze = [
  { n: "01", title: "Stuur je site of vertel je idee", body: "Een mailtje, link of korte uitleg is genoeg." },
  {
    n: "02",
    title: "Ik maak een concrete preview",
    body: "Je krijgt een echte demo-site te zien, met vooral je nieuwe homepage. Geen praatje of PowerPoint, maar iets wat je zelf kunt bekijken.",
  },
  {
    n: "03",
    title: "Dan pas beslis je",
    body: "Bevalt het? Dan werk ik het samen met jou uit tot een complete website. Zo niet? Dan zit je nergens aan vast. De demo blijft gratis.",
  },
];

const onderhoud = pricing.hosting.find((h) => h.id === "onderhoud")!;
const mailbox = pricing.addons[0];

/** Sectie "Zo werkt het": aanbod-transparantie; bedragen uit lib/pricing.ts. */
export const zoWerktHet = [
  {
    title: `Een prijs vanaf ${euro(pricing.website.from)}`,
    body: `Een complete website vanaf ${euro(pricing.website.from)}, incl. btw. ${pricing.website.note}`,
  },
  {
    title: "Van jou, en dat blijft zo",
    body: "Je website én domein zet ik op jouw naam. Geen gijzeling, geen vastzitten aan mij.",
  },
  {
    title: "Hosting & onderhoud",
    body: `${euro(onderhoud.monthly)} per maand, incl. je .nl-domein en één kleine wijziging per maand. Maandelijks opzegbaar. Zakelijke mailbox erbij voor ${euro(mailbox.monthly)} per maand. Alle prijzen incl. btw.`,
  },
  {
    title: "Teksten & foto's",
    body: "Teksten mag je zelf aanleveren, maar ik schrijf ze ook. Foto's lever je aan, of ik zet er passende beelden op.",
  },
  {
    title: "Korte lijnen",
    body: "Later iets aanpassen? Eén mailtje of appje. Geen accountmanager, geen ticketsysteem.",
  },
];

/** Sectie "Over". */
export const over = {
  title: "Eén persoon. Korte lijnen. Geen gedoe.",
  body: "Ik ben Nathaniel. Ik bouw HitzDigital in mijn eentje voor ondernemers in de Hoeksche Waard, van cafés tot vakbedrijven die online net zo verzorgd willen overkomen als in hun werk. Geen landelijk bureau met sjablonen, maar één iemand uit de regio die echte lokale bedrijven online zet. Geen accountmanager, geen tussenlagen: je mailt of appt mij, en ik reageer zelf. Eerst een concrete preview, dan pas beslis je.",
  facts: ["Persoonlijk contact", "Duidelijke afspraken", "Eerst zien, dan beslissen"],
};
