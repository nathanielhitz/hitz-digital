"use client";

import { useEffect, useState } from "react";

/**
 * True zodra de bovenkant van `afterId` boven de lijn op `afterAt` (deel van de viewporthoogte)
 * is gekomen, en weer false zodra `untilId` de onderste 15% van het scherm binnenkomt.
 * Twee IntersectionObservers, geen scroll-listener. SSR-safe: start op false.
 */
export function useRangeVisible(afterId: string, untilId?: string, afterAt = 0.6) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const after = document.getElementById(afterId);
    if (!after) return;
    const until = untilId ? document.getElementById(untilId) : null;
    let pastAfter = false;
    let reachedUntil = false;
    const apply = () => setVisible(pastAfter && !reachedUntil);

    const ioAfter = new IntersectionObserver(
      ([e]) => {
        pastAfter = e.isIntersecting || e.boundingClientRect.top < 0;
        apply();
      },
      { rootMargin: `0px 0px -${Math.round((1 - afterAt) * 100)}% 0px`, threshold: 0 },
    );
    ioAfter.observe(after);

    let ioUntil: IntersectionObserver | null = null;
    if (until) {
      ioUntil = new IntersectionObserver(
        ([e]) => {
          reachedUntil = e.isIntersecting || e.boundingClientRect.bottom < 0;
          apply();
        },
        { rootMargin: "0px 0px -15% 0px", threshold: 0 },
      );
      ioUntil.observe(until);
    }
    return () => {
      ioAfter.disconnect();
      ioUntil?.disconnect();
    };
  }, [afterId, untilId, afterAt]);

  return visible;
}
