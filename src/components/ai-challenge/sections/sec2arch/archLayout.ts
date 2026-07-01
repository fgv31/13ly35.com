// ── archLayout.ts ────────────────────────────────────────────────────────────
// Pure layout helpers for the Section II architecture diagram.
// No React, no DOM. Maps ArchLayer/ArchNode → pixel coords + SVG paths.
//
// Layout model:
//   - 5 horizontal bands stacked top→bottom, one per layer (row 0–4).
//   - Within each band, nodes are distributed left→right by their `col` value.
//   - Bands are centred horizontally within the total canvas width.
//   - viewBox is landscape (wide), sized to fit all bands.
//   - flowPath() builds a smooth cubic-bezier from a node's bottom-centre to
//     the next node's top-centre (top→bottom bias).

import type { ArchLayer, ArchNode } from "@/data/sec2-arch";

export interface PlacedNode {
  node: ArchNode;
  x: number; // centre X
  y: number; // centre Y
  w: number;
  h: number;
}

export interface PlacedLayer {
  layer: ArchLayer;
  y: number; // top-left Y of the band
  h: number; // band height
}

const DEFAULTS = {
  bandH: 110,   // height of each horizontal band
  nodeW: 160,   // node rect width
  nodeH: 60,    // node rect height (fixed, derived from bandH)
  gapX: 32,     // horizontal gap between nodes within a band
  padX: 40,     // left/right canvas padding
  padY: 28,     // top/bottom canvas padding
  bandGap: 10,  // vertical gap between consecutive bands
};

export function layoutArch(
  layers: ArchLayer[],
  nodes: ArchNode[],
  opts?: { bandH?: number; nodeW?: number; gap?: number },
): { nodes: PlacedNode[]; bands: PlacedLayer[]; viewBox: string } {
  const bandH = opts?.bandH ?? DEFAULTS.bandH;
  const nodeW = opts?.nodeW ?? DEFAULTS.nodeW;
  const nodeH = Math.round(bandH * 0.55); // ~55% of band height
  const gapX = opts?.gap ?? DEFAULTS.gapX;
  const { padX, padY, bandGap } = DEFAULTS;

  // Sort layers by row
  const sortedLayers = [...layers].sort((a, b) => a.row - b.row);

  // Determine max columns across all nodes to fix canvas width
  const maxColsByLayer: Record<string, number> = {};
  for (const n of nodes) {
    maxColsByLayer[n.layer] = Math.max(maxColsByLayer[n.layer] ?? 0, n.col);
  }
  const globalMaxCols = Math.max(...Object.values(maxColsByLayer)); // 0-indexed max col

  // Canvas width: fit the widest band
  const totalNodeWidth = (globalMaxCols + 1) * nodeW + globalMaxCols * gapX;
  const canvasW = padX * 2 + totalNodeWidth;

  // Build band placements
  const bands: PlacedLayer[] = sortedLayers.map((layer, i) => ({
    layer,
    y: padY + i * (bandH + bandGap),
    h: bandH,
  }));

  const totalH = padY * 2 + sortedLayers.length * bandH + (sortedLayers.length - 1) * bandGap;
  const viewBox = `0 0 ${canvasW} ${totalH}`;

  // Build node placements
  const bandMap = new Map(bands.map((b) => [b.layer.id, b]));

  const placedNodes: PlacedNode[] = nodes.map((node) => {
    const band = bandMap.get(node.layer)!;

    // How many nodes in this layer?
    const layerNodes = nodes.filter((n) => n.layer === node.layer);
    const maxCol = Math.max(...layerNodes.map((n) => n.col));
    const colCount = maxCol + 1;

    // Centre the node group horizontally within the canvas
    const groupW = colCount * nodeW + (colCount - 1) * gapX;
    const groupStartX = (canvasW - groupW) / 2;

    const cx = groupStartX + node.col * (nodeW + gapX) + nodeW / 2;
    const cy = band.y + band.h / 2;

    return { node, x: cx, y: cy, w: nodeW, h: nodeH };
  });

  return { nodes: placedNodes, bands, viewBox };
}

// Smooth cubic bezier from bottom-centre of `a` to top-centre of `b`.
// Both nodes are expected to be in vertically adjacent layers (top→bottom bias).
export function flowPath(a: PlacedNode, b: PlacedNode): string {
  const sx = a.x;
  const sy = a.y + a.h / 2; // bottom centre of source
  const ex = b.x;
  const ey = b.y - b.h / 2; // top centre of target
  const c = Math.abs(ey - sy) * 0.45;
  return `M ${sx} ${sy} C ${sx} ${sy + c} ${ex} ${ey - c} ${ex} ${ey}`;
}
