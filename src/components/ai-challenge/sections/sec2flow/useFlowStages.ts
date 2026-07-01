// ── useFlowStages.ts ───────────────────────────────────────────────────────
// Stage state machine for the Q3 flowchart + in-slide arrow-key interception.
// While stages remain, ArrowRight/Space advances the internal stage and the
// event is stopped (capture phase) so DeckController does NOT change the slide.
// On the boundary stage the event bubbles, letting the deck advance/retreat.

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDeck } from "../../DeckController";

export function useFlowStages(
  slideIndex: number,
  stageCount: number,
): { stage: number; next(): void; prev(): void; goStage(i: number): void } {
  const { activeIndex } = useDeck();
  const isActive = activeIndex === slideIndex;

  const [stage, setStage] = useState(0);
  const stageRef = useRef(0); // synchronous mirror for event-handler reads

  const commit = useCallback((n: number) => {
    const clamped = Math.max(0, Math.min(n, stageCount - 1));
    stageRef.current = clamped;
    setStage(clamped);
  }, [stageCount]);

  const next = useCallback(() => commit(stageRef.current + 1), [commit]);
  const prev = useCallback(() => commit(stageRef.current - 1), [commit]);
  const goStage = useCallback((i: number) => commit(i), [commit]);

  // Reset to the first stage each time the slide becomes active — done during
  // render (React's supported "adjust state on change" pattern), not in an effect.
  const [wasActive, setWasActive] = useState(isActive);
  if (isActive !== wasActive) {
    setWasActive(isActive);
    if (isActive) setStage(0);
  }

  // Keep the synchronous mirror in sync with committed state (refs in effects ok).
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  // Capture-phase key interception — only while this slide is active.
  useEffect(() => {
    if (!isActive) return;
    const onKey = (e: KeyboardEvent) => {
      const fwd = e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ";
      const back = e.key === "ArrowLeft" || e.key === "ArrowUp";
      if (!fwd && !back) return;
      if (fwd) {
        if (stageRef.current < stageCount - 1) {
          e.stopPropagation();
          if (e.key === " ") e.preventDefault();
          commit(stageRef.current + 1);
        }
        // else: boundary — let it bubble so the deck advances the slide
      } else {
        if (stageRef.current > 0) {
          e.stopPropagation();
          commit(stageRef.current - 1);
        }
        // else: boundary — let it bubble so the deck goes to the previous slide
      }
    };
    window.addEventListener("keydown", onKey, true); // capture phase
    return () => window.removeEventListener("keydown", onKey, true);
  }, [isActive, stageCount, commit]);

  return { stage, next, prev, goStage };
}
