"use client";

import { useEffect, useRef, useState } from "react";
import { Split } from "@/components/system/Split";
import styles from "./About.module.css";

const PROMISES = [
  "Made in our own factory.",
  "Counted, packed and dispatched.",
  "Supplied factory-direct.",
  "World’s largest maker of cable nail clips.",
];

/**
 * What HIRANIX stands behind, as one line each in huge type. The line under
 * the pointer (or, on a touch screen, the line crossing the middle of the
 * screen) fills green.
 */
export function Promises() {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const rows = Array.from(root.querySelectorAll<HTMLElement>("li"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = rows.indexOf(entry.target as HTMLElement);
          if (entry.isIntersecting) setActive(index);
        });
      },
      { rootMargin: "-44% 0px -44% 0px" },
    );
    rows.forEach((row) => io.observe(row));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.promises} data-chapter="bone" aria-labelledby="promises-title">
      <div className="hx-index">
        <p className="t-mono">(04) What we stand behind</p>
        <p className="t-mono">Four lines</p>
      </div>
      <Split id="promises-title" className={`t-display-xl ${styles.promisesTitle}`}>
        Our <span className="t-thin">promises</span>
      </Split>
      <ol ref={list} className={styles.promiseList}>
        {PROMISES.map((text, i) => (
          <li
            key={text}
            data-active={active === i ? "" : undefined}
            onPointerEnter={() => setActive(i)}
          >
            <span className="t-mono">{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.promiseText}>{text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
