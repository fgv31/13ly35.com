"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challenge";
import { v2Content } from "@/data/ai-challenge";

export default function WelcomeSlide({
  meta,
  index,
}: {
  meta: SlideMeta;
  index: number;
}) {
  const c = v2Content.welcome;

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
          textAlign: "center",
          // Transparent so the three.js canvas bleeds through
          background: "transparent",
        }}
      >
        {/* Line 1 — kicker */}
        <p
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(0.7rem, 1.3vw, 0.95rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--upvest-accent)",
            marginBottom: "1.75rem",
            fontWeight: 600,
          }}
        >
          {c.kicker}
        </p>

        {/* Line 2 — name @ Upvest logo */}
        <h1
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(0.5rem, 1.4vw, 1rem)",
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(2rem, 5vw, 4.25rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--upvest-ink, #0e1238)",
            margin: "0 0 1.75rem",
          }}
        >
          <span>{c.title}</span>
          <span
            aria-hidden="true"
            style={{
              color: "var(--upvest-muted, #5b6079)",
              fontWeight: 400,
            }}
          >
            @
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/upvest-logo-full.svg"
            alt="Upvest"
            style={{
              height: "clamp(1.6rem, 4vw, 3.4rem)",
              width: "auto",
              transform: "translateY(0.08em)",
            }}
          />
        </h1>

        {/* Line 3 — the sentence */}
        <p
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
            lineHeight: 1.55,
            color: "var(--upvest-muted, #5b6079)",
            maxWidth: "52ch",
            margin: "0 auto",
          }}
        >
          {c.subtitle}
        </p>

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
