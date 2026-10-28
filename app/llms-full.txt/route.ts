import { llmsFullTxt } from "@/lib/markdown/llms";

/** Alle pagina's als één Markdown-document (llmstxt.org-conventie). */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
