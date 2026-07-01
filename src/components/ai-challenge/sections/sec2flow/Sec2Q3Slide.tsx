// ── Sec2Q3Slide.tsx ────────────────────────────────────────────────────────
// Q3 — the interactive WINX flowchart slide (the Section II centerpiece).
// Assembles: header + <FlowChart> + stage-dot controls + legend + caption strip
// + <NodeCard>. Stage stepping is driven by useFlowStages (arrow keys + dots).

"use client";

import { useState } from "react";
import Slide from "../../Slide";
import { useDeck } from "../../DeckController";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";
import { flowStages, type FlowNode } from "@/data/sec2-flow";
import FlowChart from "./FlowChart";
import NodeCard from "./NodeCard";
import { useFlowStages } from "./useFlowStages";

const LEGEND_COLOR: Record<string, string> = {
  auto: "#138a72",
  human: "#b06a1a",
  mixed: "#4f5bff",
};

export default function Sec2Q3Slide({ meta, index }: { meta: SlideMeta; index: number }) {
  const c = v2Content.sec2.q3;
  const { reducedMotion, activeIndex } = useDeck();
  const slideActive = activeIndex === index;
  const { stage, goStage } = useFlowStages(index, flowStages.length);
  const [selected, setSelected] = useState<FlowNode | null>(null);

  const active = flowStages[stage] ?? flowStages[0];

  return (
    <Slide meta={meta} index={index} transition="scale">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "clamp(1.1rem, 3vw, 2.25rem) clamp(1.25rem, 4.5vw, 3.5rem)",
          gap: "clamp(0.7rem, 1.6vh, 1.1rem)",
          background: "transparent",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.58rem, 1vw, 0.72rem)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--upvest-accent)",
              fontWeight: 600,
            }}
          >
            {c.eyebrow}
          </span>
          <h2
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(1.35rem, 2.8vw, 2.1rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--upvest-ink, #0e1238)",
              margin: 0,
            }}
          >
            {c.title}
          </h2>
        </div>

        {/* Flowchart */}
        <FlowChart stage={stage} active={slideActive} onSelectNode={setSelected} reducedMotion={reducedMotion} />

        {/* Caption strip — active stage title + caption */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            minHeight: "3.6rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.6rem, 1vw, 0.72rem)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "var(--upvest-accent)",
            }}
          >
            {stage + 1} / {flowStages.length} · {active.title}
          </span>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(0.82rem, 1.4vw, 1rem)",
              lineHeight: 1.45,
              color: "var(--upvest-muted, #5b6079)",
              maxWidth: "82ch",
            }}
          >
            {active.caption}
          </p>
        </div>

        {/* Controls + legend */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          {/* Stage dots */}
          <div role="tablist" aria-label="Flowchart stages" style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {flowStages.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === stage}
                aria-label={`Stage ${i + 1}: ${s.title}`}
                onClick={() => goStage(i)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: "0.2rem 0.1rem",
                }}
              >
                <span
                  style={{
                    width: i === stage ? "1.6rem" : "0.55rem",
                    height: "0.55rem",
                    borderRadius: "0.3rem",
                    background: i === stage ? "var(--upvest-accent)" : "rgba(91,96,121,0.35)",
                    transition: "width 0.25s ease, background 0.25s ease",
                  }}
                />
              </button>
            ))}
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.62rem",
                color: "var(--upvest-muted, #5b6079)",
                marginLeft: "0.4rem",
              }}
            >
              ← → to step
            </span>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem" }}>
            {c.legend.map((l) => (
              <span
                key={l.cls}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.58rem, 0.9vw, 0.68rem)",
                  letterSpacing: "0.04em",
                  color: "var(--upvest-muted, #5b6079)",
                }}
              >
                <span
                  style={{
                    width: "0.7rem",
                    height: "0.7rem",
                    borderRadius: "0.2rem",
                    background: LEGEND_COLOR[l.cls] ?? "#5b6079",
                  }}
                />
                {l.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <NodeCard node={selected} onClose={() => setSelected(null)} />
    </Slide>
  );
}
