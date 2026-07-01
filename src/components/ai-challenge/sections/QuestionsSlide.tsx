"use client";

import React from "react";
import { aiChallengeContent } from "@/data/ai-challenge";
import { ScrollScene } from "@/components/ai-challenge/ScrollScene";

export function QuestionsSlide(): React.JSX.Element {
  const { kicker, preamble, q1, q2 } = aiChallengeContent.questions;

  return (
    <ScrollScene
      id="questions"
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
          {kicker}
        </p>

        {/* Preamble */}
        <p
          className="text-base leading-relaxed"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          {preamble}
        </p>

        {/* Prompt card — indigo */}
        <div
          className="rounded-2xl border p-8 flex flex-col gap-6"
          style={{
            background: "rgba(79,91,255,0.12)",
            borderColor: "rgba(79,91,255,0.35)",
          }}
        >
          {/* Q1 */}
          <div className="flex gap-4 items-start">
            <span
              className="shrink-0 rounded-full text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider"
              style={{
                background: "rgba(79,91,255,0.25)",
                color: "var(--upvest-accent)",
              }}
            >
              Q1
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              {q1}
            </p>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(79,91,255,0.2)" }} />

          {/* Q2 */}
          <div className="flex gap-4 items-start">
            <span
              className="shrink-0 rounded-full text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider"
              style={{
                background: "rgba(79,91,255,0.25)",
                color: "var(--upvest-accent)",
              }}
            >
              Q2
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              {q2}
            </p>
          </div>
        </div>
      </div>
    </ScrollScene>
  );
}
