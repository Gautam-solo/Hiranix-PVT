import type { CSSProperties } from "react";
import { AppleLogo, GooglePlayLogo } from "@phosphor-icons/react/dist/ssr";
import { Split } from "@/components/system/Split";
import { LetterWave } from "@/components/about/LetterWave";
import { Photo } from "@/components/system/Photo";
import { factory } from "@/data/company";
import styles from "./About.module.css";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** The opener: "small parts" set small, "big sites" set enormous, and alive,
 *  closed by a band that previews the factory floor below. */
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
      <div className={styles.introFoot}>
        <p className={`t-body ${styles.introLine}`} data-reveal="rise" data-atf="">
          Electrical fittings, fasteners, cable management and enclosures, made in Mehmedabad, Gujarat.
        </p>
        <ol className={styles.introStrip} aria-label="Five steps on the factory floor" data-reveal="rise" data-atf="" style={order(1)}>
          {factory.map((stage, i) => (
            <li key={stage.title}>
              <span className={`frame ${styles.introThumb}`}>
                <Photo src={stage.src} alt={stage.alt} width={1086} height={1448} sizes="80px" />
              </span>
              <span className="t-mono">{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ol>
        <div className={styles.introCue} data-reveal="rise" data-atf="" style={order(2)}>
          <p className="t-mono">Move over the words</p>
          <a className="t-mono" href="#verbs-title">Scroll · How it is made <span aria-hidden="true">↓</span></a>
        </div>
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
