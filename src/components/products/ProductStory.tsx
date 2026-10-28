"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "@phosphor-icons/react/Check";
import { Photo } from "@/components/system/Photo";
import { Split } from "@/components/system/Split";
import type { HiranixProduct } from "@/data/products";
import styles from "./ProductDetail.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The product, held still while its story scrolls past: what it is, where it
 * is used, what it offers, and its key specifications. The photograph turns a
 * little as you read, and changes to its second view halfway.
 */
export function ProductStory({ product }: { product: HiranixProduct }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const second = useRef<HTMLImageElement>(null);
  const [active, setActive] = useState(0);

  const steps = [
    { label: "Overview", id: "story-0" },
    { label: "Where it is used", id: "story-1" },
    { label: "What it offers", id: "story-2" },
    { label: "Specifications", id: "story-3" },
  ];

  useEffect(() => {
    const el = root.current;
    const card = stage.current;
    if (!el || !card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      // The photograph turns a little while you read (wide screens only).
      mm.add("(min-width: 901px)", () => {
        gsap.fromTo(
          card.querySelector("[data-turn]"),
          { rotate: -2, scale: 1.1 },
          {
            rotate: 2,
            scale: 1.16,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 30%", scrub: 0.7 },
          },
        );
      });
      // Halfway through, the photograph changes to its second view (everywhere).
      if (second.current) {
        gsap.fromTo(
          second.current,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "35% center", end: "62% center", scrub: true },
          },
        );
      }
    }, el);
    return () => context.revert();
  }, []);

  useEffect(() => {
    const items = root.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  const hasSecond = product.alternateImage !== product.image;

  return (
    <section
      ref={root}
      id="overview"
      className={styles.story}
      data-chapter="ink"
      aria-labelledby="overview-title"
    >
      <div className={styles.storyStage}>
        <div ref={stage} className={styles.storyCard}>
          <div className={`frame ${styles.storyFrame}`}>
            <span data-turn className={styles.storyTurn}>
              <Photo
                src={product.image}
                alt={product.name}
                width={1122}
                height={1402}
                sizes="(max-width: 900px) 92vw, 40vw"
              />
              {hasSecond && (
                <Photo
                  ref={second}
                  className={styles.storySecond}
                  src={product.alternateImage}
                  alt=""
                  width={1122}
                  height={1402}
                  sizes="(max-width: 900px) 1px, 40vw"
                  aria-hidden
                />
              )}
            </span>
          </div>
          <ol className={styles.storySteps} aria-hidden="true">
            {steps.map((step, i) => (
              <li key={step.id} data-on={i === active ? "" : undefined}>
                <span className="t-mono">{pad(i + 1)}</span>
                {step.label}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className={styles.storyText}>
        <div data-step="0" id="story-0" className={styles.storyBlock}>
          <p className="t-mono">(01) Overview</p>
          <Split id="overview-title" className="t-display-m">
            {product.statement}
          </Split>
          <p className="t-body" data-reveal="rise">{product.description}</p>
        </div>

        <div data-step="1" id="story-1" className={styles.storyBlock}>
          <p className="t-mono">(02) Where it is used</p>
          <ul className={styles.storyList}>
            {product.applications.map((item, i) => (
              <li key={item} data-reveal="rise" style={{ "--i": i } as React.CSSProperties}>
                <Check size={16} weight="bold" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div data-step="2" id="story-2" className={styles.storyBlock}>
          <p className="t-mono">(03) What it offers</p>
          <ul className={styles.storyList}>
            {product.features.map((item, i) => (
              <li key={item} data-reveal="rise" style={{ "--i": i } as React.CSSProperties}>
                <Check size={16} weight="bold" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div data-step="3" id="story-3" className={styles.storyBlock}>
          <p className="t-mono">(04) Specifications</p>
          <dl className={styles.storySpecs}>
            {product.specs.map((spec, i) => (
              <div key={spec.label} data-reveal="rise" style={{ "--i": i } as React.CSSProperties}>
                <dd>{spec.value}</dd>
                <dt className="t-mono">{spec.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
