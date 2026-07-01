"use client";

import React, { useState, useId } from "react";
import { aiChallengeContent } from "@/data/ai-challenge";
import { ScrollScene } from "@/components/ai-challenge/ScrollScene";

// ─── Types ────────────────────────────────────────────────────────────────────

type NodeClass = "Now" | "Next" | "Later";

interface NodeStyleConfig {
  /** Tailwind bg + border token expressed as inline CSS vars */
  bg: string;
  border: string;
  color: string;
  size: number; // diameter in px
}

// ─── Class style tiers ────────────────────────────────────────────────────────
// Subtle graduation: Now = slightly larger + green tint; Next = accent blue;
// Later = muted grey. No labels that imply value ranking.

function nodeStyle(cls: NodeClass): NodeStyleConfig {
  switch (cls) {
    case "Now":
      return {
        bg: "rgba(34,197,94,0.14)",
        border: "rgba(34,197,94,0.45)",
        color: "#15803d",
        size: 44,
      };
    case "Next":
      return {
        bg: "rgba(79,91,255,0.12)",
        border: "rgba(79,91,255,0.4)",
        color: "var(--upvest-accent, #4f5bff)",
        size: 38,
      };
    case "Later":
    default:
      return {
        bg: "rgba(91,96,121,0.10)",
        border: "rgba(91,96,121,0.35)",
        color: "var(--upvest-muted, #5b6079)",
        size: 32,
      };
  }
}

// ─── Legend items ─────────────────────────────────────────────────────────────

const LEGEND: { cls: NodeClass; label: string }[] = [
  { cls: "Now",   label: "Now"   },
  { cls: "Next",  label: "Next"  },
  { cls: "Later", label: "Later" },
];

// ─── Individual node ──────────────────────────────────────────────────────────

interface TeamNodeProps {
  team: string;
  impact: number;
  risk: number;
  note: string;
  cls: NodeClass;
  aiBuilder?: boolean;
}

function TeamNode({ team, impact, risk, note, cls, aiBuilder }: TeamNodeProps) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const tooltipId = useId();
  const style = nodeStyle(cls);
  const half = style.size / 2;

  // Absolute position: x = impact * 100%, y inverted so high risk = top
  const left = `calc(${impact * 100}% - ${half}px)`;
  const bottom = `calc(${risk * 100}% - ${half}px)`;

  const showTooltip = hovered || focused;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${team}: ${note}`}
      aria-describedby={tooltipId}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFocused((f) => !f);
        }
      }}
      style={{
        position: "absolute",
        left,
        bottom,
        width: style.size,
        height: style.size,
        borderRadius: "50%",
        background: style.bg,
        border: `1.5px solid ${style.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "default",
        outline: focused ? `2px solid ${style.border}` : "none",
        outlineOffset: 2,
        zIndex: showTooltip ? 20 : 1,
      }}
    >
      {/* Team label — abbreviated, visible at all times */}
      <span
        style={{
          fontSize: 8,
          fontWeight: 700,
          color: style.color,
          textAlign: "center",
          lineHeight: 1.1,
          padding: "0 3px",
          userSelect: "none",
          pointerEvents: "none",
          maxWidth: style.size - 6,
          overflow: "hidden",
          display: "block",
        }}
      >
        {team.split(" ")[0]}
      </span>

      {/* aiBuilder marker — small dot + label above the node */}
      {aiBuilder && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -18,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(250,204,21,0.9)",
            color: "#713f12",
            fontSize: 7,
            fontWeight: 700,
            borderRadius: 4,
            padding: "1px 4px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            lineHeight: 1.4,
            border: "1px solid rgba(250,204,21,0.6)",
          }}
        >
          builds AI
        </span>
      )}

      {/* Tooltip on hover / focus */}
      {showTooltip && (
        <div
          id={tooltipId}
          role="tooltip"
          style={{
            position: "absolute",
            bottom: style.size + 6,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--upvest-ink, #0e1238)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 500,
            borderRadius: 6,
            padding: "6px 10px",
            whiteSpace: "nowrap",
            maxWidth: 220,
            whiteSpaceCollapse: "preserve",
            pointerEvents: "none",
            zIndex: 30,
            boxShadow: "0 4px 12px rgba(0,0,0,0.22)",
            lineHeight: 1.4,
          }}
        >
          <strong style={{ display: "block", marginBottom: 2, fontSize: 12 }}>
            {team}
          </strong>
          <span style={{ color: "rgba(255,255,255,0.75)" }}>{note}</span>
        </div>
      )}
    </div>
  );
}

// ─── Mobile list fallback ─────────────────────────────────────────────────────
// Shown at ≤640px instead of the scatter plot to avoid overflow + node overlap.
// Groups nodes by class (Now → Next → Later), shows team + note + class badge.

const CLASS_ORDER: NodeClass[] = ["Now", "Next", "Later"];

