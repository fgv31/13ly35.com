"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challengev2";
import { v2Content } from "@/data/ai-challengev2";

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
            marginBottom: "2.5rem",
            opacity: 0.9,
          }}
        >
          {c.kicker}
        </p>

        {/* Context framing */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            maxWidth: "70ch",
            marginBottom: "2.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.65rem, 1vw, 0.78rem)",
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
              fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
              fontWeight: 500,
              lineHeight: 1.5,
              color: "var(--upvest-muted, #6b7280)",
              margin: 0,
            }}
          >
            {c.testing}
          </p>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            maxWidth: "70ch",
            marginBottom: "2.5rem",
            background:
              "linear-gradient(90deg, var(--upvest-accent-soft, rgba(79,91,255,0.25)), transparent)",
          }}
        />

        {/* Scenario */}
        <div
          style={{
            maxWidth: "70ch",
            marginBottom: "2.5rem",
            padding: "1.25rem 1.5rem",
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
              margin: "0 0 0.6rem 0",
            }}
          >
            Prepare
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
              lineHeight: 1.6,
              color: "var(--upvest-muted, #6b7280)",
              margin: 0,
            }}
          >
            {c.prepare}
          </p>
        </div>

        {/* Questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.25rem, 2.5vw, 2rem)",
            maxWidth: "70ch",
          }}
        >
          {c.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.65rem, 1vw, 0.78rem)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--upvest-accent)",
                  opacity: 0.75,
                }}
              >
                Q{i + 1}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)",
                  fontWeight: 600,
                  lineHeight: 1.4,
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

        {/* Decorative rule */}
        <div
          style={{
            marginTop: "3.5rem",
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
