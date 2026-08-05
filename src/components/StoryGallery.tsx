"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./StoryGallery.module.css";

type StoryCard = {
  id: string;
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  parallax: number;
  muted?: boolean;
};

const cards: StoryCard[] = [
  {
    id: "dbElite",
    label: "DB Elite",
    src: "/assets/hiranix/gallery/db-elite.jpg",
    alt: "HIRANIX DB Elite distribution box",
    width: 1122,
    height: 1402,
    parallax: 16,
  },
  {
    id: "mcbBox",
    label: "MCB Box",
    src: "/assets/hiranix/gallery/mcb-box.jpg",
    alt: "HIRANIX MCB enclosure box",
    width: 1122,
    height: 1402,
    parallax: 27,
    muted: true,
  },
  {
    id: "cableClip",
    label: "Cable Nail Clip",
    src: "/assets/hiranix/gallery/cable-nail-clip.jpg",
    alt: "HIRANIX cable nail clip",
    width: 1122,
    height: 1402,
    parallax: 9,
  },
  {
    id: "pvcTape",
    label: "FR PVC Tape",
    src: "/assets/hiranix/gallery/fr-pvc-tape.jpg",
    alt: "HIRANIX flame-retardant PVC insulation tape",
    width: 1122,
    height: 1402,
    parallax: 33,
    muted: true,
  },
  {
    id: "upvcPlug",
    label: "UPVC End Plug",
    src: "/assets/hiranix/gallery/upvc-end-plug.jpg",
    alt: "HIRANIX UPVC conduit end plug",
    width: 1122,
    height: 1402,
    parallax: 13,
  },
  {
    id: "cpvcPlug",
    label: "CPVC End Plug",
    src: "/assets/hiranix/gallery/cpvc-end-plug.jpg",
    alt: "HIRANIX CPVC conduit end plug",
    width: 1122,
    height: 1402,
    parallax: 24,
  },
  {
    id: "cableTie",
    label: "Nylon Cable Tie",
    src: "/assets/hiranix/gallery/nylon-cable-tie.jpg",
    alt: "HIRANIX nylon cable tie",
    width: 1122,
    height: 1402,
    parallax: 36,
    muted: true,
  },
  {
    id: "doubleClamp",
    label: "Double Nail Clamp",
    src: "/assets/hiranix/gallery/double-nail-clamp.jpg",
    alt: "HIRANIX double nail cable clamp",
    width: 1122,
    height: 1402,
    parallax: 7,
  },
  {
    id: "gangBox",
    label: "Modular Gang Box",
    src: "/assets/hiranix/gallery/modular-gang-box.jpg",
    alt: "HIRANIX modular gang box",
    width: 1122,
    height: 1402,
    parallax: 29,
  },
  {
    id: "pushButton",
    label: "MCB Push Button",
    src: "/assets/hiranix/gallery/mcb-distribution-push-button.jpg",
    alt: "HIRANIX MCB distribution push button",
    width: 1448,
    height: 1086,
    parallax: 19,
    muted: true,
  },
];

function ProductNote({ variant }: { variant: "first" | "second" }) {
  const first = variant === "first";

  return (
    <aside
      className={`${styles.quote} ${first ? styles.quoteFirst : styles.quoteSecond}`}
      data-reveal-card
      data-parallax={first ? 31 : 18}
    >
      <span className={styles.noteIndex}>{first ? "PRODUCT SYSTEM" : "HIRANIX STANDARD"}</span>
      <p>
        {first ? (
          <>
            One connected range for <em>faster installs</em>, cleaner finishes and
            dependable daily work.
          </>
        ) : (
          <>
            Designed around the people who build, wire and maintain the spaces
            everyone relies on.
          </>
        )}
      </p>
    </aside>
  );
}

function GalleryCard({ card }: { card: StoryCard }) {
  return (
    <article
      className={`${styles.card} ${styles[card.id]}`}
      data-reveal-card
      data-parallax={card.parallax}
    >
      <div className={styles.label}>{card.label}</div>
      <div className={styles.frame}>
        <Image
          className={`${styles.photo} ${card.muted ? styles.muted : ""}`}
          src={card.src}
          alt={card.alt}
          width={card.width}
          height={card.height}
          sizes="(max-width: 991px) 52vw, 42vw"
        />
      </div>
    </article>
  );
}

