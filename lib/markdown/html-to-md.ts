/**
 * Kleine HTML→Markdown-omzetter voor de statische markup die `renderToStaticMarkup` van onze eigen
 * componenten maakt (privacy, voorwaarden, support-artikelen). Geen volledige HTML-parser: genoeg voor
 * koppen, alinea's, lijsten, links, nadruk, code, tabellen en figuren. Onbekende tags worden doorgelaten
 * (alleen hun tekst blijft). Geen runtime-imports: testbaar onder `node --test`.
 */

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", hellip: "…", ndash: "–", mdash: "—", euro: "€",
};

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code: string) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? Number.parseInt(code.slice(2), 16) : Number.parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[code.toLowerCase()] ?? m;
  });
}

type Node = { tag: string; attrs: Record<string, string>; children: (Node | string)[] };

const VOID = new Set(["br", "img", "hr", "input", "meta", "link", "source", "wbr"]);

/** Parseert goedgevormde HTML (zoals React die uitspuugt) naar een boom. */
export function parseHtml(html: string): Node {
  const root: Node = { tag: "#root", attrs: {}, children: [] };
  const stack: Node[] = [root];
  const re = /<!--[\s\S]*?-->|<\/([a-zA-Z][\w:-]*)\s*>|<([a-zA-Z][\w:-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|([^<]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const [, close, open, attrText, selfClose, text] = m;
    if (text !== undefined) {
      stack[stack.length - 1].children.push(decodeEntities(text));
    } else if (open) {
      const attrs: Record<string, string> = {};
      const ar = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
      let a: RegExpExecArray | null;
      while ((a = ar.exec(attrText ?? ""))) attrs[a[1].toLowerCase()] = decodeEntities(a[2] ?? a[3] ?? a[4] ?? "");
      const node: Node = { tag: open.toLowerCase(), attrs, children: [] };
      stack[stack.length - 1].children.push(node);
      if (!selfClose && !VOID.has(node.tag)) stack.push(node);
    } else if (close) {
      const tag = close.toLowerCase();
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].tag === tag) {
          stack.length = i;
          break;
        }
      }
    }
  }
  return root;
}

const BR = "\u0000";
const BLOCK = new Set(["p", "div", "section", "article", "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6", "table", "tr", "figure", "figcaption", "blockquote", "pre", "hr", "header", "footer", "nav", "aside", "main", "details", "summary"]);
const SKIP = new Set(["script", "style", "svg", "template", "noscript"]);

export type HtmlToMdOptions = {
  /** Basis voor relatieve links en afbeeldingen, bv. "https://www.example.nl". */
  base?: string;
};

function absolute(url: string, base?: string): string {
  if (!base || !url.startsWith("/")) return url;
  return url.startsWith("//") ? url : `${base.replace(/\/$/, "")}${url}`;
}

function inline(nodes: (Node | string)[], opt: HtmlToMdOptions): string {
  let out = "";
  for (const n of nodes) {
    if (typeof n === "string") {
      out += n.replace(/\s+/g, " ");
      continue;
    }
    if (SKIP.has(n.tag)) continue;
    switch (n.tag) {
      case "br":
        out += BR; // placeholder; wordt aan het einde een harde regelovergang ("  \n")
        break;
      case "strong":
      case "b": {
        const t = inline(n.children, opt).trim();
        out += t ? `**${t}**` : "";
        break;
      }
      case "em":
      case "i": {
        const t = inline(n.children, opt).trim();
        out += t ? `*${t}*` : "";
        break;
      }
      case "code": {
        const t = inline(n.children, opt).trim();
        out += t ? `\`${t}\`` : "";
        break;
      }
      case "a": {
        const t = inline(n.children, opt).trim();
        const href = n.attrs.href ? absolute(n.attrs.href, opt.base) : "";
        out += href && t ? `[${t}](${href})` : t;
        break;
      }
      case "img": {
        const alt = n.attrs.alt ?? "";
        out += n.attrs.src ? `![${alt}](${absolute(n.attrs.src, opt.base)})` : alt;
        break;
      }
      case "span":
        // Een span is vaak een los label (nummer, badge): met spaties eromheen, anders plakt het aan de buurtekst.
        out += " " + inline(n.children, opt).trim() + " ";
        break;
      default:
        if (BLOCK.has(n.tag)) out += " " + block(n, opt).trim() + " ";
        else out += inline(n.children, opt);
    }
  }
  return out;
}

