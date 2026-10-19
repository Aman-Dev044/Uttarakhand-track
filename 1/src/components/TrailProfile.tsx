"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Check } from "lucide-react";
import { SectionHeading } from "./ui";

const days = [
  { day: 1, camp: "Lohajung", ft: 7600 },
  { day: 2, camp: "Didna village", ft: 8000 },
  { day: 3, camp: "Abin Bugyal", ft: 10800 },
  { day: 4, camp: "Patar Nachauni", ft: 12700 },
  { day: 5, camp: "Bhagwabasa", ft: 14100 },
  { day: 6, camp: "Roopkund lake", ft: 15800 },
  { day: 7, camp: "Lohajung", ft: 7600 },
];

const included = [
  "Stays in guesthouses and alpine tents",
  "All meals on the trek, cooked fresh",
  "Forest permits and camping fees",
  "Certified trek leader and local guides",
  "Oxygen, first-aid and microspikes",
  "Mules and porters for common gear",
];

const W = 1000;
const H = 360;
const PAD = 40;
const minFt = 6000;
const maxFt = 16500;
const x = (i: number) => PAD + (i * (W - PAD * 2)) / (days.length - 1);
const y = (ft: number) => H - PAD - ((ft - minFt) / (maxFt - minFt)) * (H - PAD * 2);

// Smooth curve through each camp
const points = days.map((d, i) => [x(i), y(d.ft)] as const);
const linePath = points.reduce((acc, [px, py], i) => {
  if (i === 0) return `M${px},${py}`;
  const [qx, qy] = points[i - 1];
  const cx = (qx + px) / 2;
  return `${acc} C${cx},${qy} ${cx},${py} ${px},${py}`;
}, "");
const areaPath = `${linePath} L${x(days.length - 1)},${H - PAD} L${x(0)},${H - PAD} Z`;

export function TrailProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const areaOpacity = useTransform(progress, [0.2, 1], [0, 1]);

  return (
    <section aria-labelledby="trail-title" className="topo relative overflow-hidden bg-ink py-24 text-snow sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:items-end">
          <SectionHeading
            id="trail-title"
            tone="dark"
            eyebrow="Anatomy of a trek"
            title="Roopkund, one camp"
            accent="at a time."
            description="We climb high and sleep low, adding no more than about 2,000 ft a day so your body acclimatises. Scroll to walk the 8-day trail profile."
          />
          <div className="rounded-3xl bg-snow/5 p-6 ring-1 ring-snow/10">
            <p className="text-xs uppercase tracking-[0.2em] text-snow/50">Every trek includes</p>
            <ul className="mt-4 space-y-2.5 text-sm text-snow/80">
              {included.map((i) => (
                <li key={i} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-moss" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure ref={ref} className="mt-16">
          <div className="no-scrollbar overflow-x-auto">
            <svg
              viewBox={`0 0 ${W} ${H + 60}`}
              className="min-w-[44rem] w-full"
              role="img"
              aria-labelledby="trail-desc"
            >
              <title id="trail-desc">
                Roopkund trek elevation: from Lohajung at 7,600 ft up to Roopkund lake at 15,800 ft on day 6, returning to
                Lohajung on day 7.
              </title>
              <defs>
                <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f0782a" stopOpacity=".45" />
                  <stop offset="100%" stopColor="#f0782a" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[8000, 10000, 12000, 14000, 16000].map((ft) => (
                <g key={ft}>
                  <line x1={PAD} x2={W - PAD} y1={y(ft)} y2={y(ft)} stroke="#fff" strokeOpacity=".08" strokeDasharray="4 6" />
                  <text x={W - PAD} y={y(ft) - 6} textAnchor="end" fill="#fff" fillOpacity=".35" fontSize="12">
                    {ft.toLocaleString("en-IN")} ft
                  </text>
                </g>
              ))}
              <motion.path d={areaPath} fill="url(#area)" style={{ opacity: areaOpacity }} />
              <motion.path
                d={linePath}
                fill="none"
                stroke="#ffb169"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength: progress }}
              />
              {days.map((d, i) => (
                <Camp key={i} index={i} progress={progress} {...d} />
              ))}
            </svg>
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-saffron-2 md:hidden" aria-hidden="true">
            Swipe to see the full profile →
          </p>
          <figcaption className="mt-4 text-sm text-snow/50">
            Day 8: drive back to Dehradun. Altitudes are approximate.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Camp({ index, day, camp, ft, progress }: { index: number; day: number; camp: string; ft: number; progress: MotionValue<number> }) {
  const at = index / (days.length - 1);
  const opacity = useTransform(progress, [Math.max(0, at - 0.08), at], [0, 1]);
  const scale = useTransform(progress, [Math.max(0, at - 0.08), at], [0.4, 1]);
  const cx = x(index);
  const cy = y(ft);
  const peak = ft === 15800;
  return (
    <motion.g style={{ opacity }}>
      <motion.circle cx={cx} cy={cy} r={peak ? 9 : 6} fill={peak ? "#f0782a" : "#0a1714"} stroke="#ffb169" strokeWidth="3" style={{ scale, transformOrigin: `${cx}px ${cy}px` }} />
      <text x={cx} y={cy - 18} textAnchor="middle" fill="#f6f2ea" fontSize="14" fontWeight="600">
        {camp}
      </text>
      <text x={cx} y={cy - 36} textAnchor="middle" fill="#ffb169" fontSize="12">
        {ft.toLocaleString("en-IN")} ft
      </text>
      <text x={cx} y={H + 20} textAnchor="middle" fill="#fff" fillOpacity=".5" fontSize="12" letterSpacing="2">
        DAY {day}
      </text>
    </motion.g>
  );
}
