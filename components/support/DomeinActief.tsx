import { site } from "@/lib/site";

/** Artikel: hoe snel een nieuwe of verhuisde domeinnaam werkt, en waarom het soms even duurt. Zonder screenshots. */
export function DomeinActief() {
  return (
    <>
      <p>
        Het korte antwoord: een nieuwe domeinnaam is meestal binnen een uur actief, vaak al binnen een paar minuten.
        Verandert er iets aan een domeinnaam die al bestond, bijvoorbeeld omdat je hem naar mij verhuist, dan kan het
        tot een dag duren voordat iedereen de nieuwe situatie ziet. Hieronder lees je waarom, en hoe je zelf
        controleert of het werkt.
      </p>

      <h2>Wat er gebeurt na de registratie</h2>
      <p>
        Ik registreer de domeinnaam op jouw naam en koppel hem aan je website en je mailboxen. Dat doe ik dezelfde
        dag. Je krijgt een berichtje zodra het klaar is. Vanaf dat moment kun je je website openen en mail ontvangen
        op je nieuwe adres. Het slotje in de browser (https) komt vanzelf, meestal binnen een uur nadat de domeinnaam
        actief is.
      </p>

      <h2>Waarom het soms even duurt</h2>
      <p>
        Een domeinnaam werkt via DNS, het telefoonboek van internet. Als iemand jouwbedrijf.nl intypt, zoekt zijn
        internetprovider op welke server erbij hoort. Dat antwoord onthoudt de provider een tijdje, zodat hij het niet
        elke keer opnieuw hoeft op te vragen.
      </p>
      <ul>
        <li>
          <strong>Nieuwe domeinnaam:</strong> niemand heeft nog een oud antwoord onthouden, dus iedereen vraagt het
          vers op. Daarom werkt een nieuwe domeinnaam snel.
        </li>
        <li>
          <strong>Bestaande domeinnaam die verandert:</strong> providers die het oude antwoord nog hebben, blijven dat
          een tijd gebruiken. Meestal is dat een paar uur, in uitzonderlijke gevallen tot 24 uur. In die periode ziet
          de ene bezoeker al de nieuwe site en de andere nog de oude.
        </li>
      </ul>

      <h2>Bij mij werkt het nog niet, bij een ander wel</h2>
      <p>
        Dat is bijna altijd zo&rsquo;n onthouden antwoord, op je eigen apparaat of bij je provider. Zo controleer je
        of het echt aan de domeinnaam ligt of alleen aan jouw verbinding:
      </p>
      <ul>
        <li>
          Zet op je telefoon de wifi uit en open de site via 4G of 5G. Werkt het dan wel, dan ligt het aan je
          thuis- of kantoornetwerk en lost het zichzelf binnen een paar uur op.
        </li>
        <li>Open de site in een privévenster (incognito) van je browser. Dan tellen oude opgeslagen pagina&rsquo;s niet mee.</li>
        <li>Herstart je router. Die onthoudt ook antwoorden, en na een herstart vraagt hij alles opnieuw op.</li>
      </ul>
      <p>Lukt het na een dag nog niet op geen enkel apparaat? App me, dan kijk ik mee.</p>

      <h2>Verhuis je een bestaande domeinnaam naar mij?</h2>
      <p>
        Dan zet ik eerst je website en mailboxen bij mij klaar en verhuis ik daarna pas de domeinnaam. Zo blijven
        site en mail werken tijdens de overstap. De verhuizing zelf duurt bij een .nl-domein meestal een paar minuten
        nadat je huidige partij hem heeft vrijgegeven. Daarna geldt hetzelfde als hierboven: de meeste bezoekers zien
        binnen een paar uur de nieuwe situatie.
      </p>
      <p>
        Voor mail vraag ik je de eerste dag na de verhuizing nog even in je oude mailbox te kijken. Een enkele mail
        kan in die overgang nog op het oude adres binnenkomen.
      </p>

      <h2>Zelf controleren of alles werkt</h2>
      <ul>
        <li>Typ je domeinnaam in de browser, met en zonder www ervoor. Beide moeten je site tonen.</li>
        <li>Kijk of er een slotje voor het adres staat. Ontbreekt het na een uur nog, laat het me weten.</li>
        <li>
          Stuur vanaf een ander adres, bijvoorbeeld je privé-Gmail, een mail naar je nieuwe zakelijke adres en kijk of
          hij binnenkomt in <a href="/support/webmail">webmail</a>.
        </li>
        <li>Stuur vanuit je zakelijke adres een mail terug. Komt die aan, dan werkt verzenden ook.</li>
      </ul>

      <h2>Hulp nodig?</h2>
      <p>
        Twijfel je of iets klopt, app of bel me op <a href={`tel:${site.phone}`}>{site.phone.replace("+31", "0")}</a>{" "}
        of mail naar <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </>
  );
}
