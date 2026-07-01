"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

const CLS_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  Now:   { bg: "rgba(26,165,137,0.12)", color: "#138a72", border: "rgba(26,165,137,0.4)" },
  Next:  { bg: "rgba(79,91,255,0.12)",  color: "var(--upvest-accent)", border: "var(--upvest-accent-soft, rgba(79,91,255,0.3))" },
  Later: { bg: "rgba(91,96,121,0.10)", color: "var(--upvest-muted, #5b6079)", border: "rgba(91,96,121,0.3)" },
};

const TAG_COLORS = {
  apply:    { color: "var(--upvest-accent)", label: "Apply" },
  upside:   { color: "#138a72", label: "Upside" },
  downside: { color: "#b06a1a", label: "Down" },
} as const;

function ClsBadge({ cls }: { cls: string }) {
  const s = CLS_COLORS[cls] ?? CLS_COLORS["Later"];
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "0.62rem",
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

function TagRow({ kind, value }: { kind: keyof typeof TAG_COLORS; value: string }) {
  const t = TAG_COLORS[kind];
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
      <span
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.56rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 700,
          color: t.color,
          flexShrink: 0,
          width: "4.2em",
        }}
      >
        {t.label}
      </span>
      <span
        style={{
          fontSize: "clamp(0.68rem, 1vw, 0.76rem)",
          lineHeight: 1.35,
          color: "var(--upvest-ink, #0e1238)",
        }}
      >
        {value}
      </span>
    </div>
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
          padding: "clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 7vw, 6rem)",
          justifyContent: "center",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "1.25rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--upvest-accent)",
              marginBottom: "0.6rem",
              opacity: 0.9,
            }}
          >
            Section I — AI Opportunity Mapping
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--upvest-ink, #0e1238)",
              margin: "0 0 0.4rem",
            }}
          >
            The rest of the org, mapped.
          </h2>
          <p
            style={{
              fontSize: "clamp(0.78rem, 1.2vw, 0.92rem)",
              lineHeight: 1.5,
              color: "var(--upvest-muted, #5b6079)",
              margin: 0,
              maxWidth: "70ch",
            }}
          >
            Operations (lead) and People (hold) are on the previous slide. Each card below: AI
            applicability, upside, and the downside that caps it.
          </p>
        </div>

        {/* Teams grid */}
        <ol
          aria-label="Team AI priority overview"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(0.6rem, 1.5vw, 0.9rem)",
          }}
        >
          {teams.map((t, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                background: "var(--upvest-surface, rgba(255,255,255,0.6))",
                border: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.2))",
                borderRadius: "0.5rem",
                padding: "clamp(0.7rem, 1.4vw, 0.95rem) clamp(0.85rem, 1.6vw, 1.1rem)",
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
                    color: "var(--upvest-ink, #0e1238)",
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
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                  color: "var(--upvest-muted, #5b6079)",
                  textTransform: "uppercase",
                }}
              >
                {t.category}
              </span>

              {/* Row 3: tags */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                  marginTop: "0.1rem",
                }}
              >
                <TagRow kind="apply" value={t.tags.apply} />
                <TagRow kind="upside" value={t.tags.upside} />
                <TagRow kind="downside" value={t.tags.downside} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Slide>
  );
}
