import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

function TrafficLights({ hidden = false }: { hidden?: boolean }) {
  return (
    <span className={cn("flex gap-[7px]", hidden && "invisible")} aria-hidden>
      <i className="block h-[11px] w-[11px] rounded-full bg-[#E0685C]" />
      <i className="block h-[11px] w-[11px] rounded-full bg-[#E6B23E]" />
      <i className="block h-[11px] w-[11px] rounded-full bg-[#5FB45A]" />
    </span>
  );
}

/**
 * Mac-style browser chrome. Renders either an image (placeholder screenshot,
 * swappable for a real one) or arbitrary children (e.g. the before/after slider).
 * Tilt/shadow are controlled by the caller via `className` — the frame itself is
 * neutral, so the signature slider stays perfectly straight (build brief §1.4).
 */
export function BrowserFrame({
  url,
  src,
  alt,
  width = 1200,
  height = 760,
  priority = false,
  className,
  children,
}: {
  url: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[14px] border border-line bg-chrome", className)}>
      <div className="flex items-center gap-3 border-b border-line bg-[linear-gradient(180deg,#2A251F,#211D19)] px-3.5 py-[11px]">
        <TrafficLights />
        <span className="mx-auto max-w-[260px] flex-1 truncate rounded-md border border-line bg-[#17140F] px-3 py-[5px] text-center font-mono text-[11.5px] text-muted">
          {url}
        </span>
        <TrafficLights hidden />
      </div>
      {children ? (
        children
      ) : src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 880px) 100vw, 560px"
          className="block h-auto w-full"
        />
      ) : null}
    </div>
  );
}
