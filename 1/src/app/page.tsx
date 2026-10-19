import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Intro, Marquee } from "@/components/Intro";
import { Experiences } from "@/components/Experiences";
import { Treks } from "@/components/Treks";
import { Seasons } from "@/components/Seasons";
import { TrailProfile } from "@/components/TrailProfile";
import { Advantage } from "@/components/Advantage";
import { CharDham } from "@/components/CharDham";
import { Destinations } from "@/components/Destinations";
import { Festivals, Testimonials } from "@/components/Culture";
import { Faq, Journal } from "@/components/Journal";
import { Plan } from "@/components/Plan";
import { Footer } from "@/components/Footer";
import { buildJsonLd, serializeJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }} />
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Intro />
        <Experiences />
        <Treks />
        <Seasons />
        <TrailProfile />
        <Advantage />
        <CharDham />
        <Destinations />
        <Festivals />
        <Testimonials />
        <Journal />
        <Faq />
        <Plan />
      </main>
      <Footer />
    </>
  );
}
