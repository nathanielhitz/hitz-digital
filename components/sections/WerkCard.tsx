"use client";

import Image from "next/image";
import { track } from "@vercel/analytics";
import type { WorkItem } from "@/lib/work";

export function WerkCard({ item }: { item: WorkItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        try {
          track("portfolio_click", { project: item.title });
        } catch {}
      }}
      className="block text-inherit transition-opacity duration-200 hover:opacity-[0.92]"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[13px] border border-line">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 366px"
          className="object-cover object-top"
          unoptimized={item.src.endsWith(".gif")}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(7,7,6,0.65)_0%,transparent_55%)]"
          aria-hidden
        />
      </div>
      <div className="mt-[14px] flex items-center justify-between gap-3">
        <span className="font-display text-[16px] font-semibold">{item.title}</span>
        <span className="text-right text-[12px] text-faint">{item.meta}</span>
      </div>
    </a>
  );
}
