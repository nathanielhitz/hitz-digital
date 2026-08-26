import { MailtoLink } from "@/components/ui/MailtoLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { contactEmail, mailto } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative z-[2] border-t border-line bg-deep px-[clamp(20px,5vw,64px)] py-11">
      <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-[18px] text-[13px] text-faint">
        <div className="flex items-center gap-[14px]">
          <Wordmark size={17} />
          <span>Eerst zien. Dan beslissen.</span>
        </div>
        <div className="flex flex-wrap items-center gap-[18px]">
          <MailtoLink href={mailto} className="text-muted transition-colors hover:text-ink">
            {contactEmail}
          </MailtoLink>
          <a href="/privacy" className="text-muted transition-colors hover:text-ink">
            Privacy
          </a>
          <span>© 2026 HitzDigital · Hoeksche Waard</span>
        </div>
      </div>
    </footer>
  );
}
