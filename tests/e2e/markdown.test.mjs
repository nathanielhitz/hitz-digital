// HTTP-tests voor de agent-laag: Markdown-onderhandeling, Markdown-404, llms.txt en de Over-pagina.
// Tegen een draaiende productie-server: `npm run build && npm start` (poort 3111), dan `npm run test:e2e`.
import { test } from "node:test";
import assert from "node:assert/strict";

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const get = (path, headers = {}) => fetch(BASE + path, { redirect: "manual", headers });
const MD = { accept: "text/markdown" };
const BROWSER = { accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8" };
const location = (res) => new URL(res.headers.get("location"), BASE).pathname;
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

const PAGES = [
  "/", "/websites", "/hosting", "/hulp", "/werk", "/werk/volmer-techniek", "/over", "/contact", "/privacy", "/voorwaarden",
  "/support", "/support/e-mail-instellingen",
  "/en", "/en/websites", "/en/hosting", "/en/help", "/en/work", "/en/work/mourits-schilderwerken", "/en/about", "/en/contact", "/en/privacy", "/en/terms",
];

test("Accept: text/markdown → Markdown met Vary: Accept, op elke pagina", async () => {
  for (const p of PAGES) {
    const res = await get(p, MD);
    assert.equal(res.status, 200, p);
    assert.match(res.headers.get("content-type") ?? "", /^text\/markdown; charset=utf-8/i, p);
    assert.match(res.headers.get("vary") ?? "", /\bAccept\b/, p);
    assert.equal(res.headers.get("content-language"), p.startsWith("/en") ? "en" : "nl", p);
    const body = await res.text();
    assert.match(body, /^# \S/, p); // H1 op de eerste regel
    assert.ok(body.length > 400, `${p}: ${body.length} tekens`);
    assert.ok(body.includes("/llms.txt"), p);
    assert.ok(!/<[a-z][^>]*>/i.test(body), `${p}: HTML-tags in Markdown`);
  }
});

test("Accept: text/html en browser-Accept → HTML blijft HTML", async () => {
  for (const headers of [{ accept: "text/html" }, BROWSER, {}]) {
    const res = await get("/", headers);
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") ?? "", /^text\/html/);
    assert.match(await res.text(), /<html[^>]*\blang="nl"/);
  }
  // Markdown lager gewogen dan HTML → HTML.
  const res = await get("/hulp", { accept: "text/html, text/markdown;q=0.5" });
  assert.match(res.headers.get("content-type") ?? "", /^text\/html/);
});

test("Markdown-404: status 404, text/markdown, uitleg en links naar llms.txt en sitemap", async () => {
  for (const [p, lang, needle] of [["/__probe-bestaat-niet-" + Date.now(), "nl", "bestaat niet"], ["/en/does-not-exist", "en", "does not exist"], ["/werk/onbekend", "nl", "bestaat niet"], ["/markdown", "nl", "bestaat niet"]]) {
    const res = await get(p, MD);
    assert.equal(res.status, 404, p);
    assert.match(res.headers.get("content-type") ?? "", /^text\/markdown; charset=utf-8/i, p);
    assert.match(res.headers.get("vary") ?? "", /\bAccept\b/, p);
    assert.equal(res.headers.get("content-language"), lang, p);
    const body = await res.text();
    assert.match(body, /^# 404/, p);
    assert.ok(body.length >= 20, p);
    assert.ok(body.includes(needle), `${p}: ${needle}`);
    assert.ok(body.includes("/llms.txt") && body.includes("/sitemap.xml"), p);
  }
  // Zonder Markdown-Accept blijft de 404 HTML, en is de interne /markdown-route niet direct bereikbaar.
  for (const p of ["/__probe-html", "/markdown", "/markdown/hulp"]) {
    const res = await get(p);
    assert.equal(res.status, 404, p);
    assert.match(res.headers.get("content-type") ?? "", /^text\/html/, p);
  }
});

test("Redirects gelden ook voor Markdown-verzoeken (zelfde adressen in beide weergaven)", async () => {
  const nl = await get("/nl/hulp", MD);
  assert.equal(nl.status, 301);
  assert.equal(location(nl), "/hulp");
  const en = await get("/en/hulp", MD);
  assert.equal(en.status, 301);
  assert.equal(location(en), "/en/help");
});

test("/llms.txt volgt llmstxt.org: H1, blockquote, when-to-use, H2-secties met linklijsten", async () => {
  const res = await get("/llms.txt");
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /^text\/plain; charset=utf-8/i);
  const body = await res.text();
  const lines = body.split("\n");
  assert.match(lines[0], /^# \S/);
  assert.match(lines[2], /^> \S/);
  assert.match(body, /^When to use /m);
  assert.match(body, /^When not to use /m);
  assert.match(body, /Accept: text\/markdown/);
  const sections = body.match(/^## .+$/gm) ?? [];
  assert.ok(sections.length >= 3, sections.join(", "));
  assert.equal(sections.at(-1), "## Optional");
  // Elke regel onder een H2 is leeg of een linklijst-item `- [naam](url): omschrijving`.
  const firstH2 = body.indexOf("\n## ");
  for (const line of body.slice(firstH2).split("\n")) {
    if (!line.trim() || line.startsWith("## ")) continue;
    assert.match(line, /^- \[[^\]]+\]\(https?:\/\/[^)]+\): \S/, line);
  }
  for (const p of ["/over", "/en/about", "/contact", "/support/e-mail-instellingen", "/llms-full.txt", "/sitemap.xml"]) assert.ok(body.includes(`${p})`), p);
  // Geen koppen in de vrije tekst vóór de eerste H2 (spec: alleen H1 + blockquote + vrije tekst zonder koppen).
  assert.ok(!/^#{2,} /m.test(body.slice(0, firstH2)));
});

test("/llms-full.txt bevat alle pagina's", async () => {
  const res = await get("/llms-full.txt");
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /^text\/plain; charset=utf-8/i);
  const body = await res.text();
  const h1s = body.match(/^# .+$/gm) ?? [];
  assert.ok(h1s.length >= PAGES.length, `${h1s.length} H1's`);
  for (const p of ["/hosting", "/en/help", "/over", "/en/about", "/support/e-mail-instellen-iphone", "/voorwaarden", "/en/terms"]) assert.ok(body.includes(`${p})`), p);
});

test("Over-pagina: /over en /en/about met ≥ 500 tekens tekst, /about en /en/over sturen door", async () => {
  for (const [p, lang] of [["/over", "nl"], ["/en/about", "en"]]) {
    const res = await get(p);
    assert.equal(res.status, 200, p);
    const html = await res.text();
    assert.match(html, new RegExp(`<html[^>]*\\blang="${lang}"`), p);
    const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "";
    assert.ok(text(main).length >= 500, `${p}: ${text(main).length} tekens`);
    assert.match(html, /"@type":"AboutPage"/, p);
    assert.match(html, /<link rel="canonical" href="[^"]*\/(over|en\/about)"/, p);
  }
  const about = await get("/about");
  assert.ok(about.status === 301 || about.status === 308, String(about.status));
  assert.equal(location(about), "/over");
  const enOver = await get("/en/over");
  assert.equal(enOver.status, 301);
  assert.equal(location(enOver), "/en/about");
  const sitemap = await (await get("/sitemap.xml")).text();
  assert.ok(sitemap.includes("/over</loc>") && sitemap.includes("/en/about</loc>"));
});
