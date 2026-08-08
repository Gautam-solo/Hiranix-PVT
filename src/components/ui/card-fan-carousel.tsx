"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

import styles from "./card-fan-carousel.module.css";

gsap.registerPlugin(Observer);

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
}

interface CardFanCarouselProps {
  cards: CardItem[];
  /** Cards on the fan at once. Forced to an odd number so it stays symmetric;
      any beyond this paginate through swipe or the dot controls. */
  maxVisible?: number;
  className?: string;
}

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7, scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0, scale: 1.0, x: 0, y: 0.0, zIndex: 10 },
  { rot: 7, scale: 0.9346, x: 11, y: 1.3, zIndex: 3 },
  { rot: 14, scale: 0.8498, x: 22, y: 4.0, zIndex: 2 },
  { rot: 21, scale: 0.7756, x: 30, y: 7.3, zIndex: 1 },
];

/** Scales the x-offsets so the fan fits narrower viewports. */
function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1.0;
}

/**
 * Returns a multiplier (0..1] that scales y-offsets and entry animation
 * distances when the viewport is too short for the ideal layout height.
 * The ideal heights match the stage heights in the stylesheet.
 */
function getHeightMultiplier(width: number) {
  let idealPx: number;
  if (width < 480) idealPx = 29 * 16;
  else if (width < 640) idealPx = 32.5 * 16;
  else if (width < 768) idealPx = 34.5 * 16;
  else if (width < 1024) idealPx = 38 * 16;
  else idealPx = 41 * 16;

  const available = window.innerHeight * 0.7;
  return available >= idealPx ? 1 : available / idealPx;
}

/**
 * The seven hand-tuned positions are used whenever the fan is seven wide;
 * any other width is derived on the same curve so it stays symmetric — taking
 * the first N of the table would lean the whole fan to one side.
 */
function getSlotConfig(slotCount: number, slot: number) {
  if (slotCount === FAN_POSITIONS.length) return FAN_POSITIONS[slot];

  const center = slotCount >> 1;
  const distance = center > 0 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);

  return {
    rot: distance * 21,
    scale: 1.0 - 0.2244 * absDistance * absDistance,
    x: distance * 30,
    y: absDistance * absDistance * 7.3,
    zIndex: 10 - Math.abs(slot - center),
  };
}

