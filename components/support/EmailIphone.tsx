import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Screenshot } from "@/components/support/Screenshot";

const server = "mail.zxcs.nl";
const img = (name: string) => `/support/iphone/${name}`;

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="my-8 border-t border-line pt-7">
      <h2 className="!mt-0 flex items-baseline gap-3">
        <span className="font-mono text-[14px] font-normal text-accent-bright">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Artikel: zakelijke mailbox instellen op iPhone/iPad (Apple Mail, iOS 26). */
export function EmailIphone() {
  return (
    <>
      <p>
        Zo zet je je zakelijke mailbox in de Mail-app van je iPhone of iPad. Het duurt een paar minuten. Houd je
        e-mailadres en het wachtwoord van je mailbox bij de hand. De schermen hieronder zijn van iOS 26; op een oudere
        iOS zien ze er iets anders uit, maar de stappen zijn hetzelfde.
      </p>

      <div className="my-6 rounded-2xl border border-line bg-panel p-5 text-[14.5px]">
        <div className="mb-2 font-display font-semibold text-ink">Wat je invult</div>
        <ul className="!mb-0 grid grid-cols-1 gap-x-8 gap-y-1 min-[600px]:grid-cols-2">
          <li>
            Hostnaam (inkomend én uitgaand): <code className="font-mono text-ink">{server}</code>
          </li>
          <li>
            Gebruikersnaam: <code className="font-mono text-ink">jij@jouwbedrijf.nl</code>
          </li>
          <li>Type: IMAP</li>
          <li>Wachtwoord: van je mailbox</li>
        </ul>
      </div>

      <Step n={1} title="Open Instellingen › Apps › Mail">
        <p>
          Open <strong>Instellingen</strong>, tik op <strong>Apps</strong> en dan op <strong>Mail</strong>. Tik bovenin op{" "}
          <strong>Mail-accounts</strong>.
        </p>
        <Screenshot src={img("01-instellingen-mail")} alt="Instellingen › Apps › Mail, met de regel Mail-accounts" />
      </Step>

      <Step n={2} title="Nieuwe account">
        <p>
          Onder je bestaande accounts staat <strong>Nieuwe account</strong>. Tik daarop.
        </p>
        <Screenshot src={img("02-mail-accounts")} alt="Mail-accounts › Nieuwe account" />
      </Step>

      <Step n={3} title="Kies uit een lijst">
        <p>
          Je iPhone vraagt om je e-mailadres. Vul dat <strong>niet</strong> hier in, maar tik op de blauwe link{" "}
          <strong>kies uit een lijst</strong>. Zo kun je straks zelf de servers opgeven.
        </p>
        <Screenshot src={img("03-nieuwe-account")} alt="Nieuwe account: 'Voer je e-mailadres in' met de link 'kies uit een lijst'" />
      </Step>

      <Step n={4} title="Voeg andere account toe">
        <p>
          Je ziet iCloud, Microsoft Exchange, Google, Yahoo, Aol en Outlook.com. Kies onderaan{" "}
          <strong>Voeg andere account toe…</strong>
        </p>
        <Screenshot src={img("04-kies-aanbieder")} alt="Kies je aanbieder, onderaan 'Voeg andere account toe…'" />
      </Step>

      <Step n={5} title="Mail-account">
        <p>
          De lijst klapt uit. Tik op <strong>Mail-account</strong> (de andere opties, CalDAV en CardDAV, zijn voor
          agenda&rsquo;s en contacten).
        </p>
        <Screenshot src={img("05-mail-account")} alt="Uitgeklapte lijst met de optie Mail-account" />
      </Step>

      <Step n={6} title="Vul je gegevens in">
        <ul>
          <li>
            <strong>Naam</strong>: je eigen naam of je bedrijfsnaam. Dit zien ontvangers als afzender.
          </li>
          <li>
            <strong>E-mail</strong>: je volledige e-mailadres.
          </li>
          <li>
            <strong>Wachtwoord</strong>: het wachtwoord van je mailbox.
          </li>
          <li>
            <strong>Beschrijving</strong>: bijvoorbeeld &ldquo;Werk&rdquo;. Alleen voor jezelf, om accounts uit elkaar te
            houden.
          </li>
        </ul>
        <p>
          Tik rechtsboven op <strong>Volgende</strong>.
        </p>
        <Screenshot src={img("06-gegevens")} alt="Nieuw: Naam, E-mail, Wachtwoord, Beschrijving" />
      </Step>

      <Step n={7} title="Servers invullen">
        <p>
          Kun je bovenaan kiezen tussen IMAP en POP, kies dan <strong>IMAP</strong>. Vul daarna bij zowel{" "}
          <strong>Server inkomende post</strong> als <strong>Server uitgaande post</strong> hetzelfde in:
        </p>
        <ul>
          <li>
            <strong>Hostnaam</strong>: <code className="font-mono text-ink">{server}</code>
          </li>
          <li>
            <strong>Gebruikersnaam</strong>: je volledige e-mailadres
          </li>
          <li>
            <strong>Wachtwoord</strong>: het wachtwoord van je mailbox
          </li>
        </ul>
        <p>
          Vul bij uitgaande post gebruikersnaam en wachtwoord óók in, anders kun je straks wel ontvangen maar niet
          verzenden. Tik op <strong>Volgende</strong>. Je iPhone controleert de gegevens; dat kan een minuut duren. Laat
          daarna <strong>Mail</strong> aan staan en tik op <strong>Bewaar</strong>. Klaar: open de Mail-app en je
          nieuwe mailbox staat in de lijst.
        </p>
        <Screenshot
          src={img("07-servers")}
          alt="Server inkomende en uitgaande post: hostnaam mail.zxcs.nl, gebruikersnaam je e-mailadres"
        />
      </Step>

      <h2>Lukt het niet?</h2>
      <ul>
        <li>
          <strong>&ldquo;Kan geen verbinding maken met de server&rdquo;</strong>: controleer of de hostnaam precies{" "}
          <code className="font-mono text-ink">{server}</code> is (niet je eigen domein) en of het wachtwoord klopt.
          Hoofdletters tellen.
        </li>
        <li>
          <strong>Ontvangen werkt, verzenden niet</strong>: ga naar Instellingen › Apps › Mail › Mail-accounts › je
          account › <strong>SMTP</strong> › {server}. Zet <strong>Gebruik SSL</strong> aan, identiteitscontrole op{" "}
          <strong>Wachtwoord</strong>, serverpoort <strong>465</strong>, en vul gebruikersnaam en wachtwoord in.
        </li>
        <li>
          <strong>Inkomende mail controleren</strong>: in hetzelfde account-scherm bij <strong>Geavanceerd</strong>:
          Gebruik SSL aan, serverpoort <strong>993</strong>.
        </li>
        <li>
          Alle poorten en instellingen op een rij staan in{" "}
          <a href="/support/e-mail-instellingen">E-mailinstellingen: IMAP, POP3 en SMTP</a>.
        </li>
      </ul>

      <h2>Hulp nodig?</h2>
      <p>
        Kom je er niet uit, dan kijk ik op afstand mee; meestal is het binnen een kwartier geregeld. App of bel me op{" "}
        <a href={`tel:${site.phone}`}>{site.phone.replace("+31", "0")}</a> of mail naar{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </>
  );
}
