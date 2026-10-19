"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { site, telHref } from "@/data/site";
import { Logo } from "./ui";

const columns = [
  {
    title: "Treks",
    links: [
      { label: "Uttarakhand treks", href: "#treks" },
      { label: "Himachal treks", href: "#treks" },
      { label: "Kashmir treks", href: "#treks" },
      { label: "Char Dham Yatra", href: "#char-dham" },
      { label: "Expeditions", href: "#plan" },
      { label: "Eco tourism", href: "#experiences" },
    ],
  },
  {
    title: "Help desk",
    links: [
      { label: "About us", href: "#" },
      { label: "Blogs & articles", href: "#" },
      { label: "FAQs", href: "#faq" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#plan" },
      { label: "Photo credits", href: "/credits" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Terms & conditions", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Cancellation policy", href: "#" },
      { label: "Environment policy", href: "#" },
      { label: "Payment policy", href: "#" },
      { label: "Disclaimer", href: "#" },
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
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-ink text-snow">
      {/* Newsletter */}
      <div className="border-b border-snow/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-3xl sm:text-4xl">
              Trekking Times <em className="font-light italic text-saffron-2">newsletter</em>
            </p>
            <p className="mt-2 text-snow/60">Trails, tales and early-bird deals, once a month. No spam, ever.</p>
          </div>
          {subscribed ? (
            <p role="status" className="rounded-full bg-moss/20 px-6 py-4 text-moss">
              You&apos;re on the list. See you on the trail!
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
              className="flex w-full max-w-md rounded-full bg-snow/10 p-1.5 ring-1 ring-snow/15 focus-within:ring-saffron"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="min-w-0 flex-1 bg-transparent px-5 text-snow outline-none placeholder:text-snow/40"
              />
              <button type="submit" className="flex items-center gap-2 rounded-full bg-saffron px-6 py-3 font-semibold text-ink transition hover:bg-saffron-2">
                Subscribe <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-5 py-16 sm:px-8 md:grid-cols-3 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-snow/60">
            {site.name} is a {site.address.locality}-based trekking and travel organisation running guided Himalayan treks, Char
            Dham Yatras and expeditions across Uttarakhand, Himachal Pradesh and Jammu & Kashmir.
          </p>
          <address className="mt-8 space-y-3 text-sm not-italic text-snow/75">
            <p className="flex gap-3">
              <MapPin className="size-4 shrink-0 text-saffron-2" aria-hidden="true" />
              {site.address.locality}, {site.address.region}, India
            </p>
            {site.phones.map((p) => (
              <a key={p} href={telHref(p)} className="flex gap-3 hover:text-snow">
                <Phone className="size-4 shrink-0 text-saffron-2" aria-hidden="true" />
                {p}
              </a>
            ))}
            <a href={`mailto:${site.email}`} className="flex gap-3 hover:text-snow">
              <Mail className="size-4 shrink-0 text-saffron-2" aria-hidden="true" />
              {site.email}
            </a>
          </address>
        </div>

        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-snow/40">{c.title}</p>
            <ul className="mt-5 space-y-3 text-sm text-snow/75">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition hover:text-saffron-2">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-snow/10 px-5 py-8 text-sm text-snow/50 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p>
          © {site.foundedYear}–2026 {site.name}. All rights reserved.
        </p>
        <a
          href={site.officialTourism}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-snow"
        >
          Official travel advisories: Uttarakhand Tourism <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
        <ul className="flex flex-wrap gap-4">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-saffron-2">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[18vw] leading-[0.75] text-snow/[0.04]"
      >
        Devbhoomi
      </p>
    </footer>
  );
}
