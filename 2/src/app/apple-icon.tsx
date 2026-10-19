import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4efe4" }}>
        <svg width="120" height="120" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="26" fill="none" stroke="#1c1a16" strokeWidth="3" strokeDasharray="5 4" />
          <path d="M32 8 38 32 32 56 26 32Z" fill="#c8402a" />
          <path d="M32 8 38 32H26Z" fill="#1c1a16" />
        </svg>
      </div>
    ),
    size,
  );
}
