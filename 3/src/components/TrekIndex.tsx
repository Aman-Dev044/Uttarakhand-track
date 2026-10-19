"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { monthNames, months, treks, type Grade, type Trek } from "@/data/content";
import { Arrow, ease, FadeUp, ft, inr, Label, LineReveal, pickTrek } from "./ui";
import { Select } from "./Select";

const paces: Record<string, Grade[]> = {
  gentle: ["Easy", "Easy–Moderate"],
  moderate: ["Moderate"],
  challenging: ["Moderate–Difficult", "Difficult"],
};

const monthOptions = [{ value: "", label: "any month" }, ...monthNames.map((m, i) => ({ value: String(i + 1), label: m }))];
const paceOptions = [
  { value: "", label: "any grade" },
  { value: "gentle", label: "gentle" },
  { value: "moderate", label: "moderate" },
  { value: "challenging", label: "challenging" },
];
const placeOptions = [
  { value: "", label: "the Himalaya" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "Himachal", label: "Himachal" },
  { value: "Kashmir", label: "Kashmir" },
];
const sorts = [
  { key: "popular", label: "Popular" },
  { key: "price", label: "Price" },
  { key: "altitude", label: "Altitude" },
  { key: "nights", label: "Days" },
] as const;
type SortKey = (typeof sorts)[number]["key"];

const pad = (n: number) => String(n).padStart(2, "0");

