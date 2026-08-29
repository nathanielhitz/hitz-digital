import { MailtoLink } from "@/components/ui/MailtoLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { contactEmail, mailto, whatsapp, tel, telDisplay } from "@/lib/content";
import { pijlers } from "@/lib/services";
import { site } from "@/lib/site";

const linkCls = "text-muted transition-colors hover:text-ink";

const legal = [
  { href: "/privacy", label: "Privacybeleid" },
  { href: "/voorwaarden", label: "Voorwaarden" },
];

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
              <li><a href="/contact" className={linkCls}>Contact</a></li>
              <li><a href="/support" className={linkCls}>Support</a></li>
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

        <div className="mt-12 flex flex-col gap-3 border-t border-line2 pt-5 text-[12.5px] text-faint min-[761px]:flex-row min-[761px]:items-center min-[761px]:gap-8">
          <span>© 2026 HitzDigital{site.kvk ? ` · KvK ${site.kvk}` : ""} · Prijzen incl. btw</span>
          <ul className="flex flex-wrap items-center">
            {legal.map((l, i) => (
              <li key={l.href} className="flex items-center">
                {i > 0 && <span aria-hidden className="mx-3 h-3 w-px bg-line2" />}
                <a href={l.href} className={linkCls}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
