"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { monthNames, paceOf, sacredTrails, treks, type Grade } from "@/data/content";
import { FINDER_EVENT, sendEnquire, type FinderDetail } from "@/lib/events";
import { SectionTitle, ease, inr } from "./ui";
import { Select } from "./Select";

const gradeLevel: Record<Grade, number> = { Easy: 1, "Easy–Moderate": 2, Moderate: 3, "Moderate–Difficult": 4, Difficult: 5 };
const sacred = new Set<string>(sacredTrails.map((s) => s.slug));

const regionOptions = [
  { value: "all", label: "All regions" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "Himachal", label: "Himachal" },
  { value: "Kashmir", label: "Kashmir" },
];
const paceOptions = [
  { value: "any", label: "Any pace" },
  { value: "gentle", label: "Gentle" },
  { value: "steady", label: "Steady" },
  { value: "challenging", label: "Challenging" },
];
const monthOptions = [{ value: "0", label: "Any month" }, ...monthNames.map((m, i) => ({ value: String(i + 1), label: m }))];
const sortOptions = [
  { value: "price", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "altitude", label: "Highest first" },
  { value: "nights", label: "Shortest first" },
];

function GradeDots({ grade }: { grade: Grade }) {
  return (
    <span className="inline-flex items-center gap-2" title={grade}>
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`size-1.5 rotate-45 ${n <= gradeLevel[grade] ? "bg-saffron" : "bg-sandstone"}`} />
        ))}
      </span>
      <span className="text-sm text-clay">{grade}</span>
    </span>
  );
}

