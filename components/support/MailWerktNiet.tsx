import type { ReactNode } from "react";
import { site } from "@/lib/site";

function Stap({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="my-8 border-t border-line pt-7">
      <h2 className="!mt-0 flex items-baseline gap-3">
        <span className="font-mono text-[14px] font-normal text-accent-bright">{String(n).padStart(2, "0")}</span>
        <span>{title}</span>
      </h2>
      {children}
    </section>
  );
}

/** Artikel: checklist als de zakelijke mail (gehost door HitzDigital) niet werkt. Zonder screenshots. */
export function MailWerktNiet() {
  return (
    <>
      <p>
        Mail die niet werkt heeft bijna altijd een kleine oorzaak: een oud wachtwoord, een verkeerde servernaam of een
        volle mailbox. Loop deze stappen in volgorde door. Stuur na elke stap een testmail naar jezelf, dan zie je
        meteen of het opgelost is. Kom je er niet uit, dan staat onderaan wat ik van je nodig heb om het snel te
        fixen.
      </p>

      <Stap n={1} title="Werkt webmail?">
        <p>
          Ga naar <a href="https://mail.zxcs.nl">https://mail.zxcs.nl</a> en log in met je volledige e-mailadres en
          je wachtwoord. Lukt dat en zie je je mail, dan is je mailbox in orde en zit het probleem in je telefoon of
          mailprogramma. Ga naar stap 3. Lukt inloggen niet, ga naar stap 2.
        </p>
        <p>
          Meer over webmail staat in <a href="/support/webmail">Webmail: je mail in de browser</a>.
        </p>
      </Stap>

      <Stap n={2} title="Klopt je wachtwoord?">
        <ul>
          <li>Typ het wachtwoord opnieuw in. Let op hoofdletters en of Caps Lock aanstaat.</li>
          <li>
            Heb je het wachtwoord onlangs gewijzigd? Dan staat op je andere apparaten nog het oude. Pas het daar ook
            aan, anders blijven die apparaten foutmeldingen geven en kan de server je tijdelijk blokkeren.
          </li>
          <li>Wachtwoord kwijt? App me, dan stel ik een nieuwe in. Ik kan je oude wachtwoord niet opzoeken.</li>
        </ul>
      </Stap>

      <Stap n={3} title="Staat de juiste servernaam ingesteld?">
        <p>
          Open de accountinstellingen van je mailprogramma. Bij inkomende én uitgaande server moet precies{" "}
          <code>mail.zxcs.nl</code> staan. Veel programma&rsquo;s vullen zelf <code>mail.jouwbedrijf.nl</code> in, en
          dat werkt niet. Een melding over een onveilig of ongeldig certificaat betekent bijna altijd dat hier de
          verkeerde naam staat.
        </p>
        <p>
          Alle instellingen op een rij staan in{" "}
          <a href="/support/e-mail-instellingen">E-mailinstellingen: IMAP, POP3 en SMTP</a>. Voor de telefoon: zie{" "}
          <a href="/support/e-mail-instellen-iphone">E-mail instellen op iPhone of iPad</a>.
        </p>
      </Stap>

      <Stap n={4} title="Ontvangen lukt, verzenden niet?">
        <p>
          Dan zit het in de uitgaande server (SMTP). Controleer drie dingen: de poort is <strong>465</strong> of{" "}
          <strong>587</strong>, de beveiliging staat op SSL/TLS (bij 465) of STARTTLS (bij 587), en{" "}
          <strong>verificatie staat aan</strong> met hetzelfde e-mailadres en wachtwoord als voor inkomende mail.
          Zonder verificatie weigert de server je mail.
        </p>
        <p>
          Werkt het thuis wel en op een bedrijfsnetwerk, in een hotel of via een hotspot niet? Sommige netwerken
          blokkeren poort 465. Zet dan poort 587 met STARTTLS.
        </p>
      </Stap>

      <Stap n={5} title="Verzenden lukt, ontvangen niet?">
        <ul>
          <li>
            <strong>Mailbox vol.</strong> Een mailbox is 2 GB. Is hij vol, dan komt nieuwe mail niet meer binnen en
            krijgt de afzender een foutmelding terug. Linksonder in webmail zie je hoe vol je mailbox is. Leeg de
            Prullenbak en de map Spam, verwijder oude mails met grote bijlagen, of neem een grotere mailbox bij mij.
          </li>
          <li>
            <strong>Map Spam.</strong> Kijk in webmail in de map Spam. Staat de mail daar, sleep hem naar Postvak In.
          </li>
          <li>
            <strong>Typefout bij de afzender.</strong> Vraag de afzender je adres te controleren en de foutmelding
            die hij terugkreeg naar je door te sturen. Daarin staat precies waarom de mail is geweigerd.
          </li>
        </ul>
      </Stap>

      <Stap n={6} title="Is het je verbinding of de app?">
        <ul>
          <li>Werkt internet verder wel? Open een website. Zet vliegtuigmodus uit en wifi aan.</li>
          <li>Sluit de mail-app helemaal af en open hem opnieuw. Helpt dat niet, herstart je telefoon of computer.</li>
          <li>
            Zie je in de app een melding als &ldquo;Account kan niet worden geverifieerd&rdquo; of &ldquo;Kan geen
            verbinding maken met de server&rdquo;, dan ben je terug bij stap 2 en 3.
          </li>
        </ul>
      </Stap>

      <h2>Wat ik van je nodig heb als het niet lukt</h2>
      <p>App me met deze vier dingen, dan kan ik meestal binnen een kwartier op afstand meekijken en het oplossen:</p>
      <ul>
        <li>Op welk apparaat en in welk programma het misgaat (bijvoorbeeld iPhone Mail of Outlook op de laptop).</li>
        <li>Sinds wanneer, en of er iets veranderde: nieuw wachtwoord, nieuwe telefoon, ander netwerk.</li>
        <li>De foutmelding, het liefst als screenshot.</li>
        <li>Of webmail wél werkt (stap 1).</li>
      </ul>

      <h2>Hulp nodig?</h2>
      <p>
        App of bel me op <a href={`tel:${site.phone}`}>{site.phone.replace("+31", "0")}</a> of mail naar{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Lukt mailen niet, dan is appen de snelste weg.
      </p>
    </>
  );
}
