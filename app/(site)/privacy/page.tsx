import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { Prose } from "@/components/page/Prose";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site";

const title = "Privacybeleid | HitzDigital";
const description =
  "Hoe HitzDigital omgaat met je gegevens: wat er via het contactformulier wordt verzameld, waarom, hoe lang, welke rechten je hebt en wat er gebeurt met gegevens op websites die ik host.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const updated = "26 augustus 2026";
  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        crumbs={[{ label: "Privacy" }]}
        title="Privacybeleid"
        lead="Ik ga zorgvuldig en zo minimaal mogelijk met je gegevens om. Hier lees je wat ik verzamel, waarom, hoe lang, en welke rechten je hebt."
      />
      <section className="px-[clamp(20px,5vw,64px)] pb-[clamp(80px,12vw,140px)]">
        <Container>
          <Prose>
            <p className="text-[13.5px] text-faint">Laatst bijgewerkt: {updated}</p>

            <h2>Wie is verantwoordelijk?</h2>
            <p>
              HitzDigital ({site.founder}, {site.city}) is verwerkingsverantwoordelijke voor de gegevens die je via deze
              website of rechtstreeks aan mij geeft. Contact: <a href={`mailto:${site.email}`}>{site.email}</a>.
              {site.kvk ? ` KvK-nummer: ${site.kvk}.` : " KvK-nummer wordt binnenkort toegevoegd."}
            </p>

            <h2>Welke gegevens verzamel ik?</h2>
            <p>Wanneer je het contactformulier invult of me mailt, appt of belt, verwerk ik de gegevens die je zelf opgeeft:</p>
            <ul>
              <li>je naam en e-mailadres, en je telefoonnummer als je dat geeft;</li>
              <li>waarvoor je me nodig hebt (website, hosting, hulp of iets anders);</li>
              <li>eventueel de URL van je huidige website, je bedrijf en plaats, en een toelichting.</li>
            </ul>
            <p>Ik vraag bewust niet meer dan nodig is om je aanvraag te kunnen beantwoorden. Gevoelige gegevens verzamel ik niet.</p>

            <h2>Waarvoor en op welke grondslag?</h2>
            <p>
              Ik gebruik deze gegevens om contact met je op te nemen, je aanvraag te beoordelen en (op jouw verzoek) een
              demo, offerte of afspraak te maken. De grondslag is het op jouw verzoek nemen van stappen vóór een
              overeenkomst, en daarna de uitvoering van die overeenkomst. Ik gebruik je gegevens niet voor reclame en
              verkoop ze niet aan derden.
            </p>

            <h2>Hoe lang bewaar ik ze?</h2>
            <p>
              Aanvragen die niet tot een opdracht leiden verwijder ik uiterlijk binnen 12 maanden. Word je klant, dan
              bewaar ik de gegevens zolang dat nodig is voor de opdracht of het abonnement en voor de wettelijke
              administratietermijn (7 jaar voor facturen).
            </p>

            <h2>Wie verwerkt gegevens namens mij?</h2>
            <ul>
              <li>
                <strong>Vercel</strong> host deze website en levert geanonimiseerde, cookieloze bezoekstatistieken
                (aantal bezoekers en paginaweergaven). Er worden geen tracking-cookies geplaatst en geen individuele
                bezoekers geïdentificeerd.
              </li>
              <li>
                <strong>Het contactformulier</strong> verstuurt je bericht op dit moment via je eigen e-mailprogramma;
                er wordt geen externe formulierdienst gebruikt.
              </li>
              <li>
                <strong>Boekhouding en facturatie</strong> lopen via e-Boekhouden.nl (Nederland). Daar staan je naam,
                adres en factuurgegevens als je klant bent.
              </li>
            </ul>

            <h2>Websites die ik voor je host</h2>
            <p>
              Host ik jouw website, dan verwerk ik ook gegevens van jouw bezoekers en klanten, bijvoorbeeld via je
              contactformulier, e-mail of statistieken. Jij bent daarvoor de verantwoordelijke, ik ben verwerker. Ik
              verwerk die gegevens alleen om je site en mail te laten werken, deel ze niet met anderen, beveilig ze met
              SSL en dagelijkse back-ups, en verwijder ze als je stopt of daarom vraagt. De servers staan in Nederland.
              Deze afspraken gelden als verwerkersovereenkomst tussen ons, samen met de{" "}
              <a href="/voorwaarden">algemene voorwaarden</a>.
            </p>

            <h2>Cookies</h2>
            <p>
              Deze website plaatst geen tracking- of marketingcookies. De bezoekstatistieken zijn cookieloos en anoniem,
              dus een cookiemelding is niet nodig.
            </p>

            <h2>Je rechten</h2>
            <p>
              Je hebt het recht om je gegevens in te zien, te laten corrigeren of te laten verwijderen, en om bezwaar te
              maken tegen de verwerking. Stuur daarvoor een mailtje naar{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>; ik reageer zo snel mogelijk. Ben je het niet eens met
              hoe ik met je gegevens omga, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.
            </p>

            <h2>Wijzigingen</h2>
            <p>
              Ik kan dit privacybeleid aanpassen wanneer de website of werkwijze verandert. De datum bovenaan geeft aan
              wanneer het voor het laatst is bijgewerkt.
            </p>
          </Prose>
        </Container>
      </section>
    </main>
  );
}
