"use client";

import { useEffect, useRef, useState } from "react";
import { Photo } from "@/components/system/Photo";
import { factory } from "@/data/company";
import styles from "./About.module.css";

/** The five stages of the factory floor, each reduced to the one verb that names it. */
const VERBS: Record<string, string> = {
  "Injection moulding": "Mould.",
  "Wire forming": "Form.",
  "Heat treatment": "Harden.",
  Finishing: "Finish.",
  Packing: "Pack.",
};

/**
 * How it is made, as five words set huge. The word crossing the middle of the
 * screen fills green and shows its photograph and one line of what happens.
 */
export function Verbs() {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const rows = Array.from(root.querySelectorAll<HTMLElement>("li"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(rows.indexOf(entry.target as HTMLElement));
        });
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    rows.forEach((row) => io.observe(row));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.verbs} data-chapter="ink" aria-labelledby="verbs-title">
      <div className="hx-index">
        <p className="t-mono">(03) How it is made</p>
        <p className="t-mono">Five steps, one roof</p>
      </div>
      <h2 id="verbs-title" className="sr-only">How it is made</h2>
      <ol ref={list} className={styles.verbList}>
        {factory.map((stage, i) => (
          <li key={stage.title} data-active={active === i ? "" : undefined}>
            <span className={`t-mono ${styles.verbNo}`}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.verbWord}>{VERBS[stage.title]}</span>
            <span className={styles.verbSide}>
              <span className={`frame ${styles.verbPhoto}`}>
                <Photo src={stage.src} alt={stage.alt} width={1086} height={1448} sizes="(max-width: 900px) 30vw, 18vw" />
              </span>
              <span className={styles.verbCopy}>
                <strong className="t-mono">{stage.title}</strong>
                <span className="t-body">{stage.copy}</span>
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
