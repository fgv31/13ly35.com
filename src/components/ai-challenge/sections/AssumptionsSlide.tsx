"use client";

import React from "react";
import { aiChallengeContent } from "@/data/ai-challenge";
import { ScrollScene } from "@/components/ai-challenge/ScrollScene";

// ─── Inline SVG icon map ───────────────────────────────────────────────────────

const ICONS: Record<string, React.ReactNode> = {
  /** Spectrum: a row of circles growing in size — conveys a gradient/range */
  spectrum: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-6 h-6"
    >
      <circle cx="4" cy="12" r="1.5" />
      <circle cx="9.5" cy="12" r="2.5" />
      <circle cx="16" cy="12" r="3.5" />
      <circle cx="22" cy="12" r="1" />
    </svg>
  ),

  /** Measure: a ruler / scale — conveys measurement and attribution */
  measure: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-6 h-6"
    >
      <rect x="2" y="8" width="20" height="8" rx="1" />
      <line x1="6" y1="8" x2="6" y2="13" />
      <line x1="10" y1="8" x2="10" y2="11" />
      <line x1="14" y1="8" x2="14" y2="13" />
      <line x1="18" y1="8" x2="18" y2="11" />
    </svg>
  ),

  /** Filter: a funnel — conveys filtering criteria */
  filter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-6 h-6"
    >
      <polygon points="3 4 21 4 14 13 14 20 10 20 10 13 3 4" />
    </svg>
  ),
};

/** Fallback icon when iconKey is unrecognised */
const FallbackIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    aria-hidden="true"
    className="w-6 h-6"
  >
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <circle cx="12" cy="16" r="0.5" fill="currentColor" />
  </svg>
);

// ─── Component ─────────────────────────────────────────────────────────────────

export function AssumptionsSlide(): React.JSX.Element {
  const { headline, items } = aiChallengeContent.assumptions;

  return (
    <ScrollScene
      id="assumptions"
      variant="tint"
      animation="stagger"
      className="flex flex-col items-center justify-center px-6 py-20 min-h-screen"
    >
      {/* Section headline — not staggered, reveals with the section */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2
          className="text-2xl font-semibold sm:text-3xl"
          style={{ color: "var(--upvest-ink)", lineHeight: 1.3 }}
        >
          {headline}
        </h2>
      </div>

      {/* Cards — each marked data-stagger so ScrollScene reveals them one-by-one */}
      <ol className="mx-auto flex w-full max-w-2xl flex-col gap-6 list-none p-0">
        {items.map(({ n, iconKey, label, body }) => (
          <li
            key={n}
            data-stagger
            className="flex gap-5 rounded-xl p-6"
            style={{
              background: "var(--upvest-surface, #fff)",
              border: "1px solid var(--upvest-border, rgba(0,0,0,0.08))",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {/* Left: number + icon */}
            <div className="flex flex-shrink-0 flex-col items-center gap-2 pt-0.5">
              <span
                className="text-xs font-bold tabular-nums"
                style={{ color: "var(--upvest-accent, #0057ff)" }}
              >
                {String(n).padStart(2, "0")}
              </span>
              <span style={{ color: "var(--upvest-accent, #0057ff)" }}>
                {ICONS[iconKey] ?? FallbackIcon}
              </span>
            </div>

            {/* Right: label + body */}
            <div className="flex flex-col gap-2">
              <p
                className="text-base font-semibold leading-snug"
                style={{ color: "var(--upvest-ink)" }}
              >
                {label}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--upvest-muted, rgba(0,0,0,0.55))" }}
              >
                {body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </ScrollScene>
  );
}
