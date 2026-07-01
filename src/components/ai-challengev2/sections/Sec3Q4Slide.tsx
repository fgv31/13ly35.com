"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challengev2";
import { v2Content } from "@/data/ai-challengev2";

export default function Sec3Q4Slide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec3.q4;

  return (
    <Slide meta={meta} index={index} transition="slide">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          minHeight: "100vh",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 8vw, 7rem)",
          background: "transparent",
          gap: "clamp(1.5rem, 2.5vw, 2rem)",
        }}
      >
        {/* Headline */}
        <p
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--upvest-accent)",
            opacity: 0.9,
            margin: 0,
          }}
        >
          {c.headline}
        </p>

        {/* Preamble */}
        <p
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
            lineHeight: 1.6,
            color: "var(--upvest-muted, #5a5a7a)",
            maxWidth: "80ch",
            margin: 0,
          }}
        >
          {c.preamble}
        </p>

        {/* ── Regulatory map ── */}
        <section aria-label="Regulatory map">
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.58rem, 0.85vw, 0.7rem)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--upvest-accent)",
              opacity: 0.75,
              display: "block",
              marginBottom: "0.6rem",
            }}
          >
            Regulatory map
          </span>

          {/* Header row */}
          <div
            aria-hidden="true"
            style={{
              display: "grid",
              gridTemplateColumns: "6rem 1fr 1fr",
              gap: "0.75rem",
              paddingBottom: "0.4rem",
              borderBottom: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.25))",
              marginBottom: "0.4rem",
            }}
          >
            {["Regulation", "Requirement", "Example risk"].map((h) => (
              <span
                key={h}
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.55rem, 0.78vw, 0.65rem)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--upvest-accent)",
                  opacity: 0.6,
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Data rows */}
          {c.regs.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "6rem 1fr 1fr",
                gap: "0.75rem",
                padding: "0.45rem 0",
                borderBottom:
                  i < c.regs.length - 1
                    ? "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.12))"
                    : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.65rem, 0.9vw, 0.75rem)",
                  fontWeight: 600,
                  color: "var(--upvest-accent)",
                  letterSpacing: "0.04em",
                }}
              >
                {row.reg}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.68rem, 0.95vw, 0.78rem)",
                  lineHeight: 1.45,
                  color: "var(--upvest-ink, #1a1a2e)",
                }}
              >
                {row.requirement}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.65rem, 0.9vw, 0.75rem)",
                  lineHeight: 1.45,
                  color: "var(--upvest-muted, #5a5a7a)",
                }}
              >
                {row.example}
              </span>
            </div>
          ))}
        </section>

        {/* ── Two-column: Risks + Design pillars ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(1rem, 2.5vw, 2rem)",
          }}
        >
          {/* Risks */}
          <section aria-label="Key risks">
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "clamp(0.58rem, 0.85vw, 0.7rem)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--upvest-accent)",
                opacity: 0.75,
                display: "block",
                marginBottom: "0.6rem",
              }}
            >
              Key risks
            </span>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {c.risks.map((r, i) => (
                <li key={i} style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-sans, sans-serif)",
                      fontSize: "clamp(0.68rem, 0.95vw, 0.78rem)",
                      fontWeight: 600,
                      color: "var(--upvest-ink, #1a1a2e)",
                    }}
                  >
                    {r.risk}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans, sans-serif)",
                      fontSize: "clamp(0.62rem, 0.88vw, 0.72rem)",
                      lineHeight: 1.45,
                      color: "var(--upvest-muted, #5a5a7a)",
                    }}
                  >
                    {r.why}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Design pillars */}
          <section aria-label="Design for">
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "clamp(0.58rem, 0.85vw, 0.7rem)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--upvest-accent)",
                opacity: 0.75,
                display: "block",
                marginBottom: "0.6rem",
              }}
            >
              Design from day one
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {(
                [
                  { label: "Data sensitivity", body: c.design.sensitivity },
                  { label: "Access controls", body: c.design.access },
                  { label: "Auditability", body: c.design.audit },
                ] as const
              ).map(({ label, body }) => (
                <div
                  key={label}
                  style={{
                    paddingLeft: "0.85rem",
                    borderLeft: "2px solid var(--upvest-accent-soft, rgba(79,91,255,0.25))",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.15rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "clamp(0.6rem, 0.82vw, 0.68rem)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--upvest-accent)",
                      opacity: 0.8,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans, sans-serif)",
                      fontSize: "clamp(0.65rem, 0.9vw, 0.75rem)",
                      lineHeight: 1.5,
                      color: "var(--upvest-ink, #1a1a2e)",
                    }}
                  >
                    {body}
                  </span>
                </div>
              ))}
            </div>

            {/* Tradeoffs */}
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "clamp(0.58rem, 0.85vw, 0.7rem)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--upvest-accent)",
                opacity: 0.75,
                display: "block",
                marginTop: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              Tradeoffs accepted
            </span>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              {c.tradeoffs.map((t, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontSize: "clamp(0.62rem, 0.88vw, 0.72rem)",
                    lineHeight: 1.45,
                    color: "var(--upvest-muted, #5a5a7a)",
                    paddingLeft: "0.85rem",
                    borderLeft:
                      "2px solid var(--upvest-accent-soft, rgba(79,91,255,0.25))",
                  }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, var(--upvest-accent-soft, rgba(79,91,255,0.25)), transparent)",
          }}
        />

        {/* Principle */}
        <p
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(0.78rem, 1.2vw, 0.95rem)",
            letterSpacing: "0.04em",
            lineHeight: 1.5,
            color: "var(--upvest-accent)",
            margin: 0,
            maxWidth: "72ch",
          }}
        >
          {c.principle}
        </p>
      </div>
    </Slide>
  );
}