export function TrekLedger() {
  const [region, setRegion] = useState("all");
  const [pace, setPace] = useState("any");
  const [month, setMonth] = useState("0");
  const [sort, setSort] = useState("price");
  const [sacredOnly, setSacredOnly] = useState(false);

  useEffect(() => {
    const onFinder = (e: Event) => {
      const d = (e as CustomEvent<FinderDetail>).detail;
      if (d.journey !== "pilgrim-trek" && d.journey !== "himalayan-trek") return;
      setSacredOnly(d.journey === "pilgrim-trek");
      setMonth(String(d.month));
      setPace(d.pace);
      setRegion("all");
    };
    window.addEventListener(FINDER_EVENT, onFinder);
    return () => window.removeEventListener(FINDER_EVENT, onFinder);
  }, []);

  const list = useMemo(() => {
    const m = Number(month);
    const out = treks.filter(
      (t) =>
        (region === "all" || t.state === region) &&
        (pace === "any" || paceOf(t.grade) === pace) &&
        (m === 0 || t.months.includes(m)) &&
        (!sacredOnly || sacred.has(t.slug)),
    );
    const by = {
      price: (a: (typeof treks)[number], b: (typeof treks)[number]) => a.price - b.price,
      "price-desc": (a: (typeof treks)[number], b: (typeof treks)[number]) => b.price - a.price,
      altitude: (a: (typeof treks)[number], b: (typeof treks)[number]) => b.altitudeFt - a.altitudeFt,
      nights: (a: (typeof treks)[number], b: (typeof treks)[number]) => a.nights - b.nights,
    }[sort as "price"];
    return [...out].sort(by);
  }, [region, pace, month, sort, sacredOnly]);

  function reset() {
    setRegion("all");
    setPace("any");
    setMonth("0");
    setSacredOnly(false);
  }

  return (
    <section id="treks" aria-labelledby="treks-title" className="paper relative bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <SectionTitle
          id="treks-title"
          hindi="यात्रा सूची"
          eyebrow="All treks"
          title={
            <>
              The trek register, <em className="text-kumkum">{treks.length} trails and their seasons</em>
            </>
          }
          lede="Every trek we lead in Uttarakhand, Himachal and Kashmir, with a single price per person for stays, meals, permits, guides and safety gear."
        />

        <div className="mt-12 rounded-3xl border border-sandstone bg-sand/60 p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Select showLabel label="Region" value={region} onChange={setRegion} options={regionOptions} />
            <Select showLabel label="Pace" value={pace} onChange={setPace} options={paceOptions} />
            <Select showLabel label="Month" value={month} onChange={setMonth} options={monthOptions} />
            <Select showLabel label="Sort by" value={sort} onChange={setSort} options={sortOptions} />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={sacredOnly}
              onClick={() => setSacredOnly((s) => !s)}
              className="inline-flex items-center gap-3 text-[15px] font-medium text-maroon"
            >
              <span className={`relative h-6 w-11 rounded-full transition-colors ${sacredOnly ? "bg-kumkum" : "bg-sandstone"}`}>
                <motion.span
                  className="absolute top-1 size-4 rounded-full bg-ivory shadow"
                  animate={{ left: sacredOnly ? 24 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </span>
              Pilgrimage treks only
            </button>
            <p className="text-sm text-clay" aria-live="polite">
              Showing {list.length} of {treks.length} treks
            </p>
          </div>
        </div>

        <div className="mt-8 hidden grid-cols-[5.5rem_1fr_6rem_7rem_12rem_7.5rem_3rem] gap-4 border-b border-sandstone px-4 pb-3 font-inscription text-[11px] uppercase tracking-[0.2em] text-brass lg:grid" aria-hidden="true">
          <span />
          <span>Trek</span>
          <span>Nights</span>
          <span>Altitude</span>
          <span>Pace</span>
          <span className="text-right">From</span>
          <span />
        </div>

        <motion.ul layout className="mt-4 space-y-3 lg:mt-0 lg:space-y-0">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((t) => (
              <motion.li
                layout
                key={t.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease }}
                className="group relative grid grid-cols-[5rem_1fr] items-center gap-x-4 gap-y-2 rounded-2xl border border-sandstone bg-ivory p-3 transition-colors hover:border-brass lg:grid-cols-[5.5rem_1fr_6rem_7rem_12rem_7.5rem_3rem] lg:rounded-none lg:border-x-0 lg:border-t-0 lg:bg-transparent lg:px-4 lg:py-4 lg:hover:bg-sand/60"
              >
                <div className="relative row-span-2 aspect-square overflow-hidden rounded-t-full rounded-b-xl lg:row-span-1">
                  <Image src={t.image} alt={`${t.name} trek`} fill sizes="88px" className="object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <div className="pr-11 lg:pr-0">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-maroon-deep">
                    {t.name}
                    {sacred.has(t.slug) && (
                      <span className="ml-2 align-middle font-deva text-base text-kumkum" title="Pilgrimage trek">
                        ॐ<span className="sr-only"> Pilgrimage trek</span>
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-clay">
                    {t.region} · {t.state}
                  </p>
                </div>
                <div className="col-start-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-umber lg:contents">
                  <span className="lg:text-base">{t.nights} nights</span>
                  <span className="lg:text-base">{t.altitudeFt.toLocaleString("en-IN")} ft</span>
                  <GradeDots grade={t.grade} />
                  <span className="ml-auto font-display text-xl font-semibold text-kumkum lg:ml-0 lg:text-right lg:text-2xl">{inr(t.price)}</span>
                </div>
                <a
                  href="#sankalp"
                  onClick={() => sendEnquire(t.name)}
                  aria-label={`Enquire about ${t.name}`}
                  className="absolute right-3 top-3 grid size-10 place-items-center rounded-full text-maroon ring-1 ring-sandstone transition group-hover:bg-maroon group-hover:text-ivory group-hover:ring-maroon lg:static"
                >
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {list.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-sandstone p-10 text-center">
            <p className="font-display text-2xl text-maroon-deep">No trek matches all of these.</p>
            <button type="button" onClick={reset} className="mt-3 font-semibold text-kumkum underline underline-offset-4">
              Clear the filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
