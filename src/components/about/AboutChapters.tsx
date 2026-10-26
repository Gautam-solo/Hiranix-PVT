import type { CSSProperties } from "react";
import { AppleLogo, GooglePlayLogo } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "@/components/system/Photo";
import { SectionHead } from "@/components/system/SectionHead";
import { factory } from "@/data/company";
import styles from "./About.module.css";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** Who we are, beside the floor it happens on. */
export function AboutIntro() {
  return (
    <section className={styles.intro} data-chapter="ink" aria-labelledby="about-title">
      <div className={styles.introText} data-reveal="rise">
        <p className="t-label">About HIRANIX</p>
        <h1 id="about-title" className="t-display-l">
          Engineered <span className="t-accent">for every fix.</span>
        </h1>
        <p className="t-body">
          Hiranix India Private Limited brings the electrical and installation products every
          site uses into one clear range, so electricians, contractors and dealers can select
          and source with confidence.
        </p>
        <p className="t-body">
          Everything is made in our own factory in Mehmedabad, Gujarat, and supplied to
          customers across India and overseas.
        </p>
      </div>
      <figure className={styles.introPhoto}>
        <span className="frame" data-reveal="unveil" style={order(1)}>
          <Photo
            src="/assets/hiranix/factory/injection-moulding-floor.jpg"
            alt="HIRANIX injection moulding production floor in Mehmedabad"
            width={1086}
            height={1448}
            sizes="(max-width: 900px) 92vw, 42vw"
            priority
          />
        </span>
        <figcaption>The injection moulding floor, Mehmedabad.</figcaption>
      </figure>
    </section>
  );
}

const figures = [
  {
    value: "World's largest",
    label: "Manufacturer of cable nail clips",
    copy: "Made at volume on our own production lines.",
  },
  {
    value: "15+ years",
    label: "Of experience",
    copy: "Making and supplying electrical and installation products.",
  },
  {
    value: "Worldwide",
    label: "Deliveries",
    copy: "Factory-direct supply across India and overseas.",
  },
];

/** Three facts, side by side. */
export function AboutScale() {
  return (
    <section className={styles.section} data-chapter="forest" aria-labelledby="scale-title">
      <h2 id="scale-title" className="sr-only">HIRANIX in figures</h2>
      <ul className={styles.figures}>
        {figures.map((figure, i) => (
          <li key={figure.label} data-reveal="rise" style={order(i)}>
            <p className={styles.figureValue}>{figure.value}</p>
            <h3>{figure.label}</h3>
            <p className="t-body">{figure.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The production floor, four steps, at a size you can take in at once. */
export function AboutFloor() {
  const steps = factory.filter((stage) =>
    ["Wire forming", "Heat treatment", "Finishing", "Packing"].includes(stage.title),
  );

  return (
    <section className={styles.section} data-chapter="sage" aria-labelledby="floor-title">
      <SectionHead
        id="floor-title"
        title="Our factory"
        intro="Moulding, wire forming, heat treatment, assembly and packing happen under one roof in Mehmedabad."
      />

      <ul className={styles.floor}>
        {steps.map((stage, i) => (
          <li key={stage.title} data-zoom>
            <figure>
              <span className="frame" data-reveal="unveil" style={order(i)}>
                <Photo
                  src={stage.src}
                  alt={stage.alt}
                  width={1086}
                  height={1448}
                  sizes="(max-width: 900px) 46vw, 23vw"
                />
              </span>
              <figcaption>
                <strong>{stage.title}</strong>
                {stage.copy}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className={styles.app} data-reveal="rise">
        <div>
          <h3 className="t-heading">The HIRANIX app</h3>
          <p className="t-body">Browse the range and stay connected from your phone.</p>
        </div>
        <div className={styles.appLinks}>
          <a
            className="btn"
            href="https://play.google.com/store/apps/details?id=com.hinoveapp&hl=en_IN&pli=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GooglePlayLogo size={18} weight="fill" aria-hidden="true" />
            Google Play
          </a>
          <a
            className="btn"
            href="https://apps.apple.com/in/app/hiranix/id6618135537"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppleLogo size={18} weight="fill" aria-hidden="true" />
            App Store
          </a>
        </div>
      </div>
    </section>
  );
}
