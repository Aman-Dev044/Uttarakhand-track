import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { site } from "@/data/site";
import { treks } from "@/data/content";

export const alt = `${site.name}: signature Himalayan treks in Uttarakhand for the 2026–27 season`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const hero = await readFile(join(process.cwd(), "public/images/hero.jpg"), "base64");
const heroSrc = `data:image/jpeg;base64,${hero}`;
const from = Math.min(...treks.map((t) => t.price)).toLocaleString("en-IN");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f7f9fb", padding: 28, gap: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 560, padding: "36px 20px 36px 44px", color: "#0f1720" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 600 }}>
            <svg width="40" height="40" viewBox="0 0 64 64">
              <path d="M8 50 27 17l8.5 14.5 6-8.5L57 50Z" fill="#0f1720" />
              <path d="m27 17 7 11.8-7-3.2-5.6 4.2Z" fill="#6f9fc4" />
              <circle cx="48" cy="14" r="4.5" fill="#e0482f" />
            </svg>
            {site.name}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 22, color: "#e0482f", marginBottom: 18 }}>Uttarakhand · 2026–27 season</div>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 0.98, letterSpacing: -3 }}>Signature</div>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 0.98, letterSpacing: -3 }}>Himalayan treks.</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[`${treks.length} treks`, `From ₹${from}`, "Char Dham"].map((t) => (
              <div key={t} style={{ display: "flex", fontSize: 22, padding: "10px 20px", borderRadius: 999, background: "#e8eef3", color: "#2a3644" }}>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, borderRadius: 28, overflow: "hidden", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroSrc} alt="" width={584} height={574} style={{ width: 584, height: 574, objectFit: "cover" }} />
        </div>
      </div>
    ),
    size,
  );
}
