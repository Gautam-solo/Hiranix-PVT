"use client";

import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/MagnifyingGlass";
import { WhatsappLogo } from "@phosphor-icons/react/WhatsappLogo";
import { X } from "@phosphor-icons/react/X";
import { whatsappHref } from "@/data/company";
import { products, productCategories } from "@/data/products";
import { ProductTile } from "@/components/products/ProductTile";
import { Split } from "@/components/system/Split";
import styles from "./Products.module.css";

type Filter = (typeof productCategories)[number];

/**
 * The whole range on one page: pick a system or search, then open a product
 * or enquire straight from its tile.
 */
export function ProductsIndex() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  // Home links straight into a system with ?category=…, read after hydration.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const requested = new URLSearchParams(window.location.search).get("category");
      const match = productCategories.find((item) => item === requested);
      if (match) setFilter(match);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      if (filter !== "All" && product.category !== filter) return false;
      if (!q) return true;
      return [product.name, product.category, product.statement, ...product.applications]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [filter, query]);

  const countFor = (item: Filter) =>
    item === "All" ? products.length : products.filter((product) => product.category === item).length;

  return (
    <>
      <section className={styles.top} data-chapter="ink" aria-labelledby="products-title">
        <div className="hx-index">
          <p className="t-mono">(Index) The HIRANIX range</p>
          <p className="t-mono">
            {productCategories.length - 1} systems / {products.length} products
          </p>
        </div>
        <Split as="h1" id="products-title" atf className={`t-mega ${styles.title}`}>
          Products
        </Split>
        <div className={styles.head}>
          <p className="t-tagline" data-reveal="rise" data-atf="">
            World&rsquo;s largest manufacturer of cable nail clips
          </p>

          <div className={styles.search} data-reveal="rise" data-atf="" style={{ "--i": 1 } as React.CSSProperties}>
            <label htmlFor="product-search" className="t-mono">Search the range</label>
            <div className={styles.searchField}>
              <MagnifyingGlass size={20} weight="bold" aria-hidden="true" />
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Clip, junction box, nail"
                autoComplete="off"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                  <X size={18} weight="bold" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.page} data-chapter="bone" aria-label="Product list">
      <div className={styles.bar}>
        <div className={styles.tabs} role="group" aria-label="Filter by system">
          {productCategories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item === "All" ? "All products" : item}
              <span>{countFor(item)}</span>
            </button>
          ))}
        </div>
        <p className={styles.count} aria-live="polite">
          Showing {visible.length} of {products.length}
        </p>
      </div>

      {visible.length > 0 ? (
        <ul className={styles.grid} key={`${filter}-${query}`}>
          {visible.map((product, i) => (
            <ProductTile key={product.slug} product={product} index={i} heading="h2" />
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <p className="t-heading">Nothing matches &ldquo;{query}&rdquo;.</p>
          <p className="t-body">Try a product name such as clip, box or tape, or ask the sales team.</p>
          <div className={styles.emptyActions}>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
            >
              Show all products
            </button>
            <a className="btn btn--primary" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      )}
      </section>
    </>
  );
}
