import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ProductGallery } from "@/components/ProductGallery";
import RevealOnScroll from "@/components/RevealOnScroll";
import { SiteFooter } from "@/components/SiteFooter";
import { findProductBySlug, productRouteSlugs, products } from "@/data/products";
import styles from "./ProductDetail.module.css";

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
  const resolvedProduct = findProductBySlug(productId);
  const productIndex = products.findIndex((item) => item.slug === resolvedProduct?.slug);

  if (productIndex === -1) notFound();

  const product = products[productIndex];
  const nextProduct = products[(productIndex + 1) % products.length];
  const technical = product.technical;
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
      <main id="main-content" tabIndex={-1} className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className={styles.utility}>
        <Link href="/products">
          <ArrowLeft size={16} weight="bold" aria-hidden="true" />
          All products
        </Link>
        <span>{product.category}</span>
      </div>

      <section className={styles.hero}>
        <div className={styles.media}>
          <ProductGallery
            productName={product.name}
            images={[
              { src: product.image, alt: product.name },
              { src: product.alternateImage, alt: `${product.name}, alternate view` },
            ]}
          />
        </div>

        <div className={styles.intro}>
          <span className={styles.eyebrow}>{product.category}</span>
          <h1>{product.name}</h1>
          <p className={styles.statement}>{product.statement}</p>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.actions}>
            <a
              href={`mailto:contact@hiranix.in?subject=${encodeURIComponent(
                `Product enquiry: ${product.name}`,
              )}`}
            >
              Enquire about this product
              <ArrowRight size={17} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className={styles.useCases} data-reveal>
        <div>
          <span>Applications</span>
          <ul>
            {product.applications.map((application) => (
              <li key={application}>{application}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.tableSection} aria-labelledby="selection-data" data-reveal>
        <div className={styles.sectionHeading}>
          <span>Selection guide</span>
          <h2 id="selection-data">Technical data</h2>
        </div>
        <dl className={styles.specList}>
          {product.specs.map((spec) => (
            <div key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                {technical.columns.map((column) => (
                  <th key={column} scope="col">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {technical.rows.map((row) => (
                <tr key={row.join("-")}>
                  {row.map((value, index) => (
                    <td key={`${value}-${index}`}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {technical.carton && (
          <p className={styles.dataNote}>Master carton (L x B x H): {technical.carton}</p>
        )}
        <p className={styles.dataNote}>
          Catalogue weights may vary slightly. Confirm critical specifications with HIRANIX before purchase.
        </p>
      </section>

      <Link className={styles.nextProduct} data-reveal href={`/products/${nextProduct.slug}`}>
        <span>Next product</span>
        <strong>{nextProduct.name}</strong>
        <ArrowRight size={34} weight="light" aria-hidden="true" />
      </Link>
      </main>
      <RevealOnScroll />
      <SiteFooter currentPath="/products" />
    </>
  );
}
