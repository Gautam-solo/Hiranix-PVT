"use client";

/* eslint-disable @next/next/no-img-element -- Layered alpha cutouts rely on their intrinsic image bounds. */

import { useEffect, useLayoutEffect, useRef } from "react";
import { AppleLogo } from "@phosphor-icons/react/AppleLogo";
import { GooglePlayLogo } from "@phosphor-icons/react/GooglePlayLogo";
import { WhatsappLogo } from "@phosphor-icons/react/WhatsappLogo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Drop = {
  id: string;
  name: string;
  asset?: string;
  x: number;
  y: number;
  w: number;
  sx: number;
  sy: number;
  sw: number;
  fall: number;
  lift: number;
  drift: number;
  rot: number;
};

// Every coordinate is a percentage of the stage, which is locked to the plate's
// native 1614x975 pixel space (see `aspect-ratio` on .hx-stage), so these read
// as plate pixels: x/w against 1614, y/sy against 975.
//
// `y` is the element's layout top, not its contact point — each cutout carries
// transparent padding and, for some, a clip-path inset. `y` is therefore derived
// rather than eyeballed: y = (pedestal surface - foot) / 975, where `foot` is the
// distance from the layout top down to the last non-transparent row across the
// cutout's centre band, and the surface is the pedestal's top face measured off
// the plate. Re-derive `y` whenever an asset or `w` changes, or the product will
// float above or sink through the glass.
//
//                                surface  foot
const DROPS: Drop[] = [
  // metal is snapped at runtime against .hx-pedestal-metal — see useLayoutEffect.
  { id: "metal", name: "Metal Junction Box", asset: "/assets/hiranix/hero-products/metal-junction-box-v4.png", x: 48.06, y: 17.339, w: 10.2, sx: 53.92, sy: 43.077, sw: 12.2, fall: 0.68, lift: -300, drift: -20, rot: 0 },
  //                                                                                      420  250.95
  { id: "pvc", name: "Open Surface Box", x: 28.005, y: 46.487, w: 18.835, sx: 37.42, sy: 65.74, sw: 20.5, fall: 0.62, lift: -210, drift: -60, rot: -7 },
  //                                                    629  175.75
  { id: "plate", name: "Modular Gang Box", x: 44.548, y: 66.945, w: 18.03, sx: 53.56, sy: 88.72, sw: 19.5, fall: 0.58, lift: -150, drift: 20, rot: 4 },
  //                                                      862  209.28
  { id: "nail", name: "Concrete Nail", asset: "/assets/hiranix/hero-products/concrete-nail-v2.png", x: 72.85, y: 60.169, w: 1.02, sx: 73.36, sy: 75.59, sw: 3.5, fall: 0.5, lift: -360, drift: 34, rot: 2 },
  //                                                                                                        733  146.35
  { id: "clip", name: "Cable Nail Clip", x: 74.64, y: 66.215, w: 6.444, sx: 77.86, sy: 77.23, sw: 8, fall: 0.5, lift: -250, drift: 62, rot: 7 },
  //                                                 738   92.41
  { id: "tie", name: "Nylon Cable Tie", asset: "/assets/hiranix/hero-products/nylon-cable-tie-v2.png", x: 79.8, y: 81.419, w: 11.36, sx: 85.47, sy: 83.15, sw: 10.8, fall: 0.44, lift: -120, drift: 90, rot: 6 },
  //                                                                                                           805   11.17
];

