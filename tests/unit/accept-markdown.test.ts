import { test } from "node:test";
import assert from "node:assert/strict";
import { prefersMarkdown } from "../../lib/markdown/accept.ts";

test("prefersMarkdown: expliciete text/markdown wint", () => {
  assert.equal(prefersMarkdown("text/markdown"), true);
  assert.equal(prefersMarkdown("text/markdown, text/html;q=0.9"), true);
  assert.equal(prefersMarkdown("text/markdown, */*;q=0.1"), true);
  assert.equal(prefersMarkdown("TEXT/MARKDOWN;q=0.8, text/html;q=0.5"), true);
  assert.equal(prefersMarkdown("text/markdown, text/html"), true); // gelijkspel: eerstgenoemde wint
});

test("prefersMarkdown: browsers, curl en lege headers krijgen HTML", () => {
  assert.equal(prefersMarkdown(null), false);
  assert.equal(prefersMarkdown(undefined), false);
  assert.equal(prefersMarkdown(""), false);
  assert.equal(prefersMarkdown("*/*"), false);
  assert.equal(prefersMarkdown("text/*"), false);
  assert.equal(prefersMarkdown("text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,*/*;q=0.8"), false);
  assert.equal(prefersMarkdown("text/html, text/markdown"), false); // gelijkspel: eerstgenoemde wint
  assert.equal(prefersMarkdown("text/markdown;q=0.5, text/html"), false);
  assert.equal(prefersMarkdown("text/markdown;q=0, */*"), false);
  assert.equal(prefersMarkdown("application/json"), false);
});
