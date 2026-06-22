"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const inputCls =
  "w-full rounded-xl border border-line bg-[#1a1714] px-4 py-3 text-[15px] text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/35";
const labelCls = "mb-2 block text-[13px] font-medium text-muted";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Nog geen Formspree-endpoint ingesteld → val netjes terug op e-mail.
    if (!site.formEndpoint) {
      const body = `Naam: ${data.get("naam") ?? ""}\n\n${data.get("bericht") ?? ""}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        "Aanvraag via hitzdigital.nl",
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-panel/40 p-8 text-center">
        <p className="font-display text-xl font-semibold">Bedankt, je bericht is verstuurd.</p>
        <p className="mt-2 text-sm text-muted">Je hoort binnen 1 werkdag van me.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
      <div className="grid gap-5">
        <div>
          <label htmlFor="naam" className={labelCls}>Naam</label>
          <input id="naam" name="naam" required autoComplete="name" placeholder="Je naam" className={inputCls} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>E-mail</label>
          <input id="email" type="email" name="email" required autoComplete="email" placeholder="jij@bedrijf.nl" className={inputCls} />
        </div>
        <div>
          <label htmlFor="bericht" className={labelCls}>Je huidige website of je vraag</label>
          <textarea id="bericht" name="bericht" rows={4} placeholder="Link naar je site, of kort wat je zoekt" className={`${inputCls} resize-none`} />
        </div>
        {/* honeypot tegen spam */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit">{status === "submitting" ? "Versturen…" : "Verstuur"}</Button>
          {status === "error" && (
            <p role="alert" className="text-[13px] text-accent-bright">
              Er ging iets mis. Mail me anders op {site.email}.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
