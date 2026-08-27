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
import { cta } from "@/lib/content";
import { pricing, euro } from "@/lib/pricing";
import { pijlers, websiteOpties, websiteInbegrepen, websiteFaq } from "@/lib/services";
import { cases } from "@/lib/work";

const title = "Website laten maken in de Hoeksche Waard | HitzDigital";
const description =
  "Een moderne website voor je bedrijf, vanaf €250 incl. btw. Je ziet eerst een gratis demo van je eigen homepage, daarna beslis je. Voor vakbedrijven en horeca in de Hoeksche Waard.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/websites" },
  openGraph: { title, description, url: "/websites", type: "website" },
};

export default function WebsitesPage() {
  const hosting = pijlers.find((p) => p.id === "hosting")!;
  const onderhoud = pricing.hosting.find((h) => h.id === "onderhoud")!;
  const voorNa = cases.find((c) => c.voorNa);

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        crumbs={[{ label: "Websites" }]}
        title={
          <>
            Een website die direct <em className="hd-accent-word not-italic text-accent">professioneler</em> voelt.
          </>
        }
        lead="Voor cafés, schilders, installateurs, hoveniers en andere vakbedrijven in de Hoeksche Waard. Je ziet eerst een echte demo van je eigen site. Daarna beslis je."
        actions={
          <>
            <Button href={cta.demoLang.href}>{cta.demoLang.label}</Button>
            <Button href="/werk" variant="ghost">
              Bekijk mijn werk
            </Button>
          </>
        }
        aside={
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line shadow-card">
            <Image
              src="/images/werk/mourits-desktop.webp"
              alt="Website van Mourits Schilderwerken op desktop"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              className="object-cover object-top"
            />
          </div>
        }
      />

      <Werkwijze />

      <Section id="nieuw-of-vernieuwen">
        <Container>
          <Reveal>
            <Eyebrow>Nieuw of vernieuwen</Eyebrow>
            <SectionTitle className="mb-[54px] max-w-[720px]">Twee vertrekpunten, één aanpak.</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-2">
            {websiteOpties.map((o, i) => (
              <Reveal key={o.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-[clamp(24px,2.6vw,34px)]">
                  <h3 className="mb-[10px] font-display text-[clamp(22px,2.2vw,26px)] font-semibold tracking-[-0.02em]">
                    {o.title}
                  </h3>
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
              <Eyebrow>Wat je krijgt</Eyebrow>
              <SectionTitle className="max-w-[14ch]">Alles wat een goede site nodig heeft.</SectionTitle>
              <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.65] text-muted">
                Geen losse opties of verrassingen achteraf. Dit zit er standaard bij, ook bij een site vanaf{" "}
                {euro(pricing.website.from)}.
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-3 self-center min-[561px]:grid-cols-2">
              {websiteInbegrepen.map((x) => (
                <li key={x} className="flex items-start gap-3 rounded-xl border border-line bg-panel/60 px-4 py-3 text-[14.5px] leading-[1.5]">
                  <span className="mt-[7px] h-[7px] w-[7px] flex-none rounded-full bg-accent" aria-hidden />
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
              <Eyebrow>Wat kost het</Eyebrow>
              <SectionTitle className="max-w-[16ch]">Een complete website vanaf {euro(pricing.website.from)}.</SectionTitle>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.65] text-muted">
                Incl. btw. {pricing.website.note} Wil je dat ik hem ook online houd? Hosting & onderhoud is{" "}
                {euro(onderhoud.monthly)} per maand, inclusief je .nl-domein en een kleine wijziging per maand.
                Maandelijks opzegbaar.
              </p>
              <div className="mt-8 flex flex-wrap gap-[14px]">
                <Button href={cta.demoLang.href}>{cta.demoLang.label}</Button>
                <Button href={hosting.live ? hosting.href : "/#pijlers"} variant="ghost">
                  Meer over hosting
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-panel p-[clamp(24px,2.6vw,34px)]">
              <div className="flex items-baseline justify-between border-b border-line pb-4">
                <span className="font-display text-[18px] font-semibold">Website</span>
                <span className="font-display text-[clamp(26px,2.6vw,32px)] font-semibold tracking-[-0.02em]">
                  vanaf {euro(pricing.website.from)}
                </span>
              </div>
              <ul className="mt-4 flex flex-col gap-2 text-[14.5px] text-muted">
                <li>Gratis demo van je homepage vooraf</li>
                <li>Complete site, op je eigen domein</li>
                <li>Teksten en foto&apos;s geregeld</li>
                <li>Zelf aan te passen</li>
              </ul>
              <div className="mt-6 flex items-baseline justify-between border-t border-line pt-4 text-[14.5px]">
                <span className="text-muted">Hosting & onderhoud</span>
                <span className="text-ink">{euro(onderhoud.monthly)} per maand</span>
              </div>
              <p className="mt-3 text-[12.5px] text-faint">Alle prijzen incl. 21% btw.</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {voorNa?.voorNa && (
        <Section id="voor-na" variant="base">
          <Container>
            <Reveal className="grid grid-cols-1 items-center gap-12 min-[901px]:grid-cols-[1fr_0.9fr]">
              <div>
                <Eyebrow>Voor en na</Eyebrow>
                <SectionTitle className="max-w-[16ch]">Van verouderd naar verzorgd.</SectionTitle>
                <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.65] text-muted">
                  {voorNa.title}, {voorNa.branche.toLowerCase()} in {voorNa.plaats}. Sleep de greep om de oude en de nieuwe site te
                  vergelijken, precies zoals je klant ze op zijn telefoon ziet.
                </p>
                <a href={`/werk/${voorNa.slug}`} className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-ink underline-offset-4 hover:underline">
                  Lees de hele case <span aria-hidden>→</span>
                </a>
              </div>
              <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[22px] border border-line shadow-card">
                <BeforeAfterSlider
                  beforeSrc={voorNa.voorNa.voor}
                  afterSrc={voorNa.voorNa.na}
                  beforeAlt={voorNa.voorNa.voorAlt}
                  afterAlt={voorNa.voorNa.naAlt}
                  className="aspect-[3/4]"
                />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      <Section id="faq">
        <Container>
          <Reveal className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>Veelgestelde vragen</Eyebrow>
              <SectionTitle className="max-w-[12ch]">Wat mensen me vaak vragen.</SectionTitle>
            </div>
            <FaqList items={websiteFaq} />
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Benieuwd hoe jouw website eruit kan zien?"
        body="Stuur je huidige site of vertel kort wat je doet. Je krijgt een echte demo van je homepage, gratis en zonder verplichtingen."
        label={cta.demoLang.label}
        href={cta.demoLang.href}
      />
      <WhatsAppFab afterId="nieuw-of-vernieuwen" untilId="cta" />
    </main>
  );
}
