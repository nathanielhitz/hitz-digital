import { NextResponse, type NextRequest } from "next/server";
import { isLive, parsePublic, internalPath, redirectForEn } from "@/lib/i18n/paths";
import { prefersEnglish } from "@/lib/i18n/accept-language";
import { prefersMarkdown } from "@/lib/markdown/accept";

/**
 * Taalrouting (spec §2). Nederlands en Engels.
 * - Regel 1 (matcher): overgeslagen worden _next, _vercel, images, de routes /icon en /apple-icon,
 *   en elk pad met een punt erin (bestanden, dus ook sitemap.xml en robots.txt).
 * - Regel 2: /nl(/…) → 301 naar hetzelfde pad zonder prefix.
 * - Regel 3 + 4: een interne (Nederlandse) slug of /support onder /en → 301 naar het publieke adres.
 * - Regel 5: alleen de kale homepage kiest zelf een taal — cookie `lang` eerst, anders Accept-Language.
 * - Regel 6: publieke Engelse slug → interne route /en/… (rewrite).
 * - Regel 7: alles overig → interne route /nl/… (rewrite).
 * - Markdown (acceptmarkdown.com): vraagt de client `Accept: text/markdown`, dan gaan regel 6 en 7 niet naar de
 *   HTML-route maar naar /markdown/<publiek pad> (route handler). Redirects (regel 2 t/m 5) gelden ongewijzigd,
 *   zodat beide weergaven dezelfde adressen hebben. Onbekende paden krijgen daar een Markdown-404.
 */
export const config = {
  matcher: ["/((?!_next/|_vercel/|images/|icon$|apple-icon$|.*\\..*).*)"],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Metadata-afbeeldingen: Next vraagt ze zelf op onder /nl/… of /en/…; een oud ongeprefixt adres krijgt /nl ervoor.
  if (/\/opengraph-image(-|$)/.test(pathname)) {
    if (pathname.startsWith("/nl/") || pathname.startsWith("/en/")) return NextResponse.next();
    return rewrite(req, `/nl${pathname}`);
  }

  // Regel 2
  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice("/nl".length) || "/";
    return NextResponse.redirect(url, 301);
  }

  // Engels (vanaf fase 2). Niet live → valt door naar regel 7 en eindigt in de NL-404.
  if (isLive("en") && (pathname === "/en" || pathname.startsWith("/en/"))) {
    // Regel 3 + 4: interne (Nederlandse) slug of support onder /en → 301 naar het publieke adres.
    const target = redirectForEn(pathname);
    if (target) {
      const url = req.nextUrl.clone();
      url.pathname = target;
      return NextResponse.redirect(url, 301);
    }
    // Regel 6: publieke EN-slug → interne route. Onbekend pad blijft staan; de catch-all geeft een 404; NotFoundView kiest client-side Engels.
    if (prefersMarkdown(req.headers.get("accept"))) return rewrite(req, markdownPath(pathname));
    const parsed = parsePublic(pathname);
    return parsed ? withVary(rewrite(req, internalPath(parsed))) : withVary(NextResponse.next());
  }

  // Regel 5: alleen de kale homepage kiest zelf een taal. Cookie eerst, anders Accept-Language.
  if (pathname === "/" && isLive("en")) {
    const cookie = req.cookies.get("lang")?.value;
    const toEn = cookie === "en" || (cookie !== "nl" && prefersEnglish(req.headers.get("accept-language")));
    if (toEn) {
      const url = req.nextUrl.clone();
      url.pathname = "/en";
      const res = NextResponse.redirect(url, 307);
      res.headers.set("Vary", "Cookie, Accept-Language");
      return res;
    }
  }

  // Markdown-weergave (zie boven).
  if (prefersMarkdown(req.headers.get("accept"))) return rewrite(req, markdownPath(pathname));

  // Regel 7: Nederlands zonder prefix → interne route /nl/…
  const res = rewrite(req, pathname === "/" ? "/nl" : `/nl${pathname}`);
  res.headers.set("Vary", pathname === "/" ? "Cookie, Accept-Language, Accept" : "Accept");
  return res;
}

/** Interne route van de Markdown-weergave voor een publiek pad. */
function markdownPath(pathname: string) {
  return `/markdown${pathname === "/" ? "" : pathname}`;
}

/** HTML hangt af van de Accept-header (Markdown of HTML). */
function withVary(res: NextResponse) {
  res.headers.set("Vary", "Accept");
  return res;
}

function rewrite(req: NextRequest, internal: string) {
  const url = req.nextUrl.clone();
  url.pathname = internal;
  return NextResponse.rewrite(url);
}
