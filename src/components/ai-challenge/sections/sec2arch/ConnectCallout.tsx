"use client";

import { v2Content } from "@/data/ai-challenge";

const c = v2Content.sec2.q4a.connect;

export default function ConnectCallout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "clamp(1rem, 2vw, 1.5rem) clamp(1rem, 2.5vw, 1.75rem)",
        background: "var(--upvest-accent-soft, #e7eaff)",
        border: "2px solid var(--upvest-accent, #4f5bff)",
        borderRadius: "0.75rem",
        boxShadow: "0 0 0 4px rgba(79,91,255,0.08), 0 4px 16px rgba(79,91,255,0.12)",
      }}
    >
      {/* Headline */}
      <h3
        style={{
          fontFamily: "var(--font-sans, sans-serif)",
          fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          color: "var(--upvest-accent, #4f5bff)",
          margin: 0,
        }}
      >
        {c.headline}
      </h3>

      {/* Body */}
      <p
        style={{
          fontFamily: "var(--font-sans, sans-serif)",
          fontSize: "clamp(0.75rem, 1.1vw, 0.9rem)",
          lineHeight: 1.55,
          color: "var(--upvest-ink, #0e1238)",
          margin: 0,
        }}
      >
        {c.body}
      </p>

      {/* Assumptions chips */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem",
          marginTop: "0.1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(0.58rem, 0.82vw, 0.68rem)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--upvest-accent, #4f5bff)",
            fontWeight: 600,
            opacity: 0.8,
          }}
        >
          Assumptions
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {c.assumptions.map((assumption, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontSize: "clamp(0.65rem, 0.92vw, 0.76rem)",
                lineHeight: 1.4,
                color: "var(--upvest-ink, #0e1238)",
                background: "var(--upvest-surface, #fff)",
                border: "1px solid rgba(79,91,255,0.3)",
                borderRadius: "0.35rem",
                padding: "0.3rem 0.65rem",
              }}
            >
              {assumption}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
