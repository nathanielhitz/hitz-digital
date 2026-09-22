import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { getDict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n/paths";

/** De drie pijlers: websites, hosting & domeinen, hulp. */
export function Pijlers({ lang }: { lang: Lang }) {
  const { pages, services } = getDict(lang);
  return (
    <Section id="pijlers">
      <Container>
        <Reveal>
          <SectionTitle className="mb-[54px] max-w-[720px]">{pages.home.pijlers.title}</SectionTitle>
        </Reveal>
        <div className="grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-3">
          {services.pijlers.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <a
                href={p.href}
                className="flex h-full flex-col rounded-2xl border border-line bg-panel p-[clamp(24px,2.6vw,34px)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
              >
                <span className="mb-[16px] block font-mono text-[12px] leading-none text-accent">{p.n}</span>
                <h3 className="mb-[10px] font-display text-[clamp(22px,2.2vw,26px)] font-semibold tracking-[-0.02em]">{p.title}</h3>
                <p className="mb-[22px] text-[15px] leading-[1.6] text-muted">{p.body}</p>
                <div className="mt-auto border-t border-line pt-[18px] text-[13.5px] text-ink">{p.price}</div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
