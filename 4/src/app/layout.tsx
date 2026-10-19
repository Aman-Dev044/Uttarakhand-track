import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Marcellus, Mukta, Yatra_One } from "next/font/google";
import { Providers } from "@/components/Providers";
import { site } from "@/data/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const mukta = Mukta({
  variable: "--font-mukta",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "devanagari"],
  display: "swap",
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const yatra = Yatra_One({
  variable: "--font-yatra",
  weight: "400",
  subsets: ["devanagari", "latin"],
  display: "swap",
  preload: false,
});

const title = `Char Dham Yatra 2026 & Uttarakhand Pilgrimage Treks | ${site.name}`;
const description =
  "Plan the Char Dham Yatra 2026 to Yamunotri, Gangotri, Kedarnath and Badrinath, and walk Uttarakhand's sacred Himalayan trails: Gaumukh, Kedartal, Tungnath, Hemkund Sahib and more. Small guided groups from Dehradun.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    "Char Dham Yatra 2026",
    "Char Dham Yatra package",
    "Kedarnath Badrinath yatra",
    "Do Dham yatra",
    "Yamunotri Gangotri yatra",
    "Char Dham registration",
    "Kedarnath helicopter booking",
    "Panch Kedar yatra",
    "Panch Prayag",
    "Gaumukh Tapovan trek",
    "Kedartal trek",
    "Tungnath Chandrashila trek",
    "Hemkund Sahib Valley of Flowers",
    "pilgrimage treks Uttarakhand",
    "Devbhoomi Uttarakhand",
    "Uttarakhand festivals",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "travel",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitterHandle,
    creator: site.twitterHandle,
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, email: true, address: false },
  other: {
    "geo.region": "IN-UT",
    "geo.placename": `${site.address.locality}, ${site.address.region}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#3d0b16",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${mukta.variable} ${marcellus.variable} ${yatra.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-marigold focus:px-5 focus:py-2 focus:text-maroon-deep"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
