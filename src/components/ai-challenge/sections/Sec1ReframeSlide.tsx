"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

export default function Sec1ReframeSlide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const r = v2Content.sec1.reframe;

  return (
    <Slide meta={meta} index={index} transition="slide">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 7vw, 6rem)",
        }}
      >
        {/* Kicker */}
        <p
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--upvest-accent)",
            marginBottom: "1rem",
            opacity: 0.9,
          }}
        >
          Section I — Reframe
        </p>

        {/* Setup — context paragraph */}
        <p
          style={{
            fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
            lineHeight: 1.65,
            color: "var(--upvest-muted, #9898b8)",
            maxWidth: "72ch",
            margin: "0 0 2rem",
          }}
        >
          {r.setup}
        </p>

        {/* The big question — prominent, full-width banner */}
        <div
          style={{
            width: "100%",
            background: "var(--upvest-surface, #ffffff)",
            border: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.3))",
            borderLeft: "4px solid var(--upvest-accent)",
            borderRadius: "0.75rem",
            padding: "clamp(1.25rem, 2.5vw, 2rem) clamp(1.25rem, 3vw, 2.5rem)",
            marginBottom: "2.5rem",
            boxShadow: "0 6px 28px rgba(14,18,56,0.1)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.6rem, 0.9vw, 0.72rem)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--upvest-accent)",
              marginBottom: "0.75rem",
              fontWeight: 700,
            }}
          >
            The bigger question
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(1.5rem, 3.6vw, 2.9rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--upvest-ink, #0e1238)",
              margin: 0,
            }}
          >
            {r.bigQuestion}
          </h2>
        </div>

        {/* Moves */}
        <div style={{ marginBottom: "2rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.6rem, 0.9vw, 0.72rem)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--upvest-accent)",
              marginBottom: "0.875rem",
              opacity: 0.85,
            }}
          >
            Three moves
          </p>
          <ol
            aria-label="Strategic moves"
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {r.moves.map((move, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.875rem",
                  background: "var(--upvest-surface, rgba(255,255,255,0.04))",
                  border: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.18))",
                  borderRadius: "0.5rem",
                  padding: "0.85rem 1.1rem",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "clamp(0.68rem, 1.1vw, 0.8rem)",
                    fontWeight: 700,
                    color: "var(--upvest-accent)",
                    flexShrink: 0,
                    lineHeight: 1.6,
                    minWidth: "1.4ch",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
                    lineHeight: 1.55,
                    color: "var(--upvest-ink, #f0f0f5)",
                  }}
                >
                  {move}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Enabler + Caution — side by side on larger screens */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "clamp(0.75rem, 2vw, 1.25rem)",
          }}
        >
          {/* Enabler */}
          <div
            style={{
              background: "rgba(39,196,166,0.06)",
              border: "1px solid rgba(39,196,166,0.25)",
              borderRadius: "0.5rem",
              padding: "1rem 1.25rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#27c4a6",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              Enabler
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(0.8rem, 1.25vw, 0.92rem)",
                lineHeight: 1.6,
                color: "var(--upvest-ink, #f0f0f5)",
              }}
            >
              {r.enabler}
            </p>
          </div>

          {/* Caution */}
          <div
            style={{
              background: "rgba(255,122,89,0.06)",
              border: "1px solid rgba(255,122,89,0.22)",
              borderRadius: "0.5rem",
              padding: "1rem 1.25rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#ff7a59",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              Caution
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(0.8rem, 1.25vw, 0.92rem)",
                lineHeight: 1.6,
                color: "var(--upvest-ink, #f0f0f5)",
              }}
            >
              {r.caution}
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
}
