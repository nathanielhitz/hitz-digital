import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Variant = "deep" | "base";
type Padding = "default" | "large";

const variantClass: Record<Variant, string> = {
  deep: "", // erft de pagina-achtergrond (--color-deep)
  base: "bg-base",
};
const paddingClass: Record<Padding, string> = {
  default: "py-16 md:py-20 lg:py-24",
  large: "py-20 md:py-28",
};

/** Sectie-ritme: hairline bovenaan, verticale clamp-padding, horizontale gutter. */
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
        "relative border-t border-line px-[clamp(20px,5vw,64px)]",
        paddingClass[padding],
        variantClass[variant],
        className,
      )}
    >
      {children}
    </section>
  );
}
