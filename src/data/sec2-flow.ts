// ── sec2-flow.ts ───────────────────────────────────────────────────────────
// WINX incoming-securities-transfer process graph for the Q3 flowchart.
// Pure data + types. No React, no runtime logic, no DOM.
// Source: upvest-ai-challenge/Section II.md lines 121–208 (Q3 mermaid + tables).

export type NodeKind =
  | "trigger"
  | "decision"
  | "process"
  | "human"
  | "reject"
  | "io"
  | "terminal";

// autoClass drives the Q3 colour-morph: deterministic-automated vs human-only vs partly.
export type AutoClass = "auto" | "human" | "mixed";

export interface FlowNode {
  id: string;
  label: string; // short label shown in the node (≤ ~28 chars)
  kind: NodeKind;
  autoClass: AutoClass;
  col: number; // layout grid column (0-based, left→right)
  row: number; // layout grid row (0-based, top→bottom)
  lane?: "intake" | "validate" | "decide" | "instruct" | "settle" | "tax";
  tempted?: boolean; // "where you'd be tempted to reach for an LLM" → spotlight in stage 4
  detail?: { auto?: string; human?: string; why?: string }; // clickable-card copy
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string; // e.g. "Yes" / "No" / "settled"
  branch?: "happy" | "yes" | "no" | "exception"; // styles the edge
}

export interface FlowStage {
  id: "overview" | "automate" | "human" | "summary";
  title: string;
  caption: string;
  // which nodes to spotlight at this stage: an AutoClass bucket, "all", or explicit ids
  highlight: AutoClass | "all" | string[];
}

