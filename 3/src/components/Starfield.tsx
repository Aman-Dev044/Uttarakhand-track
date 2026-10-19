"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; a: number; speed: number; phase: number };

/**
 * Lightweight canvas starfield: twinkling stars, a slow drift and the odd shooting star.
 * It pauses when offscreen or when the tab is hidden, and draws a single still frame
 * when the visitor prefers reduced motion.
 */
export function Starfield({ className = "", density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let frame = 0;
    let visible = true;
    let inView = true;
    let shoot: { x: number; y: number; life: number } | null = null;

    const seed = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(420, Math.round(((w * h) / 4200) * density));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() < 0.08 ? 1.4 + Math.random() * 0.8 : 0.4 + Math.random() * 0.8,
        a: 0.3 + Math.random() * 0.7,
        speed: 0.02 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const twinkle = reduce ? 1 : 0.55 + 0.45 * Math.sin(t * 0.0015 + s.phase);
        ctx.globalAlpha = s.a * twinkle;
        ctx.fillStyle = s.r > 1.3 ? "#cdeeff" : "#e9f3ff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce) {
          s.x -= s.speed;
          if (s.x < -2) s.x = w + 2;
        }
      }
      if (!reduce) {
        if (!shoot && Math.random() < 0.003) shoot = { x: Math.random() * w * 0.8 + w * 0.2, y: Math.random() * h * 0.4, life: 1 };
        if (shoot) {
          const len = 120 * shoot.life;
          const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x + len, shoot.y - len * 0.4);
          g.addColorStop(0, "rgba(233,243,255,0.9)");
          g.addColorStop(1, "rgba(233,243,255,0)");
          ctx.globalAlpha = shoot.life;
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(shoot.x, shoot.y);
          ctx.lineTo(shoot.x + len, shoot.y - len * 0.4);
          ctx.stroke();
          shoot.x -= 9;
          shoot.y += 3.6;
          shoot.life -= 0.02;
          if (shoot.life <= 0) shoot = null;
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      if (visible && !reduce) frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(loop);
    };

    seed();
    start();

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      visible = inView && !document.hidden;
      if (visible) start();
    });
    io.observe(canvas);
    const onVisibility = () => {
      visible = inView && !document.hidden;
      if (visible) start();
    };
    const ro = new ResizeObserver(() => {
      seed();
      if (reduce) draw(0);
    });
    ro.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 size-full ${className}`} />;
}
