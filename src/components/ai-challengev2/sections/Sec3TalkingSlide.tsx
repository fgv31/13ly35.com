"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challengev2";
import { v2Content } from "@/data/ai-challengev2";

export default function Sec3TalkingSlide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec3.talking;

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
          {c.headline}
        </p>

        {/* Talking points */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.2rem, 2.5vw, 2rem)",
            maxWidth: "70ch",
          }}
        >
          {c.points.map((point, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {i > 0 && (
                <div
                  aria-hidden="true"
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(90deg, var(--upvest-accent-soft, rgba(79,91,255,0.25)), transparent)",
                  }}
                />
              )}
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "clamp(0.6rem, 0.85vw, 0.7rem)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--upvest-accent)",
                    opacity: 0.6,
                    flexShrink: 0,
                    paddingTop: "0.2em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontSize: "clamp(0.88rem, 1.5vw, 1.1rem)",
                    fontWeight: 400,
                    lineHeight: 1.55,
                    letterSpacing: "-0.01em",
                    color: "var(--upvest-ink, #1a1a2e)",
                    margin: 0,
                  }}
                >
                  {point}
                </p>
              </div>
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
