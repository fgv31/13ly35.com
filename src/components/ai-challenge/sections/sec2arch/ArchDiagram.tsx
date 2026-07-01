"use client";

// ── ArchDiagram.tsx ───────────────────────────────────────────────────────────
// Static SVG render of the Section II architecture + GSAP animation engine.
// Agent A: static DOM (data-layer / data-node-id / data-flow attrs).
// Agent B: useLayoutEffect reveal + stroke-dashoffset draw-in + rAF pulses.

import React, { useEffect, useLayoutEffect, useRef } from "react";
import type { ReactElement } from "react";
import gsap from "gsap";
import { archLayers, archNodes, archFlows } from "@/data/sec2-arch";
import { layoutArch, flowPath } from "./archLayout";
import type { PlacedNode, PlacedLayer } from "./archLayout";

const ARROW_ID = "arch-arrow";
const ASSUMED_DASH = "6 3";

// Pre-compute layout once at module level (stable across renders)
const layout = layoutArch(archLayers, archNodes);
const nodeMap = new Map<string, PlacedNode>(
  layout.nodes.map((p) => [p.node.id, p]),
);
const bandMap = new Map<string, PlacedLayer>(
  layout.bands.map((b) => [b.layer.id, b]),
);

// Parse viewBox width for band rect
const [, , vbW] = layout.viewBox.split(" ").map(Number);

