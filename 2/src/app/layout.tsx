import type { Metadata, Viewport } from "next";
import { Caveat, Instrument_Serif, Inter_Tight } from "next/font/google";
import { Providers } from "@/components/Providers";
import { site } from "@/data/site";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const title = `Uttarakhand Trekking Guide 2026–27: Treks by Season | ${site.name}`;
const description = site.description;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    "Uttarakhand trekking guide",
    "best time to trek in Uttarakhand",
    "treks by season",
    "Kedarkantha trek itinerary",
    "Kedarkantha trek 5 days",
    "Roopkund trek",
    "Valley of Flowers trek",
    "winter treks Uttarakhand",
    "trek packing list",
    "Char Dham Yatra guide",
    "Panch Kedar",
    "Garhwal vs Kumaon",
    "treks from Dehradun",
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
  themeColor: "#f4efe4",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${instrument.variable} ${interTight.variable} ${caveat.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-vermilion focus:px-5 focus:py-2 focus:text-card"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
