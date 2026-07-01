"use client";

import Slide from "../Slide";
import Sec3Header from "./Sec3Header";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

export default function Sec3Q3Slide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec3.q3;

  const cols: { label: string; tone: string; items: string[] }[] = [
    { label: "Real", tone: "#1aa589", items: c.real },
    { label: "Hype", tone: "#b06a1a", items: c.hype },
    { label: "Where it's heading", tone: "var(--upvest-accent)", items: c.heading },
  ];

  return (
    <Slide meta={meta} index={index} transition="slide">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "clamp(1.5rem, 3.5vw, 2.75rem) clamp(1.5rem, 5vw, 4rem)",
          gap: "1.5rem",
        }}
      >
        <Sec3Header eyebrow={c.eyebrow} title={c.title} />

        {/* The bet — prominent, full width */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            padding: "clamp(1.1rem, 2.4vw, 1.75rem)",
            background: "var(--upvest-ink, #0e1238)",
            borderRadius: "0.85rem",
            width: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(1.05rem, 2vw, 1.6rem)",
              fontWeight: 700,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "#fff",
              margin: 0,
            }}
          >
            {c.bet}
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(0.76rem, 1.1vw, 0.88rem)",
              fontStyle: "italic",
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
            }}
          >
            {c.aside}
          </p>
        </div>

        {/* Real / Hype / Heading — compact cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "clamp(0.9rem, 2vw, 1.5rem)",
            width: "100%",
          }}
        >
          {cols.map(({ label, tone, items }) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.7rem",
                padding: "1rem 1.1rem",
                background: "var(--upvest-accent-soft, rgba(79,91,255,0.08))",
                borderRadius: "0.6rem",
                borderTop: `3px solid ${tone}`,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.58rem, 0.85vw, 0.7rem)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: tone,
                  fontWeight: 700,
                }}
              >
                {label}
              </span>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.55rem",
                }}
              >
                {items.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "var(--font-sans, sans-serif)",
                      fontSize: "clamp(0.76rem, 1.1vw, 0.88rem)",
                      lineHeight: 1.4,
                      color: "var(--upvest-ink, #0e1238)",
                      paddingLeft: "0.85rem",
                      borderLeft: `2px solid ${tone}`,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
