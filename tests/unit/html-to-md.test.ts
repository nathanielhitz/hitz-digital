import { test } from "node:test";
import assert from "node:assert/strict";
import { htmlToMarkdown, decodeEntities } from "../../lib/markdown/html-to-md.ts";

test("decodeEntities: benoemde, numerieke en hex-entiteiten", () => {
  assert.equal(decodeEntities("a &amp; b &lt;c&gt; &#39;d&#x27; &rsquo;e"), "a & b <c> 'd' ’e");
});

test("htmlToMarkdown: koppen, alinea's, nadruk en links", () => {
  const html = '<p>Hallo <strong>wereld</strong>, zie <a href="/privacy">privacy</a> of <a href="mailto:x@y.nl">mail</a>.</p><h2>Kop</h2><p>Tekst<br/>regel</p>';
  assert.equal(
    htmlToMarkdown(html, { base: "https://www.example.nl" }),
    "Hallo **wereld**, zie [privacy](https://www.example.nl/privacy) of [mail](mailto:x@y.nl).\n\n## Kop\n\nTekst  \nregel",
  );
});

test("htmlToMarkdown: lijsten (ook genest) en tabellen", () => {
  const html = "<ul><li>Een</li><li>Twee<ul><li>Sub</li></ul></li></ul><ol><li>A</li><li>B</li></ol>";
  assert.equal(htmlToMarkdown(html), "- Een\n- Twee\n  - Sub\n\n1. A\n2. B");
  const table = '<div><div>Algemeen</div><table><tbody><tr><th>Server</th><td><code>mail.zxcs.nl</code><div>Let op</div></td></tr></tbody></table></div>';
  assert.equal(htmlToMarkdown(table), "Algemeen\n\n|  |  |\n| --- | --- |\n| Server | `mail.zxcs.nl` Let op |");
  // Een span (badge, nummer) krijgt spaties eromheen, ook in koppen.
  assert.equal(htmlToMarkdown('<h2><span>01</span>Stap</h2><p><code>IMAP</code><span>aanbevolen</span></p>'), "## 01 Stap\n\n`IMAP` aanbevolen");
});

test("htmlToMarkdown: figuren, afbeeldingen en overgeslagen tags", () => {
  const html = '<figure><img src="/support/a.webp" alt="Stap 1"/><figcaption>Stap 1</figcaption></figure><script>alert(1)</script><svg><path d="M0"/></svg>';
  assert.equal(htmlToMarkdown(html, { base: "https://www.example.nl" }), "![Stap 1](https://www.example.nl/support/a.webp)\n\nStap 1");
});
