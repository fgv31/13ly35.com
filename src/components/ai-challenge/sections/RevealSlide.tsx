"use client";

import React from "react";
import { aiChallengeContent } from "@/data/ai-challenge";
import { StageScene } from "../StageScene";

// ── Progress helpers ──────────────────────────────────────────────────────────
// Smoothstep ramp: 0 below `a`, 1 above `b`, eased in between. Used to turn the
// stage's continuous 0..1 progress into per-scene opacity so scenes cross-dissolve
// rather than hard-cut.

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
function ramp(p: number, a: number, b: number): number {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
}

// A scene's drift+fade as a single style, driven by progress.
function sceneStyle(opacity: number, y: number): React.CSSProperties {
  return {
    opacity,
    transform: `translate3d(0, ${y}px, 0)`,
    pointerEvents: opacity > 0.5 ? "auto" : "none",
    willChange: "opacity, transform",
  };
}

function colourFor(cls: "Now" | "Next" | "Later"): {
  tag: React.CSSProperties;
  pill: React.CSSProperties;
} {
  if (cls === "Now")
    return {
      tag: { background: "var(--upvest-accent)", color: "#fff" },
      pill: { background: "var(--upvest-accent-soft)", color: "var(--upvest-accent)" },
    };
  if (cls === "Next")
    return {
      tag: { background: "rgba(91,96,121,0.15)", color: "var(--upvest-muted)" },
      pill: { background: "rgba(91,96,121,0.10)", color: "var(--upvest-muted)" },
    };
  return {
    tag: { background: "rgba(91,96,121,0.08)", color: "var(--upvest-muted)", opacity: 0.7 },
    pill: { background: "rgba(91,96,121,0.07)", color: "var(--upvest-muted)", opacity: 0.65 },
  };
}

// ── Scenes (pure content, no transition state — parent drives opacity) ─────────

function Intro() {
  return (
    <div className="text-center">
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: "var(--upvest-accent)" }}
      >
        The verdict
      </p>
      <h2
        className="text-4xl font-extrabold tracking-tight leading-tight"
        style={{ color: "#fff" }}
      >
        Now the answer&hellip;
      </h2>
      <p
        className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
        style={{ color: "rgba(255,255,255,0.66)" }}
      >
        Two questions. One clear lead, one deliberate hold — and a full
        classification of where each team sits.
      </p>
    </div>
  );
}

function LeadPanel() {
  const { lead } = aiChallengeContent.reveal;
  return (
    <div
      className="relative flex flex-col gap-5 rounded-2xl p-8"
      style={{
        background: "var(--upvest-accent-soft)",
        border: "2px solid var(--upvest-accent)",
        boxShadow: "0 0 0 4px rgba(79,91,255,0.08), 0 8px 32px rgba(79,91,255,0.18)",
      }}
    >
      <span
        className="absolute top-5 right-5 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
        style={{ background: "var(--upvest-accent)", color: "#fff" }}
      >
        Lead — {lead.q}
      </span>
      <span
        className="self-start text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full"
        style={{ background: "rgba(79,91,255,0.15)", color: "var(--upvest-accent)" }}
      >
        {lead.q}
      </span>
      <h2
        className="text-3xl font-extrabold leading-none tracking-tight"
        style={{ color: "var(--upvest-ink)" }}
      >
        {lead.team}
      </h2>
      <p className="text-sm leading-relaxed" style={{ color: "var(--upvest-muted)" }}>
        {lead.detail}
      </p>
    </div>
  );
}

function HoldPanel() {
  const { hold } = aiChallengeContent.reveal;
  return (
    <div
      className="relative flex flex-col gap-5 rounded-2xl p-8 h-full"
      style={{
        background: "var(--upvest-surface)",
        border: "1.5px solid rgba(79,91,255,0.12)",
      }}
    >
      <span
        className="absolute top-5 right-5 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
        style={{ background: "rgba(91,96,121,0.12)", color: "var(--upvest-muted)" }}
      >
        Hold — {hold.q}
      </span>
      <span
        className="self-start text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full"
        style={{ background: "rgba(91,96,121,0.10)", color: "var(--upvest-muted)" }}
      >
        {hold.q}
      </span>
      <h2
        className="text-3xl font-extrabold leading-none tracking-tight"
        style={{ color: "var(--upvest-ink)" }}
      >
        {hold.team}
      </h2>
      <p className="text-sm leading-relaxed" style={{ color: "var(--upvest-muted)" }}>
        {hold.detail}
      </p>
      <p
        className="mt-auto pt-4 text-xs leading-snug"
        style={{
          color: "var(--upvest-muted)",
          borderTop: "1px solid rgba(79,91,255,0.08)",
          opacity: 0.75,
        }}
      >
        {hold.captionNote}
      </p>
    </div>
  );
}

