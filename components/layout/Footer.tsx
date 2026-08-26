import { MailtoLink } from "@/components/ui/MailtoLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { contactEmail, mailto, whatsapp, tel, telDisplay } from "@/lib/content";
import { pijlers } from "@/lib/services";
import { site } from "@/lib/site";

const linkCls = "text-muted transition-colors hover:text-ink";

export function Footer() {
  return (
    <footer className="relative z-[2] border-t border-line bg-deep px-[clamp(20px,5vw,64px)] pb-8 pt-14">
      <div className="mx-auto max-w-[1140px]">
        <div className="grid grid-cols-1 gap-10 min-[561px]:grid-cols-2 min-[901px]:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark size={18} />
            <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.6] text-muted">
              Alles rond je website. Eén aanspreekpunt.
            </p>
            <p className="mt-2 text-[13px] text-faint">
              {site.city}, Hoeksche Waard
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-[12px] uppercase tracking-[0.14em] text-faint">Diensten</h2>
            <ul className="flex flex-col gap-2 text-[14px]">
              {pijlers.map((p) => (
                <li key={p.id}>
                  <a href={p.live ? p.href : "/#pijlers"} className={linkCls}>
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-[12px] uppercase tracking-[0.14em] text-faint">Meer</h2>
            <ul className="flex flex-col gap-2 text-[14px]">
              <li><a href="/websites#werkwijze" className={linkCls}>Werkwijze</a></li>
              <li><a href="/werk" className={linkCls}>Werk</a></li>
              <li><a href="/#contact" className={linkCls}>Contact</a></li>
              <li><a href="/privacy" className={linkCls}>Privacy</a></li>
              <li><a href="/voorwaarden" className={linkCls}>Voorwaarden</a></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-[12px] uppercase tracking-[0.14em] text-faint">Contact</h2>
            <ul className="flex flex-col gap-2 text-[14px]">
              <li><MailtoLink href={mailto} className={linkCls}>{contactEmail}</MailtoLink></li>
              <li><a href={tel} className={linkCls}>{telDisplay}</a></li>
              <li><a href={whatsapp} target="_blank" rel="noopener noreferrer" className={linkCls}>WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line2 pt-6 text-[12.5px] text-faint">
          <span>© 2026 HitzDigital{site.kvk ? ` · KvK ${site.kvk}` : ""}</span>
          <span>Alle prijzen incl. btw</span>
        </div>
      </div>
    </footer>
  );
}
