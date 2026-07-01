"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challengev2";
import { v2Content } from "@/data/ai-challengev2";

export default function Sec1QuestionsSlide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const c = v2Content.sec1.questions;

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

        {/* Questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
            maxWidth: "70ch",
          }}
        >
          {/* Q1 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <span
              aria-label="Question 1"
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "clamp(0.65rem, 1vw, 0.78rem)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--upvest-accent)",
                opacity: 0.75,
              }}
            >
              Q1
            </span>
            <p
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)",
                fontWeight: 600,
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
                color: "var(--upvest-ink, #1a1a2e)",
                margin: 0,
              }}
            >
              {c.q1}
            </p>
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

          {/* Q2 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <span
              aria-label="Question 2"
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "clamp(0.65rem, 1vw, 0.78rem)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--upvest-accent)",
                opacity: 0.75,
              }}
            >
              Q2
            </span>
            <p
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)",
                fontWeight: 600,
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
                color: "var(--upvest-ink, #1a1a2e)",
                margin: 0,
              }}
            >
              {c.q2}
            </p>
          </div>
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
