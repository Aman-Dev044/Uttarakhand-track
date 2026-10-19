import { diary, dhams, faqs, packing, panchKedar, treks } from "@/data/content";
import { site } from "@/data/site";

const abs = (path: string) => new URL(path, site.url).toString();

export function buildJsonLd() {
  const orgId = abs("/#organization");
  const signature = treks.find((t) => t.slug === diary.slug)!;

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
        name: "Uttarakhand Trekking Guide 2026–27: Treks by Season",
        description: site.description,
        isPartOf: { "@id": abs("/#website") },
        about: { "@id": abs("/#uttarakhand") },
        mainEntity: { "@id": abs("/#treks") },
        primaryImageOfPage: abs("/images/hero.jpg"),
        inLanguage: "en-IN",
      },
      {
        "@type": "TouristDestination",
        "@id": abs("/#uttarakhand"),
        name: "Uttarakhand (Devbhoomi)",
        description:
          "Himalayan state in northern India made up of the Garhwal and Kumaon regions, home to the Char Dham and Panch Kedar shrines and the Nanda Devi and Valley of Flowers National Parks.",
        touristType: ["Trekking", "Pilgrimage", "Wildlife", "Nature"],
        includesAttraction: [
          ...dhams.map((d) => ({
            "@type": ["TouristAttraction", "HinduTemple"],
            name: `${d.name} Temple`,
            description: d.note,
            address: { "@type": "PostalAddress", addressLocality: d.district, addressRegion: "Uttarakhand", addressCountry: "IN" },
          })),
          ...panchKedar
            .filter((k) => k.name !== "Kedarnath")
            .map((k) => ({
              "@type": ["TouristAttraction", "HinduTemple"],
              name: `${k.name} Temple`,
              description: `One of the Panch Kedar temples, at about ${k.altitudeM} m. ${k.note}`,
              address: { "@type": "PostalAddress", addressRegion: "Uttarakhand", addressCountry: "IN" },
            })),
        ],
      },
      {
        "@type": "ItemList",
        "@id": abs("/#treks"),
        name: "Uttarakhand and Himalayan treks, 2026–27 season",
        numberOfItems: treks.length,
        itemListElement: treks.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "TouristTrip",
            name: `${t.name} Trek`,
            description: t.entry,
            image: abs(t.image),
            touristType: t.grade,
            itinerary: {
              "@type": "Place",
              name: t.region,
              address: { "@type": "PostalAddress", addressRegion: t.state, addressCountry: "IN" },
            },
            provider: { "@id": orgId },
            offers: {
              "@type": "Offer",
              price: t.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              url: abs("/#trek-log"),
            },
          },
        })),
      },
      {
        "@type": "TouristTrip",
        "@id": abs("/#diary"),
        name: `${diary.trek} Trek: ${diary.days.length}-day itinerary`,
        description: diary.intro,
        image: abs(signature.image),
        provider: { "@id": orgId },
        offers: { "@type": "Offer", price: signature.price, priceCurrency: "INR", url: abs("/#diary") },
        itinerary: {
          "@type": "ItemList",
          numberOfItems: diary.days.length,
          itemListElement: diary.days.map((d) => ({
            "@type": "ListItem",
            position: d.day,
            item: { "@type": "TouristAttraction", name: `Day ${d.day}: ${d.title}`, description: d.copy },
          })),
        },
      },
      {
        "@type": "HowTo",
        "@id": abs("/#packing"),
        name: "How to pack for a Himalayan trek in Uttarakhand",
        description: "Packing checklist for winter and shoulder-season treks up to about 13,000 ft.",
        supply: packing.flatMap((g) => g.items.map((name) => ({ "@type": "HowToSupply", name }))),
        step: packing.map((g, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: g.group,
          text: g.items.join(", "),
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