function MobileNodeList({ nodes }: { nodes: typeof aiChallengeContent.teams.nodes }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {CLASS_ORDER.map((cls) => {
        const group = nodes.filter((n) => n.class === cls);
        if (!group.length) return null;
        const s = nodeStyle(cls);
        return (
          <div key={cls}>
            {/* Group header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: s.bg,
                  border: `1.5px solid ${s.border}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: s.color,
                }}
              >
                {cls}
              </span>
            </div>
            {/* Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {group.map((node) => (
                <div
                  key={node.team}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    padding: "6px 8px",
                    borderRadius: 8,
                    background: s.bg,
                    border: `1px solid ${s.border}`,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "var(--upvest-ink, #0e1238)",
                        marginBottom: 1,
                      }}
                    >
                      {node.team}
                      {node.aiBuilder && (
                        <span
                          aria-label="builds AI"
                          style={{
                            marginLeft: 5,
                            background: "rgba(250,204,21,0.9)",
                            color: "#713f12",
                            fontSize: 7,
                            fontWeight: 700,
                            borderRadius: 3,
                            padding: "1px 4px",
                            border: "1px solid rgba(250,204,21,0.6)",
                            lineHeight: 1.4,
                            verticalAlign: "middle",
                          }}
                        >
                          builds AI
                        </span>
                      )}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "var(--upvest-muted, #5b6079)",
                        lineHeight: 1.4,
                      }}
                    >
                      {node.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Responsive styles ────────────────────────────────────────────────────────
// .teams-plot  hidden at ≤640px; visible above.
// .teams-list  visible at ≤640px; hidden above.

const RESPONSIVE_STYLES = `
  .teams-plot { display: block; }
  .teams-list { display: none; }
  @media (max-width: 640px) {
    .teams-plot { display: none; }
    .teams-list { display: block; }
  }
`;

// ─── Main component ───────────────────────────────────────────────────────────

export function TeamsMapSlide(): React.JSX.Element {
  const headline = aiChallengeContent.teams.headline;
  const nodes = aiChallengeContent.teams.nodes;

  return (
    <ScrollScene
      id="teams"
      variant="light"
      animation="fade"
      className="flex min-h-screen flex-col items-center justify-center px-4 py-16"
    >
        <div className="mx-auto w-full max-w-3xl flex flex-col gap-8">
          {/* Inject responsive CSS — scoped to these class names */}
          <style dangerouslySetInnerHTML={{ __html: RESPONSIVE_STYLES }} />

          {/* Headline */}
          <div className="text-center">
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--upvest-accent, #4f5bff)" }}
            >
              AI Opportunity Mapping
            </p>
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: "var(--upvest-ink, #0e1238)", lineHeight: 1.25 }}
            >
              {headline}
            </h2>
          </div>

          {/* ── Desktop: scatter plot ── */}
          <div className="teams-plot">
            {/* Padding-bottom trick maintains aspect ratio; plot fills it absolutely */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "min(60%, 420px)" }}
            >
              <div
                aria-label="Impact vs Risk scatter plot for 10 teams"
                role="img"
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "1px solid rgba(79,91,255,0.14)",
                  borderRadius: 12,
                  background: "var(--upvest-surface, #fff)",
                  boxShadow: "0 2px 12px rgba(14,18,56,0.06)",
                  overflow: "visible",
                }}
              >
                {/* Y-axis label — inset so it doesn't escape the padded wrapper */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 4,
                    top: "50%",
                    transform: "translateY(-50%) rotate(-90deg)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--upvest-muted, #5b6079)",
                    whiteSpace: "nowrap",
                    transformOrigin: "center center",
                  }}
                >
                  Risk
                </span>

                {/* X-axis label */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: -26,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--upvest-muted, #5b6079)",
                    whiteSpace: "nowrap",
                  }}
                >
                  AI impact
                </span>

                {/* Gridlines */}
                <svg
                  aria-hidden="true"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                >
                  {[0.25, 0.5, 0.75].map((t) => (
                    <React.Fragment key={t}>
                      <line
                        x1="0" y1={`${(1 - t) * 100}%`}
                        x2="100%" y2={`${(1 - t) * 100}%`}
                        stroke="rgba(79,91,255,0.07)" strokeWidth="1" strokeDasharray="4 4"
                      />
                      <line
                        x1={`${t * 100}%`} y1="0"
                        x2={`${t * 100}%`} y2="100%"
                        stroke="rgba(79,91,255,0.07)" strokeWidth="1" strokeDasharray="4 4"
                      />
                    </React.Fragment>
                  ))}
                </svg>

                {/* Nodes */}
                {nodes.map((node) => (
                  <TeamNode
                    key={node.team}
                    team={node.team}
                    impact={node.impact}
                    risk={node.risk}
                    note={node.note}
                    cls={node.class}
                    aiBuilder={node.aiBuilder}
                  />
                ))}
              </div>
            </div>

            {/* Legend + aiBuilder key */}
            <div
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
              style={{ marginTop: 40 }}
            >
              {LEGEND.map(({ cls, label }) => {
                const s = nodeStyle(cls);
                return (
                  <span key={cls} className="flex items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      style={{
                        display: "inline-block",
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: s.bg,
                        border: `1.5px solid ${s.border}`,
                      }}
                    />
                    <span style={{ fontSize: 11, color: "var(--upvest-muted, #5b6079)", fontWeight: 600 }}>
                      {label}
                    </span>
                  </span>
                );
              })}
              <span className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    background: "rgba(250,204,21,0.9)",
                    color: "#713f12",
                    fontSize: 7,
                    fontWeight: 700,
                    borderRadius: 4,
                    padding: "1px 5px",
                    border: "1px solid rgba(250,204,21,0.6)",
                    lineHeight: 1.5,
                  }}
                >
                  builds AI
                </span>
                <span style={{ fontSize: 11, color: "var(--upvest-muted, #5b6079)", fontWeight: 600 }}>
                  Builds AI tools
                </span>
              </span>
            </div>
          </div>

          {/* ── Mobile: compact grouped list ── */}
          <div className="teams-list max-w-full overflow-x-hidden">
            <MobileNodeList nodes={nodes} />
          </div>
        </div>
    </ScrollScene>
  );
}
