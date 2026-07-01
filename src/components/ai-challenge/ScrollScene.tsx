"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "./GsapProvider";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScrollSceneProps {
  id: string;
  variant?: "light" | "tint" | "dark";
  animation?: "fade" | "rise" | "pin" | "stagger";
  className?: string;
  children: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ScrollScene({
  id,
  variant,
  animation,
  className,
  children,
}: ScrollSceneProps): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    // No animation without a DOM ref or when user prefers reduced motion.
    // In the reduced-motion path we render children at their final/visible
    // state — no opacity/transform tricks — so nothing to set up here.
    if (!sectionRef.current || reducedMotion) return;

    const scroller = document.querySelector(".ai-challenge-scope");
    if (!scroller) return;

    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      // ── Continuous cinematic enter → hold → exit, scrubbed to scroll ──────
      // One timeline spanning the section's full traversal of the viewport so a
      // single ScrollTrigger owns the content's opacity/transform (two separate
      // scrubbed tweens on the same property fight each other). The content
      // rises + fades in as the section arrives, holds while it owns the
      // viewport, then drifts + fades up as it leaves — one continuous film.
      const content = section.querySelectorAll<HTMLElement>(":scope > *");
      if (!content.length) return;

      // Optional stagger targets for the *enter* (e.g. arc cards).
      const staggerTargets =
        animation === "stagger"
          ? section.querySelectorAll<HTMLElement>("[data-stagger]")
          : null;
      const enterTargets =
        staggerTargets && staggerTargets.length ? staggerTargets : content;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          scroller,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      tl.fromTo(
        enterTargets,
        { opacity: 0, y: 64 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 1,
          stagger: staggerTargets && staggerTargets.length ? 0.12 : 0,
        }
      )
        .to(content, { duration: 1.3 }) // hold while the section owns the viewport
        .to(content, {
          opacity: 0,
          y: -56,
          ease: "power1.in",
          duration: 1,
        });
    }, section);

    return () => ctx.revert();
  }, [animation, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-variant={variant}
      className={className}
    >
      {children}
    </section>
  );
}
