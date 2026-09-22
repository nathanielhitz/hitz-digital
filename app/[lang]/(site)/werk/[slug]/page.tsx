import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfterSlider } from "@/components/mock/BeforeAfterSlider";
import { WerkCard } from "@/components/sections/WerkCard";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { href, langOf, type SlugParams } from "@/lib/i18n/paths";
import { site } from "@/lib/site";
import { cases, getCase, work } from "@/lib/work";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = langOf(raw);
  const c = getCase(slug);
  if (!c) return {};
  const { pages, work: w } = getDict(lang);
  const copy = w.cases[c.slug];
  return pageMetadata(
    lang,
    "werk",
    { title: pages.case.metaTitle(c.title, copy.branche, c.plaats), description: copy.intro },
    { slug: c.slug, type: "article" },
  );
}

export default async function CasePage({ params }: SlugParams) {
  const { lang: raw, slug } = await params;
  const lang = langOf(raw);
  const c = getCase(slug);
  if (!c) notFound();
  const { pages, ui, work: w } = getDict(lang);
  const t = pages.case;
  const copy = w.cases[c.slug];
  const others = work.filter((x) => x.client && x.slug !== c.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: t.schemaName(c.title),
    description: copy.intro,
    url: `${site.url}${href(lang, "werk", c.slug)}`,
    image: `${site.url}${c.desktop}`,
    creator: { "@type": "ProfessionalService", name: site.name, url: site.url },
    about: { "@type": "Organization", name: c.title, url: c.url },
  };

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        lang={lang}
        crumbs={[{ label: pages.werk.crumb, href: href(lang, "werk") }, { label: c.title }]}
        title={c.title}
        lead={copy.intro}
        actions={
          <>
            <Button href={c.url} variant="ghost" target="_blank" rel="noopener noreferrer">
              {t.viewSite}
            </Button>
            <span className="text-[13.5px] text-faint">{`${copy.branche} · ${c.plaats}`}</span>
          </>
        }
      />

      <section className="px-[clamp(20px,5vw,64px)] pb-6 md:pb-10">
        <Container>
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line shadow-photo">
              <Image src={c.desktop} alt={t.desktopAlt(c.title)} fill priority sizes="(max-width: 1140px) 100vw, 1140px" className="object-cover object-top" />
            </div>
          </Reveal>
        </Container>
      </section>

      <Section id="case" variant="base">
        <Container>
          <div className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-3">
            <Reveal>
              <h3 className="mb-4 font-display text-[15px] font-semibold text-ink">{t.situation}</h3>
              <p className="text-[16px] leading-[1.7] text-muted">{copy.situatie}</p>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="mb-4 font-display text-[15px] font-semibold text-ink">{t.approach}</h3>
              <ul className="flex flex-col gap-3 text-[15px] leading-[1.6] text-muted">
                {copy.aanpak.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <span className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full bg-accent" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={160}>
              <h3 className="mb-4 font-display text-[15px] font-semibold text-ink">{t.result}</h3>
              <ul className="flex flex-col gap-3 text-[15px] leading-[1.6] text-ink">
                {copy.resultaat.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full bg-accent" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {c.voorNa && copy.voorNaAlt && (
        <Section>
          <Container>
            <Reveal className="grid grid-cols-1 items-center gap-12 min-[901px]:grid-cols-[1fr_0.9fr]">
              <div>
                <Eyebrow>{t.voorNa.eyebrow}</Eyebrow>
                <SectionTitle className="max-w-[16ch]">{t.voorNa.title}</SectionTitle>
                <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.65] text-muted">{t.voorNa.lead}</p>
              </div>
              <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[22px] border border-line shadow-card">
                <BeforeAfterSlider beforeSrc={c.voorNa.voor} afterSrc={c.voorNa.na} beforeAlt={copy.voorNaAlt.voor} afterAlt={copy.voorNaAlt.na} className="aspect-[3/4]" />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {copy.quote && (
        <Section variant="base">
          <Container>
            <Reveal className="mx-auto max-w-[760px] text-center">
              <p className="font-display text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.35] tracking-[-0.02em]">&ldquo;{copy.quote.text}&rdquo;</p>
              <p className="mt-5 text-[14px] text-muted">{copy.quote.author}</p>
            </Reveal>
          </Container>
        </Section>
      )}

      {others.length > 0 && (
        <Section>
          <Container>
            <Reveal>
              <SectionTitle className="mb-[44px]">{t.others}</SectionTitle>
              <div className="grid grid-cols-1 gap-[22px] min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
                {others.map((item) => (
                  <WerkCard key={item.slug} item={item} lang={lang} text={w.items[item.slug]} labels={ui.workCard} />
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      <CtaBand lang={lang} title={pages.werk.ctaBand.title} body={pages.werk.ctaBand.body} label={ui.cta.demoLang.label} href={ui.cta.demoLang.href} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WhatsAppFab afterId="case" untilId="cta" label={ui.fab.label} aria={ui.fab.aria} />
    </main>
  );
}
