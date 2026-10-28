import type { ComponentType } from "react";
import { site } from "@/lib/site";
import { getDict } from "@/lib/i18n";
import { href, isLive, segments, type Lang, type Parsed, type RouteKey } from "@/lib/i18n/paths";
import { pricing, euro, liveHosting } from "@/lib/pricing";
import { work, cases, workHref, getCase } from "@/lib/work";
import { supportArticles, getSupportArticle } from "@/lib/support";
import { telDisplay, whatsapp } from "@/lib/content";
import { htmlToMarkdown } from "./html-to-md";
import { renderComponent } from "./jsx-to-html";

/**
 * Markdown-versie van elke publieke pagina (acceptmarkdown.com): dezelfde teksten als de HTML, uit dezelfde
 * woordenboeken, zonder opmaak of scripts. Tekstcomponenten (privacy, voorwaarden, support) gaan via jsx-to-html.
 */

export const LLMS_PATH = "/llms.txt";
export const LLMS_FULL_PATH = "/llms-full.txt";
export const abs = (p: string) => `${site.url}${p === "/" ? "" : p}`;

const labels = {
  nl: {
    source: "Bron",
    language: "Taal",
    langName: "Nederlands",
    otherLang: "English version",
    prices: "Prijzen",
    rate: "Tarief",
    included: "Inbegrepen",
    notIncluded: "Niet inbegrepen",
    perMonth: "per maand",
    perYear: "per jaar",
    domains: "Domeinnamen",
    contact: "Contact",
    email: "E-mail",
    phone: "Telefoon",
    form: "Contactformulier",
    liveSite: "Live site",
    updated: "Laatst bijgewerkt",
    agents: "Voor AI-agents",
    agentsLine: "Elke pagina van deze site is ook als Markdown op te vragen met de header `Accept: text/markdown`.",
    overview: "Overzicht",
    sitemap: "Sitemap",
    supportTitle: "Support & handleidingen",
    supportDescription: `Handleidingen voor klanten van ${site.name}: e-mail instellen, domein, website en meer. Stap voor stap, in gewoon Nederlands.`,
    notFound: "Pagina niet gevonden",
    notFoundLine: (path: string) => `Het pad \`${path}\` bestaat niet op ${site.url.replace(/^https?:\/\//, "")}.`,
    home: "Homepage",
  },
  en: {
    source: "Source",
    language: "Language",
    langName: "English",
    otherLang: "Nederlandse versie",
    prices: "Prices",
    rate: "Rate",
    included: "Included",
    notIncluded: "Not included",
    perMonth: "per month",
    perYear: "per year",
    domains: "Domain names",
    contact: "Contact",
    email: "Email",
    phone: "Phone",
    form: "Contact form",
    liveSite: "Live site",
    updated: "Last updated",
    agents: "For AI agents",
    agentsLine: "Every page on this site is also available as Markdown: request it with the header `Accept: text/markdown`.",
    overview: "Overview",
    sitemap: "Sitemap",
    supportTitle: "Support",
    supportDescription: "",
    notFound: "Page not found",
    notFoundLine: (path: string) => `The path \`${path}\` does not exist on ${site.url.replace(/^https?:\/\//, "")}.`,
    home: "Homepage",
  },
} as const;

export type MarkdownPage = { title: string; description: string; canonical: string; markdown: string };

const section = (title: string, ...parts: (string | undefined | null | false)[]) => [`## ${title}`, ...parts.filter(Boolean)].join("\n\n");
const bullets = (items: readonly string[]) => items.map((i) => `- ${i}`).join("\n");
const faq = (items: readonly { q: string; a: string }[]) => items.map((f) => `**${f.q}**\n${f.a}`).join("\n\n");
const link = (text: string, url: string) => `[${text}](${url})`;

function componentToMarkdown(Body: ComponentType): string {
  return htmlToMarkdown(renderComponent(Body), { base: site.url });
}

function contactLines(lang: Lang): string {
  const L = labels[lang];
  const { ui } = getDict(lang);
  return bullets([
    `${L.email}: ${link(site.email, `mailto:${site.email}`)}`,
    `${L.phone}: ${link(telDisplay, `tel:${site.phone}`)}`,
    `WhatsApp: ${link(ui.footer.whatsapp, whatsapp)}`,
    `${L.form}: ${abs(href(lang, "contact"))}`,
  ]);
}

