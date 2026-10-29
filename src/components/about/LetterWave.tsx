"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./About.module.css";

type Props = {
  text: string;
  /** Letters from this index on take the accent colour. */
  accentFrom?: number;
  className?: string;
};

/**
 * Huge type that responds: letters near the pointer swell to the heaviest
 * weight and the rest relax. With no pointer (a phone) a slow wave travels
 * along the line by itself. Letters rise in once, like every other heading.
 */
export function LetterWave({ text, accentFrom, className }: Props) {
  const line = useRef<HTMLSpanElement>(null);
  const letters = Array.from(text);

  useEffect(() => {
    const el = line.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const glyphs = Array.from(el.querySelectorAll<HTMLElement>("[data-glyph]"));
    const LOW = 640;
    const HIGH = 900;
    const weights = glyphs.map(() => LOW);
    const apply = () =>
      glyphs.forEach((glyph, i) => {
        glyph.style.fontVariationSettings = `"wdth" 125, "wght" ${Math.round(weights[i])}`;
      });
    apply();

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) {
      const move = (event: PointerEvent) => {
        const reach = glyphs[0].getBoundingClientRect().height * 1.6;
        glyphs.forEach((glyph, i) => {
          const r = glyph.getBoundingClientRect();
          const d = Math.hypot(event.clientX - (r.left + r.width / 2), event.clientY - (r.top + r.height / 2));
          const target = LOW + (HIGH - LOW) * Math.exp(-((d / reach) ** 2));
          gsap.to(weights, { [i]: target, duration: 0.5, ease: "power3.out", onUpdate: apply, overwrite: "auto" });
        });
      };
      const leave = () =>
        glyphs.forEach((_, i) => gsap.to(weights, { [i]: LOW, duration: 0.9, ease: "power2.out", onUpdate: apply, overwrite: "auto" }));
      window.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        window.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    }

    // No hover: a wave drifts along the line.
    const wave = { t: 0 };
    const tween = gsap.to(wave, {
      t: 1,
      duration: 4.5,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        const centre = wave.t * (glyphs.length + 4) - 2;
        glyphs.forEach((_, i) => {
          weights[i] = LOW + (HIGH - LOW) * Math.exp(-(((i - centre) / 1.6) ** 2));
        });
        apply();
      },
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <span ref={line} className={`${styles.wave} ${className ?? ""}`} data-split="" data-atf="">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {letters.map((letter, i) =>
          letter === " " ? (
            " "
          ) : (
            <span className="w" key={i} style={{ "--wi": i } as React.CSSProperties}>
              <span
                data-glyph
                className={accentFrom !== undefined && i >= accentFrom ? styles.accent : undefined}
              >
                {letter}
              </span>
            </span>
          ),
        )}
      </span>
    </span>
  );
}
