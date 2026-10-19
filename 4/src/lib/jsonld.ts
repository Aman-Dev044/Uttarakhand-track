import { charDham, faqs, panchKedar, sacredTrails, treks } from "@/data/content";
import { site } from "@/data/site";

const abs = (path: string) => new URL(path, site.url).toString();
const sacred = new Set<string>(sacredTrails.map((s) => s.slug));

export function buildJsonLd() {
  const orgId = abs("/#organization");
  const destId = abs("/#uttarakhand");
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
        priceRange: "₹5,499 – ₹20,500",
        currenciesAccepted: "INR",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        areaServed: ["Uttarakhand", "Himachal Pradesh", "Jammu and Kashmir"].map((name) => ({ "@type": "State", name })),
        knowsAbout: ["Char Dham Yatra", "Panch Kedar", "Himalayan trekking", "Pilgrimage travel"],
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
        name: "Char Dham Yatra 2026 & Uttarakhand Pilgrimage Treks",
        isPartOf: { "@id": abs("/#website") },
        about: { "@id": destId },
        primaryImageOfPage: abs("/images/kedarnath.jpg"),
        inLanguage: "en-IN",
      },
      {
        "@type": "TouristDestination",
        "@id": destId,
        name: "Uttarakhand (Devbhoomi)",
        description:
          "Himalayan state in northern India, home to the Char Dham shrines of Yamunotri, Gangotri, Kedarnath and Badrinath, the Panch Kedar temples and the sacred confluences of the Ganga.",
        touristType: ["Pilgrimage", "Spiritual", "Trekking", "Culture"],
        includesAttraction: [
          ...charDham.map((d) => ({
            "@type": ["HinduTemple", "TouristAttraction"],
            "@id": abs(`/#${d.slug}`),
            name: `${d.name} Temple`,
            description: d.note,
            address: { "@type": "PostalAddress", addressLocality: d.district, addressRegion: "Uttarakhand", addressCountry: "IN" },
          })),
          ...panchKedar
            .filter((k) => k.name !== "Kedarnath")
            .map((k) => ({
              "@type": ["HinduTemple", "TouristAttraction"],
              name: `${k.name} Temple`,
              description: `One of the Panch Kedar temples of Lord Shiva. ${k.copy}`,
              address: { "@type": "PostalAddress", addressRegion: "Uttarakhand", addressCountry: "IN" },
            })),
        ],
      },
      {
        "@type": "TouristTrip",
        "@id": abs("/#char-dham-yatra"),
        name: "Char Dham Yatra",
        description:
          "A road and walking pilgrimage to Yamunotri, Gangotri, Kedarnath and Badrinath, usually 10 to 12 days from Haridwar or Dehradun.",
        touristType: "Pilgrimage",
        itinerary: {
          "@type": "ItemList",
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          itemListElement: charDham.map((d, i) => ({ "@type": "ListItem", position: i + 1, item: { "@id": abs(`/#${d.slug}`) } })),
        },
        provider: { "@id": orgId },
      },
      {
        "@type": "ItemList",
        "@id": abs("/#treks"),
        name: "Guided pilgrimage and Himalayan treks",
        itemListElement: treks.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "TouristTrip",
            name: `${t.name} Trek`,
            description: t.blurb,
            image: abs(t.image),
            touristType: sacred.has(t.slug) ? ["Pilgrimage", "Trekking"] : "Trekking",
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
