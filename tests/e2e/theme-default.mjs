// Browsertest: donker is de standaard, ongeacht de OS-voorkeur; licht alleen via localStorage/themaknop.
// Draaien: server op 3111 (`npm start`), symlink ../node_modules/playwright, dan `node tests/e2e/theme-default.mjs`.
import { chromium } from "playwright";
import assert from "node:assert/strict";

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const CHROME = process.env.CHROME_PATH ?? "/Users/nathaniel/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const DARK_BG = "rgb(7, 7, 6)";       // --deep donker (#070706), body background-color
const LIGHT_BG = "rgb(246, 243, 237)"; // --deep licht (#f6f3ed)

const state = (page) =>
  page.evaluate(() => ({
    theme: document.documentElement.getAttribute("data-theme"),
    bg: getComputedStyle(document.body).backgroundColor,
    stored: localStorage.getItem("theme"),
  }));

const browser = await chromium.launch({ executablePath: CHROME });
try {
  for (const path of ["/", "/en"]) {
    // 1. Schone sessie, OS op licht: toch donker.
    let ctx = await browser.newContext({ colorScheme: "light" });
    let page = await ctx.newPage();
    await page.goto(`${BASE}${path}`);
    let s = await state(page);
    assert.equal(s.theme, "dark", `${path}: data-theme zonder opgeslagen keuze`);
    assert.equal(s.bg, DARK_BG, `${path}: achtergrond zonder opgeslagen keuze`);
    assert.equal(s.stored, null, `${path}: next-themes schrijft de standaard niet weg`);
    await ctx.close();

    // 2. Opgeslagen keuze "light": licht.
    ctx = await browser.newContext({ colorScheme: "dark" });
    await ctx.addInitScript(() => localStorage.setItem("theme", "light"));
    page = await ctx.newPage();
    await page.goto(`${BASE}${path}`);
    s = await state(page);
    assert.equal(s.theme, "light", `${path}: data-theme met theme=light`);
    assert.equal(s.bg, LIGHT_BG, `${path}: achtergrond met theme=light`);
    await ctx.close();

    // 3. Knop wisselt donker → licht en de keuze blijft na herladen.
    ctx = await browser.newContext({ colorScheme: "light", viewport: { width: 1280, height: 800 } });
    page = await ctx.newPage();
    await page.goto(`${BASE}${path}`);
    const toLight = path === "/en" ? "Switch to light theme" : "Schakel naar licht thema";
    await page.getByRole("button", { name: toLight }).click();
    s = await state(page);
    assert.equal(s.theme, "light", `${path}: na klik`);
    assert.equal(s.stored, "light", `${path}: keuze bewaard`);
    await page.reload();
    s = await state(page);
    assert.equal(s.theme, "light", `${path}: na herladen`);
    assert.equal(s.bg, LIGHT_BG, `${path}: achtergrond na herladen`);
    await ctx.close();

    // 4. JavaScript uit: de CSS-basis is donker.
    ctx = await browser.newContext({ colorScheme: "light", javaScriptEnabled: false });
    page = await ctx.newPage();
    await page.goto(`${BASE}${path}`);
    s = await state(page);
    assert.equal(s.theme, null, `${path}: zonder JS geen data-theme`);
    assert.equal(s.bg, DARK_BG, `${path}: zonder JS donker`);
    await ctx.close();
  }
  console.log("theme-default: OK");
} finally {
  await browser.close();
}
