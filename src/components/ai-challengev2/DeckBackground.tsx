"use client";

import { useEffect, useRef } from "react";
import { createScene } from "./deckScene";
import { useDeck } from "./DeckController";
import { useReducedMotion } from "./useReducedMotion";
import { slideManifest } from "@/data/ai-challengev2";

// Shared fixed-layer styles. pointer-events: none ensures the layer never
// blocks slide interaction.
const LAYER_STYLE: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  pointerEvents: "none", // pointer-events: none
};

// Feature-detect WebGL2/WebGL via a temporary canvas (client-only — call from
// inside an effect, never during render/SSR).
function detectWebGL(): boolean {
  try {
    const probe = document.createElement("canvas");
    return !!(probe.getContext("webgl2") || probe.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function DeckBackground(): React.JSX.Element {
  const { activeIndex } = useDeck();
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ReturnType<typeof createScene> | null>(null);

  // Create the scene on mount IF capabilities allow. All capability detection
  // (WebGL support, mobile width) happens inside the effect — never as React
  // state set during/after render — so there is no cascading-render and the
  // server + first client render are byte-identical (both show the fallback
  // until/unless the scene draws over it).
  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window !== "undefined" && window.innerWidth < 640) return; // mobile
    if (!detectWebGL()) return; // no-WebGL
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = createScene(canvas, slideManifest[0].bg);
    sceneRef.current = scene;
    scene.resize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => scene.resize());
      ro.observe(canvas);
    } else {
      const onResize = () => scene.resize();
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        scene.dispose();
        sceneRef.current = null;
      };
    }

    return () => {
      ro?.disconnect();
      scene.dispose();
      sceneRef.current = null;
    };
  }, [reducedMotion]);

  // Update the scene when the active slide changes (no-op until a scene exists).
  useEffect(() => {
    if (!sceneRef.current) return;
    const meta = slideManifest[activeIndex];
    if (meta) sceneRef.current.update(meta.bg);
  }, [activeIndex]);

  // Both layers always render (identical on server & client). The fallback sits
  // behind; the canvas is transparent until/unless the WebGL scene draws over
  // it, so reduced-motion / no-WebGL / mobile all gracefully show the gradient.
  return (
    <>
      <div
        style={{
          ...LAYER_STYLE,
          zIndex: -2,
          background:
            "radial-gradient(ellipse at 60% 40%, color-mix(in srgb, var(--upvest-accent) 18%, transparent) 0%, #050510 70%)",
        }}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        style={{ ...LAYER_STYLE, zIndex: -1, display: "block", width: "100%", height: "100%" }}
        aria-hidden="true"
      />
    </>
  );
}