function cell(n: Node, opt: HtmlToMdOptions): string {
  // Celinhoud op één regel: binnen-blokken (zoals een notitie-div) worden met een spatie geplakt.
  return inline(n.children, opt).replace(/\s+/g, " ").replace(/\|/g, "\\|").trim();
}

function table(n: Node, opt: HtmlToMdOptions): string {
  const rows: string[][] = [];
  const walk = (node: Node) => {
    for (const c of node.children) {
      if (typeof c === "string") continue;
      if (c.tag === "tr") rows.push(c.children.filter((x): x is Node => typeof x !== "string" && (x.tag === "td" || x.tag === "th")).map((x) => cell(x, opt)));
      else walk(c);
    }
  };
  walk(n);
  if (!rows.length) return "";
  const width = Math.max(...rows.map((r) => r.length));
  const pad = (r: string[]) => [...r, ...Array(width - r.length).fill("")];
  const hasHeader = n.children.some((c) => typeof c !== "string" && c.tag === "thead");
  const header = hasHeader ? pad(rows.shift()!) : Array(width).fill("");
  const lines = [`| ${header.join(" | ")} |`, `| ${Array(width).fill("---").join(" | ")} |`, ...rows.map((r) => `| ${pad(r).join(" | ")} |`)];
  return lines.join("\n");
}

function list(n: Node, opt: HtmlToMdOptions, ordered: boolean, depth: number): string {
  let i = 0;
  const items: string[] = [];
  for (const c of n.children) {
    if (typeof c === "string" || c.tag !== "li") continue;
    i++;
    const marker = ordered ? `${i}. ` : "- ";
    const indent = "  ".repeat(depth);
    // Geneste lijsten apart renderen, de rest als inline tekst.
    const nested = c.children.filter((x): x is Node => typeof x !== "string" && (x.tag === "ul" || x.tag === "ol"));
    const rest = c.children.filter((x) => !(typeof x !== "string" && (x.tag === "ul" || x.tag === "ol")));
    let line = `${indent}${marker}${inline(rest, opt).replace(/\s+/g, " ").trim()}`;
    for (const sub of nested) line += "\n" + list(sub, opt, sub.tag === "ol", depth + 1);
    items.push(line);
  }
  return items.join("\n");
}

function block(n: Node, opt: HtmlToMdOptions): string {
  const parts: string[] = [];
  let run: (Node | string)[] = [];
  const flush = () => {
    const t = inline(run, opt).replace(/[ \t]+/g, " ").trim();
    if (t) parts.push(t);
    run = [];
  };
  for (const c of n.children) {
    if (typeof c === "string" || !BLOCK.has(c.tag)) {
      if (typeof c !== "string" && SKIP.has(c.tag)) continue;
      run.push(c);
      continue;
    }
    flush();
    parts.push(blockOne(c, opt));
  }
  flush();
  return parts.filter(Boolean).join("\n\n");
}

function blockOne(c: Node, opt: HtmlToMdOptions): string {
  switch (c.tag) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6": {
      const level = Number(c.tag[1]);
      return `${"#".repeat(level)} ${inline(c.children, opt).replace(/\s+/g, " ").trim()}`;
    }
    case "p":
    case "figcaption":
    case "summary":
      return inline(c.children, opt).replace(/[ \t]+/g, " ").trim();
    case "ul":
      return list(c, opt, false, 0);
    case "ol":
      return list(c, opt, true, 0);
    case "table":
      return table(c, opt);
    case "blockquote":
      return block(c, opt)
        .split("\n")
        .map((l) => `> ${l}`)
        .join("\n");
    case "pre":
      return "```\n" + inline(c.children, opt).trim() + "\n```";
    case "hr":
      return "---";
    default:
      return block(c, opt);
  }
}

/** HTML → Markdown. Relatieve links/afbeeldingen worden absoluut gemaakt met `base`. */
export function htmlToMarkdown(html: string, opt: HtmlToMdOptions = {}): string {
  return block(parseHtml(html), opt)
    .replace(/ ?\u0000 ?/g, "  \n")
    .replace(/\u00a0/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
