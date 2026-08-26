"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const field =
  "w-full rounded-[10px] border border-line bg-[rgba(244,241,236,0.04)] px-[14px] py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-accent/60";
const label = "flex flex-col gap-[7px] text-[13px] text-muted";

type Status = "idle" | "sending" | "ok" | "error";

function buildMailto(d: FormData) {
  const body = [
    `Naam: ${d.get("naam") || ""}`,
    `E-mail: ${d.get("email") || ""}`,
    `Huidige website: ${d.get("website") || ""}`,
    `Bedrijf en plaats: ${d.get("bedrijf") || ""}`,
    "",
    `${d.get("bericht") || ""}`,
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent("Aanvraag preview via hitzdigital.nl")}&body=${encodeURIComponent(body)}`;
}

/**
 * Kwalificerend aanvraagformulier. Zonder `site.formEndpoint` valt het terug op
 * het e-mailprogramma van de bezoeker (fase 5: server action + Resend).
 */
export function AanvraagForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fallback, setFallback] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("_gotcha")) return;

    if (!site.formEndpoint) {
      window.location.href = buildMailto(d);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, { method: "POST", body: d, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("bad status");
      form.reset();
      setStatus("ok");
      try {
        track("form_submit");
      } catch {}
    } catch {
      setFallback(buildMailto(d));
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto flex max-w-[520px] flex-col gap-[14px] text-left">
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[14px]">
        <label className={label}>
          Naam
          <input name="naam" required autoComplete="name" className={field} />
        </label>
        <label className={label}>
          E-mailadres
          <input type="email" name="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className={label}>
        Je huidige website (of: ik heb er nog geen)
        <input name="website" placeholder="https://… of: nog geen site" className={field} />
      </label>
      <label className={label}>
        Wat voor bedrijf heb je en waar zit je?
        <input name="bedrijf" placeholder="bv. schildersbedrijf in Oud-Beijerland" className={field} />
      </label>
      <label className={label}>
        Wat zoek je?
        <textarea name="bericht" rows={4} placeholder="Kort is prima." className={`${field} resize-y`} />
      </label>
      <Button type="submit" className="w-full sm:w-auto sm:self-center">
        {status === "sending" ? "Versturen…" : "Vraag je gratis preview aan"}
      </Button>
      <div role="status" aria-live="polite" className="min-h-[18px] text-center text-[13.5px] text-faint">
        {status === "ok" && (
          <span className="text-accent-bright">Gelukt! Je aanvraag is verstuurd. Ik reageer binnen 1 werkdag.</span>
        )}
        {status === "error" && fallback && (
          <span>
            Versturen lukte niet. Mail me gerust direct via{" "}
            <a href={fallback} className="underline">
              {site.email}
            </a>
            .
          </span>
        )}
      </div>
    </form>
  );
}
