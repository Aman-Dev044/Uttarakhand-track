"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { treks } from "@/data/content";
import { navLinks, site, telHref } from "@/data/site";
import { Logo } from "./ui";

const socials = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "YouTube", href: site.socials.youtube },
  { label: "Facebook", href: site.socials.facebook },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "X", href: site.socials.x },
];

export function Footer() {
  const [joined, setJoined] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-forest text-card">
      <div className="graph absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 border-b border-card/15 pb-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-hand text-2xl text-kraft">One letter a month</p>
            <p className="mt-1 max-w-lg font-display text-4xl leading-tight sm:text-5xl">
              New batches, trail conditions and the occasional story from the hills.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setJoined(true);
            }}
            className="self-end"
            aria-label="Newsletter"
          >
            {joined ? (
              <p role="status" className="font-hand text-3xl text-kraft">
                Thank you! First letter lands next month.
              </p>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="flex-1">
                  <span className="sr-only">Email address</span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full border-b-2 border-card/30 bg-transparent px-1 py-3 text-lg text-card outline-none placeholder:text-card/50 focus:border-kraft"
                  />
                </label>
                <button type="submit" className="rounded-full bg-card px-7 py-3 font-semibold text-forest transition hover:bg-kraft">
                  Subscribe
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo className="[&_span]:!text-card" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-card/70">
              Guided Himalayan treks and yatras from {site.address.locality}, {site.address.region}, since {site.foundedYear}.
            </p>
          </div>
          <nav aria-label="Chapters">
            <p className="font-hand text-xl text-kraft">Chapters</p>
            <ul className="mt-3 space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-card/80 hover:text-card">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Popular treks">
            <p className="font-hand text-xl text-kraft">Popular treks</p>
            <ul className="mt-3 space-y-2 text-sm">
              {treks.slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <a href="#trek-log" className="text-card/80 hover:text-card">
                    {t.name.split(" · ")[0]} trek
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-hand text-xl text-kraft">Say hello</p>
            <ul className="mt-3 space-y-2 text-sm">
              {site.phones.map((p) => (
                <li key={p}>
                  <a href={telHref(p)} className="text-card/80 hover:text-card">
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="break-all text-card/80 hover:text-card">
                  {site.email}
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-card/80 hover:text-card">
                    {s.label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p aria-hidden="true" className="pointer-events-none select-none text-center font-display text-[22vw] italic leading-[0.8] text-card/[0.06]">
          Devbhoomi
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-card/15 pt-6 text-xs text-card/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.foundedYear}–present {site.name}. An independent trek operator. For official state travel information visit{" "}
            <a href={site.officialTourism} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-card">
              Uttarakhand Tourism
            </a>
            .
          </p>
          <Link href="/credits" className="underline underline-offset-2 hover:text-card">
            Photo credits
          </Link>
        </div>
      </div>
    </footer>
  );
}
