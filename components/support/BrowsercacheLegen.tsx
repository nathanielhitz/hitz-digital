import type { ReactNode } from "react";
import { site } from "@/lib/site";

function Browser({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-5 rounded-2xl border border-line bg-panel px-5 py-4">
      <h3 className="!mt-0 !mb-2">{title}</h3>
      {children}
    </div>
  );
}

/** Artikel: browsercache legen als een wijziging aan de site niet zichtbaar is. Zonder screenshots. */
export function BrowsercacheLegen() {
  return (
    <>
      <p>
        Je browser bewaart een kopie van pagina&rsquo;s die je eerder bezocht, zodat ze de volgende keer sneller laden.
        Dat heet de cache. Is je website net aangepast, dan laat je browser soms nog die oude kopie zien. Je ziet dan
        de oude tekst of het oude logo, terwijl een ander de nieuwe versie al ziet. Zo los je dat op.
      </p>

      <h2>Eerst de snelle test</h2>
      <ul>
        <li>
          <strong>Open de site in een privévenster.</strong> In Chrome en Edge heet dat Incognito of InPrivate
          (Ctrl+Shift+N op Windows, ⌘+Shift+N op Mac), in Safari en Firefox een privévenster (⌘+Shift+N of
          Ctrl+Shift+P). Zie je daar wél de nieuwe versie, dan zit het in je cache en helpt een van de stappen
          hieronder.
        </li>
        <li>
          <strong>Vernieuw de pagina hard.</strong> Op Windows: Ctrl+F5 of Ctrl+Shift+R. Op Mac in Chrome, Edge en
          Firefox: ⌘+Shift+R. In Safari op Mac: ⌥+⌘+R. De browser haalt dan alles opnieuw op voor deze ene pagina.
        </li>
      </ul>
      <p>Helpt dat al, dan ben je klaar. Zo niet, leeg dan de cache van je browser.</p>

      <h2>Cache legen op de computer</h2>
      <p>
        De sneltoets Ctrl+Shift+Delete (Windows) of ⌘+Shift+Delete (Mac) opent in Chrome, Edge en Firefox direct het
        juiste venster. Kies daar alleen de cache, niet je wachtwoorden of cookies, anders ben je overal uitgelogd.
      </p>

      <Browser title="Chrome">
        <p>
          Klik rechtsboven op de drie puntjes, kies Browsegegevens verwijderen. Zet de periode op Alle tijden, vink
          alleen <strong>Gecachte afbeeldingen en bestanden</strong> aan en klik op Gegevens verwijderen.
        </p>
      </Browser>
      <Browser title="Edge">
        <p>
          Klik rechtsboven op de drie puntjes, kies Instellingen, dan Privacy, zoeken en services. Bij Browsegegevens
          wissen klik je op Kies wat u wilt wissen. Vink alleen <strong>Afbeeldingen en bestanden in cache</strong>{" "}
          aan en klik op Nu wissen.
        </p>
      </Browser>
      <Browser title="Safari op Mac">
        <p>
          Houd de Option-toets (⌥) ingedrukt en open het menu Weergave. Kies{" "}
          <strong>Herlaad pagina vanaf oorsprong</strong>. Dat is dezelfde actie als ⌥+⌘+R en lost het in vrijwel
          alle gevallen op. Werkt dat niet, kies dan in het menu Safari voor Wis geschiedenis en de periode Het
          laatste uur. Let op: daarmee verwijder je ook cookies uit dat uur, dus je bent mogelijk ergens uitgelogd.
        </p>
      </Browser>
      <Browser title="Firefox">
        <p>
          Klik rechtsboven op de drie streepjes, kies Instellingen, dan Privacy &amp; Beveiliging. Bij Cookies en
          websitegegevens klik je op Gegevens wissen. Vink alleen{" "}
          <strong>Tijdelijk in cache opgeslagen webinhoud</strong> aan en klik op Wissen.
        </p>
      </Browser>

      <h2>Cache legen op je telefoon</h2>
      <Browser title="iPhone en iPad (Safari)">
        <p>
          Probeer eerst een privétabblad: tik in Safari op het tabbladen-icoon, dan op Privé. Zie je daar de nieuwe
          versie, dan ga je naar Instellingen, Apps, Safari, en tik je op{" "}
          <strong>Wis geschiedenis en websitegegevens</strong>. Daarmee ben je wel uitgelogd op sites waar je was
          ingelogd.
        </p>
      </Browser>
      <Browser title="Android (Chrome)">
        <p>
          Tik rechtsboven op de drie puntjes, kies Browsegegevens verwijderen. Zet de periode op Alle tijden, vink
          alleen <strong>Gecachte afbeeldingen en bestanden</strong> aan en tik op Gegevens verwijderen.
        </p>
      </Browser>
      <p>
        De namen van menu&rsquo;s verschillen per versie een beetje. Zoek naar het woord cache of browsegegevens, dan
        zit je goed.
      </p>

      <h2>Zie je daarna nog steeds de oude versie?</h2>
      <ul>
        <li>
          Is de domeinnaam net nieuw of verhuisd? Dan kan het aan DNS liggen, zie{" "}
          <a href="/support/domeinnaam-direct-actief">Is mijn nieuwe domeinnaam direct actief?</a>.
        </li>
        <li>
          Controleer of je naar het juiste adres kijkt, met en zonder www en met https ervoor. Een oude bladwijzer wijst
          soms naar een adres dat niet meer in gebruik is.
        </li>
        <li>Staat de wijziging wel al live? App me even, dan kijk ik of alles is doorgevoerd.</li>
      </ul>

      <h2>Hulp nodig?</h2>
      <p>
        App of bel me op <a href={`tel:${site.phone}`}>{site.phone.replace("+31", "0")}</a> of mail naar{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Op afstand meekijken is meestal in een paar minuten
        gebeurd.
      </p>
    </>
  );
}
