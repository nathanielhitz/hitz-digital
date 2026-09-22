import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { Prose } from "@/components/page/Prose";
import { Container } from "@/components/layout/Container";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { langOf, type LangParams } from "@/lib/i18n/paths";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "privacy", getDict(lang).pages.privacy.meta);
}

export default async function PrivacyPage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, legal } = getDict(lang);
  const t = pages.privacy;
  const Body = legal.PrivacyBody;
  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero lang={lang} crumbs={[{ label: t.crumb }]} title={t.title} lead={t.lead} />
      <section className="px-[clamp(20px,5vw,64px)] pb-10 md:pb-12">
        <Container>
          <Prose>
            <p className="text-[13.5px] text-faint">{t.versionLine(t.version, t.updated)}</p>
            <Body />
          </Prose>
        </Container>
      </section>
    </main>
  );
}
