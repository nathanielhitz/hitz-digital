// Bewaakt de thema-structuur van globals.css: donker is de basis (:root, ook zonder JS),
// licht is opt-in via [data-theme="light"], en de OS-voorkeur speelt geen rol.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../../app/globals.css", import.meta.url), "utf8");

test("geen prefers-color-scheme meer: de OS-instelling telt niet", () => {
  assert.doesNotMatch(css, /prefers-color-scheme/);
});

test("licht is opt-in onder [data-theme=light]", () => {
  assert.match(css, /:root\[data-theme="light"\]\s*\{\s*color-scheme:\s*light;/);
});

test("er is geen apart [data-theme=dark]-blok: donker ís :root", () => {
  assert.doesNotMatch(css, /:root\[data-theme="dark"\]/);
});

test(":root zet color-scheme: dark en de donkere achtergrond", () => {
  // Het blok dat color-scheme: dark zet, is een kale :root-regel (geen attribuutselector, geen media query).
  assert.match(css, /\n:root\s*\{\s*color-scheme:\s*dark;\s*--deep:\s*#070706;/);
});

test("grain: één lichte uitzondering, geen media query", () => {
  assert.match(css, /:root\[data-theme="light"\] \.hd-grain/);
  assert.doesNotMatch(css, /:root:not\(\[data-theme="dark"\]\) \.hd-grain/);
});
