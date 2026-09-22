import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { FaqList } from "@/components/page/FaqList";
import { StickyCallBar } from "@/components/page/StickyCallBar";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { whatsapp, tel, telDisplay } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { href, langOf, type LangParams } from "@/lib/i18n/paths";
import { pricing, euro } from "@/lib/pricing";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "hulp", getDict(lang).pages.hulp.meta);
}

export default async function HulpPage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, services, ui } = getDict(lang);
  const t = pages.hulp;
  const h = pricing.hulp;
  const tarief = services.hulpTarief;
  const apkPrijs = { "computer-apk": h.apk.computer, "website-apk": h.apk.website } as const;
  const apk = (id: "computer-apk" | "website-apk") => t.apk.items.find((a) => a.id === id)!;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.schema.name,
    serviceType: t.schema.serviceType,
    provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name })),
    url: `${site.url}${href(lang, "hulp")}`,
    offers: [
      { "@type": "Offer", name: t.schema.perQuarter, price: h.quarter.toFixed(2), priceCurrency: "EUR", priceSpecification: { "@type": "UnitPriceSpecification", price: h.quarter.toFixed(2), priceCurrency: "EUR", unitText: t.schema.unit, valueAddedTaxIncluded: true } },
      { "@type": "Offer", name: apk("computer-apk").title, price: h.apk.computer.toFixed(2), priceCurrency: "EUR" },
      { "@type": "Offer", name: apk("website-apk").title, price: h.apk.website.toFixed(2), priceCurrency: "EUR" },
      { "@type": "Offer", name: t.schema.card(h.card.quarters), price: h.card.price.toFixed(2), priceCurrency: "EUR" },
    ],
  };

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        lang={lang}
        crumbs={[{ label: t.crumb }]}
        title={t.hero.title}
        lead={t.hero.lead}
        actions={
          <>
            <Button href={tel}>
              {ui.cta.call} {telDisplay}
            </Button>
            <Button href={whatsapp} variant="ghost" target="_blank" rel="noopener noreferrer">
              {ui.cta.whatsapp}
            </Button>
          </>
        }
        aside={
          <div className="rounded-2xl border border-accent/40 bg-panel p-[clamp(22px,2.4vw,30px)] shadow-card-accent">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[12px] uppercase tracking-[0.14em] text-faint">{t.hero.aside.rate}</span>
              <span className="text-[12.5px] text-faint">{t.hero.aside.vat}</span>
            </div>
            <div className="mt-2 font-display text-[clamp(30px,3.2vw,40px)] font-semibold tracking-[-0.03em]">
              {euro(h.quarter)} <span className="text-[16px] font-normal text-muted">{t.hero.aside.perQuarter}</span>
            </div>
            <p className="mt-3 text-[14.5px] leading-[1.55] text-muted">
              {tarief.billing} {tarief.travel}
            </p>
            <div className="mt-5 border-t border-line pt-5">
              <p className="font-display text-[18px] font-semibold text-ink">{tarief.guarantee.line}</p>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-muted">{t.hero.aside.guaranteeBody}</p>
            </div>
          </div>
        }
      />

      <Section id="apk">
        <Container>
          <Reveal>
            <SectionTitle className="mb-[54px] max-w-[720px]">{t.apk.title}</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-2">
            {t.apk.items.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-[clamp(24px,2.6vw,34px)]">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[clamp(22px,2.2vw,26px)] font-semibold tracking-[-0.02em]">{a.title}</h3>
                    <span className="font-display text-[clamp(24px,2.4vw,30px)] font-semibold tracking-[-0.02em]">{euro(apkPrijs[a.id as keyof typeof apkPrijs])}</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-[1.6] text-muted">{a.body}</p>
                  <div className="mt-auto pt-6">
                    <Button href={`${ui.cta.hulp.href}&pakket=${a.id}`} variant="ghost">
                      {t.apk.plan(a.title)}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 text-[14px] text-faint">{t.apk.card(h.card.quarters, euro(h.card.price), tarief.cardValidity)}</p>
          </Reveal>
        </Container>
      </Section>

      <Section id="waar-ik-bij-help" variant="base">
        <Container>
          <Reveal>
            <Eyebrow>{t.help.eyebrow}</Eyebrow>
            <SectionTitle className="mb-[54px] max-w-[720px]">{t.help.title}</SectionTitle>
          </Reveal>
          {/* Zelfde vorm als "Zo werk ik" op de homepage: punt, kop, één regel. Geen kaders voor een opsomming. */}
          <div className="grid grid-cols-1 gap-x-[clamp(24px,4vw,48px)] gap-y-8 min-[561px]:grid-cols-2">
            {services.hulpHelp.map((x, i) => (
              <Reveal key={x.title} delay={(i % 2) * 60} className="flex items-start gap-[14px]">
                <span className="mt-2 h-[9px] w-[9px] flex-none rounded-full bg-accent shadow-dot" aria-hidden />
                <div>
                  <h3 className="mb-[6px] font-display text-[17px] font-semibold">{x.title}</h3>
                  <p className="text-[14.5px] leading-[1.55] text-muted">{x.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-12 grid grid-cols-1 gap-8 rounded-2xl border border-line p-[clamp(22px,2.6vw,34px)] min-[901px]:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h3 className="font-display text-[20px] font-semibold tracking-[-0.01em]">{t.help.notTitle}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">{t.help.notBody}</p>
              </div>
              <ul className="grid grid-cols-1 gap-2.5 self-center text-[14.5px] text-muted min-[561px]:grid-cols-2">
                {services.hulpNiet.map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <span className="mt-[8px] h-[6px] w-[6px] flex-none rounded-full border border-line" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="hoe-het-werkt">
        <Container>
          <Reveal>
            <SectionTitle className="mb-14 max-w-[720px]">{t.how.title}</SectionTitle>
            <div className="grid grid-cols-1 gap-[clamp(24px,4vw,56px)] min-[901px]:grid-cols-3">
              {services.hulpStappen.map((s) => (
                <div key={s.n}>
                  <div className="mb-[18px] flex items-center gap-[14px]">
                    <span className="h-[11px] w-[11px] rounded-full bg-accent shadow-dot" aria-hidden />
                    <span className="font-mono text-[13px] text-faint">{s.n}</span>
                  </div>
                  <h3 className="mb-[10px] font-display text-[20px] font-semibold">{s.title}</h3>
                  <p className="max-w-[300px] text-[15px] leading-[1.6] text-muted">{s.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-14 max-w-[60ch] text-[15px] leading-[1.65] text-muted">
              <span className="text-ink">{t.how.homeLead}</span>
              {" "}
              {t.how.homeBody(euro(h.quarter))}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section id="faq" variant="base">
        <Container>
          <Reveal className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>{ui.faq.eyebrow}</Eyebrow>
              <SectionTitle className="max-w-[12ch]">{ui.faq.title}</SectionTitle>
            </div>
            <FaqList items={services.hulpFaq} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand lang={lang} title={t.ctaBand.title} body={t.ctaBand.body} label={ui.cta.hulp.label} href={ui.cta.hulp.href} />
      <StickyCallBar afterId="apk" untilId="cta" labels={ui.stickyBar} />
      <WhatsAppFab afterId="apk" untilId="cta" className="max-[900px]:hidden" label={ui.fab.label} aria={ui.fab.aria} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
