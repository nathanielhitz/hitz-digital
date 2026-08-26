type Faq = { q: string; a: string };

/** Vraag/antwoord-lijst met FAQPage-schema. Alleen gebruiken voor vragen die ook zichtbaar op de pagina staan. */
export function FaqList({ items }: { items: readonly Faq[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[17px] font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              className="grid h-7 w-7 flex-none place-items-center rounded-full border border-line text-muted transition-transform duration-300 group-open:rotate-45"
              aria-hidden
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-[64ch] text-[15px] leading-[1.65] text-muted">{f.a}</p>
        </details>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
