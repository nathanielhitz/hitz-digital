import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/**
 * Gedeelde OG-afbeelding: wordmark, paginatitel (met accentwoord tussen sterretjes), kicker, domein.
 * Gebruik: `renderOg({ title: "Online blijven, *zonder gedoe*.", kicker: "Hosting & domeinen" })`.
 */
export function renderOg({ title, kicker, sub }: { title: string; kicker?: string; sub?: string }) {
  // Woorden met kleurvlag: tekst tussen sterretjes krijgt het accent. Per woord een flex-item zodat Satori netjes afbreekt.
  const words: { t: string; accent: boolean }[] = [];
  title.split("*").forEach((seg, i) => {
    seg.split(/\s+/).filter(Boolean).forEach((w) => {
      if (/^[.,!?:;]+$/.test(w) && words.length) words[words.length - 1].t += w;
      else if (/^[.,!?:;]/.test(w) && words.length) {
        words[words.length - 1].t += w[0];
        if (w.length > 1) words.push({ t: w.slice(1), accent: i % 2 === 1 });
      } else words.push({ t: w, accent: i % 2 === 1 });
    });
  });
  // Leestekens die aan een accentwoord kleven (bv. "website.") houden de kleur van het woord ervoor.
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(155deg, #13120d 0%, #0b0a08 55%, #070706 100%)",
          color: "#F4F1EC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
            hitz<span style={{ color: "#5FA47E" }}>.</span>
          </div>
          {kicker && (
            <div style={{ display: "flex", fontSize: 22, color: "#9B968D", letterSpacing: 2, textTransform: "uppercase" }}>
              {kicker}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 66, fontWeight: 700, letterSpacing: -2, lineHeight: 1.08, maxWidth: 1040 }}>
            {words.map((w, i) => (
              <span key={i} style={{ color: w.accent ? "#5FA47E" : "#F4F1EC", marginRight: 18 }}>
                {w.t}
              </span>
            ))}
          </div>
          {sub && (
            <div style={{ display: "flex", fontSize: 26, color: "#9B968D", marginTop: 26, maxWidth: 900, lineHeight: 1.35 }}>
              {sub}
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#6B665E" }}>
          <span>hitzdigital.nl</span>
          <span>Puttershoek, Hoeksche Waard</span>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
