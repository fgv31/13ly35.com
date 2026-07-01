"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challengev2";
import { v2Content } from "@/data/ai-challengev2";

export default function Sec3Q2Slide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const c = v2Content.sec3.q2;

  return (
    <Slide meta={meta} index={index} transition="slide">
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
        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "var(--upvest-ink, #1a1a2e)",
            margin: "0 0 1rem 0",
            maxWidth: "60ch",
          }}
        >
          {c.headline}
        </h2>

        {/* What's different */}
        <p
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
            lineHeight: 1.6,
            color: "var(--upvest-muted, #6b7280)",
            margin: "0 0 2.5rem 0",
            maxWidth: "68ch",
          }}
        >
          {c.whatsDifferent}
        </p>

        {/* Compare table — stacks on mobile */}
        <div
          style={{
            maxWidth: "72ch",
            marginBottom: "2.5rem",
            borderRadius: "6px",
            overflow: "hidden",
            border: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.2))",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1.5fr) minmax(0,1.5fr)",
              gap: 0,
              background: "var(--upvest-accent-soft, rgba(79,91,255,0.1))",
            }}
          >
            {["Dimension", "Direct API", "MCP"].map((h) => (
              <div
                key={h}
                style={{
                  padding: "0.6rem 0.9rem",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.55rem, 0.9vw, 0.7rem)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--upvest-accent)",
                  fontWeight: 600,
                }}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {c.compare.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1.5fr) minmax(0,1.5fr)",
                gap: 0,
                borderTop: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.12))",
                background: i % 2 === 0 ? "transparent" : "var(--upvest-surface, rgba(79,91,255,0.03))",
              }}
            >
              <div
                style={{
                  padding: "0.55rem 0.9rem",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
                  color: "var(--upvest-ink, #1a1a2e)",
                  fontWeight: 500,
                }}
              >
                {row.dim}
              </div>
              <div
                style={{
                  padding: "0.55rem 0.9rem",
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.75rem, 1.1vw, 0.85rem)",
                  color: "var(--upvest-muted, #6b7280)",
                  lineHeight: 1.45,
                }}
              >
                {row.direct}
              </div>
              <div
                style={{
                  padding: "0.55rem 0.9rem",
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.75rem, 1.1vw, 0.85rem)",
                  color: "var(--upvest-muted, #6b7280)",
                  lineHeight: 1.45,
                }}
              >
                {row.mcp}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-friendly stacked fallback for table — only shows below 600px via CSS media-query alternative */}
        {/* Examples */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "72ch",
            marginBottom: "2rem",
          }}
        >
          {c.examples.map((ex, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1rem 1.25rem",
                borderLeft: `2px solid ${ex.winner === "Direct API" ? "var(--upvest-accent, #4f5bff)" : "var(--upvest-accent, #4f5bff)"}`,
                background: "var(--upvest-surface, rgba(79,91,255,0.04))",
                borderRadius: "0 4px 4px 0",
              }}
            >
              {/* Winner badge */}
              <span
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.55rem, 0.85vw, 0.68rem)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--upvest-accent)",
                  background: "var(--upvest-accent-soft, rgba(79,91,255,0.15))",
                  padding: "0.2em 0.6em",
                  borderRadius: "3px",
                  fontWeight: 600,
                }}
              >
                {ex.winner}
              </span>
              {/* Scenario */}
              <p
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
                  fontWeight: 600,
                  lineHeight: 1.4,
                  color: "var(--upvest-ink, #1a1a2e)",
                  margin: 0,
                }}
              >
                {ex.scenario}
              </p>
              {/* Why */}
              <p
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
                  lineHeight: 1.5,
                  color: "var(--upvest-muted, #6b7280)",
                  margin: 0,
                }}
              >
                {ex.why}
              </p>
            </div>
          ))}
        </div>

        {/* Honest take */}
        <div
          style={{
            maxWidth: "68ch",
            padding: "1rem 1.25rem",
            borderTop: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.2))",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
              lineHeight: 1.6,
              color: "var(--upvest-muted, #6b7280)",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            {c.honest}
          </p>
        </div>

        {/* Decorative rule */}
        <div
          style={{
            marginTop: "2.5rem",
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
