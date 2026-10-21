"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navLinks, site, telHref } from "@/data/site";
import { Arrow, ease, Logo, Magnetic } from "./ui";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 400 && y > prev + 4 && !open);
    if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
          solid && !open ? "bg-snow/85 shadow-[0_1px_0_rgba(15,23,32,0.06)] backdrop-blur-md" : ""
        }`}
      >
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-5 sm:h-[72px] sm:px-10">
          <a href="#top" aria-label="Char Dham Yatra, back to top" className="relative z-10">
            <Logo />
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative rounded-full px-3.5 py-2 text-[14px] font-medium text-slate-2 transition-colors hover:text-slate">
                  {l.label}
                  <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-alpine transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Magnetic>
              <a
                href="#plan"
                className="group inline-flex items-center gap-2 rounded-full bg-slate py-2.5 pl-5 pr-4 text-[14px] font-medium text-snow transition-colors hover:bg-alpine"
              >
                Plan a trek
                <Arrow className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              </Magnetic>
            </span>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-10 grid size-11 place-items-center rounded-full bg-white shadow-[0_0_0_1px_rgba(15,23,32,0.08)] lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span className={`absolute left-0 h-[1.5px] w-5 bg-slate transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-5 bg-slate transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-snow px-5 pb-8 pt-24 lg:hidden"
          >
            <ul className="space-y-1">
              {navLinks.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.05 }}
                    className="flex items-baseline justify-between border-b border-frost py-3 font-display text-4xl font-semibold tracking-[-0.04em] text-slate"
                  >
                    {l.label}
                    <span className="text-sm font-medium tracking-normal text-stone">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="mt-10 space-y-4">
              <a
                href="#plan"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-full bg-slate px-6 py-4 font-medium text-snow"
              >
                Plan a trek <Arrow />
              </a>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-[15px] text-slate-2">
                {site.phones.map((ph) => (
                  <a key={ph} href={telHref(ph)}>
                    {ph}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
