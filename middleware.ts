import { NextResponse, type NextRequest } from "next/server";

/**
 * Taalrouting (spec §2). Fase 1: alleen Nederlands.
 * - Regel 1 (matcher): _next, api, images, bestanden en root-metadata-routes worden overgeslagen.
 * - Regel 2: /nl(/…) → 301 naar hetzelfde pad zonder prefix.
 * - Regel 7: alles overig → interne route /nl/… (rewrite).
 * Task 18 voegt regels 3, 4 en 6 toe (Engelse slugs), Task 30 regel 5 (detectie op "/").
 */
export const config = {
  matcher: ["/((?!_next/|api/|images/|icon|apple-icon|sitemap\\.xml|robots\\.txt|.*\\..*).*)"],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Metadata-afbeeldingen: Next vraagt ze zelf op onder /nl/… of /en/…; een oud ongeprefixt adres krijgt /nl ervoor.
  if (pathname.includes("/opengraph-image")) {
    if (pathname.startsWith("/nl/") || pathname.startsWith("/en/")) return NextResponse.next();
    return rewrite(req, `/nl${pathname}`);
  }

  // Regel 2
  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
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
