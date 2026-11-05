import type { ReactNode } from "react";
import { SupportDrawerPanel, SupportDrawerProvider, type SupportDrawerGroup } from "@/components/support/SupportDrawer";
import { supportArticles } from "@/lib/support";
import { whatsapp } from "@/lib/content";

/**
 * Omhult /support en /support/<slug>. Staat op het statische segment "support", zodat de layout
 * (en daarmee de open-status van het zijmenu) blijft bij client-side navigatie tussen artikelen.
 * Groepen worden hier berekend, zodat lib/support.ts (met de artikel-componenten) buiten de client-bundel blijft.
 */
export default function SupportLayout({ children }: { children: ReactNode }) {
  const groups: SupportDrawerGroup[] = [];
  for (const a of supportArticles) {
    let g = groups.find((x) => x.category === a.category);
    if (!g) {
      g = { category: a.category, items: [] };
      groups.push(g);
    }
    g.items.push({ slug: a.slug, title: a.title });
  }
  return (
    <SupportDrawerProvider>
      {children}
      <SupportDrawerPanel groups={groups} hulpHref="/hulp" whatsappHref={whatsapp} />
    </SupportDrawerProvider>
  );
}
