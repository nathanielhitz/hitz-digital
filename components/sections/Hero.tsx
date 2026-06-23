import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { HeroMockup } from "@/components/sections/HeroMockup";
import { cta } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative flex min-h-0 items-center overflow-hidden pb-12 pt-20 md:min-h-[100dvh] md:pb-20 md:pt-24">
      {/* layered premium background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% -12%, #221B15 0%, #13110E 52%, #0E0C0A 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 h-[85%] w-[72%]"
          style={{
            background: "radial-gradient(58% 60% at 76% 26%, rgba(226,97,60,0.12), transparent 62%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(to top, rgba(8,7,6,0.55), transparent)" }}
        />
      </div>

      <Container>
        <div className="grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          {/* left */}
          <Reveal>
            <div className="hidden md:block">
              <Eyebrow>Eerst zien. Dan beslissen.</Eyebrow>
            </div>
            <h1 className="mt-0 font-display text-[clamp(36px,5vw,62px)] font-semibold leading-[1.04] tracking-[-0.035em] [text-wrap:balance] md:mt-7">
              Websites die direct <span className="text-accent">professioneler</span> voelen.
            </h1>
            <p className="mt-5 max-w-[40ch] text-[clamp(15px,1.45vw,18px)] leading-relaxed text-muted md:mt-7">
              Moderne websites en redesigns voor kleine ondernemers. Je ziet eerst een concrete
              preview, daarna beslis je pas.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button href={cta.explore.href}>{cta.explore.label}</Button>
              <Button href={cta.send.href} variant="ghost">
                {cta.send.label}
              </Button>
            </div>
          </Reveal>

          {/* right: layered mockup with subtle premium 3D / motion */}
          <Reveal delay={140}>
            <HeroMockup />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
