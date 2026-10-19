import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#6b1527" }}>
        <svg width="130" height="130" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="22" fill="none" stroke="#e2bd72" strokeWidth="2" strokeDasharray="2 3" />
          <path d="M32 14c6 9 7 15 0 26-7-11-6-17 0-26Z" fill="#f6a723" />
          <path d="M32 22c3 5 3.5 8 0 14-3.5-6-3-9 0-14Z" fill="#fff3c4" />
          <path d="M16 40h32c-2 7-8 10-16 10s-14-3-16-10Z" fill="#e2bd72" />
        </svg>
      </div>
    ),
    size,
  );
}
