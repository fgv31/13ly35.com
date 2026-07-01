// ── layout.ts ──────────────────────────────────────────────────────────────
// Pure layout helpers for the Q3 WINX flowchart. No React, no DOM.
// Maps {col,row} grid coords → pixel coords, computes the viewBox, and builds
// smooth cubic-bezier edge paths.
//
// HORIZONTAL flow, FOLDED into 2 bands (text-wrap style): the sequential step
// axis (node.row) is split across BANDS rows that each read left→right; the
// branch-lane axis (node.col) stacks within a band. Folding halves the width so
// the chart fills the slide's height and the blocks render ~2× larger.
// edgePath auto-detects dominant direction (incl. the band-wrap connector).

import type { FlowNode } from "@/data/sec2-flow";

export interface Placed {
  node: FlowNode;
  x: number; // CENTER x
  y: number; // CENTER y
  w: number;
  h: number;
  band: number; // which folded band (0 = top, 1 = bottom)
}

// gapX = horizontal spacing between sequential steps (the row axis → X)
// gapY = vertical spacing between branch lanes (the col axis → Y)
// bandGap = vertical gap between the two folded bands
const DEFAULTS = { cellW: 208, cellH: 68, gapX: 26, gapY: 24, bandGap: 62, pad: 36 };
const BANDS = 2;

export function layoutNodes(
  nodes: FlowNode[],
  opts?: { cellW?: number; cellH?: number; gap?: number },
): Placed[] {
  const cellW = opts?.cellW ?? DEFAULTS.cellW;
  const cellH = opts?.cellH ?? DEFAULTS.cellH;
  const gapX = opts?.gap ?? DEFAULTS.gapX;
  const gapY = opts?.gap ?? DEFAULTS.gapY;
  const { bandGap, pad } = DEFAULTS;

  const maxRow = nodes.reduce((m, n) => Math.max(m, n.row), 0);
  const maxCol = nodes.reduce((m, n) => Math.max(m, n.col), 0);
  const perBand = Math.ceil((maxRow + 1) / BANDS); // steps per band
  const laneStride = cellH + gapY;
  const bandStride = (maxCol + 1) * laneStride + bandGap;

  // Fold: each band reads left→right; band index shifts the lane-stack down.
  return nodes.map((node) => {
    const band = Math.floor(node.row / perBand);
    const localRow = node.row - band * perBand;
    return {
      node,
      x: pad + localRow * (cellW + gapX) + cellW / 2,
      y: pad + band * bandStride + node.col * laneStride + cellH / 2,
      w: cellW,
      h: cellH,
      band,
    };
  });
}

export function viewBoxFor(placed: Placed[], pad = DEFAULTS.pad): string {
  if (placed.length === 0) return "0 0 100 100";
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of placed) {
    minX = Math.min(minX, p.x - p.w / 2);
    minY = Math.min(minY, p.y - p.h / 2);
    maxX = Math.max(maxX, p.x + p.w / 2);
    maxY = Math.max(maxY, p.y + p.h / 2);
  }
  const x = minX - pad;
  const y = minY - pad;
  const w = maxX - minX + pad * 2;
  const h = maxY - minY + pad * 2;
  return `${x} ${y} ${w} ${h}`;
}

// Smooth cubic bezier from the boundary of `a` to the boundary of `b`.
// Vertical-dominant edges exit top/bottom; horizontal-dominant exit the sides.
export function edgePath(a: Placed, b: Placed): string {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (Math.abs(dy) >= Math.abs(dx)) {
    const sgn = Math.sign(dy || 1);
    const sy = a.y + (sgn * a.h) / 2;
    const ey = b.y - (sgn * b.h) / 2;
    const c = Math.abs(ey - sy) * 0.5;
    return `M ${a.x} ${sy} C ${a.x} ${sy + sgn * c} ${b.x} ${ey - sgn * c} ${b.x} ${ey}`;
  }

  const sgn = Math.sign(dx || 1);
  const sx = a.x + (sgn * a.w) / 2;
  const ex = b.x - (sgn * b.w) / 2;
  const c = Math.abs(ex - sx) * 0.5;
  return `M ${sx} ${a.y} C ${sx + sgn * c} ${a.y} ${ex - sgn * c} ${b.y} ${ex} ${b.y}`;
}

// A cubic SEGMENT (no leading "M") from a-center to b-center, biased by the
// dominant axis. Used to build ONE continuous path through node centres so the
// pulse moves at a constant arc-length speed with no teleport between segments.
export function centerSegment(a: Placed, b: Placed): string {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) >= Math.abs(dy)) {
    const c = Math.abs(dx) * 0.5;
    const s = Math.sign(dx || 1);
    return ` C ${a.x + s * c} ${a.y} ${b.x - s * c} ${b.y} ${b.x} ${b.y}`;
  }
  const c = Math.abs(dy) * 0.5;
  const s = Math.sign(dy || 1);
  return ` C ${a.x} ${a.y + s * c} ${b.x} ${b.y - s * c} ${b.x} ${b.y}`;
}

// Orthogonal router for a band-crossing (wrap) edge: exit the BOTTOM of `a`,
// run along a horizontal channel in the GAP between the bands (channelY), then
// enter `b` from its LEFT side. `offset` separates parallel wrap edges into
// their own lanes so two wrap edges never overlap.
export function wrapEdgePath(a: Placed, b: Placed, channelY: number, offset = 0): string {
  const sx = a.x; // exit bottom-centre of source
  const sy = a.y + a.h / 2;
  const ex = b.x - b.w / 2; // enter left-centre of target
  const ey = b.y;
  const cy = channelY + offset;
  const apprX = ex - 34 - offset; // vertical channel just left of the target
  return `M ${sx} ${sy} L ${sx} ${cy} L ${apprX} ${cy} L ${apprX} ${ey} L ${ex} ${ey}`;
}

// Greedy word-wrap so labels fit inside the node box (≤ 2 lines).
export function wrapLabel(label: string, max = 18): string[] {
  const words = label.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (test.length > max && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  // cap at 2 lines, ellipsize the overflow into line 2
  if (lines.length > 2) {
    return [lines[0], lines.slice(1).join(" ")];
  }
  return lines;
}
