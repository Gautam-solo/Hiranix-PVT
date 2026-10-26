import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, DownloadSimple, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "@/components/system/Photo";
import { SectionHead } from "@/components/system/SectionHead";
import { FactoryStrip } from "@/components/home/FactoryStrip";
import { FactoryMap } from "@/components/system/FactoryMap";
import { brands, contact, whatsappHref } from "@/data/company";
import { products } from "@/data/products";
import { categoryHref, productsIn, systems } from "@/data/systems";
import {
  CATALOGUE_A11Y_LABEL,
  CATALOGUE_SIZE_LABEL,
  catalogueLinkProps,
} from "@/data/catalogue";
import styles from "./Home.module.css";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** The range, as five systems you can open. */
export function ProductsChapter() {
  return (
    <section className={styles.section} data-chapter="ink" aria-labelledby="products-title">
      <SectionHead
        id="products-title"
        title="Our products"
        intro={<span className="t-tagline">World&rsquo;s largest manufacturer of cable nail clips</span>}
        action={
          <Link className="link" href="/products">
            View all products
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        }
      />
      <ul className={styles.systems}>
        {systems.map((system, i) => {
          const count = productsIn(system.category).length;
          return (
            <li key={system.category}>
              <Link className={styles.system} href={categoryHref(system.category)}>
                <span className={`frame ${styles.systemPhoto}`} data-reveal="unveil" style={order(i)}>
                  <Photo
                    src={system.image}
                    alt=""
                    width={1122}
                    height={1402}
                    sizes="(max-width: 640px) 62vw, (max-width: 1100px) 31vw, 18vw"
                  />
                </span>
                <span className={styles.systemName}>{system.category}</span>
                <span className={styles.systemMeta}>
                  {count} {count === 1 ? "product" : "products"}
                  <ArrowRight size={15} weight="bold" aria-hidden="true" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** The one claim, the figures behind it, the floor it comes from. */
export function ProofChapter() {
  const facts = [
    { value: 15, suffix: "+", label: "Years of manufacturing" },
    { value: 5, label: "Product systems" },
    { value: products.length, label: "Products in the range" },
    { text: "Worldwide", label: "Deliveries" },
  ];

  return (
    <section className={styles.section} data-chapter="forest" aria-labelledby="proof-title">
      <SectionHead
        id="proof-title"
        title={
          <>
            World&rsquo;s largest maker of <span className="t-accent">cable nail clips</span>
          </>
        }
        intro="Fifteen years of manufacturing in Mehmedabad, Gujarat, supplying customers across India and overseas."
      />
      <dl className={styles.facts}>
        {facts.map((fact, i) => (
          <div key={fact.label} data-reveal="rise" style={order(i)}>
            <dt>{fact.label}</dt>
            <dd>
              {"text" in fact ? (
                fact.text
              ) : (
                <>
                  <span data-count={fact.value}>{fact.value}</span>
                  {fact.suffix}
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <FactoryStrip />
    </section>
  );
}

/** Three brands of equal weight from one house. */
export function BrandsChapter() {
  return (
    <section id="brands" className={styles.section} data-chapter="sage" aria-labelledby="brands-title">
      <SectionHead
        id="brands-title"
        title="Our brands"
        intro="Tejas Craft, Hi-Tech Square and Essemark are part of the HIRANIX portfolio."
      />
      <ul className={styles.brands}>
        {brands.map((brand, i) => (
          <li key={brand.name} data-zoom>
            <span className={`frame ${styles.brandLogo}`} data-reveal="unveil" style={order(i)}>
              <Photo
                src={brand.image}
                alt={`${brand.name} logo`}
                width={1280}
                height={1280}
                sizes="(max-width: 900px) 112px, 30vw"
              />
            </span>
            <h3 className="t-heading">{brand.name}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Every page ends here: how to reach the sales team. */
export function ContactChapter() {
  return (
    <section className={styles.section} data-chapter="ink" aria-labelledby="contact-title">
      <div className={styles.contact}>
        <div className={styles.contactInfo}>
          <div className={styles.contactLead} data-reveal="rise">
            <h2 id="contact-title" className="t-display-m">Contact</h2>
            <p className="t-body">
              Send the product, size and quantity. The sales team replies with availability and price.
            </p>
            <div className={styles.contactActions}>
              <a className="btn btn--primary" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
                Enquire on WhatsApp
              </a>
              <a className="btn" aria-label={CATALOGUE_A11Y_LABEL} {...catalogueLinkProps}>
                <DownloadSimple size={16} weight="bold" aria-hidden="true" />
                Download catalogue ({CATALOGUE_SIZE_LABEL})
              </a>
            </div>
          </div>

          <dl className={styles.contactList} data-reveal="rise" style={order(1)}>
            <div>
              <dt>Phone</dt>
              <dd>
                <a className="link" href={contact.phoneHref}>{contact.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a className="link" href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>Factory</dt>
              <dd>
                <span>{contact.address}</span>
                <a className="link" href={contact.mapHref} target="_blank" rel="noopener noreferrer">
                  Get directions
                  <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className={styles.contactMap} data-reveal="rise" style={order(2)}>
          <FactoryMap />
        </div>
      </div>
    </section>
  );
}
