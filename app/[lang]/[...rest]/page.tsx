import { notFound } from "next/navigation";

/** Vangt elk onbekend pad onder /nl en /en, zodat de 404 in de taal van het pad rendert. */
export default function CatchAll() {
  notFound();
}
