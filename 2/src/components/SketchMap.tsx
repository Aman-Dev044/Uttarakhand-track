"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { MoveRight } from "lucide-react";
import { dhams, treks, type Trek } from "@/data/content";
import { ChapterHead, ease, inr } from "./ui";

const W = 600;
const H = 480;

// Hand-traced outline of Uttarakhand (approximate, not to scale)
const OUTLINE =
  "M32 112C40 92 52 74 64 64S112 44 144 40s54-14 80-16c30 18 52 48 80 72 30 8 66 6 96 16 22 18 44 40 64 56 32 14 64 26 96 48-18 18-34 38-48 56-12 22-24 42-32 64-6 24-16 22-32 32-26-4-54-6-80-16-28-14-52-32-80-48-26-18-56-38-80-56-18-12-36-24-48-32-18-10-38-18-56-32-6-20-14-40-24-56s-4-48-8-80Z";

const RIVERS = [
  // Bhagirathi to Ganga at Haridwar
  "M272 104C262 98 252 96 246 98S196 120 166 139s-2 34 7 56 16 30 19 37-30 6-53 10-14 16-17 22",
  // Alaknanda from Badrinath to Devprayag
  "M334 138c6 10 12 22 12 30s-24 18-37 24-38 12-56 19-44 16-61 21",
];

const ROADS = [
  // Dehradun to Sankri (Kedarkantha, Har Ki Dun road head)
  "M101 205C104 190 112 170 108 150S112 110 125 85",
  // Rishikesh to Uttarkashi, Gangotri and Yamunotri
  "M139 242C150 210 158 170 166 139S220 104 246 98M166 139C158 126 150 112 168 94",
  // Rishikesh to Kedarnath
  "M139 242C160 236 180 236 192 232S236 218 253 211 254 168 256 152 262 142 267 139",
  // Rudraprayag to Badrinath
  "M253 211C272 204 292 198 309 192S334 176 346 168 338 146 334 138",
  // Kathgodam to Nainital, Almora, Kausani
  "M336 384C334 372 332 362 330 354S350 330 362 320 356 292 352 282",
];

const DIVIDE = "M452 160C405 222 332 252 302 300S268 368 276 396";

const towns = [
  { name: "Dehradun", x: 101, y: 205, dx: -8, anchor: "end" },
  { name: "Rishikesh", x: 139, y: 242, dx: -8, anchor: "end" },
  { name: "Uttarkashi", x: 166, y: 139, dx: -8, anchor: "end" },
  { name: "Joshimath", x: 346, y: 168, dx: 8, anchor: "start" },
  { name: "Nainital", x: 330, y: 354, dx: -8, anchor: "end" },
  { name: "Almora", x: 362, y: 320, dx: 8, anchor: "start" },
] as const;

const dhamPins: Record<(typeof dhams)[number]["name"], { x: number; y: number; lx: number; ly: number; anchor: "start" | "middle" | "end" }> = {
  Yamunotri: { x: 168, y: 94, lx: -12, ly: 22, anchor: "end" },
  Gangotri: { x: 246, y: 98, lx: 0, ly: -14, anchor: "middle" },
  Kedarnath: { x: 267, y: 139, lx: 0, ly: 22, anchor: "middle" },
  Badrinath: { x: 334, y: 138, lx: 0, ly: -14, anchor: "middle" },
};

const pinned = treks.filter((t): t is Trek & { pin: { x: number; y: number } } => Boolean(t.pin));

