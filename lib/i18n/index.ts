import type { Lang } from "./paths";
import * as nl from "./nl";
import * as en from "./en";

/** Vorm van een compleet woordenboek: afgeleid van het Nederlands (de bron). */
export type Dict = typeof nl;

/** Beschikbare woordenboeken. Het Nederlands is er altijd en dient als terugval. */
const dicts: Partial<Record<Lang, Dict>> & { nl: Dict } = { nl, en };

export function getDict(lang: Lang): Dict {
  return dicts[lang] ?? dicts.nl;
}
