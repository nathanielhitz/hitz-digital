import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
import { Signature } from "@/components/sections/Signature";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Approach />
        <Signature />
        <Services />
        <Process />
        <About />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
