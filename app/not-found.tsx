import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";

/** 404 buiten de (site)-schil: geen nav/footer, wel dezelfde tokens (volgt licht/donker). */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-[18px] bg-deep px-6 text-center text-ink">
      <Wordmark size={22} />
      <h1 className="m-0 font-display text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.03em] [text-wrap:balance]">
        Deze pagina bestaat niet (meer).
      </h1>
      <p className="m-0 max-w-[420px] text-[15px] leading-[1.6] text-muted">
        Mogelijk klopt de link niet meer, of is de pagina verplaatst. Ga terug naar de homepage om verder te kijken.
      </p>
      <Button href="/" className="mt-2">
        Terug naar hitzdigital.nl
      </Button>
    </main>
  );
}
