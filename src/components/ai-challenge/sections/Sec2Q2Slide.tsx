"use client";

import Slide from "../Slide";
import Sec3Header from "./Sec3Header";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

const MONO = "var(--font-mono, monospace)";
const SANS = "var(--font-sans, sans-serif)";

export default function Sec2Q2Slide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec2.q2;

  return (
    <Slide meta={meta} index={index} transition="crossfade">
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

        {/* Technical / process risks — RCSA cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--upvest-accent)", fontWeight: 700 }}>
            Technical / process risk — inherent → control → residual
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "0.5rem",
            }}
          >
            {c.tech.map((r, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                  background: "var(--upvest-surface, #fff)",
                  border: "1px solid var(--upvest-accent-soft, #e7eaff)",
                  borderRadius: "0.5rem",
                  padding: "0.6rem 0.8rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: SANS, fontSize: "clamp(0.72rem, 1vw, 0.82rem)", fontWeight: 700, color: "var(--upvest-ink, #0e1238)", lineHeight: 1.25 }}>
                    {r.risk}
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, color: "#b06a1a", flexShrink: 0, whiteSpace: "nowrap" }}>
                    {r.inherent}
                  </span>
                </div>
                <span style={{ fontFamily: SANS, fontSize: "clamp(0.67rem, 0.95vw, 0.76rem)", lineHeight: 1.32, color: "var(--upvest-muted, #5b6079)" }}>
                  {r.control}
                </span>
                <span
                  style={{
                    alignSelf: "flex-start",
                    fontFamily: MONO,
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#138a72",
                    background: "rgba(26,165,137,0.12)",
                    border: "1px solid rgba(26,165,137,0.4)",
                    borderRadius: "0.3rem",
                    padding: "0.15em 0.55em",
                  }}
                >
                  Residual: {r.residual}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Human / organizational risks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#b06a1a", fontWeight: 700 }}>
            Human / organizational risk — key control
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
              gap: "0.45rem",
            }}
          >
            {c.human.map((r, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                  background: "var(--upvest-accent-soft, rgba(79,91,255,0.08))",
                  borderRadius: "0.45rem",
                  padding: "0.5rem 0.7rem",
                  borderLeft: "3px solid #b06a1a",
                }}
              >
                <span style={{ fontFamily: SANS, fontSize: "0.74rem", fontWeight: 700, color: "var(--upvest-ink, #0e1238)", lineHeight: 1.25 }}>
                  {r.risk}
                </span>
                <span style={{ fontFamily: SANS, fontSize: "clamp(0.66rem, 0.9vw, 0.74rem)", lineHeight: 1.3, color: "var(--upvest-muted, #5b6079)" }}>
                  {r.control}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
