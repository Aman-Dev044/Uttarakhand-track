"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { navLinks, site, telHref } from "@/data/site";
import { ArrowUpRight, Logo } from "./ui";

const socials = [
  ["Instagram", site.socials.instagram],
  ["YouTube", site.socials.youtube],
  ["Facebook", site.socials.facebook],
  ["LinkedIn", site.socials.linkedin],
  ["X", site.socials.x],
] as const;

const popular = ["Kedarkantha", "Valley of Flowers", "Roopkund", "Kuari Pass", "Har Ki Dun", "Brahmatal"];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);

  return (
    <footer ref={ref} className="overflow-hidden bg-slate text-snow">
      <div className="mx-auto max-w-[1600px] px-5 pt-20 sm:px-10 sm:pt-28">
        <div className="grid gap-12 border-b border-snow/10 pb-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-snow/60">
              Small-group Himalayan treks and Char Dham journeys, planned and led from {site.address.locality},{" "}
              {site.address.region}.
            </p>
            <ul className="mt-6 space-y-1 text-[15px]">
              {site.phones.map((p) => (
                <li key={p}>
                  <a href={telHref(p)} className="text-snow/85 transition hover:text-white">
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="text-snow/85 transition hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="text-[13px] text-snow/45">On this page</p>
            <ul className="mt-4 space-y-2 text-[15px]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-snow/80 transition hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[13px] text-snow/45">Popular treks</p>
            <ul className="mt-4 space-y-2 text-[15px]">
              {popular.map((n) => (
                <li key={n}>
                  <a href="#treks" className="text-snow/80 transition hover:text-white">
                    {n} trek
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[13px] text-snow/45">Follow</p>
            <ul className="mt-4 space-y-2 text-[15px]">
              {socials.map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-snow/80 transition hover:text-white">
                    {label}
                    <ArrowUpRight className="size-3 opacity-50 transition group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8 text-[13px] text-snow/50 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {site.foundedYear}–2026 {site.name}. An independent trek operator, not affiliated with the Government of
            Uttarakhand.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={site.officialTourism} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition hover:text-white">
              Uttarakhand Tourism (official) <ArrowUpRight className="size-3" />
            </a>
            <Link href="/credits" className="transition hover:text-white">
              Photo credits
            </Link>
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="relative select-none overflow-hidden">
        <motion.p
          style={{ y: wordY }}
          className="font-condensed whitespace-nowrap text-center text-[23.5vw] leading-[0.74] tracking-[-0.04em] text-snow/[0.07]"
        >
          UTTARAKHAND
        </motion.p>
      </div>
    </footer>
  );
}
