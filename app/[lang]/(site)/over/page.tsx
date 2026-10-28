import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { Prose } from "@/components/page/Prose";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { href, langOf, type LangParams } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "over", getDict(lang).pages.over.meta);
}

/**
 * Over-pagina: wie er achter de site zit, wat ik doe, hoe ik werk en waar ik zit.
 * De homepage houdt haar eigen korte Over-sectie (#over); dit is de volledige versie die ook
 * AI-agents en zoekmachines als "about"-pagina kunnen lezen (AboutPage + Person-schema).
 */
export default async function OverPage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, services, ui } = getDict(lang);
  const t = pages.over;
  const over = services.over;
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${site.url}${href(lang, "over")}`,
    name: t.meta.title,
    description: t.meta.description,
    inLanguage: lang,
    about: {
      "@type": "ProfessionalService",
      name: site.name,
      url: site.url,
      founder: { "@type": "Person", name: site.founder, image: `${site.url}/images/nathaniel.webp` },
      address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "NL" },
    },
  };

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero lang={lang} crumbs={[{ label: t.crumb }]} title={t.hero.title} lead={t.hero.lead} />
      <Section className="border-t-0 pt-0">
        <Container>
          <div className="grid grid-cols-1 items-start gap-[clamp(32px,6vw,80px)] min-[901px]:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <Prose>
                {t.sections.map((s) => (
                  <section key={s.title}>
                    <h2>{s.title}</h2>
                    {s.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </section>
                ))}
              </Prose>
            </Reveal>
            <Reveal delay={100} className="min-[901px]:sticky min-[901px]:top-28">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-2xl border border-line min-[901px]:ml-auto min-[901px]:mr-0">
                <Image src="/images/nathaniel.webp" alt={over.portraitAlt} fill sizes="(max-width: 900px) 100vw, 400px" className="object-cover object-center" priority />
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--scrim)_50%,transparent)_0%,transparent_45%)]"
                  aria-hidden
                />
              </div>
              {/* Drie losse feiten, zoals in de Over-sectie op de homepage. */}
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-[13.5px] text-faint min-[901px]:justify-end">
                {over.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>
      <CtaBand lang={lang} title={t.ctaBand.title} body={t.ctaBand.body} label={ui.cta.contact.label} href={ui.cta.contact.href} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
