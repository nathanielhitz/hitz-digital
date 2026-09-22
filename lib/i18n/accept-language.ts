/**
 * Leest een Accept-Language-header en zegt of Engels strikt boven Nederlands staat (spec §2, regel 5).
 * Geen header, geen van beide talen, of gelijkspel → false (Nederlands).
 */
export function prefersEnglish(header: string | null): boolean {
  if (!header) return false;
  let en = 0;
  let nl = 0;
  for (const part of header.split(",")) {
    const [tagRaw, ...params] = part.trim().split(";");
    const tag = tagRaw.trim().toLowerCase();
    if (!tag) continue;
    let q = 1;
    for (const p of params) {
      const m = p.trim().match(/^q=(.+)$/);
      if (m) {
        const n = Number.parseFloat(m[1]);
        q = Number.isFinite(n) ? n : 0;
      }
    }
    if (tag === "en" || tag.startsWith("en-")) en = Math.max(en, q);
    if (tag === "nl" || tag.startsWith("nl-")) nl = Math.max(nl, q);
  }
  return en > nl;
}
