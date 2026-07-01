"use client";

import Slide from "../Slide";
import Sec3Header from "./Sec3Header";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

const MONO = "var(--font-mono, monospace)";
const SANS = "var(--font-sans, sans-serif)";

function ColHeading({ children, tone = "var(--upvest-accent)" }: { children: React.ReactNode; tone?: string }) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: "0.6rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: tone,
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
}

function Bullets({ items, tone }: { items: string[]; tone: string }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      {items.map((it, i) => (
        <li
          key={i}
          style={{
            fontFamily: SANS,
            fontSize: "clamp(0.68rem, 0.95vw, 0.78rem)",
            lineHeight: 1.32,
            color: "var(--upvest-ink, #0e1238)",
            paddingLeft: "0.65rem",
            borderLeft: `2px solid ${tone}`,
          }}
        >
          {it}
        </li>
      ))}
    </ul>
  );
}

export default function Sec2Q1Slide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec2.q1;

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
        <Sec3Header eyebrow={c.eyebrow} title={c.title} lead={c.goal} />

        {/* Three columns: Week 1 · Stakeholders · Week 2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(0.7rem, 1.6vw, 1.1rem)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <ColHeading>Week 1 — discovery</ColHeading>
            <Bullets items={c.week1} tone="var(--upvest-accent)" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <ColHeading tone="#138a72">Stakeholder map</ColHeading>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {c.stakeholders.map((s, i) => (
                <li key={i} style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: SANS, fontSize: "0.72rem", fontWeight: 700, color: "var(--upvest-ink, #0e1238)" }}>
                    {s.who}
                  </span>
                  <span style={{ fontFamily: SANS, fontSize: "0.68rem", lineHeight: 1.3, color: "var(--upvest-muted, #5b6079)" }}>
                    {s.need}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <ColHeading tone="#b06a1a">Week 2 — validate &amp; scope</ColHeading>
            <Bullets items={c.week2} tone="#b06a1a" />
          </div>
        </div>

        {/* Defining done — phased */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <ColHeading>Defining &ldquo;done&rdquo; — phased (Pareto: 80/20)</ColHeading>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
              gap: "0.5rem",
            }}
          >
            {c.done.map((d) => (
              <div
                key={d.phase}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                  background: "var(--upvest-surface, #fff)",
                  border: "1px solid var(--upvest-accent-soft, #e7eaff)",
                  borderRadius: "0.5rem",
                  padding: "0.6rem 0.8rem",
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--upvest-accent)" }}>
                  {d.phase}
                </span>
                <span style={{ fontFamily: SANS, fontSize: "clamp(0.67rem, 0.95vw, 0.76rem)", lineHeight: 1.32, color: "var(--upvest-ink, #0e1238)" }}>
                  {d.body}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
