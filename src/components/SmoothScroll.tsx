"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Lenis uses ResizeObserver internally. Browsers without it keep native
    // scrolling rather than failing the entire client-side application.
    if (!("ResizeObserver" in window)) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      wrapper: document.documentElement,
      content: document.body,
      infinite: false,
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.25,
      autoResize: true,
      anchors: {
        duration: 1.25,
      },
    });
    lenisRef.current = lenis;

    // One clock for both: Lenis moves the page on GSAP's ticker, and every
    // scroll-linked animation reads the position Lenis just set.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
