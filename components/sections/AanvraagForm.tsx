"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { aanvraagIds, isAanvraagKeuze, type AanvraagKeuze } from "@/lib/aanvraag";
import type { Lang } from "@/lib/i18n/paths";
import type { UiDict } from "@/lib/i18n/nl/ui";
import { sendAanvraag } from "@/app/actions/contact";

export type FormCopy = UiDict["form"];

const field =
  "w-full rounded-[10px] border border-line bg-field px-[14px] py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-accent/60";
const label = "flex flex-col gap-[7px] text-[13px] text-muted";
const errorCls = "text-[13px] leading-[1.4] text-danger";

type Errors = { naam?: string; email?: string };
type Status = "idle" | "sending" | "ok" | "error";

function validate(d: FormData, t: FormCopy): Errors {
  const e: Errors = {};
  if (!String(d.get("naam") || "").trim()) e.naam = t.errors.name;
  const email = String(d.get("email") || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t.errors.email;
  return e;
}

function buildMailto(d: FormData, t: FormCopy) {
  const voorId = d.get("voor");
  const voor = isAanvraagKeuze(voorId) ? t.choices[voorId].label : "";
  const f = t.mailtoFields;
  const body = [
    `${f.voor}: ${voor}`,
    `${f.naam}: ${d.get("naam") || ""}`,
    `${f.email}: ${d.get("email") || ""}`,
    `${f.telefoon}: ${d.get("telefoon") || ""}`,
    `${f.website}: ${d.get("website") || ""}`,
    `${f.bedrijf}: ${d.get("bedrijf") || ""}`,
    "",
    `${d.get("bericht") || ""}`,
  ].join("\n");
  const subject = t.mailtoSubject.replace("{voor}", voor.toLowerCase());
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Kwalificerend aanvraagformulier met "Waarvoor?"-keuze. Verstuurt via de server action
 * (Resend); kan de server niet mailen (`canSend` false), dan opent het mailprogramma.
 * Voorselectie via `?voor=` en `?pakket=` in de URL.
 */
export function AanvraagForm({ lang, t, initial = "website", canSend = false }: { lang: Lang; t: FormCopy; initial?: AanvraagKeuze; canSend?: boolean }) {
  const [voor, setVoor] = useState<AanvraagKeuze>(initial);
  const [bericht, setBericht] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fallback, setFallback] = useState<string | null>(null);
  const [opened, setOpened] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const packageInterest = t.packageInterest;

  useEffect(() => {
    setOpened(Date.now());
    const apply = () => {
      const raw = `${window.location.search}${window.location.hash}`;
      const v = raw.match(/[?&]voor=([a-z]+)/)?.[1];
      if (isAanvraagKeuze(v)) setVoor(v);
      const pk = raw.match(/[?&]pakket=([a-z-]+)/)?.[1];
      if (pk) setBericht((cur) => cur || packageInterest.replace("{pakket}", `${pk.charAt(0).toUpperCase()}${pk.slice(1)}`));
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [packageInterest]);

  const keuze = t.choices[voor];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("_gotcha")) return;

    // Inline controle vóór versturen: fout onder het veld, focus op het eerste foute veld.
    const errs = validate(d, t);
    setErrors(errs);
    const first = (Object.keys(errs) as Array<keyof Errors>)[0];
    if (first) {
      form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (!canSend) {
      window.location.href = buildMailto(d, t);
      return;
    }

    setStatus("sending");
    const res = await sendAanvraag(d);
    if (res.ok) {
      form.reset();
      setBericht("");
      setStatus("ok");
      try {
        track("form_submit", { voor, lang });
      } catch {}
    } else {
      setFallback(buildMailto(d, t));
      setStatus("error");
    }
  }

  return (
    <form id="aanvraag" ref={formRef} onSubmit={onSubmit} noValidate className="mx-auto flex max-w-[560px] flex-col gap-[14px] text-left">
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <input type="hidden" name="_t" value={opened} />
      <input type="hidden" name="lang" value={lang} />

      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-[10px] text-[13px] text-muted">{t.legend}</legend>
        <div className="flex flex-wrap gap-2">
          {aanvraagIds.map((id) => {
            const active = id === voor;
            return (
              <label
                key={id}
                className={`cursor-pointer select-none rounded-full border px-[15px] py-[9px] text-[14px] transition-[border-color,background-color,color,transform] duration-200 active:scale-[0.98] active:duration-[120ms] ${
                  active ? "border-accent/60 bg-accent/12 text-ink" : "border-line text-muted hover:border-accent/40 hover:text-ink"
                }`}
              >
                <input type="radio" name="voor" value={id} checked={active} onChange={() => setVoor(id)} className="sr-only" />
                {t.choices[id].label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[14px]">
        <label className={label}>
          <span>
            {t.name} <span className="text-faint">{t.required}</span>
          </span>
          <input
            name="naam"
            required
            autoComplete="name"
            aria-invalid={errors.naam ? true : undefined}
            aria-describedby={errors.naam ? "fout-naam" : undefined}
            onInput={() => errors.naam && setErrors((e) => ({ ...e, naam: undefined }))}
            className={`${field} aria-invalid:border-danger/70`}
          />
          {errors.naam && (
            <span id="fout-naam" className={errorCls}>
              {errors.naam}
            </span>
          )}
        </label>
        <label className={label}>
          <span>
            {t.email} <span className="text-faint">{t.required}</span>
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "fout-email" : undefined}
            onInput={() => errors.email && setErrors((e) => ({ ...e, email: undefined }))}
            className={`${field} aria-invalid:border-danger/70`}
          />
          {errors.email && (
            <span id="fout-email" className={errorCls}>
              {errors.email}
            </span>
          )}
        </label>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[14px]">
        <label className={label}>
          {t.phone}
          <input type="tel" name="telefoon" autoComplete="tel" className={field} />
        </label>
        <label className={label}>
          {t.website}
          <input name="website" placeholder={t.websitePlaceholder} className={field} />
        </label>
      </div>
      <label className={label}>
        {t.company}
        <input name="bedrijf" placeholder={t.companyPlaceholder} className={field} />
      </label>
      <label className={label}>
        {t.message}
        <textarea name="bericht" rows={4} placeholder={t.messagePlaceholder} value={bericht} onChange={(e) => setBericht(e.target.value)} className={`${field} resize-y`} />
      </label>
      <Button type="submit" className="w-full sm:w-auto sm:self-center">
        {status === "sending" ? t.sending : keuze.submit}
      </Button>
      <p className="mt-1 text-center text-[12.5px] text-muted">
        <Link href={t.privacyHref} className="inline-block py-1 underline underline-offset-2 transition-colors hover:text-ink">
          {t.privacy}
        </Link>
      </p>
      <div role="status" aria-live="polite" className="min-h-[18px] text-center text-[13.5px] text-faint">
        {status === "ok" && <span className="text-accent-bright">{t.ok}</span>}
        {status === "error" && fallback && (
          <span>
            {t.failed}{" "}
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
