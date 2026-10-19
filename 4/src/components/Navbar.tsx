"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, site, telHref } from "@/data/site";
import { Logo, Mandala, ease } from "./ui";

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));

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

  const light = !solid && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,box-shadow,padding] duration-500 ${
          solid ? "bg-ivory/90 py-2.5 shadow-[0_1px_0_rgba(180,135,58,.35)] backdrop-blur-lg" : "py-4 sm:py-5"
        } ${open ? "bg-transparent shadow-none" : ""}`}
      >
        <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
          <a href="#top" aria-label={`${site.name} home`} className="relative z-10" onClick={() => setOpen(false)}>
            <Logo tone={light || open ? "light" : "dark"} />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`group relative rounded-full px-4 py-2 text-[15px] font-medium transition ${
                    light ? "text-ivory/85 hover:text-ivory" : "text-umber/80 hover:text-maroon"
                  }`}
                >
                  {l.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-center scale-x-0 bg-marigold transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-3">
            <a
              href="#sankalp"
              className="hidden rounded-full bg-kumkum px-5 py-2.5 text-sm font-semibold text-ivory shadow-lg shadow-kumkum/25 transition hover:bg-maroon sm:inline-flex"
            >
              Plan my yatra
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`grid size-11 place-items-center rounded-full ring-1 transition lg:hidden ${
                light || open ? "text-ivory ring-ivory/30" : "text-maroon ring-maroon/25"
              }`}
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>
      {/* Reading progress, drawn like a thin stream of the Ganga */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className={`h-[2px] origin-left bg-gradient-to-r from-ganga via-ganga-light to-marigold transition-opacity ${solid && !open ? "opacity-100" : "opacity-0"}`}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="aipan fixed inset-0 -z-10 overflow-y-auto bg-maroon-deep px-6 pb-10 pt-28 text-ivory lg:hidden"
          >
            <motion.div
              initial={{ rotate: -40, scale: 0.7, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease }}
              className="pointer-events-none absolute -right-24 top-24 size-80 text-brass-light/15"
            >
              <Mandala className="size-full animate-mandala" />
            </motion.div>
            <ul className="relative space-y-1">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-brass-light/15 py-4 font-display text-4xl"
                  >
                    <span className="font-inscription text-xs text-brass-light">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease }}
              className="relative mt-10 space-y-3"
            >
              <a
                href="#sankalp"
                onClick={() => setOpen(false)}
                className="flex justify-center rounded-full bg-marigold py-4 font-semibold text-maroon-deep"
              >
                Plan my yatra
              </a>
              <a href={telHref(site.phones[0])} className="block text-center text-ivory/75">
                Call {site.phones[0]}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
