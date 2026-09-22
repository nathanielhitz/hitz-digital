// HTTP-tests tegen een draaiende productie-server: `npm run build && npm start` (poort 3111), dan `npm run test:e2e`.
import { test } from "node:test";
import assert from "node:assert/strict";

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const get = (path, init = {}) => fetch(BASE + path, { redirect: "manual", ...init });
const locationUrl = (res) => {
  const loc = res.headers.get("location");
  assert.ok(loc, "location header");
  return new URL(loc, BASE);
};
const location = (res) => locationUrl(res).pathname;

const NL_PAGES = [
  "/", "/websites", "/hosting", "/hulp", "/werk", "/werk/volmer-techniek", "/contact",
  "/privacy", "/voorwaarden", "/support", "/support/e-mail-instellingen",
];

test("NL-pagina's zonder prefix: 200 en <html lang=nl>", async () => {
  for (const p of NL_PAGES) {
    const res = await get(p);
    assert.equal(res.status, 200, p);
    assert.match(await res.text(), /<html[^>]*\blang="nl"/, p);
  }
});

test("/nl/… → 301 zonder prefix, query blijft", async () => {
  const res = await get("/nl/hosting?x=1");
  assert.equal(res.status, 301);
  assert.equal(location(res), "/hosting");
  assert.equal(locationUrl(res).search, "?x=1");
  const home = await get("/nl");
  assert.equal(home.status, 301);
  assert.equal(location(home), "/");
});

test("onbekend pad: 404 in het Nederlands", async () => {
  const res = await get("/bestaat-niet");
  assert.equal(res.status, 404);
  assert.match(await res.text(), /Deze pagina bestaat niet/);
});

test("metadata-routes en OG-afbeeldingen blijven bereikbaar", async () => {
  for (const p of ["/sitemap.xml", "/robots.txt", "/icon", "/apple-icon", "/images/cafecentrum.webp"]) {
    const res = await get(p);
    assert.equal(res.status, 200, p);
  }
  // Next hangt zelf een hash aan het pad van een metadata-afbeelding (/nl/opengraph-image-<hash>),
  // dus lezen we het adres uit de pagina in plaats van het hard te coderen. Hetzelfde plaatje moet
  // ook zonder /nl-prefix bereikbaar zijn: dat is de rewrite in de middleware (oude, gedeelde links).
  for (const page of ["/", "/websites"]) {
    const html = await (await get(page)).text();
    const found = html.match(/property="og:image" content="([^"]+)"/);
    assert.ok(found, `og:image ontbreekt op ${page}`);
    const { pathname, search } = new URL(found[1]);
    assert.match(pathname, /^\/nl\//, found[1]);
    for (const p of [pathname + search, pathname.slice(3) + search]) {
      const og = await get(p);
      assert.equal(og.status, 200, p);
      assert.match(og.headers.get("content-type") ?? "", /image\/png/, p);
    }
  }
});

test("paden buiten de padkaart geven 404, ook als de middleware ze overslaat", async () => {
  for (const p of ["/wp-login.php", "/foo.php", "/iconografie", "/icon-192.png", "/en/x", "/werk/onbekend"]) {
    assert.equal((await get(p)).status, 404, p);
  }
  for (const p of ["/icon", "/apple-icon"]) assert.equal((await get(p)).status, 200, p);
});

const EN_PAGES = ["/en", "/en/websites", "/en/hosting", "/en/help", "/en/work", "/en/work/volmer-techniek", "/en/contact", "/en/privacy", "/en/terms"];

test("EN-pagina's: 200 en <html lang=en>", async () => {
  for (const p of EN_PAGES) {
    const res = await get(p);
    assert.equal(res.status, 200, p);
    assert.match(await res.text(), /<html[^>]*\blang="en"/, p);
  }
});

test("interne slug onder /en → 301 naar de Engelse slug", async () => {
  for (const [from, to] of [["/en/hulp", "/en/help"], ["/en/werk/volmer-techniek", "/en/work/volmer-techniek"], ["/en/voorwaarden", "/en/terms"]]) {
    const res = await get(from);
    assert.equal(res.status, 301, from);
    assert.equal(location(res), to, from);
  }
});

test("support bestaat alleen in NL: /en/support → 301 /support", async () => {
  const root = await get("/en/support");
  assert.equal(root.status, 301);
  assert.equal(location(root), "/support");
  const deep = await get("/en/support/e-mail-instellingen");
  assert.equal(deep.status, 301);
  assert.equal(location(deep), "/support/e-mail-instellingen");
});

