import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { WerkCard } from "@/components/sections/WerkCard";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { work, type WorkItem } from "@/lib/work";

/** Homepage: teaser met de klanten + link naar /werk. Elders: volledige grid via `items`. */
export function Werk({ items, teaser = false }: { items?: WorkItem[]; teaser?: boolean }) {
  const list = items ?? (teaser ? work.filter((w) => w.client) : work);
  return (
    <Section id="werk" padding={teaser ? "large" : "default"}>
      <Container>
        <Reveal>
          <div className="mb-[54px] flex flex-wrap items-end justify-between gap-5">
            <div>
              <Eyebrow>Werk</Eyebrow>
              <SectionTitle className="max-w-[620px]">
                {teaser ? "Bedrijven die je al voorgingen." : "Voorbeelden van mijn werk."}
              </SectionTitle>
            </div>
            {teaser ? (
              <a
                href="/werk"
                className="inline-flex items-center gap-2 py-1 text-[15px] font-medium text-ink underline-offset-4 hover:underline"
              >
                Al mijn werk <ArrowRight size={16} weight="bold" aria-hidden />
              </a>
            ) : (
              <p className="max-w-[380px] text-[15px] leading-[1.6] text-muted">
                Geen sjablonen, geen stockfoto&apos;s. Sites die ik gebouwd heb voor bedrijven in de regio, en voor
                mezelf.
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-[22px] min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
            {list.map((item, i) => (
              // Teaser op één kolom: twee tegels, de derde staat achter "Al mijn werk".
              <WerkCard key={item.slug} item={item} className={teaser && i >= 2 ? "max-[560px]:hidden" : undefined} />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
