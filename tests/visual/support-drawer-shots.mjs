// Screenshots van het support-zijmenu: licht en donker, dicht en open, op 1280 en 390 px.
// Draaien: server op 3111 (`npm start`), dan `node tests/visual/support-drawer-shots.mjs <uitvoermap>`.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const out = process.argv[2];
if (!out) { console.error("gebruik: node tests/visual/support-drawer-shots.mjs <uitvoermap>"); process.exit(2); }
mkdirSync(out, { recursive: true });

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const CHROME = process.env.CHROME_PATH ?? "/Users/nathaniel/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const browser = await chromium.launch({ executablePath: CHROME });
try {
  for (const theme of ["dark", "light"]) {
    for (const width of [1280, 390]) {
      const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 800 }, reducedMotion: "reduce" });
      await ctx.addInitScript((t) => localStorage.setItem("theme", t), theme);
      const page = await ctx.newPage();
      await page.goto(`${BASE}/support/e-mail-instellingen`);
      await page.waitForTimeout(700);
      await page.screenshot({ path: join(out, `zijmenu-${theme}-${width}-dicht.png`) });
      await page.getByRole("button", { name: "Alle handleidingen" }).click();
      await page.mouse.move(width - 8, 400); // muis van de knopplek af, anders staat het item eronder in hover
      await page.waitForTimeout(500);
      await page.screenshot({ path: join(out, `zijmenu-${theme}-${width}-open.png`) });
      await ctx.close();
    }
  }
  console.log(`screenshots in ${out}`);
} finally {
  await browser.close();
}
