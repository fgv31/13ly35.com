// ── deckScene.ts ─────────────────────────────────────────────────────────────
// Framework-agnostic plain-TS Three.js scene module.
// NO React, NO "use client". All DOM/window access is inside createScene() and
// its closures — safe to import in server-rendered modules (tree-shaken at
// build time since it's only called client-side after mount).
//
// On WebGL context creation failure, createScene() returns a no-op object that
// satisfies {update, resize, dispose} so callers need no error-handling branch.

import * as THREE from "three";
import type { BgParams } from "@/data/ai-challenge";

const PARTICLE_COUNT = 500;

// ── helpers ──────────────────────────────────────────────────────────────────

function hexToColor(hex: string): THREE.Color {
  try {
    return new THREE.Color(hex);
  } catch {
    return new THREE.Color(0x00ffff);
  }
}

function bgColorFromTone(tone: "light" | "dark"): THREE.Color {
  return tone === "dark" ? new THREE.Color(0x050510) : new THREE.Color(0xf0f0f8);
}

// ── no-op fallback returned on WebGL failure ──────────────────────────────────
const NOOP = { update: () => void 0, resize: () => void 0, dispose: () => void 0 };

// ── createScene ───────────────────────────────────────────────────────────────

export function createScene(
  canvas: HTMLCanvasElement,
  initial: BgParams,
): { update(bg: BgParams): void; resize(): void; dispose(): void } {
  // ── renderer ────────────────────────────────────────────────────────────────
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1, 2));
    renderer.setClearColor(bgColorFromTone(initial.tone), 1);
  } catch {
    // WebGL unavailable — return no-op so caller keeps working.
    return NOOP;
  }

  // ── scene / camera ──────────────────────────────────────────────────────────
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / (canvas.clientHeight || 1), 0.1, 1000);
  camera.position.z = 80;

  // ── particles ───────────────────────────────────────────────────────────────
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const speeds = new Float32Array(PARTICLE_COUNT); // drift speed per particle

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    speeds[i] = 0.05 + Math.random() * 0.1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const currentColor = hexToColor(initial.accent);
  const material = new THREE.PointsMaterial({
    color: currentColor,
    size: 0.8,
    sizeAttenuation: true,
    transparent: true,
    opacity: Math.max(0.1, Math.min(1, initial.intensity)),
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // ── interpolation state ──────────────────────────────────────────────────────
  const targetColor = currentColor.clone();
  let targetOpacity = material.opacity;
  let targetBgTone: "light" | "dark" = initial.tone;
  const lerpBgColor = bgColorFromTone(initial.tone).clone();
  const targetBgColor = lerpBgColor.clone();

  // ── resize ───────────────────────────────────────────────────────────────────
  function resize(): void {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();

  // ── RAF loop ─────────────────────────────────────────────────────────────────
  let rafId = 0;
  let running = false;
  let time = 0;

  function tick(): void {
    if (!running) return;
    rafId = requestAnimationFrame(tick);
    time += 0.008;

    // drift particles upward / float
    const pos = geometry.attributes["position"] as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3 + 1] += speeds[i];
      if (arr[i * 3 + 1] > 100) arr[i * 3 + 1] = -100;
    }
    pos.needsUpdate = true;

    // slow rotation
    points.rotation.y = time * 0.04;
    points.rotation.x = Math.sin(time * 0.02) * 0.1;

    // lerp color toward target
    material.color.lerp(targetColor, 0.04);
    material.opacity += (targetOpacity - material.opacity) * 0.04;

    // lerp background color
    lerpBgColor.lerp(targetBgColor, 0.04);
    renderer.setClearColor(lerpBgColor, 1);

    renderer.render(scene, camera);
  }

  function startLoop(): void {
    if (running) return;
    running = true;
    tick();
  }

  function stopLoop(): void {
    running = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  }

  // ── visibility pausing ────────────────────────────────────────────────────────
  let observer: IntersectionObserver | null = null;
  let visibilityHandler: (() => void) | null = null;

  if (typeof IntersectionObserver !== "undefined") {
    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible) startLoop();
        else stopLoop();
      },
      { threshold: 0.01 },
    );
    observer.observe(canvas);
  } else {
    // fallback: document visibility
    visibilityHandler = () => {
      if (document.visibilityState === "visible") startLoop();
      else stopLoop();
    };
    document.addEventListener("visibilitychange", visibilityHandler);
    startLoop();
  }

  // ── public API ───────────────────────────────────────────────────────────────

  function update(bg: BgParams): void {
    // Set targets; the RAF loop lerps toward them each frame.
    targetColor.set(hexToColor(bg.accent));
    targetOpacity = Math.max(0.05, Math.min(1, bg.intensity));
    if (bg.tone !== targetBgTone) {
      targetBgTone = bg.tone;
      targetBgColor.set(bgColorFromTone(bg.tone));
    }
  }

  function dispose(): void {
    stopLoop();

    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (visibilityHandler) {
      document.removeEventListener("visibilitychange", visibilityHandler);
      visibilityHandler = null;
    }

    geometry.dispose();
    material.dispose();

    // forceContextLoss frees GPU memory immediately in some browsers.
    if (typeof renderer.forceContextLoss === "function") {
      renderer.forceContextLoss();
    }
    renderer.dispose();
  }

  return { update, resize, dispose };
}
