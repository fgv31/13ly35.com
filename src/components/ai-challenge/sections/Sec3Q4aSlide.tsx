"use client";

import Slide from "../Slide";
import Sec3Header from "./Sec3Header";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

export default function Sec3Q4aSlide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec3.q4a;

  return (
    <Slide meta={meta} index={index} transition="slide">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "clamp(1.25rem, 3vw, 2.25rem) clamp(1.5rem, 5vw, 4rem)",
          gap: "1.1rem",
        }}
      >
        <Sec3Header eyebrow={c.eyebrow} title={c.title} lead={c.preamble} />

        {/* Two-column full width: regulatory map + key risks */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "clamp(1rem, 2.5vw, 2rem)",
            width: "100%",
            alignItems: "start",
          }}
        >
          {/* Regulatory map */}
          <section>
            <Label>Regulatory map</Label>
            <div
              style={{
                marginTop: "0.5rem",
                borderRadius: "0.6rem",
                overflow: "hidden",
                border: "1px solid rgba(79,91,255,0.18)",
              }}
            >
              {c.regs.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "6.5rem 1fr",
                    gap: "0.6rem",
                    padding: "0.45rem 0.8rem",
                    borderTop: i > 0 ? "1px solid rgba(79,91,255,0.1)" : "none",
                    background: i % 2 === 0 ? "var(--upvest-accent-soft, rgba(79,91,255,0.06))" : "transparent",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "clamp(0.6rem, 0.85vw, 0.7rem)",
                      fontWeight: 700,
                      color: "var(--upvest-accent)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {row.reg}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-sans, sans-serif)",
                        fontSize: "clamp(0.66rem, 0.92vw, 0.78rem)",
                        fontWeight: 600,
                        lineHeight: 1.3,
                        color: "var(--upvest-ink, #0e1238)",
                      }}
                    >
                      {row.requirement}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans, sans-serif)",
                        fontSize: "clamp(0.62rem, 0.86vw, 0.72rem)",
                        lineHeight: 1.3,
                        color: "var(--upvest-muted, #5b6079)",
                      }}
                    >
                      {row.example}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key risks */}
          <section>
            <Label>Where the real risks sit</Label>
            <div
              style={{
                marginTop: "0.5rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
                gap: "0.6rem",
              }}
            >
              {c.risks.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2rem",
                    padding: "0.7rem 0.9rem",
                    background: "var(--upvest-accent-soft, rgba(79,91,255,0.08))",
                    borderRadius: "0.5rem",
                    borderLeft: "3px solid #b06a1a",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans, sans-serif)",
                      fontSize: "clamp(0.72rem, 1vw, 0.84rem)",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: "var(--upvest-ink, #0e1238)",
                    }}
                  >
                    {r.risk}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans, sans-serif)",
                      fontSize: "clamp(0.66rem, 0.9vw, 0.76rem)",
                      lineHeight: 1.4,
                      color: "var(--upvest-muted, #5b6079)",
                    }}
                  >
                    {r.why}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Slide>
  );
}

function Label({ children }: { children: string }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "clamp(0.6rem, 0.92vw, 0.72rem)",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--upvest-accent)",
        opacity: 0.85,
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}
