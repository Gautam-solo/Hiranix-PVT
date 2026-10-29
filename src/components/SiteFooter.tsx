/* eslint-disable @next/next/no-img-element -- a small static logo, rendered natively like the credit on the studio's other sites */

import Link from "next/link";
import {
  FacebookLogo,
  InstagramLogo,
  Storefront,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./SiteFooter.module.css";

/**
 * The shared site footer: quick links on the left, follow on the right, the
 * name across the full width, then the legal line and the studio credit.
 */
export function SiteFooter({ currentPath }: { currentPath?: string }) {
  const nav = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
  ];

  const follow = [
    { href: "https://www.instagram.com/hiranix.in/", name: "Instagram", Icon: InstagramLogo },
    { href: "https://www.facebook.com/people/Hiranix/61581637497185/", name: "Facebook", Icon: FacebookLogo },
    { href: "https://wa.me/917984462764", name: "WhatsApp", Icon: WhatsappLogo },
    { href: "https://hiranix.store/", name: "Online store", Icon: Storefront },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <nav className={styles.col} aria-label="Footer navigation">
          <h2>Quick links</h2>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={currentPath === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`${styles.col} ${styles.follow}`}>
          <h2>Follow</h2>
          <ul>
            {follow.map(({ href, name, Icon }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon size={20} weight="regular" aria-hidden="true" />
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The name, as wide as the page, rising letter by letter. */}
      <p className={styles.wordmark} aria-hidden="true" data-split>
        {"HIRANIX".split("").map((letter, i) => (
          <span className="w" key={i} style={{ "--wi": i } as React.CSSProperties}>
            <span>{letter}</span>
          </span>
        ))}
      </p>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Hiranix India Private Limited</span>
        <nav aria-label="Legal">
          <Link href="/legal/privacy-policy">Privacy Policy</Link>
          <Link href="/legal/terms-conditions">Terms &amp; Conditions</Link>
        </nav>
      </div>

      <div className={styles.credit}>
        <a
          className={styles.studio}
          href="https://thescalestudios.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Website by The Scale Studio (opens in a new tab)"
        >
          <span>Website by</span>
          <img
            src="/assets/hiranix/the-scale-studio-logo.png"
            alt="The Scale Studio"
            width={419}
            height={104}
            loading="lazy"
          />
        </a>
      </div>
    </footer>
  );
}
