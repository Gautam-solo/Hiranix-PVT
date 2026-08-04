"use client";

/* eslint-disable @next/next/no-img-element -- stacked hover images need identical native rendering */

import Link from "next/link";
import { DownloadSimple } from "@phosphor-icons/react/DownloadSimple";
import { useEffect, useRef, useState } from "react";
import styles from "./ProductShowcase.module.css";

type Product = {
  name: string;
  base: string;
  hover: string;
};

const products: Product[] = [
  { name: "Concrete Nail", base: "/assets/hiranix/products/concrete-nail-01.jpg", hover: "/assets/hiranix/products/concrete-nail-02.jpg" },
  { name: "MCB Distribution Push Button", base: "/assets/hiranix/products/mcb-distribution-push-button-01.jpg", hover: "/assets/hiranix/products/mcb-distribution-push-button-02.jpg" },
  { name: "Elite / Magnum Distribution Box", base: "/assets/hiranix/products/db-elite-01.jpg", hover: "/assets/hiranix/products/db-magnum-01.jpg" },
  { name: "MCB Box", base: "/assets/hiranix/products/mcb-box-01.jpg", hover: "/assets/hiranix/products/mcb-box-02.jpg" },
  { name: "Wall Plug Gitti", base: "/assets/hiranix/products/wall-plug-gitti-01.jpg", hover: "/assets/hiranix/products/wall-plug-gitti-02.jpg" },
  { name: "UPVC / CPVC End Plug", base: "/assets/hiranix/products/upvc-end-plug-01.jpg", hover: "/assets/hiranix/products/cpvc-end-plug-01.jpg" },
  { name: "Plastic UPVC / CPVC Clamp", base: "/assets/hiranix/products/plastic-upvc-clamp-01.jpg", hover: "/assets/hiranix/products/plastic-cpvc-clamp-01.jpg" },
  { name: "Nylon Cable Tie", base: "/assets/hiranix/products/nylon-cable-tie-01.jpg", hover: "/assets/hiranix/products/nylon-cable-tie-02.jpg" },
  { name: "Open Surface Box", base: "/assets/hiranix/products/open-surface-box-01.jpg", hover: "/assets/hiranix/products/open-surface-box-02.jpg" },
  { name: "Round / Fan Sheet", base: "/assets/hiranix/products/round-sheet-01.jpg", hover: "/assets/hiranix/products/fan-sheet-01.jpg" },
  { name: "FR PVC Tape", base: "/assets/hiranix/products/fr-pvc-tape-01.jpg", hover: "/assets/hiranix/products/fr-pvc-tape-02.jpg" },
  { name: "Cable Nail Clip", base: "/assets/hiranix/products/cable-nail-clip-01.jpg", hover: "/assets/hiranix/products/cable-nail-clip-02.jpg" },
  { name: "Modular Gang Box", base: "/assets/hiranix/products/modular-gang-box-01.jpg", hover: "/assets/hiranix/products/modular-gang-box-02.jpg" },
  { name: "Metal Junction Box", base: "/assets/hiranix/products/metal-junction-box-01.jpg", hover: "/assets/hiranix/products/metal-junction-box-02.jpg" },
  { name: "Double Nail Clamp", base: "/assets/hiranix/products/double-nail-clamp-01.jpg", hover: "/assets/hiranix/products/double-nail-clamp-02.jpg" },
  { name: "CCTV Camera Box", base: "/assets/hiranix/products/cctv-camera-box-01.jpg", hover: "/assets/hiranix/products/cctv-camera-box-02.jpg" },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [showAlternate, setShowAlternate] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const alternateIsVisible = showAlternate || isHolding;
  const labelClass =
    product.name.length > 24
      ? styles.labelLong
      : product.name.length > 18
        ? styles.labelMedium
        : "";

  return (
    <article
      className={styles.card}
      data-alternate={alternateIsVisible ? "true" : "false"}
      style={
        {
          "--reveal-delay": `${(index % 4) * 70}ms`,
          "--source-index": index,
        } as React.CSSProperties
      }
    >
      <svg
        className={styles.frame}
        viewBox="0 0 407 411"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M9 1H398C402.4 1 406 4.6 406 9V330H263C254 330 249 333 243 340L221 373C216 380 211 382 201 382H9C4.6 382 1 378.4 1 374V9C1 4.6 4.6 1 9 1Z" />
      </svg>

      <div
        className={styles.imageStage}
        role="button"
        tabIndex={0}
        aria-pressed={alternateIsVisible}
        aria-label={`${showAlternate ? "Show primary" : "Show alternate"} view of ${product.name}`}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          setIsHolding(true);
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          setIsHolding(false);
        }}
        onPointerCancel={() => setIsHolding(false)}
        onLostPointerCapture={() => setIsHolding(false)}
        onContextMenu={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if ((event.key !== "Enter" && event.key !== " ") || event.repeat) return;
          event.preventDefault();
          setShowAlternate((active) => !active);
        }}
      >
        <img
          className={styles.productImage}
          src={product.base}
          alt={`${product.name}, primary product view`}
          loading="lazy"
          decoding="async"
        />
        <img
          className={`${styles.productImage} ${styles.hoverImage}`}
          src={product.hover}
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      </div>

      <div className={`${styles.label} ${labelClass}`}>
        <span>{product.name}</span>
      </div>
    </article>
  );
}

