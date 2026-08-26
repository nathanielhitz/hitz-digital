import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { pijlers } from "@/lib/services";

/** De drie pijlers: websites, hosting & domeinen, hulp. Kaarten linken zodra de routes bestaan (fase 3–5). */
export function Pijlers() {
  return (
    <Section id="pijlers">
      <Container>
        <Reveal>
          <Eyebrow>Diensten</Eyebrow>
          <SectionTitle className="mb-[54px] max-w-[720px]">Drie dingen die ik voor je regel.</SectionTitle>
        </Reveal>
        <div className="grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-3">
          {pijlers.map((p, i) => {
            const inner = (
              <>
                <div className="mb-[18px] flex items-center justify-between">
                  <span className="font-mono text-[12px] text-accent">{p.n}</span>
                  <span className="text-[12px] uppercase tracking-[0.14em] text-faint">{p.promise}</span>
                </div>
                <h3 className="mb-[10px] font-display text-[clamp(22px,2.2vw,26px)] font-semibold tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="mb-[22px] text-[15px] leading-[1.6] text-muted">{p.body}</p>
                <div className="mt-auto border-t border-line pt-[18px] text-[13.5px] text-ink">{p.price}</div>
              </>
            );
            const cls =
              "flex h-full flex-col rounded-2xl border border-line bg-panel p-[clamp(24px,2.6vw,34px)] transition-[transform,border-color,box-shadow] duration-300";
            return (
              <Reveal key={p.id} delay={i * 80}>
                {p.live ? (
                  <a
                    href={p.href}
                    className={`${cls} hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_30px_60px_-40px_rgba(0,0,0,0.85)]`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