// ── Nodes ────────────────────────────────────────────────────────────────────
// Grid: main spine runs down col 2; branches fan out to cols 0–1 (left) and 3 (right).
export const flowNodes: FlowNode[] = [
  {
    id: "start",
    label: "New transfer trigger",
    kind: "trigger",
    autoClass: "auto",
    col: 2,
    row: 0,
    lane: "intake",
    detail: {
      auto: "Event ingest: N26 API webhook (push), BNP mailbox poll q4h, transfers@ IMAP idle.",
      why: "One transfer makes a human bounce between ~8 surfaces — the trigger is the start of that toil.",
    },
  },
  {
    id: "channel",
    label: "Intake channel?",
    kind: "decision",
    autoClass: "mixed",
    col: 2,
    row: 1,
    lane: "intake",
    detail: {
      auto: "Route by source: API / BNP allegement (4h) / inbound email.",
      why: "Three channels, not one (A5): N26→Upvest request, then Upvest→counterparty confirmation.",
    },
  },
  {
    id: "apiReq",
    label: "N26 API request",
    kind: "process",
    autoClass: "auto",
    col: 1,
    row: 2,
    lane: "intake",
    detail: { auto: "Structured webhook payload — deterministic ingest, no parsing risk." },
  },
  {
    id: "bnpParse",
    label: "Parse BNP allegement",
    kind: "process",
    autoClass: "auto",
    col: 2,
    row: 2,
    lane: "intake",
    detail: {
      auto: "BNP report email (subject 'UPVEST ALLEGEMENTS LC') — structured format, template parser extracts ISIN/qty/account/CP.",
      why: "BNP format is structured → deterministic parse, no model guessing.",
    },
  },
  {
    id: "emailParse",
    label: "Parse inbound email PDF",
    kind: "process",
    autoClass: "auto",
    col: 3,
    row: 2,
    lane: "intake",
    tempted: true,
    detail: {
      auto: "Per-counterparty template parsers (IBKR, Commerzbank) for known formats.",
      human: "Any email not matching a known template → exception queue.",
      why: "Tempting to throw an LLM at unstructured email — instead use template parsers; unknown formats go to a human, no model guessing at customer data.",
    },
  },
  {
    id: "cpty",
    label: "Counterparty?",
    kind: "decision",
    autoClass: "mixed",
    col: 1,
    row: 3,
    lane: "validate",
    detail: {
      auto: "Scalable submits after ISIN; Baader gates on pre-advice.",
      why: "Baader = Scalable's executing/custody arm (A4); pre-advice is a Baader-specific rule.",
    },
  },
  {
    id: "preadvice",
    label: "Wait for pre-advice",
    kind: "human",
    autoClass: "human",
    col: 0,
    row: 3,
    lane: "validate",
    detail: {
      auto: "Match Baader pre-advice to request on exact keys (user + ISIN + qty).",
      human: "Review the Baader pre-advice before release; any pre-advice not matching exact keys → human.",
    },
  },
  {
    id: "userLookup",
    label: "Locate end user",
    kind: "process",
    autoClass: "mixed",
    col: 3,
    row: 3,
    lane: "validate",
    detail: {
      auto: "Query Ops Panel by account+name; normalized search in Looker (diacritics/case/ordering).",
      human: "Still ambiguous → exception queue (Slack) for a human.",
    },
  },
  {
    id: "validation",
    label: "Validation",
    kind: "process",
    autoClass: "auto",
    col: 2,
    row: 4,
    lane: "validate",
    detail: { auto: "Deterministic assembly + checks against validated inputs." },
  },
  {
    id: "nameMatch",
    label: "Name + account match?",
    kind: "decision",
    autoClass: "mixed",
    col: 2,
    row: 5,
    lane: "validate",
    tempted: true,
    detail: {
      auto: "Normalized exact match of name+account vs Ops Panel — strip diacritics/case/ordering, so Müller = Mueller by normalization, not ML.",
      human: "Any non-exact name match → Client Experience.",
      why: "Tempting to use fuzzy/ML name matching — instead normalize deterministically; anything non-exact routes to a human, never auto-accepted.",
    },
  },
  {
    id: "clientExp",
    label: "Contact Client Experience",
    kind: "human",
    autoClass: "human",
    col: 0,
    row: 6,
    lane: "validate",
    detail: {
      human: "Non-exact name match → Client Experience escalation; hold / clarify before proceeding.",
      why: "Wrong customer = real harm; a human owns the ambiguous match.",
    },
  },
  {
    id: "isin",
    label: "ISIN status?",
    kind: "decision",
    autoClass: "mixed",
    col: 2,
    row: 6,
    lane: "decide",
    detail: {
      auto: "ISIN lookup in Looker: active in both / inactive / missing in N26 / not in universe.",
      why: "Brief conflates 'missing' vs 'inactive' (A-register) — disambiguate before routing.",
    },
  },
  {
    id: "isinReject",
    label: "Templated reject + notify",
    kind: "reject",
    autoClass: "auto",
    col: 0,
    row: 7,
    lane: "decide",
    detail: {
      auto: "Inactive / not-in-universe → templated rejection draft + notify client & CP.",
      human: "A human approves and sends the customer-facing rejection.",
    },
  },
  {
    id: "onboard",
    label: "ISIN onboarding go/no-go",
    kind: "human",
    autoClass: "human",
    col: 1,
    row: 7,
    lane: "decide",
    detail: {
      auto: "Missing in N26 → add to N26 Sheet by 15:00 + raise to Brokerage by 17:00 (SLA timers).",
      human: "The onboarding go/no-go decision is Brokerage's.",
    },
  },
  {
    id: "aml",
    label: "Origin in EEA?",
    kind: "decision",
    autoClass: "mixed",
    col: 2,
    row: 7,
    lane: "decide",
    detail: {
      auto: "Origin (not destination) drives it — this is an incoming transfer (A-register fix).",
      why: "Non-EEA is conditionally permitted after AML pre-clearance (A3), not categorically blocked.",
    },
  },
  {
    id: "amlClear",
    label: "AML pre-clearance",
    kind: "human",
    autoClass: "human",
    col: 1,
    row: 8,
    lane: "decide",
    detail: {
      auto: "Assemble a structured pre-clearance request with context for the AML queue.",
      human: "The AML officer decides; Banking accountability — never auto-cleared.",
    },
  },
  {
    id: "amlReject",
    label: "Reject + log",
    kind: "reject",
    autoClass: "auto",
    col: 0,
    row: 9,
    lane: "decide",
    detail: { auto: "AML rejected → deterministic templated log + close-out." },
  },
  {
    id: "cbo",
    label: "CBO indicated?",
    kind: "decision",
    autoClass: "mixed",
    col: 2,
    row: 8,
    lane: "decide",
    detail: {
      auto: "Deterministic check on allegement metadata / pre-advice (non-German brokers).",
      human: "Ambiguous CBO cases → Banking/AML; never auto-accept (NCBO breach) or auto-reject (annoys CP).",
    },
  },
  {
    id: "cboReject",
    label: "Reject — NCBO only",
    kind: "reject",
    autoClass: "mixed",
    col: 0,
    row: 10,
    lane: "decide",
    detail: {
      auto: "Clearly indicated → reject + escalate to Banking/AML (A10).",
      human: "If unsure whether a beneficiary change is indicated, defer to a human.",
    },
  },
  {
    id: "fop",
    label: "Draft FOP fields A–H",
    kind: "process",
    autoClass: "auto",
    col: 2,
    row: 9,
    lane: "instruct",
    detail: {
      auto: "Deterministic assembly: ISIN, Quantity, PSET (SSI autofill), SELL (BIC in DEAG), TD/SD, Client Ref, CSA='BNP DEPO'.",
      human: "Create a new SSI entry when the CP is missing from the address book.",
    },
  },
  {
    id: "q4ec",
    label: "Submit to 4EC queue",
    kind: "process",
    autoClass: "auto",
    col: 2,
    row: 10,
    lane: "instruct",
    detail: {
      auto: "Build the draft into the existing 4EC dashboard + attach a context card (source record + lookup proofs).",
    },
  },
  {
    id: "review4ec",
    label: "Second-person 4EC review",
    kind: "human",
    autoClass: "human",
    col: 2,
    row: 11,
    lane: "instruct",
    detail: {
      human: "Regulatory dual-control: a second human verifies the circled fields (accountId, number, bic, instrumentExternalId, placeOfSettlement, quantity, settlementDate, tradeDate) match the source.",
      why: "Dual control means TWO humans — automation pre-fills and surfaces anomalies, it cannot be the second pair of eyes.",
    },
  },
  {
    id: "fix",
    label: "Operator corrects",
    kind: "human",
    autoClass: "human",
    col: 0,
    row: 12,
    lane: "instruct",
    detail: { human: "Rejected at 4EC → operator corrects and resubmits to the queue." },
  },
  {
    id: "send",
    label: "Send to market",
    kind: "process",
    autoClass: "auto",
    col: 2,
    row: 12,
    lane: "settle",
    detail: { auto: "Approved → sent to market via Ops Panel API." },
  },
  {
    id: "settle",
    label: "Settlement status",
    kind: "decision",
    autoClass: "mixed",
    col: 2,
    row: 13,
    lane: "settle",
    detail: {
      auto: "Poll settlement: settled → TRD; client_resolution_required / processing → discrepancy summary.",
    },
  },
  {
    id: "break",
    label: "Resolve MT548 break",
    kind: "human",
    autoClass: "human",
    col: 0,
    row: 14,
    lane: "settle",
    detail: {
      auto: "Assemble a templated discrepancy summary from the MT548 fields + exception queue.",
      human: "The discrepancy-resolution decision + writing/sending the coordination with CP + BNP.",
    },
  },
  {
    id: "trd",
    label: "TRD file generation",
    kind: "process",
    autoClass: "auto",
    col: 2,
    row: 14,
    lane: "tax",
    detail: {
      auto: "Scheduled Python job (replaces Colab): Monday=Friday-date logic; generate TRD; store in G-Drive; Webzos pickup; post to ext-transfers-cpb Slack.",
    },
  },
  {
    id: "cpb",
    label: "CPB final sign-off",
    kind: "human",
    autoClass: "human",
    col: 2,
    row: 15,
    lane: "tax",
    detail: {
      auto: "Upload to N26-tenant drive + notify CPB in Slack.",
      human: "CPB confirmation (external) + final sign-off that tax data is submitted — legal weight, a human acknowledges.",
    },
  },
];

