"use client";

import Slide from "../Slide";
import Sec3Header from "./Sec3Header";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

const MONO = "var(--font-mono, monospace)";
const SANS = "var(--font-sans, sans-serif)";

export default function Sec2Q6Slide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec2.q6;

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

        {/* Three upskill areas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
            gap: "clamp(0.7rem, 1.6vw, 1.1rem)",
          }}
        >
          {c.areas.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "0.95rem 1.1rem",
                background: "var(--upvest-surface, #fff)",
                border: "1px solid var(--upvest-accent-soft, #e7eaff)",
                borderRadius: "0.6rem",
                borderTop: "3px solid var(--upvest-accent)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: SANS,
                  fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
                  fontWeight: 700,
                  color: "var(--upvest-ink, #0e1238)",
                  lineHeight: 1.2,
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: "0.85rem", color: "var(--upvest-accent)" }}>{i + 1}</span>
                {a.title}
              </span>
              <span style={{ fontFamily: SANS, fontSize: "clamp(0.7rem, 1vw, 0.8rem)", lineHeight: 1.4, color: "var(--upvest-ink, #0e1238)" }}>
                {a.body}
              </span>
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(0.66rem, 0.92vw, 0.74rem)",
                  fontStyle: "italic",
                  lineHeight: 1.35,
                  color: "var(--upvest-muted, #5b6079)",
                  paddingTop: "0.35rem",
                  borderTop: "1px solid var(--upvest-accent-soft, #e7eaff)",
                }}
              >
                Close it: {a.close}
              </span>
            </div>
          ))}
        </div>

        {/* Method line */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            padding: "0.85rem 1.1rem",
            background: "var(--upvest-ink, #0e1238)",
            borderRadius: "0.6rem",
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,255,255,0.55)" }}>
            My method
          </span>
          <p style={{ margin: 0, fontFamily: SANS, fontSize: "clamp(0.78rem, 1.3vw, 0.95rem)", lineHeight: 1.45, color: "#fff" }}>
            {c.method}
          </p>
        </div>
      </div>
    </Slide>
  );
}
