"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Slide from "../Slide";
import Sec3Header from "./Sec3Header";
import { useDeck } from "../DeckController";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

const MONO = "var(--font-mono, monospace)";
const SANS = "var(--font-sans, sans-serif)";

/** Animated arrow connector between step cards. Hidden when reducedMotion. */
function StepArrow({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        color: "var(--upvest-accent, #4f5bff)",
        fontSize: "0.75rem",
        opacity: 0.55,
        paddingTop: "0.05rem",
      }}
    >
      ›
    </div>
  );
}

export default function Sec2Q4bSlide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const c = v2Content.sec2.q4b;
  const { reducedMotion } = useDeck();
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const { activeIndex } = useDeck();
  const isActive = activeIndex === index;
  const prevActiveRef = useRef<boolean | null>(null);

  useEffect(() => {
    const wasActive = prevActiveRef.current;
    prevActiveRef.current = isActive;

    // Kill any running timeline
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    if (reducedMotion) {
      // Snap all steps to visible immediately
      stepsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0 });
      });
      return;
    }

    if (isActive && wasActive !== null) {
      // Staggered reveal on slide entry
      const targets = stepsRef.current.filter(Boolean) as HTMLLIElement[];
      if (targets.length === 0) return;

      // Reset first so re-entry works
      gsap.set(targets, { opacity: 0, y: 16 });

      const tl = gsap.timeline();
      tl.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.32,
        ease: "power2.out",
        stagger: 0.055,
      });
      tlRef.current = tl;
    } else if (isActive && wasActive === null) {
      // First render while active — snap to visible
      stepsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0 });
      });
    } else {
      // Slide going inactive — reset for re-entry
      stepsRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 16 });
      });
    }
  }, [isActive, reducedMotion]);

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
    <Slide meta={meta} index={index} transition="slide">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          padding:
            "clamp(1.5rem, 3.5vw, 2.75rem) clamp(1.5rem, 5vw, 4rem)",
          gap: "0.75rem",
          background: "transparent",
        }}
      >
        {/* Header: eyebrow + title (no lead — intro rendered separately below) */}
        <Sec3Header eyebrow={c.eyebrow} title={c.title} />

        {/* Intro sentence */}
        <p
          style={{
            fontFamily: SANS,
            fontSize: "clamp(0.82rem, 1.25vw, 0.97rem)",
            lineHeight: 1.5,
            color: "var(--upvest-muted, #5b6079)",
            margin: 0,
            maxWidth: "92ch",
          }}
        >
          {c.intro}
        </p>

        {/* Legend: engine tag + automated vs human-in-the-loop */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.4rem 0.9rem",
            fontFamily: MONO,
            fontSize: "clamp(0.5rem, 0.72vw, 0.6rem)",
            color: "var(--upvest-muted, #5b6079)",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            <span
              style={{
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--upvest-accent, #4f5bff)",
                background: "var(--upvest-accent-soft, #e7eaff)",
                borderRadius: "0.25rem",
                padding: "0.1rem 0.3rem",
              }}
            >
              Auto
            </span>
            deterministic — n8n / Python, no human
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            <span
              style={{
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#fff",
                background: "var(--upvest-ink, #0e1238)",
                borderRadius: "0.25rem",
                padding: "0.1rem 0.3rem",
              }}
            >
              Human
            </span>
            judgment required — 4EC / AML
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            <span
              style={{
                fontWeight: 600,
                color: "var(--upvest-accent, #4f5bff)",
                background: "var(--upvest-bg, #f3f5fb)",
                border: "1px solid var(--upvest-accent-soft, #e7eaff)",
                borderRadius: "0.25rem",
                padding: "0.08rem 0.3rem",
              }}
            >
              tool
            </span>
            the engine running each step — no LLM anywhere
          </span>
        </div>

        {/* Step sequence */}
        <ol
          aria-label="End-to-end automated workflow steps"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            // 9 steps in exactly two rows (5 + 4) — never a lone orphan card.
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            alignItems: "stretch",
            gap: "0.35rem 0.3rem",
          }}
        >
          {/* q4b.steps — 9-step deterministic flow */}
          {c.steps.map((s, i) => (
            <li
              key={s.n}
              ref={(el) => { stepsRef.current[i] = el; }}
              style={{
                // Initial hidden state for animation; overridden by GSAP/reducedMotion
                opacity: reducedMotion || !isActive ? 1 : 0,
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch",
                gap: "0",
                minWidth: 0,
              }}
            >
              {/* Step card */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                  background: "var(--upvest-surface, #fff)",
                  border:
                    s.mode === "human"
                      ? "1px solid var(--upvest-ink, #0e1238)"
                      : "1px solid var(--upvest-accent-soft, #e7eaff)",
                  borderTop:
                    s.mode === "human"
                      ? "3px solid var(--upvest-ink, #0e1238)"
                      : "3px solid var(--upvest-accent, #4f5bff)",
                  borderRadius: "0.45rem",
                  padding: "0.4rem 0.55rem 0.5rem",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {/* Top row: step number + AUTO/HUMAN mode badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.3rem",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: MONO,
                      fontSize: "clamp(0.55rem, 0.8vw, 0.65rem)",
                      fontWeight: 700,
                      color: "var(--upvest-accent, #4f5bff)",
                      letterSpacing: "0.06em",
                      lineHeight: 1,
                    }}
                  >
                    {String(s.n).padStart(2, "0")}
                  </span>
                  {/* Mode badge — automated vs human-in-the-loop */}
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "clamp(0.46rem, 0.66vw, 0.55rem)",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      lineHeight: 1,
                      padding: "0.16rem 0.32rem",
                      borderRadius: "0.25rem",
                      color:
                        s.mode === "human"
                          ? "#fff"
                          : "var(--upvest-accent, #4f5bff)",
                      background:
                        s.mode === "human"
                          ? "var(--upvest-ink, #0e1238)"
                          : "var(--upvest-accent-soft, #e7eaff)",
                    }}
                  >
                    {s.mode === "human" ? "Human" : "Auto"}
                  </span>
                </div>
                {/* Step title */}
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: "clamp(0.62rem, 0.88vw, 0.74rem)",
                    fontWeight: 700,
                    color: "var(--upvest-ink, #0e1238)",
                    lineHeight: 1.25,
                  }}
                >
                  {s.title}
                </span>
                {/* Engine / tool tag — which deterministic component runs this step */}
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "clamp(0.48rem, 0.7vw, 0.57rem)",
                    fontWeight: 600,
                    lineHeight: 1.25,
                    letterSpacing: "0.01em",
                    color: "var(--upvest-accent, #4f5bff)",
                    background: "var(--upvest-bg, #f3f5fb)",
                    border: "1px solid var(--upvest-accent-soft, #e7eaff)",
                    borderRadius: "0.25rem",
                    padding: "0.14rem 0.3rem",
                    alignSelf: "flex-start",
                    maxWidth: "100%",
                  }}
                >
                  {s.engine}
                </span>
                {/* Step body */}
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: "clamp(0.56rem, 0.76vw, 0.65rem)",
                    lineHeight: 1.35,
                    color: "var(--upvest-muted, #5b6079)",
                  }}
                >
                  {s.body}
                </span>
              </div>

              {/* Connector arrow — between cards within a row only (5-col grid:
                  skip after the last card of row 1 and after the final card). */}
              {i < c.steps.length - 1 && i !== 4 && (
                <StepArrow reduced={reducedMotion} />
              )}
            </li>
          ))}
        </ol>

        {/* ── Agent B: append exception panel + principle below this comment ── */}

        {/* Exception panel — dark ink callout, matches Sec3Q3Slide dark-panel pattern */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            padding: "clamp(0.65rem, 1.4vw, 1rem) clamp(0.8rem, 1.8vw, 1.25rem)",
            background: "var(--upvest-ink, #0e1238)",
            borderRadius: "0.6rem",
            width: "100%",
          }}
        >
          {/* Exception title */}
          <span
            style={{
              fontFamily: MONO,
              fontSize: "clamp(0.58rem, 0.82vw, 0.68rem)",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--upvest-accent, #4f5bff)",
            }}
          >
            {c.exception.title}
          </span>
          {/* q4b.exception body */}
          <p
            style={{
              fontFamily: SANS,
              fontSize: "clamp(0.72rem, 1.05vw, 0.85rem)",
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.82)",
              margin: 0,
            }}
          >
            {c.exception.body}
          </p>
        </div>

        {/* q4b.principle line — accent left-rule, visually distinct */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.65rem",
            paddingLeft: "0.1rem",
          }}
        >
          {/* Accent rule */}
          <div
            aria-hidden="true"
            style={{
              width: "3px",
              alignSelf: "stretch",
              borderRadius: "2px",
              background: "var(--upvest-accent, #4f5bff)",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: SANS,
              fontSize: "clamp(0.72rem, 1.05vw, 0.85rem)",
              fontStyle: "italic",
              fontWeight: 600,
              lineHeight: 1.45,
              color: "var(--upvest-ink, #0e1238)",
              margin: 0,
            }}
          >
            {c.principle}
          </p>
        </div>
      </div>
    </Slide>
  );
}
