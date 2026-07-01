"use client";

import { useState } from "react";
import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

export default function DimensionsSlide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  // Derive which facet is active from meta.id: "dim-risk" → "risk", etc.
  const activeKey = meta.id.replace("dim-", "") as "risk" | "founder" | "nerd";

  // Per-facet expand state: default the activeKey facet open, others closed.
  const initialOpen = Object.fromEntries(
    v2Content.dimensions.map((d) => [d.key, d.key === activeKey]),
  ) as Record<string, boolean>;

  const [openMap, setOpenMap] = useState<Record<string, boolean>>(initialOpen);

  function toggle(key: string) {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <Slide meta={meta} index={index} transition="crossfade">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "clamp(2rem, 6vw, 5rem)",
          background: "transparent",
        }}
      >
        {/* Section kicker */}
        <p
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--upvest-accent)",
            marginBottom: "2.5rem",
            opacity: 0.85,
          }}
        >
          Why me
        </p>

        {/* Triad grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
            width: "100%",
            maxWidth: "960px",
          }}
        >
          {v2Content.dimensions.map((facet) => {
            const isActive = facet.key === activeKey;
            const isOpen = openMap[facet.key] ?? false;

            return (
              <div
                key={facet.key}
                style={{
                  borderRadius: "12px",
                  border: `2px solid ${isActive ? facet.accent : `${facet.accent}55`}`,
                  background: isActive
                    ? `${facet.accent}18`
                    : "var(--upvest-surface, rgba(255,255,255,0.05))",
                  boxShadow: isActive
                    ? `0 0 0 1px ${facet.accent}33, 0 4px 24px ${facet.accent}22`
                    : "none",
                  transition:
                    "border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
                  overflow: "hidden",
                }}
              >
                {/* Facet header — the interactive toggle button */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`dim-details-${facet.key}`}
                  onClick={() => toggle(facet.key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "1.25rem 1.5rem",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "1rem",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Accent dot + label */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: facet.accent,
                          flexShrink: 0,
                          boxShadow: isActive ? `0 0 8px ${facet.accent}` : "none",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-sans, sans-serif)",
                          fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
                          fontWeight: isActive ? 700 : 600,
                          letterSpacing: "-0.01em",
                          color: isActive ? facet.accent : "var(--upvest-ink)",
                        }}
                      >
                        {facet.label}
                      </span>
                    </div>

                    {/* Summary — always visible */}
                    <p
                      style={{
                        fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
                        lineHeight: 1.55,
                        color: isActive ? "var(--upvest-ink)" : "var(--upvest-muted)",
                        margin: 0,
                      }}
                    >
                      {facet.summary}
                    </p>
                  </div>

                  {/* Chevron indicator */}
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{
                      flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      color: facet.accent,
                    }}
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Expandable details panel */}
                <div
                  id={`dim-details-${facet.key}`}
                  role="region"
                  aria-label={`${facet.label} details`}
                  style={{
                    display: isOpen ? "block" : "none",
                    padding: "0 1.5rem 1.5rem",
                    borderTop: `1px solid ${facet.accent}33`,
                  }}
                >
                  <ul
                    style={{
                      listStyle: "none",
                      margin: "1rem 0 0",
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.65rem",
                    }}
                  >
                    {facet.details.map((detail, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          gap: "0.6rem",
                          alignItems: "flex-start",
                          fontSize: "clamp(0.75rem, 1.1vw, 0.875rem)",
                          lineHeight: 1.55,
                          color: "var(--upvest-ink)",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            display: "inline-block",
                            marginTop: "0.45em",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: facet.accent,
                            flexShrink: 0,
                          }}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative accent rule */}
        <div
          style={{
            marginTop: "3rem",
            width: "3rem",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, var(--upvest-accent), transparent)",
            borderRadius: "1px",
          }}
        />
      </div>
    </Slide>
  );
}
