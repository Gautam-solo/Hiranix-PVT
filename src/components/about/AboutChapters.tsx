import type { CSSProperties } from "react";
import { AppleLogo, GooglePlayLogo } from "@phosphor-icons/react/dist/ssr";
import { Split } from "@/components/system/Split";
import styles from "./About.module.css";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** Who we are, in one line and two short paragraphs. */
export function AboutIntro() {
  return (
    <section className={styles.intro} data-chapter="ink" aria-labelledby="about-title">
      <div className="hx-index">
        <p className="t-mono">(01) About HIRANIX</p>
        <p className="t-mono">Hiranix India Private Limited</p>
      </div>
      <Split as="h1" id="about-title" className={`t-mega ${styles.title}`}>
        Small parts.
        <br />
        <span className="t-accent">Big sites.</span>
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
