import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { FaqList } from "@/components/page/FaqList";
import { StickyCallBar } from "@/components/page/StickyCallBar";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { cta, whatsapp, tel, telDisplay } from "@/lib/content";
import { pricing, euro } from "@/lib/pricing";
import { hulpHelp, hulpNiet, hulpStappen, hulpFaq } from "@/lib/services";
import { site } from "@/lib/site";

const title = "Computer- en websitehulp in de Hoeksche Waard | HitzDigital";
const description =
  "Vastgelopen? Ik kijk direct mee. Hulp bij computer, e-mail, domein, netwerk of website, op afstand of aan huis in de Hoeksche Waard. €15 per kwartier incl. btw. Niet opgelost? Dan betaal je niets.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hulp" },
  openGraph: { title, description, url: "/hulp", type: "website" },
};

export default function HulpPage() {
  const h = pricing.hulp;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Computer- en websitehulp",
    serviceType: "Computerhulp en websiteondersteuning",
    provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name })),
    url: `${site.url}/hulp`,
    offers: [
      { "@type": "Offer", name: "Hulp per kwartier", price: h.quarter.toFixed(2), priceCurrency: "EUR", priceSpecification: { "@type": "UnitPriceSpecification", price: h.quarter.toFixed(2), priceCurrency: "EUR", unitText: "kwartier", valueAddedTaxIncluded: true } },
      { "@type": "Offer", name: "Computer APK", price: h.apk.computer.toFixed(2), priceCurrency: "EUR" },
      { "@type": "Offer", name: "Website APK", price: h.apk.website.toFixed(2), priceCurrency: "EUR" },
      { "@type": "Offer", name: `Strippenkaart ${h.card.quarters} kwartier`, price: h.card.price.toFixed(2), priceCurrency: "EUR" },
    ],
  };

  return (
    <main id="main" className="relative z-[2] bg-deep pb-[76px] min-[901px]:pb-0">
      <PageHero
        crumbs={[{ label: "Hulp" }]}
        title={
          <>
            Vastgelopen? Ik kijk <em className="hd-accent-word not-italic text-accent">direct</em> mee.
          </>
        }
        lead="Voor ondernemers in de Hoeksche Waard, en ook gewoon thuis. Je laptop, je mail, je domein, je netwerk of je website: ik los het op, in gewone taal. Meestal op afstand, binnen een kwartier begonnen. Moet ik langskomen? Dan kom ik langs."
        actions={
          <>
            <Button href={tel}>Bel {telDisplay}</Button>
            <Button href={whatsapp} variant="ghost" target="_blank" rel="noopener noreferrer">
              App via WhatsApp
            </Button>
          </>
        }
        aside={
          <div className="rounded-2xl border border-accent/40 bg-panel p-[clamp(22px,2.4vw,30px)] shadow-card-accent">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[12px] uppercase tracking-[0.14em] text-faint">Tarief</span>
              <span className="text-[12.5px] text-faint">incl. btw</span>
            </div>
            <div className="mt-2 font-display text-[clamp(30px,3.2vw,40px)] font-semibold tracking-[-0.03em]">
              {euro(h.quarter)} <span className="text-[16px] font-normal text-muted">per kwartier</span>
            </div>
            <p className="mt-3 text-[14.5px] leading-[1.55] text-muted">{h.billing} {h.travel}</p>
            <div className="mt-5 border-t border-line pt-5">
              <p className="font-display text-[18px] font-semibold text-ink">{h.guarantee.line}</p>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-muted">
                We spreken vooraf af wat het probleem is. Los ik het niet op, dan kost het je niks.
              </p>
            </div>
          </div>
        }
      />

      <Section id="apk">
        <Container>
          <Reveal>
            <Eyebrow>Twee vaste checks</Eyebrow>
            <SectionTitle className="mb-[54px] max-w-[720px]">Eén vaste prijs, geen verrassingen.</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-2">
            {[
              {
                title: "Computer APK",
                price: h.apk.computer,
                body: "Updates en opschonen, virus- en malwarescan, snelheidscheck, back-up en wachtwoorden met tweestapsverificatie gecheckt. Je krijgt een kort lijstje met wat ik gedaan heb en wat je zelf nog kunt doen. Ongeveer 45 minuten, op afstand of aan huis.",
                href: `${cta.hulp.href}&pakket=computer-apk`,
              },
              {
                title: "Website APK",
                price: h.apk.website,
                body: "Snelheid, mobiel, vindbaarheid, SSL, back-ups en verouderde plugins, met een kort rapport in gewone taal. Ook als ik je site niet gebouwd heb. Valt de uitslag tegen? Dan maak ik gratis een demo van hoe het wél kan.",
                href: `${cta.hulp.href}&pakket=website-apk`,
              },
            ].map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-[clamp(24px,2.6vw,34px)]">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[clamp(22px,2.2vw,26px)] font-semibold tracking-[-0.02em]">{a.title}</h3>
                    <span className="font-display text-[clamp(24px,2.4vw,30px)] font-semibold tracking-[-0.02em]">{euro(a.price)}</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-[1.6] text-muted">{a.body}</p>
                  <div className="mt-auto pt-6">
                    <Button href={a.href} variant="ghost">
                      Plan een {a.title}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 text-[14px] text-faint">
              Vaker hulp nodig? Strippenkaart: {h.card.quarters} kwartier voor {euro(h.card.price)}, {h.card.validity}.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section id="waar-ik-bij-help" variant="base">
        <Container>
          <Reveal>
            <Eyebrow>Waar ik bij help</Eyebrow>
            <SectionTitle className="mb-[54px] max-w-[720px]">Van mailbox tot kantoornetwerk.</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 gap-[14px] min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
            {hulpHelp.map((x, i) => (
              <Reveal key={x.title} delay={(i % 3) * 60}>
                <div className="h-full rounded-2xl border border-line bg-panel/60 p-6">
                  <h3 className="font-display text-[17px] font-semibold">{x.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">{x.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-12 grid grid-cols-1 gap-8 rounded-2xl border border-line p-[clamp(22px,2.6vw,34px)] min-[901px]:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h3 className="font-display text-[20px] font-semibold tracking-[-0.01em]">Wat ik niet doe</h3>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">
                  Daar verwijs ik je door naar iemand die dat wél goed doet. Twijfel je of iets erbij hoort? App even, dan
                  zeg ik eerlijk of ik het kan.
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-2.5 self-center text-[14.5px] text-muted min-[561px]:grid-cols-2">
                {hulpNiet.map((x) => (
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
            <Eyebrow>Hoe het werkt</Eyebrow>
            <SectionTitle className="mb-14 max-w-[720px]">Bellen, meekijken, opgelost.</SectionTitle>
            <div className="grid grid-cols-1 gap-[clamp(24px,4vw,56px)] min-[901px]:grid-cols-3">
              {hulpStappen.map((s) => (
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
              <span className="text-ink">Ook thuis vastgelopen?</span> Ik help ook particulieren in de Hoeksche Waard,
              tegen hetzelfde tarief: {euro(h.quarter)} per kwartier, incl. btw.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section id="faq" variant="base">
        <Container>
          <Reveal className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>Veelgestelde vragen</Eyebrow>
              <SectionTitle className="max-w-[12ch]">Wat mensen me vaak vragen.</SectionTitle>
            </div>
            <FaqList items={hulpFaq} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Zit je nu vast?"
        body="Bel of app, dan kijk ik direct mee. Liever eerst een bericht? Vertel kort wat er speelt."
        label={cta.hulp.label}
        href={cta.hulp.href}
      />
      <StickyCallBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
