"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, site, telHref } from "@/data/site";
import { Logo, Magnetic, ease } from "./ui";

export function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.nav
        aria-label="Primary"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-[background-color,border-color,box-shadow] duration-500 sm:px-5 ${
          solid ? "border border-ice/10 bg-night/80 shadow-2xl shadow-black/40 backdrop-blur-xl" : "border border-transparent"
        }`}
      >
        <a href="#top" aria-label={`${site.name} home`} className="shrink-0">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-ice/75 transition hover:bg-ice/10 hover:text-ice"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
          <Magnetic>
            <a
              href="#plan"
              className="group inline-flex items-center gap-2 rounded-full bg-volt px-4 py-2.5 text-sm font-semibold text-night transition hover:bg-volt-2"
            >
              Plan my climb
              <ArrowUpRight className="size-4 transition group-hover:rotate-45" aria-hidden="true" />
            </a>
          </Magnetic>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center rounded-full border border-ice/15 text-ice lg:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] overflow-y-auto bg-night/95 px-6 pb-10 pt-5 backdrop-blur-2xl lg:hidden"
          >
            <div className="aurora" aria-hidden="true" />
            <div className="relative flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border border-ice/15"
                autoFocus
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <ul className="relative mt-12 space-y-1">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-ice/10 py-4 font-display text-2xl font-semibold"
                  >
                    <span className="font-mono text-xs text-glacier">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="relative mt-10 space-y-3 font-mono text-sm text-mist">
              {site.phones.map((p) => (
                <a key={p} href={telHref(p)} className="block hover:text-ice">
                  {p}
                </a>
              ))}
              <a href="#plan" onClick={() => setOpen(false)} className="mt-6 inline-flex rounded-full bg-volt px-5 py-3 font-sans font-semibold text-night">
                Plan my climb
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
