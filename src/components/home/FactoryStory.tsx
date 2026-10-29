"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Photo } from "@/components/system/Photo";
import { Split } from "@/components/system/Split";
import { factory } from "@/data/company";
import styles from "./Home.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The factory in two moves. A photograph of the floor opens out to the full
 * screen as it arrives; then the process reads down the page, one stage at a
 * time, while its photograph holds still beside it.
 */
export function FactoryStory({ index = "(03)" }: { index?: string }) {
  const opener = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = opener.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        el.querySelector("[data-open]"),
        { clipPath: "inset(14% 18% 14% 18% round 2px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top top", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        el.querySelector("[data-open] img"),
        { scale: 1.3 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "bottom top", scrub: 0.6 },
        },
      );
    }, el);
    return () => context.revert();
  }, []);

  // The pinned photographs sit stacked and invisible until their stage, so the
  // browser would otherwise wait to load them. Load them as the section nears.
  useEffect(() => {
    const section = root.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        section.querySelectorAll<HTMLImageElement>("[data-stage-photo] img").forEach((img) => {
          img.loading = "eager";
        });
        io.disconnect();
      },
      { rootMargin: "1200px 0px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const steps = document.querySelectorAll<HTMLElement>("[data-stage]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.stage));
        });
      },
      // On a phone the photo is pinned in the upper part of the screen, so the
      // stage being read is the one in the lower part.
      {
        rootMargin: window.matchMedia("(max-width: 900px)").matches
          ? "-58% 0px -28% 0px"
          : "-45% 0px -45% 0px",
      },
    );
    steps.forEach((step) => io.observe(step));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} className={styles.factory} data-chapter="ink" aria-labelledby="factory-title">
      <div ref={opener} className={styles.opener}>
        <div className={styles.openerFrame} data-open>
          <Photo
            src="/assets/hiranix/factory/injection-moulding-floor.jpg"
            alt="Rows of injection moulding machines on the HIRANIX factory floor"
            width={1086}
            height={1448}
            sizes="100vw"
          />
        </div>
        <div className={styles.openerText}>
          <p className="t-mono">{index} Inside the factory</p>
          <Split id="factory-title" className="t-display-xl">
            Made under
            <br />
            one roof
          </Split>
          <p className={`t-body ${styles.openerCopy}`} data-reveal="rise">
            Moulding, wire forming, heat treatment, finishing and packing all happen in our own
            factory in Mehmedabad, Gujarat.
          </p>
        </div>
      </div>

      <div className={styles.stages}>
        <div className={styles.stagesPhoto} data-stage-photo aria-hidden="true">
          {factory.map((stage, i) => (
            <span
              key={stage.title}
              className={`frame ${styles.stagesFrame}`}
              data-on={i === active ? "" : undefined}
            >
              <Photo src={stage.src} alt="" width={1086} height={1448} sizes="(max-width: 900px) 100vw, 40vw" />
            </span>
          ))}
          <p className={`t-mono ${styles.stagesCount}`}>
            <span className="t-accent">{pad(active + 1)}</span> / {pad(factory.length)}
          </p>
        </div>

        <ol className={styles.stagesList}>
          {factory.map((stage, i) => (
            <li key={stage.title} data-stage={i} data-on={i === active ? "" : undefined}>
              <p className={`t-mono ${styles.stageNo}`}>Stage {pad(i + 1)}</p>
              <h3 className="t-display-m">{stage.title}</h3>
              <p className="t-body">{stage.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
