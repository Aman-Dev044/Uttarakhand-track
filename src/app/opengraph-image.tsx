import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Trekking Compass: Himalayan treks and Char Dham Yatra in Uttarakhand";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const hero = await readFile(join(process.cwd(), "public/images/hero.jpg"), "base64");
const heroSrc = `data:image/jpeg;base64,${hero}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0a1714" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroSrc} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: "linear-gradient(90deg, rgba(10,23,20,.92) 0%, rgba(10,23,20,.55) 55%, rgba(10,23,20,.1) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", color: "#f6f2ea" }}>
          <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#ffb169" }}>Trekking Compass · Uttarakhand</div>
          <div style={{ fontSize: 92, lineHeight: 0.95, marginTop: 24, fontWeight: 300, maxWidth: 760 }}>Trek into your own story.</div>
          <div style={{ fontSize: 30, marginTop: 32, opacity: 0.8, maxWidth: 700 }}>
            150+ Himalayan treks · Char Dham Yatra · Expeditions
          </div>
        </div>
      </div>
    ),
    size,
  );
}
