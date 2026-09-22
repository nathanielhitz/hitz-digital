import { MailtoLink } from "@/components/ui/MailtoLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { contactEmail, whatsapp, tel, telDisplay } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n/paths";
import { site } from "@/lib/site";

const linkCls = "inline-block py-1 text-muted transition-colors hover:text-ink"; // py-1: raakvlak ≥ 24px

export function Footer({ lang }: { lang: Lang }) {
  const { ui, services } = getDict(lang);
  const t = ui.footer;
  return (
    <footer className="relative z-[2] border-t border-line bg-deep px-[clamp(20px,5vw,64px)] pb-8 pt-14">
      <div className="mx-auto max-w-[1140px]">
        <div className="grid grid-cols-1 gap-10 min-[561px]:grid-cols-2 min-[901px]:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark size={18} />
            <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.6] text-muted">{t.tagline}</p>
            <p className="mt-2 text-[13px] text-faint">{t.place}</p>
          </div>

          <div>
            <h2 className="mb-3 text-[12px] uppercase tracking-[0.14em] text-faint">{t.services}</h2>
            <ul className="flex flex-col gap-0.5 text-[14px]">
              {services.pijlers.map((p) => (
                <li key={p.id}>
                  <a href={p.href} className={linkCls}>
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-[12px] uppercase tracking-[0.14em] text-faint">{t.more}</h2>
            <ul className="flex flex-col gap-0.5 text-[14px]">
              {t.moreLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkCls}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-[12px] uppercase tracking-[0.14em] text-faint">{t.contact}</h2>
            <ul className="flex flex-col gap-0.5 text-[14px]">
              <li>
                <MailtoLink href={ui.mailto} className={linkCls}>
                  {contactEmail}
                </MailtoLink>
              </li>
              <li>
                <a href={tel} className={linkCls}>
                  {telDisplay}
                </a>
              </li>
              <li>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {t.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line2 pt-5 text-[12.5px] text-faint min-[761px]:flex-row min-[761px]:items-center min-[761px]:gap-8">
          <span>© 2026 HitzDigital{site.kvk ? ` · KvK ${site.kvk}` : ""}</span>
          <ul className="flex flex-wrap items-center">
            {t.legal.map((l, i) => (
              <li key={l.href} className="flex items-center">
                {i > 0 && <span aria-hidden className="mx-3 select-none">|</span>}
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="min-[761px]:ml-auto">{t.vat}</span>
        </div>
      </div>
    </footer>
  );
}
