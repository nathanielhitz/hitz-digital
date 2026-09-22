import { NextResponse, type NextRequest } from "next/server";

/**
 * Taalrouting (spec §2). Fase 1: alleen Nederlands.
 * - Regel 1 (matcher): overgeslagen worden _next, _vercel, images, de routes /icon en /apple-icon,
 *   en elk pad met een punt erin (bestanden, dus ook sitemap.xml en robots.txt).
 * - Regel 2: /nl(/…) → 301 naar hetzelfde pad zonder prefix.
 * - Regel 7: alles overig → interne route /nl/… (rewrite).
 * Task 18 voegt regels 3, 4 en 6 toe (Engelse slugs), Task 30 regel 5 (detectie op "/").
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

  // Regel 7
  return rewrite(req, pathname === "/" ? "/nl" : `/nl${pathname}`);
}

function rewrite(req: NextRequest, internal: string) {
  const url = req.nextUrl.clone();
  url.pathname = internal;
  return NextResponse.rewrite(url);
}
