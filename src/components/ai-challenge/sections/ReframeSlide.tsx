"use client";

import React from "react";
import { aiChallengeContent } from "@/data/ai-challenge";
import { ScrollScene } from "@/components/ai-challenge/ScrollScene";
import { StageScene } from "@/components/ai-challenge/StageScene";

// Smoothstep ramp for progress-driven reveals (0 below a, 1 above b, eased).
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
function ramp(p: number, a: number, b: number): number {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
}
function revealStyle(opacity: number): React.CSSProperties {
  return {
    opacity,
    transform: `translate3d(0, ${(1 - opacity) * 26}px, 0)`,
    willChange: "opacity, transform",
  };
}

// ─── ReframeSetupSlide ────────────────────────────────────────────────────────
// Surfaces the reframe.setup paragraph and the bigQuestion.
// animation="rise" — section enters as a single block.

export function ReframeSetupSlide(): React.JSX.Element {
  const { setup, bigQuestion } = aiChallengeContent.reframe;

  return (
    <ScrollScene
      id="reframe-setup"
      variant="dark"
      animation="rise"
      className="flex items-center justify-center px-6 py-24"
    >
      <div className="mx-auto max-w-3xl flex flex-col gap-8">
        {/* Kicker */}
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--upvest-accent)" }}
        >
          Reframe
        </p>

        {/* Setup — the "but notice the shape of the question" paragraph */}
        <p
          className="text-base sm:text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          {setup}
        </p>

        {/* Big question — emphasised */}
        <blockquote
          className="rounded-2xl p-8"
          style={{
            background: "rgba(79,91,255,0.10)",
            borderLeft: "4px solid var(--upvest-accent)",
          }}
        >
          <p
            className="text-xl sm:text-2xl font-semibold leading-snug"
            style={{ color: "#fff", letterSpacing: "-0.01em" }}
          >
            {bigQuestion}
          </p>
        </blockquote>
      </div>
    </ScrollScene>
  );
}

// ─── ReframePayoffSlide ───────────────────────────────────────────────────────
// Stepped reveal: 4 steps.
//   step 0 — intro label + bigQuestion recap
//   step 1 — moves[0] (Shared AI infrastructure)
//   step 2 — moves[0..1] (+ Integrations)
//   step 3 — moves[0..2] (+ AI literacy) + enabler + caution
//
// Stacked fallback (reduced-motion / mobile): all steps rendered; each step
// adds its content incrementally so nothing is hidden in the stacked layout.

export function ReframePayoffSlide(): React.JSX.Element {
  const { bigQuestion, moves, enabler, caution } = aiChallengeContent.reframe;

  const QuestionRecap = (
    <blockquote
      className="rounded-2xl p-6"
      style={{
        background: "rgba(79,91,255,0.08)",
        borderLeft: "4px solid var(--upvest-accent)",
      }}
    >
      <p
        className="text-base sm:text-lg font-medium leading-snug"
        style={{ color: "rgba(255,255,255,0.80)" }}
      >
        {bigQuestion}
      </p>
    </blockquote>
  );

  const MoveCard = ({ move, i }: { move: { label: string; body: string }; i: number }) => (
    <div
      className="flex flex-col gap-4 rounded-2xl p-7"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1.5px solid rgba(79,91,255,0.20)",
      }}
    >
      <span className="text-xs font-bold tabular-nums" style={{ color: "var(--upvest-accent)" }}>
        {String(i + 1).padStart(2, "0")}
      </span>
      <h3 className="text-base font-semibold leading-snug" style={{ color: "#fff" }}>
        {move.label}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
        {move.body}
      </p>
    </div>
  );

  const Resolve = (
    <>
      <p
        className="text-sm sm:text-base leading-relaxed"
        style={{
          color: "rgba(255,255,255,0.75)",
          borderLeft: "3px solid var(--upvest-accent)",
          paddingLeft: "1rem",
        }}
      >
        {enabler}
      </p>
      <div
        className="rounded-xl px-6 py-5 flex gap-4 items-start"
        style={{
          background: "rgba(255,180,0,0.06)",
          border: "1.5px solid rgba(255,180,0,0.22)",
        }}
      >
        <span
          className="shrink-0 text-xs font-bold uppercase tracking-wider mt-0.5"
          style={{ color: "rgba(255,200,0,0.85)" }}
        >
          Caution
        </span>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
          {caution}
        </p>
      </div>
    </>
  );

  return (
    <StageScene
      id="reframe-payoff"
      variant="dark"
      steps={4}
      className="flex items-center justify-center px-6 py-24"
    >
      {({ progress, stacked }) => {
        // Stacked fallback: everything visible in flow.
        if (stacked) {
          return (
            <div className="mx-auto max-w-5xl w-full flex flex-col gap-8">
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--upvest-accent)" }}
              >
                Three moves
              </p>
              {QuestionRecap}
              <div className="flex flex-col gap-5">
                {moves.map((move, i) => (
                  <MoveCard key={move.label} move={move} i={i} />
                ))}
              </div>
              {Resolve}
            </div>
          );
        }

        // Animated path: each move + the resolve rise in off continuous progress.
        const p = progress;
        const moveOp = (i: number) => ramp(p, 0.16 + i * 0.26, 0.34 + i * 0.26);
        const resolveOp = ramp(p, 0.84, 0.98);

        return (
          <div className="mx-auto max-w-5xl w-full flex flex-col gap-8">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--upvest-accent)" }}
            >
              Three moves
            </p>
            {QuestionRecap}
            <div className="flex flex-col gap-5">
              {moves.map((move, i) => (
                <div key={move.label} style={revealStyle(moveOp(i))}>
                  <MoveCard move={move} i={i} />
                </div>
              ))}
            </div>
            <div style={revealStyle(resolveOp)} className="flex flex-col gap-8">
              {Resolve}
            </div>
          </div>
        );
      }}
    </StageScene>
  );
}
