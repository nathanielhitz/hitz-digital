import { HeroExperience } from "@/components/hero/HeroExperience";
import { Pijlers } from "@/components/sections/Pijlers";
import { Werkwijze } from "@/components/sections/Werkwijze";
import { ZoWerkIk } from "@/components/sections/ZoWerkIk";
import { Werk } from "@/components/sections/Werk";
import { Over } from "@/components/sections/Over";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <HeroExperience />
      <main id="main" className="hd-after-hero relative z-[2] bg-deep">
        <Pijlers />
        <Werkwijze />
        <ZoWerkIk />
        <Werk />
        <Over />
        <Contact />
      </main>
    </>
  );
}
