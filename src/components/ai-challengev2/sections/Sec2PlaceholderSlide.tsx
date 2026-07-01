"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challengev2";
import { v2Content } from "@/data/ai-challengev2";

export default function Sec2PlaceholderSlide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const c = v2Content.sec2;

  return (
    <Slide meta={meta} index={index} transition="crossfade">
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

        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--upvest-ink, #1a1a2e)",
            margin: "0 0 1.5rem",
            maxWidth: "30ch",
          }}
        >
          {c.title}
        </h2>

        {/* Teaser */}
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
            lineHeight: 1.65,
            color: "var(--upvest-muted, #6b7280)",
            maxWidth: "58ch",
            margin: "0 0 2.5rem",
          }}
        >
          {c.teaser}
        </p>

        {/* Status badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--upvest-surface, rgba(79,91,255,0.08))",
            border: "1px solid var(--upvest-accent, rgba(79,91,255,0.3))",
            borderRadius: "2rem",
            padding: "0.625rem 1.25rem",
            width: "fit-content",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.75rem, 1.1vw, 0.85rem)",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--upvest-accent)",
            }}
          >
            {c.status}
          </span>
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
