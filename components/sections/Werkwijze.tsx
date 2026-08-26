import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { werkwijze } from "@/lib/services";

export function Werkwijze() {
  return (
    <Section id="werkwijze" variant="base">
      <Container>
        <Reveal>
          <Eyebrow>Werkwijze</Eyebrow>
          <SectionTitle className="mb-16 max-w-[720px]">In drie stappen naar een betere website.</SectionTitle>
          <div className="grid grid-cols-1 gap-[clamp(24px,4vw,56px)] min-[901px]:grid-cols-3">
            {werkwijze.map((s) => (
              <div key={s.n}>
                <div className="mb-[18px] flex items-center gap-[14px]">
                  <span
                    className="h-[11px] w-[11px] rounded-full bg-accent shadow-[0_0_10px_rgba(95,164,126,0.55)]"
                    aria-hidden
                  />
                  <span className="font-mono text-[13px] text-faint">{s.n}</span>
                </div>
                <h3 className="mb-[10px] font-display text-[20px] font-semibold">{s.title}</h3>
                <p className="max-w-[300px] text-[15px] leading-[1.6] text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
