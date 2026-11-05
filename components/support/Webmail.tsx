import { site } from "@/lib/site";
import { Screenshot } from "@/components/support/Screenshot";

const url = "https://mail.zxcs.nl";
const img = (name: string) => `/support/webmail/${name}`;
const W = 760;

/** Artikel: webmail (Roundcube op mail.zxcs.nl) voor mailboxen die HitzDigital host. */
export function Webmail() {
  return (
    <>
      <p>
        Webmail is je mailbox in de browser. Handig op een andere computer, op vakantie, of als je mailprogramma even
        hapert. Alles wat je in webmail doet, zie je ook op je telefoon en in Outlook, want je mail staat op de server.
      </p>

      <h2>Inloggen</h2>
      <p>
        Ga naar <a href={url}>{url}</a>. Vul bij Gebruikersnaam je volledige e-mailadres in, bijvoorbeeld{" "}
        <code>jij@jouwbedrijf.nl</code>, en daaronder het wachtwoord van je mailbox. Zet de pagina in je favorieten, dan
        hoef je het adres niet te onthouden.
      </p>
      <Screenshot src={img("01-inloggen")} alt="De inlogpagina van webmail met de velden Gebruikersnaam en Wachtwoord" width={W} frame="desktop" />
      <p>
        Let op het adres: het is <code>mail.zxcs.nl</code>, niet je eigen domeinnaam. Wachtwoord kwijt? App me, dan
        stel ik een nieuwe in.
      </p>

      <h2>Je weg vinden</h2>
      <p>
        Helemaal links staan de hoofdknoppen: Opstellen voor een nieuw bericht, E-mail, Contactpersonen, Kalender en
        Instellingen. Daarnaast je mappen: Postvak In, Spam, Concepten, Verzonden, Prullenbak en Archive. Bovenin staat
        een zoekveld dat door onderwerp en afzender zoekt. Linksonder zie je hoe vol je mailbox is.
      </p>
      <Screenshot src={img("02-overzicht")} alt="Het overzicht van webmail met de hoofdknoppen links en de mappen ernaast" width={W} frame="desktop" />
      <p>Vind je het scherm te donker? Linksonder staat de knop Lichte modus.</p>

      <h2>Handtekening instellen</h2>
      <p>
        Ga naar Instellingen, dan Identiteiten, en klik op je e-mailadres. Vul bij Weergavenaam je naam of
        bedrijfsnaam in: die ziet de ontvanger als afzender. Onder Ondertekening typ je je handtekening, bijvoorbeeld
        je naam, bedrijf en telefoonnummer. Klik op Opslaan.
      </p>
      <Screenshot src={img("04-identiteiten")} alt="Instellingen, Identiteiten: de velden Weergavenaam en Ondertekening en de knop Opslaan" width={W} frame="desktop" />
      <p>
        Deze handtekening geldt alleen in webmail. Outlook en de Mail-app op je telefoon hebben hun eigen
        handtekening.
      </p>

      <h2>Wachtwoord wijzigen</h2>
      <p>
        Ga naar Instellingen, dan Wachtwoord. Vul je huidige wachtwoord in en twee keer het nieuwe. Daarna moet je het
        nieuwe wachtwoord ook invullen op je telefoon en in Outlook, anders krijg je daar de melding dat inloggen is
        mislukt.
      </p>
      <Screenshot src={img("03-instellingen")} alt="Het menu Instellingen met onder meer Identiteiten, Filters, Wachtwoord en Twee-factor-authenticatie" width={W} frame="desktop" />

      <h2>Extra beveiliging: twee-factor-authenticatie</h2>
      <p>
        Wil je dat inloggen op webmail behalve je wachtwoord ook een code vraagt? Ga naar Instellingen, dan
        Twee-factor-authenticatie, en kies bij Mobiele app voor Schakel in. Je scant een QR-code met een app als Google
        Authenticator of de wachtwoord-app van je telefoon. Daarna vraagt webmail bij elke login om de code uit die app.
      </p>
      <Screenshot src={img("05-twee-factor")} alt="Instellingen, Twee-factor-authenticatie: de keuze tussen Mobiele app, E-mail en Yubikey" width={W} frame="desktop" />
      <p>
        Dit geldt alleen voor webmail. Je telefoon en Outlook blijven gewoon werken met je wachtwoord. Raak je de app
        kwijt, app me dan, dan zet ik het voor je uit.
      </p>

      <h2>Afwezigheidsbericht</h2>
      <p>
        Een automatisch antwoord tijdens je vakantie zit in deze webmail verstopt onder Instellingen, Filters. Dat is
        omslachtig. Stuur me een appje met je tekst en de datums, dan zet ik het voor je aan en na je vakantie weer
        uit.
      </p>

      <h2>Uitloggen</h2>
      <p>
        Werk je op een computer die niet van jou is, klik dan na afloop linksonder op Uitloggen. Anders blijft je
        mailbox open staan voor de volgende gebruiker.
      </p>

      <h2>Goed om te weten</h2>
      <ul>
        <li>
          <strong>Verwijderen is overal verwijderen.</strong> Gooi je een bericht weg in webmail, dan is het ook weg op
          je telefoon en in Outlook. Het staat nog in de Prullenbak tot je die leegt.
        </li>
        <li>
          <strong>Mis je een mail?</strong> Kijk in de map Spam. Staat hij daar, sleep hem naar Postvak In.
        </li>
        <li>
          <strong>Mailbox vol?</strong> Een mailbox is 2 GB. Loopt hij vol, dan komt nieuwe mail niet meer binnen.
          Leeg de Prullenbak en de map Spam, verwijder oude mails met grote bijlagen, of neem een grotere mailbox bij
          mij.
        </li>
        <li>
          <strong>Webmail vervangt je mailprogramma niet.</strong> Voor dagelijks gebruik is Outlook of de Mail-app op
          je telefoon fijner. Hoe je die instelt staat in{" "}
          <a href="/support/e-mail-instellingen">E-mailinstellingen: IMAP, POP3 en SMTP</a>.
        </li>
      </ul>

      <h2>Hulp nodig?</h2>
      <p>
        Lukt inloggen niet, dan kijk ik op afstand mee. App of bel me op{" "}
        <a href={`tel:${site.phone}`}>{site.phone.replace("+31", "0")}</a> of mail naar{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </>
  );
}
