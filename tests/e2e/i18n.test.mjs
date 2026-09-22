// HTTP-tests tegen een draaiende productie-server: `npm run build && npm start` (poort 3111), dan `npm run test:e2e`.
import { test } from "node:test";
import assert from "node:assert/strict";

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
export const get = (path, init = {}) => fetch(BASE + path, { redirect: "manual", ...init });
const location = (res) => new URL(res.headers.get("location"), BASE).pathname;

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
  assert.equal(new URL(res.headers.get("location"), BASE).search, "?x=1");
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
      assert.match(og.headers.get("content-type"), /image\/png/, p);
    }
  }
});
