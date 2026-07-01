// ── FlowChart.tsx ──────────────────────────────────────────────────────────
// The interactive SVG renderer + GSAP stage engine for the Q3 WINX flowchart.
// 4 narrative stages: overview → automate → human → summary.
//   - edge draw-in via stroke-dashoffset
//   - happy-path pulse via path.getPointAtLength()  (no premium GSAP plugins)
//   - colour-morph of "auto" nodes (stage 1)
//   - spotlight/dim of "human" nodes (stage 2)
//   - cross-fade to a 3-lane "no-LLM" summary (stage 3)
// reducedMotion → snap to each stage's final state, no tweens.

"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { flowNodes, flowEdges, type FlowNode } from "@/data/sec2-flow";
import { v2Content } from "@/data/ai-challenge";
import {
  layoutNodes,
  viewBoxFor,
  edgePath,
  wrapEdgePath,
  wrapLabel,
  type Placed,
} from "./layout";

// Token mirror values (SVG fills can use these literals; comments tie them to --upvest-*).
const COL = {
  auto: "#1aa589", // green family
  autoStroke: "#138a72",
  human: "#b06a1a", // amber
  mixed: "#4f5bff", // --upvest-accent
  reject: "#c0392b",
  ink: "#0e1238", // --upvest-ink
  surface: "#ffffff", // --upvest-surface
  muted: "#5b6079", // --upvest-muted
  edge: "#aab0d0",
  soft: "#e7eaff", // --upvest-accent-soft
};

function strokeFor(n: FlowNode): string {
  if (n.kind === "reject") return COL.reject;
  if (n.autoClass === "auto") return COL.autoStroke;
  if (n.autoClass === "human") return COL.human;
  return COL.mixed;
}

const AUTO_COUNT = flowNodes.filter((n) => n.autoClass === "auto").length;
const TOTAL = flowNodes.length;

// Per-edge label position override (fraction along the edge, source→target).
// Default is 0.5 (midpoint). A few long diagonal labels whose midpoint would
// cross a node-in-between are nudged toward an endpoint into clearer space.
const LABEL_T: Record<string, number> = {
  "isin-isinReject": 0.72, // "Inactive / not in universe" — slide up toward the reject node, clear of onboard
};

// Node ids forming the visual "happy path" the pulse travels.
const HAPPY = [
  "start", "channel", "bnpParse", "userLookup", "validation", "nameMatch",
  "isin", "aml", "cbo", "fop", "q4ec", "review4ec", "send", "settle", "trd", "cpb",
];

