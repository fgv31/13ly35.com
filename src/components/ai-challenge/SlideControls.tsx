"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface SlideControlsProps {
  slides: { id: string; chapter: string }[];
}

interface Stop {
  /** scrollTop value to land on */
  scrollTop: number;
  /** index into `slides` this stop belongs to */
  slideIdx: number;
}

/**
 * True scroll position of a section within the scroll container.
 * GSAP pins wrap the section in a `.pin-spacer`, so the section's own
 * `offsetTop` becomes 0 (relative to that wrapper) and—while pinned—the
 * section is `position: fixed`. Measure the pin-spacer instead (it always
 * stays in normal flow at the reserved position), summing offsetTop up the
 * offsetParent chain to the container.
 */
function sectionTop(el: HTMLElement, container: HTMLElement): number {
  const parent = el.parentElement;
  const base: HTMLElement =
    parent && parent.classList.contains("pin-spacer") ? parent : el;

  let y = 0;
  let node: HTMLElement | null = base;
  while (node && node !== container && container.contains(node)) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

function buildStops(
  slides: { id: string; chapter: string }[],
  container: HTMLElement
): Stop[] {
  const stops: Stop[] = [];
  const innerH = container.clientHeight;

  slides.forEach((s, slideIdx) => {
    const el = document.getElementById(s.id);
    if (!el) return;

    const base = sectionTop(el, container);
    const raw = el.getAttribute("data-stage-steps");
    const n = raw ? Math.max(1, parseInt(raw, 10)) : 1;

    for (let k = 0; k < n; k++) {
      stops.push({ scrollTop: base + k * innerH, slideIdx });
    }
  });

  return stops;
}

export function SlideControls(p: SlideControlsProps): React.JSX.Element {
  const { slides } = p;
  // Index into the flat stop list
  const [stopIdx, setStopIdx] = useState(0);
  // Derived section index (for label)
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  const getContainer = () =>
    document.querySelector(".ai-challenge-scope") as HTMLElement | null;

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

  const goToStop = useCallback(
    (idx: number) => {
      const container = getContainer();
      if (!container) return;
      const stops = buildStops(slides, container);
      if (stops.length === 0) return;
      const clamped = Math.max(0, Math.min(idx, stops.length - 1));
      const stop = stops[clamped];
      container.scrollTo({ top: stop.scrollTop, behavior: "smooth" });
      setStopIdx(clamped);
      setCurrentSlideIdx(stop.slideIdx);
    },
    [slides]
  );

  // Total stops — default to slides.length; updated via async microtask / scroll listener
  const [totalStops, setTotalStops] = useState(slides.length);

  // Track current stop by scroll position
  // Note: initial read runs synchronously in effect body (no setState called there —
  // values stored in refs); setState is called only from the scroll event listener.
  const initDoneRef = useRef(false);
  useEffect(() => {
    const container = getContainer();
    if (!container) return;

    // Initial read without setState — mutate refs only
    const initStops = buildStops(slides, container);
    if (initStops.length > 0 && !initDoneRef.current) {
      initDoneRef.current = true;
      const scrollTop = container.scrollTop;
      const threshold = container.clientHeight * 0.35;
      let best = 0;
      initStops.forEach((stop, i) => {
        if (stop.scrollTop <= scrollTop + threshold) best = i;
      });
      // Batch all state updates via queueMicrotask so they are async w.r.t. the effect body
      queueMicrotask(() => {
        setTotalStops(initStops.length);
        setStopIdx(best);
        setCurrentSlideIdx(initStops[best].slideIdx);
      });
    }

    const onScroll = () => {
      const stops = buildStops(slides, container);
      if (stops.length === 0) return;
      setTotalStops(stops.length);
      const scrollTop = container.scrollTop;
      const threshold = container.clientHeight * 0.35;
      let best = 0;
      stops.forEach((stop, i) => {
        if (stop.scrollTop <= scrollTop + threshold) best = i;
      });
      setStopIdx(best);
      setCurrentSlideIdx(stops[best].slideIdx);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [slides]);

  // Keyboard nav: ArrowDown/ArrowUp, PageDown/PageUp, Space, Home, End
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

      const container = getContainer();
      if (!container) return;
      const stops = buildStops(slides, container);
      const total = stops.length;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goToStop(stopIdx + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToStop(stopIdx - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToStop(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToStop(total - 1);
      } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        goToStop(e.shiftKey ? stopIdx - 1 : stopIdx + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stopIdx, goToStop, slides]);

  const atStart = stopIdx === 0;
  const atEnd = stopIdx >= totalStops - 1;
  const pos = chapterPosition[currentSlideIdx];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 select-none">
      {/* Chapter + position label */}
      <div className="hidden sm:flex flex-col items-end rounded-lg bg-white/90 backdrop-blur px-3 py-2 shadow-md border border-indigo-100">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
          {pos?.chapter}
        </span>
        <span className="text-[10px] font-mono text-gray-500 tabular-nums">
          {pos?.n}/{pos?.total} · slide {currentSlideIdx + 1}/{slides.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => goToStop(stopIdx - 1)}
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
          onClick={() => goToStop(stopIdx + 1)}
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
