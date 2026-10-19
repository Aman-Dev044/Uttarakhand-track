import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { site } from "@/data/site";
import { treks } from "@/data/content";

export const alt = `${site.name}: compare Himalayan treks in Uttarakhand by altitude, grade and price`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const hero = await readFile(join(process.cwd(), "public/images/hero.jpg"), "base64");
const heroSrc = `data:image/jpeg;base64,${hero}`;

// Deterministic "stars" so the image is identical on every build
const stars = Array.from({ length: 70 }, (_, i) => ({
  x: (i * 157) % 1200,
  y: (i * 89) % 260,
  r: i % 9 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
}));

const top = Math.max(...treks.map((t) => t.altitudeFt)).toLocaleString("en-IN");
const from = Math.min(...treks.map((t) => t.price)).toLocaleString("en-IN");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#060a1c" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroSrc} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover", opacity: 0.55 }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: "linear-gradient(180deg, rgba(6,10,28,.96) 0%, rgba(6,10,28,.6) 45%, rgba(40,24,90,.55) 75%, rgba(6,10,28,.95) 100%)",
          }}
        />
        {stars.map((s, i) => (
          <div key={i} style={{ position: "absolute", left: s.x, top: s.y, width: s.r, height: s.r, borderRadius: 9, background: "#e9f3ff", opacity: 0.8 }} />
        ))}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%", color: "#e9f3ff" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "#7fe3ff" }}>{`${site.name} · Uttarakhand`}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 86, lineHeight: 1, fontWeight: 700, letterSpacing: -2 }}>Himalayan treks,</div>
            <div style={{ fontSize: 86, lineHeight: 1, fontWeight: 700, letterSpacing: -2, color: "#2de2c4" }}>decoded.</div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {[`${treks.length} treks compared`, `Up to ${top} ft`, `From ₹${from}`, "Char Dham route"].map((t) => (
              <div key={t} style={{ display: "flex", fontSize: 24, padding: "10px 20px", borderRadius: 999, border: "1px solid rgba(233,243,255,.25)", background: "rgba(6,10,28,.6)" }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
