"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

type Panel = {
  team: string;
  goal: string;
  work: string;
  apply: string;
  upside: string;
  downside: string;
};

function Field({ label, body, accent }: { label: string; body: string; accent: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
      <span
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "clamp(0.52rem, 0.74vw, 0.62rem)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: accent,
          fontWeight: 700,
          opacity: 0.85,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-sans, sans-serif)",
          fontSize: "clamp(0.72rem, 1vw, 0.85rem)",
          lineHeight: 1.4,
          color: "var(--upvest-ink, #0e1238)",
        }}
      >
        {body}
      </span>
    </div>
  );
}

function VerdictPanel({
  kind,
  badge,
  panel,
  accent,
  bg,
  border,
}: {
  kind: string;
  badge: string;
  panel: Panel;
  accent: string;
  bg: string;
  border: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.7rem",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "0.75rem",
        padding: "clamp(1rem, 2vw, 1.4rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "3px",
          height: "100%",
          background: accent,
        }}
      />
      <div
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.6rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: accent,
          fontWeight: 700,
        }}
      >
        {badge}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0.6rem",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)",
            fontWeight: 700,
            color: "var(--upvest-ink, #0e1238)",
            letterSpacing: "-0.01em",
          }}
        >
          {panel.team}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(0.55rem, 0.85vw, 0.68rem)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--upvest-muted, #5b6079)",
          }}
        >
          {kind}
        </span>
      </div>

      <Field label="Goal" body={panel.goal} accent={accent} />
      <Field label="Work" body={panel.work} accent={accent} />
      <Field label="AI applicability" body={panel.apply} accent={accent} />
      <Field label="Upside" body={panel.upside} accent={accent} />
      <Field label="Downside" body={panel.downside} accent={accent} />
    </div>
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
          justifyContent: "center",
          minHeight: "100vh",
          padding: "clamp(1.25rem, 3vw, 2.5rem) clamp(1.5rem, 7vw, 6rem)",
          gap: "1.25rem",
        }}
      >
        {/* Header */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--upvest-accent)",
              marginBottom: "0.5rem",
              opacity: 0.9,
            }}
          >
            Section I — Verdict
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--upvest-ink, #0e1238)",
              margin: 0,
            }}
          >
            The call — where I&apos;d lead, where I&apos;d hold.
          </h2>
        </div>

        {/* Lead / Hold panels */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(1rem, 2.5vw, 1.75rem)",
          }}
        >
          <VerdictPanel
            kind="answers Q1 — highest upside"
            badge="Lead now"
            panel={v.lead}
            accent="#1aa589"
            bg="rgba(39,196,166,0.08)"
            border="rgba(39,196,166,0.35)"
          />
          <VerdictPanel
            kind="answers Q2 — deliberately deprioritised"
            badge="Hold"
            panel={v.hold}
            accent="#5b6079"
            bg="rgba(91,96,121,0.06)"
            border="rgba(91,96,121,0.25)"
          />
        </div>

        {/* Disclaimer — the 99% context */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start",
            padding: "0.85rem 1.1rem",
            background: "var(--upvest-accent-soft, rgba(79,91,255,0.1))",
            borderRadius: "0.5rem",
            borderLeft: "3px solid var(--upvest-accent)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.95rem",
              color: "var(--upvest-accent)",
              fontWeight: 700,
              lineHeight: 1.4,
            }}
          >
            ⚠
          </span>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(0.74rem, 1.1vw, 0.88rem)",
              lineHeight: 1.5,
              color: "var(--upvest-ink, #0e1238)",
            }}
          >
            {v.disclaimer}
          </p>
        </div>
      </div>
    </Slide>
  );
}
