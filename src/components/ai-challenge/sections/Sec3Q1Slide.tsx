"use client";

import Slide from "../Slide";
import Sec3Header from "./Sec3Header";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

export default function Sec3Q1Slide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec3.q1;

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
          gap: "1.25rem",
        }}
      >
        <Sec3Header eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

        {/* Use MCP when — signal cards, full-width grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <Label>Use MCP when</Label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "0.6rem",
              width: "100%",
            }}
          >
            {c.signals.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                  padding: "0.7rem 0.95rem",
                  background: "var(--upvest-accent-soft, rgba(79,91,255,0.1))",
                  borderRadius: "0.5rem",
                  borderLeft: "3px solid var(--upvest-accent)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontSize: "clamp(0.78rem, 1.15vw, 0.9rem)",
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: "var(--upvest-ink, #0e1238)",
                    margin: 0,
                  }}
                >
                  {s.signal}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                    lineHeight: 1.4,
                    color: "var(--upvest-muted, #5b6079)",
                    margin: 0,
                  }}
                >
                  {s.why}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Not when + synthesis — full-width two-column */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "clamp(1rem, 2.5vw, 2rem)",
            alignItems: "stretch",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <Label>Not when</Label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {c.notWhen.map((nw, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)",
                    gap: "0.4rem 1rem",
                    padding: "0.45rem 0.85rem",
                    borderRadius: "0.4rem",
                    border: "1px solid var(--upvest-accent-soft, rgba(79,91,255,0.25))",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-sans, sans-serif)",
                      fontSize: "clamp(0.74rem, 1.05vw, 0.85rem)",
                      fontWeight: 500,
                      lineHeight: 1.35,
                      color: "var(--upvest-ink, #0e1238)",
                      margin: 0,
                    }}
                  >
                    {nw.dont}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans, sans-serif)",
                      fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                      lineHeight: 1.4,
                      color: "var(--upvest-muted, #5b6079)",
                      margin: 0,
                    }}
                  >
                    → {nw.instead}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Synthesis hero */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "clamp(1rem, 2vw, 1.5rem)",
              background: "var(--upvest-ink, #0e1238)",
              borderRadius: "0.75rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontSize: "clamp(1rem, 1.7vw, 1.35rem)",
                fontWeight: 700,
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
                color: "#fff",
                margin: 0,
              }}
            >
              {c.synthesis}
            </p>
          </div>
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
        fontSize: "clamp(0.6rem, 0.95vw, 0.74rem)",
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
