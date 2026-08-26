import { HeroExperience } from "@/components/hero/HeroExperience";
import { Diensten } from "@/components/sections/Diensten";
import { Werkwijze } from "@/components/sections/Werkwijze";
import { ZoWerktHet } from "@/components/sections/ZoWerktHet";
import { Werk } from "@/components/sections/Werk";
import { Over } from "@/components/sections/Over";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <HeroExperience />
      <main id="main" className="hd-after-hero relative z-[2] bg-deep">
        <Diensten />
        <Werkwijze />
        <ZoWerktHet />
        <Werk />
        <Over />
        <Contact />
      </main>
    </>
  );
}
