import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { WerkCard } from "@/components/sections/WerkCard";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getDict } from "@/lib/i18n";
import { href, type Lang } from "@/lib/i18n/paths";
import { work } from "@/lib/work";

/** Homepage-teaser: de klanten + link naar /werk. De volledige grid staat op /werk zelf. */
export function Werk({ lang }: { lang: Lang }) {
  const { pages, ui, work: texts } = getDict(lang);
  const t = pages.home.werk;
  const list = work.filter((w) => w.client);
  return (
    <Section id="werk" padding="large">
      <Container>
        <Reveal>
          <div className="mb-[54px] flex flex-wrap items-end justify-between gap-5">
            <div>
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <SectionTitle className="max-w-[620px]">{t.teaserTitle}</SectionTitle>
            </div>
            <a
              href={href(lang, "werk")}
              className="inline-flex items-center gap-2 py-1 text-[15px] font-medium text-ink underline-offset-4 hover:underline"
            >
              {t.all} <ArrowRight size={16} weight="bold" aria-hidden />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-[22px] min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
            {list.map((item, i) => (
              // Teaser op één kolom: twee tegels, de derde staat achter "Al mijn werk".
              <WerkCard
                key={item.slug}
                item={item}
                lang={lang}
                text={texts.items[item.slug]}
                labels={ui.workCard}
                className={i >= 2 ? "max-[560px]:hidden" : undefined}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
