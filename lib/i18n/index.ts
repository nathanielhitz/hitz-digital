import { defaultLang, type Lang } from "./paths";
import * as nl from "./nl";

/** Vorm van een compleet woordenboek: afgeleid van het Nederlands (de bron). */
export type Dict = typeof nl;

/** Beschikbare woordenboeken. Task 18 voegt `en` toe. */
const dicts: Partial<Record<Lang, Dict>> = { nl };

export function getDict(lang: Lang): Dict {
  return dicts[lang] ?? (dicts[defaultLang] as Dict);
}
