import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { AanvraagForm } from "@/components/sections/AanvraagForm";
import { whatsapp, tel, telDisplay } from "@/lib/content";
import { canSend } from "@/app/actions/contact";

export async function Contact() {
  const sendable = await canSend();
  return (
    <Section id="contact" padding="large" className="overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-[30%] h-[50vw] w-[50vw] max-h-[680px] max-w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--glow)_10%,transparent),transparent_66%)] blur-[40px]"
        aria-hidden
      />
      <Container>
        <Reveal className="relative mx-auto max-w-[780px] text-center">
          <Eyebrow bar={false} className="mb-6">
            Contact
          </Eyebrow>
          <SectionTitle size="lg" className="mb-[22px]">
            Waar kan ik je mee helpen?
          </SectionTitle>
          <p className="mx-auto mb-[38px] max-w-[520px] text-[17px] leading-[1.6] text-muted">
            Kies waarvoor je me nodig hebt en vertel kort wat er speelt. Ik reageer binnen 1 werkdag, vrijblijvend.
          </p>
          <AanvraagForm canSend={sendable} />
          <div className="mt-6 text-center text-[13.5px] leading-[1.9] text-faint">
            Liever direct?{" "}
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-muted underline">
              WhatsApp
            </a>{" "}
            ·{" "}
            <a href={tel} className="text-muted underline">
              Bel {telDisplay}
            </a>
            <br />
            Bij een storing of spoed: bel.
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
