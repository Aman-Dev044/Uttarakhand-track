import { Navbar } from "@/components/Navbar";
import { AltitudeGauge } from "@/components/AltitudeGauge";
import { Hero } from "@/components/Hero";
import { Finder } from "@/components/Finder";
import { Compare } from "@/components/Compare";
import { AltitudeChart } from "@/components/AltitudeChart";
import { Featured } from "@/components/Featured";
import { Adventures } from "@/components/Adventures";
import { CharDham } from "@/components/CharDham";
import { Destinations } from "@/components/Destinations";
import { Safety } from "@/components/Safety";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { Plan } from "@/components/Plan";
import { Footer } from "@/components/Footer";
import { buildJsonLd, serializeJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }} />
      <Navbar />
      <AltitudeGauge />
      <main id="main">
        <Hero />
        <Finder />
        <Compare />
        <AltitudeChart />
        <Featured />
        <Adventures />
        <CharDham />
        <Destinations />
        <Safety />
        <Reviews />
        <Faq />
        <Plan />
      </main>
      <Footer />
    </>
  );
}
