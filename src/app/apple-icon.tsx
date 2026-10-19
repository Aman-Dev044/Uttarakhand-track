import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a1714" }}>
        <svg width="120" height="120" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="26" fill="none" stroke="#f6f2ea" strokeOpacity="0.35" strokeWidth="3" />
          <path d="M32 8 38 32 32 56 26 32Z" fill="#f0782a" />
          <path d="M32 8 38 32H26Z" fill="#ffb169" />
        </svg>
      </div>
    ),
    size,
  );
}
