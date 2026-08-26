import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Contentbreedte (1140px). Horizontale marge komt van <Section>. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1140px]", className)}>{children}</div>;
}
