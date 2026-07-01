"use client";

import Slide from "../Slide";
import Sec3Header from "./Sec3Header";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

const MONO = "var(--font-mono, monospace)";
const SANS = "var(--font-sans, sans-serif)";

export default function Sec2Q5Slide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec2.q5;

  return (
    <Slide meta={meta} index={index} transition="slide">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "clamp(1.1rem, 2.8vw, 2rem) clamp(1.5rem, 5vw, 4rem)",
          gap: "0.9rem",
          background: "transparent",
        }}
      >
        <Sec3Header eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

        {/* Six numbered steps */}
        <ol
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            // 6 steps in exactly two full rows (3 + 3) — no orphan on the second row.
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "0.5rem",
          }}
        >
          {c.steps.map((s) => (
            <li
              key={s.n}
              style={{
                display: "flex",
                gap: "0.7rem",
                alignItems: "flex-start",
                background: "var(--upvest-surface, #fff)",
                border: "1px solid var(--upvest-accent-soft, #e7eaff)",
                borderRadius: "0.5rem",
                padding: "0.6rem 0.8rem",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--upvest-accent)",
                  lineHeight: 1.1,
                  flexShrink: 0,
                  minWidth: "1.4rem",
                }}
              >
                {s.n}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <span style={{ fontFamily: SANS, fontSize: "clamp(0.76rem, 1.05vw, 0.86rem)", fontWeight: 700, color: "var(--upvest-ink, #0e1238)", lineHeight: 1.25 }}>
                  {s.title}
                </span>
                <span style={{ fontFamily: SANS, fontSize: "clamp(0.68rem, 0.95vw, 0.77rem)", lineHeight: 1.32, color: "var(--upvest-muted, #5b6079)" }}>
                  {s.body}
                </span>
              </div>
            </li>
          ))}
        </ol>

        {/* What I'd avoid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
            padding: "0.75rem 1rem",
            background: "rgba(192,57,43,0.06)",
            border: "1px solid rgba(192,57,43,0.3)",
            borderRadius: "0.55rem",
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#c0392b", fontWeight: 700 }}>
            What I&rsquo;d avoid
          </span>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {c.avoid.map((a, i) => (
              <li
                key={i}
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(0.69rem, 0.95vw, 0.78rem)",
                  lineHeight: 1.32,
                  color: "var(--upvest-ink, #0e1238)",
                  paddingLeft: "0.7rem",
                  borderLeft: "2px solid #c0392b",
                }}
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Slide>
  );
}
