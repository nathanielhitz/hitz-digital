import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { WerkCard } from "@/components/sections/WerkCard";
import { work, type WorkItem } from "@/lib/work";

/** Homepage: teaser met de klanten + link naar /werk. Elders: volledige grid via `items`. */
export function Werk({ items, teaser = false }: { items?: WorkItem[]; teaser?: boolean }) {
  const list = items ?? (teaser ? work.filter((w) => w.client) : work);
  return (
    <Section id="werk">
      <Container>
        <Reveal>
          <div className="mb-[54px] flex flex-wrap items-end justify-between gap-5">
            <div>
              <Eyebrow>Werk</Eyebrow>
              <SectionTitle className="max-w-[620px]">
                {teaser ? "Gebouwd voor bedrijven in de regio." : "Voorbeelden van mijn werk."}
              </SectionTitle>
            </div>
            {teaser ? (
              <a
                href="/werk"
                className="inline-flex items-center gap-2 text-[15px] font-medium text-ink underline-offset-4 hover:underline"
              >
                Al mijn werk <span aria-hidden>→</span>
              </a>
            ) : (
              <p className="max-w-[380px] text-[15px] leading-[1.6] text-muted">
                Geen sjablonen, geen stockfoto&apos;s. Sites die ik gebouwd heb voor bedrijven in de regio, en voor
                mezelf.
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-[22px] min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
            {list.map((item) => (
              <WerkCard key={item.slug} item={item} />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
