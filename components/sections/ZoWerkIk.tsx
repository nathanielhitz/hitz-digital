import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { getDict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n/paths";

export function ZoWerkIk({ lang }: { lang: Lang }) {
  const { pages, services } = getDict(lang);
  return (
    <Section id="zo-werk-ik">
      <Container>
        <Reveal>
          <SectionTitle className="mb-[54px] max-w-[720px]">{pages.home.zoWerkIk.title}</SectionTitle>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(24px,4vw,40px)]">
            {services.zoWerkIk.map((item) => (
              <div key={item.title} className="flex items-start gap-[14px]">
                <span
                  className="mt-2 h-[9px] w-[9px] flex-none rounded-full bg-accent shadow-dot"
                  aria-hidden
                />
                <div>
                  <h3 className="mb-[6px] font-display text-[17px] font-semibold">{item.title}</h3>
                  <p className="text-[14.5px] leading-[1.55] text-muted">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
