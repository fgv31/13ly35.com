"use client";

import Slide from "../Slide";
import Sec3Header from "./Sec3Header";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

export default function Sec3Q2Slide({ meta, index }: { meta: SlideMeta; index: number }) {
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
          padding: "clamp(1.25rem, 3vw, 2.25rem) clamp(1.5rem, 5vw, 4rem)",
          gap: "1.1rem",
        }}
      >
        <Sec3Header eyebrow={c.eyebrow} title={c.title} lead={c.whatsDifferent} />

        {/* Compare table — white card, full width */}
        <div
          style={{
            width: "100%",
            borderRadius: "0.6rem",
            overflow: "hidden",
            background: "var(--upvest-surface, #fff)",
            border: "1px solid rgba(79,91,255,0.18)",
            boxShadow: "0 6px 24px rgba(14,18,56,0.06)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) minmax(0,1.5fr) minmax(0,1.5fr)",
              background: "var(--upvest-accent-soft, rgba(79,91,255,0.1))",
            }}
          >
            {["Dimension", "Direct API", "MCP"].map((h) => (
              <div
                key={h}
                style={{
                  padding: "0.4rem 0.85rem",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.55rem, 0.85vw, 0.68rem)",
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

          {c.compare.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) minmax(0,1.5fr) minmax(0,1.5fr)",
                borderTop: "1px solid rgba(79,91,255,0.1)",
                background: i % 2 === 0 ? "transparent" : "rgba(79,91,255,0.03)",
              }}
            >
              <div
                style={{
                  padding: "0.32rem 0.85rem",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.58rem, 0.9vw, 0.72rem)",
                  color: "var(--upvest-ink, #0e1238)",
                  fontWeight: 500,
                }}
              >
                {row.dim}
              </div>
              <div
                style={{
                  padding: "0.32rem 0.85rem",
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.7rem, 1vw, 0.8rem)",
                  color: "var(--upvest-muted, #5b6079)",
                  lineHeight: 1.35,
                }}
              >
                {row.direct}
              </div>
              <div
                style={{
                  padding: "0.32rem 0.85rem",
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.7rem, 1vw, 0.8rem)",
                  color: "var(--upvest-muted, #5b6079)",
                  lineHeight: 1.35,
                }}
              >
                {row.mcp}
              </div>
            </div>
          ))}
        </div>

        {/* Examples — white cards side by side */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "0.9rem",
            width: "100%",
          }}
        >
          {c.examples.map((ex, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                padding: "0.85rem 1.05rem",
                background: "var(--upvest-surface, #fff)",
                borderRadius: "0.6rem",
                borderTop: "3px solid var(--upvest-accent, #4f5bff)",
                boxShadow: "0 6px 24px rgba(14,18,56,0.06)",
              }}
            >
              <span
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.55rem, 0.85vw, 0.66rem)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--upvest-accent)",
                  background: "var(--upvest-accent-soft, rgba(79,91,255,0.15))",
                  padding: "0.2em 0.6em",
                  borderRadius: "999px",
                  fontWeight: 700,
                }}
              >
                Winner · {ex.winner}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.82rem, 1.2vw, 0.95rem)",
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: "var(--upvest-ink, #0e1238)",
                  margin: 0,
                }}
              >
                {ex.scenario}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.74rem, 1.05vw, 0.85rem)",
                  lineHeight: 1.45,
                  color: "var(--upvest-muted, #5b6079)",
                  margin: 0,
                }}
              >
                {ex.why}
              </p>
            </div>
          ))}
        </div>

        {/* Honest take — decision rule */}
        <p
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(0.8rem, 1.2vw, 0.92rem)",
            lineHeight: 1.5,
            color: "var(--upvest-ink, #0e1238)",
            margin: 0,
            paddingLeft: "0.9rem",
            borderLeft: "3px solid var(--upvest-accent)",
          }}
        >
          {c.honest}
        </p>
      </div>
    </Slide>
  );
}
