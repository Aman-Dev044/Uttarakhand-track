"use client";

import { useId } from "react";
import { motion, type Variants } from "motion/react";
import Image from "next/image";

export const ease = [0.22, 1, 0.36, 1] as const;

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

/** Fades and lifts content in once it scrolls into view */
export function Rise({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Tag>
  );
}

const letters: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({ transition: { staggerChildren: 0.035, delayChildren: delay } }),
};
const letter: Variants = {
  hidden: { opacity: 0, y: 6, rotate: -6 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.3, ease } },
};

/** Handwritten note that appears letter by letter */
export function Scribble({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span
      className={`inline-block font-hand ${className ?? ""}`}
      variants={letters}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      custom={delay}
    >
      <span className="sr-only">{text}</span>
      {Array.from(text).map((ch, i) => (
        <motion.span key={i} variants={letter} aria-hidden="true" className="inline-block whitespace-pre">
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

/** Hand-drawn underline that draws itself under a word */
export function Underline({ children, color = "var(--color-vermilion)" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg aria-hidden="true" viewBox="0 0 200 16" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-2 w-full overflow-visible">
        <motion.path
          d="M3 10c38-6 80-8 124-6 25 1 47 3 70 1"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.5 }}
        />
      </svg>
    </span>
  );
}

/** Hand-drawn curly arrow */
export function Arrow({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 90 60" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <motion.path
        d="M4 8c18 30 46 40 74 34M66 30l13 12-16 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease, delay: 0.3 }}
      />
    </svg>
  );
}

/** Circular rubber-stamp postmark with text around the ring */
export function Postmark({
  top,
  bottom,
  center,
  className,
  color = "var(--color-vermilion)",
}: {
  top: string;
  bottom: string;
  center: string;
  className?: string;
  color?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={`${top} ${center} ${bottom}`}>
      <defs>
        <path id={`${id}-t`} d="M20 60a40 40 0 0 1 80 0" />
        <path id={`${id}-b`} d="M14 60a46 46 0 0 0 92 0" />
      </defs>
      <g fill="none" stroke={color} strokeWidth="2" opacity="0.85">
        <circle cx="60" cy="60" r="56" />
        <circle cx="60" cy="60" r="34" strokeDasharray="2 3" />
      </g>
      <g fill={color} opacity="0.9" fontFamily="var(--font-inter-tight), sans-serif" fontWeight="700" letterSpacing="2.5">
        <text fontSize="10">
          <textPath href={`#${id}-t`} startOffset="50%" textAnchor="middle">
            {top.toUpperCase()}
          </textPath>
        </text>
        <text fontSize="9">
          <textPath href={`#${id}-b`} startOffset="50%" textAnchor="middle">
            {bottom.toUpperCase()}
          </textPath>
        </text>
        <text x="60" y="65" fontSize="15" textAnchor="middle" letterSpacing="0.5">
          {center}
        </text>
      </g>
    </svg>
  );
}

/** Chapter heading: handwritten chapter number, serif title, optional lede */
export function ChapterHead({
  n,
  id,
  title,
  lede,
  className,
  align = "left",
}: {
  n: string;
  id: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className ?? ""}`}>
      <Scribble text={`Chapter ${n}`} className="text-2xl text-vermilion" />
      <Rise>
        <h2 id={id} className="mt-1 font-display text-5xl leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {title}
        </h2>
      </Rise>
      {lede && (
        <Rise delay={0.1}>
          <p className={`mt-5 text-lg leading-relaxed text-graphite text-pretty ${align === "center" ? "mx-auto" : ""} max-w-2xl`}>{lede}</p>
        </Rise>
      )}
    </header>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="block size-11 shrink-0 overflow-hidden rounded-full">
        <Image src="/logo.png" alt="" width={96} height={96} className="size-full" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-xl">Aastha Ki Yatra</span>
        <span className="block font-hand text-[15px] text-graphite">a pilgrim&rsquo;s journal of faith</span>
      </span>
    </span>
  );
}
