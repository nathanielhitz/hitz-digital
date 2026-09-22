import { test } from "node:test";
import assert from "node:assert/strict";
import { prefersEnglish } from "../../lib/i18n/accept-language.ts";

test("geen header of lege header → geen Engels", () => {
  assert.equal(prefersEnglish(null), false);
  assert.equal(prefersEnglish(""), false);
});

test("Engelse browser → Engels", () => {
  assert.equal(prefersEnglish("en-GB,en;q=0.9"), true);
  assert.equal(prefersEnglish("en-US,en;q=0.9,nl;q=0.5"), true);
  assert.equal(prefersEnglish("EN"), true);
});

test("Nederlandse browser → Nederlands, ook met Engels als tweede", () => {
  assert.equal(prefersEnglish("nl-NL,nl;q=0.9,en;q=0.8"), false);
  assert.equal(prefersEnglish("nl"), false);
});

test("gelijkspel of andere talen → Nederlands", () => {
  assert.equal(prefersEnglish("en;q=0.8,nl;q=0.8"), false);
  assert.equal(prefersEnglish("de-DE,de;q=0.9"), false);
  assert.equal(prefersEnglish("*"), false);
});

test("rare q-waarden worden als 0 gelezen", () => {
  assert.equal(prefersEnglish("en;q=abc,nl;q=0.1"), false);
  assert.equal(prefersEnglish("en;q=0.2,nl;q=abc"), true);
});

test("q-parameter is hoofdletterongevoelig, lege q telt als 0", () => {
  assert.equal(prefersEnglish("en;Q=0.5,nl;q=0.9"), false);
  assert.equal(prefersEnglish("en;q=,nl;q=0.5"), false);
  assert.equal(prefersEnglish("*;q=1,en;q=0.9"), true);
});
