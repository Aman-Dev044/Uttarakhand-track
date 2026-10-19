export const site = {
  name: "Trekking Compass",
  shortName: "Trekking Compass",
  tagline: "Trek into your own story",
  description:
    "Guided Himalayan treks, Char Dham Yatra and expeditions across Devbhoomi Uttarakhand, Himachal and Kashmir. Small groups, certified guides and 150+ curated trails from Dehradun.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://trekkingcompass.com",
  locale: "en_IN",
  phones: ["+91 70550 48487", "+91 70550 48488"],
  email: "trekkingcompass@gmail.com",
  address: {
    locality: "Dehradun",
    region: "Uttarakhand",
    country: "IN",
  },
  socials: {
    instagram: "https://www.instagram.com/trekkingcompass/",
    facebook: "https://www.facebook.com/trekkingcompass/",
    youtube: "https://www.youtube.com/@trekkingcompass",
    linkedin: "https://www.linkedin.com/company/trekkingcompass",
    x: "https://twitter.com/trekkingcompass",
  },
  officialTourism: "https://www.uttarakhandtourism.gov.in/",
  foundedYear: 2018,
} as const;

export const navLinks = [
  { href: "#experiences", label: "Experiences" },
  { href: "#treks", label: "Treks" },
  { href: "#char-dham", label: "Char Dham" },
  { href: "#destinations", label: "Destinations" },
  { href: "#seasons", label: "When to go" },
  { href: "#faq", label: "FAQs" },
] as const;

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