export default function FlowChart({
  stage,
  onSelectNode,
  reducedMotion = false,
  active = true,
}: {
  stage: number;
  onSelectNode: (n: FlowNode | null) => void;
  reducedMotion?: boolean;
  active?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number | null>(null);
  const stageTlRef = useRef<gsap.core.Timeline | null>(null);
  const pulsePropsRef = useRef({ active, stage, reducedMotion });

  const placed = useMemo(() => layoutNodes(flowNodes), []);
  const viewBox = useMemo(() => viewBoxFor(placed), [placed]);
  const placedById = useMemo(() => {
    const m = new Map<string, Placed>();
    placed.forEach((p) => m.set(p.node.id, p));
    return m;
  }, [placed]);

  // Y of the horizontal channel in the gap between the two folded bands —
  // where band-crossing (wrap) edges run so they clear all node rows.
  const wrapChannelY = useMemo(() => {
    const b0 = placed.filter((p) => p.band === 0);
    const b1 = placed.filter((p) => p.band === 1);
    if (b0.length === 0 || b1.length === 0) return 0;
    const b0Bottom = Math.max(...b0.map((p) => p.y + p.h / 2));
    const b1Top = Math.min(...b1.map((p) => p.y - p.h / 2));
    return b0Bottom + (b1Top - b0Bottom) * 0.45;
  }, [placed]);

  // Stable stacking order for band-crossing (wrap) edges so their labels can be
  // laid out one-per-row in the band-gap channel instead of piling on each other.
  const wrapOrder = useMemo(() => {
    const m = new Map<string, number>();
    let i = 0;
    for (const e of flowEdges) {
      const a = placedById.get(e.from);
      const b = placedById.get(e.to);
      if (a && b && a.band !== b.band) m.set(`${e.from}-${e.to}`, i++);
    }
    return m;
  }, [placedById]);

  // ONE continuous path that FOLLOWS THE ACTUAL DRAWN EDGES (incl. the orthogonal
  // band-wrap), bridged through each node's centre so there's no teleport. This
  // keeps the pulse on the rails instead of cutting across empty space.
  const pulseTrackD = useMemo(() => {
    const pts = HAPPY.map((id) => placedById.get(id)).filter(Boolean) as Placed[];
    if (pts.length === 0) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      const ep =
        a.band !== b.band
          ? wrapEdgePath(a, b, wrapChannelY, b.node.col * 9)
          : edgePath(a, b);
      // line from current node centre → edge start, follow the edge, then → next centre
      d += " " + ep.replace(/^M/, "L") + ` L ${b.x} ${b.y}`;
    }
    return d;
  }, [placedById, wrapChannelY]);

  // Edge geometry (path + label placement) computed once. Labels are rendered in
  // a SEPARATE layer ABOVE the nodes (see JSX) so a node's fill never paints over
  // an edge label — labels always sit on top and stay readable.
  const edgeGeom = useMemo(() => {
    return flowEdges
      .map((e) => {
        const a = placedById.get(e.from);
        const b = placedById.get(e.to);
        if (!a || !b) return null;
        const isWrap = a.band !== b.band;
        const offset = isWrap ? b.node.col * 9 : 0;
        const d = isWrap ? wrapEdgePath(a, b, wrapChannelY, offset) : edgePath(a, b);
        // Wrap labels stack one-per-row in the band-gap, left-anchored just right
        // of the source's drop line. In-band labels sit at the edge midpoint —
        // which lands in the inter-node gap for short straight edges. Diagonal
        // edges whose midpoint would cross a node-in-between get a per-edge `t`
        // bias (LABEL_T) so the label slides into clear space instead.
        const wi = wrapOrder.get(`${e.from}-${e.to}`) ?? 0;
        const t = LABEL_T[`${e.from}-${e.to}`] ?? 0.5;
        const lx = isWrap ? a.x + 10 : a.x + (b.x - a.x) * t;
        const ly = isWrap ? a.y + a.h / 2 + 17 + wi * 17 : a.y + (b.y - a.y) * t;
        const exception = e.branch === "exception" || e.branch === "no";
        return {
          key: `${e.from}-${e.to}`,
          d,
          exception,
          label: e.label,
          lx,
          ly,
          anchor: (isWrap ? "start" : "middle") as "start" | "middle",
        };
      })
      .filter((g): g is NonNullable<typeof g> => g !== null);
  }, [placedById, wrapChannelY, wrapOrder]);

  // ── Init (pre-paint): position nodes, set up edge dash, hide pulse ──────────
  // Re-runs when the slide becomes active so SVG geometry (getTotalLength) is
  // measured while the slide is visible, not while display:none (which yields 0).
  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || !active) return;

    // Edge draw-in setup
    svg.querySelectorAll<SVGPathElement>("path[data-edge]").forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = reducedMotion ? "0" : String(len);
    });
    svg.querySelectorAll<SVGTextElement>("[data-edge-label]").forEach((t) => {
      gsap.set(t, { opacity: reducedMotion ? 1 : 0 });
    });
    // Node transform origin for clean spotlight scaling
    svg.querySelectorAll<SVGGElement>("[data-node-id]").forEach((g) => {
      gsap.set(g, { transformOrigin: "50% 50%" });
    });
  }, [reducedMotion, active]);

  // Mirror the latest render values into a ref the persistent rAF loop reads.
  useEffect(() => {
    pulsePropsRef.current = { active, stage, reducedMotion };
  }, [active, stage, reducedMotion]);

  // ── Pulse along the happy path (stages 0 & 1 only, non-reduced) ─────────────
  // ONE persistent requestAnimationFrame loop (mount→unmount). It reads the
  // latest props from a ref each frame and lazily measures SVG geometry the
  // first time the slide is actually visible — robust against effect-timing on
  // the inactive→active transition. Constant, time-based speed. As the dot
  // reaches each node it lights the node (and a decision's border) + the arrow
  // it just travelled along; CSS transitions soften it into a glow.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const track = svg.querySelector<SVGPathElement>("path[data-pulse-track]");
    const dot = svg.querySelector<SVGCircleElement>("circle[data-pulse]");
    if (!track || !dot) return;

    type Step = { shape: SVGElement | null; edge: SVGPathElement | null; cx: number; cy: number };
    let steps: Step[] | null = null;
    let len = 0;
    let activeHL = -1;
    let start = 0;
    let raf = 0;
    let durationMs = 12000; // recomputed from path length so speed is constant
    const THRESH2 = 78 * 78;

    const resolve = () => {
      len = track.getTotalLength();
      if (!len) return false;
      durationMs = Math.max(11000, len * 1.9); // ~constant arc-length speed, calm

      steps = HAPPY.map((id, j) => {
        const g = svg.querySelector<SVGGElement>(`[data-node-id="${id}"]`);
        const shape = g?.querySelector<SVGElement>("[data-shape]") ?? null;
        const edge =
          j > 0
            ? svg.querySelector<SVGPathElement>(`path[data-edge="${HAPPY[j - 1]}-${id}"]`)
            : null;
        const c = placedById.get(id);
        if (shape) shape.style.transition = "stroke 0.18s, stroke-width 0.18s, filter 0.22s";
        if (edge) edge.style.transition = "stroke 0.18s, stroke-width 0.18s";
        return { shape, edge, cx: c?.x ?? 0, cy: c?.y ?? 0 };
      });
      return true;
    };

    const setHL = (j: number, on: boolean) => {
      const s = steps?.[j];
      if (!s) return;
      if (s.shape) {
        s.shape.style.stroke = on ? COL.mixed : "";
        s.shape.style.strokeWidth = on ? "4" : "";
        s.shape.style.filter = on ? "drop-shadow(0 0 7px rgba(79,91,255,0.85))" : "";
      }
      if (s.edge) {
        s.edge.style.stroke = on ? COL.mixed : "";
        s.edge.style.strokeWidth = on ? "3.6" : "";
      }
    };
    const clearHL = () => {
      if (activeHL >= 0) {
        setHL(activeHL, false);
        activeHL = -1;
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      rafRef.current = raf;
      const { active: a, stage: st, reducedMotion: rm } = pulsePropsRef.current;
      const show = a && !rm && (st === 0 || st === 1);
      if (!show) {
        dot.style.opacity = "0";
        clearHL();
        start = 0;
        return;
      }
      if (!len || !steps) {
        if (!resolve()) return; // not measurable yet (still hidden)
      }
      dot.style.opacity = "1";
      if (!start) start = now;
      const t = ((now - start) % durationMs) / durationMs;
      const pt = track.getPointAtLength(t * len);
      dot.setAttribute("cx", String(pt.x));
      dot.setAttribute("cy", String(pt.y));

      let nearest = -1;
      let nd = THRESH2;
      const arr = steps!;
      for (let j = 0; j < arr.length; j++) {
        const dd = (pt.x - arr[j].cx) ** 2 + (pt.y - arr[j].cy) ** 2;
        if (dd < nd) {
          nd = dd;
          nearest = j;
        }
      }
      if (nearest !== activeHL) {
        if (activeHL >= 0) setHL(activeHL, false);
        if (nearest >= 0) setHL(nearest, true);
        activeHL = nearest;
      }
    };
    raf = requestAnimationFrame(frame);
    rafRef.current = raf;

    return () => {
      cancelAnimationFrame(raf);
      rafRef.current = null;
      clearHL();
    };
  }, [pulseTrackD, placedById]);

  // ── Stage transitions ───────────────────────────────────────────────────────
  useEffect(() => {
    const svg = svgRef.current;
    const root = rootRef.current;
    if (!svg || !root) return;

    stageTlRef.current?.kill();
    const tl = gsap.timeline();
    stageTlRef.current = tl;

    const q = <T extends Element>(sel: string) =>
      Array.from(svg.querySelectorAll<T>(sel));
    const nodes = q<SVGGElement>("[data-node-id]");
    const edges = q<SVGPathElement>("path[data-edge]");
    const edgeLabels = q<SVGTextElement>("[data-edge-label]");
    const chip = root.querySelector<HTMLElement>("[data-count-chip]");
    const summary = root.querySelector<HTMLElement>("[data-summary]");

    const shapeOf = (g: SVGGElement) => g.querySelector<SVGElement>("[data-shape]");
    const labelOf = (g: SVGGElement) => g.querySelector<SVGElement>("[data-label]");
    const autoOf = (g: SVGGElement) => g.getAttribute("data-auto");

    const set = reducedMotion;
    const D = (d: number) => (set ? 0 : d);

    // Base neutral state for any node (used by stages 0/1 baseline).
    const paint = (
      g: SVGGElement,
      fill: string,
      labelFill: string,
      opacity: number,
      scale: number,
      dur: number,
      stagger = 0,
    ) => {
      const shape = shapeOf(g);
      const label = labelOf(g);
      const t = set ? { duration: 0 } : { duration: dur, ease: "power2.out", delay: stagger };
      if (shape) tl.to(shape, { attr: { fill }, ...t }, 0);
      if (label) tl.to(label, { attr: { fill: labelFill }, ...t }, 0);
      tl.to(g, { opacity, scale, ...t }, 0);
    };

    // Hide / show the summary overlay & chip per stage.
    const showSummary = stage === 3;
    if (summary) tl.to(summary, { opacity: showSummary ? 1 : 0, duration: D(0.4) }, 0);
    if (chip) tl.to(chip, { opacity: stage === 1 ? 1 : 0, y: stage === 1 ? 0 : 6, duration: D(0.35) }, 0);

    // Edge draw-in (stage 0) — keep drawn afterwards.
    edges.forEach((e, i) => {
      const len = e.getTotalLength();
      if (set) {
        e.style.strokeDashoffset = "0";
      } else if (stage === 0) {
        tl.fromTo(
          e,
          { strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut", delay: i * 0.018 },
          0,
        );
      } else {
        e.style.strokeDashoffset = "0";
      }
    });
    edgeLabels.forEach((t) =>
      tl.to(t, { opacity: stage >= 1 ? 1 : stage === 0 ? 1 : 0, duration: D(0.4), delay: set ? 0 : 0.5 }, 0),
    );
    // graph layer dim at summary stage
    const graphLayer = svg.querySelector<SVGGElement>("[data-graph-layer]");
    if (graphLayer) tl.to(graphLayer, { opacity: showSummary ? 0.12 : 1, duration: D(0.4) }, 0);

    // Per-node painting by stage.
    nodes.forEach((g, i) => {
      const cls = autoOf(g);
      const kind = g.getAttribute("data-kind");
      const baseFill = COL.surface;
      const baseLabel = COL.ink;
      const xPos = placedById.get(g.getAttribute("data-node-id") || "")?.x ?? 0;
      const sweep = set ? 0 : xPos * 0.0009; // left→right sweep delay

      if (stage === 0) {
        // overview — staggered reveal, neutral
        if (set) {
          paint(g, baseFill, baseLabel, 1, 1, 0);
        } else {
          tl.fromTo(
            g,
            { opacity: 0, scale: 0.92 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)", delay: 0.15 + i * 0.025 },
            0,
          );
          const shape = shapeOf(g);
          const label = labelOf(g);
          if (shape) gsap.set(shape, { attr: { fill: baseFill } });
          if (label) gsap.set(label, { attr: { fill: baseLabel } });
        }
      } else if (stage === 1) {
        // automate — auto nodes morph to green (left→right sweep)
        if (cls === "auto") {
          paint(g, COL.auto, COL.surface, 1, 1, 0.5, sweep);
        } else {
          paint(g, baseFill, baseLabel, 1, 1, 0.4);
        }
      } else if (stage === 2) {
        // human — spotlight human nodes, dim the rest
        if (cls === "human") {
          paint(g, COL.human, COL.surface, 1, 1.08, 0.45);
        } else if (cls === "auto") {
          paint(g, COL.auto, COL.surface, 0.26, 1, 0.4);
        } else {
          paint(g, baseFill, baseLabel, 0.26, 1, 0.4);
        }
        void kind;
      } else {
        // summary (stage 3) — restore class colours behind the ghosted graph
        if (cls === "auto") paint(g, COL.auto, COL.surface, 1, 1, 0.3);
        else if (cls === "human") paint(g, COL.human, COL.surface, 1, 1, 0.3);
        else paint(g, baseFill, baseLabel, 1, 1, 0.3);
      }
    });

    return () => {
      tl.kill();
    };
  }, [stage, reducedMotion, placedById, active]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      stageTlRef.current?.kill();
    };
  }, []);

  const onNodeKey = (e: React.KeyboardEvent, n: FlowNode) => {
    if (e.key === "Enter" || e.key === " ") {
      e.stopPropagation();
      e.preventDefault();
      onSelectNode(n);
    }
  };

  const q3 = v2Content.sec2.q3;
  const temptedNodes = flowNodes.filter((n) => n.tempted);

  return (
    <div ref={rootRef} style={{ position: "relative", width: "100%" }}>
      <svg
        ref={svgRef}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby="winx-flow-title winx-flow-desc"
        style={{ width: "100%", height: "auto", display: "block", maxHeight: "62vh", overflow: "visible" }}
      >
        <title id="winx-flow-title">WINX incoming-securities-transfer process flow</title>
        <desc id="winx-flow-desc">
          A deterministic pipeline. Automated steps (ingest, parse, validate, assemble, monitor) are
          green; human-decision gates (4EC dual control, AML, CBO, rejections, settlement break, tax
          sign-off) are amber. No LLM is used in the live path.
        </desc>

        <defs>
          <marker
            id="winx-arrow"
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={COL.edge} />
          </marker>
        </defs>

        <g data-graph-layer>
          {/* Edges (paths only — labels are drawn ABOVE the nodes, below) */}
          <g data-edges>
            {edgeGeom.map((g) => (
              <path
                key={g.key}
                data-edge={g.key}
                d={g.d}
                fill="none"
                stroke={g.exception ? "#c7b2b2" : COL.edge}
                strokeWidth={2}
                strokeDasharray={g.exception ? "5 4" : undefined}
                markerEnd="url(#winx-arrow)"
              />
            ))}
          </g>

          {/* Pulse track (invisible) + dot */}
          <path data-pulse-track d={pulseTrackD} fill="none" stroke="none" />
          <circle data-pulse r={5.5} fill={COL.mixed} opacity={0}>
            {!reducedMotion && (
              <animate attributeName="r" values="5.5;7;5.5" dur="1.2s" repeatCount="indefinite" />
            )}
          </circle>

          {/* Nodes */}
          <g data-nodes>
            {placed.map((p) => (
              <NodeShape key={p.node.id} p={p} onSelect={onSelectNode} onKey={onNodeKey} />
            ))}
          </g>

          {/* Edge labels — drawn LAST so they sit above nodes and never get
              painted over. Each has a white halo (paintOrder: stroke) for contrast
              against edges, node fills and the page background alike. */}
          <g data-edge-labels>
            {edgeGeom
              .filter((g) => g.label)
              .map((g) => (
                <text
                  key={g.key}
                  data-edge-label
                  x={g.lx}
                  y={g.ly}
                  textAnchor={g.anchor}
                  dominantBaseline="central"
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "12px",
                    fontWeight: 600,
                    fill: "#363c5e",
                    paintOrder: "stroke",
                    stroke: COL.surface,
                    strokeWidth: "4px",
                    strokeLinejoin: "round",
                    pointerEvents: "none",
                  }}
                >
                  {g.label}
                </text>
              ))}
          </g>
        </g>
      </svg>

      {/* Count chip — "N of M steps automated" (stage 1) */}
      <div
        data-count-chip
        style={{
          position: "absolute",
          top: "0.1rem",
          left: "0.25rem",
          opacity: 0,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          padding: "0.4rem 0.8rem",
          borderRadius: "2rem",
          background: "rgba(26,165,137,0.16)",
          border: "1px solid rgba(26,165,137,0.4)",
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: COL.autoStroke,
          pointerEvents: "none",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: COL.auto }} />
        {AUTO_COUNT} of {TOTAL} steps automated
      </div>

      {/* Summary overlay — 3-lane "no-LLM" diagram (stage 3) */}
      <div
        data-summary
        aria-hidden={stage !== 3}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(0.9rem, 2.2vh, 1.6rem)",
          padding: "1rem",
          pointerEvents: stage === 3 ? "auto" : "none",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))",
            gap: "clamp(0.7rem, 1.8vw, 1.2rem)",
            width: "min(100%, 880px)",
          }}
        >
          <SummaryLane
            color={COL.autoStroke}
            bg="rgba(26,165,137,0.1)"
            title="Automate"
            sub="deterministic"
            items={["n8n orchestration", "Python transforms + TRD", "ingest · parse · validate"]}
          />
          <SummaryLane
            color={COL.human}
            bg="rgba(176,106,26,0.1)"
            title="Route to human"
            sub="judgment"
            items={["4EC dual control", "AML · CBO decisions", "rejections · breaks · tax"]}
          />
          <SummaryLane
            color={COL.reject}
            bg="rgba(192,57,43,0.08)"
            title="LLM"
            sub="✕ not in the live path"
            struck
            items={temptedNodes.map((n) => `${n.label} → deterministic`)}
          />
        </div>
        <p
          style={{
            margin: 0,
            maxWidth: "62ch",
            textAlign: "center",
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(0.92rem, 1.7vw, 1.18rem)",
            fontWeight: 700,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            color: COL.ink,
          }}
        >
          {q3.principle.split(".")[0]}.
        </p>
      </div>
    </div>
  );
}

