import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Variant = "base" | "deep" | "cream";

const variantClass: Record<Variant, string> = {
  base: "bg-base text-ink",
  deep: "bg-deep text-ink",
  cream: "bg-cream text-cream-ink",
};

export function Section({
  id,
  variant = "base",
  className,
  style,
  children,
}: {
  id?: string;
  variant?: Variant;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      style={style}
      className={cn(
        "relative z-[1] py-[clamp(72px,11vw,124px)]",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </section>
  );
}
