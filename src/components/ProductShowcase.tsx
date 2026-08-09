"use client";

/* eslint-disable @next/next/no-img-element -- product photos use their existing native rendering */

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./ProductShowcase.module.css";

type Product = {
  id: string;
  name: string;
  base: string;
  hover: string;
};

const products: Product[] = [
  { id: "concrete-nail", name: "Concrete Nail", base: "/assets/hiranix/products/concrete-nail-01.jpg", hover: "/assets/hiranix/products/concrete-nail-02.jpg" },
  { id: "mcb-distribution-push-button", name: "MCB Distribution Push Button", base: "/assets/hiranix/products/mcb-distribution-push-button-01.jpg", hover: "/assets/hiranix/products/mcb-distribution-push-button-02.jpg" },
  { id: "elite-magnum-distribution-box", name: "Elite / Magnum Distribution Box", base: "/assets/hiranix/products/db-elite-01.jpg", hover: "/assets/hiranix/products/db-magnum-01.jpg" },
  { id: "mcb-box", name: "MCB Box", base: "/assets/hiranix/products/mcb-box-01.jpg", hover: "/assets/hiranix/products/mcb-box-02.jpg" },
  { id: "wall-plug-gitti", name: "Wall Plug Gitti", base: "/assets/hiranix/products/wall-plug-gitti-01.jpg", hover: "/assets/hiranix/products/wall-plug-gitti-02.jpg" },
  { id: "upvc-cpvc-end-plug", name: "UPVC / CPVC End Plug", base: "/assets/hiranix/products/upvc-end-plug-01.jpg", hover: "/assets/hiranix/products/cpvc-end-plug-01.jpg" },
  { id: "plastic-upvc-cpvc-clamp", name: "Plastic UPVC / CPVC Clamp", base: "/assets/hiranix/products/plastic-upvc-clamp-01.jpg", hover: "/assets/hiranix/products/plastic-cpvc-clamp-01.jpg" },
  { id: "nylon-cable-tie", name: "Nylon Cable Tie", base: "/assets/hiranix/products/nylon-cable-tie-01.jpg", hover: "/assets/hiranix/products/nylon-cable-tie-02.jpg" },
  { id: "open-surface-box", name: "Open Surface Box", base: "/assets/hiranix/products/open-surface-box-01.jpg", hover: "/assets/hiranix/products/open-surface-box-02.jpg" },
  { id: "round-fan-sheet", name: "Round / Fan Sheet", base: "/assets/hiranix/products/round-sheet-01.jpg", hover: "/assets/hiranix/products/round-sheet-02.jpg" },
  { id: "fr-pvc-tape", name: "FR PVC Tape", base: "/assets/hiranix/products/fr-pvc-tape-01.jpg", hover: "/assets/hiranix/products/fr-pvc-tape-02.jpg" },
  { id: "cable-nail-clip", name: "Cable Nail Clip", base: "/assets/hiranix/products/cable-nail-clip-01.jpg", hover: "/assets/hiranix/products/cable-nail-clip-02.jpg" },
  { id: "modular-gang-box", name: "Modular Gang Box", base: "/assets/hiranix/products/modular-gang-box-01.jpg", hover: "/assets/hiranix/products/modular-gang-box-02.jpg" },
  { id: "metal-junction-box", name: "Metal Junction Box", base: "/assets/hiranix/products/metal-junction-box-01.jpg", hover: "/assets/hiranix/products/metal-junction-box-02.jpg" },
  { id: "double-nail-clamp", name: "Double Nail Clamp", base: "/assets/hiranix/products/double-nail-clamp-01.jpg", hover: "/assets/hiranix/products/double-nail-clamp-02.jpg" },
  { id: "cctv-camera-box", name: "CCTV Camera Box", base: "/assets/hiranix/products/cctv-camera-box-01-v2.jpg", hover: "/assets/hiranix/products/cctv-camera-box-02-v2.jpg" },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const labelClass =
    product.name.length > 24
      ? styles.labelLong
      : product.name.length > 18
        ? styles.labelMedium
        : "";

  return (
    <article
      className={styles.card}
      data-product={product.id}
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

      <div className={styles.imageStage}>
        <img
          className={styles.productImage}
          src={product.base}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
      </div>

      <Link
        className={styles.cardLink}
        href={`/products/${product.id}`}
        aria-label={`View ${product.name}`}
      />

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

    if (!("IntersectionObserver" in window)) {
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
              Explore the complete HIRANIX range.
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
