"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";
import { useDeck } from "../DeckController";

// ---------------------------------------------------------------------------
// Stagger animation: cards enter sequentially via CSS keyframes.
// All 3 are always in the DOM — opacity ends at 1, so reduced-motion is safe.
// The animation only "plays" when the slide is active (via the `playing` prop),
// keeping them at opacity:1 by default when the slide is inactive or reduced-motion.
// ---------------------------------------------------------------------------

const STAGGER_DELAY_S = 0.18; // seconds between each card

const keyframesId = "av2-assumption-enter";

// Inject keyframes once (idempotent)
function ensureKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(keyframesId)) return;
  const style = document.createElement("style");
  style.id = keyframesId;
  style.textContent = `
    @keyframes av2AssumptionEnter {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .av2-assumption-card { animation: none !important; opacity: 1 !important; transform: none !important; }
    }
  `;
  document.head.appendChild(style);
}

export default function Sec1AssumptionsSlide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const { activeIndex } = useDeck();
  const isActive = activeIndex === index;
  const assumptions = v2Content.sec1.assumptions;

  // Ensure keyframes exist on first render in the browser
  if (typeof document !== "undefined") {
    ensureKeyframes();
  }

  return (
    <Slide meta={meta} index={index} transition="crossfade">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "clamp(2rem, 6vw, 5rem) clamp(1.5rem, 8vw, 7rem)",
          background: "transparent",
        }}
      >
        {/* Kicker */}
        <p
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--upvest-accent)",
            marginBottom: "1rem",
            opacity: 0.9,
          }}
        >
          Before I answer
        </p>

        {/* Section label */}
        <h2
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(1.5rem, 3vw, 2.75rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--upvest-ink, #1a1a2e)",
            margin: "0 0 2.5rem",
            maxWidth: "28ch",
          }}
        >
          Three assumptions I&apos;m making explicit.
        </h2>

        {/* Assumption cards — all 3 always in DOM, full-width 3-column layout */}
        <ol
          aria-label="Assumptions"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "clamp(0.9rem, 1.8vw, 1.5rem)",
            width: "100%",
          }}
        >
          {assumptions.map((a, i) => (
            <li
              key={a.n}
              className="av2-assumption-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                background: "var(--upvest-surface, rgba(79,91,255,0.05))",
                border: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.2))",
                borderRadius: "0.625rem",
                padding: "clamp(1.25rem, 2vw, 1.75rem)",
                // Stagger animation — only runs when slide is active.
                // Default state is opacity:1 (visible) so inactive/reduced-motion works fine.
                animation: isActive
                  ? `av2AssumptionEnter 0.4s ease-out ${i * STAGGER_DELAY_S}s both`
                  : "none",
                opacity: isActive ? undefined : 1,
              }}
            >
              {/* Number badge */}
              <div
                aria-hidden="true"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "50%",
                  background: "var(--upvest-accent-soft, rgba(79,91,255,0.15))",
                  border: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.3))",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "clamp(0.7rem, 1vw, 0.82rem)",
                    fontWeight: 700,
                    color: "var(--upvest-accent)",
                    lineHeight: 1,
                  }}
                >
                  {a.n}
                </span>
              </div>

              {/* Content */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                    fontWeight: 600,
                    color: "var(--upvest-ink, #1a1a2e)",
                    lineHeight: 1.3,
                  }}
                >
                  {a.label}
                </span>
                <span
                  style={{
                    fontSize: "clamp(0.8rem, 1.2vw, 0.92rem)",
                    lineHeight: 1.6,
                    color: "var(--upvest-muted, #6b7280)",
                  }}
                >
                  {a.body}
                </span>
              </div>
            </li>
          ))}
        </ol>

        {/* Decorative rule */}
        <div
          style={{
            marginTop: "3rem",
            width: "3rem",
            height: "2px",
            background:
              "linear-gradient(90deg, var(--upvest-accent), transparent)",
            borderRadius: "1px",
          }}
        />
      </div>
    </Slide>
  );
}
