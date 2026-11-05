import type { ReactNode } from "react";
import { site } from "@/lib/site";

function Kaart({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-5 rounded-2xl border border-line bg-panel px-5 py-4">
      <h3 className="!mt-0 !mb-2">{title}</h3>
      {children}
    </div>
  );
}

/** Artikel: back-up maken van laptop, pc en telefoon. Zonder screenshots. */
export function BackupMaken() {
  return (
    <>
      <p>
        Een laptop gaat kapot, wordt gestolen of je wist per ongeluk de verkeerde map. Met een back-up is dat een
        vervelende middag. Zonder back-up ben je je administratie, foto&rsquo;s en offertes kwijt. Een goede back-up
        kost één keer een half uur om in te stellen en draait daarna vanzelf. Zo pak je het aan.
      </p>

      <h2>De regel: twee plekken, waarvan één buiten de deur</h2>
      <p>
        Bewaar je bestanden op minstens twee plekken naast je laptop zelf. Eén daarvan staat ergens anders, in de
        cloud of bij iemand thuis. Een externe schijf in dezelfde tas als je laptop helpt niet bij diefstal of brand.
        De eenvoudigste combinatie voor een klein bedrijf is de ingebouwde back-up van je systeem naar een externe
        schijf, plus je werkmappen in de cloud.
      </p>

      <h2>Op een Mac</h2>
      <Kaart title="Time Machine naar een externe schijf">
        <p>
          Sluit een externe schijf aan, liefst twee keer zo groot als de opslag van je Mac. Ga naar
          Systeeminstellingen, Algemeen, Time Machine, en klik op Voeg reservekopieschijf toe. Kies de schijf en laat
          hem versleutelen. Daarna maakt je Mac elk uur een back-up zolang de schijf is aangesloten. Sluit hem minstens
          één keer per week aan.
        </p>
      </Kaart>
      <Kaart title="iCloud Drive voor Bureaublad en Documenten">
        <p>
          Ga naar Systeeminstellingen, klik op je naam, dan iCloud, dan Drive, en zet Mappen Bureaublad en Documenten
          aan. Alles in die twee mappen staat dan ook in de cloud en op je iPhone. De gratis 5 GB is snel vol; voor een
          paar euro per maand heb je 50 of 200 GB.
        </p>
      </Kaart>

      <h2>Op Windows</h2>
      <Kaart title="OneDrive voor je werkmappen">
        <p>
          Open de app Windows Back-up, of ga naar Instellingen, Accounts, Windows Back-up. Zet bij Mappen de mappen
          Bureaublad, Documenten en Afbeeldingen aan. Die gaan dan automatisch naar OneDrive. Met een Microsoft
          365-abonnement heb je 1 TB; zonder abonnement 5 GB.
        </p>
      </Kaart>
      <Kaart title="Bestandsgeschiedenis naar een externe schijf">
        <p>
          Sluit een externe schijf aan. Open het Configuratiescherm, kies Bestandsgeschiedenis en klik op Inschakelen.
          Windows bewaart dan versies van je bestanden op de schijf. Ook hier geldt: minstens één keer per week
          aansluiten.
        </p>
      </Kaart>

      <h2>Je telefoon</h2>
      <p>
        iPhone: Instellingen, je naam, iCloud, iCloud-reservekopie aan. Android: Instellingen, Google, Back-up aan.
        Foto&rsquo;s gaan apart via iCloud-foto&rsquo;s of Google Foto&rsquo;s. Zet dat ook aan, want juist foto&rsquo;s
        van je werk staan vaak alleen op je telefoon.
      </p>

      <h2>Je bedrijfsgegevens</h2>
      <ul>
        <li>
          <strong>Boekhouding en facturen</strong> in een online pakket staan al bij de leverancier. Download wel één
          keer per jaar een export, voor het geval je ooit overstapt.
        </li>
        <li>
          <strong>Mail</strong> staat op de server en blijft daar, ook als je laptop stuk is. Je stelt je mailbox
          gewoon opnieuw in op het nieuwe apparaat, zie{" "}
          <a href="/support/e-mail-instellingen">E-mailinstellingen: IMAP, POP3 en SMTP</a>.
        </li>
        <li>
          <strong>Je website</strong> host ik met dagelijkse back-ups. Daar hoef je zelf niets voor te doen.
        </li>
      </ul>

      <h2>Test het één keer</h2>
      <p>
        Een back-up die je nooit hebt getest, is een hoop. Zet een willekeurig bestand terug: in Time Machine of
        Bestandsgeschiedenis blader je naar gisteren en klik je op Herstel. Lukt dat, dan weet je dat het werkt. Doe
        dit na het instellen en daarna eens per half jaar.
      </p>

      <h2>Geen back-up en toch iets kwijt?</h2>
      <p>
        Per ongeluk gewiste bestanden kan ik vaak nog terughalen, zolang je de computer daarna zo min mogelijk
        gebruikt. Zet hem niet uit, installeer niets, en app me. Bij een schijf die fysiek kapot is, kan ik niets; dat
        is werk voor een gespecialiseerd lab. Zie ook <a href="/hulp">computer- en websitehulp</a>.
      </p>
      <p>
        Wil je dat ik de back-up één keer goed inricht en controleer, dan doe ik dat tijdens een{" "}
        <a href="/hulp">Computer APK</a>.
      </p>

      <h2>Hulp nodig?</h2>
      <p>
        App of bel me op <a href={`tel:${site.phone}`}>{site.phone.replace("+31", "0")}</a> of mail naar{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </>
  );
}
