"use client";

/**
 * AmbientCanvas.tsx
 *
 * Thin client wrapper that:
 *   1. Guards against reduced-motion preference → renders nothing (or static gradient)
 *   2. Guards against missing WebGL support → renders static gradient fallback
 *   3. Loads the three.js scene ONLY client-side via next/dynamic (ssr: false)
 *
 * Three.js itself is never imported here — isolation lives in ./ambientThree.
 */

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "./GsapProvider";

// ── Dynamic import — three.js code never runs during Node prerender ────────────
const AmbientThree = dynamic(() => import("./ambientThree"), { ssr: false });

// ── Mounted flag — false during SSR and the first hydration render, true after.
//    Keeps the server HTML and the first client render identical (both render the
//    static fallback), so the WebGL upgrade happens post-mount without a hydration
//    mismatch. Lint-clean: no setState inside an effect.
const noopSubscribe = () => () => {};
function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

// ── WebGL availability check (client-only, called once) ───────────────────────
function canUseWebGL(): boolean {
  if (typeof window === "undefined") return false;
  if (!window.WebGLRenderingContext) return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

// ── Skip WebGL on small screens — reduces battery drain and avoids canvas
//    overflow artefacts on mobile viewports narrower than 640 px.
function isMobileViewport(): boolean {
  return typeof window !== "undefined" && window.innerWidth < 640;
}

// ── Fallback: static indigo gradient when WebGL/motion unavailable ────────────
//   light tone → subtle dark-indigo on white; dark tone (default) → bright indigo on dark
function StaticFallback({
  className,
  tone,
}: {
  className?: string;
  tone: "light" | "dark";
}) {
  const bg =
    tone === "light"
      ? "radial-gradient(ellipse at 50% 60%, rgba(60,55,140,0.10) 0%, transparent 70%)"
      : "radial-gradient(ellipse at 50% 60%, rgba(79,91,255,0.18) 0%, transparent 70%)";
  return (
    <div
      className={className}
      style={{ background: bg, pointerEvents: "none" }}
    />
  );
}

// ── Public export ─────────────────────────────────────────────────────────────

export interface AmbientCanvasProps {
  variant?: "hero" | "mapping";
  tone?: "light" | "dark";
  className?: string;
}

export const AmbientCanvas: React.ComponentType<AmbientCanvasProps> =
  function AmbientCanvas({
    variant = "hero",
    tone = "dark",
    className,
  }: AmbientCanvasProps) {
    const reducedMotion = useReducedMotion();
    const mounted = useMounted();

    if (!mounted || reducedMotion || isMobileViewport() || !canUseWebGL()) {
      return <StaticFallback className={className} tone={tone} />;
    }

    return (
      <div className={className} style={{ position: "relative" }}>
        <AmbientThree variant={variant} tone={tone} />
      </div>
    );
  };
