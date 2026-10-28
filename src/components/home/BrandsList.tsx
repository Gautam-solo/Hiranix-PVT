"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Photo } from "@/components/system/Photo";
import { brands } from "@/data/company";
import styles from "./Home.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The three brands as one stacked list of names. On a desktop the brand's
 * mark follows the pointer over its row; on a phone it sits beside the name.
 */
export function BrandsList() {
  const list = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const box = preview.current;
    const root = list.current;
    if (!box || !root || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const x = gsap.quickTo(box, "x", { duration: 0.6, ease: "power3" });
    const y = gsap.quickTo(box, "y", { duration: 0.6, ease: "power3" });
    const move = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      x(event.clientX - rect.left);
      y(event.clientY - rect.top);
    };
    root.addEventListener("pointermove", move);
    return () => root.removeEventListener("pointermove", move);
  }, []);

  return (
    <div ref={list} className={styles.brandWrap} onPointerLeave={() => setHovered(null)}>
      <ul className={styles.brandList}>
        {brands.map((brand, i) => (
          <li key={brand.name} onPointerEnter={() => setHovered(i)}>
            <span className={`t-mono ${styles.brandNo}`}>{pad(i + 1)}</span>
            <h3 className={styles.brandName}>{brand.name}</h3>
            <span className={`frame ${styles.brandMark}`}>
              <Photo src={brand.image} alt={`${brand.name} logo`} width={1280} height={1280} sizes="96px" />
            </span>
          </li>
        ))}
      </ul>
      <div
        ref={preview}
        className={styles.brandPreview}
        data-on={hovered !== null ? "" : undefined}
        aria-hidden="true"
      >
        {brands.map((brand, i) => (
          <span key={brand.name} className="frame" data-on={hovered === i ? "" : undefined}>
            <Photo src={brand.image} alt="" width={1280} height={1280} sizes="280px" />
          </span>
        ))}
      </div>
    </div>
  );
}
