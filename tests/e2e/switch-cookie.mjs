// Browsertest: een klik op de taalschakelaar zet de cookie `lang` en de homepage volgt die cookie.
// Draaien: server op 3111 (`npm start`), symlink ../node_modules/playwright (Task 17), dan `node tests/e2e/switch-cookie.mjs`.
import { chromium } from "playwright";
import assert from "node:assert/strict";

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
// De globale Playwright vindt zijn eigen Chromium niet; wijs naar de gecachete build 1243 (Task 17 Step 1).
const CHROME = process.env.CHROME_PATH ?? "/Users/nathaniel/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const browser = await chromium.launch({ executablePath: CHROME });
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();

  // Desktop: nav-schakelaar NL → EN
  await page.goto(`${BASE}/hulp`);
  await page.locator('header a[hreflang="en"]').click();
  await page.waitForURL(`${BASE}/en/help`);
  let cookie = (await ctx.cookies()).find((c) => c.name === "lang");
  assert.equal(cookie?.value, "en", "cookie na klik in nav");
  assert.ok(cookie.expires > Date.now() / 1000 + 300 * 24 * 3600, "cookie geldt ongeveer een jaar");

  // Footer: EN → NL
  await page.locator('footer a[hreflang="nl"]').click();
  await page.waitForURL(`${BASE}/hulp`);
  cookie = (await ctx.cookies()).find((c) => c.name === "lang");
  assert.equal(cookie?.value, "nl", "cookie na klik in footer");

  // Homepage volgt de cookie
  await ctx.clearCookies();
  await ctx.addCookies([{ name: "lang", value: "en", url: BASE }]);
  await page.goto(`${BASE}/`);
  assert.equal(new URL(page.url()).pathname, "/en", "homepage volgt cookie=en");

  // Mobiel menu: segment-variant
  const mob = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await mob.newPage();
  await mp.goto(`${BASE}/websites`);
  await mp.getByRole("button", { name: "Menu openen" }).click();
  await mp.locator('#mobile-menu a[hreflang="en"]').click();
  await mp.waitForURL(`${BASE}/en/websites`);
  assert.equal((await mob.cookies()).find((c) => c.name === "lang")?.value, "en", "cookie na klik in mobiel menu");

  console.log("switch-cookie: OK");
} finally {
  await browser.close();
}
