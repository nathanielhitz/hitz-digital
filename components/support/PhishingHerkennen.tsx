import { site } from "@/lib/site";

/** Artikel: valse mail en berichten herkennen, gericht op ondernemers. Zonder screenshots. */
export function PhishingHerkennen() {
  return (
    <>
      <p>
        Valse mails zien er tegenwoordig echt uit: goed Nederlands, het juiste logo, soms zelfs je eigen naam en
        bedrijfsnaam erin. Toch verraden ze zich bijna altijd op dezelfde punten. Hieronder staat waar je op let, welke
        trucs ondernemers het vaakst tegenkomen, en wat je doet als je toch hebt geklikt.
      </p>

      <h2>Vijf controles voordat je klikt</h2>
      <ul>
        <li>
          <strong>Kijk naar het echte afzenderadres,</strong> niet naar de naam. Tik of klik op de afzender zodat het
          volledige adres zichtbaar wordt. &ldquo;Rabobank&rdquo; met als adres iets@rabo-klantenservice.net is nep.
          Let op kleine verschillen: een extra letter, een streepje, .net in plaats van .nl.
        </li>
        <li>
          <strong>Kijk waar een link echt heen gaat.</strong> Op de computer houd je je muis stil op de link zonder te
          klikken; linksonder of in een ballonnetje zie je het adres. Op je telefoon houd je de link even ingedrukt.
          Klopt het domein niet met de afzender, klik dan niet.
        </li>
        <li>
          <strong>Haast en dreiging.</strong> &ldquo;Binnen 24 uur&rdquo;, &ldquo;je account wordt geblokkeerd&rdquo;,
          &ldquo;laatste herinnering&rdquo;. Echte organisaties zetten je zelden onder tijdsdruk per mail.
        </li>
        <li>
          <strong>Er wordt om inloggegevens of een betaling gevraagd.</strong> Via een link inloggen om iets te
          &ldquo;bevestigen&rdquo;, een wachtwoord opnieuw instellen dat je niet hebt aangevraagd, of een betaling
          naar een nieuw rekeningnummer. Doe het nooit vanuit de mail. Ga zelf naar de site of bel.
        </li>
        <li>
          <strong>Een bijlage die je niet verwachtte.</strong> Zeker een zip-bestand, een factuur van een onbekende, of
          een document dat vraagt om &ldquo;inhoud in te schakelen&rdquo;. Open hem niet.
        </li>
      </ul>

      <h2>De trucs die ondernemers het vaakst krijgen</h2>
      <ul>
        <li>
          <strong>&ldquo;Je domeinnaam verloopt&rdquo; of een factuur voor domeinverlenging</strong> van een partij
          die je niet kent. Die mails lijken officieel en noemen je echte domeinnaam, die staat immers openbaar in
          het register. Betaal niet. Je domein loopt via mij en ik regel de verlenging.
        </li>
        <li>
          <strong>&ldquo;Je mailbox is vol&rdquo; of &ldquo;je wachtwoord verloopt vandaag&rdquo;</strong> met een
          knop om in te loggen. Zo stelen ze je mailwachtwoord. Twijfel je of je mailbox echt vol is? Kijk zelf in{" "}
          <a href="/support/webmail">webmail</a>, daar staat linksonder hoe vol hij is.
        </li>
        <li>
          <strong>Factuurfraude.</strong> Een mail van een leverancier, of van &ldquo;de directeur&rdquo;, dat het
          rekeningnummer is gewijzigd of dat er met spoed betaald moet worden. Bel altijd even op het nummer dat je al
          had, niet het nummer uit de mail.
        </li>
        <li>
          <strong>Gedeeld document.</strong> &ldquo;Iemand heeft een bestand met je gedeeld&rdquo; via OneDrive, Google
          Drive of DocuSign, met een inlogpagina erachter. Verwacht je niets, dan is het nep.
        </li>
        <li>
          <strong>Bedreigingen over je website.</strong> &ldquo;We hebben je site gehackt, betaal in bitcoin.&rdquo;
          Bijna altijd bluf. Stuur het naar mij door, dan controleer ik je site.
        </li>
        <li>
          <strong>WhatsApp en sms.</strong> &ldquo;Hoi, dit is mijn nieuwe nummer&rdquo;, een pakketje dat niet bezorgd
          kon worden, een boete of een bericht van &ldquo;je bank&rdquo;. Zelfde regels: niet klikken, zelf contact
          opnemen via een nummer dat je al kende.
        </li>
      </ul>

      <h2>Zo weet je dat een bericht van mij echt is</h2>
      <p>
        Mail over je website, domein, hosting of mailbox komt van <code>{site.email}</code>, of je krijgt een appje
        van mijn nummer. Ik vraag nooit per mail om je wachtwoord en stuur geen betaallinks. Twijfel je, stuur het
        bericht naar me door of app me een screenshot. Ik zeg je dezelfde dag of het echt is.
      </p>

      <h2>Toch geklikt of ingelogd?</h2>
      <ul>
        <li>
          <strong>Wachtwoord direct wijzigen</strong> op de echte site. Ging het om je mailbox, zie{" "}
          <a href="/support/webmail">Webmail: je mail in de browser</a>. Gebruikte je datzelfde wachtwoord ook ergens
          anders, wijzig het daar ook.
        </li>
        <li>
          <strong>Heb je betaald?</strong> Bel je bank. Hoe sneller, hoe groter de kans dat de betaling nog tegen te
          houden is.
        </li>
        <li>
          <strong>Heb je een bijlage geopend?</strong> Zet de computer niet uit, maar koppel hem los van wifi en
          netwerk en app me. Dan kijk ik mee voordat er meer gebeurt.
        </li>
        <li>
          <strong>Meld het.</strong> Valse mails kun je doorsturen naar de Fraudehelpdesk via{" "}
          <a href="mailto:valse-email@fraudehelpdesk.nl">valse-email@fraudehelpdesk.nl</a>. Nep-mails uit naam van je
          bank stuur je door naar je bank; die hebben daar een eigen adres voor.
        </li>
      </ul>

      <h2>Voorkomen</h2>
      <ul>
        <li>
          <strong>Tweestapsverificatie</strong> aanzetten op je mail, je bank en je belangrijkste accounts. Dan heeft
          een gestolen wachtwoord alleen weinig waarde. Voor webmail staat het in{" "}
          <a href="/support/webmail">Webmail: je mail in de browser</a>.
        </li>
        <li>
          <strong>Per site een ander wachtwoord,</strong> bewaard in een wachtwoordmanager. Die vult alleen in op de
          echte site, en weigert op een nepsite. Dat is een goede extra controle.
        </li>
        <li>
          <strong>Updates installeren</strong> op je computer, telefoon en browser. Veel valse bijlagen maken misbruik
          van gaten die allang gedicht zijn.
        </li>
      </ul>
      <p>
        Wil je dit één keer goed laten inrichten, dan doe ik dat tijdens een{" "}
        <a href="/hulp">Computer APK</a>: updates, virusscan, back-up en wachtwoorden met
        tweestapsverificatie.
      </p>

      <h2>Hulp nodig?</h2>
      <p>
        Twijfel je over een bericht, app me een screenshot op{" "}
        <a href={`tel:${site.phone}`}>{site.phone.replace("+31", "0")}</a> of stuur het door naar{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </>
  );
}
