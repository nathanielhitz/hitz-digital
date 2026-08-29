import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { Prose } from "@/components/page/Prose";
import { Container } from "@/components/layout/Container";
import { liveHosting, pricing, euro } from "@/lib/pricing";
import { site } from "@/lib/site";

const title = "Algemene voorwaarden | HitzDigital";
const description =
  "De afspraken van HitzDigital in gewone taal: websites, hosting en onderhoud, computer- en websitehulp, betalen, opzeggen en eigendom.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/voorwaarden" },
};

export default function VoorwaardenPage() {
  const updated = "26 augustus 2026";
  const onderhoud = pricing.hosting.find((h) => h.id === "onderhoud")!;
  const webshop = liveHosting.find((h) => h.id === "webshop");
  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        crumbs={[{ label: "Voorwaarden" }]}
        title="Algemene voorwaarden"
        lead="Geen kleine lettertjes, maar wel duidelijke afspraken. Dit is wat je van mij kunt verwachten en wat ik van jou verwacht."
      />
      <section className="px-[clamp(20px,5vw,64px)] pb-10 md:pb-12">
        <Container>
          <Prose>
            <p className="text-[13.5px] text-faint">Laatst bijgewerkt: {updated}</p>

            <h2>In zes zinnen</h2>
            <ul>
              <li>Een website begint met een gratis demo; pas daarna maken we prijsafspraken.</li>
              <li>Je website en je domein staan op jouw naam. Ze zijn en blijven van jou.</li>
              <li>Hosting en onderhoud betaal je per maand of per jaar, en zeg je per maand op.</li>
              <li>Een kleine wijziging is iets wat in een kwartier klaar is; ongebruikte tijd vervalt.</li>
              <li>Hulp die niet lukt, betaal je niet. Voor APK&apos;s, uitleg en advies geldt dat niet.</li>
              <li>Alle prijzen op de site zijn incl. 21% btw.</li>
            </ul>

            <h2>1. Wie en waarvoor</h2>
            <p>
              Deze voorwaarden gelden voor alles wat HitzDigital ({site.founder}, {site.city}
              {site.kvk ? `, KvK ${site.kvk}` : ""}) voor je doet: websites bouwen en vernieuwen, hosting, domeinen en
              onderhoud, en computer- en websitehulp. Door een opdracht te geven of een pakket af te nemen ga je akkoord
              met deze voorwaarden. Afwijkende afspraken maken we schriftelijk (een e-mail of appje is ook schriftelijk).
            </p>

            <h2>2. Websites</h2>
            <h3>Demo</h3>
            <p>
              De demo van je homepage is gratis en zonder verplichtingen. Bevalt hij niet, dan stopt het daar. De demo
              blijft van mij zolang je hem niet afneemt; ik gebruik hem niet voor anderen.
            </p>
            <h3>Prijs en oplevering</h3>
            <p>
              Na de demo spreken we een vaste prijs af voor de complete website (vanaf {euro(pricing.website.from)} incl.
              btw). Die prijs staat vast, tenzij je tijdens het bouwen iets extra&apos;s wilt; dat bespreken we dan eerst.
              Je levert teksten en foto&apos;s aan, of ik regel ze in overleg. De site is klaar als hij live staat op jouw
              domein en jij hem hebt goedgekeurd. Je betaalt na oplevering, binnen 14 dagen na de factuur.
            </p>
            <h3>Eigendom</h3>
            <p>
              Na betaling is de website van jou, inclusief teksten en beelden die voor jou zijn gemaakt. Foto&apos;s of
              lettertypen van derden vallen onder hun eigen licentie. Ik mag de site als voorbeeld van mijn werk tonen,
              tenzij je aangeeft dat je dat niet wilt.
            </p>

            <h2>3. Hosting, domein en onderhoud</h2>
            <h3>Wat je afneemt</h3>
            <p>
              Je kiest een pakket (Online, Onderhoud of Webshop) en eventueel mailboxen. Wat er in elk pakket zit staat op
              de hostingpagina; die omschrijving hoort bij deze voorwaarden. Prijzen zijn per maand en incl. 21% btw.
            </p>
            <h3>Kleine wijzigingen</h3>
            <p>
              Bij Onderhoud zit één kleine wijziging per maand (tot 15 minuten), bij Webshop twee (samen tot 30 minuten).
              Een kleine wijziging is bijvoorbeeld een tekst, foto, prijs of openingstijd aanpassen. Nieuwe pagina&apos;s,
              ontwerpwerk of functies vallen erbuiten en doe ik op kwartiertarief ({euro(pricing.hulp.quarter)} per
              kwartier, incl. btw). Ongebruikte tijd vervalt aan het einde van de maand en spaar je niet op.
            </p>
            <h3>Betalen</h3>
            <p>
              Je betaalt vooraf, per maand of per jaar; per jaar heeft mijn voorkeur, dat scheelt ons beiden
              administratie. Betalen gaat via automatische incasso (SEPA-machtiging) of iDEAL, en je krijgt altijd een
              factuur. Betaal je per jaar en zeg je tussentijds op, dan krijg je de resterende hele maanden terug.
              Blijft betaling na een herinnering uit, dan mag ik de site tijdelijk offline zetten tot er betaald is; je
              gegevens en je site blijven bewaard.
            </p>
            <h3>Opzeggen</h3>
            <p>
              Je zegt op per maand, per e-mail of appje, tot de laatste dag van de maand. Daarna stopt het abonnement.
              Je domein is per jaar geregistreerd en loopt door tot het einde van dat jaar; je kunt het dan verlengen
              (los, {euro(pricing.domains.table[0].yearly)} per jaar voor .nl) of meenemen naar een andere partij. Ik
              werk mee aan de verhuizing en geef je een export van je website als je die wilt.
            </p>
            {webshop && (
              <>
                <h3>Webshop</h3>
                <p>
                  Bij het Webshop-pakket draait je winkel op Shopify. Het Shopify-abonnement zit in de maandprijs: ik
                  sluit het af en betaal het, het account staat op jouw naam. Verhoogt Shopify zijn tarieven, dan kan de
                  maandprijs meebewegen; dat meld ik je minimaal een maand vooraf. Wat Shopify aan functies verandert,
                  valt buiten mijn invloed. Zeg je op, dan blijft de shop van jou: ik zet het abonnement over naar jouw
                  eigen betaalgegevens of help je met een export.
                </p>
              </>
            )}
            <h3>Beschikbaarheid en back-ups</h3>
            <p>
              Ik doe mijn best om je site altijd online te houden en maak dagelijks back-ups. Storingen bij
              datacenters, registrars of externe diensten kan ik niet uitsluiten; ik los ze zo snel mogelijk op, maar
              geef geen garantie op een percentage uptime. Bij een probleem app of bel je mij.
            </p>

            <h2>4. Computer- en websitehulp</h2>
            <p>
              Hulp kost {euro(pricing.hulp.quarter)} per kwartier, incl. btw. Op afstand reken ik per kwartier, aan huis
              per half uur met een minimum van een uur. Binnen de Hoeksche Waard reken ik geen voorrijkosten. Een
              strippenkaart van {pricing.hulp.card.quarters} kwartier kost {euro(pricing.hulp.card.price)} en is{" "}
              {pricing.hulp.card.validity}. De Computer APK en Website APK kosten {euro(pricing.hulp.apk.computer)} per
              keer.
            </p>
            <h3>Niet opgelost, dan betaal je niets</h3>
            <p>
              Vooraf benoemen we samen wat het probleem is. Los ik dat niet op, dan betaal je voor die hulp niets. Dit
              geldt niet voor de APK&apos;s, uitleg, training en advies (die lever ik altijd), en niet als de oorzaak
              buiten mijn bereik ligt (bijvoorbeeld kapotte hardware of een storing bij je provider), ik je dat gemeld
              heb en je toch wilt dat ik doorzoek.
            </p>
            <h3>Jouw gegevens en apparaten</h3>
            <p>
              Ik werk zorgvuldig en maak waar dat kan eerst een back-up, maar ik kan niet garanderen dat bestanden op
              een defect apparaat behouden blijven. Zorg zelf voor een back-up van wat je niet kwijt wilt. Wachtwoorden
              die je me geeft, gebruik ik alleen voor de afgesproken hulp en bewaar ik niet langer dan nodig.
            </p>

            <h2>5. Als je particulier bent</h2>
            <p>
              Koop je als particulier op afstand iets bij mij (bijvoorbeeld een strippenkaart via de site), dan heb je 14
              dagen bedenktijd. Vraag je me om binnen die 14 dagen al te beginnen, dan betaal je voor het deel dat al
              geleverd is. Hulp die op jouw verzoek direct wordt uitgevoerd, valt daar niet onder zodra hij is afgerond.
            </p>

            <h2>6. Aansprakelijkheid</h2>
            <p>
              Ik doe mijn werk zorgvuldig. Gaat er toch iets mis, dan is mijn aansprakelijkheid beperkt tot het bedrag
              dat je in de drie maanden ervoor voor die dienst aan mij hebt betaald. Ik ben niet aansprakelijk voor
              gevolgschade, zoals gemiste omzet, of voor problemen door diensten van derden (hosting-datacenter,
              registrar, Shopify, e-mailproviders). Deze beperking geldt niet als er sprake is van opzet of grove schuld.
            </p>

            <h2>7. Privacy</h2>
            <p>
              Hoe ik met persoonsgegevens omga staat in het <a href="/privacy">privacybeleid</a>. Host ik je website, dan
              verwerk ik ook gegevens van jouw klanten (bijvoorbeeld via je contactformulier). Daarvoor gelden de
              afspraken uit het privacybeleid als verwerkersafspraken tussen ons.
            </p>

            <h2>8. Wijzigingen en recht</h2>
            <p>
              Ik kan deze voorwaarden aanpassen. Bij lopende abonnementen laat ik dat minstens een maand vooraf weten;
              ben je het er niet mee eens, dan kun je gewoon per maand opzeggen. Op onze afspraken geldt Nederlands
              recht.
            </p>

            <p className="mt-10 text-[13.5px] text-faint">
              Vragen over deze voorwaarden? Mail naar <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </Prose>
        </Container>
      </section>
    </main>
  );
}
