import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getDict } from "@/lib/i18n";
import { langOf, type LangParams } from "@/lib/i18n/paths";

/**
 * Gedeelde site-schil: skip-link, navigatie en footer voor alle publieke pagina's.
 * Pagina's renderen zelf hun <main id="main">.
 */
export default async function SiteLayout({ children, params }: Readonly<{ children: React.ReactNode }> & LangParams) {
  const lang = langOf((await params).lang);
  const { ui } = getDict(lang);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[14px] focus:font-semibold focus:text-on-accent"
      >
        {ui.skipLink}
      </a>
      <Nav lang={lang} links={ui.nav.links} cta={{ label: ui.nav.cta.demo, href: ui.cta.demo.href }} labels={ui.nav} theme={ui.theme} langLabels={ui.lang} />
      {children}
      <Footer lang={lang} />
    </>
  );
}
