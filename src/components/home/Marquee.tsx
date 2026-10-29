"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Home.module.css";

/** The X from the logo, as the separator between repeats. */
function Mark() {
  return (
    <svg className={styles.marqueeMark} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M4 4h9l7 10.5L27 4h9L24.5 20 36 36h-9l-7-10.5L13 36H4l11.5-16z" />
    </svg>
  );
}

/**
 * The company's claim running across the page. It drifts on its own and
 * speeds up, or turns back, with the reader's scroll.
 */
export function Marquee({ text }: { text: string }) {
  const track = useRef<HTMLDivElement>(null);
  const band = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const loop = gsap.to(el, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
    let direction = 1;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        if (self.direction !== direction) direction = self.direction;
        const boost = Math.min(5, 1 + Math.abs(self.getVelocity()) / 400);
        gsap.to(loop, { timeScale: direction * boost, duration: 0.25, overwrite: true });
        gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.25, ease: "power2.out" });
      },
    });

    // The hero hands over to the band: the green wipes in from the left as the
    // band arrives, 
    const wrap = band.current;
    const arrive = wrap
      ? gsap
          .timeline({
            scrollTrigger: { trigger: wrap, start: "top 98%", end: "top 40%", scrub: 0.6 },
          })
          .fromTo(wrap, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none" }, 0)
      : null;

    return () => {
      arrive?.scrollTrigger?.kill();
      arrive?.kill();
      trigger.kill();
      loop.kill();
    };
  }, []);

  const run = (
    <>
      {Array.from({ length: 3 }, (_, i) => (
        <span key={i} className={styles.marqueeItem}>
          {text}
          <Mark />
        </span>
      ))}
    </>
  );

  return (
    <section ref={band} className={styles.marquee} data-chapter="green" aria-label={text}>
      <div ref={track} className={styles.marqueeTrack} aria-hidden="true">
        <div className={styles.marqueeRun}>{run}</div>
        <div className={styles.marqueeRun}>{run}</div>
      </div>
    </section>
  );
}
