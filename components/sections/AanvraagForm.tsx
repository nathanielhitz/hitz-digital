"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { aanvraagKeuzes, type AanvraagKeuze } from "@/lib/services";

const field =
  "w-full rounded-[10px] border border-line bg-[rgba(244,241,236,0.04)] px-[14px] py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-accent/60";
const label = "flex flex-col gap-[7px] text-[13px] text-muted";

type Status = "idle" | "sending" | "ok" | "error";

function buildMailto(d: FormData) {
  const voor = aanvraagKeuzes.find((k) => k.id === d.get("voor"))?.label ?? "";
  const body = [
    `Waarvoor: ${voor}`,
    `Naam: ${d.get("naam") || ""}`,
    `E-mail: ${d.get("email") || ""}`,
    `Website: ${d.get("website") || ""}`,
    `Bedrijf en plaats: ${d.get("bedrijf") || ""}`,
    "",
    `${d.get("bericht") || ""}`,
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(`Aanvraag ${voor.toLowerCase()} via hitzdigital.nl`)}&body=${encodeURIComponent(body)}`;
}

/**
 * Kwalificerend aanvraagformulier met "Waarvoor?"-keuze (website / hosting / hulp / anders).
 * Voorselectie via `?voor=` of `#contact?voor=` in de URL. Zonder `site.formEndpoint`
 * valt het terug op het e-mailprogramma van de bezoeker (fase 5: server action + Resend).
 */
export function AanvraagForm({ initial = "website" }: { initial?: AanvraagKeuze }) {
  const [voor, setVoor] = useState<AanvraagKeuze>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [fallback, setFallback] = useState<string | null>(null);

  useEffect(() => {
    const apply = () => {
      const raw = `${window.location.search}${window.location.hash}`;
      const m = raw.match(/[?&]voor=([a-z]+)/);
      const v = m?.[1];
      if (v && aanvraagKeuzes.some((k) => k.id === v)) setVoor(v as AanvraagKeuze);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const keuze = aanvraagKeuzes.find((k) => k.id === voor) ?? aanvraagKeuzes[0];

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
        track("form_submit", { voor });
      } catch {}
    } catch {
      setFallback(buildMailto(d));
      setStatus("error");
    }
  }

  return (
    <form
      id="aanvraag"
      onSubmit={onSubmit}
      noValidate
      className="mx-auto flex max-w-[560px] flex-col gap-[14px] text-left"
    >
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-[10px] text-[13px] text-muted">Waarvoor kan ik je helpen?</legend>
        <div className="flex flex-wrap gap-2">
          {aanvraagKeuzes.map((k) => {
            const active = k.id === voor;
            return (
              <label
                key={k.id}
                className={`cursor-pointer select-none rounded-full border px-[15px] py-[9px] text-[14px] transition-[border-color,background-color,color] duration-200 ${
                  active
                    ? "border-accent/60 bg-accent/12 text-ink"
                    : "border-line text-muted hover:border-accent/40 hover:text-ink"
                }`}
              >
                <input
                  type="radio"
                  name="voor"
                  value={k.id}
                  checked={active}
                  onChange={() => setVoor(k.id)}
                  className="sr-only"
                />
                {k.label}
              </label>
            );
          })}
        </div>
      </fieldset>

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
        Je website, als je die hebt
        <input name="website" placeholder="https://… of: nog geen site" className={field} />
      </label>
      <label className={label}>
        Wat voor bedrijf heb je en waar zit je?
        <input name="bedrijf" placeholder="bv. schildersbedrijf in Oud-Beijerland" className={field} />
      </label>
      <label className={label}>
        Wat speelt er?
        <input type="hidden" name="_keuze" value={keuze.label} />
        <textarea name="bericht" rows={4} placeholder="Kort is prima." className={`${field} resize-y`} />
      </label>
      <Button type="submit" className="w-full sm:w-auto sm:self-center">
        {status === "sending" ? "Versturen…" : keuze.submit}
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