function Row({ trek, index, open, onToggle, onHover }: { trek: Trek; index: number; open: boolean; onToggle: () => void; onHover: () => void }) {
  const panelId = `trek-${trek.slug}`;
  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease }}
      className="group relative border-b border-frost"
    >
      <div className="relative">
        {/* Hover wash rises from the baseline */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 bg-ice transition-[clip-path] duration-500 ease-[var(--ease-glide)] ${
            open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
          }`}
        />
        <div className="relative grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-x-4 px-1 py-4 sm:px-3 lg:grid-cols-[2.5rem_minmax(0,1.7fr)_minmax(0,1fr)_5.5rem_6.5rem_6.5rem_1.5rem] lg:gap-x-6 lg:py-6">
          <span className="hidden text-[13px] tabular-nums text-stone lg:block">{pad(index + 1)}</span>
          <span className="relative size-14 overflow-hidden rounded-xl lg:hidden">
            <Image src={trek.image} alt="" fill sizes="56px" className="object-cover" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-display text-[1.35rem] font-semibold tracking-[-0.035em] text-slate transition-transform duration-500 ease-[var(--ease-glide)] sm:text-3xl lg:text-[2.6rem] lg:leading-[1.1] lg:group-hover:translate-x-3">
              {trek.name}
            </h3>
            <p className="mt-0.5 truncate text-[13px] text-stone lg:hidden">
              {trek.nights} nights · {ft(trek.altitudeFt)}
            </p>
          </div>
          <span className="hidden truncate text-[14px] text-slate-2 lg:block">{trek.region}</span>
          <span className="hidden text-[14px] tabular-nums text-slate-2 lg:block">{trek.nights} nights</span>
          <span className="hidden text-[14px] tabular-nums text-slate-2 lg:block">{ft(trek.altitudeFt)}</span>
          <span className="text-right text-[15px] font-semibold tabular-nums text-slate lg:text-left">{inr(trek.price)}</span>
          <span aria-hidden="true" className="relative hidden size-4 lg:block">
            <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-slate" />
            <span className={`absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-slate transition-transform duration-300 ${open ? "scale-y-0" : ""}`} />
          </span>
        </div>
        <button
          type="button"
          onClick={onToggle}
          onPointerEnter={onHover}
          onFocus={onHover}
          aria-expanded={open}
          aria-controls={panelId}
          className="absolute inset-0 z-10 cursor-pointer rounded-sm"
        >
          <span className="sr-only">
            {open ? "Hide" : "Show"} details for {trek.name}
          </span>
        </button>
      </div>

      {/* Details stay in the DOM; the grid-rows trick animates the height */}
      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-glide)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-6 px-1 pb-8 pt-2 sm:px-3 lg:grid-cols-[2.5rem_minmax(0,1.7fr)_minmax(0,2fr)] lg:gap-x-6">
            <span className="hidden lg:block" />
            <div>
              <p className="max-w-xl text-[16px] leading-relaxed text-slate-2">{trek.note}</p>
              <p className="mt-3 text-[13px] text-stone">
                {trek.region}, {trek.state} · Grade: {trek.grade}
              </p>
            </div>
            <div className="flex flex-col gap-5 lg:items-end">
              <ol aria-label={`Best months for ${trek.name}`} className="grid w-full max-w-md grid-cols-12 gap-1">
                {months.map((m, i) => {
                  const good = trek.months.includes(i + 1);
                  return (
                    <li
                      key={m}
                      aria-label={`${monthNames[i]}${good ? ", good" : ""}`}
                      className={`rounded-md py-2 text-center text-[11px] font-medium ${good ? "bg-slate text-snow" : "bg-ice text-stone/70"}`}
                    >
                      {m[0]}
                    </li>
                  );
                })}
              </ol>
              <button
                type="button"
                onClick={() => pickTrek(trek.name)}
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-alpine px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-alpine-deep"
              >
                Plan {trek.name.split(" · ")[0]}
                <Arrow className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export function TrekIndex() {
  const [month, setMonth] = useState("");
  const [pace, setPace] = useState("");
  const [place, setPlace] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [hovered, setHovered] = useState<Trek | null>(null);

  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.5 });

  const list = useMemo(() => {
    const m = Number(month);
    const filtered = treks.filter(
      (t) => (!m || t.months.includes(m)) && (!pace || paces[pace].includes(t.grade)) && (!place || t.state === place),
    );
    if (sort === "price") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "altitude") return [...filtered].sort((a, b) => b.altitudeFt - a.altitudeFt);
    if (sort === "nights") return [...filtered].sort((a, b) => a.nights - b.nights);
    return filtered;
  }, [month, pace, place, sort]);

  const filtered = month || pace || place;

  return (
    <section id="treks" aria-labelledby="treks-title" className="bg-snow px-5 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Label n="03">The trek index</Label>
            <LineReveal
              id="treks-title"
              lines={["Every trail,", "one index."]}
              className="mt-8 font-display text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl xl:text-[5.6rem]"
            />
          </div>
          <FadeUp>
            <p className="max-w-md text-[17px] leading-relaxed text-slate-2 lg:ml-auto">
              All fifteen treks with honest numbers. Tell us when you can go and how hard you want to work, and the list
              narrows to the ones worth your leave.
            </p>
          </FadeUp>
        </div>

        <FadeUp className="mt-16 rounded-[28px] bg-white p-6 shadow-[0_1px_0_rgba(15,23,32,0.04),0_30px_80px_-50px_rgba(15,23,32,0.35)] ring-1 ring-slate/5 sm:p-10">
          <p className="text-[13px] font-medium text-stone">Find my trek</p>
          <p className="mt-4 font-display text-[1.6rem] font-medium leading-[1.35] tracking-[-0.03em] text-slate-2 sm:text-4xl sm:leading-[1.3]">
            I can travel in{" "}
            <Select variant="inline" label="Month" value={month} onChange={setMonth} options={monthOptions} className="text-slate" /> and
            I’d like a trek that’s{" "}
            <Select variant="inline" label="Grade" value={pace} onChange={setPace} options={paceOptions} className="text-slate" />,
            somewhere in{" "}
            <Select variant="inline" label="Region" value={place} onChange={setPlace} options={placeOptions} className="text-slate" />.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-frost pt-6">
            <p className="text-[15px] text-slate-2" aria-live="polite">
              <span className="font-semibold tabular-nums text-slate">{list.length}</span> {list.length === 1 ? "trek fits" : "treks fit"}
              {filtered && (
                <button
                  type="button"
                  onClick={() => {
                    setMonth("");
                    setPace("");
                    setPlace("");
                  }}
                  className="ml-4 text-stone underline decoration-frost underline-offset-4 hover:text-slate"
                >
                  Clear
                </button>
              )}
            </p>
            <div role="group" aria-label="Sort treks" className="flex rounded-full bg-ice p-1">
              {sorts.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  aria-pressed={sort === s.key}
                  onClick={() => setSort(s.key)}
                  className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors sm:px-4 ${sort === s.key ? "text-snow" : "text-slate-2 hover:text-slate"}`}
                >
                  {sort === s.key && (
                    <motion.span layoutId="sort-pill" transition={{ duration: 0.45, ease }} className="absolute inset-0 rounded-full bg-slate" />
                  )}
                  <span className="relative">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </FadeUp>

        <div className="mt-14 hidden grid-cols-[2.5rem_minmax(0,1.7fr)_minmax(0,1fr)_5.5rem_6.5rem_6.5rem_1.5rem] gap-x-6 border-b border-slate px-3 pb-3 text-[12px] font-medium text-stone lg:grid" aria-hidden="true">
          <span>No.</span>
          <span>Trek</span>
          <span>Region</span>
          <span>Duration</span>
          <span>Summit</span>
          <span>From</span>
          <span />
        </div>

        <ul
          className="mt-8 border-t border-frost lg:mt-0 lg:border-t-0"
          onPointerMove={(e) => {
            x.set(e.clientX);
            y.set(e.clientY);
          }}
          onPointerLeave={() => setHovered(null)}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((t, i) => (
              <Row
                key={t.slug}
                trek={t}
                index={i}
                open={openSlug === t.slug}
                onToggle={() => setOpenSlug((s) => (s === t.slug ? null : t.slug))}
                onHover={() => setHovered(t)}
              />
            ))}
          </AnimatePresence>
        </ul>
        {list.length === 0 && (
          <p className="py-16 text-center text-[17px] text-stone">No trek fits all three. Try another month or grade.</p>
        )}
      </div>

      {/* Cursor-following preview, desktop pointers only */}
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden [@media(hover:hover)_and_(min-width:1024px)]:block"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.slug}
              initial={{ opacity: 0, scale: 0.85, clipPath: "inset(50% 0 50% 0 round 18px)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0 round 18px)" }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5, ease }}
              className="absolute -top-[110px] left-6 h-[220px] w-[300px] overflow-hidden rounded-[18px] shadow-2xl shadow-slate/30"
            >
              <Image src={hovered.image} alt="" fill sizes="300px" className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
