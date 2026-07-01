"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challengev2";
import { v2Content } from "@/data/ai-challengev2";

export default function FailFastSlide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const c = v2Content.failfast;

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
            marginBottom: "1.25rem",
            opacity: 0.9,
          }}
        >
          {c.kicker}
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#eef1fc",
            margin: "0 0 1.5rem",
            textShadow: "0 2px 32px rgba(0,0,0,0.4)",
            maxWidth: "22ch",
          }}
        >
          {c.headline}
        </h2>

        {/* Body */}
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)",
            lineHeight: 1.65,
            color: "rgba(238,241,252,0.74)",
            maxWidth: "58ch",
            margin: "0 0 3rem",
          }}
        >
          {c.body}
        </p>

        {/* Beat sequence — horizontal scrollable flow on small, row on large */}
        <ol
          aria-label="How fail-fast works in practice"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(0.75rem, 2vw, 1.25rem)",
          }}
        >
          {c.beats.map((beat, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                background: "var(--upvest-surface, rgba(255,255,255,0.04))",
                border: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.2))",
                borderRadius: "0.5rem",
                padding: "1rem 1.25rem",
                flex: "1 1 clamp(160px, 18vw, 220px)",
                minWidth: 0,
              }}
            >
              {/* Step number */}
              <span
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
                  fontWeight: 700,
                  color: "var(--upvest-accent)",
                  lineHeight: 1.6,
                  flexShrink: 0,
                  minWidth: "1.4ch",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Beat text */}
              <span
                style={{
                  fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
                  lineHeight: 1.55,
                  color: "var(--upvest-ink, #f0f0f5)",
                }}
              >
                {beat}
              </span>
            </li>
          ))}
        </ol>

        {/* Decorative accent rule */}
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
