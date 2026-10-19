import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navLinks, site, telHref } from "@/data/site";
import { treks } from "@/data/content";
import { Logo } from "./ui";

const socials = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "YouTube", href: site.socials.youtube },
  { label: "Facebook", href: site.socials.facebook },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "X", href: site.socials.x },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ice/10 bg-night pt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist">
              Guided Himalayan treks, the Char Dham Yatra and mountain adventures, run from{" "}
              {site.address.locality}, {site.address.region}.
            </p>
            <div className="mt-6 space-y-1.5 font-mono text-sm">
              {site.phones.map((p) => (
                <a key={p} href={telHref(p)} className="block text-ice/85 hover:text-volt">
                  {p}
                </a>
              ))}
              <a href={`mailto:${site.email}`} className="block text-ice/85 hover:text-volt">
                {site.email}
              </a>
            </div>
          </div>

          <nav aria-label="Footer: sections">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">On this page</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ice/80 hover:text-ice">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#safety" className="text-ice/80 hover:text-ice">
                  Altitude safety
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer: popular treks">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">Popular treks</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {treks
                .filter((t) => t.featured)
                .map((t) => (
                  <li key={t.slug}>
                    <a href="#treks" className="text-ice/80 hover:text-ice">
                      {t.name} trek
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">Elsewhere</p>
            <ul className="mt-5 grid grid-cols-2 gap-2.5 text-sm lg:grid-cols-1">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ice/80 hover:text-ice">
                    {s.label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={site.officialTourism}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1 text-sm text-glacier hover:underline"
            >
              Official Uttarakhand Tourism site
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 select-none bg-gradient-to-b from-ice/15 to-transparent bg-clip-text text-center font-display text-[17vw] font-bold leading-[0.8] tracking-tighter text-transparent lg:text-[11rem]"
        >
          SUMMIT
        </p>

        <div className="flex flex-col gap-3 border-t border-ice/10 py-6 font-mono text-[11px] uppercase tracking-[0.12em] text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.foundedYear}–present {site.name}. Independent trek operator, not a government website.
          </p>
          <Link href="/credits" className="hover:text-ice">
            Photo credits
          </Link>
        </div>
      </div>
    </footer>
  );
}
