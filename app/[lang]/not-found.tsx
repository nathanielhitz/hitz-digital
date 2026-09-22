import { NotFoundView } from "@/components/ui/NotFoundView";
import { getDict } from "@/lib/i18n";

/** Tweetalige 404. De teksten van beide talen gaan mee; de client kiest op basis van het pad (zie NotFoundView). */
export default function NotFound() {
  return <NotFoundView texts={{ nl: getDict("nl").ui.notFound, en: getDict("en").ui.notFound }} />;
}
