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

// Primary: merkgroene gradient (bg-btn, in beide thema's gelijk) + lit edge + zachte glow. Ghost: hairline die oplicht bij hover.
const variants = {
  primary:
    "bg-btn text-on-accent shadow-btn hover:-translate-y-0.5 hover:brightness-[1.04] hover:shadow-btn-hover active:translate-y-0 active:brightness-[0.98]",
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
