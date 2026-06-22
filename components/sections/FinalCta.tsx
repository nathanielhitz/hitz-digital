import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/site";
import { mailto } from "@/lib/content";

export function FinalCta() {
  return (
    <Section
      id="contact"
      className="border-t border-line2"
      style={{
        background: "radial-gradient(70% 90% at 50% 28%, rgba(226,97,60,0.13), transparent 64%), #13110E",
      }}
    >
      <Container>
        <div className="grid items-start gap-12 md:grid-cols-[1fr_0.9fr] md:gap-16">
          <Reveal>
            <h2 className="max-w-[15ch] font-display text-[clamp(28px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Benieuwd hoe jouw website eruit kan zien?
            </h2>
            <p className="mt-5 max-w-[42ch] text-[clamp(15px,1.4vw,17px)] leading-relaxed text-muted">
              Stuur je huidige site of vertel kort wat je zoekt. Je krijgt een concrete preview,
              vrijblijvend.
            </p>

            {(site.calendly || site.whatsapp) && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {site.calendly && (
                  <Button href={site.calendly} variant="ghost">
                    Plan een kennismaking (15 min)
                  </Button>
                )}
                {site.whatsapp && (
                  <Button href={`https://wa.me/${site.whatsapp}`} variant="ghost">
                    App via WhatsApp
                  </Button>
                )}
              </div>
            )}

            <p className="mt-8 flex items-center gap-2.5 text-[13px] text-muted">
              <span className="h-px w-7 shrink-0 bg-accent" aria-hidden />
              Reactie binnen 1 werkdag, vrijblijvend.
            </p>
            <p className="mt-3 text-[13px] text-faint">
              Liever mailen?{" "}
              <a href={mailto} className="text-muted underline-offset-2 hover:text-ink hover:underline">
                {site.email}
              </a>
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
