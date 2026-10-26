"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The one motion engine below the hero. Sections only describe what they want:
 *
 *   data-chapters                  the surface whose ground changes colour
 *   data-chapter="forest"          the chapter a section belongs to
 *   data-reveal="rise"|"unveil"    reveal once on entry (stagger with --i)
 *   data-count="15"                count up from zero once, on entry
 */
export function ChapterMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observers: IntersectionObserver[] = [];
    const frames: number[] = [];

    // A chapter takes the ground when it crosses the middle of the screen.
    document.querySelectorAll<HTMLElement>("[data-chapters]").forEach((surface) => {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              surface.dataset.current = (entry.target as HTMLElement).dataset.chapter;
            }
          });
        },
        { rootMargin: "-50% 0px -50% 0px" },
      );
      surface.querySelectorAll("[data-chapter]").forEach((chapter) => io.observe(chapter));
      observers.push(io);
    });

    const countUp = (el: HTMLElement) => {
      const to = Number(el.dataset.count);
      if (!Number.isFinite(to)) return;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1200);
        el.textContent = String(Math.round(to * (1 - (1 - t) ** 3)));
        if (t < 1) frames.push(requestAnimationFrame(tick));
      };
      frames.push(requestAnimationFrame(tick));
    };

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in]), [data-count]"),
    );
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-in", ""));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            el.setAttribute("data-in", "");
            if (el.dataset.count) countUp(el);
            io.unobserve(el);
          });
        },
        { rootMargin: "0px 0px -12%", threshold: 0.1 },
      );
      targets.forEach((el) => io.observe(el));
      observers.push(io);
    }

    return () => {
      observers.forEach((io) => io.disconnect());
      frames.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, [pathname]);

  return null;
}
