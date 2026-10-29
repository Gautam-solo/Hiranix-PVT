"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The one motion engine below the hero. Sections only describe what they want:
 *
 *   data-reveal="rise"|"unveil"    reveal once on entry (stagger with --i)
 *   data-split                     words rise out of their masks once (Split)
 *   data-words                     words fill as the reader scrolls (Split)
 *   data-rule                      a hairline draws itself in
 *   data-parallax="0.12"           the photo inside drifts as the page scrolls
 *   data-drift="1|-1"              the row slides sideways against the scroll
 *   data-bgpan                     a background photo pans as the page scrolls
 *   data-count="15"                count up from zero once, on entry
 *
 * Entry reveals are CSS transitions switched on by an observer; everything
 * tied to the scroll position runs on GSAP ScrollTrigger.
 */
export function ChapterMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observers: IntersectionObserver[] = [];
    const frames: number[] = [];

    const countUp = (el: HTMLElement) => {
      const to = Number(el.dataset.count);
      if (!Number.isFinite(to)) return;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1600);
        el.textContent = String(Math.round(to * (1 - (1 - t) ** 4)));
        if (t < 1) frames.push(requestAnimationFrame(tick));
      };
      frames.push(requestAnimationFrame(tick));
    };

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not([data-in]):not([data-atf]), [data-split]:not([data-in]):not([data-atf]), [data-rule]:not([data-in]), [data-count]",
      ),
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
        { rootMargin: "0px 0px -10%", threshold: 0.05 },
      );
      targets.forEach((el) => io.observe(el));
      observers.push(io);
    }

    if (reduce) {
      return () => observers.forEach((io) => io.disconnect());
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      // Statements fill word by word across the stretch they are read in.
      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
        gsap.to(el.querySelectorAll(".w > span"), {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 42%", scrub: 0.6 },
        });
      });

      // Rows of huge type slide sideways, in alternating directions.
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((row) => {
        const dir = Number(row.dataset.drift) || 1;
        gsap.fromTo(
          row,
          { xPercent: dir * -7 },
          {
            xPercent: dir * 7,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });

      // A photograph inside lettering pans as the page scrolls.
      gsap.utils.toArray<HTMLElement>("[data-bgpan]").forEach((el) => {
        gsap.fromTo(
          el,
          { backgroundPositionY: "0%" },
          {
            backgroundPositionY: "100%",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });

      // Photos drift inside their frames, slower than the page.
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((frame) => {
        const img = frame.querySelector("img");
        if (!img) return;
        const amount = Number(frame.dataset.parallax) || 0.08;
        gsap.fromTo(
          img,
          { yPercent: -amount * 100 },
          {
            yPercent: amount * 100,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    // The header steps out of the way while reading down, and returns on the
    // way back up.
    const header = document.querySelector<HTMLElement>(".hx-site-header");
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (header) {
        const menuOpen = document.querySelector(".hx-menu-shell.is-open");
        if (!menuOpen && y > 480 && y > last + 4) header.setAttribute("data-away", "");
        else if (menuOpen || y < 480 || y < last - 4) header.removeAttribute("data-away");
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Late images and fonts change the page height; measure again once.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const settle = window.setTimeout(refresh, 900);

    return () => {
      observers.forEach((io) => io.disconnect());
      frames.forEach((frame) => cancelAnimationFrame(frame));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", refresh);
      window.clearTimeout(settle);
      header?.removeAttribute("data-away");
      context.revert();
    };
  }, [pathname]);

  return null;
}
