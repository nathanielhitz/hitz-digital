/** De vier keuzes van het aanvraagformulier. Ids zijn taalneutraal (ook in `?voor=`); labels staan in lib/i18n. */
export const aanvraagIds = ["website", "hosting", "hulp", "anders"] as const;
export type AanvraagKeuze = (typeof aanvraagIds)[number];
export function isAanvraagKeuze(x: unknown): x is AanvraagKeuze {
  return (aanvraagIds as readonly unknown[]).includes(x);
}
