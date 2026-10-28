import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CaretRight,
  Check,
  DownloadSimple,
  Phone,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactChapter } from "@/components/home/Chapters";
import { ProductPhotos } from "@/components/products/ProductPhotos";
import { AddToEnquiry } from "@/components/enquiry/AddToEnquiry";
import { ProductBar } from "@/components/products/ProductBar";
import { ProductNav } from "@/components/products/ProductNav";
import { ProductSizes } from "@/components/products/ProductSizes";
import { ProductTile } from "@/components/products/ProductTile";
import { SectionHead } from "@/components/system/SectionHead";
import { Split } from "@/components/system/Split";
import { ProductStory } from "@/components/products/ProductStory";
import { contact, whatsappHref } from "@/data/company";
import {
  CATALOGUE_A11Y_LABEL,
  CATALOGUE_SIZE_LABEL,
  catalogueLinkProps,
} from "@/data/catalogue";
import { findProductBySlug, productRouteSlugs, products } from "@/data/products";
import { categoryHref } from "@/data/systems";
import styles from "@/components/products/ProductDetail.module.css";
import gridStyles from "@/components/products/Products.module.css";

type ProductPageProps = {
  params: Promise<{ productId: string }>;
};

export function generateStaticParams() {
  return productRouteSlugs.map((productId) => ({ productId }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = findProductBySlug(productId);

  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | HIRANIX`,
      description: product.statement,
      url: `/products/${product.slug}`,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = findProductBySlug(productId);
  if (!product) notFound();

  const { technical } = product;
  const sameSystem = products.filter(
    (item) => item.category === product.category && item.slug !== product.slug,
  );
  // Fill up to four with the next products in the range when a system is small.
  const start = products.findIndex((item) => item.slug === product.slug);
  const others = Array.from({ length: products.length - 1 }, (_, i) => products[(start + 1 + i) % products.length])
    .filter((item) => item.category !== product.category);
  const related = [...sameSystem, ...others].slice(0, 4);
  const prev = products[(start - 1 + products.length) % products.length];
  const next = products[(start + 1) % products.length];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [
      `https://hiranix.in${product.image}`,
      `https://hiranix.in${product.alternateImage}`,
    ],
    category: product.category,
    brand: { "@type": "Brand", name: "HIRANIX" },
    url: `https://hiranix.in/products/${product.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <main id="main-content" tabIndex={-1} data-chapters>
        {/* 1. What it is, and how to ask for it. */}
        <section className={styles.top} data-chapter="bone" aria-labelledby="product-title">
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link className="link" href="/products">Products</Link>
            <CaretRight size={12} weight="bold" aria-hidden="true" />
            <Link className="link" href={categoryHref(product.category)}>{product.category}</Link>
            <CaretRight size={12} weight="bold" aria-hidden="true" />
            <span aria-current="page">{product.name}</span>
          </nav>

          <div className={styles.topGrid}>
            <ProductPhotos
              photos={[
                { src: product.image, alt: product.name, label: "Front view" },
                { src: product.alternateImage, alt: `${product.name}, second view`, label: "Second view" },
              ]}
            />

            <div className={styles.summary} data-reveal="rise" style={{ "--i": 1 } as React.CSSProperties}>
              <p className="t-mono">
                <span className="t-accent">{product.index}</span> / {product.category}
              </p>
              <Split as="h1" id="product-title" className={`t-display-l ${styles.title}`}>
                {product.name}
              </Split>
              <p className={styles.statement}>{product.statement}</p>

              <dl className={styles.keyFacts}>
                {product.specs.slice(0, 3).map((spec) => (
                  <div key={spec.label}>
                    <dd>{spec.value}</dd>
                    <dt>{spec.label}</dt>
                  </div>
                ))}
              </dl>

              <div className={styles.buy} id="product-buy">
                <a
                  className="btn btn--primary"
                  href={whatsappHref(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
                  Enquire on WhatsApp
                </a>
                <AddToEnquiry slug={product.slug} name={product.name} />
              </div>
              <a className={`link ${styles.catalogueLink}`} aria-label={CATALOGUE_A11Y_LABEL} {...catalogueLinkProps}>
                <DownloadSimple size={16} weight="bold" aria-hidden="true" />
                Download the catalogue ({CATALOGUE_SIZE_LABEL})
              </a>
              <p className={styles.call}>
                <Phone size={16} weight="bold" aria-hidden="true" />
                Prefer to call?{" "}
                <a className="link" href={contact.phoneHref}>{contact.phone}</a>
              </p>
            </div>
          </div>
        </section>

        <ProductNav
          items={[
            { id: "overview", label: "Overview" },
            { id: "sizes", label: "Sizes and packing" },
            { id: "related", label: "More products" },
          ]}
        />

        {/* 2. What it is for: the product held still while its story scrolls. */}
        <ProductStory product={product} />

        {/* 3. Which size, and an enquiry for exactly that size. */}
        <section id="sizes" className={styles.section} data-chapter="ink" aria-labelledby="sizes-title">
          <SectionHead
            id="sizes-title"
            title="Sizes and packing"
            intro={`${technical.rows.length} ${technical.rows.length === 1 ? "size" : "sizes"} from the HIRANIX catalogue. Choose one to see its pack and weight, then enquire for it.`}
          />
          <ProductSizes
            slug={product.slug}
            name={product.name}
            columns={technical.columns}
            rows={technical.rows}
            carton={technical.carton}
          />
        </section>

        {/* 4. Where to go next. */}
        <section id="related" className={styles.section} data-chapter="bone" aria-labelledby="related-title">
          <SectionHead
            id="related-title"
            title={sameSystem.length ? `More ${product.category.toLowerCase()}` : "More from HIRANIX"}
            action={
              <Link className="link" href="/products">
                View all products
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </Link>
            }
          />
          <ul className={gridStyles.grid}>
            {related.map((item, i) => (
              <ProductTile key={item.slug} product={item} index={i} />
            ))}
          </ul>
          <div className={styles.stepper}>
            <Link className="link" href={`/products/${prev.slug}`}>
              <ArrowLeft size={16} weight="bold" aria-hidden="true" />
              Previous: {prev.name}
            </Link>
            <Link className="link" href={`/products/${next.slug}`}>
              Next: {next.name}
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <ContactChapter />
      </main>
      <ProductBar name={product.name} anchorId="product-buy" />
      <SiteFooter currentPath="/products" />
    </>
  );
}