export default function ArchDiagram({
  reducedMotion,
}: {
  reducedMotion: boolean;
}): ReactElement {
  const svgRef = useRef<SVGSVGElement>(null);
  // Holds the rAF id for the pulse loop
  const rafRef = useRef<number | null>(null);
  // Holds the main reveal timeline so we can kill on re-run / unmount
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // ── (1) Reveal: bands + nodes stagger in top→bottom; flow lines draw in ──────
  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Kill any previous timeline before creating a new one
    tlRef.current?.kill();

    const bands = Array.from(svg.querySelectorAll<SVGGElement>("[data-layer]"));
    // Sort by their visual Y position (top→bottom)
    bands.sort((a, b) => {
      const ay = svg.querySelector<SVGRectElement>(`[data-layer="${a.dataset.layer}"] rect`)?.y.baseVal.value ?? 0;
      const by_ = svg.querySelector<SVGRectElement>(`[data-layer="${b.dataset.layer}"] rect`)?.y.baseVal.value ?? 0;
      return ay - by_;
    });

    const nodes = Array.from(svg.querySelectorAll<SVGGElement>("[data-node-id]"));
    const flows = Array.from(svg.querySelectorAll<SVGPathElement>("[data-flow]"));

    if (reducedMotion) {
      // Snap everything to final state immediately — no tweens, no pulses
      gsap.set(bands, { opacity: 1 });
      gsap.set(nodes, { opacity: 1, scale: 1 });
      flows.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = "0";
      });
      return;
    }

    // Set up flow line dash so we can draw them in
    flows.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
    });

    // Hide bands + nodes initially
    gsap.set(bands, { opacity: 0 });
    gsap.set(nodes, { opacity: 0, scale: 0.88, transformOrigin: "50% 50%" });

    const tl = gsap.timeline();
    tlRef.current = tl;

    // Stagger bands top→bottom
    tl.to(bands, {
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
      stagger: 0.12,
    });

    // Nodes pop in per band, slightly offset from band stagger
    tl.to(
      nodes,
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.4)",
        stagger: 0.06,
      },
      0.08, // overlap with band reveal
    );

    // Draw in flow lines (stroke-dashoffset) after bands are mostly visible
    flows.forEach((p, i) => {
      tl.to(
        p,
        {
          strokeDashoffset: 0,
          duration: 0.65,
          ease: "power1.inOut",
        },
        0.5 + i * 0.07,
      );
    });

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  // ── (2) Data pulses: rAF loop travelling top→bottom along flow paths ─────────
  // Guard SSR: all DOM reads happen inside the effect callback, never at render.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || reducedMotion) return;

    // Build ordered list of flow paths (already in archFlows order = top→bottom)
    type Track = { path: SVGPathElement; len: number; dot: SVGCircleElement };
    const tracks: Track[] = [];

    const flows = Array.from(svg.querySelectorAll<SVGPathElement>("[data-flow]"));
    // Create one invisible dot element per flow path
    const dotContainer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    dotContainer.setAttribute("data-pulse-dots", "");
    svg.appendChild(dotContainer);

    flows.forEach((p) => {
      const len = p.getTotalLength();
      if (!len) return;
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("r", "4");
      dot.setAttribute("fill", "var(--upvest-accent)");
      dot.style.opacity = "0";
      dot.style.pointerEvents = "none";
      dotContainer.appendChild(dot);
      tracks.push({ path: p, len, dot });
    });

    if (tracks.length === 0) return;

    // Each flow pulse is offset so they travel top→bottom in a staggered wave
    const PERIOD_MS = 2800;   // time for one pulse to traverse a single flow
    const STAGGER_MS = 320;   // delay between consecutive flow pulses

    let raf = 0;
    let start = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      rafRef.current = raf;

      if (!start) start = now;
      const elapsed = now - start;

      tracks.forEach(({ path, len, dot }, i) => {
        const offset = i * STAGGER_MS;
        const t = ((elapsed - offset) % PERIOD_MS) / PERIOD_MS;
        if (t < 0 || t > 1) {
          dot.style.opacity = "0";
          return;
        }
        // Only show dot for the "moving" portion (0 → 0.85), fade out tail
        const fadeOut = t > 0.78 ? 1 - (t - 0.78) / 0.22 : 1;
        dot.style.opacity = String(Math.max(0, fadeOut) * 0.9);
        const pt = path.getPointAtLength(t * len);
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
      });
    };

    raf = requestAnimationFrame(frame);
    rafRef.current = raf;

    return () => {
      cancelAnimationFrame(raf);
      rafRef.current = null;
      // Remove the dynamically appended dot group
      if (dotContainer.parentNode === svg) {
        svg.removeChild(dotContainer);
      }
    };
  }, [reducedMotion]);

  // ── (3) Kill everything on unmount ──────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      tlRef.current?.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={layout.viewBox}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", height: "auto", overflow: "visible" }}
      role="img"
      aria-label="Solution architecture: intake event sources feed n8n orchestration, which connects via direct APIs (no LLM, no model gateway) to Looker, Ops Panel, Google Sheets and the BNP feed, then to the human 4EC and exception review surface, and finally to an immutable audit log."
    >
      <title>Solution architecture — deterministic pipeline from intake through n8n orchestration and direct-API integration to human review and audit log.</title>
      <defs>
        {/* Arrowhead marker */}
        <marker
          id={ARROW_ID}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path
            d="M0,0 L0,6 L8,3 z"
            style={{ fill: "var(--upvest-muted)" }}
          />
        </marker>
      </defs>

      {/* ── Bands (horizontal layers) — rendered via archLayers.map ── */}
      {archLayers.map((layer) => {
        const band = bandMap.get(layer.id);
        if (!band) return null;
        return (
          <g
            key={layer.id}
            data-layer={layer.id}
            aria-label={layer.title}
          >
            {/* Band background */}
            <rect
              x={0}
              y={band.y}
              width={vbW}
              height={band.h}
              rx={6}
              style={{
                fill: "var(--upvest-accent-soft)",
                opacity: 0.45,
              }}
            />
            {/* Band label — left edge */}
            <text
              x={12}
              y={band.y + band.h / 2}
              dominantBaseline="middle"
              textAnchor="start"
              style={{
                fontSize: "9px",
                fontWeight: 600,
                fill: "var(--upvest-muted)",
                fontFamily: "inherit",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {layer.title}
            </text>
            {/* Optional note */}
            {layer.note && (
              <text
                x={12}
                y={band.y + band.h / 2 + 13}
                dominantBaseline="middle"
                textAnchor="start"
                style={{
                  fontSize: "7.5px",
                  fill: "var(--upvest-muted)",
                  fontFamily: "inherit",
                  opacity: 0.8,
                }}
              >
                {layer.note}
              </text>
            )}
          </g>
        );
      })}

      {/* ── Flow lines (drawn before nodes so nodes render on top) ── */}
      {archFlows.map((flow, i) => {
        const a = nodeMap.get(flow.from);
        const b = nodeMap.get(flow.to);
        if (!a || !b) return null;
        const d = flowPath(a, b);
        return (
          <path
            key={`flow-${i}`}
            d={d}
            data-flow={`${flow.from}-${flow.to}`}
            data-flow-from={flow.from}
            data-flow-to={flow.to}
            fill="none"
            strokeWidth={1.5}
            strokeLinecap="round"
            markerEnd={`url(#${ARROW_ID})`}
            style={{
              stroke: "var(--upvest-muted)",
              opacity: 0.55,
            }}
          />
        );
      })}

      {/* ── Nodes — rendered via archNodes.map ── */}
      {archNodes.map((node) => {
        const placed = nodeMap.get(node.id);
        if (!placed) return null;
        const { x, y, w, h } = placed;
        const rx = x - w / 2;
        const ry = y - h / 2;
        const isAssumed = !!node.assumed;

        return (
          <g
            key={node.id}
            data-node-id={node.id}
            data-layer={node.layer}
            data-assumed={isAssumed ? "true" : "false"}
            transform={`translate(${rx},${ry})`}
            style={{ cursor: "default" }}
          >
            {/* Node background rect */}
            <rect
              x={0}
              y={0}
              width={w}
              height={h}
              rx={6}
              strokeWidth={isAssumed ? 1.5 : 1}
              strokeDasharray={isAssumed ? ASSUMED_DASH : undefined}
              style={{
                fill: "var(--upvest-surface)",
                stroke: isAssumed ? "var(--upvest-muted)" : "var(--upvest-accent)",
                opacity: isAssumed ? 0.7 : 1,
              }}
            />

            {/* Label */}
            <text
              x={w / 2}
              y={node.sub || node.mechanism ? h / 2 - 9 : h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "11px",
                fontWeight: 700,
                fill: "var(--upvest-ink)",
                fontFamily: "inherit",
              }}
            >
              {node.label}
            </text>

            {/* Sub-label */}
            {node.sub && (
              <text
                x={w / 2}
                y={h / 2 + 5}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: "8.5px",
                  fill: "var(--upvest-muted)",
                  fontFamily: "inherit",
                }}
              >
                {node.sub}
              </text>
            )}

            {/* Mechanism label */}
            {node.mechanism && (
              <text
                x={w / 2}
                y={h / 2 + (node.sub ? 17 : 8)}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: "7.5px",
                  fill: "var(--upvest-accent)",
                  fontFamily: "inherit",
                  opacity: 0.85,
                }}
              >
                {node.mechanism}
              </text>
            )}

            {/* Assumed badge */}
            {isAssumed && (
              <text
                x={w - 4}
                y={4}
                textAnchor="end"
                dominantBaseline="hanging"
                style={{
                  fontSize: "6.5px",
                  fill: "var(--upvest-muted)",
                  fontFamily: "inherit",
                  fontStyle: "italic",
                }}
              >
                assumed
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
