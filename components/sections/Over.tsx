import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { over } from "@/lib/services";

export function Over() {
  return (
    <Section id="over" variant="base">
      <Container>
        <Reveal className="grid grid-cols-1 items-center gap-[clamp(32px,6vw,80px)] min-[901px]:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Over HitzDigital</Eyebrow>
            <SectionTitle size="sm" className="mb-6">
              {over.title}
            </SectionTitle>
            <p className="mb-[18px] max-w-[480px] text-[16px] leading-[1.65] text-muted">{over.body}</p>
            <div className="text-[13.5px] text-faint">{over.facts.join(" · ")}</div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
            <Image
              src="/images/Nathaniel.jpg"
              alt="Nathaniel, oprichter van HitzDigital"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              className="object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(7,7,6,0.5)_0%,transparent_45%)]"
              aria-hidden
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
