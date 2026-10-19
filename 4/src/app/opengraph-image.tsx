import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { site } from "@/data/site";

export const alt = `${site.name}: Char Dham Yatra 2026 and pilgrimage treks in Uttarakhand`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const temple = await readFile(join(process.cwd(), "public/images/kedarnath.jpg"), "base64");
const templeSrc = `data:image/jpeg;base64,${temple}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundImage: "linear-gradient(180deg, #24060d 0%, #5a1222 45%, #b4371c 80%, #f08a2a 100%)",
        }}
      >
        <svg width="620" height="620" viewBox="0 0 200 200" style={{ position: "absolute", top: 5, left: 690 }}>
          <g fill="none" stroke="#f6a723" strokeOpacity="0.35" strokeWidth="0.7">
            <circle cx="100" cy="100" r="96" />
            <circle cx="100" cy="100" r="80" strokeDasharray="1 3" />
            <circle cx="100" cy="100" r="64" />
            <circle cx="100" cy="100" r="48" strokeDasharray="2 3" />
          </g>
        </svg>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 720, color: "#fbf5e9" }}>
          <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#e2bd72" }}>{`${site.name} · Land of the God`}</div>
          <div style={{ fontSize: 84, lineHeight: 1, marginTop: 28, color: "#f6a723" }}>Char Dham Yatra 2026</div>
          <div style={{ fontSize: 60, lineHeight: 1.05, marginTop: 8 }}>& the sacred trails of Uttarakhand</div>
          <div style={{ fontSize: 26, marginTop: 30, opacity: 0.8 }}>Yamunotri · Gangotri · Kedarnath · Badrinath</div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 75,
            left: 840,
            width: 320,
            height: 480,
            display: "flex",
            borderRadius: "160px 160px 24px 24px",
            border: "6px solid #e2bd72",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={templeSrc} alt="" width={320} height={480} style={{ width: 320, height: 480, objectFit: "cover" }} />
        </div>
      </div>
    ),
    size,
  );
}