/** Kop, canonical/taalregel, inhoud en vaste voet (contact + agent-info). */
function doc(lang: Lang, key: RouteKey, slug: string | undefined, title: string, description: string, body: string[]): MarkdownPage {
  const L = labels[lang];
  const canonical = abs(href(lang, key, slug));
  const other: Lang = lang === "nl" ? "en" : "nl";
  const hasOther = isLive(other) && (key === "home" || segments[key][other] !== null);
  const head = [`# ${title}`, `> ${description}`, [`${L.source}: ${canonical}`, `${L.language}: ${L.langName}${hasOther ? ` · ${link(L.otherLang, abs(href(other, key, slug)))}` : ""}`].join("  \n")];
  const foot = [
    "---",
    `**${L.contact}**\n\n${contactLines(lang)}`,
    `**${L.agents}**: ${link("llms.txt", abs(LLMS_PATH))} · ${link("llms-full.txt", abs(LLMS_FULL_PATH))} · ${link(L.sitemap, abs("/sitemap.xml"))}. ${L.agentsLine}`,
  ];
  return { title, description, canonical, markdown: [...head, ...body, ...foot].join("\n\n") + "\n" };
}

function home(lang: Lang): MarkdownPage {
  const { pages, services, work: w } = getDict(lang);
  const t = pages.home;
  return doc(lang, "home", undefined, t.og.title, t.meta.description, [
    t.hero.sub,
    section(t.pijlers.title, bullets(services.pijlers.map((p) => `**${link(p.title, abs(p.href))}** (${p.price}): ${p.body}`))),
    section(t.zoWerkIk.title, bullets(services.zoWerkIk.map((z) => `**${z.title}**: ${z.body}`))),
    section(t.werk.teaserTitle, bullets(work.map((i) => `${link(i.title, item(i, lang))}: ${w.items[i.slug].meta}`)), link(t.werk.all, abs(href(lang, "werk")))),
    section(services.over.title, services.over.body, bullets(services.over.facts), link(pages.over.crumb, abs(href(lang, "over")))),
    section(t.contact.title, t.contact.lead, contactLines(lang)),
  ]);
}

const item = (i: (typeof work)[number], lang: Lang) => {
  const h = workHref(i, lang);
  return h.startsWith("/") ? abs(h) : h;
};

function websites(lang: Lang): MarkdownPage {
  const { pages, services, ui } = getDict(lang);
  const t = pages.websites;
  const from = euro(pricing.website.from);
  const onderhoud = pricing.hosting.find((h) => h.id === "onderhoud")!;
  return doc(lang, "websites", undefined, t.og.title, t.meta.description, [
    t.hero.lead,
    section(t.options.title, bullets(services.websiteOpties.map((o) => `**${o.title}**: ${o.body}`))),
    section(t.included.title, t.included.lead(from), bullets(services.websiteInbegrepen)),
    section(t.price.title(from), t.price.lead(services.websiteNote, euro(onderhoud.monthly)), bullets(t.price.card.bullets), t.price.card.vat),
    section(t.werkwijzeTitle, bullets(services.werkwijze.map((s) => `**${s.n} ${s.title}**: ${s.body}`))),
    section(ui.faq.title, faq(services.websiteFaq)),
    section(t.ctaBand.title, t.ctaBand.body, link(ui.cta.demoLang.label, abs(ui.cta.demoLang.href))),
  ]);
}

function hosting(lang: Lang): MarkdownPage {
  const { pages, services, ui } = getDict(lang);
  const L = labels[lang];
  const t = pages.hosting;
  const mailbox = pricing.addons.find((a) => a.id === "mailbox")!;
  const [one, multi] = mailbox.tiers;
  const plans = liveHosting.map((p) => {
    const c = services.plans[p.id];
    return [
      `### ${c.name}: ${euro(p.monthly)} ${L.perMonth}`,
      c.summary,
      `${L.included}:\n${bullets(c.includes)}`,
      c.excludes.length ? `${L.notIncluded}:\n${bullets(c.excludes)}` : "",
      c.fairUse ?? "",
    ].filter(Boolean).join("\n\n");
  });
  return doc(lang, "hosting", undefined, t.og.title, t.meta.description, [
    t.hero.lead,
    section(t.packages.title, t.packages.lead(euro(one.monthly)), ...plans, `**${t.packages.everyPlan}**\n${bullets(services.hostingAltijd)}`),
    section(
      t.domain.title,
      t.domain.p1(services.domains.included, services.domains.other),
      t.domain.p2(euro(one.monthly), euro(multi.monthly), mailbox.quotaGb, services.mailbox.more),
      `${L.domains}:\n${bullets(pricing.domains.table.map((d) => `${d.tld}: ${euro(d.yearly)} ${L.perYear}`))}`,
      t.domain.note,
    ),
    section(t.switch.title, t.switch.lead, bullets(services.overstappen.map((s) => `**${s.n} ${s.title}**: ${s.body}`))),
    section(ui.faq.title, faq(services.hostingFaq)),
    section(t.ctaBand.title, t.ctaBand.body, link(ui.cta.hosting.label, abs(ui.cta.hosting.href))),
  ]);
}

