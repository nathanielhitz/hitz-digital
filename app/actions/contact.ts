"use server";

import { Resend } from "resend";
import { site } from "@/lib/site";
import { aanvraagKeuzes } from "@/lib/services";

export type ContactResult = { ok: true } | { ok: false; error: "config" | "invalid" | "send" };

/** Of de server kan mailen. Zonder key valt het formulier terug op het mailprogramma van de bezoeker. */
export async function canSend(): Promise<boolean> {
  return Boolean(process.env.RESEND_API_KEY);
}

const clean = (v: FormDataEntryValue | null, max = 500) =>
  String(v ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);

export async function sendAanvraag(formData: FormData): Promise<ContactResult> {
  // Spam: honeypot gevuld, of te snel verstuurd (< 3 s na openen).
  if (formData.get("_gotcha")) return { ok: true };
  const opened = Number(formData.get("_t") || 0);
  if (opened && Date.now() - opened < 3000) return { ok: true };

  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "config" };

  const naam = clean(formData.get("naam"), 120);
  const email = clean(formData.get("email"), 200);
  const voorId = clean(formData.get("voor"), 20);
  const voor = aanvraagKeuzes.find((k) => k.id === voorId)?.label ?? "Iets anders";
  const website = clean(formData.get("website"), 300);
  const bedrijf = clean(formData.get("bedrijf"), 200);
  const telefoon = clean(formData.get("telefoon"), 40);
  const bericht = String(formData.get("bericht") ?? "").trim().slice(0, 4000);

  if (!naam || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "invalid" };

  const to = process.env.CONTACT_TO || site.email;
  const from = process.env.RESEND_FROM || `HitzDigital <formulier@hitzdigital.nl>`;
  const text = [
    `Waarvoor: ${voor}`,
    `Naam: ${naam}`,
    `E-mail: ${email}`,
    telefoon ? `Telefoon: ${telefoon}` : null,
    website ? `Website: ${website}` : null,
    bedrijf ? `Bedrijf en plaats: ${bedrijf}` : null,
    "",
    bericht || "(geen toelichting)",
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Aanvraag ${voor.toLowerCase()} via hitzdigital.nl: ${naam}`,
      text,
    });
    if (error) return { ok: false, error: "send" };
    return { ok: true };
  } catch {
    return { ok: false, error: "send" };
  }
}
