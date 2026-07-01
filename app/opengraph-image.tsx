import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(155deg, #13120d 0%, #0b0a08 55%, #070706 100%)",
          color: "#F4F1EC",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: -1,
            marginBottom: 32,
          }}
        >
          hitz<span style={{ color: "#5FA47E" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Websites die <span style={{ color: "#5FA47E" }}>professioneler</span> voelen.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#9B968D",
            marginTop: 28,
            maxWidth: 820,
          }}
        >
          Moderne websites en redesigns voor kleine ondernemers in de Hoeksche Waard en Puttershoek.
        </div>
      </div>
    ),
    { ...size }
  );
}