export function HiranixHero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const metalPedestal = useRef<HTMLSpanElement>(null);
  const metalProduct = useRef<HTMLDivElement>(null);
  const metalShadow = useRef<HTMLDivElement>(null);
  const spotlight = useRef<HTMLSpanElement>(null);
  const introTimeline = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const stageElement = stage.current;
    const pedestalElement = metalPedestal.current;
    const productElement = metalProduct.current;
    const shadowElement = metalShadow.current;
    const productImage = productElement?.querySelector<HTMLImageElement>("img");
    if (!stageElement || !pedestalElement || !productElement || !shadowElement || !productImage) return;

    let frame = 0;
    let visibleBottomInsetRatio = 0;

    const measureVisibleBottomFace = () => {
      if (!productImage.naturalWidth || !productImage.naturalHeight) return;

      const canvas = document.createElement("canvas");
      canvas.width = productImage.naturalWidth;
      canvas.height = productImage.naturalHeight;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;

      context.drawImage(productImage, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const startX = Math.floor(canvas.width * 0.3);
      const endX = Math.ceil(canvas.width * 0.7);
      let visibleBottomY = canvas.height - 1;

      outer: for (let y = canvas.height - 1; y >= 0; y -= 1) {
        for (let x = startX; x < endX; x += 1) {
          if (pixels[(y * canvas.width + x) * 4 + 3] > 24) {
            visibleBottomY = y;
            break outer;
          }
        }
      }

      visibleBottomInsetRatio = (canvas.height - 1 - visibleBottomY) / canvas.height;
    };

    const snapProductToPedestal = () => {
      const stageBounds = stageElement.getBoundingClientRect();
      const pedestalBounds = pedestalElement.getBoundingClientRect();
      if (!stageBounds.width || !stageBounds.height || !productElement.offsetWidth || !productImage.offsetHeight) return;

      // Convert the measured world-space pedestal surface back into the stage's
      // local coordinate system. The product keeps its authored scale and
      // perspective while its bottom-center pivot is locked to that surface.
      const scaleX = stageBounds.width / stageElement.offsetWidth;
      const scaleY = stageBounds.height / stageElement.offsetHeight;
      const pedestalCenterX = (pedestalBounds.left + pedestalBounds.width / 2 - stageBounds.left) / scaleX;
      const pedestalTopY = (pedestalBounds.top - stageBounds.top) / scaleY;
      const productLeft = pedestalCenterX - productElement.offsetWidth / 2;
      const visibleProductHeight = productImage.offsetHeight * (1 - visibleBottomInsetRatio);
      const productTop = pedestalTopY - visibleProductHeight;

      productElement.style.left = `${productLeft}px`;
      productElement.style.top = `${productTop}px`;
      shadowElement.style.left = `${pedestalCenterX}px`;
      shadowElement.style.top = `${pedestalTopY}px`;
    };

    const scheduleSnap = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(snapProductToPedestal);
    };

    const observer = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(scheduleSnap);
    observer?.observe(stageElement);
    observer?.observe(pedestalElement);
    observer?.observe(productElement);
    if (!observer) window.addEventListener("resize", scheduleSnap);

    if (productImage.complete) {
      measureVisibleBottomFace();
      scheduleSnap();
    }
    else productImage.addEventListener("load", scheduleSnap, { once: true });
    void productImage.decode?.().then(() => {
      measureVisibleBottomFace();
      scheduleSnap();
    }).catch(() => undefined);

    return () => {
      observer?.disconnect();
      if (!observer) window.removeEventListener("resize", scheduleSnap);
      productImage.removeEventListener("load", scheduleSnap);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!root.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const copyIn = (timeline: gsap.core.Timeline, at: number) => {
        timeline
          .from(".hx-h1 .line > span", { yPercent: 112, stagger: 0.1 }, at)
          .from(".hx-sub", { opacity: 0, y: 26 }, at + 0.35)
          .from(".hx-hero-actions", { opacity: 0, y: 26 }, at + 0.48);
      };

      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out", duration: 1.1 },
      });
      introTimeline.current = timeline;

      timeline
        .fromTo(".hx-sweep", { xPercent: -130 }, { xPercent: 130, duration: 1.6, ease: "power2.inOut" }, 0.1)
        .to(".hx-sweep", { opacity: 0, duration: 0.4 }, 1.4);

      DROPS.forEach((drop, index) => {
        const fallSelector = `.hx-drop-${drop.id} .hx-fall`;
        const shadowSelector = `.hx-shadow-${drop.id}`;
        const element = root.current?.querySelector<HTMLElement>(fallSelector);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const fromY = Math.min(-(rect.bottom + 80), -(rect.height + 160));
        const start = 0.35 + index * 0.15;
        const land = start + drop.fall;

        timeline
          .set(fallSelector, { opacity: 1 }, start)
          .fromTo(fallSelector, { y: fromY }, { y: 0, duration: drop.fall, ease: "power2.in" }, start)
          .to(fallSelector, { scaleY: 0.955, scaleX: 1.025, duration: 0.07, ease: "power1.out", transformOrigin: "50% 100%" }, land)
          .to(fallSelector, { scaleY: 1, scaleX: 1, duration: 0.32, ease: "power3.out" }, land + 0.07)
          .fromTo(shadowSelector, { opacity: 0, scaleX: 0.5 }, { opacity: 0.9, scaleX: 1, duration: drop.fall * 0.85, ease: "power2.in" }, start + drop.fall * 0.15)
          .to(shadowSelector, { opacity: 0.5, duration: 0.45, ease: "power2.out" }, land + 0.05);
      });

      copyIn(timeline, 0.35);

      const scrub = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.85,
        },
        defaults: { ease: "none" },
      });

      DROPS.forEach((drop) => {
        scrub
          .to(`.hx-drop-${drop.id}`, { y: drop.lift, x: drop.drift, rotation: drop.rot }, 0)
          .to(`.hx-shadow-${drop.id}`, { opacity: 0, duration: 0.25 }, 0);
      });
      scrub
        .to(".hx-copy", { yPercent: -26, opacity: 0, duration: 0.6 }, 0)
        .to(".hx-orbit", { rotate: 17, scale: 1.2, opacity: 0.68 }, 0)
        .to(".hx-scroll-progress", { scaleX: 1 }, 0);
    }, root);

    return () => {
      introTimeline.current = null;
      context.revert();
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let cancelled = false;
    const images = Array.from(root.current?.querySelectorAll("img") ?? []);
    const decoded = Promise.all(
      images.map((image) => (image.decode ? image.decode().catch(() => undefined) : Promise.resolve())),
    );
    // Do not let slower image decoding hold the value proposition off-screen.
    // The products may keep decoding, but the copy starts within one second.
    const timeout = new Promise((resolve) => window.setTimeout(resolve, 900));

    void Promise.race([decoded, timeout]).then(() => {
      if (cancelled) return;
      frame = window.requestAnimationFrame(() => introTimeline.current?.play(0));
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 901px)").matches) return;

    const light = spotlight.current;
    const lightX = light ? gsap.quickTo(light, "--mx", { duration: 0.7, ease: "power3" }) : undefined;
    const lightY = light ? gsap.quickTo(light, "--my", { duration: 0.7, ease: "power3" }) : undefined;

    const handlePointerMove = (event: PointerEvent) => {
      lightX?.(event.clientX);
      lightY?.(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <section ref={root} className="hx-top" id="top">
      <section className="hx-hero" aria-label="HIRANIX product introduction">
        <div className="hx-stagewrap">
          <div ref={stage} className="hx-stage">
            <img className="hx-plate" src="/assets/hiranix/hero-plate.webp" alt="" fetchPriority="high" decoding="async" />
            <span ref={metalPedestal} className="hx-pedestal-surface hx-pedestal-metal" aria-hidden="true" />
            {DROPS.map((drop) => (
              <div key={drop.id}>
                <div
                  ref={drop.id === "metal" ? metalShadow : undefined}
                  className={`hx-drop-shadow hx-shadow-${drop.id}`}
                  style={{ left: `${drop.sx}%`, top: `${drop.sy}%`, width: `${drop.sw}%` }}
                />
                <div
                  ref={drop.id === "metal" ? metalProduct : undefined}
                  className={`hx-drop hx-drop-${drop.id}`}
                  style={drop.id === "metal"
                    ? { width: `${drop.w}%` }
                    : { left: `${drop.x}%`, top: `${drop.y}%`, width: `${drop.w}%` }}
                >
                  <div className="hx-fall">
                    <img src={drop.asset ?? `/assets/hiranix/drop-${drop.id}.webp`} alt={drop.name} decoding="async" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hx-orbit" aria-hidden="true">
            <span />
            <span />
          </div>
          <span className="hx-sweep" />
        </div>

        <span ref={spotlight} className="hx-spotlight" aria-hidden="true" />
        <div className="hx-scrim" aria-hidden="true" />

        <div className="hx-copy">
          <h1 className="hx-h1">
            <span className="line"><span>Engineered for</span></span>
            <span className="line"><span className="accent">Every Fix.</span></span>
          </h1>
          <p className="hx-sub">Reliable electrical and hardware solutions built for lasting performance.</p>
          <div className="hx-hero-actions">
            <a
              href="https://play.google.com/store/apps/details?id=com.hinoveapp&hl=en_IN&pli=1"
              className="hx-pill hx-cta hx-cta-primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Hiranix from Google Play"
            >
              <GooglePlayLogo size={20} weight="fill" aria-hidden="true" />
              Google Play
            </a>
            <a
              href="https://apps.apple.com/in/app/hiranix/id6618135537"
              className="hx-pill hx-cta hx-cta-secondary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Hiranix from the App Store"
            >
              <AppleLogo size={20} weight="fill" aria-hidden="true" />
              App Store
            </a>
          </div>
        </div>

        <span className="hx-scroll-progress" aria-hidden="true" />
      </section>

      <a
        className="hx-mobile-quote"
        href="https://wa.me/917984462764"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Request a quote from HIRANIX on WhatsApp"
      >
        <WhatsappLogo size={21} weight="fill" aria-hidden="true" />
        <span>Get Quote</span>
      </a>
    </section>
  );
}
