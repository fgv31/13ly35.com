"use client";

import React from "react";
import { aiChallengeContent } from "@/data/ai-challenge";
import { ScrollScene } from "@/components/ai-challenge/ScrollScene";

export function PhilosophySlide(): React.JSX.Element {
  const { kicker, headline, body, principles } = aiChallengeContent.philosophy;

  return (
    <ScrollScene id="philosophy" variant="light" animation="rise">
      <div className="flex flex-col justify-center min-h-screen px-6 py-20 md:px-16 lg:px-24 max-w-5xl mx-auto">
        {/* Kicker */}
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ color: "var(--upvest-accent)" }}
        >
          {kicker}
        </p>

        {/* Headline */}
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
          style={{ color: "var(--upvest-ink)" }}
        >
          {headline}
        </h2>

        {/* Body */}
        <p
          className="text-base md:text-lg leading-relaxed max-w-2xl mb-14"
          style={{ color: "var(--upvest-muted)" }}
        >
          {body}
        </p>

        {/* Principles */}
        <div className="grid gap-5 md:grid-cols-3">
          {principles.map((principle, i) => (
            <div
              key={principle.label}
              className="flex flex-col gap-3 rounded-xl p-6"
              style={{
                background: "var(--upvest-surface)",
                border: "1.5px solid rgba(79,91,255,0.12)",
              }}
            >
              {/* Principle number */}
              <span
                className="text-xs font-semibold tabular-nums"
                style={{ color: "var(--upvest-accent)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Principle label */}
              <h3
                className="text-base font-semibold leading-snug"
                style={{ color: "var(--upvest-ink)" }}
              >
                {principle.label}
              </h3>

              {/* Principle body */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--upvest-muted)" }}
              >
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ScrollScene>
  );
}
