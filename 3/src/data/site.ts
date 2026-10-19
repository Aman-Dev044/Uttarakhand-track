// Brand and contact settings come from NEXT_PUBLIC_* env vars (see .env.example).
// Each variable must be read with a literal `process.env.NEXT_PUBLIC_…` so Next.js can inline it
// into client components at build time; the fallbacks keep the site working without a .env file.
const env = (value: string | undefined, fallback: string) => (value && value.trim() ? value.trim() : fallback);

const name = env(process.env.NEXT_PUBLIC_SITE_NAME, "Trekking Compass");
const locality = env(process.env.NEXT_PUBLIC_ADDRESS_LOCALITY, "Dehradun");
const twitterHandle = env(process.env.NEXT_PUBLIC_TWITTER_HANDLE, "trekkingcompass").replace(/^@/, "");

export const site = {
  name,
  shortName: name,
  tagline: "Find your summit",
  description:
    "Compare 15 Himalayan treks by altitude, grade, days and price, take the 4-step trek finder, and plan Char Dham, rafting and skiing in Uttarakhand.",
  url: env(process.env.NEXT_PUBLIC_SITE_URL, "https://trekkingcompass.com").replace(/\/$/, ""),
  locale: "en_IN",
  phones: env(process.env.NEXT_PUBLIC_PHONES, "+91 70550 48487,+91 70550 48488")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean),
  email: env(process.env.NEXT_PUBLIC_EMAIL, "trekkingcompass@gmail.com"),
  address: {
    locality,
    region: env(process.env.NEXT_PUBLIC_ADDRESS_REGION, "Uttarakhand"),
    country: env(process.env.NEXT_PUBLIC_ADDRESS_COUNTRY, "IN"),
  },
  twitterHandle: `@${twitterHandle}`,
  socials: {
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL, "https://www.instagram.com/trekkingcompass/"),
    facebook: env(process.env.NEXT_PUBLIC_FACEBOOK_URL, "https://www.facebook.com/trekkingcompass/"),
    youtube: env(process.env.NEXT_PUBLIC_YOUTUBE_URL, "https://www.youtube.com/@trekkingcompass"),
    linkedin: env(process.env.NEXT_PUBLIC_LINKEDIN_URL, "https://www.linkedin.com/company/trekkingcompass"),
    x: env(process.env.NEXT_PUBLIC_X_URL, `https://twitter.com/${twitterHandle}`),
  },
  officialTourism: env(process.env.NEXT_PUBLIC_OFFICIAL_TOURISM_URL, "https://www.uttarakhandtourism.gov.in/"),
  foundedYear: Number(env(process.env.NEXT_PUBLIC_FOUNDED_YEAR, "2018")),
};

export const navLinks = [
  { href: "#finder", label: "Trek finder" },
  { href: "#compare", label: "Compare" },
  { href: "#adventures", label: "Adventures" },
  { href: "#char-dham", label: "Char Dham" },
  { href: "#destinations", label: "Destinations" },
  { href: "#faq", label: "FAQs" },
] as const;

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
