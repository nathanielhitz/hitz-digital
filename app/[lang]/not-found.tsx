import { headers } from "next/headers";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { getDict } from "@/lib/i18n";
import { langOf } from "@/lib/i18n/paths";

/** 404 buiten de (site)-schil: geen nav/footer, wel dezelfde tokens (volgt licht/donker). Taal uit `x-lang` (middleware). */
export default async function NotFound() {
  const lang = langOf((await headers()).get("x-lang"));
  const t = getDict(lang).ui.notFound;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-[18px] bg-deep px-6 text-center text-ink">
      <Wordmark size={22} />
      <h1 className="m-0 font-display text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.03em] [text-wrap:balance]">
        {t.title}
      </h1>
      <p className="m-0 max-w-[420px] text-[15px] leading-[1.6] text-muted">{t.body}</p>
      <Button href={t.href} className="mt-2">
        {t.back}
      </Button>
    </main>
  );
}
