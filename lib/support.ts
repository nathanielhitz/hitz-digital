import type { ComponentType } from "react";
import { EmailInstellingen } from "@/components/support/EmailInstellingen";
import { EmailIphone } from "@/components/support/EmailIphone";
import { Webmail } from "@/components/support/Webmail";
import { MailWerktNiet } from "@/components/support/MailWerktNiet";
import { DomeinActief } from "@/components/support/DomeinActief";
import { BrowsercacheLegen } from "@/components/support/BrowsercacheLegen";
import { GeenSlotje } from "@/components/support/GeenSlotje";
import { PhishingHerkennen } from "@/components/support/PhishingHerkennen";
import { BackupMaken } from "@/components/support/BackupMaken";

export type SupportArticle = {
  slug: string;
  title: string;
  /** Korte samenvatting voor de overzichtskaart en de meta description. */
  summary: string;
  category: "E-mail" | "Domein & DNS" | "Website" | "Computer";
  /** Datum "laatst bijgewerkt", als leesbare tekst. */
  updated: string;
  /** ISO-datum voor structured data. */
  updatedIso: string;
  body: ComponentType;
};

/**
 * Support-artikelen. Nieuw artikel toevoegen = component maken in components/support/ en hier registreren.
 * Volgorde hier = volgorde op /support.
 */
export const supportArticles: readonly SupportArticle[] = [
  {
    slug: "e-mail-instellingen",
    title: "E-mailinstellingen: IMAP, POP3 en SMTP",
    summary: "Servernamen, poorten en beveiliging om je zakelijke mailbox in te stellen op telefoon, laptop of in Outlook.",
    category: "E-mail",
    updated: "27 augustus 2026",
    updatedIso: "2026-08-27",
    body: EmailInstellingen,
  },
  {
    slug: "e-mail-instellen-iphone",
    title: "E-mail instellen op iPhone of iPad",
    summary: "Stap voor stap je zakelijke mailbox toevoegen aan de Mail-app op iPhone of iPad, met screenshots.",
    category: "E-mail",
    updated: "27 augustus 2026",
    updatedIso: "2026-08-27",
    body: EmailIphone,
  },
  {
    slug: "webmail",
    title: "Webmail: je mail in de browser",
    summary: "Overal bij je zakelijke mail zonder iets in te stellen. Inloggen, handtekening, wachtwoord wijzigen en extra beveiliging.",
    category: "E-mail",
    updated: "5 november 2026",
    updatedIso: "2026-11-05",
    body: Webmail,
  },
  {
    slug: "mail-werkt-niet",
    title: "Mail werkt niet? Dit kun je zelf controleren",
    summary: "Zes controles in volgorde: webmail, wachtwoord, servernaam, verzenden, ontvangen en verbinding. Daarna weet je wat je me moet appen.",
    category: "E-mail",
    updated: "5 november 2026",
    updatedIso: "2026-11-05",
    body: MailWerktNiet,
  },
  {
    slug: "domeinnaam-direct-actief",
    title: "Is mijn nieuwe domeinnaam direct actief?",
    summary: "Hoe snel een nieuwe of verhuisde domeinnaam werkt, waarom het bij jou soms later is dan bij een ander, en hoe je zelf controleert of alles klopt.",
    category: "Domein & DNS",
    updated: "5 november 2026",
    updatedIso: "2026-11-05",
    body: DomeinActief,
  },
  {
    slug: "browsercache-legen",
    title: "Je ziet je wijziging niet? Browsercache legen",
    summary: "Je site is aangepast, maar jij ziet nog de oude versie. Eerst de snelle test, daarna per browser de stappen op computer en telefoon.",
    category: "Website",
    updated: "5 november 2026",
    updatedIso: "2026-11-05",
    body: BrowsercacheLegen,
  },
  {
    slug: "geen-slotje",
    title: "Geen slotje in de browser?",
    summary: "Waarom Chrome geen slotje meer toont, wat een beveiligingswaarschuwing op je eigen site betekent, en wanneer het aan je apparaat of wifi ligt.",
    category: "Website",
    updated: "5 november 2026",
    updatedIso: "2026-11-05",
    body: GeenSlotje,
  },
  {
    slug: "phishing-herkennen",
    title: "Valse mail herkennen",
    summary: "Vijf controles voordat je klikt, de trucs die ondernemers het vaakst krijgen, en wat je doet als je toch hebt geklikt.",
    category: "Computer",
    updated: "5 november 2026",
    updatedIso: "2026-11-05",
    body: PhishingHerkennen,
  },
  {
    slug: "backup-maken",
    title: "Back-up maken van je laptop of pc",
    summary: "Twee plekken, waarvan één buiten de deur. Stappen voor Mac, Windows en je telefoon, plus hoe je test of het werkt.",
    category: "Computer",
    updated: "5 november 2026",
    updatedIso: "2026-11-05",
    body: BackupMaken,
  },
];

export function getSupportArticle(slug: string) {
  return supportArticles.find((a) => a.slug === slug);
}
