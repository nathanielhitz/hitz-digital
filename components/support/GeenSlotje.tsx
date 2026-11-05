import { site } from "@/lib/site";

/** Artikel: geen slotje of een beveiligingswaarschuwing in de browser. Zonder screenshots. */
export function GeenSlotje() {
  return (
    <>
      <p>
        Het slotje voor het adres betekent dat de verbinding tussen jouw browser en de website versleuteld is.
        Niemand onderweg kan meelezen. Elke site die ik host heeft zo&rsquo;n certificaat en dat verlengt zichzelf
        automatisch. Zie je toch een waarschuwing, dan staat hieronder wat het betekent en wat je doet.
      </p>

      <h2>Eerst dit: Chrome toont geen slotje meer</h2>
      <p>
        Sinds 2023 laat Chrome bij een beveiligde site geen slotje meer zien, maar een klein icoon met schuifjes
        links van het adres. Klik je erop, dan staat er &ldquo;Verbinding is beveiligd&rdquo;. Dat is dus in orde.
        Safari, Firefox en Edge tonen nog wel een slotje. Alleen als er iets mis is, zie je in elke browser een
        duidelijke melding: &ldquo;Niet beveiligd&rdquo; naast het adres, of een hele pagina met een waarschuwing.
      </p>

      <h2>Je ziet &ldquo;Niet beveiligd&rdquo; of &ldquo;Je verbinding is niet privé&rdquo; op jouw eigen site</h2>
      <p>Dit zijn de drie oorzaken die ik in de praktijk tegenkom:</p>
      <ul>
        <li>
          <strong>De domeinnaam is net nieuw of verhuisd.</strong> Het certificaat wordt automatisch aangemaakt
          zodra de domeinnaam actief is, en dat kan tot een uur duren. Zie{" "}
          <a href="/support/domeinnaam-direct-actief">Is mijn nieuwe domeinnaam direct actief?</a>.
        </li>
        <li>
          <strong>Je gebruikt een oud adres.</strong> Een bladwijzer of link met een adres dat niet meer in gebruik is,
          bijvoorbeeld een oud subdomein, geeft een certificaatfout. Typ je domeinnaam zelf in.
        </li>
        <li>
          <strong>Er is echt iets mis met het certificaat.</strong> Dat hoort niet te gebeuren, maar als het zo is,
          wil ik het direct weten. App me een screenshot van de melding, dan los ik het op.
        </li>
      </ul>

      <h2>Je ziet een slotje met een waarschuwingsteken</h2>
      <p>
        De verbinding is dan wel versleuteld, maar één onderdeel van de pagina, meestal een afbeelding, wordt nog
        via een onbeveiligd adres geladen. Dat heet gemengde inhoud. Je ziet het vooral op oudere WordPress-sites na
        een verhuizing. Het is onschuldig voor jou als bezoeker, maar het oogt slordig. Laat het me weten, dan pas
        ik de links aan.
      </p>

      <h2>Je ziet de waarschuwing op álle sites</h2>
      <p>Dan ligt het aan je apparaat of je netwerk, niet aan de website.</p>
      <ul>
        <li>
          <strong>Openbare wifi.</strong> In een hotel, trein of café moet je vaak eerst akkoord gaan op een
          inlogpagina van de wifi. Tot die tijd geeft elke site een waarschuwing. Open een willekeurige site en volg
          de inlogpagina, of zet wifi uit en gebruik 4G of 5G.
        </li>
        <li>
          <strong>Datum en tijd staan verkeerd.</strong> Een certificaat is geldig tussen twee datums. Staat de klok
          van je computer of telefoon jaren verkeerd, dan lijkt elk certificaat verlopen. Zet de datum en tijd op
          automatisch.
        </li>
        <li>
          <strong>Antivirus of een beveiligingsprogramma kijkt mee.</strong> Sommige programma&rsquo;s onderscheppen
          beveiligde verbindingen om ze te scannen. Geeft je antivirus overal certificaatfouten, dan zet je die
          functie uit of app je me, dan kijk ik mee.
        </li>
      </ul>

      <h2>Je mailprogramma klaagt over een certificaat</h2>
      <p>
        Dat is een ander verhaal: dan staat bijna altijd je eigen domeinnaam ingevuld als mailserver in plaats van{" "}
        <code>mail.zxcs.nl</code>. Zie <a href="/support/e-mail-instellingen">E-mailinstellingen: IMAP, POP3 en SMTP</a>.
      </p>

      <h2>Goed om te weten</h2>
      <ul>
        <li>
          <strong>Klik een waarschuwing niet weg</strong> op een site waar je inlogt of betaalt. Op je eigen site mag
          je doorklikken om te kijken, maar app me daarna.
        </li>
        <li>
          <strong>Een slotje zegt niets over wie de site is.</strong> Ook een nepsite kan een geldig certificaat hebben.
          Het slotje betekent alleen dat niemand kan meelezen, niet dat de afzender betrouwbaar is.
        </li>
        <li>
          <strong>Zelf controleren:</strong> klik op het slotje of het icoon voor het adres. Daar staat of de verbinding
          beveiligd is en tot wanneer het certificaat geldig is.
        </li>
      </ul>

      <h2>Hulp nodig?</h2>
      <p>
        App of bel me op <a href={`tel:${site.phone}`}>{site.phone.replace("+31", "0")}</a> of mail naar{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Een screenshot van de melding helpt me het snelst op
        weg.
      </p>
    </>
  );
}
