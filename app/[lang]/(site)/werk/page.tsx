import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WerkCard } from "@/components/sections/WerkCard";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { langOf, type LangParams } from "@/lib/i18n/paths";
import { work } from "@/lib/work";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "werk", getDict(lang).pages.werk.meta);
}

export default async function WerkPage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, ui, work: w } = getDict(lang);
  const t = pages.werk;
  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero lang={lang} crumbs={[{ label: t.crumb }]} title={t.hero.title} lead={t.hero.lead} />
      <Section id="cases" className="pt-0 border-t-0">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-[22px] min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
              {work.map((item) => (
                <WerkCard key={item.slug} item={item} lang={lang} text={w.items[item.slug]} labels={ui.workCard} />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>
      <CtaBand lang={lang} title={t.ctaBand.title} body={t.ctaBand.body} label={ui.cta.demoLang.label} href={ui.cta.demoLang.href} />
      <WhatsAppFab afterId="cases" untilId="cta" label={ui.fab.label} aria={ui.fab.aria} />
    </main>
  );
}
