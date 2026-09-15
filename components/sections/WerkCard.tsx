"use client";

import Image from "next/image";
import { track } from "@vercel/analytics";
import { ArrowRight } from "@phosphor-icons/react";
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
      className="group block text-inherit transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-1 active:translate-y-0 active:duration-[120ms]"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[13px] border border-line transition-[border-color] duration-300 group-hover:border-accent/35">
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
      </div>
      <div className="mt-[14px] flex items-center justify-between gap-3">
        <span className="font-display text-[16px] font-semibold">{item.title}</span>
        {/* Meta wisselt op hover met de uitnodiging; niets ligt over het screenshot. */}
        <span className="relative text-right text-[12px] text-faint">
          <span className={internal ? "transition-opacity duration-200 group-hover:opacity-0" : undefined}>{item.meta}</span>
          {internal && (
            <span
              aria-hidden
              className="absolute inset-y-0 right-0 inline-flex items-center gap-1 whitespace-nowrap font-medium text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              Bekijk de case <ArrowRight size={13} weight="bold" />
            </span>
          )}
        </span>
      </div>
    </a>
  );
}
