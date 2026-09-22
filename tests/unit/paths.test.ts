import { test } from "node:test";
import assert from "node:assert/strict";
import {
  href, parsePublic, internalPath, publicPath, redirectForEn, counterpart, ctaFor, alternatesFor, ogLocale, isLang, langOf,
} from "../../lib/i18n/paths.ts";

test("href: NL zonder prefix, EN met /en en Engelse slug", () => {
  assert.equal(href("nl", "home"), "/");
  assert.equal(href("en", "home"), "/en");
  assert.equal(href("nl", "hulp"), "/hulp");
  assert.equal(href("en", "hulp"), "/en/help");
  assert.equal(href("en", "voorwaarden"), "/en/terms");
  assert.equal(href("en", "werk", "mourits-schilderwerken"), "/en/work/mourits-schilderwerken");
  assert.equal(href("nl", "contact"), "/contact");
});

test("href: support bestaat alleen in NL", () => {
  assert.equal(href("en", "support"), "/support");
  assert.equal(href("en", "support", "e-mail-instellen-iphone"), "/support/e-mail-instellen-iphone");
});

test("parsePublic: bekende paden", () => {
  assert.deepEqual(parsePublic("/"), { lang: "nl", key: "home" });
  assert.deepEqual(parsePublic("/en"), { lang: "en", key: "home" });
  assert.deepEqual(parsePublic("/en/"), { lang: "en", key: "home" });
  assert.deepEqual(parsePublic("/hulp"), { lang: "nl", key: "hulp" });
  assert.deepEqual(parsePublic("/en/help"), { lang: "en", key: "hulp" });
  assert.deepEqual(parsePublic("/werk/volmer-techniek"), { lang: "nl", key: "werk", slug: "volmer-techniek" });
  assert.deepEqual(parsePublic("/en/work/volmer-techniek?x=1#y"), { lang: "en", key: "werk", slug: "volmer-techniek" });
  assert.deepEqual(parsePublic("/support/e-mail-instellingen"), { lang: "nl", key: "support", slug: "e-mail-instellingen" });
});

test("parsePublic: onbekende paden geven null", () => {
  assert.equal(parsePublic("/en/hulp"), null); // interne slug is niet publiek in EN
  assert.equal(parsePublic("/foo"), null);
  assert.equal(parsePublic("/websites/extra"), null); // niet-dynamische route met slug
  assert.equal(parsePublic("/en/support"), null); // support heeft geen EN
});

test("internalPath: mapnaam blijft Nederlands", () => {
  assert.equal(internalPath({ lang: "nl", key: "home" }), "/nl");
  assert.equal(internalPath({ lang: "en", key: "home" }), "/en");
  assert.equal(internalPath({ lang: "en", key: "hulp" }), "/en/hulp");
  assert.equal(internalPath({ lang: "en", key: "werk", slug: "x" }), "/en/werk/x");
  assert.equal(internalPath({ lang: "nl", key: "voorwaarden" }), "/nl/voorwaarden");
});

test("publicPath: intern (herschreven) pad terug naar het publieke adres", () => {
  assert.equal(publicPath("/nl"), "/");
  assert.equal(publicPath("/en"), "/en");
  assert.equal(publicPath("/nl/hulp"), "/hulp");
  assert.equal(publicPath("/en/hulp"), "/en/help");
  assert.equal(publicPath("/nl/werk/monster-zorg"), "/werk/monster-zorg");
  assert.equal(publicPath("/nl/support/e-mail-instellingen"), "/support/e-mail-instellingen");
  assert.equal(publicPath("/nl/contact?voor=hosting"), "/contact?voor=hosting");
  assert.equal(publicPath("/en/does-not-exist"), "/en/does-not-exist"); // niet herschreven: onveranderd
  assert.equal(publicPath("/hulp"), "/hulp"); // al publiek: onveranderd
  assert.equal(publicPath("/nl/hulp/extra"), "/nl/hulp/extra"); // geen route: onveranderd
});

test("redirectForEn: interne slug en support onder /en", () => {
  assert.equal(redirectForEn("/en/hulp"), "/en/help");
  assert.equal(redirectForEn("/en/werk/volmer-techniek"), "/en/work/volmer-techniek");
  assert.equal(redirectForEn("/en/voorwaarden"), "/en/terms");
  assert.equal(redirectForEn("/en/support"), "/support");
  assert.equal(redirectForEn("/en/support/e-mail-instellingen"), "/support/e-mail-instellingen");
  assert.equal(redirectForEn("/en/websites"), null); // gelijke slug: geen redirect
  assert.equal(redirectForEn("/en/help"), null);
  assert.equal(redirectForEn("/en"), null);
  assert.equal(redirectForEn("/en/onbekend"), null);
});

test("counterpart: tegenhanger van de huidige pagina", () => {
  assert.equal(counterpart("/hulp", "en"), "/en/help");
  assert.equal(counterpart("/en/help", "nl"), "/hulp");
  assert.equal(counterpart("/", "en"), "/en");
  assert.equal(counterpart("/en", "nl"), "/");
  assert.equal(counterpart("/werk/monster-zorg", "en"), "/en/work/monster-zorg");
  assert.equal(counterpart("/support/e-mail-instellingen", "en"), "/en"); // geen tegenhanger → EN home
  assert.equal(counterpart("/bestaat-niet", "en"), "/en");
  assert.equal(counterpart("/contact?voor=hosting&pakket=onderhoud", "en"), "/en/contact?voor=hosting&pakket=onderhoud");
  assert.equal(counterpart("/en/websites#faq", "nl"), "/websites#faq");
  assert.equal(counterpart("/support/x?y=1", "en"), "/en");
});

test("ctaFor: header-knop per route", () => {
  assert.equal(ctaFor("/"), "demo");
  assert.equal(ctaFor("/en"), "demo");
  assert.equal(ctaFor("/websites"), "demo");
  assert.equal(ctaFor("/werk"), "demo");
  assert.equal(ctaFor("/en/work/volmer-techniek"), "demo");
  assert.equal(ctaFor("/hosting"), "hosting");
  assert.equal(ctaFor("/en/help"), "hulp");
  assert.equal(ctaFor("/privacy"), "contact");
  assert.equal(ctaFor("/en/terms"), "contact");
  assert.equal(ctaFor("/support"), "contact");
  assert.equal(ctaFor("/onbekend"), "contact");
  assert.equal(ctaFor("/contact"), null);
  assert.equal(ctaFor("/en/contact"), null);
});

test("alternatesFor: geen hreflang zonder EN-tegenhanger", () => {
  const a = alternatesFor("nl", "support");
  assert.equal(a.canonical, "/support");
  assert.equal(a.languages, undefined);
});

test("alternatesFor: hreflang zodra EN live is", () => {
  const a = alternatesFor("nl", "hulp");
  assert.deepEqual(a, { canonical: "/hulp", languages: { nl: "/hulp", en: "/en/help", "x-default": "/hulp" } });
  const b = alternatesFor("en", "werk", "monster-zorg");
  assert.equal(b.canonical, "/en/work/monster-zorg");
  assert.equal(b.languages?.["x-default"], "/werk/monster-zorg");
  assert.deepEqual(alternatesFor("nl", "support", "x"), { canonical: "/support/x" });
});

test("ogLocale en isLang", () => {
  assert.equal(ogLocale("nl"), "nl_NL");
  assert.equal(ogLocale("en"), "en_GB");
  assert.equal(isLang("en"), true);
  assert.equal(isLang("fr"), false);
  assert.equal(isLang(undefined), false);
  assert.equal(langOf("en"), "en");
  assert.equal(langOf("fr"), "nl");
});
