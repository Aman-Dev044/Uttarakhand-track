"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { treks } from "@/data/content";

const names = treks.slice(0, 9).map((t) => t.name.split(" · ")[0]);
const wrap = (min: number, max: number, v: number) => ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

/** Outline-type ribbon whose speed and direction follow the scroll velocity */
export function Marquee() {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-2000, 0, 2000], [-6, 0, 6], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    const move = direction.current * -1.4 * (delta / 1000) * (1 + Math.abs(f));
    base.set(base.get() + move);
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {names.map((n) => (
        <span key={n} className="flex items-center">
          <span className="text-outline whitespace-nowrap px-[0.25em] transition-colors duration-500 hover:text-slate">{n}</span>
          <svg viewBox="0 0 24 24" className="size-[0.32em] shrink-0 text-alpine" aria-hidden="true">
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </span>
  );

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-frost bg-snow py-6 sm:py-10">
      <motion.div style={{ x }} className="flex w-max font-condensed text-[17vw] leading-[0.9] tracking-[-0.03em] sm:text-[11vw]">
        {row}
        {row}
      </motion.div>
    </div>
  );
}
