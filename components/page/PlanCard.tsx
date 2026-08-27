import { Button } from "@/components/ui/Button";
import { euro } from "@/lib/pricing";

type Plan = {
  id: string;
  name: string;
  monthly: number;
  summary: string;
  includes: readonly string[];
  excludes: readonly string[];
  featured: boolean;
  fairUse?: string;
};

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-[clamp(24px,2.6vw,34px)] ${
        plan.featured ? "border-accent/50 bg-panel shadow-card-accent" : "border-line bg-panel"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-on-accent">
          Meest gekozen
        </span>
      )}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[clamp(20px,2vw,24px)] font-semibold tracking-[-0.02em]">{plan.name}</h3>
        <div className="text-right">
          <span className="font-display text-[clamp(26px,2.6vw,32px)] font-semibold tracking-[-0.02em]">{euro(plan.monthly)}</span>
          <span className="ml-1 text-[13px] text-muted">/mnd</span>
        </div>
      </div>
      <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">{plan.summary}</p>
      <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5 text-[14.5px] leading-[1.5]">
        {plan.includes.map((x) => (
          <li key={x} className="flex items-start gap-3">
            <span className="mt-[8px] h-[6px] w-[6px] flex-none rounded-full bg-accent" aria-hidden />
            {x}
          </li>
        ))}
        {plan.excludes.map((x) => (
          <li key={x} className="flex items-start gap-3 text-faint">
            <span className="mt-[8px] h-[6px] w-[6px] flex-none rounded-full border border-line" aria-hidden />
            {x}
          </li>
        ))}
      </ul>
      {plan.fairUse && <p className="mt-4 text-[12.5px] leading-[1.5] text-faint">{plan.fairUse}</p>}
      <div className="mt-auto pt-6">
        <Button
          href={`/contact?voor=hosting&pakket=${plan.id}`}
          variant={plan.featured ? "primary" : "ghost"}
          className="w-full"
        >
          Kies {plan.name}
        </Button>
      </div>
    </div>
  );
}
