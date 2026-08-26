import { site } from "@/lib/site";

export type Crumb = { label: string; href?: string };

/** Kruimelpad + BreadcrumbList-schema. Laatste item is de huidige pagina (geen link). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Kruimelpad" className="text-[13px] text-faint">
      <ol className="flex flex-wrap items-center gap-2">
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {c.href && i < all.length - 1 ? (
              <a href={c.href} className="transition-colors hover:text-ink">
                {c.label}
              </a>
            ) : (
              <span aria-current="page" className="text-muted">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </nav>
  );
}
