"use client";

import { useDeck } from "./DeckController";
import { slideManifest } from "@/data/ai-challenge";

// Derive ordered unique chapters with their first slide index
const chapters: { label: string; firstIndex: number }[] = [];
const seen = new Set<string>();
slideManifest.forEach((slide, idx) => {
  if (!seen.has(slide.chapter)) {
    seen.add(slide.chapter);
    chapters.push({ label: slide.chapter, firstIndex: idx });
  }
});

export default function DeckNav() {
  const { activeIndex, total, go } = useDeck();
  const activeChapter = slideManifest[activeIndex]?.chapter ?? "";

  return (
    <nav
      aria-label="Slide navigation"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.75rem",
        pointerEvents: "none", // container transparent to clicks
      }}
    >
      {/* Chapter dots */}
      <ol
        aria-label="Chapter progress"
        style={{
          listStyle: "none",
          margin: 0,
          padding: "0.5rem 0.625rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
          background: "var(--upvest-surface, rgba(0,0,0,0.55))",
          borderRadius: "999px",
          pointerEvents: "auto",
        }}
      >
        {chapters.map(({ label, firstIndex }) => {
          const isActive = label === activeChapter;
          return (
            <li key={label}>
              <button
                onClick={() => go(firstIndex)}
                aria-label={`Go to chapter: ${label}`}
                aria-current={isActive ? "true" : undefined}
                title={label}
                style={{
                  display: "block",
                  width: "0.625rem",
                  height: "0.625rem",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  background: isActive
                    ? "var(--upvest-accent, #4f5bff)"
                    : "var(--upvest-muted, rgba(255,255,255,0.3))",
                  transition: "background 0.2s",
                }}
              />
            </li>
          );
        })}
      </ol>

      {/* Prev / Next + counter */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          pointerEvents: "auto",
          background: "var(--upvest-surface, rgba(0,0,0,0.55))",
          borderRadius: "999px",
          padding: "0.35rem 0.75rem",
        }}
      >
        <button
          onClick={() => go("prev")}
          aria-label="Previous slide"
          disabled={activeIndex === 0}
          style={{
            background: "none",
            border: "none",
            cursor: activeIndex === 0 ? "default" : "pointer",
            color:
              activeIndex === 0
                ? "var(--upvest-muted, rgba(255,255,255,0.3))"
                : "var(--upvest-accent, #4f5bff)",
            fontSize: "1rem",
            lineHeight: 1,
            padding: "0.1rem 0.25rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          ‹
        </button>

        <span
          aria-live="polite"
          aria-atomic="true"
          style={{
            fontSize: "0.7rem",
            color: "var(--upvest-ink, #fff)",
            fontVariantNumeric: "tabular-nums",
            minWidth: "2.5rem",
            textAlign: "center",
            letterSpacing: "0.04em",
          }}
        >
          {activeIndex + 1}&nbsp;/&nbsp;{total}
        </span>

        <button
          onClick={() => go("next")}
          aria-label="Next slide"
          disabled={activeIndex === total - 1}
          style={{
            background: "none",
            border: "none",
            cursor: activeIndex === total - 1 ? "default" : "pointer",
            color:
              activeIndex === total - 1
                ? "var(--upvest-muted, rgba(255,255,255,0.3))"
                : "var(--upvest-accent, #4f5bff)",
            fontSize: "1rem",
            lineHeight: 1,
            padding: "0.1rem 0.25rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          ›
        </button>
      </div>
    </nav>
  );
}
