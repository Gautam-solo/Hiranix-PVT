"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { factory } from "@/data/company";
import styles from "./About.module.css";

const pad = (n: number) => String(n).padStart(2, "0");
const stage = (title: string) => factory.find((item) => item.title === title)!;

/** One cable nail clip, built in the order it moves through the factory. */
const STEPS = [
  { name: "Steel wire", note: "Every clip starts as a length of steel wire." },
  { name: stage("Wire forming").title, note: stage("Wire forming").copy },
  { name: stage("Heat treatment").title, note: stage("Heat treatment").copy },
  { name: stage("Injection moulding").title, note: "The clip body is moulded around the nail." },
  { name: stage("Finishing").title, note: stage("Finishing").copy },
  { name: stage("Packing").title, note: stage("Packing").copy },
];

// Where the nail sits inside the clip photograph, as shares of its size.
const SHAFT = "inset(6.6% 77% 56.5% 10.5%)";
const NAIL = "inset(0% 73% 56.5% 6.5%)";
const WHOLE = "inset(0% 0% 0% 0%)";

/**
 * "From wire to clip": the section holds still while the scroll builds one
 * product, step by step, then packs it. It uses the real cut-out of the cable
 * nail clip, revealed in stages.
 */
export function MakingOf() {
  const root = useRef<HTMLDivElement>(null);
  const clip = useRef<HTMLImageElement>(null);
  const glow = useRef<HTMLSpanElement>(null);
  const shadow = useRef<HTMLSpanElement>(null);
  const packed = useRef<HTMLImageElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  // A layout effect, so the pin is undone before React removes this section.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const last = STEPS.length - 1;

    const context = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${STEPS.length * 70}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActive(Math.min(last, Math.floor(self.progress * STEPS.length)));
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // 1. wire: a plain rod draws down. 2. the head forms. 3. heat glow, then it cools.
      tl.fromTo(clip.current, { clipPath: "inset(6.6% 77% 100% 10.5%)" }, { clipPath: SHAFT, duration: 1 }, 0)
        .to(clip.current, { clipPath: NAIL, duration: 1 }, 1)
        .fromTo(glow.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 2)
        .to(glow.current, { opacity: 0, duration: 0.5 }, 2.5)
        // 4. the body is moulded around it, top to bottom.
        .to(clip.current, { clipPath: WHOLE, duration: 1 }, 3)
        // 5. finishing: it settles onto its shadow.
        .fromTo(shadow.current, { opacity: 0, scaleX: 0.5 }, { opacity: 1, scaleX: 1, duration: 1 }, 4)
        // 6. packing: it becomes a counted row.
        .to(clip.current, { opacity: 0, scale: 0.9, duration: 0.7 }, 5)
        .to(shadow.current, { opacity: 0, duration: 0.5 }, 5)
        .fromTo(packed.current, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.8 }, 5.2)
        .to({}, { duration: 0.4 }, 6);
    }, el);

    return () => context.revert();
  }, []);

  return (
    <div className={styles.makingWrap}>
      <section ref={root} className={styles.making} data-chapter="ink" aria-labelledby="making-title">
        <div className={styles.makingStage} aria-hidden="true">
          <span className={styles.makingShadow} ref={shadow} />
          <img
            ref={clip}
            className={styles.makingClip}
            src="/assets/hiranix/about/about-cable-nail-clip-01.webp"
            alt=""
            width={900}
            height={1376}
          />
          <span ref={glow} className={styles.makingGlow} />
          <img
            ref={packed}
            className={styles.makingPacked}
            src="/assets/hiranix/about/about-cable-nail-clip-02.webp"
            alt=""
            width={900}
            height={578}
          />
        </div>

        <div className={styles.makingText}>
          <p className="t-mono">(02) How a clip is made</p>
          <h2 id="making-title" className={styles.makingTitle}>
            From wire <span className="t-accent">to clip.</span>
          </h2>
          <div className={styles.makingLive} aria-live="polite">
            <p className={`t-mono ${styles.makingNo}`}>
              <span className="t-accent">{pad(active + 1)}</span> / {pad(STEPS.length)}
            </p>
            <p className={styles.makingName}>{STEPS[active].name}</p>
            <p className="t-body">{STEPS[active].note}</p>
          </div>
          <ol className={styles.makingList}>
            {STEPS.map((step, i) => (
              <li key={step.name}>
                <span className="t-mono">{pad(i + 1)}</span>
                <strong>{step.name}</strong>
                <span className="t-body">{step.note}</span>
              </li>
            ))}
          </ol>
          <span className={styles.makingTrack} aria-hidden="true">
            <span ref={bar} />
          </span>
        </div>
      </section>
    </div>
  );
}
