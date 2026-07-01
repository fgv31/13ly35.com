"use client";

import React from "react";
import { aiChallengeContent } from "@/data/ai-challenge";
import { ScrollScene } from "@/components/ai-challenge/ScrollScene";

export function ArcSlide(): React.JSX.Element {
  const arc = aiChallengeContent.arc;

  return (
    <ScrollScene
      id="arc"
      variant="light"
      animation="stagger"
      className="flex flex-col justify-center px-6 py-24 min-h-screen"
    >
      {/* Identity line */}
      <p
        data-stagger
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: "var(--upvest-accent)" }}
      >
        {arc.role}
      </p>

      {/* Framing sentence */}
      <h2
        data-stagger
        className="text-2xl font-bold sm:text-3xl md:text-4xl mb-16 max-w-2xl"
        style={{ letterSpacing: "-0.02em", color: "var(--upvest-ink)" }}
      >
        {arc.sentence}
      </h2>

      {/* Builder → Founder → Enabler progression */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-0">
        {arc.steps.map((step, i) => (
          <React.Fragment key={step.label}>
            {/* Step card */}
            <div
              data-stagger
              className="flex-1 rounded-xl p-6 flex flex-col gap-3"
              style={{
                background: "var(--upvest-surface)",
                border: "1px solid var(--upvest-accent-soft)",
              }}
            >
              {/* Step number */}
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--upvest-accent)" }}
              >
                0{i + 1}
              </span>

              {/* Step label */}
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--upvest-ink)" }}
              >
                {step.label}
              </h3>

              {/* Step body */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--upvest-muted)" }}
              >
                {step.body}
              </p>
            </div>

            {/* Arrow connector between cards — hidden after last item */}
            {i < arc.steps.length - 1 && (
              <div
                className="flex items-center justify-center self-center md:px-3 text-xl font-bold select-none"
                style={{ color: "var(--upvest-accent)" }}
                aria-hidden="true"
              >
                {/* vertical on mobile, horizontal on md+ */}
                <span className="block md:hidden">↓</span>
                <span className="hidden md:block">→</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </ScrollScene>
  );
}
