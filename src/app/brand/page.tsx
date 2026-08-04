import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { BrandImage } from "@/components/ui/brand-image";
import styles from "./BrandPage.module.css";

export const metadata: Metadata = {
  title: "Our Brands",
  description:
    "Meet Tejas Craft, Hi-Tech Square and Essemark, three distinct brands in the HIRANIX electrical and hardware portfolio.",
  alternates: { canonical: "/brand" },
};

const brands = [
  {
    name: "Tejas Craft",
    image: "/assets/hiranix/brands/tejas-craft.jpg",
    alt: "Tejas Craft brand logo",
    copy: "Traditional craftsmanship paired with dependable performance for professionals and builders.",
  },
  {
    name: "Hi-Tech Square",
    image: "/assets/hiranix/brands/hi-tech-square.jpg",
    alt: "Hi-Tech Square brand logo",
    copy: "Modern electrical thinking developed for connected, contemporary spaces.",
  },
  {
    name: "Essemark",
    image: "/assets/hiranix/brands/essemark.jpg",
    alt: "Essemark brand logo",
    copy: "A focused identity within the wider HIRANIX electrical and hardware portfolio.",
  },
];

export default function BrandPage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <section className={styles.portfolio} aria-labelledby="portfolio-title">
        <header className={styles.portfolioIntro}>
          <h1 id="portfolio-title">One house. Three perspectives.</h1>
          <p>
            Together, Tejas Craft, Hi-Tech Square and Essemark support homes,
            industry and infrastructure with practical electrical and hardware
            solutions.
          </p>
        </header>

        <div className={styles.brandGrid}>
          {brands.map((brand) => (
            <article className={styles.brandCard} key={brand.name}>
              <BrandImage
                src={brand.image}
                alt={brand.alt}
                sizes="(max-width: 900px) 78vw, 33vw"
              />
              <div className={styles.brandDetails}>
                <h3>{brand.name}</h3>
                <p>{brand.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <p>Built to work together</p>
        <h2 id="closing-title">
          Different identities.
          <br />
          One dependable portfolio.
        </h2>
        <Link href="/products" className={styles.cta}>
          Explore HIRANIX products
          <ArrowRight size={22} weight="bold" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
