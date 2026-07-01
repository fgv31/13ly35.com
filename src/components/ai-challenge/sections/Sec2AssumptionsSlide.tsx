"use client";

import Slide from "../Slide";
import Sec3Header from "./Sec3Header";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

export default function Sec2AssumptionsSlide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec2.assumptions;

  const cols: { label: string; tone: string; items: string[] }[] = [
    { label: "Scope contradictions", tone: "#c0392b", items: c.contradictions },
    { label: "Undefined terms", tone: "#b06a1a", items: c.undefinedTerms },
    { label: "Procedural ambiguities", tone: "var(--upvest-accent)", items: c.ambiguities },
  ];

  return (
    <Slide meta={meta} index={index} transition="crossfade">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "clamp(1.25rem, 3vw, 2.25rem) clamp(1.5rem, 5vw, 4rem)",
          gap: "1rem",
          background: "transparent",
        }}
      >
        <Sec3Header eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

        {/* What needs clarifying — 3 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
            gap: "clamp(0.7rem, 1.6vw, 1.1rem)",
          }}
        >
          {cols.map(({ label, tone, items }) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "0.85rem 1rem",
                background: "var(--upvest-accent-soft, rgba(79,91,255,0.08))",
                borderRadius: "0.55rem",
                borderTop: `3px solid ${tone}`,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: tone,
                  fontWeight: 700,
                }}
              >
                {label}
              </span>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {items.map((it, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "var(--font-sans, sans-serif)",
                      fontSize: "clamp(0.7rem, 1vw, 0.8rem)",
                      lineHeight: 1.35,
                      color: "var(--upvest-ink, #0e1238)",
                      paddingLeft: "0.7rem",
                      borderLeft: `2px solid ${tone}`,
                    }}
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Working assumptions — A3..A13 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--upvest-muted, #5b6079)",
              fontWeight: 700,
            }}
          >
            Key working assumptions — each a day-1 question
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              gap: "0.45rem",
            }}
          >
            {c.working.map((a) => (
              <div
                key={a.id}
                style={{
                  display: "flex",
                  gap: "0.55rem",
                  alignItems: "flex-start",
                  background: "var(--upvest-surface, #fff)",
                  border: "1px solid var(--upvest-accent-soft, #e7eaff)",
                  borderRadius: "0.45rem",
                  padding: "0.5rem 0.7rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "var(--upvest-accent)",
                    flexShrink: 0,
                  }}
                >
                  {a.id}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontSize: "clamp(0.68rem, 0.95vw, 0.78rem)",
                    lineHeight: 1.3,
                    color: "var(--upvest-ink, #0e1238)",
                  }}
                >
                  {a.body}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
