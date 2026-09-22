"use client";

import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import type { Lang } from "@/lib/i18n/paths";

export type NotFoundTexts = { title: string; body: string; back: string; href: string };

/** 404 buiten de (site)-schil: geen nav/footer, wel dezelfde tokens. Taal uit het pad (/en/… → Engels), zodat de pagina statisch blijft. */
export function NotFoundView({ texts }: { texts: Record<Lang, NotFoundTexts> }) {
  const pathname = usePathname() ?? "/";
  const lang: Lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "nl";
  const t = texts[lang];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-[18px] bg-deep px-6 text-center text-ink">
      <Wordmark size={22} />
      <h1 className="m-0 font-display text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.03em] [text-wrap:balance]">{t.title}</h1>
      <p className="m-0 max-w-[420px] text-[15px] leading-[1.6] text-muted">{t.body}</p>
      <Button href={t.href} className="mt-2">
        {t.back}
      </Button>
    </main>
  );
}
