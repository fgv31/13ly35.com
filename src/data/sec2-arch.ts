// ── sec2-arch.ts ─────────────────────────────────────────────────────────────
// Section II — Architecture overview graph.
// Pure data + types. No React, no runtime logic, no DOM.
// Independent module — does NOT import from sec2-flow.ts.

export type LayerId =
  | "intake"
  | "orchestrate"
  | "integrate"
  | "human"
  | "audit";

export interface ArchLayer {
  id: LayerId;
  title: string;
  note?: string;
  row: number;
}

export interface ArchNode {
  id: string;
  label: string;
  sub?: string;
  layer: LayerId;
  col: number;
  mechanism?: string;
  assumed?: boolean;
}

export interface ArchFlow {
  from: string;
  to: string;
}

// ── Layers (row 0–4) ──────────────────────────────────────────────────────────
export const archLayers: ArchLayer[] = [
  {
    id: "intake",
    title: "Intake — event sources",
    row: 0,
  },
  {
    id: "orchestrate",
    title: "Orchestration — n8n (self-hosted, EU)",
    row: 1,
  },
  {
    id: "integrate",
    title: "Direct API / data access",
    note: "Direct API · no LLM · no model gateway",
    row: 2,
  },
  {
    id: "human",
    title: "Human review — 4EC + exceptions",
    row: 3,
  },
  {
    id: "audit",
    title: "Audit log",
    row: 4,
  },
];

// ── Nodes ─────────────────────────────────────────────────────────────────────
export const archNodes: ArchNode[] = [
  // intake layer
  {
    id: "n26",
    label: "N26 API",
    layer: "intake",
    col: 0,
    mechanism: "REST API",
  },
  {
    id: "bnp",
    label: "BNP mailbox",
    layer: "intake",
    col: 1,
    mechanism: "IMAP q4h",
  },
  {
    id: "email",
    label: "transfers@upvest",
    layer: "intake",
    col: 2,
    mechanism: "IMAP idle",
  },

  // orchestrate layer
  {
    id: "n8n",
    label: "n8n",
    sub: "Workflows A–G",
    layer: "orchestrate",
    col: 0,
  },
  {
    id: "python",
    label: "Python services",
    sub: "TRD + parsers",
    layer: "orchestrate",
    col: 1,
    mechanism: "Python job",
  },

  // integrate layer
  {
    id: "looker",
    label: "Looker",
    layer: "integrate",
    col: 0,
    mechanism: "REST API",
  },
  {
    id: "opsPanel",
    label: "Ops Panel",
    layer: "integrate",
    col: 1,
    mechanism: "internal API (assumed)",
    assumed: true,
  },
  {
    id: "sheets",
    label: "Google Sheets",
    layer: "integrate",
    col: 2,
    mechanism: "REST API",
  },
  {
    id: "bnpFeed",
    label: "BNP feed",
    layer: "integrate",
    col: 3,
    mechanism: "scheduled download",
  },

  // human layer
  {
    id: "fourEC",
    label: "4EC dashboard",
    layer: "human",
    col: 0,
  },
  {
    id: "exceptions",
    label: "Exceptions",
    sub: "Slack + dashboard",
    layer: "human",
    col: 1,
  },

  // audit layer
  {
    id: "auditLog",
    label: "Audit log",
    sub: "immutable, ≥7y",
    layer: "audit",
    col: 0,
  },
];

// ── Flows (vertical top→down) ─────────────────────────────────────────────────
export const archFlows: ArchFlow[] = [
  // intake → orchestrate
  { from: "n26", to: "n8n" },
  { from: "bnp", to: "n8n" },
  { from: "email", to: "n8n" },

  // orchestrate → integrate
  { from: "n8n", to: "looker" },
  { from: "n8n", to: "opsPanel" },
  { from: "n8n", to: "sheets" },
  { from: "n8n", to: "bnpFeed" },
  { from: "python", to: "sheets" },

  // integrate → human
  { from: "looker", to: "fourEC" },
  { from: "opsPanel", to: "fourEC" },
  { from: "opsPanel", to: "exceptions" },
  { from: "sheets", to: "exceptions" },

  // human → audit
  { from: "fourEC", to: "auditLog" },
  { from: "exceptions", to: "auditLog" },
];
