"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ArrowRight";
import { ArrowUpRight } from "@phosphor-icons/react/ArrowUpRight";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Photo } from "@/components/system/Photo";
import { Split } from "@/components/system/Split";
import { products } from "@/data/products";
import { categoryHref, productsIn, systems } from "@/data/systems";
import styles from "./Home.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The five product systems on one rail. On a wide screen the section holds
 * still and the rail travels sideways as you scroll down; on a phone the
 * systems simply stack.
 */
export function SystemsRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = section.current;
    const rail = track.current;
    if (!root || !rail || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    // On a phone the rail is a native swipe; its progress line follows it.
    const onSwipe = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      if (bar.current && max > 0) bar.current.style.transform = `scaleX(${rail.scrollLeft / max})`;
    };
    rail.addEventListener("scroll", onSwipe, { passive: true });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const distance = () => rail.scrollWidth - window.innerWidth;
      const travel = gsap.to(rail, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // Each photo slides a little against the rail, so it reads as depth.
      rail.querySelectorAll<HTMLElement>("[data-rail-photo] img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -7 },
          {
            xPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: travel,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    });

    return () => {
      rail.removeEventListener("scroll", onSwipe);
      mm.revert();
    };
  }, []);

  return (
    <section ref={section} className={styles.rail} data-chapter="ink" aria-labelledby="products-title">
      <div ref={track} className={styles.railTrack}>
        <div className={styles.railIntro}>
          <div className="hx-index">
            <p className="t-mono">(02) Our products</p>
            <p className="t-mono">
              {systems.length} systems / {products.length} products
            </p>
          </div>
          <Split id="products-title" className={`t-mega ${styles.railTitle}`}>
            Our <br />
            <span className="t-accent">products</span>
          </Split>
          <div className={styles.railIntroFoot} data-reveal="rise">
            <p className="t-tagline">World&rsquo;s largest manufacturer of cable nail clips</p>
            <Link className="btn" href="/products">
              View all products
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </Link>
          </div>
          <p className={`t-mono ${styles.railHint}`} aria-hidden="true">
            <span className={styles.hintDesktop}>Scroll</span>
            <span className={styles.hintTouch}>Swipe</span> <ArrowRight size={12} weight="bold" />
          </p>
        </div>

        {systems.map((system, i) => {
          const items = productsIn(system.category);
          return (
            <article key={system.category} className={styles.panel} aria-labelledby={`system-${i}`}>
              <Link
                href={categoryHref(system.category)}
                className={`frame ${styles.panelPhoto}`}
                data-rail-photo
                data-reveal="unveil"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Photo
                  src={system.image}
                  alt=""
                  width={1122}
                  height={1402}
                  sizes="(max-width: 900px) 92vw, 34vw"
                />
              </Link>
              <div className={styles.panelText}>
                <p className={`t-mono ${styles.panelIndex}`}>
                  <span className="t-accent">{pad(i + 1)}</span> / {pad(systems.length)}
                </p>
                <h3 id={`system-${i}`} className={`t-display-l ${styles.panelName}`}>
                  <Link href={categoryHref(system.category)}>{system.category}</Link>
                </h3>
                <p className="t-body">{system.line}</p>
                <ul className={styles.panelList}>
                  {items.map((product) => (
                    <li key={product.slug}>
                      <Link href={`/products/${product.slug}`}>
                        {product.name}
                        <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link className="link" href={categoryHref(system.category)}>
                  Explore {system.category.toLowerCase()}
                  <ArrowRight size={15} weight="bold" aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}

        <div className={styles.railEnd}>
          <Link className={styles.railEndLink} href="/products">
            <span className="t-mono">The full range</span>
            <span className="t-display-l">
              All {products.length}
              <br />
              products
            </span>
            <span className={styles.railEndArrow} aria-hidden="true">
              <ArrowRight size={34} weight="bold" />
            </span>
          </Link>
        </div>
      </div>
      <div className={styles.railProgress} aria-hidden="true">
        <span ref={bar} />
      </div>
    </section>
  );
}