// Compare scene: Operations (lead, slightly dimmed for context) beside People.
function ComparePanel() {
  return (
    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="opacity-50">
        <LeadPanel />
      </div>
      <HoldPanel />
    </div>
  );
}

function ClassificationPanel() {
  const { classification } = aiChallengeContent.reveal;
  const columns: { label: "Now" | "Next" | "Later"; teams: string[] }[] = [
    { label: "Now", teams: classification.now },
    { label: "Next", teams: classification.next },
    { label: "Later", teams: classification.later },
  ];
  return (
    <div className="w-full">
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-6 text-center"
        style={{ color: "var(--upvest-accent)" }}
      >
        All ten teams — sorted
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {columns.map(({ label, teams }) => {
          const styles = colourFor(label);
          return (
            <div
              key={label}
              className="flex flex-col gap-3 rounded-2xl p-6"
              style={{
                background: "var(--upvest-surface)",
                border: "1.5px solid rgba(79,91,255,0.10)",
              }}
            >
              <span
                className="self-start text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                style={styles.tag}
              >
                {label}
              </span>
              <ul className="flex flex-col gap-2 mt-1">
                {teams.map((team) => (
                  <li
                    key={team}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg"
                    style={styles.pill}
                  >
                    {team}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function RevealSlide(): React.JSX.Element {
  return (
    <StageScene id="reveal" variant="dark" steps={4}>
      {({ progress, stacked }) => {
        // Stacked fallback (reduced-motion / mobile): everything in flow, visible.
        if (stacked) {
          return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-14 px-6 py-20 md:px-16">
              <div className="w-full max-w-5xl">
                <Intro />
              </div>
              <div className="w-full max-w-5xl">
                <ComparePanel />
              </div>
              <div className="w-full max-w-5xl">
                <ClassificationPanel />
              </div>
            </div>
          );
        }

        // Animated path: absolute-layered scenes cross-dissolving off `progress`.
        const p = progress;

        const aOp = 1 - ramp(p, 0.08, 0.24);
        const aY = -ramp(p, 0.08, 0.24) * 40;

        const bIn = ramp(p, 0.14, 0.3);
        const bOut = ramp(p, 0.4, 0.56);
        const bOp = bIn * (1 - bOut);
        const bY = (1 - bIn) * 44 - bOut * 30;

        const cIn = ramp(p, 0.46, 0.62);
        const cOut = ramp(p, 0.74, 0.88);
        const cOp = cIn * (1 - cOut);
        const cY = (1 - cIn) * 44 - cOut * 30;

        const dIn = ramp(p, 0.78, 0.94);
        const dOp = dIn;
        const dY = (1 - dIn) * 44;

        return (
          <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 md:px-16 lg:px-24">
            {/* Scene A — intro */}
            <div
              className="absolute inset-0 flex items-center justify-center px-6 md:px-16 lg:px-24"
              style={sceneStyle(aOp, aY)}
              aria-hidden={aOp < 0.5}
            >
              <div className="w-full max-w-3xl">
                <Intro />
              </div>
            </div>

            {/* Scene B — Operations (Q1) solo */}
            <div
              className="absolute inset-0 flex items-center justify-center px-6 md:px-16 lg:px-24"
              style={sceneStyle(bOp, bY)}
              aria-hidden={bOp < 0.5}
            >
              <div className="w-full max-w-xl">
                <LeadPanel />
              </div>
            </div>

            {/* Scene C — People (Q2) rises beside a dimmed Operations */}
            <div
              className="absolute inset-0 flex items-center justify-center px-6 md:px-16 lg:px-24"
              style={sceneStyle(cOp, cY)}
              aria-hidden={cOp < 0.5}
            >
              <div className="w-full max-w-5xl">
                <ComparePanel />
              </div>
            </div>

            {/* Scene D — Now / Next / Later */}
            <div
              className="absolute inset-0 flex items-center justify-center px-6 md:px-16 lg:px-24"
              style={sceneStyle(dOp, dY)}
              aria-hidden={dOp < 0.5}
            >
              <div className="w-full max-w-5xl">
                <ClassificationPanel />
              </div>
            </div>
          </div>
        );
      }}
    </StageScene>
  );
}
