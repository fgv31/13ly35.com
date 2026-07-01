"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

export default function ClosingSlide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const c = v2Content.closing;

  return (
    <Slide meta={meta} index={index} transition="scale">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "clamp(2rem, 6vw, 5rem)",
          textAlign: "center",
          // Transparent so the three.js canvas bleeds through
          background: "transparent",
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#eef1fc",
            maxWidth: "22ch",
            margin: "0 auto 2rem",
            textShadow: "0 2px 32px rgba(0,0,0,0.45)",
          }}
        >
          {c.headline}
        </h1>

        {/* Body text */}
        <p
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
            lineHeight: 1.6,
            color: "rgba(238,241,252,0.74)",
            maxWidth: "48ch",
            margin: "0 auto 3rem",
          }}
        >
          {c.body}
        </p>

        {/* CTA Button — real anchor */}
        <a
          href={c.cta.href}
          style={{
            display: "inline-block",
            padding: "0.75rem 2rem",
            backgroundColor: "var(--upvest-accent, #4f5bff)",
            color: "var(--upvest-ink, #f0f0f5)",
            textDecoration: "none",
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            fontWeight: 600,
            borderRadius: "0.375rem",
            transition: "all 0.2s ease",
            cursor: "pointer",
            border: "2px solid var(--upvest-accent, #4f5bff)",
            // Hover state via inline styles (fallback for browsers that don't support pseudo-classes in style attr)
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLAnchorElement;
            target.style.backgroundColor = "transparent";
            target.style.color = "var(--upvest-accent, #4f5bff)";
            target.style.transform = "translateY(-2px)";
            target.style.boxShadow = "0 8px 16px rgba(79, 91, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLAnchorElement;
            target.style.backgroundColor = "var(--upvest-accent, #4f5bff)";
            target.style.color = "var(--upvest-ink, #f0f0f5)";
            target.style.transform = "translateY(0)";
            target.style.boxShadow = "none";
          }}
        >
          {c.cta.label}
        </a>

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