export default function StoryGallery() {
  const introRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    const intro = introRef.current;
    const track = trackRef.current;
    if (!gallery || !intro || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 992px)");
    const revealItems = Array.from(
      gallery.querySelectorAll<HTMLElement>("[data-reveal-card]"),
    );
    const introLines = Array.from(
      intro.querySelectorAll<HTMLElement>(`.${styles.headline} > span`),
    );
    const previousBodyBackground = document.body.style.backgroundColor;
    let observer: IntersectionObserver | undefined;
    let frame = 0;

    if (reducedMotion.matches) {
      revealItems.forEach((item) => item.setAttribute("data-visible", "true"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).setAttribute("data-visible", "true");
              observer?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "8% 0px -8%", threshold: 0.06 },
      );
      revealItems.forEach((item) => observer?.observe(item));
    }

    const mix = (from: number, to: number, progress: number) =>
      Math.round(from + (to - from) * progress);

    const update = () => {
      frame = 0;
      const introRect = intro.getBoundingClientRect();
      const introProgress = Math.max(
        0,
        Math.min(1, (window.innerHeight - introRect.top) / (window.innerHeight + introRect.height)),
      );
      introLines.forEach((line, index) => {
        const start = 0.15 + index * 0.07;
        const reveal = Math.max(0, Math.min(1, (introProgress - start) / 0.1));
        line.style.setProperty("--line-cover", String(1 - reveal));
      });

      const rect = gallery.getBoundingClientRect();
      const available = Math.max(1, gallery.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / available));

      // Transition dark → light over 0..0.75, then light → dark over 0.75..1.
      // This eliminates the white blank gap before the dark ProductShowcase.
      const fadeOutStart = 0.75;
      let colorProgress: number;
      if (progress <= fadeOutStart) {
        colorProgress = progress / fadeOutStart; // 0 → 1 (dark → light)
      } else {
        colorProgress = 1 - (progress - fadeOutStart) / (1 - fadeOutStart); // 1 → 0 (light → dark)
      }
      // Smootherstep, not a straight ramp. The stylesheet used to derive the
      // ink as a literal inversion of this background (`calc(249 - --story-r)`),
      // so at the midpoint the text and its own background both resolved to the
      // same grey and every label in the gallery disappeared. Easing steepens
      // the sweep through those ambiguous mid-greys so it passes quickly...
      const eased =
        colorProgress ** 3 * (colorProgress * (colorProgress * 6 - 15) + 10);
      const r = mix(7, 242, eased);
      const g = mix(10, 245, eased);
      const b = mix(8, 242, eased);
      const background = `rgb(${r}, ${g}, ${b})`;

      gallery.style.setProperty("--story-r", String(r));
      gallery.style.setProperty("--story-g", String(g));
      gallery.style.setProperty("--story-b", String(b));
      gallery.style.setProperty("--gallery-progress", String(progress));
      // ...and the ink now flips between cream and near-black at the crossover
      // instead of interpolating through it, so it can never match the plate
      // behind it.
      gallery.style.setProperty("--gallery-ink", eased > 0.5 ? "#0b1710" : "#f2f5f2");

      // The traversal and the parallax now run at every width — small screens
      // render the same composition, scaled down by the stylesheet.
      if (!reducedMotion.matches) {
        // getBoundingClientRect() reports the *visual* width, so this already
        // accounts for the track's scale() below 992px. scrollWidth would not:
        // it reports the unscaled layout width and would overshoot the travel.
        const travel = Math.max(0, track.getBoundingClientRect().width - window.innerWidth);
        gallery.style.setProperty("--gallery-x", `${-travel * progress}px`);
        revealItems.forEach((item) => {
          const speed = Number(item.dataset.parallax || 0);
          item.style.setProperty("--card-drift", `${-progress * speed}px`);
        });
      } else {
        gallery.style.setProperty("--gallery-x", "0px");
        revealItems.forEach((item) => item.style.setProperty("--card-drift", "0px"));
      }

      if (rect.top > 0) document.body.style.backgroundColor = "rgb(7, 10, 8)";
      else if (rect.bottom < 0)
        document.body.style.backgroundColor = "rgb(7, 10, 8)";
      else document.body.style.backgroundColor = background;
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    desktop.addEventListener("change", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      desktop.removeEventListener("change", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      document.body.style.backgroundColor = previousBodyBackground;
    };
  }, []);

  return (
    <div className={styles.story}>
      <section ref={introRef} className={styles.intro} aria-labelledby="story-gallery-heading">
        <div className={styles.contours} aria-hidden="true" />
        <div className={styles.introInner}>
          <p className={styles.eyebrow}>Built around reliability</p>
          <h2 id="story-gallery-heading" className={styles.headline}>
            <span><strong>HIRANIX QUALITY.</strong></span>
            <span>ENGINEERED FOR</span>
            <span><strong>DEPENDABLE PERFORMANCE.</strong></span>
          </h2>
          <p className={styles.introCopy}>
            Electrical fittings, fasteners and enclosures developed for consistent
            installation, durable service and reliable supply.
          </p>
        </div>
      </section>

      <section ref={galleryRef} className={styles.gallery} aria-label="HIRANIX product gallery">
        <div className={styles.galleryBackground} aria-hidden="true">
          <div className={styles.contours} />
        </div>
        <div className={styles.viewport}>
          <div ref={trackRef} className={styles.track}>
            {cards.map((card) => (
              <GalleryCard key={card.id} card={card} />
            ))}
            <ProductNote variant="first" />
            <ProductNote variant="second" />
          </div>
        </div>
      </section>
    </div>
  );
}
