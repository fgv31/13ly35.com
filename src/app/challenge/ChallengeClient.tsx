"use client";

import SectionWrapper from "@/components/challenge/SectionWrapper";
import Reveal from "@/components/challenge/Reveal";
import DrillDown from "@/components/challenge/DrillDown";
import StickyNav from "@/components/challenge/StickyNav";
import SlideArrows from "@/components/challenge/SlideArrows";
import { challengeContent, engagementSteps } from "@/data/challenge";

// Renders a structured table inside a DrillDown panel.
function DrillTable({
  headers,
  rows,
  note,
}: {
  headers: string[];
  rows: string[][];
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-lg border border-indigo-100">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-indigo-50 border-b border-indigo-100">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-indigo-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`${i % 2 === 1 ? "bg-slate-50/40" : ""} border-t border-gray-100 first:border-t-0`}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-3 py-2 align-top ${
                      j === 0 ? "text-xs font-semibold text-gray-900 whitespace-nowrap" : "text-xs text-slate-700"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="text-[11px] text-slate-500 italic leading-relaxed">{note}</p>}
    </div>
  );
}

// Renders a label : body list (definition-list style) inside a DrillDown.
function DrillKeyList({ items }: { items: { label: string; body: string }[] }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-4 gap-y-2">
      {items.map((it, i) => (
        <div key={i} className="contents">
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700 pt-0.5">
            {it.label}
          </dt>
          <dd className="text-xs text-slate-700 leading-relaxed">{it.body}</dd>
        </div>
      ))}
    </dl>
  );
}

