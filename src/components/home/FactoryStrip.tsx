"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/ArrowRight";
import { Photo } from "@/components/system/Photo";
import { factory } from "@/data/company";
import styles from "./Home.module.css";

/**
 * The factory floor in process order: one strip you swipe, scroll sideways or
 * step through with the arrows. The rule under it shows where you are.
 */
export function FactoryStrip() {
  const stripRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  const sync = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const max = strip.scrollWidth - strip.clientWidth;
    const progress = max > 0 ? strip.scrollLeft / max : 0;
    if (barRef.current) barRef.current.style.transform = `scaleX(${0.08 + progress * 0.92})`;
    const width = (strip.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1;
    setCurrent(Math.min(factory.length - 1, Math.round(strip.scrollLeft / width)));
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    sync();
    strip.addEventListener("scroll", sync, { passive: true });
    return () => strip.removeEventListener("scroll", sync);
  }, [sync]);

  const step = (direction: 1 | -1) => {
    const strip = stripRef.current;
    const item = strip?.firstElementChild as HTMLElement | null;
    if (!strip || !item) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollBy({ left: direction * (item.offsetWidth + 16), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className={styles.factory}>
      <div className={styles.factoryHead}>
        <h3 className="t-heading">Inside the factory</h3>
        <div className={styles.factoryControls}>
          <span className={styles.factoryNow} aria-live="polite">
            {factory[current].title}
          </span>
          <button
            type="button"
            className="btn"
            onClick={() => step(-1)}
            disabled={current === 0}
            aria-label="Previous step"
          >
            <ArrowLeft size={18} weight="bold" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => step(1)}
            disabled={current === factory.length - 1}
            aria-label="Next step"
          >
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul ref={stripRef} className={styles.strip} tabIndex={0} aria-label="Factory floor, in process order">
        {factory.map((stage, i) => (
          <li key={stage.title} data-zoom>
            <figure>
              <span
                className={`frame ${styles.stripPhoto}`}
                data-reveal="unveil"
                style={{ "--i": Math.min(i, 2) } as React.CSSProperties}
              >
                <Photo
                  src={stage.src}
                  alt={stage.alt}
                  width={1086}
                  height={1448}
                  sizes="(max-width: 900px) 82vw, 560px"
                />
              </span>
              <figcaption>
                <strong>{stage.title}.</strong> {stage.copy}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className={styles.stripTrack} aria-hidden="true">
        <span ref={barRef} />
      </div>
    </div>
  );
}
