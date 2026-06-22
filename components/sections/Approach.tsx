import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  { t: "Eerst zien", d: "Een echte preview van je nieuwe site, geen vage beloftes." },
  { t: "Geen risico", d: "Je verplicht je vooraf tot niets en betaalt niets vooraf." },
  { t: "Persoonlijk", d: "Eén aanspreekpunt, korte lijnen, gewone taal." },
];

export function Approach() {
  return (
    <Section id="aanpak" className="border-t border-line2">
      <Container>
        <Reveal>
          <h2 className="max-w-[20ch] font-display text-[clamp(28px,4vw,46px)] font-semibold leading-[1.05] tracking-[-0.04em] [text-wrap:balance]">
            Geen vaag offertetraject. Eerst zien wat mogelijk is.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[clamp(15px,1.4vw,17px)] leading-relaxed text-muted">
            Je hoeft niet te gokken. Ik laat je eerst een concrete preview van je nieuwe website
            zien, pas daarna beslis je of we doorgaan.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 90}>
              <div className="relative border-t border-line pt-6">
                <span className="absolute left-0 top-0 h-px w-9 bg-accent" aria-hidden />
                <h3 className="text-[18px] font-semibold tracking-[-0.01em]">{p.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <a
            href="#werkwijze"
            className="group mt-14 inline-flex items-center gap-2 text-sm font-semibold text-ink"
          >
            Zo werkt het
            <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}
