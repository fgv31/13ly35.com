"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useDeck } from "./DeckController";
import type { SlideMeta } from "@/data/ai-challengev2";

export interface SlideProps {
  meta: SlideMeta;
  index: number;
}

type Transition = "crossfade" | "slide" | "scale";

// ---------------------------------------------------------------------------
// Timeline shapes per transition
// ---------------------------------------------------------------------------
// crossfade — pure opacity, subtle y nudge
//   enter: opacity 0→1, y 48→0
//   exit:  opacity 1→0, y 0→-40
//
// slide — larger x/y arc (horizontal bias)
//   enter: opacity 0→1, x -80→0, y 24→0
//   exit:  opacity 1→0, x 0→80, y 0→-16
//
// scale — crossfade + scale tween
//   enter: opacity 0→1, y 32→0, scale 0.96→1
//   exit:  opacity 1→0, y 0→-32, scale 1→1.04

function buildEnter(
  target: Element,
  transition: Transition,
  duration: number,
): gsap.core.Timeline {
  const tl = gsap.timeline();

  if (transition === "crossfade") {
    tl.fromTo(
      target,
      { opacity: 0, y: 48, x: 0, scale: 1 },
      { opacity: 1, y: 0, x: 0, scale: 1, duration, ease: "power2.out" },
    );
  } else if (transition === "slide") {
    tl.fromTo(
      target,
      { opacity: 0, x: -80, y: 24, scale: 1 },
      { opacity: 1, x: 0, y: 0, scale: 1, duration, ease: "power2.out" },
    );
  } else {
    // scale
    tl.fromTo(
      target,
      { opacity: 0, y: 32, x: 0, scale: 0.96 },
      { opacity: 1, y: 0, x: 0, scale: 1, duration, ease: "power2.out" },
    );
  }

  return tl;
}

function buildExit(
  target: Element,
  transition: Transition,
  duration: number,
): gsap.core.Timeline {
  const tl = gsap.timeline();

  if (transition === "crossfade") {
    tl.to(target, { opacity: 0, y: -40, x: 0, scale: 1, duration, ease: "power1.in" });
  } else if (transition === "slide") {
    tl.to(target, { opacity: 0, x: 80, y: -16, scale: 1, duration, ease: "power1.in" });
  } else {
    // scale
    tl.to(target, { opacity: 0, y: -32, x: 0, scale: 1.04, duration, ease: "power1.in" });
  }

  return tl;
}

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------
export default function Slide({
  meta,
  index,
  children,
  transition = "crossfade",
}: SlideProps & { children: React.ReactNode; transition?: Transition }) {
  const { activeIndex, reducedMotion } = useDeck();
  const isActive = activeIndex === index;

  const contentRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Track previous active state to detect transitions
  const prevActiveRef = useRef<boolean | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const wasActive = prevActiveRef.current;
    prevActiveRef.current = isActive;

    // First render: skip animation, just set final state
    if (wasActive === null) {
      if (isActive) {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
      }
      // Inactive slides are hidden via CSS (display:none); no GSAP needed
      return;
    }

    // Kill any running tween before starting a new one
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    if (reducedMotion) {
      // No animation — snap to final visible state
      if (isActive) {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
      }
      return;
    }

    if (isActive) {
      // Slide is becoming active — run enter timeline
      gsap.set(el, { clearProps: "all" }); // reset any exit residue
      const tl = buildEnter(el, transition, 0.45);
      tlRef.current = tl;
    } else if (wasActive) {
      // Slide is leaving active — run exit timeline
      const tl = buildExit(el, transition, 0.3);
      tlRef.current = tl;
    }
  }, [isActive, reducedMotion, transition]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, []);

  return (
    <section
      aria-hidden={!isActive}
      data-slide-id={meta.id}
      data-slide-index={index}
      style={{
        minHeight: "100vh",
        display: isActive ? "flex" : "none",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
      className={`av2-slide av2-slide--${meta.variant}`}
    >
      <div
        ref={contentRef}
        style={{
          // In reduced-motion or on initial render, ensure content is visible.
          // GSAP will override this on animated runs.
          opacity: reducedMotion || isActive ? 1 : 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </section>
  );
}
