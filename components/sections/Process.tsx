import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/lib/content";

const steps = [
  { n: "01", t: "Stuur je site of vertel je idee", d: "Een mailtje of link is genoeg." },
  { n: "02", t: "Ik maak een concrete preview", d: "Je ziet hoe je nieuwe website eruit kan zien." },
  { n: "03", t: "Dan pas beslis je", d: "Bevalt het? We gaan door. Zo niet? Geen probleem." },
];

export function Process() {
  return (
    <Section id="werkwijze">
      <Container>
        <Reveal>
          <h2 className="max-w-[16ch] font-display text-[clamp(26px,3.6vw,42px)] font-semibold tracking-[-0.035em]">
            In drie stappen naar een betere website.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div>
                <div className="font-display text-[clamp(42px,4vw,54px)] font-light leading-none text-ink/25">
                  {s.n}
                </div>
                <div className="mt-5 h-px w-10 bg-accent" aria-hidden />
                <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em]">{s.t}</h3>
                <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-14">
            <Button href={cta.send.href}>{cta.send.label}</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
