import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { site, telHref } from "@/data/site";
import { Garland, Logo } from "./ui";

const columns = [
  {
    title: "Yatra",
    links: [
      { label: "Char Dham Yatra", href: "#char-dham" },
      { label: "Panch Kedar", href: "#circuits" },
      { label: "Panch Prayag", href: "#circuits" },
      { label: "Temple towns", href: "#tirth" },
      { label: "Festival calendar", href: "#festivals" },
    ],
  },
  {
    title: "Treks",
    links: [
      { label: "Pilgrimage treks", href: "#trails" },
      { label: "All treks", href: "#treks" },
      { label: "Packing & health", href: "#prepare" },
      { label: "FAQ", href: "#faq" },
      { label: "Plan my yatra", href: "#sankalp" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Why travel with us", href: "#why-us" },
      { label: "Terms & conditions", href: "#" },
      { label: "Cancellation policy", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Photo credits", href: "/credits" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "YouTube", href: site.socials.youtube },
  { label: "Facebook", href: site.socials.facebook },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "X", href: site.socials.x },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-ivory">
      <div className="bg-maroon-deep">
        <Garland swags={5} />
      </div>
      <div className="miniature-border" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm leading-relaxed text-ivory/65">
              Char Dham planning and guided Himalayan pilgrimage treks from {site.address.locality}, since{" "}
              {site.foundedYear}.
            </p>
            <ul className="mt-6 space-y-3 text-ivory/80">
              {site.phones.map((p) => (
                <li key={p}>
                  <a href={telHref(p)} className="inline-flex items-center gap-3 hover:text-marigold">
                    <Phone className="size-4 text-brass-light" aria-hidden="true" />
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 break-all hover:text-marigold">
                  <Mail className="size-4 shrink-0 text-brass-light" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-3">
                <MapPin className="size-4 text-brass-light" aria-hidden="true" />
                {site.address.locality}, {site.address.region}, India
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className="font-inscription text-xs uppercase tracking-[0.25em] text-brass-light">{c.title}</p>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("/") ? (
                        <Link href={l.href} className="text-ivory/70 transition hover:text-marigold">
                          {l.label}
                        </Link>
                      ) : (
                        <a href={l.href} className="text-ivory/70 transition hover:text-marigold">
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p className="pointer-events-none mt-16 select-none text-center font-deva text-[clamp(3.5rem,15vw,11rem)] leading-none text-ivory/[0.06]" aria-hidden="true">
          देवभूमि
        </p>

        <div className="mt-8 flex flex-col gap-6 border-t border-brass-light/15 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full px-4 py-2 text-sm text-ivory/75 ring-1 ring-brass-light/25 transition hover:bg-marigold hover:text-maroon-deep hover:ring-marigold"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.officialTourism}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-brass-light hover:text-marigold"
          >
            Official Uttarakhand Tourism website
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        <p className="mt-8 text-xs leading-relaxed text-ivory/45">
          © {site.foundedYear}–present {site.name}. An independent tour operator, not affiliated with the Government of
          Uttarakhand or any temple committee. Shrine timings, opening dates and registration rules are set by the
          authorities and may change; please check official sources before you travel.
        </p>
      </div>
    </footer>
  );
}