function hulp(lang: Lang): MarkdownPage {
  const { pages, services, ui } = getDict(lang);
  const L = labels[lang];
  const t = pages.hulp;
  const h = pricing.hulp;
  const tarief = services.hulpTarief;
  const apkPrijs = { "computer-apk": h.apk.computer, "website-apk": h.apk.website } as const;
  return doc(lang, "hulp", undefined, t.og.title, t.meta.description, [
    t.hero.lead,
    section(
      L.rate,
      bullets([`${euro(h.quarter)} ${t.hero.aside.perQuarter}, ${t.hero.aside.vat}`, tarief.billing, tarief.travel, `**${tarief.guarantee.line}** ${t.hero.aside.guaranteeBody}`]),
    ),
    section(
      t.apk.title,
      bullets(t.apk.items.map((a) => `**${a.title}** (${euro(apkPrijs[a.id])}): ${a.body}`)),
      t.apk.card(h.card.quarters, euro(h.card.price), tarief.cardValidity),
    ),
    section(t.help.title, bullets(services.hulpHelp.map((x) => `**${x.title}**: ${x.body}`)), `**${t.help.notTitle}**\n${bullets(services.hulpNiet)}\n\n${t.help.notBody}`),
    section(t.how.title, bullets(services.hulpStappen.map((s) => `**${s.n} ${s.title}**: ${s.body}`)), `**${t.how.homeLead}** ${t.how.homeBody(euro(h.quarter))}`),
    section(ui.faq.title, faq(services.hulpFaq)),
    section(t.ctaBand.title, t.ctaBand.body, link(ui.cta.hulp.label, abs(ui.cta.hulp.href))),
  ]);
}

function werk(lang: Lang): MarkdownPage {
  const { pages, work: w, ui } = getDict(lang);
  const t = pages.werk;
  return doc(lang, "werk", undefined, t.og.title, t.meta.description, [
    t.hero.lead,
    bullets(work.map((i) => `${link(i.title, item(i, lang))}: ${w.items[i.slug].meta}${i.tag ? ` (${ui.workCard.tags[i.tag]})` : ""}`)),
    section(t.ctaBand.title, t.ctaBand.body, link(ui.cta.demoLang.label, abs(ui.cta.demoLang.href))),
  ]);
}

function caseStudy(lang: Lang, slug: string): MarkdownPage | null {
  const c = getCase(slug);
  if (!c) return null;
  const { pages, work: w } = getDict(lang);
  const L = labels[lang];
  const t = pages.case;
  const copy = w.cases[c.slug];
  const others = cases.filter((x) => x.slug !== c.slug);
  return doc(lang, "werk", c.slug, t.metaTitle(c.title, copy.branche, c.plaats), copy.intro, [
    `${L.liveSite}: ${link(c.url, c.url)}`,
    section(t.situation, copy.situatie),
    section(t.approach, bullets(copy.aanpak)),
    section(t.result, bullets(copy.resultaat)),
    copy.quote ? `> ${copy.quote.text}\n> \n> ${copy.quote.author}` : "",
    section(t.others, bullets(others.map((o) => `${link(o.title, abs(href(lang, "werk", o.slug)))}: ${w.cases[o.slug].branche}, ${o.plaats}`))),
  ].filter(Boolean));
}

function over(lang: Lang): MarkdownPage {
  const { pages, services, ui } = getDict(lang);
  const t = pages.over;
  return doc(lang, "over", undefined, t.og.title, t.meta.description, [
    t.hero.lead,
    ...t.sections.map((s) => section(s.title, ...s.paragraphs)),
    bullets(services.over.facts),
    section(t.ctaBand.title, t.ctaBand.body, link(ui.cta.contact.label, abs(ui.cta.contact.href))),
  ]);
}