export default function ProductShowcase() {
  const hallRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(`.${styles.card}`);
    const covers = [
      ...(hallRef.current?.querySelectorAll<HTMLElement>("[data-product-cover]") ?? []),
      ...(ctaRef.current?.querySelectorAll<HTMLElement>("[data-product-cover]") ?? []),
    ];

    if (!cards?.length && !covers.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards?.forEach((card) => card.setAttribute("data-visible", "true"));
      covers.forEach((cover) => cover.setAttribute("data-cover-visible", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -7%", threshold: 0.08 },
    );

    const coverObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).setAttribute("data-cover-visible", "true");
          coverObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -15%", threshold: 0.16 },
    );

    cards?.forEach((card) => observer.observe(card));
    covers.forEach((cover) => coverObserver.observe(cover));
    return () => {
      observer.disconnect();
      coverObserver.disconnect();
    };
  }, []);

  const productColumnIndexes = [
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
  ];

  const productColumns = productColumnIndexes.map((column) =>
    column.map((index) => ({ product: products[index], index })),
  );

  return (
    <>
      <section id="products" ref={hallRef} className={styles.hall} aria-labelledby="product-list-title">
        <div className={styles.content}>
          <nav className={styles.sectionHeader} aria-label="HIRANIX product navigation">
            <Link className={styles.sectionBrand} href="/products">
              HIRANIX <span>Products</span>
            </Link>
            <div className={styles.sectionActions}>
              <span>{products.length} product systems</span>
              <a
                href="/Hiranix-Product-Catalogue.pdf"
                download="Hiranix-Product-Catalogue.pdf"
              >
                Download catalogue
                <DownloadSimple size={17} weight="regular" aria-hidden="true" />
              </a>
            </div>
          </nav>

          <div className={styles.introCopy}>
            <h2
              id="product-list-title"
              className={`${styles.heading} ${styles.coverReveal} ${styles.coverLime}`}
              data-product-cover
            >
              <span>Product</span>
              <span className={styles.brierLine}>List</span>
            </h2>
            <p
              className={`${styles.coverReveal} ${styles.coverLime} ${styles.coverDelayed}`}
              data-product-cover
            >
              Explore the complete HIRANIX range from two product angles. Tap and hold any image
              to reveal its alternate angle.
            </p>
          </div>

          <div ref={gridRef} className={styles.grid}>
            {productColumns.map((column, columnIndex) => (
              <div className={styles.column} key={`product-column-${columnIndex}`}>
                {column.map(({ product, index }) => (
                  <ProductCard
                    key={product.name}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className={styles.cta} aria-label="HIRANIX product quality">
        <div className={styles.ctaMark} aria-hidden="true">
          <span />
          <i>HX</i>
          <span />
        </div>
        <p
          className={`${styles.coverReveal} ${styles.coverLime}`}
          data-product-cover
        >
          Reliable electrical and hardware solutions, engineered for every fix.
        </p>
        <Link
          className={`${styles.ctaLink} ${styles.coverReveal} ${styles.coverDark} ${styles.coverDelayed}`}
          href="/products"
          data-product-cover
        >
          <span>View full product system</span>
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
