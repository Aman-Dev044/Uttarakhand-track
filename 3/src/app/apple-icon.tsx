import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f9fb" }}>
        <svg width="132" height="132" viewBox="0 0 64 64">
          <path d="M8 50 27 17l8.5 14.5 6-8.5L57 50Z" fill="#0f1720" />
          <path d="m27 17 7 11.8-7-3.2-5.6 4.2Z" fill="#6f9fc4" />
          <circle cx="48" cy="14" r="4.5" fill="#e0482f" />
        </svg>
      </div>
    ),
    size,
  );
}
