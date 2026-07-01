"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challengev2";
import { v2Content } from "@/data/ai-challengev2";

const CLS_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  Now:   { bg: "rgba(39,196,166,0.12)", color: "#27c4a6", border: "rgba(39,196,166,0.35)" },
  Next:  { bg: "rgba(79,91,255,0.12)",  color: "var(--upvest-accent)", border: "var(--upvest-accent-soft, rgba(79,91,255,0.3))" },
  Later: { bg: "rgba(152,152,184,0.10)", color: "var(--upvest-muted, #9898b8)", border: "rgba(152,152,184,0.25)" },
};

function ClsBadge({ cls }: { cls: string }) {
  const s = CLS_COLORS[cls] ?? CLS_COLORS["Later"];
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "0.65rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        fontWeight: 700,
        padding: "0.2em 0.6em",
        borderRadius: "0.3rem",
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        flexShrink: 0,
        lineHeight: 1.4,
      }}
    >
      {cls}
    </span>
  );
}

export default function Sec1TeamsSlide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const teams = v2Content.sec1.teams;

  return (
    <Slide meta={meta} index={index} transition="crossfade">
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
        <div style={{ marginBottom: "2rem" }}>
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
            Section I — AI Opportunity Mapping
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--upvest-ink, #f0f0f5)",
              margin: 0,
            }}
          >
            Every team, mapped.
          </h2>
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1.75rem",
            flexWrap: "wrap",
          }}
          aria-label="Priority legend"
        >
          {["Now", "Next", "Later"].map((cls) => (
            <span
              key={cls}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
            >
              <ClsBadge cls={cls} />
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "var(--upvest-muted, #9898b8)",
                }}
              >
                {cls === "Now" ? "High priority" : cls === "Next" ? "Medium priority" : "Deprioritised"}
              </span>
            </span>
          ))}
        </div>

        {/* Teams grid */}
        <ol
          aria-label="Team AI priority overview"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(0.6rem, 1.5vw, 0.9rem)",
            flex: 1,
          }}
        >
          {teams.map((t, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                background: "var(--upvest-surface, rgba(255,255,255,0.04))",
                border: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.15))",
                borderRadius: "0.5rem",
                padding: "clamp(0.75rem, 1.5vw, 1rem) clamp(0.9rem, 1.75vw, 1.2rem)",
              }}
            >
              {/* Row 1: team + badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
                    color: "var(--upvest-ink, #f0f0f5)",
                    lineHeight: 1.2,
                  }}
                >
                  {t.team}
                </span>
                <ClsBadge cls={t.cls} />
              </div>

              {/* Row 2: category */}
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.08em",
                  color: "var(--upvest-muted, #9898b8)",
                  textTransform: "uppercase",
                }}
              >
                {t.category}
              </span>

              {/* Row 3: note */}
              <p
                style={{
                  margin: "0.25rem 0 0",
                  fontSize: "clamp(0.75rem, 1.2vw, 0.85rem)",
                  lineHeight: 1.55,
                  color: "var(--upvest-muted, #9898b8)",
                }}
              >
                {t.note}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Slide>
  );
}
