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
    live: true,
  },
  {
    id: "hulp",
    n: "03",
    title: "Hulp",
    promise: "Vastgelopen? Ik kijk direct mee.",
    body: "Computer, e-mail, domein of website: ik los het op en leg het uit. Meestal op afstand, en anders kom ik langs.",
    price: `${euro(pricing.hulp.quarter)} per kwartier · ${pricing.hulp.guarantee.line}`,
    href: "/hulp",
    live: true,
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

/** /hosting: wat er in elk pakket zit. */
export const hostingAltijd = [
  "Nederlandse servers",
  "Dagelijkse back-ups",
  "SSL-certificaat (het slotje)",
  "Updates en beveiliging",
  "Monitoring: ik zie het als je site eruit ligt",
  "Domein op jouw naam",
  "Maandelijks opzegbaar",
];

/** /hosting: overstappen in drie stappen. */
export const overstappen = [
  { n: "01", title: "Je geeft me toegang", body: "Tot je huidige hosting of domein. Weet je niet waar dat staat? Dan zoeken we het samen uit." },
  { n: "02", title: "Ik verhuis site, domein en mail", body: "Op een moment dat het jou past. Je hoeft zelf niets in te stellen." },
  { n: "03", title: "Niets ligt eruit", body: "Pas als alles bij mij draait en werkt, gaat het domein om. Je mail blijft gewoon binnenkomen." },
];

/** /hosting: veelgestelde vragen (ook als FAQPage-schema). */
export const hostingFaq = [
  {
    q: "Wat is een kleine wijziging?",
    a: "Een tekst, foto, prijs of openingstijd aanpassen. Iets wat in een kwartier klaar is. Een nieuwe pagina of ontwerpwerk valt erbuiten; dat doe ik graag, maar dan op kwartiertarief. Ongebruikte tijd vervalt aan het einde van de maand.",
  },
  {
    q: "Wat als ik wil stoppen?",
    a: "Je zegt op per maand, zonder opzegtermijn van maanden. Je domein loopt door tot het einde van het jaar waarvoor het geregistreerd is; daarna kun je het verlengen of meenemen naar een andere partij. Je site en je domein zijn en blijven van jou.",
  },
  {
    q: "Blijft mijn domein van mij?",
    a: "Ja. Ik registreer het op jouw naam en jouw gegevens. Ik beheer het voor je, maar jij bent de eigenaar. Wil je ooit weg, dan verhuis je het domein gewoon mee.",
  },
  {
    q: "Hoe snel reageer je bij een storing?",
    a: "Ik krijg zelf een melding als je site eruit ligt en ga er meestal direct mee aan de slag. Zie je zelf iets vreemds, app of bel me dan; je hoeft geen ticket aan te maken.",
  },
  {
    q: "Kan ik mijn oude WordPress-site bij jou hosten?",
    a: "Ja. Ook als ik de site niet gebouwd heb, kan ik hosting, domein en mail overnemen. Ik kijk dan eerst even mee of de site technisch gezond is.",
  },
  {
    q: "Betaal ik per maand of per jaar?",
    a: "Wat jij prettig vindt. Per jaar heeft mijn voorkeur: één factuur, klaar. Zeg je tussentijds op, dan krijg je de resterende hele maanden terug. Je betaalt via automatische incasso of iDEAL en krijgt altijd een nette factuur met btw. Alle prijzen zijn incl. 21% btw.",
  },
];

/** /hulp: waar ik bij help. */
export const hulpHelp = [
  { title: "E-mail, domein en hosting", body: "Zakelijke mail instellen, overstappen, DNS, een verlopen domein." },
  { title: "Je website, ook als ik hem niet gebouwd heb", body: "WordPress-fixes, updates, een formulier dat niet werkt, een trage site." },
  { title: "Google Bedrijfsprofiel, Maps en reviews", body: "Goed vindbaar, met juiste openingstijden, foto's en een link naar je site." },
  { title: "Werkplek", body: "Laptop of pc inrichten, opschonen, sneller maken, back-up en beveiliging." },
  { title: "Printers, wifi, telefoon en tablet", body: "Alles wat moet samenwerken met je mail en je site." },
  { title: "Netwerk op kantoor met TP-Link Omada", body: "Wifi-punten, gastnetwerk en beheer, netjes ingericht en uitgelegd." },
  { title: "Lichte hardware-check en schoonmaak", body: "Stof eruit, ventilatie na, schijf en geheugen gecontroleerd." },
  { title: "Bestanden terughalen", body: "Per ongeluk gewist of een schijf die hapert? Softwarematig herstel ik wat te redden is. Fysiek defecte schijven verwijs ik door." },
];

/** /hulp: wat ik niet doe (met doorverwijzing). */
export const hulpNiet = [
  "Een pc vanaf nul bouwen of repareren op onderdelenniveau (scherm, moederbord, voeding)",
  "Datarecovery van kapotte schijven",
  "Kassasystemen en boekhoudsoftware inrichten",
];

/** /hulp: hoe het werkt. */
export const hulpStappen = [
  { n: "01", title: "Je belt of appt", body: "Vertel kort wat er misgaat. Een foto van het scherm helpt al." },
  { n: "02", title: "Ik kijk direct mee", body: "Via schermdeling, meestal binnen een kwartier begonnen. Moet ik langskomen? Dan kom ik langs." },
  { n: "03", title: "Je betaalt alleen de tijd die het kost", body: "Per kwartier, incl. btw. En niks als het niet lukt." },
];

/** /hulp: veelgestelde vragen (ook als FAQPage-schema). */
export const hulpFaq = [
  {
    q: "Kom je aan huis?",
    a: "Ja, in de Hoeksche Waard zonder voorrijkosten. De meeste problemen los ik sneller op afstand op, dus dat probeer ik eerst. Aan huis reken ik per half uur, met een minimum van een uur.",
  },
  {
    q: "Hoe snel kun je?",
    a: "Op afstand vaak dezelfde dag, soms direct. Aan huis meestal binnen een paar werkdagen.",
  },
  {
    q: "Hoe werkt op afstand meekijken?",
    a: "Je opent een link die ik je stuur, en ik zie je scherm terwijl we bellen. Jij houdt de controle en kunt altijd afsluiten. Er blijft niets achter op je computer.",
  },
  {
    q: "Wat als het niet lukt?",
    a: "Dan betaal je niets voor die hulp. We spreken vooraf af wat het probleem is; los ik dat niet op, dan kost het je niks. Voor de APK's, uitleg en advies geldt dat niet, en ook niet als de oorzaak buiten mijn bereik ligt en ik je dat gemeld heb.",
  },
  {
    q: "Help je ook met mijn telefoon of tablet?",
    a: "Ja. Mail instellen, foto's overzetten, een nieuwe telefoon inrichten, opruimen en beveiligen: het hoort er allemaal bij.",
  },
  {
    q: "Help je ook particulieren?",
    a: "Ja, in de Hoeksche Waard, tegen hetzelfde tarief: €15 per kwartier incl. btw. Ondernemers gaan voor als het druk is, maar je bent welkom.",
  },
];

/** /contact: korte vragen onder het formulier. */
export const contactFaq = [
  { q: "Wat gebeurt er na mijn bericht?", a: "Je krijgt binnen 1 werkdag antwoord van mij, per mail of app. Bij een website-aanvraag stel ik een paar korte vragen en ga ik aan de slag met je gratis demo." },
  { q: "Kom je langs?", a: "Voor hulp kom ik langs in de Hoeksche Waard als op afstand niet lukt. Voor een website-gesprek kom ik graag even bij je kijken, maar het kan ook telefonisch." },
  { q: "Is een demo echt gratis?", a: "Ja. Je krijgt een echte, werkende voorproef van je homepage. Bevalt hij niet, dan stopt het daar, zonder kosten." },
];
