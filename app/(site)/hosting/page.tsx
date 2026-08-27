import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { FaqList } from "@/components/page/FaqList";
import { PlanCard } from "@/components/page/PlanCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { pricing, euro } from "@/lib/pricing";
import { hostingAltijd, hostingFaq, overstappen } from "@/lib/services";
import { site } from "@/lib/site";

const title = "Hosting, domein en onderhoud voor je website | HitzDigital";
const description =
  "Hosting vanaf €5 per maand, onderhoud met domein en een kleine wijziging per maand voor €15, webshopbeheer voor €30. Maandelijks opzegbaar, alles incl. btw. Overstappen regel ik.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hosting" },
  openGraph: { title, description, url: "/hosting", type: "website" },
};

export default function HostingPage() {
  const mailbox = pricing.addons[0];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hosting, domein en onderhoud",
    serviceType: "Webhosting en websiteonderhoud",
    provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    areaServed: "NL",
    url: `${site.url}/hosting`,
    offers: pricing.hosting.map((h) => ({
      "@type": "Offer",
      name: h.name,
      description: h.summary,
      price: h.monthly.toFixed(2),
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: h.monthly.toFixed(2),
        priceCurrency: "EUR",
        unitText: "maand",
        valueAddedTaxIncluded: true,
      },
    })),
  };

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        crumbs={[{ label: "Hosting & domeinen" }]}
        title={
          <>
            Online blijven, <em className="hd-accent-word not-italic text-accent">zonder gedoe</em>.
          </>
        }
        lead="Domein, hosting, e-mail en een kleine wijziging per maand in één bedrag. Maandelijks opzegbaar. En als er iets is, app je mij, geen ticketsysteem."
        actions={
          <>
            <Button href="#pakketten">Kies je pakket</Button>
            <Button href="#overstappen" variant="ghost">
              Overstappen? Ik regel het
            </Button>
          </>
        }
        aside={
          <div className="rounded-2xl border border-line bg-panel p-[clamp(22px,2.4vw,30px)]">
            <p className="text-[12px] uppercase tracking-[0.14em] text-faint">Zit er altijd bij</p>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 text-[14.5px] min-[561px]:grid-cols-2">
              {hostingAltijd.map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <span className="mt-[8px] h-[6px] w-[6px] flex-none rounded-full bg-accent" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section id="pakketten">
        <Container>
          <Reveal>
            <Eyebrow>Pakketten</Eyebrow>
            <SectionTitle className="mb-4 max-w-[720px]">Drie pakketten, één maandbedrag.</SectionTitle>
            <p className="mb-[54px] max-w-[52ch] text-[16px] leading-[1.65] text-muted">
              Alle prijzen incl. 21% btw en maandelijks opzegbaar. Betalen per maand of per jaar, wat jij prettig vindt.
              Een zakelijke mailbox op je eigen domein kan bij elk pakket voor {euro(mailbox.monthly)} per maand extra.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-3">
            {pricing.hosting.map((h, i) => (
              <Reveal key={h.id} delay={i * 80}>
                <PlanCard plan={h} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-[18px] flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-panel/60 px-[clamp(20px,2.4vw,30px)] py-5">
              <div>
                <span className="font-display text-[17px] font-semibold">{mailbox.name}</span>
                <span className="ml-3 text-[14px] text-muted">{mailbox.summary} Bij elk pakket.</span>
              </div>
              <span className="font-display text-[20px] font-semibold tracking-[-0.02em]">
                {euro(mailbox.monthly)} <span className="text-[13px] font-normal text-muted">per {mailbox.per} per maand</span>
              </span>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="domein-en-email" variant="base">
        <Container>
          <Reveal className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[1fr_1fr]">
            <div>
              <Eyebrow>Domeinnaam & e-mail</Eyebrow>
              <SectionTitle className="max-w-[16ch]">Je domein op jouw naam.</SectionTitle>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.65] text-muted">
                {pricing.domains.included} Kies je alleen hosting, dan registreer of verleng ik je .nl-domein los.
                Ik beheer het, jij blijft de eigenaar. {pricing.domains.other}
              </p>
              <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.65] text-muted">
                Zakelijke e-mail op je eigen domein (jij@jouwbedrijf.nl) is {euro(mailbox.monthly)} per mailbox per maand,
                met agenda en spamfilter, werkend op je telefoon en laptop.
              </p>
            </div>
            <div className="self-center rounded-2xl border border-line bg-panel p-[clamp(22px,2.4vw,30px)]">
              <table className="w-full text-[15px]">
                <tbody className="divide-y divide-line">
                  {pricing.domains.table.map((d) => (
                    <tr key={d.tld}>
                      <td className="py-3 font-mono text-[14px] text-ink">{d.tld}</td>
                      <td className="py-3 text-muted">domein, per jaar</td>
                      <td className="py-3 text-right text-ink">{euro(d.yearly)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-3 font-mono text-[14px] text-ink">@</td>
                    <td className="py-3 text-muted">zakelijke mailbox, per maand</td>
                    <td className="py-3 text-right text-ink">{euro(mailbox.monthly)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-4 text-[12.5px] text-faint">Incl. 21% btw. Andere extensies op aanvraag.</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="overstappen">
        <Container>
          <Reveal>
            <Eyebrow>Overstappen</Eyebrow>
            <SectionTitle className="mb-4 max-w-[720px]">Weg bij je huidige hoster? Ik regel het.</SectionTitle>
            <p className="mb-14 max-w-[52ch] text-[16px] leading-[1.65] text-muted">
              Ook als je site niet door mij gebouwd is. Je hoeft zelf niets over te zetten en er ligt niets uit.
            </p>
            <div className="grid grid-cols-1 gap-[clamp(24px,4vw,56px)] min-[901px]:grid-cols-3">
              {overstappen.map((s) => (
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
            <FaqList items={hostingFaq} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Zeker weten dat je site gewoon werkt?"
        body="Vertel kort waar je site en domein nu staan. Ik laat je weten wat het wordt en regel de overstap."
        label="Vraag hosting aan"
        href="/contact?voor=hosting"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
