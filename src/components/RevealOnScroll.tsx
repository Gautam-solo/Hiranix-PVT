"use client";

import { useEffect } from "react";

/**
 * Reveals anything marked `data-reveal` as it enters the viewport, by flipping
 * `data-revealed` for CSS to animate. Kept as one observer for the whole page
 * rather than a wrapper component per section, so server components stay server
 * components and the markup keeps its own semantics.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!targets.length) return;

    // Nothing to stagger in if the reader has asked for stillness — show it all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => el.setAttribute("data-revealed", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
