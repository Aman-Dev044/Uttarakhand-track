import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#060a1c" }}>
        <svg width="130" height="130" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7fe3ff" />
              <stop offset="1" stopColor="#8b6cff" />
            </linearGradient>
          </defs>
          <path d="M8 52 27 20l7 12 6-8 16 28Z" fill="url(#g)" />
          <path d="m27 20 6 10-6-3-5 4Z" fill="#e9f3ff" />
          <path d="m47 8 1.5 4L52.5 13.5 48.5 15 47 19l-1.5-4-4-1.5 4-1.5Z" fill="#c8ff3a" />
        </svg>
      </div>
    ),
    size,
  );
}
