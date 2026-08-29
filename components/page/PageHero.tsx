import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";

/** Rustige kop voor subpagina's: kruimelpad, H1, subkop, knoppen. Geen label-decoratie. */
export function PageHero({
  crumbs,
  title,
  lead,
  actions,
  aside,
}: {
  crumbs: Crumb[];
  title: ReactNode;
  lead?: string;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative px-[clamp(20px,5vw,64px)] pb-6 md:pb-10 pt-[clamp(120px,16vw,168px)]">
      <div
        className="pointer-events-none absolute right-[6%] top-[8%] h-[40vw] max-h-[620px] w-[40vw] max-w-[620px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--glow)_14%,transparent)_0%,color-mix(in_srgb,var(--glow)_4%,transparent)_40%,transparent_70%)] blur-[32px]"
        aria-hidden
      />
      <Container className="relative">
        <Reveal>
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 grid grid-cols-1 items-end gap-10 min-[901px]:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="max-w-[16ch] font-display text-[clamp(36px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.035em] [text-wrap:balance]">
                {title}
              </h1>
              {lead && (
                <p className="mt-6 max-w-[52ch] text-[clamp(16px,1.25vw,18.5px)] leading-[1.6] text-muted">{lead}</p>
              )}
              {actions && <div className="mt-8 flex flex-wrap items-center gap-[14px]">{actions}</div>}
            </div>
            {aside}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
