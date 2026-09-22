import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { FaqList } from "@/components/page/FaqList";
import { Werkwijze } from "@/components/sections/Werkwijze";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfterSlider } from "@/components/mock/BeforeAfterSlider";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { href, langOf, type LangParams } from "@/lib/i18n/paths";
import { pricing, euro } from "@/lib/pricing";
import { cases } from "@/lib/work";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "websites", getDict(lang).pages.websites.meta);
}

export default async function WebsitesPage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, services, ui, work: w } = getDict(lang);
  const t = pages.websites;
  const onderhoud = pricing.hosting.find((h) => h.id === "onderhoud")!;
  const voorNa = cases.find((c) => c.voorNa);
  const voorNaCopy = voorNa ? w.cases[voorNa.slug] : undefined;

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        lang={lang}
        crumbs={[{ label: t.crumb }]}
        title={t.hero.title}
        lead={t.hero.lead}
        actions={
          <>
            <Button href={ui.cta.demoLang.href}>{ui.cta.demoLang.label}</Button>
            <Button href={href(lang, "werk")} variant="ghost">
              {t.hero.secondary}
            </Button>
          </>
        }
        aside={
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line shadow-card">
            <Image src="/images/werk/mourits-desktop.webp" alt={t.hero.asideAlt} fill priority sizes="(max-width: 900px) 100vw, 45vw" className="object-cover object-top" />
          </div>
        }
      />

      <Werkwijze lang={lang} />

      <Section id="nieuw-of-vernieuwen">
        <Container>
          <Reveal>
            <SectionTitle className="mb-[54px] max-w-[720px]">{t.options.title}</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-2">
            {services.websiteOpties.map((o, i) => (
              <Reveal key={o.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-[clamp(24px,2.6vw,34px)]">
                  <span className="mb-[16px] block font-mono text-[12px] leading-none text-accent">0{i + 1}</span>
                  <h3 className="mb-[10px] font-display text-[clamp(22px,2.2vw,26px)] font-semibold tracking-[-0.02em]">{o.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-muted">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="wat-je-krijgt" variant="base">
        <Container>
          <Reveal className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionTitle className="max-w-[14ch]">{t.included.title}</SectionTitle>
              <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.65] text-muted">{t.included.lead(euro(pricing.website.from))}</p>
            </div>
            {/* Opsomming zonder kaders: een kader staat op deze site voor iets wat je kunt kopen of kiezen. */}
            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 self-center text-[15px] leading-[1.55] min-[561px]:grid-cols-2">
              {services.websiteInbegrepen.map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <span className="mt-[8px] h-[7px] w-[7px] flex-none rounded-full bg-accent" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section id="wat-kost-het">
        <Container>
          <Reveal className="grid grid-cols-1 items-center gap-12 min-[901px]:grid-cols-[1fr_1fr]">
            <div>
              <SectionTitle className="max-w-[16ch]">{t.price.title(euro(pricing.website.from))}</SectionTitle>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.65] text-muted">{t.price.lead(services.websiteNote, euro(onderhoud.monthly))}</p>
              <div className="mt-8 flex flex-wrap gap-[14px]">
                <Button href={ui.cta.demoLang.href}>{ui.cta.demoLang.label}</Button>
                <Button href={href(lang, "hosting")} variant="ghost">
                  {t.price.moreHosting}
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-panel p-[clamp(24px,2.6vw,34px)]">
              <div className="flex items-baseline justify-between border-b border-line pb-4">
                <span className="font-display text-[18px] font-semibold">{t.price.card.name}</span>
                <span className="font-display text-[clamp(26px,2.6vw,32px)] font-semibold tracking-[-0.02em]">{t.price.card.from(euro(pricing.website.from))}</span>
              </div>
              <ul className="mt-4 flex flex-col gap-2 text-[14.5px] text-muted">
                {t.price.card.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="mt-6 flex items-baseline justify-between border-t border-line pt-4 text-[14.5px]">
                <span className="text-muted">{t.price.card.hostingRow}</span>
                <span className="text-ink">{t.price.card.perMonth(euro(onderhoud.monthly))}</span>
              </div>
              <p className="mt-3 text-[12.5px] text-faint">{t.price.card.vat}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {voorNa?.voorNa && voorNaCopy?.voorNaAlt && (
        <Section id="voor-na" variant="base">
          <Container>
            <Reveal className="grid grid-cols-1 items-center gap-12 min-[901px]:grid-cols-[1fr_0.9fr]">
              <div>
                <Eyebrow>{t.voorNa.eyebrow}</Eyebrow>
                <SectionTitle className="max-w-[16ch]">{t.voorNa.title}</SectionTitle>
                <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.65] text-muted">{t.voorNa.lead(voorNa.title, voorNaCopy.branche, voorNa.plaats)}</p>
                <a href={href(lang, "werk", voorNa.slug)} className="mt-5 inline-flex items-center gap-2 py-1 text-[15px] font-medium text-ink underline-offset-4 hover:underline">
                  {t.voorNa.link} <ArrowRight size={16} weight="bold" aria-hidden />
                </a>
              </div>
              <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[22px] border border-line shadow-card">
                <BeforeAfterSlider beforeSrc={voorNa.voorNa.voor} afterSrc={voorNa.voorNa.na} beforeAlt={voorNaCopy.voorNaAlt.voor} afterAlt={voorNaCopy.voorNaAlt.na} className="aspect-[3/4]" />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      <Section id="faq">
        <Container>
          <Reveal className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>{ui.faq.eyebrow}</Eyebrow>
              <SectionTitle className="max-w-[12ch]">{ui.faq.title}</SectionTitle>
            </div>
            <FaqList items={services.websiteFaq} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand lang={lang} title={t.ctaBand.title} body={t.ctaBand.body} label={ui.cta.demoLang.label} href={ui.cta.demoLang.href} />
      <WhatsAppFab afterId="nieuw-of-vernieuwen" untilId="cta" label={ui.fab.label} aria={ui.fab.aria} />
    </main>
  );
}