// Renders a list of titled sections (each section has bullet items).
function DrillSections({
  sections,
}: {
  sections: { title: string; items: string[] }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sections.map((sec, i) => (
        <div key={i} className="rounded-lg bg-indigo-50/40 border border-indigo-100 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700 mb-2">
            {sec.title}
          </p>
          <ul className="flex flex-col gap-1">
            {sec.items.map((item, j) => (
              <li key={j} className="flex gap-2 text-xs text-slate-700 leading-snug">
                <span className="text-indigo-400 select-none">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Inline SVG icons for the philosophy principle cards.
function PrincipleIcon({
  iconKey,
}: {
  iconKey: "awareness" | "buffers" | "exclusions";
}) {
  const common = {
    width: 32,
    height: 32,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (iconKey === "awareness") {
    return (
      <svg {...common} aria-hidden>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (iconKey === "buffers") {
    return (
      <svg {...common} aria-hidden>
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  // exclusions
  return (
    <svg {...common} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6l12.8 12.8" />
    </svg>
  );
}

type Variant = "light" | "tint" | "dark";

interface Slide {
  id: string;
  chapter: string;
  variant: Variant;
}

const slides: Slide[] = [
  { id: "hero",                chapter: "Intro",                 variant: "light" },
  { id: "intro-text",          chapter: "Background",            variant: "tint"  },
  { id: "intro-pillars",       chapter: "Background",            variant: "tint"  },
  { id: "philosophy",          chapter: "Philosophy",            variant: "light" },

  { id: "q3-prompt",           chapter: "Q3 — Stakeholders",     variant: "tint"  },
  { id: "q3-star",             chapter: "Q3 — Stakeholders",     variant: "tint"  },
  { id: "q3-framework",        chapter: "Q3 — Stakeholders",     variant: "tint"  },

  { id: "q1-prompt",           chapter: "Q1 — ICAAP",            variant: "light" },
  { id: "q1-understand",       chapter: "Q1 — ICAAP",            variant: "light" },
  { id: "q1-anchors",          chapter: "Q1 — ICAAP",            variant: "light" },
  { id: "q1-framing",          chapter: "Q1 — ICAAP",            variant: "light" },
  { id: "q1-pillars",          chapter: "Q1 — ICAAP",            variant: "light" },
  { id: "q1-approaches",       chapter: "Q1 — ICAAP",            variant: "light" },
  { id: "q1-hybrid",           chapter: "Q1 — ICAAP",            variant: "light" },
  { id: "q1b-prompt",          chapter: "Q1 — ICAAP",            variant: "light" },
  { id: "q1b-applied",         chapter: "Q1 — ICAAP",            variant: "light" },

  { id: "q2-prompt",           chapter: "Q2 — SI",               variant: "tint"  },
  { id: "q2-understand",       chapter: "Q2 — SI",               variant: "tint"  },
  { id: "q2-reframe",          chapter: "Q2 — SI",               variant: "tint"  },
  { id: "q2-si",               chapter: "Q2 — SI",               variant: "tint"  },
  { id: "q2-shifts",           chapter: "Q2 — SI",               variant: "tint"  },
  { id: "q2-ewi",              chapter: "Q2 — SI",               variant: "tint"  },
  { id: "q2-failuremodes",     chapter: "Q2 — SI",               variant: "tint"  },
  { id: "q2-scenario",         chapter: "Q2 — SI",               variant: "tint"  },
  { id: "q2-deepdive",         chapter: "Q2 — SI",               variant: "tint"  },

  { id: "closing",             chapter: "Contact",               variant: "dark"  },
];

// First slide id per chapter — for the StickyNav dots
const chapterFirstIds = (() => {
  const seen = new Map<string, string>();
  slides.forEach((s) => {
    if (!seen.has(s.chapter)) seen.set(s.chapter, s.id);
  });
  return Array.from(seen.entries()).map(([chapter, id]) => ({
    id,
    label: chapter,
  }));
})();

export default function ChallengeClient() {
  return (
    <>
      <StickyNav items={chapterFirstIds} />
      <SlideArrows slides={slides.map((s) => ({ id: s.id, chapter: s.chapter }))} />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <SectionWrapper id="hero" variant="light">
        <div className="mx-auto max-w-5xl px-6 flex flex-col items-start gap-6">
          <Reveal delay={0} direction="fade">
            <img
              src="/challenge/upvest-logo.svg"
              alt="Upvest"
              width={120}
              height={32}
              className="mb-2"
            />
          </Reveal>
          <Reveal delay={0.1} direction="up">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              {challengeContent.hero.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.2} direction="up">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-gray-900">
              {challengeContent.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.35} direction="up">
            <p className="text-lg md:text-xl text-slate-600 max-w-prose">
              {challengeContent.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.5} direction="fade">
            <a
              href="#intro"
              aria-label="Scroll to intro"
              className="mt-8 text-2xl text-indigo-400 hover:text-indigo-600 transition-colors select-none"
            >
              ↓
            </a>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* ─── INTRO — text (The arc that points to Upvest) ─────────────────── */}
      <SectionWrapper id="intro-text" variant="tint">
        <div className="mx-auto max-w-3xl px-6 flex flex-col gap-8">
          <Reveal direction="up">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                The arc
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug">
                Supervisor &rarr; Builder &rarr; Operator.
              </h2>
            </div>
          </Reveal>
          <ul className="flex flex-col gap-5">
            {challengeContent.intro.whys.map((w, i) => (
              <Reveal key={i} direction="left" delay={0.1 + i * 0.1}>
                <li className="flex gap-4 items-start">
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-indigo-600 w-32 pt-1">
                    {w.label}
                  </span>
                  <span className="text-sm md:text-base text-slate-700 leading-relaxed">
                    {w.body}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal direction="up" delay={0.5}>
            <p className="text-sm md:text-base text-slate-600 italic border-l-4 border-indigo-500 pl-4">
              Upvest is where supervision, building, and scale converge.
            </p>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* ─── INTRO — pillars ──────────────────────────────────────────────── */}
      <SectionWrapper id="intro-pillars" variant="tint">
        <div className="mx-auto max-w-4xl px-6 flex flex-col gap-6">
          <Reveal direction="up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Three things I bring.
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challengeContent.intro.pillars.map((pillar, i) => (
              <Reveal key={i} direction="up" delay={i * 0.12}>
                <div className="rounded-xl bg-white border-l-4 border-indigo-500 shadow-sm p-5 flex flex-col gap-2 h-full">
                  <div className="font-semibold text-gray-900">{pillar.label}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── PHILOSOPHY — merged: headline + body + principles + quote ────── */}
      <SectionWrapper id="philosophy" variant="light">
        <div className="mx-auto max-w-6xl px-6 flex flex-col gap-5">
          <Reveal direction="up">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              {challengeContent.philosophy.kicker}
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.05}>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight tracking-tight text-gray-900">
              {challengeContent.philosophy.headline}
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.12}>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl">
              {challengeContent.philosophy.body}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {challengeContent.philosophy.principles.map((p, i) => (
              <Reveal key={p.iconKey} direction="up" delay={0.2 + i * 0.1}>
                <div className="h-full rounded-xl bg-white border border-indigo-100 shadow-sm p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600">
                    <PrincipleIcon iconKey={p.iconKey} />
                  </div>
                  <h4 className="text-base font-semibold text-gray-900">{p.label}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal direction="up" delay={0.55}>
            <blockquote className="mx-auto max-w-3xl border-l-4 border-indigo-500 py-2 pl-5 pr-3 text-center italic text-slate-600 text-sm md:text-base leading-relaxed">
              {challengeContent.philosophy.quote}
            </blockquote>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* ─── Q3 — Prompt ──────────────────────────────────────────────────── */}
      <SectionWrapper id="q3-prompt" variant="tint">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal direction="up">
            <div className="border-l-4 border-indigo-500 bg-white rounded-xl shadow-sm p-8 flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                {challengeContent.q3.kicker}
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                {challengeContent.q3.question.title}
              </h2>
              <p className="text-sm md:text-base text-slate-600 italic leading-relaxed border-t border-gray-100 pt-3 mt-1">
                {challengeContent.q3.question.preamble}
              </p>
              <ul className="flex flex-col gap-3 mt-1">
                {challengeContent.q3.question.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-slate-700 text-sm md:text-base leading-relaxed">
                    <span className="mt-1 text-indigo-500 select-none font-bold">•</span>
                    <em>{bullet}</em>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* ─── Q3 — The Omnibus Clearstream account experience ──────────────── */}
      <SectionWrapper id="q3-star" variant="tint">
        <div className="mx-auto max-w-7xl px-6 flex flex-col gap-4">
          <Reveal direction="up">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              The Omnibus Clearstream account experience.
            </h3>
          </Reveal>
          {/* Situation · Task · Result on top */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(
              [
                { key: "situation", label: "Situation", data: challengeContent.q3.star.situation },
                { key: "task",      label: "Task",      data: challengeContent.q3.star.task      },
                { key: "result",    label: "Result",    data: challengeContent.q3.star.result    },
              ] as const
            ).map(({ key, label, data }, i) => (
              <Reveal key={key} direction="up" delay={i * 0.08}>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-2 h-full">
                  <span className="inline-block self-start rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-semibold px-2.5 py-0.5 uppercase tracking-wide">
                    {label}
                  </span>
                  <h4 className="text-xs font-semibold text-gray-900 leading-snug">
                    {data.headline}
                  </h4>
                  <ul className="flex flex-col gap-0.5 flex-1">
                    {data.bullets.map((b, j) => (
                      <li key={j} className="flex gap-1.5 text-slate-600 text-[11px] leading-snug">
                        <span className="text-indigo-400 select-none mt-0.5">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Actions — 7-step framework row below */}
          <Reveal direction="up" delay={0.25}>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3">
              <div className="flex items-baseline gap-2">
                <span className="inline-block rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-semibold px-2.5 py-0.5 uppercase tracking-wide">
                  Actions
                </span>
                <p className="text-xs text-slate-600 italic">
                  {challengeContent.q3.star.actions.headline}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {challengeContent.q3.star.actions.steps.map((step, i) => (
                  <Reveal key={step.n} direction="left" delay={0.3 + i * 0.04}>
                    <div className="h-full rounded-lg bg-indigo-50/40 border border-indigo-100 p-2.5 flex flex-col gap-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold text-indigo-500 leading-none">{step.n}</span>
                        <span className="text-[10px] font-semibold text-gray-900 leading-tight">
                          {step.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-snug">{step.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* ─── Q3 — Framework + anchor ──────────────────────────────────────── */}
      <SectionWrapper id="q3-framework" variant="tint">
        <div className="mx-auto max-w-6xl px-6 flex flex-col gap-10">
          <Reveal direction="up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              How I engage stakeholders — seven steps.
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {engagementSteps.map((step, i) => (
              <Reveal key={step.n} direction="left" delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-2 h-full">
                  <span className="text-3xl font-bold text-indigo-500 leading-none">
                    {step.n}
                  </span>
                  <p className="text-sm font-semibold text-gray-900">{step.label}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.oneLine}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal direction="up" delay={0.1}>
            <blockquote className="mx-auto max-w-3xl border-l-4 border-indigo-500 py-5 pl-7 pr-4 italic text-slate-600 text-base md:text-lg leading-relaxed text-center">
              {challengeContent.q3.anchor}
            </blockquote>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* ─── Q1 — Prompt ──────────────────────────────────────────────────── */}
      <SectionWrapper id="q1-prompt" variant="light">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal direction="up">
            <div className="border-l-4 border-indigo-500 bg-white rounded-xl shadow-sm p-8 flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                {challengeContent.q1.kicker}
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                {challengeContent.q1.question.title}
              </h2>
              <p className="text-sm md:text-base text-slate-600 italic leading-relaxed border-t border-gray-100 pt-3 mt-1">
                {challengeContent.q1.question.preamble}
              </p>
              <ul className="flex flex-col gap-3 mt-1">
                {challengeContent.q1.question.subQuestions.map((sq, i) => (
                  <li key={i} className="flex gap-2 text-slate-700 text-sm md:text-base leading-relaxed">
                    <span className="mt-1 text-indigo-500 select-none font-bold">•</span>
                    <em>{sq}</em>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* ─── Q1 — Understand the question ─────────────────────────────────── */}
      <SectionWrapper id="q1-understand" variant="light">
        <div className="mx-auto max-w-4xl px-6 flex flex-col gap-6">
          <Reveal direction="up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {challengeContent.q1.understand.headline}
            </h3>
          </Reveal>
          <Reveal direction="up" delay={0.05}>
            <p className="text-base text-slate-600 leading-relaxed">
              {challengeContent.q1.understand.body}
            </p>
          </Reveal>
          <div className="flex flex-col gap-3">
            {challengeContent.q1.understand.bullets.map((b, i) => (
              <Reveal key={i} direction="left" delay={0.1 + i * 0.08}>
                <div className="flex gap-4 bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4">
                  <span className="text-2xl font-bold text-indigo-300 leading-none w-8 shrink-0 text-center">
                    {i + 1}
                  </span>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Q1 — Regulatory anchors ──────────────────────────────────────── */}
      <SectionWrapper id="q1-anchors" variant="light">
        <div className="mx-auto max-w-4xl px-6 flex flex-col gap-6">
          <Reveal direction="up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {challengeContent.q1.regulatoryAnchors.headline}
            </h3>
          </Reveal>
          <div className="flex flex-col gap-2">
            {challengeContent.q1.regulatoryAnchors.items.map((item, i) => (
              <Reveal key={i} direction="left" delay={i * 0.06}>
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6 bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-3 items-baseline">
                  <p className="text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Q1 — Framing (FOR → KFR) ─────────────────────────────────────── */}
      <SectionWrapper id="q1-framing" variant="light">
        <div className="mx-auto max-w-5xl px-6 flex flex-col gap-8">
          <Reveal direction="up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {challengeContent.q1.framing.headline}
            </h3>
          </Reveal>
          <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">
            <Reveal direction="up" delay={0}>
              <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-3">
                <span className="inline-block self-start rounded-full bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 uppercase tracking-wide">
                  Today
                </span>
                <h4 className="text-base font-semibold text-gray-900">
                  {challengeContent.q1.framing.today.label}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {challengeContent.q1.framing.today.body}
                </p>
              </div>
            </Reveal>
            <div className="flex items-center justify-center px-2 md:px-4 text-indigo-400 text-2xl font-bold select-none">
              <span className="hidden md:inline">→</span>
              <span className="md:hidden">↓</span>
            </div>
            <Reveal direction="up" delay={0.15}>
              <div className="flex-1 bg-indigo-50/60 rounded-xl border border-indigo-200 shadow-sm p-6 flex flex-col gap-3">
                <span className="inline-block self-start rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 uppercase tracking-wide">
                  From 2027
                </span>
                <h4 className="text-base font-semibold text-gray-900">
                  {challengeContent.q1.framing.future.label}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {challengeContent.q1.framing.future.body}
                </p>
              </div>
            </Reveal>
          </div>
          <p className="text-sm text-slate-500 italic">
            {challengeContent.q1.framing.crossoverNote}
          </p>
        </div>
      </SectionWrapper>

      {/* ─── Q1 — Why Pillar 2 ────────────────────────────────────────────── */}
      <SectionWrapper id="q1-pillars" variant="light">
        <div className="mx-auto max-w-5xl px-6 flex flex-col gap-6">
          <Reveal direction="up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Why Pillar 2, not Pillar 1.
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50/40 border border-amber-200 p-6 flex flex-col gap-3">
              <h3 className="text-base font-semibold text-gray-900">
                {challengeContent.q1.whyPillar2.pillar1.headline}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {challengeContent.q1.whyPillar2.pillar1.oneLine}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                {challengeContent.q1.whyPillar2.pillar1.limitation}
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-indigo-500 bg-indigo-50/40 border border-indigo-200 p-6 flex flex-col gap-3">
              <h3 className="text-base font-semibold text-gray-900">
                {challengeContent.q1.whyPillar2.pillar2.headline}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {challengeContent.q1.whyPillar2.pillar2.oneLine}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                {challengeContent.q1.whyPillar2.pillar2.strength}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Q1 — Three candidate approaches ──────────────────────────────── */}
      <SectionWrapper id="q1-approaches" variant="light">
        <div className="mx-auto max-w-6xl px-6 flex flex-col gap-6">
          <Reveal direction="up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {challengeContent.q1.approaches.headline}
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challengeContent.q1.approaches.items.map((opt, i) => {
              const verdictChip = {
                rejected:    { label: "Rejected",    cls: "bg-red-50 text-red-700 border-red-200" },
                considered:  { label: "Considered",  cls: "bg-amber-50 text-amber-700 border-amber-200" },
                recommended: { label: "Recommended", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
              }[opt.verdict];
              const cardBorder =
                opt.verdict === "recommended"
                  ? "border-indigo-300 ring-2 ring-indigo-100"
                  : "border-gray-200";
              return (
                <Reveal key={opt.rank} direction="up" delay={i * 0.12}>
                  <div className={`h-full bg-white rounded-xl border ${cardBorder} shadow-sm p-5 flex flex-col gap-3`}>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-indigo-400 leading-none">
                        {opt.rank}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-1 border ${verdictChip.cls}`}>
                        {verdictChip.label}
                      </span>
                    </div>
                    <h4 className="text-base font-semibold text-gray-900">{opt.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{opt.description}</p>
                    <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-gray-100">
                      <p className="text-xs text-slate-700">
                        <span className="font-semibold text-emerald-700">+ </span>
                        {opt.pros}
                      </p>
                      <p className="text-xs text-slate-700">
                        <span className="font-semibold text-red-700">− </span>
                        {opt.cons}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Q1 — Recommended hybrid (tier ladder + components) ───────────── */}
      <SectionWrapper id="q1-hybrid" variant="light">
        <div className="mx-auto max-w-5xl px-6 flex flex-col gap-5">
          <Reveal direction="up">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {challengeContent.q1.hybrid.headline}
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                {challengeContent.q1.hybrid.body}
              </p>
            </div>
          </Reveal>
          {/* Tier ladder */}
          <div className="flex flex-col gap-2">
            {challengeContent.q1.tiers.map((tier, i) => {
              const tintClasses = [
                "bg-indigo-50/20",
                "bg-indigo-50/40",
                "bg-indigo-50/60",
                "bg-indigo-100/80",
              ];
              return (
                <Reveal key={tier.tier} direction="left" delay={i * 0.08}>
                  <div className={`rounded-xl border border-indigo-100 px-5 py-3 flex items-center gap-5 ${tintClasses[i]}`}>
                    <span className="text-3xl font-bold text-indigo-400 leading-none w-8 shrink-0 text-center">
                      {tier.tier}
                    </span>
                    <div className="flex flex-col flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{tier.label}</p>
                      <p className="text-xs text-slate-500 italic">{tier.example}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 whitespace-nowrap">
                      {tier.horizon}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
          {/* Hybrid components */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {challengeContent.q1.hybrid.components.map((c, i) => (
              <Reveal key={i} direction="up" delay={0.3 + i * 0.08}>
                <div className="rounded-lg bg-white border border-indigo-100 p-3 h-full">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1">
                    {c.label}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <DrillDown summary="Tier table — horizon &amp; capital factor approach">
              <DrillTable
                headers={challengeContent.q1.drilldowns.tierTable.headers}
                rows={challengeContent.q1.drilldowns.tierTable.rows}
                note={challengeContent.q1.drilldowns.tierTable.note}
              />
            </DrillDown>
            <DrillDown summary="Operational integration &amp; governance">
              <DrillKeyList items={challengeContent.q1.drilldowns.operationalIntegration.items} />
            </DrillDown>
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Q1b — Prompt + 7-step callback ───────────────────────────────── */}
      <SectionWrapper id="q1b-prompt" variant="light">
        <div className="mx-auto max-w-5xl px-6 flex flex-col gap-8">
          <Reveal direction="up">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Question 1b
              </p>
              <h3 className="text-2xl md:text-4xl font-bold text-gray-900 leading-snug">
                {challengeContent.q1.q1b.headline}
              </h3>
              <p className="text-base text-slate-600 mt-2">
                {challengeContent.q1.q1b.sameApproachCaption}{" "}
                <a href="#q3-framework" className="underline text-indigo-600">see Q3 for the story →</a>
              </p>
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {engagementSteps.map((step) => (
              <div
                key={step.n}
                className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 shadow-sm px-3 py-2"
              >
                <span className="text-base font-bold text-indigo-500 leading-none">{step.n}</span>
                <span className="text-xs font-semibold text-gray-800">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Q1b — The approach, applied (7 steps with Q1b content) ───────── */}
      <SectionWrapper id="q1b-applied" variant="light">
        <div className="mx-auto max-w-7xl px-6 flex flex-col gap-4">
          <Reveal direction="up">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {challengeContent.q1.q1b.applied.headline}
              </h3>
              <p className="text-sm text-slate-600">
                {challengeContent.q1.q1b.applied.body}
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {challengeContent.q1.q1b.applied.steps.map((step, i) => (
              <Reveal key={step.n} direction="up" delay={i * 0.04}>
                <div className="h-full bg-white rounded-lg border border-gray-200 shadow-sm p-3 flex flex-col gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-indigo-500 leading-none">
                      {step.n}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-900 leading-tight">
                      {step.label}
                    </span>
                  </div>
                  <p className="text-[11px] italic text-slate-500 leading-snug">
                    {step.gloss}
                  </p>
                  <p className="text-[11px] text-slate-700 leading-snug">
                    {step.detail}
                  </p>
                  {step.items && (
                    <ul className="flex flex-col gap-1 mt-auto pt-1.5 border-t border-gray-100">
                      {step.items.map((it, j) => (
                        <li key={j} className="flex gap-1 text-[10px] text-slate-600 leading-snug">
                          <span className="text-indigo-400 select-none">·</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Q2 — Prompt ──────────────────────────────────────────────────── */}
      <SectionWrapper id="q2-prompt" variant="tint">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal direction="up">
            <div className="border-l-4 border-indigo-500 bg-white rounded-xl shadow-sm p-8 flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                {challengeContent.q2.kicker}
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                {challengeContent.q2.question.title}
              </h2>
              <p className="text-sm md:text-base text-slate-600 italic leading-relaxed border-t border-gray-100 pt-3 mt-1">
                {challengeContent.q2.question.preamble}
              </p>
              <ul className="flex flex-col gap-3 mt-1">
                {challengeContent.q2.question.subQuestions.map((sq, i) => (
                  <li key={i} className="flex gap-2 text-slate-700 text-sm md:text-base leading-relaxed">
                    <span className="mt-1 text-indigo-500 select-none font-bold">•</span>
                    <em>{sq}</em>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* ─── Q2 — Understand the question ─────────────────────────────────── */}
      <SectionWrapper id="q2-understand" variant="tint">
        <div className="mx-auto max-w-5xl px-6 flex flex-col gap-6">
          <Reveal direction="up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {challengeContent.q2.understand.headline}
            </h3>
          </Reveal>
          <Reveal direction="up" delay={0.05}>
            <p className="text-base text-slate-600">{challengeContent.q2.understand.body}</p>
          </Reveal>
          <div className="flex flex-col gap-3">
            {challengeContent.q2.understand.bullets.map((b, i) => (
              <Reveal key={i} direction="left" delay={0.1 + i * 0.08}>
                <div className="flex gap-4 bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4">
                  <span className="text-2xl font-bold text-indigo-300 leading-none w-8 shrink-0 text-center">
                    {i + 1}
                  </span>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Causal chain visual */}
          <Reveal direction="up" delay={0.4}>
            <div className="mt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2">
                The causal chain
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {challengeContent.q2.understand.causalChain.map((step, i, arr) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="rounded-md bg-indigo-50 text-indigo-800 text-xs font-semibold px-3 py-1.5 border border-indigo-100">
                      {step}
                    </span>
                    {i < arr.length - 1 && (
                      <span className="text-indigo-300 text-sm select-none">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* ─── Q2 — Reframe: peak account → trading book ────────────────────── */}
      <SectionWrapper id="q2-reframe" variant="tint">
        <div className="mx-auto max-w-5xl px-6 flex flex-col gap-6">
          <Reveal direction="up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {challengeContent.q2.reframe.headline}
            </h3>
          </Reveal>
          <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">
            <Reveal direction="up" delay={0}>
              <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-3">
                <span className="inline-block self-start rounded-full bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 uppercase tracking-wide">
                  {challengeContent.q2.reframe.today.label}
                </span>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  {challengeContent.q2.reframe.today.body}
                </p>
              </div>
            </Reveal>
            <div className="flex items-center justify-center px-2 md:px-4 text-indigo-400 text-2xl font-bold select-none">
              <span className="hidden md:inline">→</span>
              <span className="md:hidden">↓</span>
            </div>
            <Reveal direction="up" delay={0.15}>
              <div className="flex-1 bg-indigo-50/60 rounded-xl border border-indigo-200 shadow-sm p-6 flex flex-col gap-3">
                <span className="inline-block self-start rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 uppercase tracking-wide">
                  {challengeContent.q2.reframe.future.label}
                </span>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  {challengeContent.q2.reframe.future.body}
                </p>
              </div>
            </Reveal>
          </div>
          <p className="text-sm text-slate-500 italic">
            {challengeContent.q2.reframe.scopeNote}
          </p>
        </div>
      </SectionWrapper>

      {/* ─── Q2 — SI buckets ──────────────────────────────────────────────── */}
      <SectionWrapper id="q2-si" variant="tint">
        <div className="mx-auto max-w-5xl px-6 flex flex-col gap-6">
          <Reveal direction="up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Four dimensions of SI designation.
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challengeContent.q2.siBuckets.map((bucket, i) => (
              <Reveal key={i} direction="up" delay={i * 0.1}>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3 h-full">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold text-gray-900">{bucket.headline}</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{bucket.oneLine}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Q2 — Six shifts ──────────────────────────────────────────────── */}
      <SectionWrapper id="q2-shifts" variant="tint">
        <div className="mx-auto max-w-5xl px-6 flex flex-col gap-6">
          <Reveal direction="up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Six shifts to the liquidity risk framework.
            </h3>
          </Reveal>
          <div className="flex flex-col gap-3 border-l-2 border-indigo-100 pl-4">
            {challengeContent.q2.shifts.map((shift, i) => (
              <Reveal key={shift.n} direction="left" delay={i * 0.08}>
                <div className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
                  <span className="text-3xl font-bold text-indigo-300 leading-none w-8 shrink-0 text-center">
                    {shift.n}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-gray-900">{shift.headline}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{shift.oneLine}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Q2 — EWI five layers (with indicators per layer) ─────────────── */}
      <SectionWrapper id="q2-ewi" variant="tint">
        <div className="mx-auto max-w-6xl px-6 flex flex-col gap-3">
          <Reveal direction="up">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              Early warning indicators — five layers, lead → lag.
            </h3>
          </Reveal>
          <div className="flex flex-col gap-2">
            {challengeContent.q2.ewiLayers.map((layer, i) => {
              const tints   = ["bg-indigo-50/60", "bg-indigo-100/70", "bg-indigo-100", "bg-indigo-200/80", "bg-indigo-200"];
              const borders = ["border-indigo-100", "border-indigo-200", "border-indigo-200", "border-indigo-300", "border-indigo-300"];
              const leadLagChip = {
                lead:  "bg-emerald-100 text-emerald-700 border border-emerald-200",
                mixed: "bg-amber-100 text-amber-700 border border-amber-200",
                lag:   "bg-red-100 text-red-700 border border-red-200",
              };
              return (
                <Reveal key={layer.layer} direction="fade" delay={i * 0.06}>
                  <div className={`${tints[i]} border ${borders[i]} rounded-xl px-4 py-2.5 flex flex-col gap-1.5`}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-2xl font-bold text-indigo-700 leading-none w-7 shrink-0 text-center">
                        {layer.layer}
                      </span>
                      <p className="text-sm font-semibold text-gray-900 min-w-32">
                        {layer.name}
                      </p>
                      <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${leadLagChip[layer.leadLag]}`}>
                        {layer.leadLag}
                      </span>
                      <p className="text-xs text-slate-700 flex-1">
                        Client impact: <span className="font-medium">{layer.clientImpact}</span>
                      </p>
                      <p className="text-xs font-semibold text-gray-900 whitespace-nowrap">
                        {layer.actionWindow}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-10">
                      {layer.indicators.map((ind, j) => (
                        <span
                          key={j}
                          className="text-[10px] bg-white/70 text-slate-700 rounded-md px-2 py-0.5 border border-white/80"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Q2 — Failure modes (what client impact means) ────────────────── */}
      <SectionWrapper id="q2-failuremodes" variant="tint">
        <div className="mx-auto max-w-5xl px-6 flex flex-col gap-6">
          <Reveal direction="up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {challengeContent.q2.failureModes.headline}
            </h3>
          </Reveal>
          <Reveal direction="up" delay={0.05}>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              {challengeContent.q2.failureModes.body}
            </p>
          </Reveal>
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
            <div className="grid grid-cols-[1fr_1.4fr_1fr] bg-indigo-50 border-b border-indigo-100">
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                Client capability
              </div>
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                Failure mode
              </div>
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                Tied to
              </div>
            </div>
            {challengeContent.q2.failureModes.rows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_1.4fr_1fr] ${
                  i % 2 === 1 ? "bg-slate-50/40" : ""
                } border-t border-gray-100 first:border-t-0`}
              >
                <div className="px-4 py-2 text-xs md:text-sm font-semibold text-gray-900">
                  {row.capability}
                </div>
                <div className="px-4 py-2 text-xs md:text-sm text-slate-700">
                  {row.failure}
                </div>
                <div className="px-4 py-2 text-xs md:text-sm text-slate-500 italic">
                  {row.tiedTo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Q2 — Scenario ────────────────────────────────────────────────── */}
      <SectionWrapper id="q2-scenario" variant="tint">
        <div className="mx-auto max-w-6xl px-6 flex flex-col gap-8">
          <Reveal direction="up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              A four-day stress scenario.
            </h3>
          </Reveal>
          <div className="flex flex-col lg:flex-row gap-4">
            {challengeContent.q2.scenario.map((day, i) => {
              const isDay4 = day.day === 4;
              return (
                <Reveal key={day.day} direction="left" delay={i * 0.15}>
                  <div
                    className={`flex-1 rounded-xl shadow-sm p-5 flex flex-col gap-3 h-full ${
                      isDay4
                        ? "bg-indigo-600 text-white"
                        : "bg-white border border-gray-200 text-gray-900"
                    }`}
                  >
                    <span
                      className={`inline-block self-start rounded-full text-xs font-semibold px-3 py-1 ${
                        isDay4
                          ? "bg-white/20 text-white"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      Day {day.day}
                    </span>
                    <p className={`text-sm font-semibold ${isDay4 ? "text-white" : "text-gray-900"}`}>
                      {day.state}
                    </p>
                    <p className={`text-xs italic ${isDay4 ? "text-indigo-200" : "text-slate-500"}`}>
                      {day.trigger}
                    </p>
                    <p className={`text-xs ${isDay4 ? "text-indigo-100" : "text-slate-600"}`}>
                      {day.action}
                    </p>
                    {/* Day 4 outcome: Clients have noticed nothing */}
                    {day.outcome && (
                      <p className="text-2xl font-bold text-white mt-2">
                        {day.outcome}
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── Q2 — Anchor + deep-dives ─────────────────────────────────────── */}
      <SectionWrapper id="q2-deepdive" variant="tint">
        <div className="mx-auto max-w-4xl px-6 flex flex-col gap-6">
          <Reveal direction="up">
            <blockquote className="mx-auto max-w-3xl border-l-4 border-indigo-500 py-5 pl-7 pr-4 italic text-slate-600 text-sm md:text-base leading-relaxed text-center">
              {challengeContent.q2.anchor}
            </blockquote>
          </Reveal>
          <div className="flex flex-col gap-2">
            <DrillDown summary="Action mapping per layer">
              <DrillTable
                headers={challengeContent.q2.drilldowns.actionMapping.headers}
                rows={challengeContent.q2.drilldowns.actionMapping.rows}
              />
            </DrillDown>
            <DrillDown summary="Full EWI indicators by layer">
              <DrillSections sections={challengeContent.q2.drilldowns.fullIndicators.sections} />
            </DrillDown>
            <DrillDown summary="What this framework can and cannot do">
              <div className="flex flex-col gap-3">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {challengeContent.q2.drilldowns.honestCaveat.intro}
                </p>
                <ol className="flex flex-col gap-1.5 ml-1">
                  {challengeContent.q2.drilldowns.honestCaveat.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700 leading-relaxed">
                      <span className="font-semibold text-indigo-500 select-none w-4 shrink-0">
                        {i + 1}.
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-sm text-slate-600 italic leading-relaxed border-t border-gray-100 pt-3">
                  {challengeContent.q2.drilldowns.honestCaveat.closing}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed bg-indigo-50/50 border border-indigo-100 rounded-md px-3 py-2">
                  {challengeContent.q2.drilldowns.honestCaveat.regulatory}
                </p>
              </div>
            </DrillDown>
          </div>
        </div>
      </SectionWrapper>

      {/* ─── CLOSING ──────────────────────────────────────────────────────── */}
      <SectionWrapper id="closing" variant="dark">
        <div className="mx-auto max-w-3xl px-6 flex flex-col items-center gap-8 text-center">
          <Reveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white">
              {challengeContent.closing.headline}
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-prose">
              {challengeContent.closing.body}
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <a
              href="mailto:fgv031@icloud.com"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-white font-semibold hover:bg-indigo-400 transition-colors"
            >
              {challengeContent.closing.cta.label}
            </a>
          </Reveal>
        </div>
      </SectionWrapper>
    </>
  );
}
