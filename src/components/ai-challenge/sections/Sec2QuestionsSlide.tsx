"use client";

import Slide from "../Slide";
import Sec3Header from "./Sec3Header";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

export default function Sec2QuestionsSlide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec2.intro;

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
          gap: "1.25rem",
          background: "transparent",
        }}
      >
        <Sec3Header eyebrow={c.kicker} title="A real Ops process, handed to me" lead={c.tested} />

        {/* Brief one-liner */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            padding: "clamp(0.9rem, 2vw, 1.35rem)",
            background: "var(--upvest-ink, #0e1238)",
            borderRadius: "0.75rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            The brief
          </span>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(0.95rem, 1.7vw, 1.25rem)",
              fontWeight: 700,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "#fff",
            }}
          >
            {c.brief}
          </p>
        </div>

        {/* Six questions */}
        <ol
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(0.55rem, 1.4vw, 0.85rem)",
          }}
        >
          {c.questions.map((q, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: "0.7rem",
                alignItems: "flex-start",
                background: "var(--upvest-surface, #fff)",
                border: "1px solid var(--upvest-accent-soft, #e7eaff)",
                borderRadius: "0.5rem",
                padding: "0.7rem 0.9rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--upvest-accent)",
                  lineHeight: 1.2,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontSize: "clamp(0.76rem, 1.1vw, 0.88rem)",
                  lineHeight: 1.4,
                  color: "var(--upvest-ink, #0e1238)",
                }}
              >
                {q}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Slide>
  );
}
