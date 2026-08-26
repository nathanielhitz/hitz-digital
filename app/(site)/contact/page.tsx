import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { FaqList } from "@/components/page/FaqList";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { MailtoLink } from "@/components/ui/MailtoLink";
import { AanvraagForm } from "@/components/sections/AanvraagForm";
import { canSend } from "@/app/actions/contact";
import { contactEmail, mailto, whatsapp, tel, telDisplay } from "@/lib/content";
import { contactFaq } from "@/lib/services";
import { site } from "@/lib/site";

const title = "Contact | HitzDigital";
const description =
  "Vraag een gratis demo aan, regel hosting of vraag hulp. App, bel of mail Nathaniel in Puttershoek. Reactie binnen 1 werkdag, vrijblijvend.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact", type: "website" },
};

export default async function ContactPage() {
  const sendable = await canSend();
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${site.url}/contact`,
    name: "Contact HitzDigital",
    about: { "@type": "ProfessionalService", name: site.name, telephone: site.phone, email: site.email },
  };

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        crumbs={[{ label: "Contact" }]}
        title="Waar kan ik je mee helpen?"
        lead="Kies waarvoor je me nodig hebt en vertel kort wat er speelt. Ik reageer binnen 1 werkdag, vrijblijvend. Bij een storing of spoed: bel."
      />
      <Section className="border-t-0 pt-0">
        <Container>
          <div className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <div className="rounded-2xl border border-line bg-panel p-[clamp(20px,2.6vw,34px)]">
                <AanvraagForm canSend={sendable} />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-col gap-8">
                <div>
                  <Eyebrow>Liever direct</Eyebrow>
                  <ul className="flex flex-col gap-3 text-[16px]">
                    <li>
                      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-ink underline-offset-4 hover:underline">
                        WhatsApp
                      </a>
                      <span className="text-muted"> · snelste voor korte vragen</span>
                    </li>
                    <li>
                      <a href={tel} className="text-ink underline-offset-4 hover:underline">
                        {telDisplay}
                      </a>
                      <span className="text-muted"> · bel bij storing of spoed</span>
                    </li>
                    <li>
                      <MailtoLink href={mailto} className="text-ink underline-offset-4 hover:underline">
                        {contactEmail}
                      </MailtoLink>
                    </li>
                  </ul>
                </div>
                <div className="text-[14.5px] leading-[1.65] text-muted">
                  <p className="text-ink">HitzDigital</p>
                  <p>
                    {site.founder} · {site.city}, Hoeksche Waard
                    {site.kvk ? <> · KvK {site.kvk}</> : null}
                  </p>
                  <p className="mt-2">Reactie binnen 1 werkdag. Op afstand of bij jou in de regio.</p>
                </div>
                <div>
                  <SectionTitle size="sm" className="mb-4 text-[20px]">
                    Korte vragen
                  </SectionTitle>
                  <FaqList items={contactFaq} />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
