import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Contents, Ticker } from "@/components/Contents";
import { SketchMap } from "@/components/SketchMap";
import { TrekLog } from "@/components/TrekLog";
import { Diary } from "@/components/Diary";
import { Seasons } from "@/components/Seasons";
import { Regions } from "@/components/Regions";
import { Sacred } from "@/components/Sacred";
import { FieldRules, Packing } from "@/components/Packing";
import { Faq, Notes } from "@/components/Notes";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { buildJsonLd, serializeJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }} />
      <Navbar />
      <main id="main">
        <Hero />
        <Ticker />
        <Contents />
        <SketchMap />
        <TrekLog />
        <Diary />
        <Seasons />
        <Regions />
        <Sacred />
        <Packing />
        <FieldRules />
        <Notes />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
