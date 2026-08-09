import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { HiranixLogo } from "@/components/HiranixLogo";
import { CATALOGUE_A11Y_LABEL, catalogueLinkProps } from "@/data/catalogue";
import styles from "./about-3.module.css";

type Media = {
  src: string;
  alt: string;
};

type Achievement = {
  label: string;
  value: string;
};

type About3Props = {
  title: string;
  description: string;
  mainImage: Media;
  secondaryImage: Media;
  breakout: Media & {
    title: string;
    description: string;
    buttonText: string;
  };
  systemsTitle: string;
  systems: readonly string[];
  achievementsTitle: string;
  achievementsDescription: string;
  achievements: Achievement[];
  contact: {
    address: string;
    phone: string;
    email: string;
  };
};

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=198%2C%20Hirachandni%20Muvadi%2C%20Nr.Ghodasar%20Canal%2C%20Mehmedabad-387110";

export function About3({
  title,
  description,
  mainImage,
  secondaryImage,
  breakout,
  systemsTitle,
  systems,
  achievementsTitle,
  achievementsDescription,
  achievements,
  contact,
}: About3Props) {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <section className={styles.about} aria-labelledby="about-title">
        <div className={styles.intro}>
          <h1 id="about-title">{title}</h1>
          <p>{description}</p>
        </div>

        <div className={styles.mediaGrid}>
          <figure className={styles.mainImage}>
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 66vw"
            />
          </figure>

          <div className={styles.sideColumn}>
            <article className={styles.breakout}>
              <Image
                src={breakout.src}
                alt={breakout.alt}
                width={820}
                height={275}
                className={styles.breakoutLogo}
              />
              <div>
                <h2>{breakout.title}</h2>
                <p>{breakout.description}</p>
              </div>
              <a
                {...catalogueLinkProps}
                aria-label={CATALOGUE_A11Y_LABEL}
                className={styles.outlineButton}
              >
                {breakout.buttonText}
                <ArrowDown size={17} weight="bold" aria-hidden="true" />
              </a>
            </article>

            <figure className={styles.secondaryImage}>
              <Image
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
            </figure>
          </div>
        </div>

        <section className={styles.systems} aria-labelledby="systems-title">
          <h2 id="systems-title">{systemsTitle}</h2>
          <div>
            {systems.map((system) => (
              <span key={system}>{system}</span>
            ))}
          </div>
        </section>

        <section className={styles.achievements} aria-labelledby="achievements-title">
          <div className={styles.achievementIntro}>
            <h2 id="achievements-title">{achievementsTitle}</h2>
            <p>{achievementsDescription}</p>
          </div>
          <dl className={styles.achievementGrid}>
            {achievements.map((achievement) => (
              <div key={achievement.label}>
                <dt>{achievement.label}</dt>
                <dd>{achievement.value}</dd>
              </div>
            ))}
          </dl>
          <span className={styles.achievementMark} aria-hidden="true">X</span>
        </section>
      </section>

      <section className={styles.appSection} aria-labelledby="hiranix-app-title">
        <div className={styles.appCopy}>
          <span>Hiranix app</span>
          <h2 id="hiranix-app-title">The Hiranix range, wherever work takes you.</h2>
          <p>Explore Hiranix products and stay connected from your phone.</p>
        </div>
        <div className={styles.appStores}>
          <a
            href="https://play.google.com/store/apps/details?id=com.hinoveapp&hl=en_IN&pli=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Hiranix from Google Play"
          >
            <span><small>Get it on</small>Google Play</span>
            <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
          </a>
          <a
            href="https://apps.apple.com/in/app/hiranix/id6618135537"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Hiranix from the App Store"
          >
            <span><small>Download on the</small>App Store</span>
            <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className={styles.contact} aria-labelledby="contact-title">
        <div className={styles.contactCopy}>
          <h2 id="contact-title">Talk to HIRANIX.</h2>
          <p>
            Send your product, size and quantity requirement to the HIRANIX sales
            team.
          </p>
          <a className={styles.primaryButton} href={`mailto:${contact.email}`}>
            Send an enquiry
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <address className={styles.contactDetails}>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            {contact.address}
            <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
          </a>
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </address>
      </section>

      <footer className={styles.footer}>
        <Link href="/" className={styles.wordmark} aria-label="HIRANIX home">
          <HiranixLogo className={styles.wordmarkImage} />
        </Link>
        <nav className={styles.footerNav} aria-label="About page footer navigation">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/brand">Brand</Link>
          <Link href="/about" aria-current="page">About</Link>
        </nav>
        <div className={styles.socials} aria-label="HIRANIX social media">
          <a
            href="https://www.instagram.com/hiranix.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open HIRANIX on Instagram"
          >
            <InstagramLogo size={21} aria-hidden="true" />
          </a>
          <a
            href="https://www.facebook.com/people/Hiranix/61581637497185/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open HIRANIX on Facebook"
          >
            <FacebookLogo size={21} aria-hidden="true" />
          </a>
          <a
            href="https://wa.me/917984462764"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with HIRANIX on WhatsApp"
          >
            <WhatsappLogo size={21} aria-hidden="true" />
          </a>
        </div>
        <div className={styles.legal}>
          <span>© 2026 Hiranix India Private Limited</span>
          <div>
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
            <Link href="/legal/terms-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
