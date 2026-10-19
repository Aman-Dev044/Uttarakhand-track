import { Intro } from "@/components/Intro";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Signature } from "@/components/Signature";
import { Marquee } from "@/components/Marquee";
import { TrekIndex } from "@/components/TrekIndex";
import { Seasons } from "@/components/Seasons";
import { CharDham } from "@/components/CharDham";
import { Panorama } from "@/components/Panorama";
import { Adventures } from "@/components/Adventures";
import { Why } from "@/components/Why";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { Plan } from "@/components/Plan";
import { Footer } from "@/components/Footer";
import { buildJsonLd, serializeJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }} />
      <Intro />
      <Navbar />
      <main id="main">
        <Hero />
        <Manifesto />
        <Signature />
        <Marquee />
        <TrekIndex />
        <Seasons />
        <CharDham />
        <Panorama />
        <Adventures />
        <Why />
        <Reviews />
        <Faq />
        <Plan />
      </main>
      <Footer />
    </>
  );
}
