import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RiverFlow } from "@/components/RiverFlow";
import { Invocation } from "@/components/Invocation";
import { CharDhamRoute } from "@/components/CharDhamRoute";
import { SacredCircuits } from "@/components/SacredCircuits";
import { TirthTowns } from "@/components/TirthTowns";
import { FestivalWheel } from "@/components/FestivalWheel";
import { FolkCulture } from "@/components/FolkCulture";
import { SacredTrails } from "@/components/SacredTrails";
import { TrekLedger } from "@/components/TrekLedger";
import { YatraPrep } from "@/components/YatraPrep";
import { Voices } from "@/components/Voices";
import { Faq } from "@/components/Faq";
import { Sankalp } from "@/components/Sankalp";
import { Footer } from "@/components/Footer";
import { buildJsonLd, serializeJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }} />
      <Navbar />
      <main id="main">
        <Hero />
        <RiverFlow>
          <Invocation />
          <CharDhamRoute />
          <SacredCircuits />
          <TirthTowns />
          <FestivalWheel />
          <FolkCulture />
          <SacredTrails />
          <TrekLedger />
          <YatraPrep />
          <Voices />
          <Faq />
        </RiverFlow>
        <Sankalp />
      </main>
      <Footer />
    </>
  );
}
