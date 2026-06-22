import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-none tracking-[-0.01em] transition-[transform,background-color,background-image,border-color,box-shadow] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] will-change-transform";

const sizes = {
  md: "px-7 py-[14px] text-[15px]",
  sm: "px-[18px] py-[10px] text-[13px]",
};

// Primary: warm gradient + lit top edge + soft warm glow (depth, not flat SaaS fill).
// Ghost: faint glass hairline that lifts on hover.
const variants = {
  primary:
    "text-white [background-image:linear-gradient(180deg,#C4552E_0%,#A8451E_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_10px_24px_-12px_rgba(226,97,60,0.4)] hover:[background-image:linear-gradient(180deg,#CE5C34_0%,#B44C24_100%)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_16px_34px_-14px_rgba(226,97,60,0.5)] active:translate-y-0",
  ghost:
    "border border-[rgba(244,239,231,0.16)] bg-[rgba(244,239,231,0.02)] text-ink backdrop-blur-sm hover:border-[rgba(244,239,231,0.34)] hover:bg-[rgba(244,239,231,0.06)] hover:-translate-y-0.5 active:translate-y-0",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  onClick,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const cls = cn(base, sizes[size], variants[variant], className);
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
