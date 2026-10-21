"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { navLinks, site, telHref } from "@/data/site";
import { Logo, ease } from "./ui";

export function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 600 && y > prev && !open);
  });

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
            solid ? "bg-ink/75 shadow-2xl shadow-black/20 ring-1 ring-white/10 backdrop-blur-xl" : "bg-transparent"
          }`}
        >
          <a href="#top" aria-label="Char Dham Yatra home">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-snow/80 transition hover:text-snow"
                >
                  {l.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-saffron transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={telHref(site.phones[0])}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-snow/80 transition hover:text-snow xl:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.phones[0]}
            </a>
            <a
              href="#plan"
              className="hidden rounded-full bg-saffron px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-saffron-2 sm:inline-flex"
            >
              Plan my trek
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-snow/20 text-snow lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease }}
            data-lenis-prevent
            className="topo fixed inset-0 z-[60] flex flex-col bg-pine px-6 pb-10 pt-6"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border border-snow/20 text-snow"
              >
                <X className="size-5" />
              </button>
            </div>
            <ul className="mt-14 space-y-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-display text-4xl text-snow"
                  >
                    <span className="font-sans text-xs text-saffron-2">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto space-y-3 text-snow/70">
              {site.phones.map((p) => (
                <a key={p} href={telHref(p)} className="flex items-center gap-3">
                  <Phone className="size-4 text-saffron" aria-hidden="true" /> {p}
                </a>
              ))}
              <a
                href="#plan"
                onClick={() => setOpen(false)}
                className="mt-4 flex justify-center rounded-full bg-saffron py-4 font-semibold text-ink"
              >
                Plan my trek
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
