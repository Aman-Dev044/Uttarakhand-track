import { ImageResponse } from "next/og";
import { Emblem } from "@/components/Emblem";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Full-bleed square: iOS applies its own rounded mask to home screen icons.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <Emblem size={180} />
      </div>
    ),
    size,
  );
}
