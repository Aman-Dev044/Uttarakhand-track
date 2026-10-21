"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, site, telHref } from "@/data/site";
import { Logo, ease } from "./ui";

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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative transition-all duration-500 ${
          solid ? "bg-paper/90 shadow-[0_1px_0_rgb(28_26_22/0.08)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <a href="#top" aria-label="Aastha Ki Yatra, back to top" className="text-ink">
            <Logo />
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative px-3 py-2 text-[15px] font-medium text-ink/80 transition hover:text-ink">
                  {l.label}
                  <svg aria-hidden="true" viewBox="0 0 100 40" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                    <path
                      d="M8 22C6 8 40 3 62 5s34 10 30 20-40 12-62 10S2 28 14 14"
                      fill="none"
                      stroke="var(--color-vermilion)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      pathLength={1}
                      className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-500 group-hover:[stroke-dashoffset:0]"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-card transition hover:bg-vermilion sm:inline-block"
            >
              Plan my trek
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
        {/* Reading progress, drawn like a pencil line */}
        <motion.div aria-hidden="true" style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-vermilion/70" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            style={{ transformOrigin: "top", transformPerspective: 1200 }}
            className="paper ruled fixed inset-0 z-[60] overflow-y-auto bg-card px-6 pb-10 pt-5 lg:hidden"
          >
            <div className="relative flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center rounded-full border border-ink/15"
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <p className="relative mt-10 pl-14 font-hand text-2xl text-vermilion">Contents</p>
            <ol className="relative mt-2 pl-14">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.5, ease }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-3 py-1.5 font-display text-4xl leading-[2rem]">
                    {l.label}
                    <span className="mb-1 flex-1 border-b border-dotted border-ink/30" aria-hidden="true" />
                    <span className="font-hand text-xl text-graphite">{String(i + 1).padStart(2, "0")}</span>
                  </a>
                </motion.li>
              ))}
            </ol>
            <div className="relative mt-10 space-y-2 pl-14">
              <a href="#contact" onClick={() => setOpen(false)} className="inline-block rounded-full bg-ink px-6 py-3 font-semibold text-card">
                Plan my trek
              </a>
              {site.phones.map((p) => (
                <a key={p} href={telHref(p)} className="block font-hand text-2xl text-forest">
                  {p}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
