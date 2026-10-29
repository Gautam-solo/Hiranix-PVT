import type { CSSProperties } from "react";
import { AppleLogo, GooglePlayLogo } from "@phosphor-icons/react/dist/ssr";
import { Split } from "@/components/system/Split";
import { LetterWave } from "@/components/about/LetterWave";
import styles from "./About.module.css";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** Who we are: "small parts" set small, "big sites" set enormous, and alive. */
export function AboutIntro() {
  return (
    <section className={styles.intro} data-chapter="ink" aria-labelledby="about-title">
      <div className="hx-index">
        <p className="t-mono">(01) About HIRANIX</p>
        <p className="t-mono">Hiranix India Private Limited</p>
      </div>
      <h1 id="about-title" className={styles.title}>
        <span className={styles.titleSmall} data-reveal="rise" data-atf="">Small parts.</span>
        <LetterWave text="BIG SITES." accentFrom={4} className={styles.titleBig} />
      </h1>
      <p className={`t-mono ${styles.titleHint}`} data-reveal="rise" data-atf="">
        Move over the words
      </p>
    </section>
  );
}

/** The company in one sentence, read into focus as you scroll. */
export function AboutManifesto() {
  return (
    <section className={styles.manifesto} data-chapter="bone" aria-labelledby="manifesto-title">
      <div className="hx-index">
        <p className="t-mono">(02) Who we are</p>
        <p className="t-mono">Mehmedabad, Gujarat, India</p>
      </div>
      <h2 id="manifesto-title" className="sr-only">Who we are</h2>
      <Split as="p" mode="fill" className={styles.manifestoText}>
        Hiranix India Private Limited brings the electrical and installation products every site
        uses into <span className={styles.mark}>one clear range</span>, made in our{" "}
        <span className={styles.mark}>own factory</span> in Mehmedabad, Gujarat, and supplied to
        customers across India and overseas.
      </Split>
    </section>
  );
}

/** The phone app, a single line before contact. */
export function AboutApp() {
  return (
    <section className={styles.appSection} data-chapter="ink" aria-labelledby="app-title">
      <div className={styles.app}>
        <div>
          <p className="t-mono">(05) On your phone</p>
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