// ── Edges ────────────────────────────────────────────────────────────────────
export const flowEdges: FlowEdge[] = [
  { from: "start", to: "channel", branch: "happy" },
  { from: "channel", to: "apiReq", label: "API", branch: "happy" },
  { from: "channel", to: "bnpParse", label: "BNP 4h", branch: "happy" },
  { from: "channel", to: "emailParse", label: "Email", branch: "happy" },
  { from: "apiReq", to: "cpty", branch: "happy" },
  { from: "cpty", to: "preadvice", label: "Baader", branch: "exception" },
  { from: "cpty", to: "validation", label: "Scalable", branch: "happy" },
  { from: "preadvice", to: "validation", branch: "happy" },
  { from: "bnpParse", to: "userLookup", branch: "happy" },
  { from: "emailParse", to: "userLookup", branch: "happy" },
  { from: "userLookup", to: "validation", branch: "happy" },
  { from: "validation", to: "nameMatch", branch: "happy" },
  { from: "nameMatch", to: "clientExp", label: "No", branch: "no" },
  { from: "nameMatch", to: "isin", label: "Yes", branch: "yes" },
  { from: "isin", to: "isinReject", label: "Inactive / not in universe", branch: "no" },
  { from: "isin", to: "onboard", label: "Missing in N26", branch: "exception" },
  { from: "isin", to: "aml", label: "Active in both", branch: "yes" },
  { from: "onboard", to: "aml", label: "After onboarding", branch: "exception" },
  { from: "aml", to: "amlClear", label: "Non-EEA", branch: "exception" },
  { from: "aml", to: "cbo", label: "EEA", branch: "yes" },
  { from: "amlClear", to: "cbo", label: "Approved", branch: "yes" },
  { from: "amlClear", to: "amlReject", label: "Rejected", branch: "no" },
  { from: "cbo", to: "cboReject", label: "Indicated", branch: "no" },
  { from: "cbo", to: "fop", label: "No", branch: "yes" },
  { from: "fop", to: "q4ec", branch: "happy" },
  { from: "q4ec", to: "review4ec", branch: "happy" },
  { from: "review4ec", to: "send", label: "Approved", branch: "yes" },
  { from: "review4ec", to: "fix", label: "Rejected", branch: "no" },
  { from: "fix", to: "q4ec", branch: "exception" },
  { from: "send", to: "settle", branch: "happy" },
  { from: "settle", to: "trd", label: "settled", branch: "happy" },
  { from: "settle", to: "break", label: "issue", branch: "exception" },
  { from: "break", to: "settle", branch: "exception" },
  { from: "trd", to: "cpb", branch: "happy" },
];

// ── Stages ───────────────────────────────────────────────────────────────────
// Exactly 4 narrative stages: overview → automate → human → summary.
export const flowStages: FlowStage[] = [
  {
    id: "overview",
    title: "One transfer, ~8 surfaces",
    caption:
      "One incoming transfer makes a human bounce across ~8 systems — Ops Panel, Looker, two mailboxes, sheets, drives, Webzos, Colab, Slack.",
    highlight: "all",
  },
  {
    id: "automate",
    title: "Deterministic automation",
    caption:
      "n8n + Python automate the repetitive plumbing — ingest, parse, validate, assemble, monitor — every automated step is reproducible logic.",
    highlight: "auto",
  },
  {
    id: "human",
    title: "Humans decide",
    caption:
      "The gates stay human: 4EC dual control, AML, CBO edge cases, customer-facing rejections, settlement breaks, ISIN onboarding, tax sign-off.",
    highlight: "human",
  },
  {
    id: "summary",
    title: "No LLM — humans decide",
    caption:
      "Where you'd reach for an LLM — unstructured email, fuzzy name match — use deterministic methods or route to a human. No model in the live path.",
    highlight: ["emailParse", "nameMatch"],
  },
];
