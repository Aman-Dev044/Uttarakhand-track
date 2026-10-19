"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

const RIVER =
  "M30 0C58 70 2 130 30 200S58 330 30 400 2 530 30 600 58 730 30 800 2 930 30 1000";

/**
 * The Ganga, drawn as one thin line that winds down the page beside the sections it links.
 * Purely decorative and only shown where there is a wide enough margin.
 */
export function RiverFlow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end end"] });
  const length = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <div ref={ref} className="relative">
      {children}
      <svg
        viewBox="0 0 60 1000"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-y-0 left-[max(0.5rem,calc(50%-45rem))] z-20 hidden h-full w-14 min-[1360px]:block"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="river-stroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d9a90" />
            <stop offset="55%" stopColor="#e2bd72" />
            <stop offset="100%" stopColor="#3d9a90" />
          </linearGradient>
        </defs>
        <path d={RIVER} fill="none" stroke="#b4873a" strokeOpacity=".22" strokeWidth="1" strokeDasharray="2 6" vectorEffect="non-scaling-stroke" />
        <motion.path
          d={RIVER}
          fill="none"
          stroke="url(#river-stroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: length }}
        />
      </svg>
    </div>
  );
}
