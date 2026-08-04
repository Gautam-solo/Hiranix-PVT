import Link from "next/link";
import {
  ArrowUpRight,
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { HiranixLogo } from "@/components/HiranixLogo";
import styles from "./SiteFooter.module.css";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=198%2C%20Abhishree%20Estate%2C%20Odhav%2C%20Ahmedabad%20382415";

/**
 * The shared site footer.
 *
 * /products, every product detail page and /brand previously rendered no
 * footer at all — 18 of the 22 URLs in the sitemap had no contact details, no
 * navigation and, more importantly, no Privacy Policy or Terms links. This is
 * the single component those pages (and /about, /legal/*) now share.
 *
 * The home page keeps its own richer page-ending composite in SocialFooter,
 * which pairs the footer with the factory gallery and app panel.
 */
export function SiteFooter({ currentPath }: { currentPath?: string }) {
  const nav = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/brand", label: "Brand" },
    { href: "/about", label: "About" },
  ];

  const socials = [
    {
      href: "https://www.instagram.com/hiranix.in/",
      label: "Open HIRANIX on Instagram",
      Icon: InstagramLogo,
    },
    {
      href: "https://www.facebook.com/people/Hiranix/61581637497185/",
      label: "Open HIRANIX on Facebook",
      Icon: FacebookLogo,
    },
    {
      href: "https://www.whatsapp.com/channel/0029VbC3XSB4Y9lsPFDFp028",
      label: "Open the HIRANIX WhatsApp channel",
      Icon: WhatsappLogo,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Link href="/" className={styles.wordmark} aria-label="HIRANIX home">
          <HiranixLogo className={styles.wordmarkImage} />
        </Link>

        <nav className={styles.nav} aria-label="Footer navigation">
          <h2>Quick links</h2>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={currentPath === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <address className={styles.contact}>
          <h2>Contact</h2>
          <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
            198, Abhishree Estate, Odhav, Ahmedabad - 382415
            <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
          </a>
          <a href="tel:+917984462764">+91 79844 62764</a>
          <a href="mailto:contact@hiranix.in">contact@hiranix.in</a>
        </address>

        <div className={styles.follow}>
          <h2>Follow</h2>
          <div className={styles.socials}>
            {socials.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={20} aria-hidden="true" />
              </a>
            ))}
          </div>
          <a
            className={styles.store}
            href="https://hiranix.store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            hiranix.store
            <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          © {new Date().getFullYear()} Hiranix India Private Limited
        </span>
        <nav aria-label="Legal">
          <Link href="/legal/privacy-policy">Privacy Policy</Link>
          <Link href="/legal/terms-conditions">Terms &amp; Conditions</Link>
        </nav>
      </div>
    </footer>
  );
}
