import { dhams, faqs, treks } from "@/data/content";
import { site } from "@/data/site";

const abs = (path: string) => new URL(path, site.url).toString();

export function buildJsonLd() {
  const orgId = abs("/#organization");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": orgId,
        name: site.name,
        url: site.url,
        logo: abs("/icon.svg"),
        image: abs("/opengraph-image"),
        description: site.description,
        slogan: site.tagline,
        foundingDate: String(site.foundedYear),
        email: site.email,
        telephone: site.phones.map((p) => p.replace(/\s/g, "")),
        priceRange: "₹5,499 – ₹42,000",
        currenciesAccepted: "INR",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        areaServed: ["Uttarakhand", "Himachal Pradesh", "Jammu and Kashmir"].map((name) => ({
          "@type": "State",
          name,
        })),
        sameAs: Object.values(site.socials),
      },
      {
        "@type": "WebSite",
        "@id": abs("/#website"),
        url: site.url,
        name: site.name,
        inLanguage: "en-IN",
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": abs("/#webpage"),
        url: site.url,
        name: "Uttarakhand Treks & Char Dham Yatra",
        isPartOf: { "@id": abs("/#website") },
        about: { "@id": abs("/#uttarakhand") },
        primaryImageOfPage: abs("/images/hero.jpg"),
        inLanguage: "en-IN",
      },
      {
        "@type": "TouristDestination",
        "@id": abs("/#uttarakhand"),
        name: "Uttarakhand (Devbhoomi)",
        description:
          "Himalayan state in northern India known for the Char Dham pilgrimage, Rishikesh, Jim Corbett National Park and the UNESCO-listed Nanda Devi and Valley of Flowers National Parks.",
        touristType: ["Adventure", "Spiritual", "Wildlife", "Nature"],
        includesAttraction: dhams.map((d) => ({
          "@type": ["TouristAttraction", "HinduTemple"],
          name: `${d.name} Temple`,
          description: d.copy,
          address: { "@type": "PostalAddress", addressRegion: "Uttarakhand", addressLocality: d.district, addressCountry: "IN" },
        })),
      },
      {
        "@type": "ItemList",
        "@id": abs("/#treks"),
        name: "Top Himalayan treks of the season",
        itemListElement: treks.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "TouristTrip",
            name: `${t.name} Trek`,
            description: t.blurb,
            image: abs(t.image),
            touristType: t.grade,
            itinerary: { "@type": "Place", name: t.region, address: { "@type": "PostalAddress", addressRegion: t.state, addressCountry: "IN" } },
            provider: { "@id": orgId },
            offers: {
              "@type": "Offer",
              price: t.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              url: abs("/#treks"),
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": abs("/#faq"),
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
