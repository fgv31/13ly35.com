"use client";

import Slide from "../../Slide";
import Sec3Header from "../Sec3Header";
import ArchDiagram from "./ArchDiagram";
import ConnectCallout from "./ConnectCallout";
import { useDeck } from "../../DeckController";
import { v2Content } from "@/data/ai-challenge";
import type { SlideMeta } from "@/data/ai-challenge";

export default function Sec2Q4aSlide({ meta, index }: { meta: SlideMeta; index: number }) {
  const { reducedMotion } = useDeck();
  const c = v2Content.sec2.q4a;

  return (
    <Slide meta={meta} index={index} transition="scale">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "clamp(1.5rem, 3.5vw, 2.75rem) clamp(1.5rem, 5vw, 4rem)",
          gap: "clamp(0.75rem, 1.5vw, 1.1rem)",
          background: "transparent",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <Sec3Header eyebrow={c.eyebrow} title={c.title} />

        {/* Principle */}
        <p
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(0.75rem, 1.05vw, 0.88rem)",
            lineHeight: 1.5,
            color: "var(--upvest-muted, #5b6079)",
            margin: 0,
            maxWidth: "90ch",
          }}
        >
          {c.principle}
        </p>

        {/* Main body — diagram + callout side-by-side on wide; stacked on narrow */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "clamp(0.75rem, 2vw, 1.5rem)",
            alignItems: "start",
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* Architecture diagram */}
          <div style={{ minWidth: 0 }}>
            <ArchDiagram reducedMotion={reducedMotion} />
          </div>

          {/* Callout (hero) + tools strip */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(0.6rem, 1.2vw, 0.9rem)",
              minWidth: 0,
            }}
          >
            {/* ConnectCallout — the hero */}
            <ConnectCallout />

            {/* Tools strip */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
                borderRadius: "0.6rem",
                border: "1px solid rgba(79,91,255,0.15)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "0.4rem 0.8rem",
                  background: "var(--upvest-bg, #f3f5fb)",
                  borderBottom: "1px solid rgba(79,91,255,0.12)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "clamp(0.58rem, 0.82vw, 0.68rem)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--upvest-accent, #4f5bff)",
                    fontWeight: 600,
                    opacity: 0.85,
                  }}
                >
                  Toolchain
                </span>
              </div>
              {c.tools.map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "0.5rem",
                    padding: "0.45rem 0.8rem",
                    borderTop: i > 0 ? "1px solid rgba(79,91,255,0.08)" : "none",
                    background:
                      i % 2 === 0
                        ? "var(--upvest-surface, #fff)"
                        : "rgba(243,245,251,0.7)",
                    alignItems: "start",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-sans, sans-serif)",
                        fontSize: "clamp(0.66rem, 0.92vw, 0.78rem)",
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: "var(--upvest-ink, #0e1238)",
                      }}
                    >
                      {t.tool}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans, sans-serif)",
                        fontSize: "clamp(0.6rem, 0.84vw, 0.72rem)",
                        lineHeight: 1.35,
                        color: "var(--upvest-muted, #5b6079)",
                      }}
                    >
                      {t.why}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "clamp(0.58rem, 0.78vw, 0.66rem)",
                      fontWeight: 600,
                      color: "var(--upvest-accent, #4f5bff)",
                      background: "var(--upvest-accent-soft, #e7eaff)",
                      borderRadius: "0.3rem",
                      padding: "0.15rem 0.45rem",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      alignSelf: "start",
                    }}
                  >
                    {t.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
