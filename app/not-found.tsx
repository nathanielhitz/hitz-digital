export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: "0 24px",
        textAlign: "center",
        background: "#070706",
        color: "#F4F1EC",
        fontFamily: "'General Sans', var(--font-body-src, Inter), system-ui, sans-serif",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 22, letterSpacing: "-0.02em" }}>
        hitz<span style={{ color: "#5FA47E" }}>.</span>
      </div>
      <h1
        style={{
          fontWeight: 600,
          fontSize: "clamp(28px,4vw,40px)",
          letterSpacing: "-0.03em",
          margin: 0,
        }}
      >
        Deze pagina bestaat niet (meer).
      </h1>
      <p style={{ color: "#9B968D", fontSize: 15, maxWidth: 420, lineHeight: 1.6, margin: 0 }}>
        Mogelijk klopt de link niet meer, of is de pagina verplaatst. Ga terug naar de homepage om verder te kijken.
      </p>
      <a
        href="/"
        style={{
          marginTop: 8,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "13px 24px",
          borderRadius: 100,
          background: "linear-gradient(135deg,#79BB97 0%,#5FA47E 48%,#4A8466 100%)",
          color: "#07140e",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        Terug naar hitzdigital.nl
      </a>
    </div>
  );
}
