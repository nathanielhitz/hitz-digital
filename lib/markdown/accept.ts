/**
 * Leest een Accept-header en zegt of de client Markdown boven HTML verkiest (acceptmarkdown.com).
 * Geen runtime-imports: draait in de Edge-middleware en los onder `node --test`.
 *
 * Regels:
 * - Alleen een expliciete `text/markdown` telt als Markdown; `text/*` en `*\/*` tellen als HTML (browsers, curl zonder header).
 * - Bij gelijke q wint wat het eerst genoemd is. `text/markdown, text/html` → Markdown; `text/html, text/markdown` → HTML.
 * - Geen header, lege header of q=0 voor Markdown → HTML.
 */
export function prefersMarkdown(header: string | null | undefined): boolean {
  if (!header) return false;
  let md = -1;
  let html = -1;
  let mdPos = Number.POSITIVE_INFINITY;
  let htmlPos = Number.POSITIVE_INFINITY;
  const ranges = header.split(",");
  for (let i = 0; i < ranges.length; i++) {
    const [typeRaw, ...params] = ranges[i].trim().toLowerCase().split(";");
    const type = typeRaw.trim();
    if (!type) continue;
    let q = 1;
    for (const p of params) {
      const m = p.trim().match(/^q=(.*)$/);
      if (m) {
        const n = Number.parseFloat(m[1]);
        q = Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0;
      }
    }
    if (type === "text/markdown") {
      if (q > md) {
        md = q;
        mdPos = i;
      }
    } else if (type === "text/html" || type === "text/*" || type === "*/*" || type === "application/xhtml+xml") {
      if (q > html) {
        html = q;
        htmlPos = i;
      }
    }
  }
  if (md <= 0) return false;
  if (md > html) return true;
  if (md < html) return false;
  return mdPos < htmlPos;
}
