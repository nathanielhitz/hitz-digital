import { NotFoundView } from "@/components/ui/NotFoundView";
import { getDict } from "@/lib/i18n";

/** Tweetalige 404. De teksten van beide talen gaan mee; de client kiest op basis van het pad (zie NotFoundView).
    `getDict("en")` valt terug op het Nederlandse woordenboek zolang het Engelse nog niet bestaat. */
export default function NotFound() {
  return <NotFoundView texts={{ nl: getDict("nl").ui.notFound, en: getDict("en").ui.notFound }} />;
}
