import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { zoWerkIk } from "@/lib/services";

export function ZoWerkIk() {
  return (
    <Section id="zo-werk-ik">
      <Container>
        <Reveal>
          <Eyebrow>Zo werk ik</Eyebrow>
          <SectionTitle className="mb-[54px] max-w-[720px]">Duidelijk vooraf. Geen verrassingen achteraf.</SectionTitle>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(24px,4vw,40px)]">
            {zoWerkIk.map((item) => (
              <div key={item.title} className="flex items-start gap-[14px]">
                <span
                  className="mt-2 h-[9px] w-[9px] flex-none rounded-full bg-accent shadow-[0_0_10px_rgba(95,164,126,0.55)]"
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