export default function CardFanCarousel({
  cards,
  maxVisible = 7,
  className,
}: CardFanCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());

  const totalCards = cards.length;
  // Even fans have no middle card to sit at rotation 0.
  const visibleSlots = Math.max(3, maxVisible % 2 === 0 ? maxVisible - 1 : maxVisible);
  const half = visibleSlots >> 1;
  const needsPagination = totalCards > visibleSlots;
  const [centerIndex, setCenterIndex] = useState(
    needsPagination ? half : totalCards >> 1,
  );

  const getVisibleMap = useCallback(
    (center: number) => {
      const map = new Map<number, number>();
      if (!needsPagination) {
        cards.forEach((_, index) => map.set(index, index));
        return map;
      }
      for (let slot = 0; slot < visibleSlots; slot++) {
        map.set(
          (((center + slot - half) % totalCards) + totalCards) % totalCards,
          slot,
        );
      }
      return map;
    },
    [cards, half, needsPagination, totalCards, visibleSlots],
  );

  const cycle = useCallback(
    (direction: "left" | "right", steps = 1) => {
      if (isAnimating.current || !needsPagination) return;
      isAnimating.current = true;
      directionRef.current = direction;
      setCenterIndex((prev) =>
        direction === "right"
          ? (prev + steps) % totalCards
          : (prev - steps + totalCards * steps) % totalCards,
      );
    },
    [needsPagination, totalCards],
  );

  const selectCard = useCallback(
    (index: number) => {
      if (isAnimating.current || index === centerIndex) return;
      directionRef.current = index > centerIndex ? "right" : "left";
      isAnimating.current = true;
      setCenterIndex(index);
    },
    [centerIndex],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;

    const cardElements = Array.from(
      container.querySelectorAll<HTMLElement>(`.${styles.fanCard}`),
    );
    if (!cardElements.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    /* Everything below keeps its choreography; on reduced motion the clock is
       simply set to zero, so cards arrive in place instead of not at all. */
    const seconds = (value: number) => (reducedMotion ? 0 : value);

    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const slotCount = needsPagination ? visibleSlots : totalCards;
    const config = (slot: number) => getSlotConfig(slotCount, slot);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card, {
            x: 0,
            y: `${12 * hMult}rem`,
            rotation: 0,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: seconds(1.2),
            ease: "elastic.out(1.05,.78)",
            delay: seconds(0.2 + slot * 0.06),
            onComplete: onCardDone,
          });
        } else if (!wasVisible) {
          const enterX = direction === "right" ? 14 : -14;
          const directionalDelay =
            direction === "right" ? slot * 0.035 : (slotCount - 1 - slot) * 0.035;
          gsap.set(card, {
            x: `${enterX}rem`,
            y: `${y * hMult}rem`,
            rotation: direction === "right" ? 14 : -14,
            scale: 0.8,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: seconds(0.88),
            delay: seconds(directionalDelay),
            ease: "power4.out",
            overwrite: "auto",
            onComplete: onCardDone,
          });
        } else {
          const directionalDelay =
            direction === "right" ? slot * 0.025 : (slotCount - 1 - slot) * 0.025;
          gsap.to(card, {
            ...target,
            duration: seconds(0.82),
            delay: seconds(directionalDelay),
            ease: "power3.inOut",
            overwrite: "auto",
            onComplete: onCardDone,
          });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -14 : 14;
        gsap.to(card, {
          x: `${exitX}rem`,
          opacity: 0,
          scale: 0.8,
          rotation: direction === "right" ? -14 : 14,
          duration: seconds(0.58),
          ease: "power3.in",
          overwrite: "auto",
          zIndex: 0,
        });
      } else if (isFirstMount) {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    /* ── Hover interactions ── */
    const visibleEntries: { el: HTMLElement; slot: number }[] = [];
    cardElements.forEach((el, index) => {
      const slot = visibleMap.get(index);
      if (slot !== undefined) visibleEntries.push({ el, slot });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    let activeSlot: number | null = null;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    const centerSlot = visibleEntries.length >> 1;

    const updateHoverLayout = (hoveredSlot: number | null) => {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            targetY -= 2.5 * hM;
            targetScale *= 1.08;
          } else {
            const normalized =
              centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const pushStrength =
              8 *
              (1 - Math.abs(normalized)) *
              (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += pushStrength * mult;
              targetRot += 3 / (distance + 1);
            }

            if (slot === visibleEntries.length - 1 && hoveredSlot < centerSlot)
              targetY -= 1 * hM;
            if (slot === 0 && hoveredSlot > centerSlot) targetY -= 1 * hM;
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02;
        }

        gsap.to(el, {
          x: `${targetX}rem`,
          y: `${targetY}rem`,
          rotation: targetRot,
          scale: targetScale,
          duration: seconds(0.5),
          delay: seconds(delay),
          ease: "elastic.out(1,.75)",
          overwrite: "auto",
        });
        gsap.set(el, { zIndex: base.zIndex });
      });
    };

    const enterHandlers = visibleEntries.map(({ el, slot }) => {
      const handler = () => {
        if (isAnimating.current) return;
        if (leaveTimer) {
          clearTimeout(leaveTimer);
          leaveTimer = null;
        }
        if (activeSlot !== slot) {
          activeSlot = slot;
          updateHoverLayout(slot);
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
        updateHoverLayout(null);
      }, 50);
    };
    container.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => {
      if (!isAnimating.current) updateHoverLayout(activeSlot);
    };
    window.addEventListener("resize", onResize);

    return () => {
      enterHandlers.forEach(({ el, handler }) =>
        el.removeEventListener("mouseenter", handler),
      );
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
      gsap.killTweensOf(cardElements);
    };
  }, [centerIndex, getVisibleMap, needsPagination, totalCards, visibleSlots]);

  /* Observer resolves the gesture without translating the stage itself. The
     fan stays anchored while the individual cards animate between slots. */
  const suppressClick = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !needsPagination) return;

    const observer = Observer.create({
      target: container,
      type: "touch,pointer",
      lockAxis: true,
      dragMinimum: 12,
      tolerance: 8,
      ignore: `.${styles.dots}`,
      onDragEnd: (self) => {
        if (self.x === undefined || self.startX === undefined) return;
        const distance = self.x - self.startX;
        if (self.axis !== "x" || Math.abs(distance) < 40) return;

        suppressClick.current = true;
        const maxSteps = Math.min(8, totalCards - 1);
        const velocitySteps = Math.round(Math.abs(self.velocityX) / 900);
        const distanceSteps = Math.round(Math.abs(distance) / 70);
        const steps = Math.min(
          maxSteps,
          Math.max(5, distanceSteps + velocitySteps),
        );

        cycle(distance < 0 ? "right" : "left", steps);
      },
    });

    return () => observer.kill();
  }, [cycle, needsPagination, totalCards]);

  if (!totalCards) return null;

  return (
    <div className={`${styles.section}${className ? ` ${className}` : ""}`}>
      <div
        ref={containerRef}
        className={styles.fanLayout}
        onClickCapture={(event) => {
          if (!suppressClick.current) return;
          event.preventDefault();
          event.stopPropagation();
          suppressClick.current = false;
        }}
      >
        {cards.map((card) => {
          const image = (
            /* eslint-disable-next-line @next/next/no-img-element -- the
               carousel takes arbitrary image URLs, including remote ones, so
               it cannot assume next/image's loader is configured for them. */
            <img
              src={card.imgUrl}
              alt={card.alt ?? ""}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          );

          return card.linkUrl ? (
            <a
              key={card.imgUrl}
              className={styles.fanCard}
              href={card.linkUrl}
              target={card.linkUrl.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              {image}
            </a>
          ) : (
            <div key={card.imgUrl} className={styles.fanCard}>
              {image}
            </div>
          );
        })}
      </div>

      {needsPagination && (
        <div className={styles.controls} aria-label="Factory photograph navigation">
          <div className={styles.dots}>
            {cards.map((card, index) => (
              <button
                key={card.imgUrl}
                type="button"
                data-active={index === centerIndex}
                aria-label={`Show photograph ${index + 1}`}
                aria-current={index === centerIndex ? "true" : undefined}
                onClick={() => selectCard(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
