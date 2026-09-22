import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { Prose } from "@/components/page/Prose";
import { Container } from "@/components/layout/Container";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { supportArticles, getSupportArticle } from "@/lib/support";
import { site } from "@/lib/site";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { langOf, type SlugParams } from "@/lib/i18n/paths";

export function generateStaticParams() {
  return supportArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = langOf(raw);
  const a = getSupportArticle(slug);
  if (lang !== "nl" || !a) return {};
  const title = `${a.title} | Support | HitzDigital`;
  return pageMetadata("nl", "support", { title, description: a.summary }, { slug: a.slug, type: "article" });
}

export default async function SupportArticlePage({ params }: SlugParams) {
  const { lang: raw, slug } = await params;
  const lang = langOf(raw);
  if (lang !== "nl") notFound(); // support bestaat alleen in het Nederlands (spec §1)
  const a = getSupportArticle(slug);
  if (!a) notFound();
  const { ui } = getDict("nl");
  const Body = a.body;
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: a.title,
    description: a.summary,
    inLanguage: "nl",
    dateModified: a.updatedIso,
    url: `${site.url}/support/${a.slug}`,
    author: { "@type": "Person", name: site.founder },
    publisher: { "@type": "ProfessionalService", name: site.name, url: site.url },
  };
  return (
    <main id="main" className="relative z-[2] bg-deep">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero lang="nl" crumbs={[{ label: "Support", href: "/support" }, { label: a.title }]} title={a.title} lead={a.summary} />
      <section id="artikel" className="px-[clamp(20px,5vw,64px)] pb-10 md:pb-12">
        <Container>
          <Prose>
            <p className="text-[13.5px] text-faint">Laatst bijgewerkt: {a.updated}</p>
            <Body />
          </Prose>
        </Container>
      </section>
      <WhatsAppFab afterId="artikel" untilId="" label={ui.fab.label} aria={ui.fab.aria} />
    </main>
  );
}
