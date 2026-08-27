import type { ComponentType } from "react";
import { EmailInstellingen } from "@/components/support/EmailInstellingen";
import { EmailIphone } from "@/components/support/EmailIphone";

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
];

export function getSupportArticle(slug: string) {
  return supportArticles.find((a) => a.slug === slug);
}
