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
  tagline: "Walk the sacred Himalaya",
  description:
    "Char Dham Yatra planning and guided pilgrimage treks across Devbhoomi Uttarakhand, from Yamunotri and Gangotri to Kedarnath, Badrinath, Gaumukh and Hemkund Sahib. Small groups and local guides from Dehradun.",
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
  { href: "#char-dham", label: "Char Dham" },
  { href: "#circuits", label: "Kedar & Prayag" },
  { href: "#festivals", label: "Festivals" },
  { href: "#trails", label: "Sacred trails" },
  { href: "#treks", label: "All treks" },
  { href: "#faq", label: "FAQ" },
] as const;

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
