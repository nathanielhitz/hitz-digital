import { HeroExperience } from "@/components/hero/HeroExperience";
import { Pijlers } from "@/components/sections/Pijlers";
import { ZoWerkIk } from "@/components/sections/ZoWerkIk";
import { Werk } from "@/components/sections/Werk";
import { Over } from "@/components/sections/Over";
import { Contact } from "@/components/sections/Contact";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";

export default function Home() {
  return (
    <>
      <HeroExperience />
      <main id="main" className="hd-after-hero relative z-[2] bg-deep">
        <Pijlers />
        <ZoWerkIk />
        <Werk teaser />
        <Over />
        <Contact />
      </main>
      <WhatsAppFab />
    </>
  );
}