export function SketchMap() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 45%"] });
  const outline = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const rivers = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const roads = useTransform(scrollYProgress, [0.35, 0.8], [0, 1]);
  const labels = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const [selected, setSelected] = useState(pinned[0].slug);
  const trek = pinned.find((t) => t.slug === selected) ?? pinned[0];

  return (
    <section id="map" ref={ref} aria-labelledby="map-title" className="paper contours relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHead
          n="01"
          id="map-title"
          title={
            <>
              The sketch map of <em className="italic text-forest">Devbhoomi</em>
            </>
          }
          lede="Garhwal in the west, Kumaon in the east. Most high treks start from road heads in Uttarkashi and Chamoli, a long day's drive from Dehradun. Tap a pin to open its page."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
          <div className="relative min-w-0 rounded-md bg-card/70 p-3 shadow-[0_30px_60px_-30px_rgb(28_26_22/0.35)] ring-1 ring-ink/5 sm:p-6">
            <p className="mb-2 font-hand text-lg text-graphite sm:hidden" aria-hidden="true">
              ← swipe the map →
            </p>
            <div className="no-scrollbar overflow-x-auto" data-lenis-prevent-touch>
              <div className="relative min-w-[560px] sm:min-w-0" style={{ aspectRatio: `${W} / ${H}` }}>
                <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" role="img" aria-labelledby="map-svg-title">
                  <title id="map-svg-title">Sketch map of Uttarakhand showing trek routes, Char Dham shrines and main towns</title>
                  <motion.path
                    d={OUTLINE}
                    fill="rgb(35 69 49 / 0.05)"
                    stroke="var(--color-ink)"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    style={{ pathLength: outline }}
                  />
                  <motion.path d={DIVIDE} fill="none" stroke="var(--color-graphite)" strokeWidth="1.4" strokeDasharray="2 6" strokeLinecap="round" style={{ opacity: labels }} />
                  {RIVERS.map((d) => (
                    <motion.path key={d} d={d} fill="none" stroke="var(--color-pencil)" strokeWidth="2" strokeLinecap="round" style={{ pathLength: rivers }} />
                  ))}
                  {ROADS.map((d) => (
                    <motion.path
                      key={d}
                      d={d}
                      fill="none"
                      stroke="var(--color-vermilion)"
                      strokeWidth="1.8"
                      strokeDasharray="6 5"
                      strokeLinecap="round"
                      style={{ pathLength: roads }}
                    />
                  ))}
                  <motion.g style={{ opacity: labels }} fontFamily="var(--font-caveat), cursive">
                    <text x="190" y="300" fontSize="30" fill="var(--color-forest)" opacity="0.75">
                      Garhwal
                    </text>
                    <text x="400" y="292" fontSize="30" fill="var(--color-forest)" opacity="0.75">
                      Kumaon
                    </text>
                    <text x="64" y="440" fontSize="17" fill="var(--color-graphite)">
                      sketch map · not to scale
                    </text>
                    {towns.map((t) => (
                      <g key={t.name}>
                        <circle cx={t.x} cy={t.y} r="3.2" fill="var(--color-ink)" />
                        <text x={t.x + t.dx} y={t.y + 5} fontSize="17" textAnchor={t.anchor} fill="var(--color-ink)">
                          {t.name}
                        </text>
                      </g>
                    ))}
                    {dhams.map((d) => {
                      const p = dhamPins[d.name];
                      return (
                        <g key={d.name} transform={`translate(${p.x} ${p.y})`}>
                          <path d="M0-11 6-2H3V5H-3V-2H-6Z" fill="var(--color-ochre)" stroke="var(--color-ink)" strokeWidth="0.8" />
                          <text x={p.lx} y={p.ly} fontSize="15" textAnchor={p.anchor} fill="var(--color-ochre)" fontWeight="700">
                            {d.name}
                          </text>
                        </g>
                      );
                    })}
                  </motion.g>
                  {/* Compass rose */}
                  <g transform="translate(540 70)" opacity="0.8">
                    <circle r="26" fill="none" stroke="var(--color-ink)" strokeWidth="1" strokeDasharray="2 3" />
                    <path d="M0-30 6 0 0 30-6 0Z" fill="var(--color-ink)" />
                    <path d="M0-30 6 0H-6Z" fill="var(--color-vermilion)" />
                    <text y="-36" fontSize="13" textAnchor="middle" fontFamily="var(--font-inter-tight), sans-serif" fontWeight="700">
                      N
                    </text>
                  </g>
                </svg>
  
                {pinned.map((t, i) => (
                  <Pin key={t.slug} trek={t} index={i} progress={scrollYProgress} active={t.slug === selected} onSelect={() => setSelected(t.slug)} />
                ))}
              </div>
            </div>

            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-dashed border-ink/15 pt-4 text-sm text-graphite">
              <li className="flex items-center gap-2"><span className="size-3 rounded-full border-2 border-card bg-vermilion ring-1 ring-vermilion" />Trek</li>
              <li className="flex items-center gap-2"><span className="h-0 w-6 border-t-2 border-dashed border-vermilion" />Road head</li>
              <li className="flex items-center gap-2"><span className="h-0 w-6 border-t-2 border-pencil" />River</li>
              <li className="flex items-center gap-2"><span className="size-3 bg-ochre [clip-path:polygon(50%_0,100%_60%,100%_100%,0_100%,0_60%)]" />Char Dham</li>
            </ul>
          </div>

          <div className="lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.article
                key={trek.slug}
                initial={{ opacity: 0, rotateY: -70 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 70 }}
                transition={{ duration: 0.45, ease }}
                style={{ transformOrigin: "left center", transformPerspective: 1200 }}
                className="relative bg-card p-4 pb-6 shadow-[0_24px_50px_-24px_rgb(28_26_22/0.45)]"
                aria-live="polite"
              >
                <span className="tape absolute -top-3 left-8 h-6 w-24 -rotate-6" aria-hidden="true" />
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                  <Image src={trek.image} alt={`${trek.name} trek`} fill sizes="(min-width: 1024px) 380px, 90vw" className="object-cover" />
                </div>
                <p className="mt-4 font-hand text-xl text-vermilion">{trek.note}</p>
                <h3 className="font-display text-4xl leading-none">{trek.name}</h3>
                <p className="mt-1 text-sm text-graphite">{trek.region}</p>
                <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-dashed border-ink/15 py-3 text-center">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.15em] text-graphite">Top</dt>
                    <dd className="font-display text-xl">{trek.altitudeFt.toLocaleString("en-IN")} ft</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.15em] text-graphite">Days</dt>
                    <dd className="font-display text-xl">{trek.nights + 1}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.15em] text-graphite">From</dt>
                    <dd className="font-display text-xl">{inr(trek.price)}</dd>
                  </div>
                </dl>
                <a href="#trek-log" className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                  Read the full entry
                  <MoveRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </motion.article>
            </AnimatePresence>

            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Choose a trek on the map">
              {pinned.map((t) => (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => setSelected(t.slug)}
                  aria-pressed={t.slug === selected}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${
                    t.slug === selected ? "border-ink bg-ink text-card" : "border-ink/15 bg-card/60 text-ink hover:border-ink/40"
                  }`}
                >
                  {t.name.split(" · ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pin({
  trek,
  index,
  progress,
  active,
  onSelect,
}: {
  trek: Trek & { pin: { x: number; y: number } };
  index: number;
  progress: MotionValue<number>;
  active: boolean;
  onSelect: () => void;
}) {
  const start = 0.45 + index * 0.025;
  const scale = useTransform(progress, [start, start + 0.08], [0, 1]);
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      style={{ left: `${(trek.pin.x / W) * 100}%`, top: `${(trek.pin.y / H) * 100}%`, scale }}
      className="group absolute z-10 -ml-3 -mt-3 grid size-6 place-items-center"
      aria-label={`${trek.name}, ${trek.altitudeFt.toLocaleString("en-IN")} ft`}
      aria-pressed={active}
    >
      <span
        aria-hidden="true"
        className={`size-4 rounded-full border-2 border-card shadow transition ${
          active ? "scale-125 bg-ink ring-2 ring-vermilion" : "bg-vermilion group-hover:scale-125"
        }`}
      />
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-sm bg-ink px-2 py-0.5 font-hand text-base text-card group-hover:block group-focus-visible:block">
        {trek.name.split(" · ")[0]}
      </span>
    </motion.button>
  );
}
