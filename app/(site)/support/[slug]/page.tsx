import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page/PageHero";
import { Prose } from "@/components/page/Prose";
import { Container } from "@/components/layout/Container";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { supportArticles, getSupportArticle } from "@/lib/support";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return supportArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getSupportArticle(slug);
  if (!a) return {};
  const title = `${a.title} | Support | HitzDigital`;
  return {
    title,
    description: a.summary,
    alternates: { canonical: `/support/${a.slug}` },
    openGraph: { title, description: a.summary, url: `/support/${a.slug}`, type: "article" },
  };
}

export default async function SupportArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getSupportArticle(slug);
  if (!a) notFound();
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
      <PageHero crumbs={[{ label: "Support", href: "/support" }, { label: a.title }]} title={a.title} lead={a.summary} />
      <section id="artikel" className="px-[clamp(20px,5vw,64px)] pb-16 md:pb-28 lg:pb-32">
        <Container>
          <Prose>
            <p className="text-[13.5px] text-faint">Laatst bijgewerkt: {a.updated}</p>
            <Body />
          </Prose>
        </Container>
      </section>
      <WhatsAppFab afterId="artikel" untilId="" />
    </main>
  );
}
