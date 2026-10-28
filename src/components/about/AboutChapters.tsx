import type { CSSProperties } from "react";
import { AppleLogo, GooglePlayLogo } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "@/components/system/Photo";
import { Split } from "@/components/system/Split";
import styles from "./About.module.css";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** Who we are, then the floor it happens on, full width. */
export function AboutIntro() {
  return (
    <section className={styles.intro} data-chapter="ink" aria-labelledby="about-title">
      <div className="hx-index">
        <p className="t-mono">(01) About HIRANIX</p>
        <p className="t-mono">Hiranix India Private Limited</p>
      </div>
      <Split as="h1" id="about-title" className={`t-mega ${styles.title}`}>
        Engineered
        <br />
        <span className="t-thin">for</span> <span className="t-accent">every fix.</span>
      </Split>
      <div className={styles.introText}>
        <p className="t-body" data-reveal="rise">
          Hiranix India Private Limited brings the electrical and installation products every site
          uses into one clear range, so electricians, contractors and dealers can select and source
          with confidence.
        </p>
        <p className="t-body" data-reveal="rise" style={order(1)}>
          Everything is made in our own factory in Mehmedabad, Gujarat, and supplied to customers
          across India and overseas.
        </p>
      </div>
      <figure className={styles.wide}>
        <span className="frame" data-parallax="0.12" data-reveal="unveil">
          <Photo
            src="/assets/hiranix/factory/finishing-line.jpg"
            alt="Automated finishing line inside the HIRANIX facility"
            width={1086}
            height={1448}
            sizes="100vw"
            priority
          />
        </span>
        <figcaption className="t-mono">Finishing line, Mehmedabad</figcaption>
      </figure>
    </section>
  );
}

const figures = [
  {
    value: "No. 1",
    label: "Manufacturer of cable nail clips",
    copy: "World's largest, made at volume on our own production lines.",
  },
  {
    value: "15+",
    label: "Years of experience",
    copy: "Making and supplying electrical and installation products.",
  },
  {
    value: "Worldwide",
    label: "Deliveries",
    copy: "Factory-direct supply across India and overseas.",
  },
];

/** The scale, as one statement and three figures. */
export function AboutScale() {
  return (
    <section className={styles.section} data-chapter="bone" aria-labelledby="scale-title">
      <div className="hx-index">
        <p className="t-mono">(02) In figures</p>
        <p className="t-mono">Mehmedabad, Gujarat, India</p>
      </div>
      <h2 id="scale-title" className="sr-only">HIRANIX in figures</h2>
      <Split as="p" mode="fill" className={`t-statement ${styles.statement}`}>
        From one factory floor to sites across the country and overseas, every clip, box and
        nail we ship is made, finished and counted by our own people.
      </Split>
      <ul className={styles.figures}>
        {figures.map((figure, i) => (
          <li key={figure.label} data-reveal="rise" style={order(i)}>
            <p className={styles.figureValue}>{figure.value}</p>
            <h3 className="t-mono">{figure.label}</h3>
            <p className="t-body">{figure.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The phone app, a single line before contact. */
export function AboutApp() {
  return (
    <section className={styles.appSection} data-chapter="ink" aria-labelledby="app-title">
      <div className={styles.app}>
        <div>
          <p className="t-mono">(04) On your phone</p>
          <Split id="app-title" className="t-display-l">
            The HIRANIX <span className="t-accent">app</span>
          </Split>
          <p className="t-body" data-reveal="rise">Browse the range and stay connected from your phone.</p>
        </div>
        <div className={styles.appLinks} data-reveal="rise" style={order(1)}>
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
