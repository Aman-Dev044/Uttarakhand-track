"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { levels, monthNames, months, treks, type Level, type State, type Trek } from "@/data/content";
import { ChapterHead, Postmark, ease, inr } from "./ui";
import { Select } from "./Select";
import { TREK_FILTER_EVENT, type TrekFilterDetail } from "./Hero";

const states: ("All" | State)[] = ["All", "Uttarakhand", "Himachal", "Kashmir"];
const monthOptions = [{ value: "", label: "Any month" }, ...monthNames.map((m, i) => ({ value: String(i + 1), label: m }))];
const tilt = [-1.6, 1.2, -0.6, 1.8, -1.2, 0.8];

export function TrekLog() {
  const [state, setState] = useState<"All" | State>("All");
  const [level, setLevel] = useState<Level | "">("");
  const [month, setMonth] = useState("");

  useEffect(() => {
    const onFilter = (e: Event) => {
      const d = (e as CustomEvent<TrekFilterDetail>).detail;
      setState("All");
      setLevel(d.level ?? "");
      setMonth(d.month ? String(d.month) : "");
    };
    window.addEventListener(TREK_FILTER_EVENT, onFilter);
    return () => window.removeEventListener(TREK_FILTER_EVENT, onFilter);
  }, []);

  const list = useMemo(() => {
    const grades = levels.find((l) => l.value === level)?.grades as readonly string[] | undefined;
    return treks.filter(
      (t) =>
        (state === "All" || t.state === state) &&
        (!grades || grades.includes(t.grade)) &&
        (!month || t.months.includes(Number(month))),
    );
  }, [state, level, month]);

  const filtered = state !== "All" || level || month;

  return (
    <section id="trek-log" aria-labelledby="treklog-title" className="paper relative bg-paper-2/60 py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHead
          n="02"
          id="treklog-title"
          title={
            <>
              The trek log: <em className="italic text-forest">15 trails</em>, honestly graded
            </>
          }
          lede="Every entry lists the high point, the days on trail, the months it's in good shape and one price that covers stays, meals, permits, guides and safety kit."
        />

        {/* Filters */}
        <div className="mt-12 flex flex-col gap-6 border-y border-dashed border-ink/20 py-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-6">
            <fieldset>
              <legend className="font-hand text-lg text-graphite">Where</legend>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {states.map((s) => (
                  <FilterPill key={s} active={state === s} onClick={() => setState(s)} group="state">
                    {s}
                  </FilterPill>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-hand text-lg text-graphite">Pace</legend>
              <div className="mt-1 flex flex-wrap gap-1.5">
                <FilterPill active={level === ""} onClick={() => setLevel("")} group="level">
                  Any
                </FilterPill>
                {levels.map((l) => (
                  <FilterPill key={l.value} active={level === l.value} onClick={() => setLevel(l.value)} group="level">
                    {l.label}
                  </FilterPill>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="flex items-end gap-4">
            <Select variant="inline" label="Going in" value={month} onChange={setMonth} options={monthOptions} className="w-48" />
            {filtered && (
              <button
                type="button"
                onClick={() => {
                  setState("All");
                  setLevel("");
                  setMonth("");
                }}
                className="inline-flex items-center gap-1.5 pb-1 text-sm font-semibold text-vermilion"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Clear
              </button>
            )}
          </div>
        </div>

        <p className="mt-5 font-hand text-2xl text-graphite" aria-live="polite">
          {list.length === 0
            ? "No entries match. Try another month?"
            : `${list.length} ${list.length === 1 ? "entry" : "entries"}${month ? ` good in ${monthNames[Number(month) - 1]}` : ""}`}
        </p>

        <motion.ul layout className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((t, i) => (
              <motion.li
                key={t.slug}
                layout
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: tilt[i % tilt.length] }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ rotate: 0, y: -6 }}
                transition={{ duration: 0.5, ease }}
              >
                <EntryCard trek={t} index={treks.indexOf(t) + 1} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  group,
  children,
}: {
  active: boolean;
  onClick: () => void;
  group: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition ${active ? "text-card" : "text-ink hover:bg-ink/5"}`}
    >
      {active && <motion.span layoutId={`pill-${group}`} className="absolute inset-0 rounded-full bg-forest" transition={{ duration: 0.4, ease }} />}
      <span className="relative">{children}</span>
    </button>
  );
}

function EntryCard({ trek, index }: { trek: Trek; index: number }) {
  return (
    <article className="relative h-full bg-card p-4 pb-5 shadow-[0_22px_40px_-24px_rgb(28_26_22/0.5)] ring-1 ring-ink/5">
      <span className="tape absolute -top-3 left-6 z-10 h-6 w-20 -rotate-6" aria-hidden="true" />
      <div className="relative aspect-[3/2] overflow-hidden bg-paper-2">
        <Image src={trek.image} alt={`${trek.name} trek, ${trek.region}`} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw" className="object-cover transition duration-700 hover:scale-105" />
        <Postmark
          top={trek.state}
          bottom={`${trek.nights}N · ${trek.nights + 1}D`}
          center={`${(trek.altitudeFt / 1000).toFixed(1)}k ft`}
          color="var(--color-card)"
          className="absolute bottom-2 left-2 size-20 -rotate-12 drop-shadow"
        />
      </div>

      {/* Price stamp */}
      <div className="perforated absolute -right-2 top-8 z-10 rotate-6 bg-vermilion text-card">
        <div className="border border-dashed border-card/60 px-3 py-2 text-center">
          <span className="block text-[10px] uppercase tracking-[0.2em] opacity-80">from</span>
          <span className="block font-display text-2xl leading-none">{inr(trek.price)}</span>
        </div>
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-graphite">
        Entry {String(index).padStart(2, "0")} · {trek.grade}
      </p>
      <h3 className="mt-1 font-display text-3xl leading-tight">{trek.name}</h3>
      <p className="text-sm text-graphite">{trek.region}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{trek.entry}</p>

      <div className="mt-4" aria-label={`Good months: ${trek.months.map((m) => monthNames[m - 1]).join(", ")}`} role="img">
        <div className="grid grid-cols-12 gap-0.5" aria-hidden="true">
          {months.map((m, i) => {
            const on = trek.months.includes(i + 1);
            return (
              <span key={m} className="flex flex-col items-center gap-1">
                <span className={`h-3 w-full rounded-[2px] border ${on ? "border-forest bg-forest" : "border-ink/15"}`} />
                <span className="text-[9px] font-semibold text-graphite">{m[0]}</span>
              </span>
            );
          })}
        </div>
      </div>
      <p className="mt-3 font-hand text-xl text-vermilion">✎ {trek.note}</p>
    </article>
  );
}
