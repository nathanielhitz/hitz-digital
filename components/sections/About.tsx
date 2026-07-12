import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/lib/content";

const facts = ["Persoonlijk contact", "Werkt door heel NL", "Eerst zien, dan beslissen"];

export function About() {
  return (
    <Section id="over">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal>
            <h2 className="max-w-[16ch] font-display text-[clamp(24px,3.2vw,38px)] font-semibold leading-[1.08] tracking-[-0.035em]">
              Eén persoon. Korte lijnen. Werk waar ik trots op ben.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[clamp(15px,1.4vw,17px)] leading-relaxed text-muted">
              Achter HitzDigital zit één iemand die moderne websites bouwt voor ondernemers zoals
              jij. Geen bureau-laag, geen tussenpersonen, gewoon direct contact en een site die
              klopt.
            </p>
            <ul className="mt-7 flex flex-col gap-2.5 text-[13.5px] text-muted">
              {facts.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="h-px w-6 shrink-0 bg-accent" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={cta.call.href} variant="ghost">
                {cta.call.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative mx-auto w-full max-w-[400px]">
              <div
                className="pointer-events-none absolute -inset-5 -z-10 blur-[44px]"
                style={{
                  background: "radial-gradient(52% 52% at 62% 28%, rgba(226,97,60,0.18), transparent 70%)",
                }}
                aria-hidden
              />
              {/* offset accent frame → layered depth, echoes the hero mockup */}
              <div
                className="pointer-events-none absolute -right-4 -top-4 -z-[1] hidden h-full w-full rounded-[22px] border border-accent/30 md:block"
                aria-hidden
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-line ring-1 ring-white/[0.05]">
                <Image
                  src="/images/Nathaniel.jpg"
                  alt="Nathaniel, oprichter van HitzDigital"
                  fill
                  sizes="(max-width: 880px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
