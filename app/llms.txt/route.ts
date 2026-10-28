import { llmsTxt } from "@/lib/markdown/llms";

/** llmstxt.org-index: statisch gebouwd, teksten en prijzen uit de woordenboeken en lib/pricing.ts. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
