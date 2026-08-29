"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { aanvraagKeuzes, type AanvraagKeuze } from "@/lib/services";
import { sendAanvraag } from "@/app/actions/contact";

const field =
  "w-full rounded-[10px] border border-line bg-field px-[14px] py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-accent/60";
const label = "flex flex-col gap-[7px] text-[13px] text-muted";

type Status = "idle" | "sending" | "ok" | "error";

function buildMailto(d: FormData) {
  const voor = aanvraagKeuzes.find((k) => k.id === d.get("voor"))?.label ?? "";
  const body = [
    `Waarvoor: ${voor}`,
    `Naam: ${d.get("naam") || ""}`,
    `E-mail: ${d.get("email") || ""}`,
    `Telefoon: ${d.get("telefoon") || ""}`,
    `Website: ${d.get("website") || ""}`,
    `Bedrijf en plaats: ${d.get("bedrijf") || ""}`,
    "",
    `${d.get("bericht") || ""}`,
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(`Aanvraag ${voor.toLowerCase()} via hitzdigital.nl`)}&body=${encodeURIComponent(body)}`;
}

/**
 * Kwalificerend aanvraagformulier met "Waarvoor?"-keuze. Verstuurt via de server action
 * (Resend); kan de server niet mailen (`canSend` false), dan opent het mailprogramma.
 * Voorselectie via `?voor=` en `?pakket=` in de URL.
 */
export function AanvraagForm({ initial = "website", canSend = false }: { initial?: AanvraagKeuze; canSend?: boolean }) {
  const [voor, setVoor] = useState<AanvraagKeuze>(initial);
  const [bericht, setBericht] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fallback, setFallback] = useState<string | null>(null);
  const [opened, setOpened] = useState(0);

  useEffect(() => {
    setOpened(Date.now());
    const apply = () => {
      const raw = `${window.location.search}${window.location.hash}`;
      const v = raw.match(/[?&]voor=([a-z]+)/)?.[1];
      if (v && aanvraagKeuzes.some((k) => k.id === v)) setVoor(v as AanvraagKeuze);
      const pk = raw.match(/[?&]pakket=([a-z]+)/)?.[1];
      if (pk) setBericht((cur) => cur || `Ik heb interesse in het pakket ${pk.charAt(0).toUpperCase()}${pk.slice(1)}.`);
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

    if (!canSend) {
      window.location.href = buildMailto(d);
      return;
    }

    setStatus("sending");
    const res = await sendAanvraag(d);
    if (res.ok) {
      form.reset();
      setBericht("");
      setStatus("ok");
      try {
        track("form_submit", { voor });
      } catch {}
    } else {
      setFallback(buildMailto(d));
      setStatus("error");
    }
  }

  return (
    <form id="aanvraag" onSubmit={onSubmit} noValidate className="mx-auto flex max-w-[560px] flex-col gap-[14px] text-left">
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <input type="hidden" name="_t" value={opened} />

      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-[10px] text-[13px] text-muted">Waarvoor kan ik je helpen?</legend>
        <div className="flex flex-wrap gap-2">
          {aanvraagKeuzes.map((k) => {
            const active = k.id === voor;
            return (
              <label
                key={k.id}
                className={`cursor-pointer select-none rounded-full border px-[15px] py-[9px] text-[14px] transition-[border-color,background-color,color] duration-200 ${
                  active ? "border-accent/60 bg-accent/12 text-ink" : "border-line text-muted hover:border-accent/40 hover:text-ink"
                }`}
              >
                <input type="radio" name="voor" value={k.id} checked={active} onChange={() => setVoor(k.id)} className="sr-only" />
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[14px]">
        <label className={label}>
          Telefoon (mag)
          <input type="tel" name="telefoon" autoComplete="tel" className={field} />
        </label>
        <label className={label}>
          Je website, als je die hebt
          <input name="website" placeholder="https://… of: nog geen site" className={field} />
        </label>
      </div>
      <label className={label}>
        Wat voor bedrijf heb je en waar zit je?
        <input name="bedrijf" placeholder="bv. schildersbedrijf in Oud-Beijerland" className={field} />
      </label>
      <label className={label}>
        Wat speelt er?
        <textarea name="bericht" rows={4} placeholder="Kort is prima." value={bericht} onChange={(e) => setBericht(e.target.value)} className={`${field} resize-y`} />
      </label>
      <Button type="submit" className="w-full sm:w-auto sm:self-center">
        {status === "sending" ? "Versturen…" : keuze.submit}
      </Button>
      <p className="mt-1 text-center text-[12.5px] text-muted">
        <Link href="/privacy" className="underline underline-offset-2 transition-colors hover:text-ink">
          Zie privacybeleid
        </Link>
      </p>
      <div role="status" aria-live="polite" className="min-h-[18px] text-center text-[13.5px] text-faint">
        {status === "ok" && <span className="text-accent-bright">Gelukt! Je aanvraag is verstuurd. Ik reageer binnen 1 werkdag.</span>}
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
