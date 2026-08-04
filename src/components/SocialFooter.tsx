"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/ArrowUpRight";
import { FacebookLogo } from "@phosphor-icons/react/FacebookLogo";
import { InstagramLogo } from "@phosphor-icons/react/InstagramLogo";
import { WhatsappLogo } from "@phosphor-icons/react/WhatsappLogo";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

import styles from "./SocialFooter.module.css";

const factoryImages = [
  {
    src: "/assets/hiranix/factory/injection-moulding-floor.jpg",
    alt: "Long row of HIRANIX injection moulding machines inside the factory",
  },
  {
    src: "/assets/hiranix/factory/fastener-feeding-line.jpg",
    alt: "Automated fastener feeding and assembly line",
  },
  {
    src: "/assets/hiranix/factory/packaging-line.jpg",
    alt: "HIRANIX automated packaging machinery in production",
  },
  {
    src: "/assets/hiranix/factory/heat-treatment-line.jpg",
    alt: "Industrial heat treatment line for metal fasteners",
  },
  {
    src: "/assets/hiranix/factory/fastener-assembly-line.jpg",
    alt: "HIRANIX automated fastener assembly and feeding machinery",
    fit: "contain",
  },
  {
    src: "/assets/hiranix/factory/wire-forming-floor.jpg",
    alt: "Wire forming machines across the HIRANIX production floor",
  },
  {
    src: "/assets/hiranix/factory/finishing-line.jpg",
    alt: "Automated finishing line inside the HIRANIX facility",
  },
] as const;

/* ─── Fan carousel geometry ─── */

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7, scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0, scale: 1.0, x: 0, y: 0.0, zIndex: 10 },
  { rot: 7, scale: 0.9346, x: 11, y: 1.3, zIndex: 3 },
  { rot: 14, scale: 0.8498, x: 22, y: 4.0, zIndex: 2 },
  { rot: 21, scale: 0.7756, x: 30, y: 7.3, zIndex: 1 },
];

/** Scale x-offsets so the fan fits narrower viewports. */
function getSpreadMultiplier(width: number) {
  if (width < 480) return 0.30;
  if (width < 640) return 0.40;
  if (width < 768) return 0.52;
  if (width < 1024) return 0.72;
  return 1.0;
}

/** Scale y-offsets when the viewport is too short for the ideal layout. */
function getHeightMultiplier(width: number) {
  let idealPx: number;
  if (width < 480) idealPx = 340;
  else if (width < 768) idealPx = 440;
  else if (width < 1024) idealPx = 540;
  else idealPx = 600;

  const available = window.innerHeight * 0.62;
  return available >= idealPx ? 1 : available / idealPx;
}

