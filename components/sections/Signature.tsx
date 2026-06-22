import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame } from "@/components/mock/BrowserFrame";
import { BeforeAfterSlider } from "@/components/mock/BeforeAfterSlider";
import { cta } from "@/lib/content";

export function Signature() {
  return (
    <Section
      id="voorna"
      className="text-center"
      style={{ background: "radial-gradient(80% 62% at 50% 20%, #1A1713, #13110E)" }}
    >
      <Container>
        <Reveal>
          <Eyebrow centered>Voor &amp; na</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-[18ch] font-display text-[clamp(26px,3.6vw,42px)] font-semibold leading-[1.05] tracking-[-0.035em]">
            Van verouderd naar modern. Zie het verschil.
          </h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-[clamp(14px,1.4vw,16px)] leading-relaxed text-muted">
            Sleep de slider en zie hoe een redesign je website direct professioneler maakt.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="relative mx-auto mt-12 max-w-[900px]">
            <div
              className="pointer-events-none absolute -inset-x-8 -bottom-10 -top-4 -z-[1] blur-[52px]"
              style={{
                background: "radial-gradient(55% 60% at 50% 46%, rgba(226,97,60,0.22), transparent 70%)",
              }}
              aria-hidden
            />
            <BrowserFrame
              url="jansen-zn.nl · redesign"
              className="shadow-[0_50px_104px_-50px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.06]"
            >
              <BeforeAfterSlider
                beforeSrc="/images/before.svg"
                afterSrc="/images/after.svg"
                beforeAlt="Verouderde website voor de redesign"
                afterAlt="Moderne website na de redesign"
              />
            </BrowserFrame>
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-12">
            <Button href={cta.send.href}>{cta.send.label}</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
