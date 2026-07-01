"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

export default function CaseOverviewSlide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const c = v2Content.caseOverview;

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

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--upvest-ink, #1a1a2e)",
            margin: "0 0 3rem",
            maxWidth: "30ch",
          }}
        >
          {c.headline}
        </h2>

        {/* Document cards */}
        <ol
          aria-label="Case study documents"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
            maxWidth: "64ch",
          }}
        >
          {c.docs.map((doc, i) => (
            <li
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2rem 1fr",
                gap: "1rem",
                alignItems: "start",
                background: "var(--upvest-surface, rgba(79,91,255,0.05))",
                border: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.2))",
                borderRadius: "0.625rem",
                padding: "1.25rem 1.5rem",
              }}
            >
              {/* Doc index */}
              <span
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
                  fontWeight: 700,
                  color: "var(--upvest-accent)",
                  lineHeight: 1.6,
                  paddingTop: "0.1em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                {/* Title */}
                <span
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
                    fontWeight: 600,
                    color: "var(--upvest-ink, #1a1a2e)",
                    lineHeight: 1.3,
                  }}
                >
                  {doc.title}
                </span>

                {/* Note */}
                <span
                  style={{
                    fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
                    lineHeight: 1.6,
                    color: "var(--upvest-muted, #6b7280)",
                  }}
                >
                  {doc.note}
                </span>
              </div>
            </li>
          ))}
        </ol>

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
