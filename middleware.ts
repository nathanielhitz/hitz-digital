import { NextResponse, type NextRequest } from "next/server";
import { isLive, parsePublic, internalPath, redirectForEn } from "@/lib/i18n/paths";

/**
 * Taalrouting (spec §2). Nederlands en Engels.
 * - Regel 1 (matcher): overgeslagen worden _next, _vercel, images, de routes /icon en /apple-icon,
 *   en elk pad met een punt erin (bestanden, dus ook sitemap.xml en robots.txt).
 * - Regel 2: /nl(/…) → 301 naar hetzelfde pad zonder prefix.
 * - Regel 3 + 4: een interne (Nederlandse) slug of /support onder /en → 301 naar het publieke adres.
 * - Regel 6: publieke Engelse slug → interne route /en/… (rewrite).
 * - Regel 7: alles overig → interne route /nl/… (rewrite).
 * Task 30 voegt regel 5 toe (detectie op "/").
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
    const parsed = parsePublic(pathname);
    return parsed ? rewrite(req, internalPath(parsed)) : NextResponse.next();
  }

  // Regel 7
  return rewrite(req, pathname === "/" ? "/nl" : `/nl${pathname}`);
}

function rewrite(req: NextRequest, internal: string) {
  const url = req.nextUrl.clone();
  url.pathname = internal;
  return NextResponse.rewrite(url);
}
