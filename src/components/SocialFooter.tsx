"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/ArrowUpRight";
import { FacebookLogo } from "@phosphor-icons/react/FacebookLogo";
import { InstagramLogo } from "@phosphor-icons/react/InstagramLogo";
import { WhatsappLogo } from "@phosphor-icons/react/WhatsappLogo";
import Link from "next/link";
import { gsap } from "gsap";

import CardFanCarousel, {
  type CardItem,
} from "@/components/ui/card-fan-carousel";

import styles from "./SocialFooter.module.css";

const factoryImages = [
  {
    src: "/assets/hiranix/factory/injection-moulding-floor.jpg",
    alt: "Long row of HIRANIX injection moulding machines inside the factory",
    label: "Injection moulding",
  },
  {
    src: "/assets/hiranix/factory/fastener-feeding-line.jpg",
    alt: "Automated fastener feeding and assembly line",
    label: "Fastener feeding",
  },
  {
    src: "/assets/hiranix/factory/packaging-line.jpg",
    alt: "HIRANIX automated packaging machinery in production",
    label: "Packaging",
  },
  {
    src: "/assets/hiranix/factory/heat-treatment-line.jpg",
    alt: "Industrial heat treatment line for metal fasteners",
    label: "Heat treatment",
  },
  {
    src: "/assets/hiranix/factory/fastener-assembly-line.jpg",
    alt: "HIRANIX automated fastener assembly and feeding machinery",
    label: "Fastener assembly",
  },
  {
    src: "/assets/hiranix/factory/wire-forming-floor.jpg",
    alt: "Wire forming machines across the HIRANIX production floor",
    label: "Wire forming",
  },
  {
    src: "/assets/hiranix/factory/finishing-line.jpg",
    alt: "Automated finishing line inside the HIRANIX facility",
    label: "Finishing",
  },
] as const;

/** The carousel takes plain image records; the labels stay on the section
    for the alt text. */
const factoryCards: CardItem[] = factoryImages.map((image) => ({
  imgUrl: image.src,
  alt: image.alt,
}));

export default function SocialFooter() {
  const socialRef = useRef<HTMLElement>(null);

  /* The cards are the fan carousel's business now; all this section animates
     is the wipe off its heading, once, when it first scrolls into view. */
  useEffect(() => {
    const social = socialRef.current;
    if (!social) return;

    const wipes = Array.from(
      social.querySelectorAll<HTMLElement>("[data-social-wipe]"),
    );
    if (!wipes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wipes.forEach((el) => el.style.setProperty("--wipe-cover", "0"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      wipes.forEach((el) => el.style.setProperty("--wipe-cover", "0"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        wipes.forEach((el, index) => {
          gsap.to(el, {
            "--wipe-cover": 0,
            duration: 0.6,
            delay: 0.1 + index * 0.12,
            ease: "power2.out",
          });
        });
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observer.observe(social);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(wipes);
    };
  }, []);

  return (
    <>
      <section
        ref={socialRef}
        className={styles.socialSection}
        aria-labelledby="factory-title"
      >
        <div className={styles.factoryEyebrow}>
          <span>Inside HIRANIX</span>
          <span>Manufacturing / production floor</span>
        </div>

        <div className={styles.socialHeading}>
          <h2 id="factory-title" aria-label="Built with precision">
            <span className={styles.socialWipe} data-social-wipe>
              BUILT WITH
            </span>
            <span
              className={`${styles.socialHeadingAlt} ${styles.socialWipe}`}
              data-social-wipe
            >
              PRECISION
            </span>
          </h2>
        </div>

        <CardFanCarousel
          className={styles.cardFan}
          cards={factoryCards}
          maxVisible={5}
        />
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerMain}>
          <nav className={styles.footerLinks} aria-label="Footer navigation">
            <h3>Quick Links</h3>
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/brand">Brand</Link>
            <Link href="/about">About</Link>
          </nav>

          <address className={styles.footerContact}>
            <h3 id="footer-contact-title">Contact Us</h3>
            <a
              href="https://www.google.com/maps/search/?api=1&query=198%2C%20Hirachandni%20Muvadi%2C%20Nr.Ghodasar%20Canal%2C%20Mehmedabad-387110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>
                198, Hirachandni Muvadi, Nr.Ghodasar Canal, Mehmedabad-387110
              </strong>
              <ArrowUpRight aria-hidden="true" weight="bold" />
            </a>
            <a href="tel:+917984462764">
              <strong>+91 79844 62764</strong>
            </a>
            <a href="mailto:contact@hiranix.in">
              <strong>contact@hiranix.in</strong>
            </a>
          </address>

          <section
            className={styles.footerFollow}
            aria-labelledby="follow-hiranix-title"
          >
            <h3 id="follow-hiranix-title">Follow Us</h3>
            <div className={styles.socialLinks}>
              <a
                href="https://www.instagram.com/hiranix.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open HIRANIX on Instagram"
              >
                <InstagramLogo aria-hidden="true" weight="regular" />
              </a>
              <a
                href="https://www.facebook.com/people/Hiranix/61581637497185/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open HIRANIX on Facebook"
              >
                <FacebookLogo aria-hidden="true" weight="regular" />
              </a>
              <a
                href="https://wa.me/917984462764"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with HIRANIX on WhatsApp"
              >
                <WhatsappLogo aria-hidden="true" weight="regular" />
              </a>
            </div>
            <a
              className={styles.footerWebsite}
              href="https://hiranix.store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              hiranix.store
              <ArrowUpRight aria-hidden="true" weight="bold" />
            </a>
            <div
              className={styles.footerApps}
              aria-labelledby="footer-app-title"
            >
              <h4 id="footer-app-title">Get the Hiranix app</h4>
              <div className={styles.appLinks}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.hinoveapp&hl=en_IN&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Hiranix from Google Play"
                >
                  <span>
                    <small>Get it on</small>Google Play
                  </span>
                </a>
                <a
                  href="https://apps.apple.com/in/app/hiranix/id6618135537"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Hiranix from the App Store"
                >
                  <span>
                    <small>Download on the</small>App Store
                  </span>
                </a>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 HIRANIX. All rights reserved.</span>
          <nav aria-label="Legal">
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
            <Link href="/legal/terms-conditions">Terms &amp; Conditions</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
