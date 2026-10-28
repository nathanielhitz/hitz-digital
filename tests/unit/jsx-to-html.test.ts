import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement as h, Fragment } from "react";
import { renderStatic, renderComponent } from "../../lib/markdown/jsx-to-html.ts";

test("renderStatic: host-elementen, attributen, escaping en void-tags", () => {
  const el = h("p", { className: "x" }, "a & b ", h("a", { href: "/privacy?a=1&b=2", target: "_blank" }, "link"), h("br"), h("img", { src: "/i.webp", alt: 'q"uote' }));
  assert.equal(renderStatic(el), '<p>a &amp; b <a href="/privacy?a=1&amp;b=2">link</a><br/><img src="/i.webp" alt="q&quot;uote"/></p>');
});

test("renderStatic: functiecomponenten, fragments, arrays en lege waarden", () => {
  const Item = ({ n }: { n: number }) => h("li", null, `Item ${n}`);
  const List = () => h(Fragment, null, h("ul", null, [1, 2].map((n) => h(Item, { key: n, n }))), null, false, undefined);
  assert.equal(renderComponent(List), "<ul><li>Item 1</li><li>Item 2</li></ul>");
});
