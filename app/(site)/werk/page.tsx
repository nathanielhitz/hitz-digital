import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/CtaBand";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WerkCard } from "@/components/sections/WerkCard";
import { cta } from "@/lib/content";
import { work } from "@/lib/work";

const title = "Werk: websites voor ondernemers in de Hoeksche Waard | HitzDigital";
const description =
  "Voorbeelden van websites die ik gebouwd heb: voor een metaalbedrijf, een schildersbedrijf, een zorgverlener en meer. Klik door naar de cases.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/werk" },
  openGraph: { title, description, url: "/werk", type: "website" },
};

export default function WerkPage() {
  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        crumbs={[{ label: "Werk" }]}
        title="Voorbeelden van mijn werk."
        lead="Geen sjablonen, geen stockfoto's. Sites die ik gebouwd heb voor bedrijven in de regio, en een paar eigen projecten. Bij de klanten lees je hoe het ging."
      />
      <Section className="pt-0 border-t-0">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-[22px] min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
              {work.map((item) => (
                <WerkCard key={item.slug} item={item} />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>
      <CtaBand
        title="Wil je dit ook voor jouw bedrijf?"
        body="Stuur je huidige site of vertel kort wat je doet. Je krijgt een echte demo van je homepage, gratis en zonder verplichtingen."
        label={cta.demoLang.label}
        href={cta.demoLang.href}
      />
    </main>
  );
}
