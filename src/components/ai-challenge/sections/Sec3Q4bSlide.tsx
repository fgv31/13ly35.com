"use client";

import Slide from "../Slide";
import Sec3Header from "./Sec3Header";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

export default function Sec3Q4bSlide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec3.q4b;

  return (
    <Slide meta={meta} index={index} transition="slide">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "clamp(1.25rem, 3vw, 2.25rem) clamp(1.5rem, 5vw, 4rem)",
          gap: "1.1rem",
        }}
      >
        <Sec3Header eyebrow={c.eyebrow} title={c.title} lead={c.intro} />

        {/* Design pillars — white cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "0.9rem",
            width: "100%",
          }}
        >
          {c.design.map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                padding: "0.95rem 1.1rem",
                background: "var(--upvest-surface, #fff)",
                borderRadius: "0.6rem",
                borderTop: "3px solid var(--upvest-accent)",
                boxShadow: "0 6px 24px rgba(14,18,56,0.06)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.6rem, 0.9vw, 0.72rem)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--upvest-accent)",
                  fontWeight: 700,
                }}
              >
                {d.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                  lineHeight: 1.45,
                  color: "var(--upvest-ink, #0e1238)",
                }}
              >
                {d.body}
              </span>
            </div>
          ))}
        </div>

        {/* Tradeoffs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.6rem, 0.92vw, 0.72rem)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--upvest-accent)",
              opacity: 0.85,
              margin: 0,
            }}
          >
            Tradeoffs I accept here
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "0.4rem 1.25rem",
            }}
          >
            {c.tradeoffs.map((t, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                  lineHeight: 1.4,
                  color: "var(--upvest-ink, #0e1238)",
                  margin: 0,
                  paddingLeft: "0.85rem",
                  borderLeft: "2px solid var(--upvest-accent-soft, rgba(79,91,255,0.4))",
                }}
              >
                {t}
              </p>
            ))}
          </div>
        </div>

        {/* Principle — dark hero */}
        <div
          style={{
            padding: "clamp(1rem, 2vw, 1.4rem)",
            background: "var(--upvest-ink, #0e1238)",
            borderRadius: "0.75rem",
            width: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
              fontWeight: 600,
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              color: "#fff",
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
