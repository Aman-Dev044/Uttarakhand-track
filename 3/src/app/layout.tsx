import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { Providers } from "@/components/Providers";
import { site } from "@/data/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const title = `Uttarakhand Treks 2026–27: Signature Himalayan Treks & Char Dham | ${site.name}`;

// Runs before first paint: the intro curtain plays once per browser session
const introScript = `window.__tcIntro=performance.now();try{if(sessionStorage.getItem("tc-intro"))document.documentElement.dataset.intro="skip";else sessionStorage.setItem("tc-intro","1")}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Uttarakhand treks 2026",
    "Himalayan treks Uttarakhand",
    "signature treks India",
    "Kedarkantha trek",
    "Valley of Flowers trek",
    "Roopkund trek",
    "Kuari Pass trek",
    "Har Ki Dun trek",
    "best trek by season Uttarakhand",
    "winter snow treks",
    "Char Dham Yatra route",
    "Garhwal and Kumaon destinations",
    "Rishikesh rafting",
    "Auli skiing",
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
  themeColor: "#f7f9fb",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${bricolage.variable} ${geist.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-slate focus:px-5 focus:py-2 focus:text-snow"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
