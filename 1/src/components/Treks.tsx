"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CalendarDays, Mountain, SlidersHorizontal } from "lucide-react";
import { months, treks, type Trek } from "@/data/content";
import { SectionHeading, ease, inr } from "./ui";
import { TREK_FILTER_EVENT, type TrekFilterDetail } from "./Hero";

const states = ["All", "Uttarakhand", "Himachal", "Kashmir"] as const;
const grades = ["All", "Easy", "Moderate", "Difficult"] as const;

const gradeTone: Record<string, string> = {
  Easy: "bg-moss",
  "Easy–Moderate": "bg-moss",
  Moderate: "bg-saffron-2",
  "Moderate–Difficult": "bg-saffron",
  Difficult: "bg-red-500",
};

function matchesGrade(t: Trek, g: string) {
  if (g === "All") return true;
  if (g === "Easy") return t.grade.startsWith("Easy");
  if (g === "Moderate") return t.grade.includes("Moderate");
  return t.grade.includes("Difficult");
}

export function Treks() {
  const [state, setState] = useState<string>("All");
  const [grade, setGrade] = useState<string>("All");
  const [month, setMonth] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const onFilter = (e: Event) => {
      const d = (e as CustomEvent<TrekFilterDetail>).detail;
      setState(d.state);
      setGrade(d.grade);
      setMonth(d.month);
      setShowAll(true);
    };
    window.addEventListener(TREK_FILTER_EVENT, onFilter);
    return () => window.removeEventListener(TREK_FILTER_EVENT, onFilter);
  }, []);

  const list = useMemo(
    () =>
      treks.filter(
        (t) =>
          (state === "All" || t.state === state) &&
          matchesGrade(t, grade) &&
          (month === null || t.months.includes(month)),
      ),
    [state, grade, month],
  );
  const visible = showAll ? list : list.slice(0, 6);

  return (
    <section id="treks" aria-labelledby="treks-title" className="grain relative bg-snow py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="treks-title"
          eyebrow="Top treks of the season"
          title="Pick your"
          accent="path."
          description="Hand-picked Himalayan treks with fixed departures, certified leaders and one transparent price, from weekend summits to high-pass crossings."
        />

        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <FilterGroup label="Region" options={states} value={state} onChange={setState} layoutId="state-pill" />
          <FilterGroup label="Difficulty" options={grades} value={grade} onChange={setGrade} layoutId="grade-pill" />
        </div>
        {month !== null && (
          <p className="mt-4 flex items-center gap-2 text-sm text-charcoal/70">
            <CalendarDays className="size-4 text-saffron" aria-hidden="true" />
            Showing treks open in <strong className="text-ink">{months[month - 1]}</strong>
            <button type="button" onClick={() => setMonth(null)} className="ml-2 underline underline-offset-4 hover:text-saffron">
              Clear month
            </button>
          </p>
        )}

        <motion.ul layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => (
              <motion.li
                key={t.slug}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease, delay: Math.min(i, 5) * 0.05 }}
              >
                <TrekCard trek={t} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {list.length === 0 && (
          <p className="mt-12 rounded-3xl border border-dashed border-ink/20 p-10 text-center text-charcoal/70">
            No fixed departures match that combination yet. Call us and we&apos;ll design a private trek for you.
          </p>
        )}

        {list.length > 6 && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex items-center gap-3 rounded-full border border-ink/15 px-7 py-4 font-semibold text-ink transition hover:border-ink hover:bg-ink hover:text-snow"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              {showAll ? "Show fewer treks" : `Show all ${list.length} treks`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
  layoutId,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  layoutId: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="no-scrollbar flex items-center gap-1 overflow-x-auto rounded-full bg-parchment/80 p-1.5">
      <span className="hidden px-3 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50 sm:block">{label}</span>
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active ? "text-snow" : "text-charcoal/70 hover:text-ink"
            }`}
          >
            {active && (
              <motion.span layoutId={layoutId} className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.5, ease }} />
            )}
            <span className="relative">{o === "All" ? `All ${label === "Region" ? "regions" : "levels"}` : o}</span>
          </button>
        );
      })}
    </div>
  );
}

function TrekCard({ trek: t }: { trek: Trek }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_1px_0_rgba(0,0,0,.04),0_20px_50px_-30px_rgba(10,23,20,.35)] ring-1 ring-ink/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(10,23,20,.5)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={t.image}
          alt={`${t.name} trek, ${t.region}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-snow/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
            {t.nights}N / {t.nights + 1}D
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-snow backdrop-blur">
            <span className={`size-2 rounded-full ${gradeTone[t.grade]}`} aria-hidden="true" />
            {t.grade}
          </span>
        </div>
        <p className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm font-medium text-snow">
          <Mountain className="size-4" aria-hidden="true" />
          {t.altitudeFt.toLocaleString("en-IN")} ft
        </p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron">{t.region}</p>
        <h3 className="mt-2 font-display text-2xl leading-tight text-ink">{t.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/70">{t.blurb}</p>
        <div className="mt-6 flex items-end justify-between border-t border-ink/10 pt-5">
          <p className="text-xs text-charcoal/60">
            Starting from
            <span className="mt-0.5 block font-display text-2xl text-ink">
              {inr(t.price)}
              <span className="font-sans text-xs text-charcoal/50"> /person</span>
            </span>
          </p>
          <a
            href="#plan"
            aria-label={`Enquire about ${t.name} trek`}
            className="grid size-12 place-items-center rounded-full bg-ink text-snow transition duration-500 group-hover:rotate-45 group-hover:bg-saffron group-hover:text-ink"
          >
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
