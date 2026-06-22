import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Browsers, ArrowsClockwise, ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { cta } from "@/lib/content";

const cards = [
  {
    icon: Browsers,
    title: "Nieuwe website",
    body: "Nog geen (goede) site? Ik bouw een moderne website die meteen vertrouwen wekt: strak, snel en helder van structuur.",
  },
  {
    icon: ArrowsClockwise,
    title: "Redesign",
    body: "Verouderde site? Ik geef 'm een moderne uitstraling die past bij waar je nu staat, zonder dat je opnieuw hoeft te beginnen.",
  },
];

const incl = ["Mobiel-eerst", "Snel", "Vindbaar in Google", "Zelf te beheren"];

export function Services() {
  return (
    <Section id="werk" variant="cream">
      <Container>
        <Reveal>
          <Eyebrow tone="cream">Wat ik maak</Eyebrow>
          <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(26px,3.6vw,42px)] font-semibold tracking-[-0.035em]">
            Nieuwe websites en redesigns.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 80}>
                <div className="group flex h-full flex-col rounded-2xl border border-cream-line bg-[#FFFDF9] p-[clamp(28px,3vw,42px)] shadow-[0_1px_0_rgba(255,255,255,0.7),0_26px_54px_-38px_rgba(28,26,23,0.4)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#D9CFBE] hover:shadow-[0_36px_70px_-36px_rgba(28,26,23,0.45)]">
                  <span className="h-px w-9 bg-accent" aria-hidden />
                  <Icon size={28} weight="light" className="mt-7 text-accent-deep" />
                  <h3 className="mt-5 text-[clamp(22px,2.4vw,26px)] font-semibold tracking-[-0.025em]">
                    {c.title}
                  </h3>
                  <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-cream-muted">
                    {c.body}
                  </p>
                  <a
                    href={cta.explore.href}
                    className="mt-8 inline-flex items-center gap-2 text-[13.5px] font-semibold text-cream-ink"
                  >
                    {cta.explore.label}
                    <ArrowRight
                      size={15}
                      weight="bold"
                      className="text-accent transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-cream-line pt-6 text-[13px] text-cream-muted">
            {incl.map((x) => (
              <li key={x} className="flex items-center gap-2">
                <Check size={14} weight="bold" className="shrink-0 text-accent" />
                {x}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
