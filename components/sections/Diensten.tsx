import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { diensten } from "@/lib/services";

export function Diensten() {
  return (
    <Section id="diensten">
      <Container>
        <Reveal>
          <Eyebrow>Diensten</Eyebrow>
          <SectionTitle className="mb-[54px] max-w-[720px]">
            Nieuwe websites en <em className="not-italic text-accent">redesigns</em>.
          </SectionTitle>
          <div className="grid grid-cols-1 border-t border-line min-[901px]:grid-cols-4">
            {diensten.map((d) => (
              <div
                key={d.n}
                className="border-b border-line py-[26px] min-[901px]:border-b-0 min-[901px]:border-r min-[901px]:px-[22px] min-[901px]:first:pl-0 min-[901px]:last:border-r-0 min-[901px]:last:pr-0"
              >
                <div className="mb-[14px] font-mono text-[12px] text-accent">{d.n}</div>
                <h3 className="mb-2 font-display text-[18px] font-semibold">{d.title}</h3>
                <p className="text-[14px] leading-[1.55] text-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
