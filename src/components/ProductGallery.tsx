"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CaretLeft } from "@phosphor-icons/react/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/CaretRight";
import styles from "./ProductGallery.module.css";

type GalleryImage = {
  src: string;
  alt: string;
};

type ProductGalleryProps = {
  images: GalleryImage[];
  productName: string;
};

/**
 * A single-image, swipe-to-change gallery (Amazon-style) replacing the old
 * layout, which showed both product photos side by side at all times,
 * each cropped to roughly half its frame.
 *
 * Built on native horizontal scroll-snap rather than a custom drag/touch
 * handler: it gets real momentum, real touch swipe, and trackpad/wheel
 * support for free, and it composes safely with Lenis — Lenis is configured
 * with `syncTouch: false` (see SmoothScroll.tsx), so touch scrolling is left
 * to the browser, and this container's horizontal axis was never something
 * Lenis (which only drives vertical document scroll) touches in the first
 * place.
 */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || images.length === 0) return;

    // A plain scroll listener rather than IntersectionObserver: it updates on
    // every scroll source alike (swipe, wheel, the arrow/dot buttons below),
    // needs no per-slide bookkeeping, and setting an unchanged index is a
    // no-op React bails out on, so no throttling is needed either.
    const updateFromScroll = () => {
      const width = track.clientWidth;
      if (width === 0) return;
      const index = Math.round(track.scrollLeft / width);
      setActiveIndex(Math.max(0, Math.min(images.length - 1, index)));
    };

    updateFromScroll();
    track.addEventListener("scroll", updateFromScroll, { passive: true });
    return () => track.removeEventListener("scroll", updateFromScroll);
  }, [images.length]);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    if (!track || !slide) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: slide.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  const goTo = useCallback(
    (index: number) => scrollToIndex(Math.max(0, Math.min(images.length - 1, index))),
    [images.length, scrollToIndex],
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  if (images.length <= 1) {
    const only = images[0];
    return (
      <div className={styles.gallery}>
        <div className={styles.singleImage}>
          {only && (
            <Image
              src={only.src}
              alt={only.alt}
              fill
              priority
              quality={90}
              sizes="(max-width: 1000px) 100vw, 60vw"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallery} role="group" aria-roledescription="carousel" aria-label={`${productName} photos`}>
      <div
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`${productName}, image ${activeIndex + 1} of ${images.length}`}
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${images.length}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              quality={90}
              sizes="(max-width: 1000px) 100vw, 60vw"
            />
          </div>
        ))}
      </div>

      {activeIndex > 0 && (
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous photo"
        >
          <CaretLeft size={20} weight="bold" aria-hidden="true" />
        </button>
      )}
      {activeIndex < images.length - 1 && (
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next photo"
        >
          <CaretRight size={20} weight="bold" aria-hidden="true" />
        </button>
      )}

      <div className={styles.dots} role="tablist" aria-label="Choose photo">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            role="tab"
            className={styles.dot}
            data-active={index === activeIndex}
            aria-selected={index === activeIndex}
            aria-label={`Show photo ${index + 1} of ${images.length}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>

      <span className={styles.counter} aria-hidden="true">
        {activeIndex + 1} / {images.length}
      </span>
    </div>
  );
}