function contact(lang: Lang): MarkdownPage {
  const { pages, services, ui } = getDict(lang);
  const t = pages.contact;
  return doc(lang, "contact", undefined, t.hero.title, t.meta.description, [
    t.hero.lead,
    section(
      t.direct.eyebrow,
      bullets([
        `${link(ui.footer.whatsapp, whatsapp)} · ${t.direct.whatsappNote}`,
        `${link(telDisplay, `tel:${site.phone}`)} · ${t.direct.callNote}`,
        link(site.email, `mailto:${site.email}`),
      ]),
    ),
    [`**${site.name}**`, t.about.place(site.founder, site.city), site.kvk ? t.about.kvk(site.kvk) : "", t.about.reply].filter(Boolean).join("  \n"),
    section(t.faqTitle, faq(services.contactFaq)),
  ]);
}

function privacy(lang: Lang): MarkdownPage {
  const { pages, legal } = getDict(lang);
  const t = pages.privacy;
  return doc(lang, "privacy", undefined, t.title, t.meta.description, [t.lead, `*${t.versionLine(t.version, t.updated)}*`, componentToMarkdown(legal.PrivacyBody)]);
}

function voorwaarden(lang: Lang): MarkdownPage {
  const { pages, legal } = getDict(lang);
  const t = pages.voorwaarden;
  return doc(lang, "voorwaarden", undefined, t.title, t.meta.description, [t.lead, `*${t.updatedLine(t.updated)}*`, componentToMarkdown(legal.TermsBody)]);
}

function support(slug?: string): MarkdownPage | null {
  const L = labels.nl;
  if (!slug) {
    return doc("nl", "support", undefined, L.supportTitle, L.supportDescription, [
      bullets(supportArticles.map((a) => `${link(a.title, abs(href("nl", "support", a.slug)))} (${a.category}): ${a.summary}`)),
    ]);
  }
  const a = getSupportArticle(slug);
  if (!a) return null;
  return doc("nl", "support", a.slug, a.title, a.summary, [`*${L.updated}: ${a.updated}*`, componentToMarkdown(a.body)]);
}

/** Markdown voor een publiek pad dat `parsePublic` herkend heeft; null als de pagina niet bestaat (onbekende slug). */
export function renderRoute(p: Parsed): MarkdownPage | null {
  switch (p.key) {
    case "home":
      return home(p.lang);
    case "websites":
      return websites(p.lang);
    case "hosting":
      return hosting(p.lang);
    case "hulp":
      return hulp(p.lang);
    case "werk":
      return p.slug ? caseStudy(p.lang, p.slug) : werk(p.lang);
    case "over":
      return over(p.lang);
    case "contact":
      return contact(p.lang);
    case "privacy":
      return privacy(p.lang);
    case "voorwaarden":
      return voorwaarden(p.lang);
    case "support":
      return p.lang === "nl" ? support(p.slug) : null;
  }
}

/** Taal van een pad voor de 404: /en/… is Engels, de rest Nederlands. */
export const langOfPath = (pathname: string): Lang => (pathname === "/en" || pathname.startsWith("/en/") ? "en" : "nl");

/** Markdown-404 met uitleg en links naar homepage, llms.txt, sitemap en contact. */
export function notFoundMarkdown(pathname: string): string {
  const lang = langOfPath(pathname);
  const L = labels[lang];
  const { ui } = getDict(lang);
  return [
    `# 404: ${L.notFound}`,
    L.notFoundLine(pathname),
    ui.notFound.body,
    bullets([
      `${L.home}: ${abs(href(lang, "home"))}`,
      `${L.overview} (llms.txt): ${abs(LLMS_PATH)}`,
      `${L.sitemap}: ${abs("/sitemap.xml")}`,
      `${L.contact}: ${abs(href(lang, "contact"))}`,
    ]),
    L.agentsLine,
  ].join("\n\n") + "\n";
}

/** Alle publieke pagina's, in sitemap-volgorde, per taal. Bron voor llms-full.txt. */
export function allPages(): MarkdownPage[] {
  const out: MarkdownPage[] = [];
  const langs: Lang[] = isLive("en") ? ["nl", "en"] : ["nl"];
  for (const lang of langs) {
    out.push(home(lang), websites(lang), hosting(lang), hulp(lang), werk(lang));
    for (const c of cases) out.push(caseStudy(lang, c.slug)!);
    out.push(over(lang), contact(lang));
    if (lang === "nl") {
      out.push(support()!);
      for (const a of supportArticles) out.push(support(a.slug)!);
    }
    out.push(voorwaarden(lang), privacy(lang));
  }
  return out;
}
