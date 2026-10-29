"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const LETTERS = "HIRANIX".split("");

/**
 * The opening moment: the name rises letter by letter over a counter, a green
 * line fills, then the black screen lifts to reveal the hero. Shown once per
 * visit, on the home page only. The overlay is in the server HTML (hidden
 * unless the inline script in the layout marks this visit), so the hero never
 * flashes before it.
 */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  // The overlay is removed by React (never with el.remove()): code that deletes
  // a React-owned node by hand makes the next insert next to it throw, which
  // blanked the page on the first link click.
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    const html = document.documentElement;
    if (!el) return;
    if (!html.classList.contains("hx-intro-on")) {
      const frame = window.requestAnimationFrame(() => setGone(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const counter = el.querySelector<HTMLElement>("[data-counter]");
    const bar = el.querySelector<HTMLElement>("[data-bar]");
    const state = { n: 0 };
    const done = () => {
      try {
        sessionStorage.setItem("hx-intro", "1");
      } catch {}
      html.classList.remove("hx-intro-on");
      window.dispatchEvent(new Event("hx:intro-done"));
      setGone(true);
    };

    const tl = gsap.timeline({ onComplete: done });
    tl.fromTo(
      el.querySelectorAll("[data-letter] > span"),
      { yPercent: 115, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out", stagger: 0.07 },
      0.1,
    )
      .to(
        state,
        {
          n: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter) counter.textContent = String(Math.round(state.n)).padStart(3, "0");
          },
        },
        0,
      )
      .fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
      .to(el.querySelectorAll("[data-letter] > span"), { yPercent: -115, duration: 0.6, ease: "expo.in", stagger: 0.04 }, 1.55)
      .to(el, { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, 1.85);

    return () => {
      tl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className="hx-intro" aria-hidden="true">
      <p className="hx-intro-word">
        {LETTERS.map((letter, i) => (
          <span key={i} data-letter className="hx-intro-letter">
            <span>{letter}</span>
          </span>
        ))}
      </p>
      <div className="hx-intro-foot">
        <span className="hx-intro-tag">Engineered for every fix</span>
        <span data-counter className="hx-intro-count">000</span>
      </div>
      <span className="hx-intro-track">
        <span data-bar className="hx-intro-bar" />
      </span>
    </div>
  );
}
