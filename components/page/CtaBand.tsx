import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { whatsapp, tel, telDisplay } from "@/lib/content";

/** Afsluitende oproep op subpagina's; het formulier zelf staat op de homepage (#contact). */
export function CtaBand({
  title,
  body,
  label,
  href,
}: {
  title: string;
  body: string;
  label: string;
  href: string;
}) {
  return (
    <Section padding="large" className="overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-[30%] h-[50vw] w-[50vw] max-h-[680px] max-w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(95,164,126,0.10),transparent_66%)] blur-[40px]"
        aria-hidden
      />
      <Container>
        <Reveal className="relative mx-auto max-w-[720px] text-center">
          <SectionTitle size="lg" className="mb-[22px]">
            {title}
          </SectionTitle>
          <p className="mx-auto mb-[34px] max-w-[520px] text-[17px] leading-[1.6] text-muted">{body}</p>
          <div className="flex flex-wrap items-center justify-center gap-[14px]">
            <Button href={href}>{label}</Button>
            <Button href={whatsapp} variant="ghost" target="_blank" rel="noopener noreferrer">
              App via WhatsApp
            </Button>
          </div>
          <p className="mt-6 text-[13.5px] text-faint">
            Of bel{" "}
            <a href={tel} className="text-muted underline">
              {telDisplay}
            </a>
            . Reactie binnen 1 werkdag, vrijblijvend.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
