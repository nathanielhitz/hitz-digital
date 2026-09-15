import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Variant = "deep" | "base";
type Padding = "default" | "large";

const variantClass: Record<Variant, string> = {
  deep: "border-t border-line", // erft de pagina-achtergrond (--color-deep); hairline scheidt van de vorige sectie
  base: "bg-base", // de kleurwissel scheidt al, geen extra lijn
};
const paddingClass: Record<Padding, string> = {
  default: "py-10 md:py-12",
  large: "py-12 md:py-16",
};

/** Sectie-ritme: hairline bovenaan (alleen op deep), verticale padding, horizontale gutter. */
export function Section({
  id,
  variant = "deep",
  padding = "default",
  className,
  children,
}: {
  id?: string;
  variant?: Variant;
  padding?: Padding;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-[clamp(20px,5vw,64px)]",
        paddingClass[padding],
        variantClass[variant],
        className,
      )}
    >
      {children}
    </section>
  );
}
