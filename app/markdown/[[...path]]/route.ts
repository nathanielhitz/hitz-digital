import { parsePublic } from "@/lib/i18n/paths";
import { renderRoute, notFoundMarkdown, langOfPath } from "@/lib/markdown/render";

/**
 * Markdown-weergave van elke pagina (acceptmarkdown.com). De middleware herschrijft een verzoek met
 * `Accept: text/markdown` naar /markdown/<publiek pad>; direct aanroepen zonder die header geeft via de
 * middleware de gewone 404. Onbekende paden krijgen hier een Markdown-404 met links naar llms.txt en sitemap.
 */
type Ctx = { params: Promise<{ path?: string[] }> };

function markdown(body: string, status: number, lang: string, canonical?: string): Response {
  const headers: Record<string, string> = {
    "Content-Type": "text/markdown; charset=utf-8",
    "Content-Language": lang,
    Vary: "Accept",
    "Cache-Control": "public, max-age=0, must-revalidate",
  };
  if (canonical) headers.Link = `<${canonical}>; rel="canonical"`;
  return new Response(body, { status, headers });
}

export async function GET(_req: Request, { params }: Ctx) {
  const { path = [] } = await params;
  const pathname = "/" + path.map((s) => decodeURIComponent(s)).join("/");
  const parsed = parsePublic(pathname);
  const page = parsed ? renderRoute(parsed) : null;
  if (!parsed || !page) return markdown(notFoundMarkdown(pathname), 404, langOfPath(pathname));
  return markdown(page.markdown, 200, parsed.lang, page.canonical);
}
