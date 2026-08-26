"use client";

import { track } from "@vercel/analytics";
import type { ReactNode } from "react";

/** mailto-link met conversie-event (`mailto_click`). */
export function MailtoLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        try {
          track("mailto_click", { label: typeof children === "string" ? children.slice(0, 40) : "mailto" });
        } catch {}
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
