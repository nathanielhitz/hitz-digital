import type { Metadata } from "next";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { Pijlers } from "@/components/sections/Pijlers";
import { ZoWerkIk } from "@/components/sections/ZoWerkIk";
import { Werk } from "@/components/sections/Werk";
import { Over } from "@/components/sections/Over";
import { Contact } from "@/components/sections/Contact";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/meta";
import { langOf, type LangParams } from "@/lib/i18n/paths";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = langOf((await params).lang);
  return pageMetadata(lang, "home", getDict(lang).pages.home.meta);
}

export default async function Home({ params }: LangParams) {
  const lang = langOf((await params).lang);
  const { pages, ui } = getDict(lang);
  return (
    <>
      <HeroExperience copy={pages.home.hero} contactHref={ui.cta.contact.href} />
      <main id="main" className="hd-after-hero relative z-[2] bg-deep">
        <Pijlers lang={lang} />
        <ZoWerkIk lang={lang} />
        <Werk lang={lang} />
        <Over lang={lang} />
        <Contact lang={lang} />
      </main>
      <WhatsAppFab label={ui.fab.label} aria={ui.fab.aria} />
    </>
  );
}
