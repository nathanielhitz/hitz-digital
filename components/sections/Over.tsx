import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { over } from "@/lib/services";

export function Over() {
  return (
    <Section id="over" variant="base" padding="large">
      <Container>
        <Reveal className="grid grid-cols-1 items-center gap-[clamp(32px,6vw,80px)] min-[901px]:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionTitle size="sm" className="mb-6">
              {over.title}
            </SectionTitle>
            <p className="mb-[18px] max-w-[480px] text-[16px] leading-[1.65] text-muted">{over.body}</p>
            {/* Drie losse feiten met ruimte ertussen, geen scheidingstekens (max één middelpunt per regel). */}
            <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[13.5px] text-faint">
              {over.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-2xl border border-line min-[901px]:ml-auto min-[901px]:mr-0">
            <Image
              src="/images/nathaniel.webp"
              alt="Nathaniel, oprichter van HitzDigital"
              fill
              sizes="(max-width: 900px) 100vw, 400px"
              className="object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--scrim)_50%,transparent)_0%,transparent_45%)]"
              aria-hidden
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