export default function SocialFooter() {
  const socialRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hasEntered = useRef(false);
  const isAnimating = useRef(false);

  useEffect(() => {
    const social = socialRef.current;
    const stage = stageRef.current;
    if (!social || !stage) return;

    const cards = Array.from(
      stage.querySelectorAll<HTMLElement>(`.${styles.socialCard}`),
    );
    const wipes = Array.from(
      social.querySelectorAll<HTMLElement>("[data-social-wipe]"),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!cards.length) return;

    const totalCards = cards.length;
    const center = Math.floor(totalCards / 2);

    /** Compute GSAP target props for a given fan slot at the current viewport. */
    const getTarget = (slot: number) => {
      const pos = FAN_POSITIONS[slot];
      const mult = getSpreadMultiplier(window.innerWidth);
      const hMult = getHeightMultiplier(window.innerWidth);
      return {
        x: `${pos.x * mult}rem`,
        y: `${pos.y * hMult}rem`,
        rotation: pos.rot,
        scale: pos.scale,
        opacity: 1,
        zIndex: pos.zIndex,
      };
    };

    /* ── Reduced motion: instant final state ── */
    if (reducedMotion.matches) {
      cards.forEach((card, slot) => gsap.set(card, getTarget(slot)));
      wipes.forEach((el) => el.style.setProperty("--wipe-cover", "0"));
      hasEntered.current = true;
      return;
    }

    /* ── Initial hidden state ── */
    cards.forEach((card) => {
      gsap.set(card, {
        x: 0,
        y: "12rem",
        rotation: 0,
        scale: 0.5,
        opacity: 0,
        zIndex: 1,
      });
    });

    /* ── Entry animation (IntersectionObserver) ── */
    const playEntry = () => {
      if (hasEntered.current) return;
      hasEntered.current = true;
      isAnimating.current = true;

      // Reveal heading wipes
      wipes.forEach((el, i) => {
        gsap.to(el, {
          "--wipe-cover": 0,
          duration: 0.6,
          delay: 0.1 + i * 0.12,
          ease: "power2.out",
        });
      });

      // Fan cards in with elastic easing
      let completed = 0;
      cards.forEach((card, slot) => {
        gsap.to(card, {
          ...getTarget(slot),
          duration: 1.2,
          ease: "elastic.out(1.05, 0.78)",
          delay: 0.3 + slot * 0.06,
          onComplete: () => {
            if (++completed >= totalCards) isAnimating.current = false;
          },
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          playEntry();
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(social);

    /* ── Hover interactions (desktop) ── */
    let activeSlot: number | null = null;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;

    const applyHover = (hoveredSlot: number | null) => {
      const mult = getSpreadMultiplier(window.innerWidth);
      const hMult = getHeightMultiplier(window.innerWidth);

      cards.forEach((card, slot) => {
        const base = FAN_POSITIONS[slot];
        let targetX = base.x * mult;
        let targetY = base.y * hMult;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            // Lift hovered card
            targetY -= 2.5 * hMult;
            targetScale *= 1.08;
          } else {
            // Push neighbors apart
            const normalized =
              center > 0 ? (slot - center) / center : 0;
            const push =
              8 *
              (1 - Math.abs(normalized)) *
              (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= push * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += push * mult;
              targetRot += 3 / (distance + 1);
            }

            // Lift far-edge cards slightly for depth
            if (
              slot === totalCards - 1 &&
              hoveredSlot < center
            )
              targetY -= 1 * hMult;
            if (slot === 0 && hoveredSlot > center)
              targetY -= 1 * hMult;
          }
        } else {
          delay = Math.abs(slot - center) * 0.02;
        }

        gsap.to(card, {
          x: `${targetX}rem`,
          y: `${targetY}rem`,
          rotation: targetRot,
          scale: targetScale,
          duration: 0.5,
          delay,
          ease: "elastic.out(1, 0.75)",
          overwrite: "auto",
        });
        gsap.set(card, {
          zIndex: hoveredSlot === slot ? 20 : base.zIndex,
        });
      });
    };

    const enterHandlers = cards.map((el, slot) => {
      const handler = () => {
        if (isAnimating.current) return;
        if (leaveTimer) {
          clearTimeout(leaveTimer);
          leaveTimer = null;
        }
        if (activeSlot !== slot) {
          activeSlot = slot;
          applyHover(slot);
        }
      };
      el.addEventListener("mouseenter", handler);
      return { el, handler };
    });

    const onMouseLeave = () => {
      if (isAnimating.current) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => {
        activeSlot = null;
        applyHover(null);
      }, 50);
    };
    stage.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => {
      if (!isAnimating.current && hasEntered.current)
        applyHover(activeSlot);
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      enterHandlers.forEach(({ el, handler }) =>
        el.removeEventListener("mouseenter", handler),
      );
      stage.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
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

        <div ref={stageRef} className={styles.cardStage}>
          {factoryImages.map((image) => (
            <figure
              className={styles.socialCard}
              data-social-card
              tabIndex={0}
              aria-label={`${image.alt}. Focus for a larger view.`}
              key={image.src}
            >
              <div className={styles.cardFloat}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{
                    objectFit: "fit" in image ? image.fit : "cover",
                  }}
                  sizes="(max-width: 479px) 52vw, (max-width: 991px) 22rem, 23rem"
                />
              </div>
            </figure>
          ))}
        </div>

        <div className={styles.factoryStatement}>
          <p className={styles.factoryLead}>
            From raw material to final inspection, every HIRANIX product moves
            through an integrated, quality-controlled manufacturing system.
          </p>
          <div className={styles.factoryMeta}>
            <span>Engineered in India</span>
            <span>Built for dependable performance</span>
          </div>
          <Link className={styles.factoryLink} href="/products">
            <span>Explore products</span>
            <span aria-hidden="true">↓</span>
          </Link>
        </div>
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
              href="https://www.google.com/maps/search/?api=1&query=198%2C%20Abhishree%20Estate%2C%20Odhav%2C%20Ahmedabad%20382415"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>
                198, Abhishree Estate, Odhav, Ahmedabad - 382415
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
                href="https://www.whatsapp.com/channel/0029VbC3XSB4Y9lsPFDFp028"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the HIRANIX WhatsApp Channel"
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
