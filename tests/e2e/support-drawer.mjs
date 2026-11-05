// Browsertest voor het support-zijmenu (spec 2026-11-05-support-zijmenu-design.md, sectie Test).
// Draaien: oude server stoppen met `kill $(lsof -t -iTCP:3111 -sTCP:LISTEN)`, starten met `npm run build && npm start` (poort 3111),
// dan `node tests/e2e/support-drawer.mjs`.
import { chromium } from "playwright";
import assert from "node:assert/strict";

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const CHROME = process.env.CHROME_PATH ?? "/Users/nathaniel/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const A = "/support/e-mail-instellingen";
const B = "/support/e-mail-instellen-iphone";
const B_TITLE = "E-mail instellen op iPhone of iPad";

const state = (page) =>
  page.evaluate(() => {
    const panel = document.getElementById("support-drawer");
    const btn = document.querySelector('[aria-controls="support-drawer"]');
    return {
      hidden: panel?.getAttribute("aria-hidden"),
      inert: panel?.hasAttribute("inert") ?? null,
      expanded: btn?.getAttribute("aria-expanded") ?? null,
      overflow: document.body.style.overflow,
      focused: document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.textContent?.trim() ?? null,
      current: panel?.querySelector('[aria-current="page"]')?.textContent?.trim() ?? null,
      path: location.pathname,
      h1: document.querySelector("h1")?.textContent?.trim() ?? null,
    };
  });

const waitHidden = (page, v) => page.waitForFunction((v) => document.getElementById("support-drawer")?.getAttribute("aria-hidden") === v, v);

const browser = await chromium.launch({ executablePath: CHROME });
try {
  // 1. Dicht bij laden.
  let ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  let page = await ctx.newPage();
  await page.goto(BASE + A);
  let s = await state(page);
  assert.equal(s.hidden, "true", "paneel aria-hidden bij laden");
  assert.equal(s.inert, true, "paneel inert bij laden");
  assert.equal(s.expanded, "false", "knop aria-expanded bij laden");

  // 2. Openen: open, focus op kruisje, scroll-lock.
  const openBtn = page.getByRole("button", { name: "Alle handleidingen" });
  await openBtn.click();
  await waitHidden(page, "false");
  await page.waitForFunction(() => document.activeElement?.getAttribute("aria-label") === "Menu sluiten");
  s = await state(page);
  assert.equal(s.hidden, "false", "paneel zichtbaar na klik");
  assert.equal(s.inert, false, "paneel niet inert na klik");
  assert.equal(s.expanded, "true", "knop aria-expanded na klik");
  assert.equal(s.focused, "Menu sluiten", "focus op kruisje");
  assert.equal(s.overflow, "hidden", "body scroll-lock");

  // 3a. Escape sluit, overflow hersteld, focus terug op de knop.
  await page.keyboard.press("Escape");
  await waitHidden(page, "true");
  s = await state(page);
  assert.equal(s.hidden, "true", "dicht na Escape");
  assert.equal(s.overflow, "", "overflow hersteld na Escape");
  assert.equal(s.focused, "Alle handleidingen", "focus terug op knop na Escape");

  // 3b. Scrim-klik sluit.
  await openBtn.click();
  await waitHidden(page, "false");
  await page.mouse.click(1000, 500);
  await waitHidden(page, "true");
  s = await state(page);
  assert.equal(s.hidden, "true", "dicht na scrim-klik");
  assert.equal(s.overflow, "", "overflow hersteld na scrim-klik");
  assert.equal(s.focused, "Alle handleidingen", "focus terug op knop na scrim-klik");

  // 3c. Kruisje sluit.
  await openBtn.click();
  await waitHidden(page, "false");
  await page.getByRole("button", { name: "Menu sluiten" }).click();
  await waitHidden(page, "true");
  s = await state(page);
  assert.equal(s.hidden, "true", "dicht na kruisje");
  assert.equal(s.overflow, "", "overflow hersteld na kruisje");
  assert.equal(s.focused, "Alle handleidingen", "focus terug op knop na kruisje");

  // 4. Doorklikken: paneel blijft open, actieve markering verspringt.
  await openBtn.click();
  await waitHidden(page, "false");
  s = await state(page);
  assert.equal(s.current, "E-mailinstellingen: IMAP, POP3 en SMTP", "actief item bij start");
  await page.getByRole("dialog", { name: "Handleidingen" }).getByRole("link", { name: B_TITLE }).click();
  await page.waitForURL(BASE + B);
  await page.waitForFunction((t) =>
    document.querySelector("h1")?.textContent?.trim() === t &&
    document.querySelector('#support-drawer [aria-current="page"]')?.textContent?.trim() === t, B_TITLE);
  s = await state(page);
  assert.equal(s.path, B, "URL na doorklikken");
  assert.equal(s.h1, B_TITLE, "H1 na doorklikken");
  assert.equal(s.hidden, "false", "paneel blijft open na doorklikken");
  assert.equal(s.overflow, "hidden", "scroll-lock blijft na doorklikken");
  assert.equal(s.current, B_TITLE, "actief item verspringt");
  assert.equal(await page.evaluate(() => document.getElementById("support-drawer").contains(document.activeElement)), true, "focus blijft in het paneel na doorklikken");

  // 5. Klik op het actieve artikel sluit zonder navigatie.
  await page.getByRole("dialog", { name: "Handleidingen" }).getByRole("link", { name: B_TITLE }).click();
  await waitHidden(page, "true");
  s = await state(page);
  assert.equal(s.path, B, "geen navigatie bij klik op actief item");
  assert.equal(s.hidden, "true", "dicht na klik op actief item");
  assert.equal(s.overflow, "", "overflow hersteld na klik op actief item");

  // 6. Onderin: link naar /hulp en App me aanwezig.
  await page.getByRole("button", { name: "Alle handleidingen" }).click();
  await waitHidden(page, "false");
  const dialog = page.getByRole("dialog", { name: "Handleidingen" });
  assert.equal(await dialog.getByRole("link", { name: "Computer- en websitehulp" }).getAttribute("href"), "/hulp", "link naar /hulp");
  assert.match(await dialog.getByRole("link", { name: "App me" }).getAttribute("href"), /^https:\/\/wa\.me\//, "App me naar WhatsApp");
  await ctx.close();

  // 7. 375px: geen horizontale scroll, scrimstrook rechts sluit.
  ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  page = await ctx.newPage();
  await page.goto(BASE + A);
  await page.getByRole("button", { name: "Alle handleidingen" }).click();
  await waitHidden(page, "false");
  const widths = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
    panel: document.getElementById("support-drawer").getBoundingClientRect().width,
  }));
  assert.equal(widths.scroll, widths.client, "geen horizontale scroll op 375px");
  assert.equal(widths.panel, 375 - 48, "paneel 100% min 48px op 375px");
  await page.mouse.click(365, 400);
  await waitHidden(page, "true");
  s = await state(page);
  assert.equal(s.hidden, "true", "scrimstrook sluit op 375px");
  await ctx.close();

  // 8. Reduced motion: geen transform-overgang op het paneel.
  ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  page = await ctx.newPage();
  await page.goto(BASE + A);
  await page.getByRole("button", { name: "Alle handleidingen" }).click();
  const tp = await page.evaluate(() => getComputedStyle(document.getElementById("support-drawer")).transitionProperty);
  assert.doesNotMatch(tp, /transform/, `reduced motion: transitionProperty = ${tp}`);
  await ctx.close();

  console.log("support-drawer: alle checks geslaagd");
} finally {
  await browser.close();
}