test("onbekend EN-pad en onbekende taal geven 404", async () => {
  // De 404 rendert in Next's foutdocument zonder <html lang>; NotFoundView kiest de taal client-side.
  assert.equal((await get("/en/does-not-exist")).status, 404);
  assert.equal((await get("/en/help/extra")).status, 404);
  assert.equal((await get("/fr")).status, 404);
});

test("diepe links redirecten nooit op taal", async () => {
  const nl = await get("/websites", { headers: { "accept-language": "en-GB,en;q=0.9" } });
  assert.equal(nl.status, 200);
  assert.match(await nl.text(), /<html[^>]*\blang="nl"/);
  const en = await get("/en/websites", { headers: { "accept-language": "nl-NL,nl;q=0.9" } });
  assert.equal(en.status, 200);
  assert.match(await en.text(), /<html[^>]*\blang="en"/);
});

test("header-knop volgt de pagina (spec §4)", async () => {
  const header = (html) => html.slice(html.indexOf("<header"), html.indexOf("</header>"));
  // Het mobiele menu staat naast de header, tussen </header> en de <main> van de pagina.
  const mobile = (html) => html.slice(html.indexOf('id="mobile-menu"'), html.indexOf("<main"));
  const expect = [
    ["/", "/contact?voor=website", "Gratis demo"],
    ["/websites", "/contact?voor=website", "Gratis demo"],
    ["/werk/monster-zorg", "/contact?voor=website", "Gratis demo"],
    ["/hosting", "/contact?voor=hosting", "Vraag hosting aan"],
    ["/hulp", "/contact?voor=hulp", "Vraag hulp aan"],
    ["/privacy", "/contact", "Contact"],
    ["/support", "/contact", "Contact"],
    ["/en", "/en/contact?voor=website", "Free demo"],
    ["/en/hosting", "/en/contact?voor=hosting", "Request hosting"],
    ["/en/help", "/en/contact?voor=hulp", "Request help"],
    ["/en/terms", "/en/contact", "Contact"],
  ];
  for (const [path, href, label] of expect) {
    const html = await (await get(path)).text();
    const re = new RegExp(`href="${href.replace("?", "\\?")}"[^>]*>\\s*${label}`);
    assert.match(header(html), re, path);
    // Eén positieve steekproef: het mobiele menu toont dezelfde knop als de desktop-nav.
    if (path === "/hosting") assert.match(mobile(html), re, `${path}: mobiel menu`);
  }
  // De taalschakelaar (Task 28) linkt op de contactpagina zelf ook naar /contact resp. /en/contact;
  // die valt buiten de vraag "staat er een knop?" en wordt er eerst uitgeknipt.
  const withoutLangSwitch = (h) => h.replace(/<a [^>]*hrefLang="[a-z]{2}"[^>]*>.*?<\/a>/g, "");
  for (const path of ["/contact", "/en/contact"]) {
    const html = await (await get(path)).text();
    assert.doesNotMatch(withoutLangSwitch(header(html)), /href="\/(en\/)?contact/, `${path}: geen knop`);
    assert.doesNotMatch(withoutLangSwitch(mobile(html)), /href="\/(en\/)?contact/, `${path}: geen knop in het mobiele menu`);
  }
});

test("homepage kiest taal: cookie eerst, dan Accept-Language (spec §2 regel 5)", async () => {
  const matrix = [
    [{}, 200],
    [{ "accept-language": "en-GB,en;q=0.9" }, 307],
    [{ "accept-language": "en-US,en;q=0.9,nl;q=0.5" }, 307],
    [{ "accept-language": "nl-NL,nl;q=0.9,en;q=0.8" }, 200],
    [{ "accept-language": "en;q=0.8,nl;q=0.8" }, 200],
    [{ "accept-language": "de-DE,de;q=0.9" }, 200],
    [{ cookie: "lang=en" }, 307],
    [{ cookie: "lang=nl", "accept-language": "en-GB,en;q=0.9" }, 200],
    [{ cookie: "lang=xx", "accept-language": "en-GB,en;q=0.9" }, 307],
  ];
  for (const [headers, status] of matrix) {
    const res = await get("/", { headers });
    assert.equal(res.status, status, JSON.stringify(headers));
    if (status === 307) assert.equal(location(res), "/en", JSON.stringify(headers));
    else assert.match(await res.text(), /<html[^>]*\blang="nl"/, JSON.stringify(headers));
    // Vary alleen op de redirect controleren: op de 200 overschrijft Next (app-page template) de Vary-header van de middleware met zijn eigen waarde; op Vercel draait de middleware vóór de CDN-cache, dus de taalkeuze klopt ook zonder.
    if (status === 307) assert.match(res.headers.get("vary") ?? "", /Accept-Language/i, JSON.stringify(headers));
  }
});

test("detectie geldt alleen voor de kale homepage", async () => {
  for (const p of ["/websites", "/hulp", "/contact", "/werk/volmer-techniek"]) {
    const res = await get(p, { headers: { "accept-language": "en-GB,en;q=0.9", cookie: "lang=en" } });
    assert.equal(res.status, 200, p);
  }
});

const PAIRS = [
  ["/", "/en"], ["/websites", "/en/websites"], ["/hosting", "/en/hosting"], ["/hulp", "/en/help"],
  ["/werk", "/en/work"], ["/werk/monster-zorg", "/en/work/monster-zorg"], ["/contact", "/en/contact"],
  ["/privacy", "/en/privacy"], ["/voorwaarden", "/en/terms"],
];
const SITE = "https://www.hitzdigital.nl";
const abs = (p) => (p === "/" ? SITE : SITE + p);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");

// Next/React schrijft het attribuut als `hrefLang` in de HTML-bron; HTML-attributen zijn
// hoofdletterongevoelig, dus browsers en Google lezen `hreflang`. De regexes matchen daarom case-insensitive.
test("hreflang is symmetrisch en heeft x-default = NL", async () => {
  for (const [nl, en] of PAIRS) {
    for (const p of [nl, en]) {
      const html = await (await get(p)).text();
      assert.match(html, new RegExp(`hreflang="nl"[^>]*href="${esc(abs(nl))}"|href="${esc(abs(nl))}"[^>]*hreflang="nl"`, "i"), `${p}: nl`);
      assert.match(html, new RegExp(`hreflang="en"[^>]*href="${esc(abs(en))}"|href="${esc(abs(en))}"[^>]*hreflang="en"`, "i"), `${p}: en`);
      assert.match(html, new RegExp(`hreflang="x-default"[^>]*href="${esc(abs(nl))}"|href="${esc(abs(nl))}"[^>]*hreflang="x-default"`, "i"), `${p}: x-default`);
      assert.match(html, new RegExp(`rel="canonical" href="${esc(abs(p))}"`), `${p}: canonical`);
    }
  }
  // Support bestaat alleen in het Nederlands: geen <link rel="alternate" hreflang>. De taalschakelaar
  // zet wel hrefLang op haar <a>, daarom kijken we alleen naar link-tags.
  const support = await (await get("/support")).text();
  assert.deepEqual(support.match(/<link[^>]*hreflang=[^>]*>/gi) ?? [], [], "support heeft geen hreflang");
});

test("og:locale en alternate", async () => {
  const nl = await (await get("/hulp")).text();
  assert.match(nl, /property="og:locale" content="nl_NL"/);
  assert.match(nl, /property="og:locale:alternate" content="en_GB"/);
  const en = await (await get("/en/help")).text();
  assert.match(en, /property="og:locale" content="en_GB"/);
});

test("sitemap bevat beide talen met alternates, support alleen NL", async () => {
  const xml = await (await get("/sitemap.xml")).text();
  for (const [nl, en] of PAIRS) {
    assert.match(xml, new RegExp(`<loc>${esc(abs(nl))}</loc>`), nl);
    assert.match(xml, new RegExp(`<loc>${esc(abs(en))}</loc>`), en);
    assert.match(xml, new RegExp(`hreflang="en" href="${esc(abs(en))}"`, "i"), `${nl}: alternate en`);
  }
  assert.match(xml, new RegExp(`<loc>${esc(SITE)}/support</loc>`));
  assert.doesNotMatch(xml, /\/en\/support/);
});

test("lek-check: geen Nederlandse schil-teksten op Engelse pagina's", async () => {
  const forbidden = ["Gratis demo", "Vraag je", "Vraag hosting", "Vraag hulp", "Neem contact", "per maand", "incl. btw", "Werkwijze",
    "Veelgestelde", "Maandelijks opzegbaar", "Kies je pakket", "Lees de", "Weergave", "Naar inhoud", "Heb je een vraag", "Privacybeleid",
    "Deze pagina bestaat niet"];
  for (const p of [...EN_PAGES, "/en/does-not-exist"]) {
    const html = await (await get(p)).text();
    const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
    for (const w of forbidden) assert.ok(!text.includes(w), `${p} bevat "${w}"`);
    if (p !== "/en/does-not-exist") assert.match(html, /"inLanguage":"en"/, `${p}: schema inLanguage`);
  }
});
