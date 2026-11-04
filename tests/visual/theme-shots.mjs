// Screenshots van de homepage (NL en EN) in licht en donker op 390 en 1280 px.
// Het thema wordt expliciet in localStorage gezet, dus het script werkt vóór en ná de wissel naar donker-als-standaard.
// Draaien (symlink ../node_modules/playwright nodig, net als in tests/e2e/switch-cookie.mjs): server op 3111 (`npm run build && npm start`), dan `node tests/visual/theme-shots.mjs <uitvoermap>`.
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const out = process.argv[2];
if (!out) { console.error("gebruik: node tests/visual/theme-shots.mjs <uitvoermap>"); process.exit(2); }
mkdirSync(out, { recursive: true });

const BASE = process.env.BASE_URL ?? "http://localhost:3111";
const CHROME = process.env.CHROME_PATH ?? "/Users/nathaniel/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell";
const browser = await chromium.launch({ executablePath: CHROME });
try {
  for (const theme of ["light", "dark"]) {
    for (const width of [390, 1280]) {
      const ctx = await browser.newContext({
        viewport: { width, height: width === 390 ? 844 : 800 },
        reducedMotion: "reduce",
        colorScheme: "light", // OS op licht: de strengste situatie voor donker-als-standaard
      });
      await ctx.addInitScript((t) => localStorage.setItem("theme", t), theme);
      const page = await ctx.newPage();
      for (const [path, name] of [["/", "nl"], ["/en", "en"]]) {
        await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
        await page.waitForTimeout(3200); // hero-intro (1,4 s; mobiel 2,8 s) loopt op tijd, ook bij reduced motion
        assert.equal(new URL(page.url()).pathname, path, `${name}: geen redirect`);
        assert.equal(await page.locator("html").getAttribute("data-theme"), theme, `${name}: thema toegepast`);
        await page.screenshot({ path: join(out, `${name}-${theme}-${width}.png`), fullPage: true });
      }
      await ctx.close();
    }
  }
  console.log(`theme-shots: 8 screenshots in ${out}`);
} finally {
  await browser.close();
}
