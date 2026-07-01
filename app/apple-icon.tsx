import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0b09",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 92,
            fontWeight: 700,
            color: "#F4F1EC",
            fontFamily: "sans-serif",
            letterSpacing: -4,
          }}
        >
          hitz
          <span style={{ color: "#5FA47E" }}>.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
