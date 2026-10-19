import type { Metadata } from "next";
import credits from "@/data/image-credits.json";
import Link from "next/link";
import { Logo } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Photo credits",
  description: `Attribution for the photographs used on ${site.name}, sourced from Wikimedia Commons.`,
  alternates: { canonical: "/credits" },
  robots: { index: false, follow: true },
};

type Credit = { title: string; author: string; license: string; source: string };

export default function CreditsPage() {
  const rows = Object.entries(credits as Record<string, Credit>);
  return (
    <main id="main" className="min-h-screen bg-ink px-5 py-16 text-snow sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" aria-label="Back to home">
          <Logo />
        </Link>
        <h1 className="mt-14 font-display text-5xl">Photo credits</h1>
        <p className="mt-4 max-w-2xl text-snow/70">
          Photographs are sourced from Wikimedia Commons and used under their respective licences. Images have been
          resized and cropped for the web.
        </p>
        <ul className="mt-12 divide-y divide-snow/10 border-y border-snow/10">
          {rows.map(([slug, c]) => (
            <li key={slug} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
              <a href={c.source} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-saffron-2">
                {c.title}
              </a>
              <span className="text-sm text-snow/60">
                {c.author} · {c.license}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
