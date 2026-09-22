import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { Prose } from "@/components/page/Prose";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site";

const title = "Privacybeleid | HitzDigital";
const description =
  "Wat HitzDigital met je gegevens doet, in gewone taal: welke gegevens ik bewaar, waarom, hoe lang, met wie ik ze deel en welke rechten je hebt.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const version = "2.0";
  const updated = "29 augustus 2026";
  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        crumbs={[{ label: "Privacy" }]}
        title="Privacybeleid"
        lead="Ik vind het belangrijk dat je weet wat ik met jouw gegevens doe. Op deze pagina lees je hoe ik dat doe."
      />
      <section className="px-[clamp(20px,5vw,64px)] pb-10 md:pb-12">
        <Container>
          <Prose>
            <p className="text-[13.5px] text-faint">
              Versie {version}, bijgewerkt op {updated}
            </p>

            <p>
              HitzDigital maakt en host websites voor ondernemers in de Hoeksche Waard en helpt bij computerproblemen.
              Daar komen persoonsgegevens bij kijken: van jou als je contact opneemt, en van jouw bezoekers als ik je
              website host. Ik ga daar zorgvuldig mee om en bewaar zo weinig mogelijk. Ik houd me aan de Europese
              privacywet (de AVG) en de Nederlandse uitvoeringswet.
            </p>

            <h2>Wie is er verantwoordelijk voor jouw gegevens?</h2>
            <p>Dat hangt af van welke gegevens het zijn:</p>
            <ul>
              <li>
                <strong>Voor jouw eigen gegevens</strong> (je naam, e-mail, telefoonnummer, wat je me stuurt en je
                factuurgegevens als je klant wordt) ben ik verantwoordelijk.
              </li>
              <li>
                <strong>Voor de gegevens van jouw bezoekers en klanten</strong> op een website die ik voor je host, ben
                jij verantwoordelijk. Ik verwerk die gegevens in jouw opdracht. Hoe dat zit lees je verderop onder
                &ldquo;Websites die ik voor je host&rdquo;.
              </li>
            </ul>

            <h2>Welke gegevens bewaar ik van jou?</h2>
            <p>Alleen wat ik écht nodig heb om je te helpen. Concreet:</p>
            <ul>
              <li>
                <strong>Wie je bent.</strong> Je naam, e-mailadres en, als je dat geeft, je telefoonnummer, bedrijf en
                plaats.
              </li>
              <li>
                <strong>Waarvoor je me nodig hebt.</strong> Website, hosting, hulp of iets anders, plus je toelichting en
                eventueel de link naar je huidige website.
              </li>
              <li>
                <strong>Factuurgegevens.</strong> Alleen als je klant wordt: je naam, adres en wat je hebt afgenomen.
              </li>
              <li>
                <strong>Technische gegevens van deze website.</strong> Anonieme bezoekcijfers en laadtijden, zonder
                cookies en zonder IP-adres op te slaan. Saai, maar handig om de site snel en werkend te houden.
              </li>
            </ul>
            <p>Gevoelige gegevens, zoals over je gezondheid of geloof, vraag ik niet en wil ik ook niet hebben.</p>

            <h2>Waarom gebruik ik jouw gegevens?</h2>
            <ul>
              <li>Om je aanvraag te beantwoorden en contact met je op te nemen.</li>
              <li>Om op jouw verzoek een demo, offerte of afspraak te maken.</li>
              <li>Om de opdracht of het abonnement uit te voeren en te factureren.</li>
              <li>Om deze website veilig en snel te houden. Dat doe ik met anonieme statistieken.</li>
              <li>Om aan mijn wettelijke verplichtingen te voldoen, zoals de bewaarplicht voor de Belastingdienst.</li>
            </ul>
            <p>
              De grondslag daarvoor is de overeenkomst met jou (of de stappen daarvoor, op jouw verzoek), mijn
              gerechtvaardigd belang om een vraag te kunnen beantwoorden en de site te beheren, en de wet als die me
              iets verplicht. Ik gebruik je gegevens niet voor reclame.
            </p>

            <h2>Met wie deel ik jouw gegevens?</h2>
            <p>Met zo min mogelijk partijen, en alleen als het nodig is.</p>
            <p>
              <strong>Mijn hulpjes.</strong> Dat zijn partijen die voor mij werken: de partij die deze website host, de
              dienst die het contactformulier als e-mail naar mij verstuurt, de partij die mijn zakelijke e-mail host en
              mijn boekhoudpakket. Met al deze partijen heb ik afspraken gemaakt: ze mogen jouw gegevens alleen gebruiken
              om voor mij te werken en verwerken ze binnen de EU. Wil je weten welke partijen dat precies zijn? Stuur me
              een mailtje op <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
            <p>
              <strong>WhatsApp.</strong> Kies je er zelf voor om me via WhatsApp te benaderen, dan loopt dat gesprek via
              WhatsApp (Meta Platforms Ireland) en geldt daar het privacybeleid van WhatsApp.
            </p>
            <p>Ik verkoop jouw gegevens nooit aan derden. Punt.</p>

            <h2>Hoe lang bewaar ik jouw gegevens?</h2>
            <p>Niet langer dan nodig is. Wat &ldquo;nodig&rdquo; is, hangt af van het soort gegevens:</p>
            <ul>
              <li>
                <strong>Aanvragen die geen opdracht worden.</strong> Uiterlijk 12 maanden, dan verwijder ik ze.
              </li>
              <li>
                <strong>Klantgegevens.</strong> Zolang de opdracht of het abonnement loopt, plus de tijd die nodig is
                om alles netjes af te ronden.
              </li>
              <li>
                <strong>Facturen en administratie.</strong> 7 jaar. Dat is wettelijk verplicht.
              </li>
              <li>
                <strong>Onze mailwisseling.</strong> Zolang dat nodig is om je goed te kunnen helpen, ook als je later
                terugkomt.
              </li>
            </ul>

            <h2>Websites die ik voor je host</h2>
            <p>
              Host ik jouw website, dan gaan er ook gegevens van jouw bezoekers en klanten door mijn systemen. Denk aan
              wat iemand in je contactformulier invult, je zakelijke e-mail en bezoekstatistieken. Jij bent daarvoor de
              verantwoordelijke; ik ben verwerker en werk in jouw opdracht.
            </p>
            <p>Wat dat in de praktijk betekent:</p>
            <ul>
              <li>Ik gebruik die gegevens alleen om jouw site en mail te laten werken. Nergens anders voor.</li>
              <li>Ik deel ze niet met anderen, behalve met de hostingpartij waar je site op draait.</li>
              <li>De servers staan in Nederland. Alles wordt versleuteld verzonden en dagelijks geback-upt.</li>
              <li>Stop je, of vraag je erom, dan verwijder ik de gegevens.</li>
            </ul>
            <p>
              Deze afspraken gelden samen met de <a href="/voorwaarden">algemene voorwaarden</a> als
              verwerkersovereenkomst tussen ons.
            </p>

            <h2>Waar staan jouw gegevens?</h2>
            <p>In Europa, op goed beveiligde servers. De websites die ik host staan in Nederland.</p>

            <h2>Hoe bescherm ik jouw gegevens?</h2>
            <p>
              De verbinding met deze website is versleuteld (HTTPS). Het contactformulier controleert invoer aan de
              serverkant en heeft een simpele spamfilter die geen persoonsgegevens vastlegt. Alleen ik heb toegang tot
              de mailbox waar aanvragen binnenkomen, en die is beveiligd met een sterk wachtwoord en
              tweestapsverificatie.
            </p>
            <p>
              Gaat er onverhoopt toch iets mis met jouw gegevens (een datalek), dan meld ik dat binnen 72 uur bij de
              Autoriteit Persoonsgegevens als dat verplicht is. En als het gevolgen voor jou heeft, laat ik het je ook
              persoonlijk weten.
            </p>

            <h2>Worden er beslissingen over jou genomen door computers alleen?</h2>
            <p>Nee. Elke aanvraag lees en beantwoord ik zelf. Daar zit altijd een mens bij: ik.</p>

            <h2>Cookies</h2>
            <p>
              Deze website plaatst geen tracking- of marketingcookies. De bezoekstatistieken zijn cookieloos en anoniem,
              dus een cookiebanner is niet nodig. Kies je zelf voor de lichte of donkere weergave, dan onthoudt je
              browser dat lokaal. Die keuze verlaat je apparaat niet.
            </p>

            <h2>Jouw privacyrechten</h2>
            <p>Het zijn jouw gegevens. Logisch dat je daar wat over te zeggen hebt. Je kunt:</p>
            <ul>
              <li><strong>Inzien</strong> wat ik van je heb opgeslagen.</li>
              <li><strong>Corrigeren</strong> als er iets niet klopt.</li>
              <li><strong>Laten verwijderen</strong> wat ik van je heb (behalve wat ik wettelijk moet bewaren).</li>
              <li><strong>Beperken</strong> wat ik ermee mag doen.</li>
              <li><strong>Meenemen</strong> naar een andere partij (dataportabiliteit).</li>
              <li><strong>Bezwaar maken</strong> als je het ergens niet mee eens bent.</li>
            </ul>
            <p>
              Hoe doe je dat? Stuur een mailtje naar <a href={`mailto:${site.email}`}>{site.email}</a>. Je krijgt zo
              snel mogelijk en uiterlijk binnen een maand een reactie.
            </p>
            <p>
              Ik wil wel zeker weten dat jij ook echt jij bent. Daarom reageer ik op het e-mailadres dat ik van je ken en
              kan ik bij twijfel een extra vraag stellen. Niet om lastig te doen, maar om jouw gegevens te beschermen.
            </p>

            <h2>Heb je vragen of klachten?</h2>
            <p>
              Mail me op <a href={`mailto:${site.email}`}>{site.email}</a>. Ik help je graag verder.
            </p>
            <p>
              Vind je dat ik het niet goed doe? Dan kun je altijd terecht bij de Autoriteit Persoonsgegevens, de
              toezichthouder die over deze regels gaat. Je vindt ze op{" "}
              <a href="https://autoriteitpersoonsgegevens.nl" rel="noopener noreferrer" target="_blank">
                autoriteitpersoonsgegevens.nl
              </a>
              .
            </p>

            <h2>Wijzigingen aan dit beleid</h2>
            <p>
              Ik kan dit beleid af en toe aanpassen, bijvoorbeeld als de wet verandert of als ik mijn diensten uitbreid.
              De datum bovenaan laat zien wanneer ik voor het laatst iets heb gewijzigd. Bij belangrijke wijzigingen
              geef ik klanten vooraf een seintje.
            </p>

            <h2>Wie ben ik?</h2>
            <p>
              HitzDigital, eenmanszaak van {site.founder}, gevestigd in {site.city}.
              {site.kvk ? ` KvK-nummer: ${site.kvk}.` : ""} Contact:{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </Prose>
        </Container>
      </section>
    </main>
  );
}
