import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Sora, Unbounded } from "next/font/google";
import { Providers } from "@/components/Providers";
import { site } from "@/data/site";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const title = `Uttarakhand Treks Compared: Altitude, Grade & Price | ${site.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Uttarakhand treks",
    "compare Himalayan treks",
    "trek finder",
    "best trek for beginners Uttarakhand",
    "highest treks in Uttarakhand",
    "trek altitude and difficulty",
    "Kedarkantha trek price",
    "Roopkund trek altitude",
    "Bali Pass trek",
    "Valley of Flowers trek",
    "Char Dham Yatra route",
    "Rishikesh rafting",
    "Auli skiing",
    "Jim Corbett safari",
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
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitterHandle,
    creator: site.twitterHandle,
    title,
    description: site.description,
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
  themeColor: "#060a1c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${unbounded.variable} ${sora.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-volt focus:px-5 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
