"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challengev2";
import { v2Content } from "@/data/ai-challengev2";

function HorizList({ items, color }: { items: string[]; color: string }) {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(0.65rem, 1vw, 0.78rem)",
            letterSpacing: "0.06em",
            padding: "0.3em 0.75em",
            borderRadius: "0.3rem",
            background: color === "lead"
              ? "rgba(39,196,166,0.1)"
              : color === "next"
              ? "rgba(79,91,255,0.1)"
              : "rgba(152,152,184,0.08)",
            color: color === "lead"
              ? "#27c4a6"
              : color === "next"
              ? "var(--upvest-accent)"
              : "var(--upvest-muted, #9898b8)",
            border: color === "lead"
              ? "1px solid rgba(39,196,166,0.3)"
              : color === "next"
              ? "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.25))"
              : "1px solid rgba(152,152,184,0.2)",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Sec1VerdictSlide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const v = v2Content.sec1.verdict;

  return (
    <Slide meta={meta} index={index} transition="scale">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 7vw, 6rem)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--upvest-accent)",
              marginBottom: "0.75rem",
              opacity: 0.9,
            }}
          >
            Section I — Verdict
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#eef1fc",
              margin: 0,
            }}
          >
            The call.
          </h2>
        </div>

        {/* Lead / Hold panels */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(1rem, 2.5vw, 1.75rem)",
            marginBottom: "2.5rem",
          }}
        >
          {/* LEAD */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              background: "rgba(39,196,166,0.06)",
              border: "1px solid rgba(39,196,166,0.3)",
              borderRadius: "0.75rem",
              padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent bar */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "3px",
                height: "100%",
                background: "#27c4a6",
                borderRadius: "4px 0 0 4px",
              }}
            />

            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#27c4a6",
                fontWeight: 700,
              }}
            >
              Lead
            </div>

            <div
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                fontWeight: 700,
                color: "#eef1fc",
                letterSpacing: "-0.01em",
              }}
            >
              {v.lead.team}
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
                lineHeight: 1.6,
                color: "var(--upvest-muted, #9898b8)",
              }}
            >
              {v.lead.body}
            </p>
          </div>

          {/* HOLD — deliberately deprioritized */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              background: "rgba(152,152,184,0.05)",
              border: "1px solid rgba(152,152,184,0.2)",
              borderRadius: "0.75rem",
              padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent bar */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "3px",
                height: "100%",
                background: "var(--upvest-muted, #9898b8)",
                borderRadius: "4px 0 0 4px",
              }}
            />

            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--upvest-muted, #9898b8)",
                fontWeight: 700,
              }}
            >
              Hold — deliberately deprioritised
            </div>

            <div
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                fontWeight: 700,
                color: "#eef1fc",
                letterSpacing: "-0.01em",
              }}
            >
              {v.hold.team}
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
                lineHeight: 1.6,
                color: "var(--upvest-muted, #9898b8)",
              }}
            >
              {v.hold.body}
            </p>
          </div>
        </div>

        {/* Now / Next / Later rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Now */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#27c4a6",
                fontWeight: 700,
              }}
            >
              Now
            </span>
            <HorizList items={v.now} color="lead" />
          </div>

          {/* Next */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--upvest-accent)",
                fontWeight: 700,
              }}
            >
              Next
            </span>
            <HorizList items={v.next} color="next" />
          </div>

          {/* Later */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--upvest-muted, #9898b8)",
                fontWeight: 700,
              }}
            >
              Later
            </span>
            <HorizList items={v.later} color="later" />
          </div>
        </div>
      </div>
    </Slide>
  );
}
