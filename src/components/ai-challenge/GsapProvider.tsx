"use client";

import React, { useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once at module load. This is client/prerender-safe:
// gsap.registerPlugin only stores the plugin object — it touches no window/document
// (ScrollTrigger defers all DOM access to .create()). Registering here (rather than in
// an effect) guarantees the plugin is available before any child ScrollScene's
// useLayoutEffect runs — child layout effects run before a parent's effects, so an
// effect-based registration in this provider would register too late on first mount.
gsap.registerPlugin(ScrollTrigger);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function GsapProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <>{children}</>;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

/** Returns true if the user prefers reduced motion. SSR-safe (defaults false). */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}
