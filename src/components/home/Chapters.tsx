import type { CSSProperties } from "react";
import { ArrowUpRight, DownloadSimple, EnvelopeSimple, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "@/components/system/Photo";
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

/** Who HIRANIX is, in one sentence you read into focus, and the figures behind it. */
export function IntroChapter() {
  const facts = [
    { value: 15, suffix: "+", label: "Years of manufacturing" },
    { value: 5, label: "Product systems" },
    { value: products.length, label: "Products in the range" },
    { text: "Worldwide", label: "Deliveries" },
  ];

  return (
    <section className={styles.intro} data-chapter="bone" aria-labelledby="intro-title">
      <div className="hx-index">
        <p className="t-mono">(01) HIRANIX</p>
        <p className="t-mono">Mehmedabad, Gujarat, India</p>
      </div>

      <h2 id="intro-title" className="sr-only">About HIRANIX</h2>
      <Split as="p" mode="fill" className={`t-statement ${styles.statement}`}>
        We make the small parts every electrical installation depends on. Cable clips, boxes,
        nails and clamps, made in our own factory and trusted on sites across India and overseas.
      </Split>

      <div className={styles.introGrid}>
        <figure className={styles.introPhoto}>
          <span className="frame" data-parallax="0.1" data-reveal="unveil">
            <Photo
              src="/assets/hiranix/factory/wire-forming-floor.jpg"
              alt="Wire forming machines on the HIRANIX production floor"
              width={1086}
              height={1448}
              sizes="(max-width: 900px) 92vw, 40vw"
            />
          </span>
          <figcaption className="t-mono">Wire forming floor, Mehmedabad</figcaption>
        </figure>

        <dl className={styles.facts}>
          {facts.map((fact, i) => (
            <div key={fact.label} data-reveal="rise" style={order(i)}>
              <dd className={"text" in fact ? styles.factWord : undefined}>
                {"text" in fact ? (
                  fact.text
                ) : (
                  <>
                    <span data-count={fact.value}>{fact.value}</span>
                    {fact.suffix && <span className="t-accent">{fact.suffix}</span>}
                  </>
                )}
              </dd>
              <dt className="t-mono">{fact.label}</dt>
            </div>
          ))}
        </dl>
      </div>
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
