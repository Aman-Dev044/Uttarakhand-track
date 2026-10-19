"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Counter, Reveal } from "./ui";

const places = [
  "Kedarnath", "Roopkund", "Valley of Flowers", "Rishikesh", "Badrinath", "Kedarkantha",
  "Nainital", "Har Ki Dun", "Auli", "Gangotri", "Jim Corbett", "Chopta", "Yamunotri", "Kuari Pass",
];

export function Marquee() {
  return (
    <div aria-hidden="true" className="relative z-10 -mt-px overflow-hidden bg-snow py-6">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-3xl italic text-ink/80 sm:text-4xl">
        {[...places, ...places].map((p, i) => (
          <span key={i} className="flex items-center gap-10">
            {p}
            <svg viewBox="0 0 24 24" className="size-5 text-saffron">
              <path d="M12 0 14 10 24 12 14 14 12 24 10 14 0 12 10 10Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

const statement =
  "Devbhoomi, the Land of the God, is where the Ganga and Yamuna are born, where Nanda Devi rises 7,816 metres into the sky, and where every trail ends at a temple, a meadow or a story. We have spent years learning its paths so you can walk them safely.";

const facts = [
  { to: 53483, suffix: " km²", label: "of Himalayan state, 13 districts" },
  { to: 7816, suffix: " m", label: "Nanda Devi, India's 2nd-highest peak" },
  { to: 4, suffix: "", label: "Char Dham shrines of the Hindu faith" },
  { to: 1, suffix: "", label: "UNESCO site: Nanda Devi & Valley of Flowers" },
];

export function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = statement.split(" ");

  return (
    <section aria-labelledby="intro-title" className="grain relative bg-snow py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 id="intro-title" className="mb-10 text-xs font-semibold uppercase tracking-[0.28em] text-saffron">
          Why Uttarakhand, why now
        </h2>
        <p ref={ref} className="font-display text-3xl leading-[1.2] tracking-tight text-ink sm:text-5xl sm:leading-[1.12]">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-ink/10 pt-12 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <Counter to={f.to} suffix={f.suffix} className="whitespace-nowrap font-display text-4xl text-ink sm:text-5xl xl:text-6xl"
                  suffixClassName="text-[0.5em] text-charcoal/60"
                />
                <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-charcoal/65">{f.label}</p>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}
