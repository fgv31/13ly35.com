"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

export default function Sec3QuestionsSlide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const c = v2Content.sec3.questions;

  return (
    <Slide meta={meta} index={index} transition="slide">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "clamp(1.25rem, 3vw, 2.25rem) clamp(1.5rem, 6vw, 5rem)",
          background: "transparent",
          gap: "1.5rem",
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
            margin: 0,
            opacity: 0.9,
          }}
        >
          {c.kicker}
        </p>

        {/* Testing + Prepare — side by side, full width */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "clamp(1rem, 2.5vw, 2rem)",
            width: "100%",
            alignItems: "stretch",
          }}
        >
          {/* Testing */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "clamp(0.62rem, 0.95vw, 0.74rem)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--upvest-accent)",
                opacity: 0.75,
                margin: 0,
              }}
            >
              Testing
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontSize: "clamp(0.88rem, 1.4vw, 1.05rem)",
                fontWeight: 500,
                lineHeight: 1.45,
                color: "var(--upvest-muted, #6b7280)",
                margin: 0,
              }}
            >
              {c.testing}
            </p>
          </div>

          {/* Prepare */}
          <div
            style={{
              padding: "0.9rem 1.25rem",
              borderLeft: "2px solid var(--upvest-accent-soft, rgba(79,91,255,0.35))",
              background: "var(--upvest-surface, rgba(79,91,255,0.04))",
              borderRadius: "0 4px 4px 0",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "clamp(0.6rem, 0.9vw, 0.72rem)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--upvest-accent)",
                opacity: 0.75,
                margin: "0 0 0.5rem 0",
              }}
            >
              Prepare
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
                lineHeight: 1.5,
                color: "var(--upvest-muted, #6b7280)",
                margin: 0,
              }}
            >
              {c.prepare}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            width: "100%",
            background:
              "linear-gradient(90deg, var(--upvest-accent-soft, rgba(79,91,255,0.25)), transparent)",
          }}
        />

        {/* Questions — full-width card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
            gap: "clamp(0.9rem, 1.8vw, 1.4rem)",
            width: "100%",
          }}
        >
          {c.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                background: "var(--upvest-surface, rgba(79,91,255,0.04))",
                border: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.2))",
                borderRadius: "0.625rem",
                padding: "clamp(1rem, 1.6vw, 1.4rem)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.62rem, 0.95vw, 0.74rem)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--upvest-accent)",
                  fontWeight: 700,
                }}
              >
                Q{i + 1}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
                  fontWeight: 600,
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                  color: "var(--upvest-ink, #1a1a2e)",
                  margin: 0,
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
