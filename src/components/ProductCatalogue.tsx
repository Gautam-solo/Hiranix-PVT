"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MagnifyingGlass, X } from "@phosphor-icons/react";
import { productCategories, products } from "@/data/products";
import styles from "./ProductCatalogue.module.css";

type ActiveCategory = (typeof productCategories)[number];

export default function ProductCatalogue() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ActiveCategory>("All");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const searchableContent = [
        product.name,
        product.category,
        product.statement,
        product.description,
        ...product.applications,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableContent.includes(normalizedQuery);
    });
  }, [category, query]);

  const resetDiscovery = () => {
    setQuery("");
    setCategory("All");
  };

  const isFiltered = query.trim().length > 0 || category !== "All";

  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <section className={styles.discovery} aria-labelledby="products-title">
        <div className={styles.discoveryCopy}>
          <h1 id="products-title">Our Products</h1>
        </div>

        <div className={styles.searchBlock}>
          <label htmlFor="product-search">Search the range</label>
          <div className={styles.searchField}>
            <MagnifyingGlass size={21} weight="bold" aria-hidden="true" />
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Product name or category"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear product search"
              >
                <X size={18} weight="bold" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className={styles.filterBar} aria-label="Filter products by type">
        <div className={styles.filterScroll}>
          {productCategories.map((item) => {
            const count =
              item === "All"
                ? products.length
                : products.filter((product) => product.category === item).length;

            return (
              <button
                type="button"
                key={item}
                className={category === item ? styles.activeFilter : undefined}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                <span>{item}</span>
                <small>{count}</small>
              </button>
            );
          })}
        </div>

        <div className={styles.resultStatus} aria-live="polite">
          <span>
            <strong>{visibleProducts.length}</strong>{" "}
            {visibleProducts.length === 1 ? "product" : "products"}
          </span>
          {isFiltered && (
            <button type="button" onClick={resetDiscovery}>
              Reset
            </button>
          )}
        </div>
      </section>

      {visibleProducts.length > 0 ? (
        <section className={styles.grid} aria-label="HIRANIX product catalogue">
          {visibleProducts.map((product) => (
            <article className={styles.card} key={product.slug}>
              <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
                <div className={styles.imageStage}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  />
                  <Image
                    className={styles.alternateImage}
                    src={product.alternateImage}
                    alt=""
                    fill
                    sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    aria-hidden="true"
                  />
                </div>
                <div className={styles.cardCopy}>
                  <span>{product.category}</span>
                  <h2>{product.name}</h2>
                  <p>{product.statement}</p>
                  <strong>
                    View Product
                    <ArrowRight size={17} weight="bold" aria-hidden="true" />
                  </strong>
                </div>
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className={styles.emptyState}>
          <h2>No matching products.</h2>
          <p>Try another product name or return to the complete range.</p>
          <button type="button" onClick={resetDiscovery}>
            View all products
          </button>
        </section>
      )}

      <section className={styles.support}>
        <span>Need help selecting a product?</span>
        <a href="mailto:contact@hiranix.in">Talk to HIRANIX sales</a>
      </section>
    </main>
  );
}
