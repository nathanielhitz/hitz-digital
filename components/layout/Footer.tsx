import { nav, contactEmail } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-line py-14">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-[18px] font-bold tracking-[-0.04em]">
                hitz<span className="text-accent">.</span>
              </span>
              <span className="h-3.5 w-px bg-line" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-faint">Webstudio</span>
            </div>
            <p className="mt-3 text-[13px] text-faint">Eerst zien. Dan beslissen.</p>
          </div>

          <ul className="flex gap-6 text-[13.5px] text-muted">
            {nav.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${contactEmail}`}
            className="text-[13.5px] text-muted transition-colors hover:text-ink"
          >
            {contactEmail}
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line2 pt-6 font-mono text-[12px] text-faint">
          <span>© 2026 HitzDigital · Hoeksche Waard</span>
          <span>hitzdigital.nl</span>
        </div>
      </div>
    </footer>
  );
}
