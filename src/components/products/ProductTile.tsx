import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "@/components/system/Photo";
import { whatsappHref } from "@/data/company";
import type { HiranixProduct } from "@/data/products";
import styles from "./Products.module.css";

/** One product in a grid: photo, system, name, one line, and two ways on. */
export function ProductTile({
  product,
  index = 0,
  heading: Heading = "h3",
}: {
  product: HiranixProduct;
  index?: number;
  heading?: "h2" | "h3";
}) {
  return (
    <li className={styles.item} data-zoom style={{ "--i": Math.min(index, 7) } as CSSProperties}>
      <Link className={`frame ${styles.photo}`} href={`/products/${product.slug}`} tabIndex={-1} aria-hidden="true">
        <Photo
          src={product.image}
          alt=""
          width={1122}
          height={1402}
          sizes="(max-width: 560px) 46vw, (max-width: 900px) 46vw, (max-width: 1200px) 31vw, 23vw"
          priority={index < 2}
        />
        {/* The second view of the product, shown on hover. */}
        {product.alternateImage !== product.image && (
          <Photo
            className={styles.photoAlt}
            src={product.alternateImage}
            alt=""
            width={1122}
            height={1402}
            sizes="(max-width: 900px) 1px, (max-width: 1200px) 31vw, 23vw"
          />
        )}
        <span className={styles.view} aria-hidden="true">View</span>
      </Link>
      <p className={`t-mono ${styles.meta}`}>
        <span className="t-accent">{product.index}</span>
        <span>{product.category}</span>
      </p>
      <Heading className={styles.name}>
        <Link href={`/products/${product.slug}`}>{product.name}</Link>
      </Heading>
      <p className={styles.statement}>{product.statement}</p>
      <div className={styles.actions}>
        <Link className="link" href={`/products/${product.slug}`}>
          <span className={styles.moreLong}>Sizes and details</span>
          <span className={styles.moreShort}>Details</span>
          <ArrowRight size={15} weight="bold" aria-hidden="true" />
        </Link>
        <a
          className={styles.enquire}
          href={whatsappHref(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire on WhatsApp about ${product.name}`}
        >
          <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
        </a>
      </div>
    </li>
  );
}
