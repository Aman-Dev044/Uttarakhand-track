import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { site } from "@/data/site";

export const alt = `${site.name}: Uttarakhand trekking guide, treks by season`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const photo = await readFile(join(process.cwd(), "public/images/kedarkantha.jpg"), "base64");
const photoSrc = `data:image/jpeg;base64,${photo}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#f4efe4", padding: "0 70px", color: "#1c1a16" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 600 }}>
          <div style={{ fontSize: 24, letterSpacing: 5, textTransform: "uppercase", color: "#c8402a" }}>{`${site.name} · Field notes`}</div>
          <div style={{ fontSize: 88, lineHeight: 0.95, marginTop: 22 }}>Uttarakhand trekking, season by season.</div>
          <div style={{ fontSize: 28, marginTop: 28, color: "#5f5a50" }}>15 treks · day-by-day diaries · packing lists</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 40,
            padding: 18,
            paddingBottom: 60,
            background: "#fbf8f1",
            transform: "rotate(4deg)",
            boxShadow: "0 30px 60px rgba(28,26,22,.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoSrc} alt="" width={420} height={315} style={{ width: 420, height: 315, objectFit: "cover" }} />
          <div style={{ fontSize: 30, marginTop: 14, color: "#5f5a50" }}>Kedarkantha summit</div>
        </div>
      </div>
    ),
    size,
  );
}
