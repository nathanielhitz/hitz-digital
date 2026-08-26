import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { AanvraagForm } from "@/components/sections/AanvraagForm";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <Section id="contact" padding="large" className="overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-[30%] h-[50vw] w-[50vw] max-h-[680px] max-w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(95,164,126,0.10),transparent_66%)] blur-[40px]"
        aria-hidden
      />
      <Container>
        <Reveal className="relative mx-auto max-w-[780px] text-center">
          <Eyebrow bar={false} className="mb-6">
            Eerst zien. Dan beslissen.
          </Eyebrow>
          <SectionTitle size="lg" className="mb-[22px]">
            Benieuwd hoe jouw website eruit kan zien?
          </SectionTitle>
          <p className="mx-auto mb-[38px] max-w-[520px] text-[17px] leading-[1.6] text-muted">
            Stuur je huidige website of vertel kort wat je zoekt. Ik kijk mee en maak vrijblijvend een concrete
            preview.
          </p>
          <AanvraagForm />
          <div className="mt-6 text-center text-[13.5px] leading-[1.9] text-faint">
            Liever direct?{" "}
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline"
            >
              WhatsApp
            </a>{" "}
            ·{" "}
            <a href={`tel:${site.phone}`} className="text-muted underline">
              Bel +31 6 3741 9404
            </a>
            <br />
            Reactie binnen 1 werkdag · Vrijblijvend ·{" "}
            <a href="/privacy" className="text-muted underline">
              Privacybeleid
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
