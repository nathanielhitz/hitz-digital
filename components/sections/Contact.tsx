import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { AanvraagForm } from "@/components/sections/AanvraagForm";
import { whatsapp, tel, telDisplay } from "@/lib/content";
import { canSend } from "@/app/actions/contact";
import { getDict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n/paths";

export async function Contact({ lang }: { lang: Lang }) {
  const t = getDict(lang).pages.home.contact;
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
            {t.eyebrow}
          </Eyebrow>
          <SectionTitle size="lg" className="mb-[22px]">
            {t.title}
          </SectionTitle>
          <p className="mx-auto mb-[38px] max-w-[520px] text-[17px] leading-[1.6] text-muted">
            {t.lead}
          </p>
          <AanvraagForm canSend={sendable} />
          <div className="mt-6 text-center text-[13.5px] leading-[2.1] text-faint">
            {t.direct}{" "}
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block py-0.5 text-muted underline">
              WhatsApp
            </a>{" "}
            ·{" "}
            <a href={tel} className="inline-block py-0.5 text-muted underline">
              {getDict(lang).ui.cta.call} {telDisplay}
            </a>
            <br />
            {t.urgent}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
