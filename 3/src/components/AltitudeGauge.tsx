"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";

const TOP = 16200;
const marks = [
  { ft: 2100, label: "Dehradun" },
  { ft: 12500, label: "Kedarkantha" },
  { ft: 15800, label: "Roopkund" },
  { ft: TOP, label: "Bali Pass" },
];

/** Page scroll shown as a climb: a fixed altimeter on desktop, a thin progress line on mobile */
export function AltitudeGauge() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const readout = useRef<HTMLSpanElement>(null);

  useMotionValueEvent(progress, "change", (v) => {
    const node = readout.current?.firstChild;
    if (node) node.nodeValue = Math.round(Math.max(0, Math.min(1, v)) * TOP).toLocaleString("en-IN").padStart(6, "0");
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-teal via-glacier to-volt min-[1400px]:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center min-[1400px]:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-mist">ft</span>
        <div className="relative mt-3 h-[44vh] w-px bg-ice/15">
          <motion.div style={{ scaleY: progress }} className="absolute inset-0 origin-bottom bg-gradient-to-t from-teal via-glacier to-volt" />
          {marks.map((m) => (
            <span key={m.label} className="absolute -left-1.5 h-px w-3 bg-ice/45" style={{ bottom: `${(m.ft / TOP) * 100}%` }} />
          ))}
        </div>
        <span
          ref={readout}
          className="mt-4 font-mono text-[10px] tracking-[0.12em] text-volt [writing-mode:vertical-rl] rotate-180"
        >
          000000
        </span>
      </div>
    </>
  );
}
