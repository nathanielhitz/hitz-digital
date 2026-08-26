import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacybeleid | HitzDigital",
  description:
    "Hoe HitzDigital omgaat met je gegevens: wat er via het contactformulier wordt verzameld, waarom, hoe lang, en welke rechten je hebt.",
  alternates: { canonical: "/privacy" },
};

const wrap: React.CSSProperties = {
  minHeight: "100vh",
  background: "#070706",
  color: "#F4F1EC",
  fontFamily: "var(--font-body-src, 'Inter', system-ui, sans-serif)",
  WebkitFontSmoothing: "antialiased",
  lineHeight: 1.65,
};
const inner: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "clamp(32px,8vw,80px) clamp(20px,5vw,40px) 96px",
};
const h2: React.CSSProperties = {
  fontFamily: "'General Sans', var(--font-body-src, Inter), system-ui, sans-serif",
  fontWeight: 600,
  fontSize: "clamp(19px,2.4vw,24px)",
  letterSpacing: "-0.02em",
  margin: "40px 0 12px",
};
const p: React.CSSProperties = { color: "#B7B2A9", fontSize: 15.5, margin: "0 0 14px" };
const li: React.CSSProperties = { color: "#B7B2A9", fontSize: 15.5, margin: "0 0 8px" };
const a: React.CSSProperties = { color: "#79BB97", textDecoration: "none" };

export default function PrivacyPage() {
  const updated = "22 juli 2026";
  return (
    <div style={wrap}>
      <div style={inner}>
        <a href="/" style={{ ...a, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#9B968D" }}>
          ← Terug naar home
        </a>
        <div style={{ fontFamily: "'General Sans', var(--font-body-src, Inter), system-ui, sans-serif", fontWeight: 600, fontSize: 20, letterSpacing: "-0.02em", marginTop: 28 }}>
          hitz<span style={{ color: "#5FA47E" }}>.</span>
        </div>
        <h1 style={{ fontFamily: "'General Sans', var(--font-body-src, Inter), system-ui, sans-serif", fontWeight: 600, fontSize: "clamp(28px,4.4vw,40px)", letterSpacing: "-0.03em", margin: "14px 0 8px" }}>
          Privacybeleid
        </h1>
        <p style={{ color: "#6B665E", fontSize: 13.5, margin: 0 }}>Laatst bijgewerkt: {updated}</p>

        <p style={{ ...p, marginTop: 28 }}>
          HitzDigital hecht waarde aan je privacy. In dit beleid lees je welke persoonsgegevens ik verzamel wanneer je
          contact opneemt via deze website, waarom ik dat doe, hoe lang ik ze bewaar en welke rechten je hebt. Ik ga
          zorgvuldig en zo minimaal mogelijk met je gegevens om.
        </p>

        <h2 style={h2}>Wie is verantwoordelijk?</h2>
        <p style={p}>
          HitzDigital ({site.founder}) is verwerkingsverantwoordelijke voor de verwerking van je gegevens.
          <br />
          Contact: <a href={`mailto:${site.email}`} style={a}>{site.email}</a>
          <br />
          KvK-nummer: {site.kvk ? site.kvk : "wordt binnenkort toegevoegd"}
        </p>

        <h2 style={h2}>Welke gegevens verzamel ik?</h2>
        <p style={p}>Wanneer je het contactformulier invult of me mailt/appt, verwerk ik de gegevens die je zelf opgeeft:</p>
        <ul style={{ paddingLeft: 20, margin: "0 0 14px" }}>
          <li style={li}>je naam;</li>
          <li style={li}>je e-mailadres;</li>
          <li style={li}>eventueel de URL van je huidige website;</li>
          <li style={li}>eventueel je bedrijf, plaats en een toelichting op je aanvraag.</li>
        </ul>
        <p style={p}>
          Ik vraag bewust niet meer dan nodig is om je aanvraag te kunnen beantwoorden. Gevoelige gegevens verzamel ik niet.
        </p>

        <h2 style={h2}>Waarvoor en op welke grondslag?</h2>
        <p style={p}>
          Ik gebruik deze gegevens uitsluitend om contact met je op te nemen, je aanvraag te beoordelen en (op jouw verzoek)
          een preview of offerte te maken. De grondslag is het op jouw verzoek nemen van stappen vóór een eventuele
          overeenkomst, en mijn gerechtvaardigd belang om aanvragen te kunnen afhandelen. Ik gebruik je gegevens niet voor
          reclame en verkoop ze niet aan derden.
        </p>

        <h2 style={h2}>Hoe lang bewaar ik ze?</h2>
        <p style={p}>
          Aanvragen die niet tot een opdracht leiden bewaar ik niet langer dan nodig en verwijder ik uiterlijk binnen 12
          maanden. Word je klant, dan bewaar ik de gegevens zolang dat nodig is voor het project en de wettelijke
          (administratie)termijnen.
        </p>

        <h2 style={h2}>Wie verwerkt de gegevens namens mij?</h2>
        <p style={p}>Voor het technisch mogelijk maken van de website en het formulier schakel ik dienstverleners in:</p>
        <ul style={{ paddingLeft: 20, margin: "0 0 14px" }}>
          <li style={li}>
            <strong style={{ color: "#F4F1EC" }}>Vercel</strong> — host de website en levert geanonimiseerde,
            cookieloze bezoekstatistieken (aantal bezoekers en paginaweergaven). Hierbij worden geen tracking-cookies
            geplaatst en geen individuele bezoekers geïdentificeerd.
          </li>
        </ul>

        <p style={p}>
          Het contactformulier verstuurt je bericht via je eigen e-mailprogramma; er wordt geen externe formulierdienst
          gebruikt.
        </p>

        <h2 style={h2}>Cookies</h2>
        <p style={p}>
          Deze website plaatst geen tracking- of marketingcookies. De bezoekstatistieken zijn cookieloos en anoniem, dus
          een cookiemelding is niet nodig.
        </p>

        <h2 style={h2}>Je rechten</h2>
        <p style={p}>
          Je hebt het recht om je gegevens in te zien, te laten corrigeren of te laten verwijderen, en om bezwaar te maken
          tegen de verwerking. Stuur daarvoor een mailtje naar <a href={`mailto:${site.email}`} style={a}>{site.email}</a> —
          ik reageer zo snel mogelijk. Ben je het niet eens met hoe ik met je gegevens omga, dan kun je een klacht indienen
          bij de Autoriteit Persoonsgegevens.
        </p>

        <h2 style={h2}>Wijzigingen</h2>
        <p style={p}>
          Ik kan dit privacybeleid aanpassen wanneer de website of werkwijze verandert. De datum bovenaan geeft aan wanneer
          het voor het laatst is bijgewerkt.
        </p>
      </div>
    </div>
  );
}
