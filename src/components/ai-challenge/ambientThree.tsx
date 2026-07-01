/**
 * ambientThree.tsx
 *
 * Three.js ambient particle/depth field — indigo (#4f5bff) accent.
 * Loaded ONLY via next/dynamic with ssr:false; never runs during Node prerender.
 *
 * Variants:
 *   "hero"    — denser, centred cloud, subtle upward drift
 *   "mapping" — sparser, wider spread, horizontal drift
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AmbientThreeProps {
  variant?: "hero" | "mapping";
  tone?: "light" | "dark";
}

// ─── Constants ────────────────────────────────────────────────────────────────

// dark (default): bright indigo on dark backgrounds
const INDIGO_DARK = 0x4f5bff;
// light: desaturated, slightly deeper indigo — legible on white without glare
const INDIGO_LIGHT = 0x3c378c;

// Opacity scale-down for light tone so particles don't dominate a white surface
const LIGHT_OPACITY_SCALE = 0.55;

const CONFIG = {
  hero: {
    count: 420,
    spread: 6,
    zDepth: 4,
    driftX: 0.0004,
    driftY: 0.0006,
    size: 0.035,
    opacity: 0.55,
  },
  mapping: {
    count: 260,
    spread: 10,
    zDepth: 3,
    driftX: 0.0007,
    driftY: 0.0003,
    size: 0.028,
    opacity: 0.42,
  },
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function AmbientThree({
  variant = "hero",
  tone = "dark",
}: AmbientThreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── WebGL guard (belt-and-suspenders; AmbientCanvas also checks) ──────────
    try {
      const probe = document.createElement("canvas");
      const ctx =
        probe.getContext("webgl") ?? probe.getContext("experimental-webgl");
      if (!ctx) return;
    } catch {
      return;
    }

    const cfg = CONFIG[variant];
    const particleColor = tone === "light" ? INDIGO_LIGHT : INDIGO_DARK;
    const particleOpacity =
      tone === "light" ? cfg.opacity * LIGHT_OPACITY_SCALE : cfg.opacity;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent background
    renderer.setSize(container.clientWidth || 1, container.clientHeight || 1);

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    // ── Scene + camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 5;

    // ── Particles ─────────────────────────────────────────────────────────────
    const positions = new Float32Array(cfg.count * 3);
    for (let i = 0; i < cfg.count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * cfg.spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * cfg.spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * cfg.zDepth;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: particleColor,
      size: cfg.size,
      transparent: true,
      opacity: particleOpacity,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);
    onResize();

    // ── RAF + IntersectionObserver ────────────────────────────────────────────
    let rafId = 0;
    let visible = true;

    const tick = () => {
      if (!visible) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      points.rotation.y += cfg.driftX;
      points.rotation.x += cfg.driftY;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(container);

    rafId = requestAnimationFrame(tick);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, [variant, tone]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    />
  );
}
