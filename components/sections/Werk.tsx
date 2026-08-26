import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { WerkCard } from "@/components/sections/WerkCard";
import { work } from "@/lib/work";

export function Werk() {
  return (
    <Section id="werk">
      <Container>
        <Reveal>
          <div className="mb-[54px] flex flex-wrap items-end justify-between gap-5">
            <div>
              <Eyebrow>Werk</Eyebrow>
              <SectionTitle className="max-w-[620px]">Voorbeelden van mijn werk.</SectionTitle>
            </div>
            <p className="max-w-[380px] text-[15px] leading-[1.6] text-muted">
              Geen sjablonen, geen stockfoto&apos;s. Sites die ik gebouwd heb voor bedrijven in de regio, en voor mezelf.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[22px] min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
            {work.map((item) => (
              <WerkCard key={item.slug} item={item} />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
