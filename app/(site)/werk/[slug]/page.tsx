import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfterSlider } from "@/components/mock/BeforeAfterSlider";
import { WerkCard } from "@/components/sections/WerkCard";
import { cta } from "@/lib/content";
import { site } from "@/lib/site";
import { cases, getCase, work } from "@/lib/work";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  const title = `Website voor ${c.title}, ${c.branche.toLowerCase()} in ${c.plaats} | HitzDigital`;
  return {
    title,
    description: c.intro,
    alternates: { canonical: `/werk/${c.slug}` },
    openGraph: { title, description: c.intro, url: `/werk/${c.slug}`, type: "article" },
  };
}

export default async function CasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  const others = work.filter((w) => w.client && w.slug !== c.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `Website voor ${c.title}`,
    description: c.intro,
    url: `${site.url}/werk/${c.slug}`,
    image: `${site.url}${c.desktop}`,
    creator: { "@type": "ProfessionalService", name: site.name, url: site.url },
    about: { "@type": "Organization", name: c.title, url: c.url },
  };

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        crumbs={[{ label: "Werk", href: "/werk" }, { label: c.title }]}
        title={c.title}
        lead={c.intro}
        actions={
          <>
            <Button href={c.url} variant="ghost" target="_blank" rel="noopener noreferrer">
              Bekijk de site
            </Button>
            <span className="text-[13.5px] text-faint">{c.kicker}</span>
          </>
        }
      />

      <section className="px-[clamp(20px,5vw,64px)] pb-[clamp(56px,8vw,96px)]">
        <Container>
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line shadow-photo">
              <Image
                src={c.desktop}
                alt={`Website van ${c.title} op desktop`}
                fill
                priority
                sizes="(max-width: 1140px) 100vw, 1140px"
                className="object-cover object-top"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <Section variant="base">
        <Container>
          <div className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-3">
            <Reveal>
              <Eyebrow>Situatie</Eyebrow>
              <p className="text-[16px] leading-[1.7] text-muted">{c.situatie}</p>
            </Reveal>
            <Reveal delay={80}>
              <Eyebrow>Aanpak</Eyebrow>
              <ul className="flex flex-col gap-3 text-[15px] leading-[1.6] text-muted">
                {c.aanpak.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <span className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full bg-accent" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={160}>
              <Eyebrow>Resultaat</Eyebrow>
              <ul className="flex flex-col gap-3 text-[15px] leading-[1.6] text-ink">
                {c.resultaat.map((r) => (
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

      {c.voorNa && (
        <Section>
          <Container>
            <Reveal className="grid grid-cols-1 items-center gap-12 min-[901px]:grid-cols-[1fr_0.9fr]">
              <div>
                <Eyebrow>Voor en na</Eyebrow>
                <SectionTitle className="max-w-[16ch]">Zo zag het eruit, zo ziet het er nu uit.</SectionTitle>
                <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.65] text-muted">
                  Sleep de greep om de oude en de nieuwe site te vergelijken, zoals een klant ze op zijn telefoon ziet.
                </p>
              </div>
              <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[22px] border border-line shadow-card">
                <BeforeAfterSlider
                  beforeSrc={c.voorNa.voor}
                  afterSrc={c.voorNa.na}
                  beforeAlt={c.voorNa.voorAlt}
                  afterAlt={c.voorNa.naAlt}
                  className="aspect-[3/4]"
                />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {c.quote && (
        <Section variant="base">
          <Container>
            <Reveal className="mx-auto max-w-[760px] text-center">
              <p className="font-display text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.35] tracking-[-0.02em]">
                &ldquo;{c.quote.text}&rdquo;
              </p>
              <p className="mt-5 text-[14px] text-muted">{c.quote.author}</p>
            </Reveal>
          </Container>
        </Section>
      )}

      {others.length > 0 && (
        <Section>
          <Container>
            <Reveal>
              <Eyebrow>Meer werk</Eyebrow>
              <SectionTitle className="mb-[44px]">Ook gebouwd.</SectionTitle>
              <div className="grid grid-cols-1 gap-[22px] min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
                {others.map((item) => (
                  <WerkCard key={item.slug} item={item} />
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      <CtaBand
        title="Wil je dit ook voor jouw bedrijf?"
        body="Stuur je huidige site of vertel kort wat je doet. Je krijgt een echte demo van je homepage, gratis en zonder verplichtingen."
        label={cta.demoLang.label}
        href={cta.demoLang.href}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
