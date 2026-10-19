"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { panchKedar, panchPrayag } from "@/data/content";
import { Reveal, SectionTitle, ease, toDevanagari } from "./ui";

// River diagram: points sit on the Alaknanda in upstream → downstream order
const prayagPoints = [
  { x: 540, y: 55, trib: "M592 112 Q570 70 540 55", lx: 524, ly: 40, anchor: "end" },
  { x: 440, y: 125, trib: "M418 32 Q450 80 440 125", lx: 452, ly: 150, anchor: "start" },
  { x: 350, y: 180, trib: "M402 262 Q360 230 350 180", lx: 336, ly: 160, anchor: "end" },
  { x: 240, y: 240, trib: "M222 128 Q252 190 240 240", lx: 252, ly: 266, anchor: "start" },
  { x: 90, y: 312, trib: "M64 188 Q100 260 90 312", lx: 102, ly: 338, anchor: "start" },
] as const;

const MAIN = "M572 26Q560 44 540 55T440 125T350 180T240 240T90 312T18 338";

function Hexagram() {
  return (
    <svg viewBox="0 0 100 100" className="absolute -right-6 -top-6 size-32 text-marigold/60 transition-transform duration-[1.2s] group-hover:rotate-[60deg]" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <polygon
          pathLength={1}
          points="50,8 86,71 14,71"
          className="transition-[stroke-dashoffset] duration-1000 [stroke-dasharray:1] [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0] group-focus-within:[stroke-dashoffset:0]"
        />
        <polygon
          pathLength={1}
          points="50,92 14,29 86,29"
          className="transition-[stroke-dashoffset] delay-150 duration-1000 [stroke-dasharray:1] [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0] group-focus-within:[stroke-dashoffset:0]"
        />
        <circle cx="50" cy="50" r="42" strokeDasharray="1 4" opacity=".6" />
      </g>
    </svg>
  );
}

export function SacredCircuits() {
  const [active, setActive] = useState(4);
  const prayag = panchPrayag[active];

  return (
    <section id="circuits" aria-labelledby="circuits-title" className="aipan relative overflow-hidden bg-maroon-deep py-24 text-ivory sm:py-32">
      <div className="miniature-border absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <SectionTitle
          id="circuits-title"
          tone="dark"
          hindi="पंच केदार · पंच प्रयाग"
          eyebrow="Sacred circuits"
          title={
            <>
              Shiva in five valleys, <em className="text-marigold">the Ganga at five confluences</em>
            </>
          }
          lede="After the Mahabharata war, the Pandavas sought Shiva's forgiveness. He hid from them as a bull and sank into the earth, and his body is said to have reappeared at five places. These are the Panch Kedar."
        />

        <ul className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {panchKedar.map((k, i) => (
            <Reveal
              as="li"
              key={k.name}
              delay={i * 0.07}
              className="group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-[1.75rem] border border-brass-light/25 bg-ivory/[0.05] p-6 transition-colors duration-500 hover:border-marigold/60 hover:bg-ivory/[0.09] sm:w-auto"
            >
              <Hexagram />
              <span className="font-deva text-4xl text-marigold" aria-hidden="true">
                {toDevanagari(i + 1)}
              </span>
              <h3 className="mt-4 font-display text-3xl lg:text-2xl xl:text-[1.7rem]">{k.name}</h3>
              <p className="mt-1 font-inscription text-xs uppercase tracking-[0.2em] text-brass-light">
                {k.part} · {k.altitude}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ivory/70">{k.copy}</p>
            </Reveal>
          ))}
        </ul>

        {/* Panch Prayag river diagram */}
        <div className="mt-24 grid items-center gap-10 lg:grid-cols-[1.25fr_.75fr]">
          <div>
            <Reveal>
              <h3 className="font-display text-4xl sm:text-5xl">The Panch Prayag</h3>
              <p className="mt-3 max-w-xl text-ivory/70">
                Five confluences on the Alaknanda, from Vishnuprayag near Joshimath down to Devprayag, where it meets
                the Bhagirathi and the two become the Ganga. Tap a confluence.
              </p>
            </Reveal>
            <svg viewBox="0 0 610 360" className="mt-8 w-full" role="group" aria-label="Map of the five confluences on the Alaknanda">
              <motion.path
                d={MAIN}
                fill="none"
                stroke="#3d9a90"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 2.2, ease }}
              />
              <text x="540" y="16" fill="#e2bd72" fontSize="13" textAnchor="middle" className="font-inscription">
                ALAKNANDA
              </text>
              <text x="30" y="176" fill="#e2bd72" fontSize="13" className="font-inscription">
                BHAGIRATHI
              </text>
              {prayagPoints.map((p, i) => {
                const on = active === i;
                return (
                  <g key={panchPrayag[i].name}>
                    <motion.path
                      d={p.trib}
                      fill="none"
                      stroke={on ? "#f6a723" : "#3d9a90"}
                      strokeOpacity={on ? 1 : 0.6}
                      strokeWidth={on ? 4 : 3}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 1, delay: 0.6 + i * 0.25, ease }}
                    />
                    <g
                      role="button"
                      tabIndex={0}
                      aria-pressed={on}
                      aria-label={`${panchPrayag[i].name}: the Alaknanda meets the ${panchPrayag[i].meets}`}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActive(i);
                        }
                      }}
                      className="cursor-pointer outline-none [&:focus-visible>circle:first-child]:stroke-ivory"
                    >
                      <circle cx={p.x} cy={p.y} r="22" fill="transparent" stroke={on ? "#f6a723" : "transparent"} strokeDasharray="3 4" strokeWidth="1.5" />
                      <circle cx={p.x} cy={p.y} r={on ? 11 : 8} fill={on ? "#f6a723" : "#fbf5e9"} stroke="#3d0b16" strokeWidth="3" className="transition-all duration-300" />
                      <text x={p.lx} y={p.ly} textAnchor={p.anchor} fill={on ? "#f6a723" : "#fbf5e9"} fontSize="19" className="font-display" fontWeight={600}>
                        {panchPrayag[i].name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="relative min-h-64 overflow-hidden rounded-[2rem] border border-brass-light/30 bg-night/40 p-8" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={prayag.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease }}
              >
                <p className="font-inscription text-xs uppercase tracking-[0.3em] text-brass-light">
                  Confluence {active + 1} of 5
                </p>
                <p className="mt-3 font-display text-4xl text-marigold">{prayag.name}</p>
                <p className="mt-2 text-lg">
                  Alaknanda <span className="text-brass-light">+</span> {prayag.meets}
                </p>
                <p className="mt-4 leading-relaxed text-ivory/70">{prayag.copy}</p>
              </motion.div>
            </AnimatePresence>
            <ul className="mt-8 flex gap-2" aria-label="Choose a confluence">
              {panchPrayag.map((p, i) => (
                <li key={p.name}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={p.name}
                    aria-current={active === i}
                    className="group/dot block py-3"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-500 ${
                        active === i ? "w-10 bg-marigold" : "w-5 bg-ivory/25 group-hover/dot:bg-ivory/50"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
