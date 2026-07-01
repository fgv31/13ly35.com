"use client";

import Slide from "../Slide";
import type { SlideMeta } from "@/data/ai-challengev2";
import { v2Content } from "@/data/ai-challengev2";

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
        {/* Kicker */}
        <p
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--upvest-accent)",
            marginBottom: "1.5rem",
            opacity: 0.9,
          }}
        >
          {c.kicker}
        </p>

        {/* Upvest logo */}
        <div
          style={{
            marginBottom: "2.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/upvest-logo.svg"
            alt="Upvest"
            style={{
              height: "clamp(2rem, 4vw, 3.5rem)",
              width: "auto",
              // Tint to accent color via filter so single-color SVG follows the token
              filter:
                "invert(1) sepia(1) saturate(3) hue-rotate(200deg) brightness(1.1)",
              opacity: 0.92,
            }}
          />
        </div>

        {/* Title — large display type */}
        <h1
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#eef1fc",
            maxWidth: "18ch",
            margin: "0 auto 1.75rem",
            // Subtle translucent backdrop so text pops over the canvas
            textShadow: "0 2px 32px rgba(0,0,0,0.45)",
          }}
        >
          {c.title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
            lineHeight: 1.55,
            color: "rgba(238,241,252,0.74)",
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
