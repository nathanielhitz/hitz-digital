import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-[10px] rounded-full font-semibold leading-none transition-[transform,border-color,background-color,box-shadow,filter] duration-[250ms] ease-[cubic-bezier(.2,.7,.2,1)] will-change-transform";

const sizes = {
  md: "px-7 py-[15px] text-[15px]",
  sm: "px-[17px] py-[9px] text-[14px] font-medium",
};

// Primary: groene gradient + lit edge + zachte glow. Ghost: hairline die oplicht bij hover.
const variants = {
  primary:
    "text-on-accent [background-image:linear-gradient(135deg,var(--color-accent-bright)_0%,var(--color-accent)_48%,var(--color-accent-deep)_100%)] shadow-[0_12px_32px_-16px_rgba(0,0,0,0.7),0_6px_20px_-12px_rgba(95,164,126,0.36),inset_0_1px_0_rgba(255,255,255,0.16)] hover:-translate-y-0.5 hover:brightness-[1.04] hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.7),0_10px_26px_-12px_rgba(95,164,126,0.48),inset_0_1px_0_rgba(255,255,255,0.22)] active:translate-y-0 active:brightness-[0.98]",
  ghost:
    "border border-line text-ink hover:-translate-y-0.5 hover:border-accent/55 hover:bg-accent/10 active:translate-y-0",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  className,
  onClick,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const cls = cn(base, sizes[size], variants[variant], className);
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={cls} onClick={onClick} aria-label={ariaLabel}>
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
