"use client";

import React from "react";
import { aiChallengeContent } from "@/data/ai-challenge";
import { ScrollScene } from "@/components/ai-challenge/ScrollScene";
import { AmbientCanvas } from "@/components/ai-challenge/AmbientCanvas";

export function HeroSlide(): React.JSX.Element {
  const { kicker, title, subtitle } = aiChallengeContent.hero;

  return (
    <ScrollScene
      id="hero"
      variant="light"
      animation="fade"
      className="relative flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Three.js ambient — fills the section, sits behind text */}
      <AmbientCanvas
        variant="hero"
        tone="light"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Content layer */}
      <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center gap-6 px-6 py-24 text-center">
        {/* Upvest logo — dark SVG reads naturally on white; no filter or inversion needed */}
        <div className="mb-2">
          <img
            src="/challenge/upvest-logo.svg"
            alt="Upvest"
            width={120}
            height={32}
          />
        </div>

        {/* Kicker */}
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--upvest-accent)" }}
        >
          {kicker}
        </p>

        {/* Title */}
        <h1
          className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          style={{ letterSpacing: "-0.02em", color: "var(--upvest-ink)" }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg leading-relaxed max-w-2xl"
          style={{ color: "var(--upvest-muted)" }}
        >
          {subtitle}
        </p>
      </div>
    </ScrollScene>
  );
}
