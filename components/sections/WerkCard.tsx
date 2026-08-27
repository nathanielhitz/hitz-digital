"use client";

import Image from "next/image";
import { track } from "@vercel/analytics";
import { workHref, type WorkItem } from "@/lib/work";

export function WerkCard({ item }: { item: WorkItem }) {
  const internal = Boolean(item.client);
  return (
    <a
      href={workHref(item)}
      {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      onClick={() => {
        try {
          track("portfolio_click", { project: item.title, internal });
        } catch {}
      }}
      className="group block text-inherit"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[13px] border border-line transition-[border-color,transform] duration-300 group-hover:-translate-y-1 group-hover:border-accent/35">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 366px"
          className="object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--scrim)_65%,transparent)_0%,transparent_55%)]"
          aria-hidden
        />
        {item.tag && (
          <span className="absolute left-3 top-3 rounded-full border border-on-scrim/15 bg-scrim/55 px-[10px] py-[4px] text-[10.5px] uppercase tracking-[0.12em] text-on-scrim-muted backdrop-blur-[6px]">
            {item.tag}
          </span>
        )}
        {internal && (
          <span className="absolute bottom-3 left-3 text-[12.5px] font-medium text-on-scrim/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Bekijk de case →
          </span>
        )}
      </div>
      <div className="mt-[14px] flex items-center justify-between gap-3">
        <span className="font-display text-[16px] font-semibold">{item.title}</span>
        <span className="text-right text-[12px] text-faint">{item.meta}</span>
      </div>
    </a>
  );
}
