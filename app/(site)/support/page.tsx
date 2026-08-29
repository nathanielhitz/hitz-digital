import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { supportArticles } from "@/lib/support";
import { whatsapp } from "@/lib/content";

const title = "Support & handleidingen | HitzDigital";
const description =
  "Handleidingen voor klanten van HitzDigital: e-mail instellen, domein, website en meer. Stap voor stap, in gewoon Nederlands.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/support" },
  openGraph: { title, description, url: "/support", type: "website" },
};

export default function SupportPage() {
  const categories = Array.from(new Set(supportArticles.map((a) => a.category)));
  return (
    <main id="main" className="relative z-[2] bg-deep">
      <PageHero
        crumbs={[{ label: "Support" }]}
        title="Support & handleidingen"
        lead="Handleidingen voor als je zelf iets wilt instellen of nakijken. Kom je er niet uit? Dan app je mij gewoon."
        actions={
          <Button href={whatsapp} target="_blank" rel="noopener noreferrer">
            App me
          </Button>
        }
      />
      <section className="px-[clamp(20px,5vw,64px)] pb-16 md:pb-28 lg:pb-32">
        <Container>
          {categories.map((cat) => (
            <Reveal key={cat}>
              <div className="mb-12">
                <h2 className="mb-5 text-[12px] uppercase tracking-[0.14em] text-faint">{cat}</h2>
                <ul className="grid grid-cols-1 gap-4 min-[701px]:grid-cols-2 min-[1001px]:grid-cols-3">
                  {supportArticles
                    .filter((a) => a.category === cat)
                    .map((a) => (
                      <li key={a.slug}>
                        <a
                          href={`/support/${a.slug}`}
                          className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-accent/50"
                        >
                          <h3 className="font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">{a.title}</h3>
                          <p className="mt-2 flex-1 text-[14.5px] leading-[1.55] text-muted">{a.summary}</p>
                          <span className="mt-5 text-[13.5px] text-accent-bright">
                            Lees verder <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                          </span>
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <p className="text-[14.5px] text-muted">
            Staat je vraag er niet bij? Voor computer- en websiteproblemen kijk ik direct mee, zie{" "}
            <a href="/hulp" className="text-accent-bright underline-offset-2 hover:underline">
              computer- en websitehulp
            </a>
            .
          </p>
        </Container>
      </section>
    </main>
  );
}