// ── A single node group ───────────────────────────────────────────────────────
function NodeShape({
  p,
  onSelect,
  onKey,
}: {
  p: Placed;
  onSelect: (n: FlowNode) => void;
  onKey: (e: React.KeyboardEvent, n: FlowNode) => void;
}) {
  const n = p.node;
  const w = p.w;
  const h = p.h;
  const stroke = strokeFor(n);
  const lines = wrapLabel(n.label, n.kind === "decision" ? 16 : 24);
  const isDecision = n.kind === "decision";
  const isPill = n.kind === "trigger" || n.kind === "terminal";

  return (
    <g
      data-node-id={n.id}
      data-auto={n.autoClass}
      data-kind={n.kind}
      data-cx={p.x}
      data-cy={p.y}
      transform={`translate(${p.x} ${p.y})`}
      role="button"
      tabIndex={0}
      aria-label={`${n.label}. ${
        n.autoClass === "auto" ? "Automated" : n.autoClass === "human" ? "Human decision" : "Branch"
      }${n.tempted ? ". LLM temptation point — handled deterministically." : ""}. Click for detail.`}
      onClick={() => onSelect(n)}
      onKeyDown={(e) => onKey(e, n)}
      style={{ cursor: "pointer", outline: "none" }}
    >
      {isDecision ? (
        <polygon
          data-shape
          points={`0,${-h / 2} ${w / 2},0 0,${h / 2} ${-w / 2},0`}
          fill={COL.surface}
          stroke={stroke}
          strokeWidth={n.autoClass === "human" ? 2.4 : 1.6}
        />
      ) : (
        <rect
          data-shape
          x={-w / 2}
          y={-h / 2}
          width={w}
          height={h}
          rx={isPill ? h / 2 : 12}
          fill={COL.surface}
          stroke={stroke}
          strokeWidth={n.autoClass === "human" ? 2.4 : 1.6}
          strokeDasharray={n.kind === "reject" ? "4 3" : undefined}
        />
      )}

      <text
        data-label
        x={0}
        y={0}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontFamily: "var(--font-sans, sans-serif)",
          fontSize: "12.5px",
          fontWeight: 600,
          fill: COL.ink,
          pointerEvents: "none",
        }}
      >
        {lines.map((ln, i) => (
          <tspan key={i} x={0} dy={i === 0 ? `${-(lines.length - 1) * 0.6}em` : "1.2em"}>
            {ln}
          </tspan>
        ))}
      </text>

      {n.tempted && (
        <text
          x={w / 2 - 12}
          y={-h / 2 + 14}
          textAnchor="middle"
          style={{ fontSize: "13px", pointerEvents: "none" }}
        >
          ⚡
        </text>
      )}
    </g>
  );
}

function SummaryLane({
  color,
  bg,
  title,
  sub,
  items,
  struck,
}: {
  color: string;
  bg: string;
  title: string;
  sub: string;
  items: string[];
  struck?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.55rem",
        padding: "clamp(0.85rem, 1.8vw, 1.2rem)",
        borderRadius: "0.7rem",
        background: bg,
        border: `1px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
        <span
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            fontWeight: 800,
            color,
            textDecoration: struck ? "line-through" : "none",
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.62rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: struck ? color : "var(--upvest-muted, #5b6079)",
            fontWeight: 700,
          }}
        >
          {sub}
        </span>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {items.map((it, i) => (
          <li
            key={i}
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: "clamp(0.72rem, 1.1vw, 0.84rem)",
              lineHeight: 1.35,
              color: "var(--upvest-ink, #0e1238)",
              paddingLeft: "0.7rem",
              borderLeft: `2px solid ${color}`,
            }}
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
