"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challengev2";
import { v2Content } from "@/data/ai-challengev2";

export default function Sec3Q1Slide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const c = v2Content.sec3.q1;

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

        {/* Lead */}
        <p
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(0.95rem, 1.7vw, 1.15rem)",
            lineHeight: 1.6,
            color: "var(--upvest-muted, #6b7280)",
            margin: "0 0 2.5rem 0",
            maxWidth: "65ch",
          }}
        >
          {c.lead}
        </p>

        {/* Signals */}
        <div
          style={{
            maxWidth: "72ch",
            marginBottom: "2.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.6rem, 0.95vw, 0.75rem)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--upvest-accent)",
              opacity: 0.8,
              margin: "0 0 1rem 0",
            }}
          >
            Use MCP when
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {c.signals.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
                  gap: "0.75rem 1.25rem",
                  padding: "0.65rem 1rem",
                  background: "var(--upvest-surface, rgba(79,91,255,0.04))",
                  borderRadius: "4px",
                  borderLeft: "2px solid var(--upvest-accent-soft, rgba(79,91,255,0.3))",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontSize: "clamp(0.8rem, 1.3vw, 0.95rem)",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: "var(--upvest-ink, #1a1a2e)",
                    margin: 0,
                  }}
                >
                  {s.signal}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontSize: "clamp(0.75rem, 1.2vw, 0.88rem)",
                    lineHeight: 1.5,
                    color: "var(--upvest-muted, #6b7280)",
                    margin: 0,
                  }}
                >
                  {s.why}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            maxWidth: "72ch",
            marginBottom: "2rem",
            background:
              "linear-gradient(90deg, var(--upvest-accent-soft, rgba(79,91,255,0.25)), transparent)",
          }}
        />

        {/* Not when */}
        <div
          style={{
            maxWidth: "72ch",
            marginBottom: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.6rem, 0.95vw, 0.75rem)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--upvest-accent)",
              opacity: 0.8,
              margin: "0 0 1rem 0",
            }}
          >
            Not when
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {c.notWhen.map((nw, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1fr) minmax(0,1.2fr)",
                  gap: "0.5rem 1.25rem",
                  padding: "0.6rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.15))",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
                    fontWeight: 500,
                    lineHeight: 1.4,
                    color: "var(--upvest-ink, #1a1a2e)",
                    margin: 0,
                  }}
                >
                  {nw.dont}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontSize: "clamp(0.75rem, 1.1vw, 0.85rem)",
                    lineHeight: 1.5,
                    color: "var(--upvest-muted, #6b7280)",
                    margin: 0,
                  }}
                >
                  → {nw.instead}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Synthesis */}
        <div
          style={{
            maxWidth: "60ch",
            padding: "1rem 1.25rem",
            background: "var(--upvest-accent-soft, rgba(79,91,255,0.1))",
            borderRadius: "4px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
              fontWeight: 600,
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
              color: "var(--upvest-accent)",
              margin: 0,
            }}
          >
            {c.synthesis}
          </p>
        </div>

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
