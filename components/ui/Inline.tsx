import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Zet Markdown-links `[tekst](/pad)` in een tekststring om naar echte links.
 * Dezelfde string voedt ook de Markdown-versie van de site (lib/markdown), die de notatie ongewijzigd laat.
 */
export function Inline({ text, linkClassName }: { text: string; linkClassName?: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const [raw, label, url] = m;
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    const cls = cn("underline underline-offset-2", linkClassName);
    out.push(
      url.startsWith("/") ? (
        <Link key={i} href={url} className={cls}>
          {label}
        </Link>
      ) : (
        <a key={i} href={url} className={cls} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ),
    );
    last = i + raw.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
