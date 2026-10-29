import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, DownloadSimple, EnvelopeSimple, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Split } from "@/components/system/Split";
import { FactoryMap } from "@/components/system/FactoryMap";
import { BrandsList } from "@/components/home/BrandsList";
import { contact, whatsappHref } from "@/data/company";
import { products } from "@/data/products";
import {
  CATALOGUE_A11Y_LABEL,
  CATALOGUE_SIZE_LABEL,
  catalogueLinkProps,
} from "@/data/catalogue";
import styles from "./Home.module.css";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * The company's line, set huge and drifting against the scroll, then fifteen
 * years of making things, with the factory floor showing through the numerals.
 */
export function IntroChapter() {
  const facts = [
    { value: 5, label: "Product systems" },
    { value: products.length, label: "Products in the range" },
    { text: "Worldwide", label: "Deliveries from one factory" },
  ];
  const floor = encodeURIComponent("/assets/hiranix/factory/wire-forming-floor.jpg");

  return (
    <section className={styles.intro} data-chapter="bone" aria-labelledby="intro-title">
      <div className="hx-index">
        <p className="t-mono">(01) HIRANIX</p>
        <p className="t-mono">Mehmedabad, Gujarat, India</p>
      </div>

      <h2 id="intro-title" className={styles.tagline}>
        <span className={styles.tagLine} data-drift="1">
          <Split as="span" className={styles.tagThin}>The perfect</Split>
        </span>
        <span className={`${styles.tagLine} ${styles.tagMid}`} data-drift="-1">
          <Split as="span" delay={120}>choice for</Split>
        </span>
        <span className={`${styles.tagLine} ${styles.tagGreen}`} data-drift="1">
          <span className={styles.mark} data-rule aria-hidden="true" />
          <Split as="span" delay={240}>every fix.</Split>
        </span>
      </h2>

      <div className={styles.experience}>
        <div className={styles.expNumberWrap} data-reveal="rise">
          <p
            className={styles.expNumber}
            data-bgpan
            style={{
              backgroundImage: `linear-gradient(rgba(5, 6, 5, 0.14), rgba(5, 6, 5, 0.14)), url(/_vinext/image?url=${floor}&w=1200&q=75)`,
            }}
          >
            <span data-count="15">15</span>+
          </p>
          <span className={styles.expRule} data-rule aria-hidden="true" />
          <p className={`t-mono ${styles.expLabel}`}>Years of manufacturing</p>
        </div>

        <div className={styles.expText}>
          <Split as="p" mode="fill" className={`t-statement ${styles.statement}`}>
            We make the small parts every electrical installation depends on. Cable clips, boxes,
            nails and clamps, made in our own factory and trusted on sites across India and
            overseas.
          </Split>
          <p className={`t-mono ${styles.expKinds}`} data-reveal="rise">
            Cable clips / Boxes / Nails / Clamps
          </p>
          <Link className="link" href="/products" data-reveal="rise" style={order(1)}>
            Explore the range
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <dl className={styles.facts}>
        {facts.map((fact, i) => (
          <div key={fact.label} data-reveal="rise" style={order(i)}>
            <dd className={"text" in fact ? styles.factWord : undefined}>
              {"text" in fact ? fact.text : <span data-count={fact.value}>{fact.value}</span>}
            </dd>
            <dt className="t-mono">{fact.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Three brands from one house. */
export function BrandsChapter() {
  return (
    <section id="brands" className={styles.brands} data-chapter="bone" aria-labelledby="brands-title">
      <div className="hx-index">
        <p className="t-mono">(04) Our brands</p>
        <p className="t-mono">One house, three names</p>
      </div>
      <div className={styles.brandsHead}>
        <Split id="brands-title" className="t-display-xl">
          Our <span className="t-thin">brands</span>
        </Split>
        <p className="t-body" data-reveal="rise">
          Tejas Craft, Hi-Tech Square and Essemark are part of the HIRANIX portfolio.
        </p>
      </div>
      <BrandsList />
    </section>
  );
}

/** Every page ends here: how to reach the sales team. */
export function ContactChapter({ index = "(05)" }: { index?: string }) {
  return (
    <section className={styles.contact} data-chapter="green" aria-labelledby="contact-title">
      <div className="hx-index">
        <p className="t-mono">{index} Contact</p>
        <p className="t-mono">Sales team, Mehmedabad</p>
      </div>

      <Split id="contact-title" className={`t-mega ${styles.contactTitle}`}>
        Let&rsquo;s talk
        <br />
        <span className="t-thin">about your</span> order
      </Split>

      <div className={styles.contactBody}>
        <div className={styles.contactLead} data-reveal="rise">
          <p className={styles.contactNote}>
            Send the product, size and quantity. The sales team replies with availability and price.
          </p>
          <div className={styles.contactActions}>
            <a className="btn btn--primary" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
              Enquire on WhatsApp
            </a>
            <a className="btn" aria-label={CATALOGUE_A11Y_LABEL} {...catalogueLinkProps}>
              <DownloadSimple size={16} weight="bold" aria-hidden="true" />
              Catalogue ({CATALOGUE_SIZE_LABEL})
            </a>
          </div>

          <dl className={styles.contactList}>
            <div>
              <dt className="t-mono">Phone</dt>
              <dd>
                <a href={contact.phoneHref}>
                  <Phone size={18} weight="bold" aria-hidden="true" />
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="t-mono">Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>
                  <EnvelopeSimple size={18} weight="bold" aria-hidden="true" />
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="t-mono">Factory</dt>
              <dd>
                <span className={styles.address}>{contact.address}</span>
                <a className="link" href={contact.mapHref} target="_blank" rel="noopener noreferrer">
                  Get directions
                  <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className={styles.contactMap} data-reveal="rise" style={order(1)}>
          <FactoryMap />
        </div>
      </div>
    </section>
  );
}
