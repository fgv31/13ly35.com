"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export interface SlideEntry {
  id: string;
  chapter: string;
}

export interface SlideArrowsProps {
  slides: SlideEntry[];
}

export default function SlideArrows({ slides }: SlideArrowsProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const getContainer = () =>
    document.querySelector(".challenge-scope") as HTMLElement | null;

  // Pre-compute per-chapter position for the counter
  const chapterPosition = useMemo(() => {
    const counts = new Map<string, number>();
    const totals = new Map<string, number>();
    slides.forEach((s) => totals.set(s.chapter, (totals.get(s.chapter) ?? 0) + 1));
    return slides.map((s) => {
      const n = (counts.get(s.chapter) ?? 0) + 1;
      counts.set(s.chapter, n);
      return { chapter: s.chapter, n, total: totals.get(s.chapter) ?? 1 };
    });
  }, [slides]);

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= slides.length) return;
      const el = document.getElementById(slides[idx].id);
      const container = getContainer();
      if (!el || !container) return;
      container.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      setCurrentIdx(idx);
    },
    [slides]
  );

  // Track current section by scroll position
  useEffect(() => {
    const container = getContainer();
    if (!container) return;

    const updateCurrent = () => {
      const scrollTop = container.scrollTop;
      const probe = scrollTop + container.clientHeight * 0.35;
      let idx = 0;
      slides.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= probe) idx = i;
      });
      setCurrentIdx(idx);
    };

    updateCurrent();
    container.addEventListener("scroll", updateCurrent, { passive: true });
    return () => container.removeEventListener("scroll", updateCurrent);
  }, [slides]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goTo(currentIdx + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(currentIdx - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(slides.length - 1);
      } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        goTo(e.shiftKey ? currentIdx - 1 : currentIdx + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIdx, goTo, slides.length]);

  const atStart = currentIdx === 0;
  const atEnd = currentIdx === slides.length - 1;
  const pos = chapterPosition[currentIdx];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 select-none">
      {/* Chapter + position label */}
      <div className="hidden sm:flex flex-col items-end rounded-lg bg-white/90 backdrop-blur px-3 py-2 shadow-md border border-indigo-100">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
          {pos?.chapter}
        </span>
        <span className="text-[10px] font-mono text-gray-500 tabular-nums">
          {pos?.n}/{pos?.total} · slide {currentIdx + 1}/{slides.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => goTo(currentIdx - 1)}
          disabled={atStart}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-indigo-200 bg-white text-indigo-600 shadow-md transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goTo(currentIdx + 1)}
          disabled={atEnd}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </div>
  );
}
