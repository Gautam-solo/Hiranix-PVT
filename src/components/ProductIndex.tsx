"use client";

/* eslint-disable @next/next/no-img-element -- the catalogue uses paired editorial product photographs */

import {
  ArrowLeft,
  CaretDown,
  DownloadSimple,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  MagnifyingGlass,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { HiranixLogo } from "@/components/HiranixLogo";
import {
  productCategories,
  products,
  type HiranixProduct,
  type ProductCategory,
} from "@/data/products";
import styles from "./ProductIndex.module.css";

type ActiveCategory = "All" | ProductCategory;
type SortMode = "catalogue" | "name" | "category";

const sortLabels: Record<SortMode, string> = {
  catalogue: "Catalogue order",
  name: "Name / A–Z",
  category: "Product family",
};

function Brand() {
  return (
    <span className={styles.brand} aria-label="HIRANIX">
      <HiranixLogo className={styles.brandImage} />
    </span>
  );
}

function ProductCard({
  product,
  onOpen,
}: {
  product: HiranixProduct;
  onOpen: (product: HiranixProduct) => void;
}) {
  return (
    <article className={styles.card} id={product.slug}>
      <button
        type="button"
        className={styles.cardButton}
        onClick={() => onOpen(product)}
        aria-label={`View ${product.name} specifications`}
      >
        <span className={styles.imageStage}>
          <img
            className={styles.primaryImage}
            src={product.image}
            alt={`${product.name}, primary view`}
            loading="lazy"
          />
          <img
            className={styles.alternateImage}
            src={product.alternateImage}
            alt=""
            loading="lazy"
            aria-hidden="true"
          />
        </span>

        <span className={styles.cardCopy}>
          <strong>{product.name}</strong>
          <span>{product.category}</span>
        </span>
      </button>
    </article>
  );
}

function DetailPanel({
  product,
  onClose,
}: {
  product: HiranixProduct;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const technical = product.technical;

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div className={styles.detailLayer} role="presentation" onMouseDown={onClose}>
      <section
        className={styles.detailPanel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.detailHeader}>
          <button ref={closeRef} type="button" onClick={onClose}>
            <ArrowLeft aria-hidden="true" />
            Back to all products
          </button>
          <span>HIRANIX / {product.category}</span>
        </header>

        <div className={styles.detailHero}>
          <div className={styles.detailImages}>
            <figure>
              <img src={product.image} alt={`${product.name}, primary view`} />
            </figure>
            <figure>
              <img src={product.alternateImage} alt={`${product.name}, alternate view`} />
            </figure>
          </div>
          <div className={styles.detailIntro}>
            <span>{product.category}</span>
            <h2 id="product-detail-title">{product.name}</h2>
            <p className={styles.statement}>{product.statement}</p>
            <p>{product.description}</p>
            <div className={styles.detailActions}>
              <a
                href={`mailto:contact@hiranix.in?subject=${encodeURIComponent(`Product enquiry: ${product.name}`)}`}
              >
                Enquire
                <EnvelopeSimple aria-hidden="true" />
              </a>
              <a href="/Hiranix-Product-Catalogue.pdf" download="Hiranix-Product-Catalogue.pdf">
                Catalogue
                <DownloadSimple aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.detailContent}>
          <section className={styles.specStrip} aria-label={`${product.name} key specifications`}>
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <span>{spec.label}</span>
                <strong>{spec.value}</strong>
              </div>
            ))}
          </section>

          <div className={styles.useGrid}>
            <section>
              <h3>Typical applications</h3>
              <ul>
                {product.applications.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
            <section>
              <h3>Product features</h3>
              <ul>
                {product.features.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          </div>

          <section className={styles.technical}>
            <div className={styles.technicalTitle}>
              <h3>Technical data</h3>
              <span>Verified from HIRANIX catalogue</span>
            </div>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    {technical.columns.map((column) => <th scope="col" key={column}>{column}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {technical.rows.map((row) => (
                    <tr key={`${product.slug}-${row.join("-")}`}>
                      {row.map((value, index) => index === 0 ? (
                        <th scope="row" key={`${value}-${index}`}>{value}</th>
                      ) : (
                        <td key={`${value}-${index}`}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {technical.carton && (
              <p>Master carton (L x B x H): {technical.carton}</p>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}

export default function ProductIndex() {
  const [category, setCategory] = useState<ActiveCategory>("All");
  const [sortMode, setSortMode] = useState<SortMode>("catalogue");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<HiranixProduct | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.category} ${product.statement}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sortMode === "name") return a.name.localeCompare(b.name);
      if (sortMode === "category") {
        return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
      }
      return Number(a.index) - Number(b.index);
    });
  }, [category, query, sortMode]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const overlayOpen = Boolean(selectedProduct) || menuOpen;
    document.body.style.overflow = overlayOpen ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSelectedProduct(null);
      setMenuOpen(false);
      setFiltersOpen(false);
      setSortOpen(false);
      setSearchOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProduct, menuOpen]);

  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <header className={styles.header}>
        <button className={styles.menuTrigger} type="button" onClick={() => setMenuOpen(true)}>
          Menu
        </button>
        <Link href="/" className={styles.brandLink}><Brand /></Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/#products">Products</Link>
          <Link href="/#factory-title">Brand</Link>
          <Link href="/#story-gallery-heading">About</Link>
        </nav>
        <div className={styles.headerActions}>
          <button className={styles.searchTrigger}
            type="button"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((open) => !open)}
          >
            <MagnifyingGlass size={17} aria-hidden="true" />
            <span>Search</span>
          </button>
          <a href="/Hiranix-Product-Catalogue.pdf" download="Hiranix-Product-Catalogue.pdf">
            <span>Download catalogue</span>
            <DownloadSimple size={17} aria-hidden="true" />
          </a>
        </div>
      </header>

      {searchOpen && (
        <div className={styles.searchBar}>
          <MagnifyingGlass aria-hidden="true" />
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products or categories"
            aria-label="Search HIRANIX products"
          />
          <button type="button" onClick={() => { setQuery(""); setSearchOpen(false); }} aria-label="Close search">
            <X aria-hidden="true" />
          </button>
        </div>
      )}

      <section className={styles.catalogueIntro} aria-labelledby="products-title">
        <div>
          <span className={styles.eyebrow}>Complete HIRANIX range</span>
          <h1 id="products-title">Product <em>List</em></h1>
        </div>
        <p>
          Explore the complete HIRANIX range from two product angles. Tap and hold
          any image to reveal its alternate angle.
        </p>
      </section>

      <section className={styles.toolbar} aria-label="Product filters and sorting">
        <div className={styles.controlCell}>
          <button
            type="button"
            aria-expanded={filtersOpen}
            onClick={() => { setFiltersOpen((open) => !open); setSortOpen(false); }}
          >
            Filters
            {category !== "All" && <span className={styles.activeDot} aria-label={`Active filter: ${category}`} />}
            <CaretDown aria-hidden="true" />
          </button>
          {filtersOpen && (
            <div className={styles.dropdown}>
              {productCategories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={category === item ? styles.selectedOption : undefined}
                  onClick={() => { setCategory(item); setFiltersOpen(false); }}
                >
                  {item}
                  <span>{item === "All" ? products.length : products.filter((product) => product.category === item).length}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className={styles.controlCell}>
          <button
            type="button"
            aria-expanded={sortOpen}
            onClick={() => { setSortOpen((open) => !open); setFiltersOpen(false); }}
          >
            Sort by / {sortLabels[sortMode]}
            <CaretDown aria-hidden="true" />
          </button>
          {sortOpen && (
            <div className={`${styles.dropdown} ${styles.sortDropdown}`}>
              {(Object.keys(sortLabels) as SortMode[]).map((item) => (
                <button
                  type="button"
                  key={item}
                  className={sortMode === item ? styles.selectedOption : undefined}
                  onClick={() => { setSortMode(item); setSortOpen(false); }}
                >
                  {sortLabels[item]}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {visibleProducts.length > 0 ? (
        <section className={styles.productGrid} aria-live="polite">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} onOpen={setSelectedProduct} />
          ))}
        </section>
      ) : (
        <section className={styles.emptyState}>
          <span>0 results</span>
          <h2>No products found.</h2>
          <button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>
            Reset search and filters
          </button>
        </section>
      )}

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerIdentity}>
            <img
              src="/assets/hiranix/footer-wordmark.png"
              alt="HIRANIX — The Perfect Choice for Every Fix"
              width="820"
              height="275"
            />
            <div className={styles.socialLinks} aria-label="Hiranix social media">
              <a href="https://www.facebook.com/people/Hiranix/61581637497185/" target="_blank" rel="noreferrer" aria-label="Hiranix on Facebook">
                <FacebookLogo weight="fill" aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/hiranix.in/" target="_blank" rel="noreferrer" aria-label="Hiranix on Instagram">
                <InstagramLogo aria-hidden="true" />
              </a>
              <a href="https://www.whatsapp.com/channel/0029VbC3XSB4Y9lsPFDFp028" target="_blank" rel="noreferrer" aria-label="Hiranix WhatsApp channel">
                <WhatsappLogo aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className={styles.footerContact}>
            <div>
              <span>Address :</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=198%2C%20Abhishree%20Estate%2C%20Odhav%2C%20Ahmedabad%20382415"
                target="_blank"
                rel="noreferrer"
              >
                198, Abhishree Estate,<br />
                Odhav, Ahmedabad - 382415
              </a>
            </div>
            <div>
              <span>Contact Number :</span>
              <a href="tel:+917984462764">+91 79844 62764</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <nav aria-label="Legal links">
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
            <Link href="/legal/terms-conditions">Terms &amp; Conditions</Link>
          </nav>
          <p>Copyright © 2026 Hiranix India Private Limited</p>
          <a
            className={styles.whatsappButton}
            href="https://wa.me/917984462764"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with Hiranix on WhatsApp"
          >
            <WhatsappLogo weight="fill" aria-hidden="true" />
          </a>
        </div>
      </footer>

      {menuOpen && (
        <div className={styles.menuLayer} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <header>
            <Brand />
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X aria-hidden="true" />
            </button>
          </header>
          <nav>
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/#products" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link href="/#factory-title" onClick={() => setMenuOpen(false)}>Brand</Link>
            <Link href="/#story-gallery-heading" onClick={() => setMenuOpen(false)}>About</Link>
          </nav>
          <a href="/Hiranix-Product-Catalogue.pdf" download="Hiranix-Product-Catalogue.pdf">
            Download product catalogue
            <DownloadSimple aria-hidden="true" />
          </a>
        </div>
      )}

      {selectedProduct && (
        <DetailPanel product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </main>
  );
}
