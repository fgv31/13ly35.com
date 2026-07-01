"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./GsapProvider";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StageSceneProps {
  id: string;
  variant?: "light" | "tint" | "dark";
  steps: number; // >= 2
  className?: string;
  /**
   * Render-prop. `progress` is the continuous 0..1 scroll position through the
   * pinned stage — drive cross-dissolves off this for smooth transitions.
   * `step` is the snapped integer (0..steps-1) for discrete logic.
   * `stacked` is true only in the reduced-motion / mobile fallback, where every
   * state must render in normal flow (no absolute layering, all visible).
   */
  children: (api: {
    step: number;
    progress: number;
    stacked: boolean;
  }) => React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StageScene({
  id,
  variant,
  steps,
  className,
  children,
}: StageSceneProps): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  // step: INTEGER 0..steps-1; progress: FLOAT 0..1
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Detect narrow viewport post-hydration to avoid SSR/client mismatch.
  // Start false (matches SSR); flip async so hydration sees the same tree.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // queueMicrotask: setState fires AFTER React commits the hydration pass
    queueMicrotask(() => setIsMobile(window.innerWidth <= 640));
  }, []);

  useLayoutEffect(() => {
    // Reduced-motion OR mobile → stacked fallback; no pin needed
    if (reducedMotion || isMobile) return;
    if (!sectionRef.current) return;

    const scroller = document.querySelector(".ai-challenge-scope");
    if (!scroller) return;

    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        scroller,
        start: "top top",
        // (steps-1) viewports of travel so each snap lands exactly one
        // viewport apart — matches SlideControls' `base + k*innerHeight` stops.
        end: "+=" + (steps - 1) * 100 + "%",
        pin: true,
        pinSpacing: true,
        // No snap — free continuous scrub so scenes cross-dissolve and the user
        // can rest anywhere in a transition. Nav buttons still target clean stops.
        scrub: true,
        onUpdate(self) {
          const p = self.progress;
          setProgress(p);
          setStep(Math.round(p * (steps - 1)));
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile, steps]);

  // ── Reduced-motion / mobile fallback ─────────────────────────────────────
  // Render ALL steps stacked & visible. Never leave a step hidden.
  if (reducedMotion || isMobile) {
    return (
      <section
        id={id}
        data-variant={variant}
        data-stage-steps={steps}
        className={className}
      >
        {children({ step: steps - 1, progress: 1, stacked: true })}
      </section>
    );
  }

  // ── Animated path ─────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id={id}
      data-variant={variant}
      data-stage-steps={steps}
      className={className}
    >
      {children({ step, progress, stacked: false })}
    </section>
  );
}
