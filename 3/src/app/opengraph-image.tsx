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
const logo = await readFile(join(process.cwd(), "public/logo.png"), "base64");
const from = Math.min(...treks.map((t) => t.price)).toLocaleString("en-IN");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f7f9fb", padding: 28, gap: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 560, padding: "36px 20px 36px 44px", color: "#0f1720" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 600 }}>
            <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", boxShadow: "0 0 0 1px rgba(15,23,32,0.1)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`data:image/png;base64,${logo}`} width={48} height={48} alt="" />
            </div>
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
