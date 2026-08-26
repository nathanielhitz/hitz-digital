import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

/**
 * Gedeelde site-schil: skip-link, navigatie en footer voor alle publieke pagina's.
 * Pagina's renderen zelf hun <main id="main">.
 */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[14px] focus:font-semibold focus:text-on-accent"
      >
        Naar inhoud
      </a>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
