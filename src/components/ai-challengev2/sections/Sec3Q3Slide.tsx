"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challengev2";
import { v2Content } from "@/data/ai-challengev2";

const COLS = [
  { label: "Real", key: "real" },
  { label: "Hype", key: "hype" },
  { label: "Where it's heading", key: "heading" },
] as const;

export default function Sec3Q3Slide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec3.q3;
  const cols: { label: string; items: string[] }[] = [
    { label: COLS[0].label, items: c.real },
    { label: COLS[1].label, items: c.hype },
    { label: COLS[2].label, items: c.heading },
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
          padding: "clamp(2rem, 6vw, 5rem) clamp(1.5rem, 8vw, 7rem)",
          background: "transparent",
        }}
      >
        {/* Kicker / headline */}
        <p
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--upvest-accent)",
            marginBottom: "1rem",
            opacity: 0.9,
          }}
        >
          {c.headline}
        </p>

        {/* Honest take */}
        <p
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
            lineHeight: 1.65,
            color: "var(--upvest-muted, #5a5a7a)",
            maxWidth: "80ch",
            margin: "0 0 2.5rem 0",
          }}
        >
          {c.honestTake}
        </p>

        {/* Three-column layout: real / hype / heading */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(1rem, 2.5vw, 2rem)",
            marginBottom: "2.5rem",
          }}
        >
          {cols.map(({ label, items }) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.58rem, 0.85vw, 0.7rem)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--upvest-accent)",
                  opacity: 0.75,
                }}
              >
                {label}
              </span>
              <div
                aria-hidden="true"
                style={{
                  height: "2px",
                  background:
                    "linear-gradient(90deg, var(--upvest-accent), transparent)",
                  borderRadius: "1px",
                }}
              />
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
                      fontSize: "clamp(0.72rem, 1.05vw, 0.84rem)",
                      lineHeight: 1.5,
                      color: "var(--upvest-ink, #1a1a2e)",
                      paddingLeft: "0.85rem",
                      borderLeft:
                        "2px solid var(--upvest-accent-soft, rgba(79,91,255,0.25))",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, var(--upvest-accent-soft, rgba(79,91,255,0.25)), transparent)",
            marginBottom: "1.5rem",
          }}
        />

        {/* Bottom line */}
        <p
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(0.82rem, 1.3vw, 1rem)",
            letterSpacing: "0.06em",
            color: "var(--upvest-accent)",
            margin: 0,
          }}
        >
          {c.bottomLine}
        </p>

        {/* Decorative rule */}
        <div
          style={{
            marginTop: "3.5rem",
            width: "3rem",
            height: "2px",
            background:
              "linear-gradient(90deg, var(--upvest-accent), transparent)",
            borderRadius: "1px",
          }}
        />
      </div>
    </Slide>
  );
}
