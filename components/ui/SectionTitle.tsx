import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const sizes = {
  sm: "text-[clamp(26px,3.2vw,40px)] leading-[1.1]",
  md: "text-[clamp(28px,3.6vw,46px)] leading-[1.06]",
  lg: "text-[clamp(30px,4.4vw,56px)] leading-[1.05]",
};

export function SectionTitle({
  children,
  size = "md",
  className,
}: {
  children: ReactNode;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <h2 className={cn("font-display font-semibold tracking-[-0.03em]", sizes[size], className)}>
      {children}
    </h2>
  );
}
