"use client";

import { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";

type Item = { id: string; label: string };

/** In-page tabs that stay under the header and follow where you are. */
export function ProductNav({ items }: { items: Item[] }) {
  const [current, setCurrent] = useState(items[0].id);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className={styles.nav} data-chapter="bone" aria-label="On this page">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={item.id === current ? "true" : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
