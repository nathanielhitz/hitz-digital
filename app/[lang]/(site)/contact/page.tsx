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
import { contactEmail, whatsapp, tel, telDisplay } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { href, langOf, type LangParams } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "contact", getDict(lang).pages.contact.meta);
}

export default async function ContactPage({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, services, ui } = getDict(lang);
  const t = pages.contact;
  const sendable = await canSend();
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${site.url}${href(lang, "contact")}`,
    name: t.schemaName,
    about: { "@type": "ProfessionalService", name: site.name, telephone: site.phone, email: site.email },
  };

  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero lang={lang} crumbs={[{ label: t.crumb }]} title={t.hero.title} lead={t.hero.lead} />
      <Section className="border-t-0 pt-0">
        <Container>
          <div className="grid grid-cols-1 gap-12 min-[901px]:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <div className="rounded-2xl border border-line bg-panel p-[clamp(20px,2.6vw,34px)]">
                <AanvraagForm lang={lang} t={ui.form} canSend={sendable} />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-col gap-8">
                <div>
                  <Eyebrow>{t.direct.eyebrow}</Eyebrow>
                  <ul className="flex flex-col gap-1.5 text-[16px]">
                    <li>
                      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block py-1 text-ink underline-offset-4 hover:underline">
                        {ui.footer.whatsapp}
                      </a>
                      <span className="text-muted"> · {t.direct.whatsappNote}</span>
                    </li>
                    <li>
                      <a href={tel} className="inline-block py-1 text-ink underline-offset-4 hover:underline">
                        {telDisplay}
                      </a>
                      <span className="text-muted"> · {t.direct.callNote}</span>
                    </li>
                    <li>
                      <MailtoLink href={ui.mailto} className="inline-block py-1 text-ink underline-offset-4 hover:underline">
                        {contactEmail}
                      </MailtoLink>
                    </li>
                  </ul>
                </div>
                <div className="text-[14.5px] leading-[1.65] text-muted">
                  <p className="text-ink">HitzDigital</p>
                  <p>{t.about.place(site.founder, site.city)}</p>
                  {site.kvk ? <p>{t.about.kvk(site.kvk)}</p> : null}
                  <p className="mt-2">{t.about.reply}</p>
                </div>
                <div>
                  <SectionTitle size="sm" className="mb-4 text-[20px]">
                    {t.faqTitle}
                  </SectionTitle>
                  <FaqList items={services.contactFaq} />
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
