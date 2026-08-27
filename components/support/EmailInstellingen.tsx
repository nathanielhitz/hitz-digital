import { site } from "@/lib/site";

type Row = { label: string; value: string; note?: string; recommended?: boolean };

function SettingsTable({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="border-b border-line px-5 py-3 font-display text-[15px] font-semibold text-ink">{title}</div>
      <table className="w-full text-[14.5px]">
        <tbody className="divide-y divide-line2">
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row" className="w-[38%] px-5 py-3 text-left font-normal text-muted align-top">
                {r.label}
              </th>
              <td className="px-5 py-3 align-top">
                <code className="font-mono text-[13.5px] text-ink">{r.value}</code>
                {r.recommended && (
                  <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-bright">
                    aanbevolen
                  </span>
                )}
                {r.note && <div className="mt-1 text-[13px] text-faint">{r.note}</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Artikel: e-mail instellen (IMAP/POP3/SMTP) voor mailboxen die HitzDigital host. */
export function EmailInstellingen() {
  return (
    <>
      <p>
        Host ik je zakelijke mailbox, dan kun je die in elk mailprogramma gebruiken: op je telefoon, in Outlook, Apple
        Mail, Thunderbird of Gmail. Hieronder staan alle instellingen die je daarvoor nodig hebt. Kom je er niet uit? App
        me even, dan stel ik het samen met je in.
      </p>
      <p>
        Liever stap voor stap met plaatjes? Zie <a href="/support/e-mail-instellen-iphone">E-mail instellen op iPhone of iPad</a>.
      </p>

      <h2>De korte versie</h2>
      <SettingsTable
        title="Algemeen"
        rows={[
          { label: "Gebruikersnaam", value: "jij@jouwbedrijf.nl", note: "Altijd je volledige e-mailadres." },
          { label: "Wachtwoord", value: "het wachtwoord van je mailbox", note: "Heb je dat niet meer? Ik stel een nieuwe voor je in." },
          { label: "Server (inkomend én uitgaand)", value: "mail.zxcs.nl", note: "Let op: niet je eigen domeinnaam, maar precies deze servernaam." },
          { label: "Type account", value: "IMAP", recommended: true, note: "Mail blijft op de server en is op al je apparaten hetzelfde." },
        ]}
      />

      <h2>Inkomende mail: IMAP of POP3?</h2>
      <p>
        <strong>IMAP</strong> laat je mail op de server staan. Lees je iets op je telefoon, dan staat het ook als gelezen
        op je laptop. Dit is wat je in vrijwel alle gevallen wilt. <strong>POP3</strong> haalt mail van de server naar
        één apparaat en verwijdert het daar (meestal) na een tijdje. Alleen handig als je bewust op één computer wilt
        werken en de mailbox klein wilt houden.
      </p>
      <SettingsTable
        title="IMAP (inkomend)"
        rows={[
          { label: "Server", value: "mail.zxcs.nl" },
          { label: "Poort", value: "993", recommended: true, note: "Versleuteld via SSL/TLS." },
          { label: "Poort (onversleuteld)", value: "143", note: "Alleen als het echt niet anders kan; wordt afgeraden." },
          { label: "Beveiliging", value: "SSL/TLS" },
          { label: "Verificatie", value: "Normaal wachtwoord" },
        ]}
      />
      <SettingsTable
        title="POP3 (inkomend)"
        rows={[
          { label: "Server", value: "mail.zxcs.nl" },
          { label: "Poort", value: "995", recommended: true, note: "Versleuteld via SSL/TLS." },
          { label: "Poort (onversleuteld)", value: "110", note: "Wordt afgeraden." },
          { label: "Beveiliging", value: "SSL/TLS" },
          { label: "Verificatie", value: "Normaal wachtwoord" },
        ]}
      />

      <h2>Uitgaande mail: SMTP</h2>
      <p>
        Verzenden gaat via SMTP. Zet <strong>verificatie aan</strong> en gebruik dezelfde gebruikersnaam en hetzelfde
        wachtwoord als voor inkomende mail. Zonder verificatie weigert de server je mail te versturen.
      </p>
      <SettingsTable
        title="SMTP (uitgaand)"
        rows={[
          { label: "Server", value: "mail.zxcs.nl" },
          { label: "Poort", value: "465", recommended: true, note: "Versleuteld via SSL/TLS." },
          { label: "Poort (alternatief)", value: "587", note: "Versleuteld via STARTTLS. Gebruik deze als 465 bij jou niet werkt, bijvoorbeeld op een bedrijfsnetwerk." },
          { label: "Poort (onversleuteld)", value: "25", note: "Wordt afgeraden en door veel providers geblokkeerd." },
          { label: "Beveiliging", value: "SSL/TLS (465) of STARTTLS (587)" },
          { label: "Verificatie", value: "Aan, met je volledige e-mailadres en wachtwoord" },
        ]}
      />

      <h2>Webmail</h2>
      <p>
        Wil je snel even je mail bekijken zonder iets in te stellen? Ga naar{" "}
        <code className="font-mono text-[14px] text-ink">https://mail.zxcs.nl</code> en log in met je e-mailadres
        en wachtwoord.
      </p>

      <h2>Goed om te weten</h2>
      <ul>
        <li>
          <strong>Kies altijd de versleutelde poort</strong> (993, 995, 465 of 587). Je verbinding met de mailserver is
          dan versleuteld.
        </li>
        <li>
          <strong>Gmail-app of Gmail op het web</strong>: je kunt je zakelijke mailbox toevoegen als extern account. Gmail
          ondersteunt sinds januari 2026 geen POP3 meer voor externe accounts; gebruik in de Gmail-app op je telefoon
          daarom de optie &ldquo;Overig (IMAP)&rdquo;.
        </li>
        <li>
          <strong>Certificaatwaarschuwing?</strong> Controleer dan of je als server echt <code>mail.zxcs.nl</code> hebt
          ingevuld en niet <code>mail.jouwbedrijf.nl</code> of alleen <code>jouwbedrijf.nl</code>. Sommige
          mailprogramma&rsquo;s vullen automatisch je eigen domein in; overschrijf dat.
        </li>
        <li>
          <strong>Verzenden lukt niet, ontvangen wel?</strong> Bijna altijd staat de SMTP-verificatie uit of is de poort
          25. Zet verificatie aan en kies poort 465 of 587.
        </li>
      </ul>

      <h2>Hulp nodig?</h2>
      <p>
        Lukt het instellen niet, dan kijk ik op afstand mee en is het meestal binnen een kwartier geregeld. App of bel me
        op <a href={`tel:${site.phone}`}>{site.phone.replace("+31", "0")}</a> of mail naar{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </>
  );
}
