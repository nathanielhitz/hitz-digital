/** Werk-teksten per slug. Sleutels moeten overeenkomen met `work` en `cases` in lib/work.ts (TypeScript bewaakt dat via WorkSlug/CaseSlug in Task 12). */
export const work = {
  items: {
    "volmer-techniek": { meta: "Metaalbewerking · Puttershoek", alt: "Website van Volmer Techniek op mobiel" },
    "mourits-schilderwerken": { meta: "Schildersbedrijf · Klaaswaal", alt: "Website van Mourits Schilderwerken op mobiel" },
    "monster-zorg": { meta: "Zzp-zorgverlener · Gouda", alt: "Website van Monster Zorg op mobiel" },
    "youniek-art": { meta: "Fotografie portfolio", alt: "Website van Youniek Art op mobiel" },
    lesbosreizen: { meta: "Reisinformatie over Lesbos", alt: "Website van LesbosReizen op mobiel" },
    "cafe-centrum": { meta: "Lokaal café · Hoeksche Waard", alt: "Demo-website voor Café 't Centrum op mobiel" },
    opgietingen: { meta: "Agenda voor opgiet-evenementen", alt: "Opgietingen.nl op mobiel" },
    festivaldiscounter: { meta: "Festivaltickets vergelijken", alt: "Festivaldiscounter op mobiel" },
  },
  cases: {
    "volmer-techniek": {
      branche: "Metaalbewerking",
      intro: "Een tweetalige website voor een verspanend bedrijf dat op locatie en in de eigen werkplaats werkt, met offerteformulier, projectgalerij en servicegebied.",
      situatie: "Volmer Techniek B.V. uit Puttershoek verspaant, repareert en bouwt machines, op locatie bij de klant en in de eigen werkplaats. De oude website was een standaard WordPress-site met een kant-en-klaar thema. Voor een bedrijf dat ook buiten Nederland werkt, moest de site in twee talen kunnen en de zes disciplines helder naast elkaar zetten.",
      aanpak: [
        "Zes diensten, elk met een eigen blok: on-site machining, verspaning in de werkplaats, industriële reparaties, machinebouw en maatwerk, retrofit, preventief onderhoud.",
        "Nederlands en Engels met een taalschakelaar, zodat internationale klanten dezelfde site krijgen.",
        "Werkwijze in vijf stappen en een offerteformulier met type aanvraag, naast een knop om direct te bellen.",
        "Projectgalerij met echte foto's van het werk en een kaart met het servicegebied.",
        "Certificeringen (VCA, Koninklijke Metaalunie) en 24/7-bereikbaarheid zichtbaar in beeld.",
      ],
      resultaat: [
        "Eén site voor Nederlandse en internationale klanten, op het eigen domein volmertechniek.com.",
        "Elke aanvraag komt binnen met type werk en contactgegevens, via formulier of telefoon.",
        "Donkere, industriële uitstraling die past bij het werk, met foto's van de eigen werkvloer.",
      ],
      voorNaAlt: undefined as { voor: string; na: string } | undefined,
      quote: undefined as { text: string; author: string } | undefined,
    },
    "mourits-schilderwerken": {
      branche: "Schildersbedrijf",
      intro: "Een nieuwe site voor een schildersbedrijf uit Klaaswaal dat sinds 2015 in de hele Hoeksche Waard werkt: vijf diensten, projectgalerij en direct bellen vanaf je telefoon.",
      situatie: "Mourits Schilderwerken B.V. werkt sinds 2015 vanuit Klaaswaal in de hele Hoeksche Waard: schilderwerk binnen en buiten, wandafwerking, beglazing, restauratie en spuitwerk. De oude website stamde uit de begintijd van het bedrijf, met een fotoslider en een tabel met contactgegevens bovenaan, en was op een telefoon lastig te gebruiken.",
      aanpak: [
        "Vijf dienstcategorieën met eigen pagina's, van glasvlies en kalkverf tot HR++-glas en houtrotherstel.",
        "Bel-balk bovenaan en een knop om vrijblijvend advies aan te vragen, allebei direct bereikbaar op mobiel.",
        "Projectgalerij met eigen werk, werkgebied met alle kernen van de Hoeksche Waard, garantie op het werk benoemd.",
        "Rustige, lichte vormgeving met grote foto's van gevels en kozijnen, zodat het vakwerk zelf het verhaal vertelt.",
      ],
      resultaat: [
        "Site op het eigen domein mouritsschilderwerken.nl, met contactformulier, telefoon en mobiel nummer op één plek.",
        "Op mobiel bel je met één tik; op desktop staat de advies-aanvraag altijd in beeld.",
        "Vindbaar op dienst én plaats: elke dienst heeft een eigen pagina, het werkgebied staat uitgeschreven.",
      ],
      voorNaAlt: { voor: "De oude website van Mourits Schilderwerken op mobiel", na: "De nieuwe website van Mourits Schilderwerken op mobiel" } as { voor: string; na: string } | undefined,
      quote: undefined as { text: string; author: string } | undefined,
    },
    "monster-zorg": {
      branche: "Zzp-zorgverlener",
      intro: "Een persoonlijke site vanaf nul voor een toegepast psycholoog en zorgverlener die zichzelf als zzp'er inzet: wie hij is, wat hij doet, en hoe je hem bereikt.",
      situatie: "Jarno Monster werkt als toegepast psycholoog en zorgverlener met ruim acht jaar ervaring in de woonbegeleiding, en zet zichzelf als zzp'er in bij zorgorganisaties. Er was nog geen website. Opdrachtgevers moesten snel kunnen zien wat hij doet, wat zijn achtergrond is en hoe ze hem bereiken.",
      aanpak: [
        "Eén pagina met een duidelijke volgorde: wie is Jarno, wat biedt hij, welke ervaring heeft hij, waarom Monster Zorg, en contact.",
        "Tijdlijn van 2016 tot nu die de loopbaan in één oogopslag laat zien.",
        "Bellen en LinkedIn direct vanuit de navigatie; geen omwegen.",
        "Warme, lichte vormgeving met een echt portret in plaats van stockbeeld.",
      ],
      resultaat: [
        "Een site die in één scroll uitlegt wat een opdrachtgever wil weten, op het eigen domein monsterzorg.nl.",
        "Contact in twee tikken: telefoon of LinkedIn, ook op mobiel.",
        "Klaar om uit te breiden met werkgebied en tarieven zodra die vaststaan.",
      ],
      voorNaAlt: undefined as { voor: string; na: string } | undefined,
      quote: undefined as { text: string; author: string } | undefined,
    },
  },
};

export type WorkDict = typeof work;
