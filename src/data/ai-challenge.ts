// ── ai-challenge.ts ────────────────────────────────────────────────────────
// Pure data + types. No React, no runtime logic.
// Phase 04/05/06 agents fill string values; types are final here.

import type { AutoClass } from "./sec2-flow";

// ---------------------------------------------------------------------------
// SlideId
// ---------------------------------------------------------------------------
export type SlideId =
  | "welcome"
  | "dim-risk"
  | "dim-founder"
  | "dim-nerd"
  | "failfast"
  | "case-overview"
  | "sec1-questions"
  | "sec1-assumptions"
  | "sec1-verdict"
  | "sec1-teams"
  | "sec1-reframe"
  | "sec2-questions"
  | "sec2-assumptions"
  | "sec2-q1"
  | "sec2-q2"
  | "sec2-q3"
  | "sec2-q4a"
  | "sec2-q4b"
  | "sec2-q5"
  | "sec2-q6"
  | "sec3-questions"
  | "sec3-q1"
  | "sec3-q2"
  | "sec3-q3"
  | "sec3-q4a"
  | "sec3-q4b"
  | "closing";

// ---------------------------------------------------------------------------
// BgParams
// ---------------------------------------------------------------------------
export interface BgParams {
  tone: "light" | "dark";
  accent: string;
  intensity: number;
}

// ---------------------------------------------------------------------------
// SlideMeta
// ---------------------------------------------------------------------------
export interface SlideMeta {
  id: SlideId;
  chapter: string;
  variant: "light" | "tint" | "dark";
  bg: BgParams;
}

// ---------------------------------------------------------------------------
// V2Content
// ---------------------------------------------------------------------------
export interface V2Content {
  welcome: {
    kicker: string;
    title: string;
    subtitle: string;
  };

  dimensions: Array<{
    key: "risk" | "founder" | "nerd";
    label: string;
    accent: string;
    summary: string;
    details: string[];
  }>;

  failfast: {
    kicker: string;
    headline: string;
    body: string;
    beats: string[];
  };

  caseOverview: {
    kicker: string;
    headline: string;
    docs: Array<{
      title: string;
      note: string;
    }>;
  };

  sec1: {
    questions: {
      kicker: string;
      q1: string;
      q2: string;
    };
    assumptions: Array<{
      n: number;
      label: string;
      body: string;
    }>;
    teams: Array<{
      team: string;
      category: string;
      cls: string;
      note: string;
      tags: { apply: string; upside: string; downside: string };
    }>;
    verdict: {
      lead: {
        team: string;
        goal: string;
        work: string;
        apply: string;
        upside: string;
        downside: string;
      };
      hold: {
        team: string;
        goal: string;
        work: string;
        apply: string;
        upside: string;
        downside: string;
      };
      disclaimer: string;
    };
    reframe: {
      setup: string;
      bigQuestion: string;
      moves: string[];
      enabler: string;
      caution: string;
    };
  };

  sec2: {
    intro: { kicker: string; tested: string; brief: string; questions: string[] };
    assumptions: {
      eyebrow: string;
      title: string;
      lead: string;
      contradictions: string[];
      undefinedTerms: string[];
      ambiguities: string[];
      working: Array<{ id: string; body: string }>;
    };
    q1: {
      eyebrow: string;
      title: string;
      goal: string;
      week1: string[];
      stakeholders: Array<{ who: string; need: string }>;
      week2: string[];
      done: Array<{ phase: string; body: string }>;
    };
    q2: {
      eyebrow: string;
      title: string;
      lead: string;
      tech: Array<{ risk: string; inherent: string; control: string; residual: string }>;
      human: Array<{ risk: string; control: string }>;
    };
    q3: {
      eyebrow: string;
      title: string;
      thesis: string;
      stages: Array<{ id: string; title: string; caption: string }>;
      legend: Array<{ cls: AutoClass; label: string }>;
      principle: string;
    };
    q4a: {
      eyebrow: string; title: string;
      principle: string;
      tools: Array<{ tool: string; role: string; why: string }>;
      connect: { headline: string; body: string; assumptions: string[] };
    };
    q4b: {
      eyebrow: string; title: string; intro: string;
      steps: Array<{ n: number; title: string; body: string; engine: string; mode: "auto" | "human" }>;
      exception: { title: string; body: string };
      principle: string;
    };
    q5: {
      eyebrow: string;
      title: string;
      lead: string;
      steps: Array<{ n: number; title: string; body: string }>;
      avoid: string[];
    };
    q6: {
      eyebrow: string;
      title: string;
      lead: string;
      areas: Array<{ title: string; body: string; close: string }>;
      method: string;
    };
  };

  sec3: {
    questions: { kicker: string; testing: string; prepare: string; items: string[] };
    q1: { eyebrow: string; title: string; lead: string;
          signals: Array<{ signal: string; why: string }>;
          notWhen: Array<{ dont: string; instead: string }>; synthesis: string };
    q2: { eyebrow: string; title: string; whatsDifferent: string;
          compare: Array<{ dim: string; direct: string; mcp: string }>;
          examples: Array<{ scenario: string; winner: "Direct API" | "MCP"; why: string }>;
          honest: string };
    q3: { eyebrow: string; title: string; bet: string; aside: string;
          real: string[]; hype: string[]; heading: string[] };
    q4a: { eyebrow: string; title: string; preamble: string;
           regs: Array<{ reg: string; requirement: string; example: string }>;
           risks: Array<{ risk: string; why: string }> };
    q4b: { eyebrow: string; title: string; intro: string;
           design: Array<{ label: string; body: string }>;
           tradeoffs: string[]; principle: string };
  };

  closing: {
    headline: string;
    body: string;
    cta: {
      label: string;
      href: string;
    };
  };
}

// ---------------------------------------------------------------------------
// slideManifest — 14 entries, one per SlideId in declaration order
// ---------------------------------------------------------------------------
export const slideManifest: SlideMeta[] = [
  {
    id: "welcome",
    chapter: "Welcome",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.45 },
  },
  {
    id: "dim-risk",
    chapter: "Why me",
    variant: "tint",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.7 },
  },
  {
    id: "dim-founder",
    chapter: "Why me",
    variant: "tint",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.65 },
  },
  {
    id: "dim-nerd",
    chapter: "Why me",
    variant: "tint",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.6 },
  },
  {
    id: "failfast",
    chapter: "Fail fast",
    variant: "dark",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.85 },
  },
  {
    id: "case-overview",
    chapter: "Case study",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.3 },
  },
  {
    id: "sec1-questions",
    chapter: "Section I",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.25 },
  },
  {
    id: "sec1-assumptions",
    chapter: "Section I",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.25 },
  },
  {
    id: "sec1-verdict",
    chapter: "Section I",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.28 },
  },
  {
    id: "sec1-teams",
    chapter: "Section I",
    variant: "tint",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.55 },
  },
  {
    id: "sec1-reframe",
    chapter: "Section I",
    variant: "tint",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.6 },
  },
  {
    id: "sec2-questions",
    chapter: "Section II",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.2 },
  },
  {
    id: "sec2-assumptions",
    chapter: "Section II",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.22 },
  },
  {
    id: "sec2-q1",
    chapter: "Section II",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.24 },
  },
  {
    id: "sec2-q2",
    chapter: "Section II",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.26 },
  },
  {
    id: "sec2-q3",
    chapter: "Section II",
    variant: "tint",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.35 },
  },
  {
    id: "sec2-q4a",
    chapter: "Section II",
    variant: "dark",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.75 },
  },
  {
    id: "sec2-q4b",
    chapter: "Section II",
    variant: "tint",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.55 },
  },
  {
    id: "sec2-q5",
    chapter: "Section II",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.26 },
  },
  {
    id: "sec2-q6",
    chapter: "Section II",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.28 },
  },
  {
    id: "sec3-questions",
    chapter: "Section III",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.25 },
  },
  {
    id: "sec3-q1",
    chapter: "Section III",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.2 },
  },
  {
    id: "sec3-q2",
    chapter: "Section III",
    variant: "tint",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.55 },
  },
  {
    id: "sec3-q3",
    chapter: "Section III",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.25 },
  },
  {
    id: "sec3-q4a",
    chapter: "Section III",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.28 },
  },
  {
    id: "sec3-q4b",
    chapter: "Section III",
    variant: "tint",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.6 },
  },
  {
    id: "closing",
    chapter: "Closing",
    variant: "dark",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 1.0 },
  },
];

// ---------------------------------------------------------------------------
// v2Content — skeleton strings; phases 04/05/06 fill real copy
// ---------------------------------------------------------------------------
export const v2Content: V2Content = {
  welcome: {
    kicker: "Applied AI",
    title: "Francesco Villani",
    subtitle: "Finance depth, builder mindset, shipped products — applied to AI enablement.",
  },

  dimensions: [
    {
      key: "risk",
      label: "Risk Banker",
      accent: "#4f5bff",
      summary: "Deep finance & risk expertise across liquidity, market risk, and regulatory compliance.",
      details: [
        "Liquidity & market risk modelling at regulated institutions (ECB, BaFin frameworks).",
        "FP&A and quant/behavioral model design — from data to decision.",
        "MiFID II, AML, and compliance workflows built and owned end-to-end.",
        "Trade Republic and multi-org freelance exposure across the FinTech stack.",
      ],
    },
    {
      key: "founder",
      label: "Founder",
      accent: "#ff7a59",
      summary: "Ownership mentality — defines the problem, ships the solution, iterates fast.",
      details: [
        "Operates independently across multiple clients and orgs simultaneously.",
        "Scopes, builds, and delivers end-to-end — no hand-holding required.",
        "Treats every engagement as a product: clear goals, measurable outcomes.",
      ],
    },
    {
      key: "nerd",
      label: "Engineer at heart",
      accent: "#27c4a6",
      summary: "Hands-on across the full stack — data pipelines to web UIs to workflow automation.",
      details: [
        "Production Python, SQL, dbt, Airflow, Snowflake — data infrastructure that runs.",
        "n8n automations and AI workflow integrations shipped and maintained.",
        "Growing TypeScript/React/Node.js — this deck is a Next.js app, built by me.",
      ],
    },
  ],

  failfast: {
    kicker: "How I work",
    headline: "Fail fast — solve faster.",
    body: "Cheap experiments beat lengthy planning. I bias toward shipping a rough answer, learning from it, and iterating — cutting the cost of being wrong by finding out sooner.",
    beats: [
      "Define the smallest testable question.",
      "Ship a rough version in hours, not weeks.",
      "Measure what broke — not what you hoped for.",
      "Iterate or kill — no attachment to the first cut.",
      "Repeat until the real problem is solved.",
    ],
  },

  caseOverview: {
    kicker: "The brief",
    headline: "Three documents, one question: where does AI actually move the needle?",
    docs: [
      { title: "Case Task I — Intro Deck", note: "Upvest's business model, team descriptions, and the AI opportunity mapping questions." },
      { title: "Case Task II — Process Optimization", note: "A deep-dive into a specific operational process — target for efficiency gains." },
      { title: "Workshop Instruction", note: "Format, expectations, and how the session will run." },
    ],
  },

  sec1: {
    questions: {
      kicker: "Section I — AI Opportunity Mapping",
      q1: "Based on the team descriptions, which function has the highest AI upside — and why? What makes this team a strong candidate, and what would 'meaningful impact' look like?",
      q2: "Where would you deliberately not prioritise AI at this stage — and why?",
    },

    assumptions: [
      {
        n: 1,
        label: "What does 'AI' actually mean here?",
        body: "It's a spectrum — reinforcement learning, classic ML, LLMs, n8n/agentic pipelines, MCP-connected tools. Match the AI type to the task; not every problem is a GenAI problem.",
      },
      {
        n: 2,
        label: "What does 'upside' / 'meaningful impact' mean?",
        body: "I focus on the optimisation lens: cut manual, repetitive work and cost. 'Meaningful' = measurable — lower manual handling time, faster turnaround, capacity that scales without headcount. Revenue growth is real but harder to attribute, so I hold it aside.",
      },
      {
        n: 3,
        label: "What makes something not worth prioritising?",
        body: "Four filters: complexity, cost-vs-upside, irreducible human judgment, and risk. Risk has two sharp edges — EU AI Act high-risk constraints, and core-engine risk: no probabilistic AI in the deterministic settlement/custody money-path.",
      },
    ],

    teams: [
      {
        team: "Engineering",
        category: "Build (the platform)",
        cls: "Now",
        note: "Coding copilots + agentic pipelines lift output per engineer. Adoption is organic — devs pick up AI tooling themselves.",
        tags: {
          apply: "Coding copilots · agentic PRs · test gen",
          upside: "Output per engineer · self-adopting",
          downside: "Lifts output > removes volume · core-path guardrails",
        },
      },
      {
        team: "Client Impact",
        category: "Run (post-sale partners)",
        cls: "Now",
        note: "B2B support deflection, integration troubleshooting assist, auto-drafted account summaries free AMs for relationship work.",
        tags: {
          apply: "Support copilot · ticket deflection",
          upside: "Faster integration · AMs freed",
          downside: "Bespoke issues still need engineers",
        },
      },
      {
        team: "Product",
        category: "Build (what to build)",
        cls: "Next",
        note: "Faster discovery via feedback clustering and research synthesis. Prioritisation stays judgment-heavy — AI informs, doesn't decide.",
        tags: {
          apply: "Feedback clustering · PRD drafting",
          upside: "Faster discovery → decision",
          downside: "Prioritisation stays human",
        },
      },
      {
        team: "Finance",
        category: "Control (numbers)",
        cls: "Next",
        note: "Recurring reporting narratives automated; faster close and FP&A analysis. Figures stay deterministic — AI drafts the narrative, not the numbers.",
        tags: {
          apply: "Reporting narratives · forecasting support",
          upside: "Faster close & analysis",
          downside: "Figures stay deterministic",
        },
      },
      {
        team: "Growth",
        category: "Sell",
        cls: "Next",
        note: "Lead/account research, market-trend synthesis, outreach drafting. Relationships and negotiation stay human.",
        tags: {
          apply: "Lead research · outreach drafting",
          upside: "More selling time · sharper targeting",
          downside: "Relationships stay human · brand risk",
        },
      },
      {
        team: "Security & TechOps",
        category: "Run (internal infra)",
        cls: "Next",
        note: "Anomaly/threat detection, log triage, internal IT assistant. Already highly automated — gains are incremental; security decisions need human sign-off.",
        tags: {
          apply: "Anomaly detection · log triage",
          upside: "Faster detection · self-serve IT",
          downside: "Already automated · human sign-off",
        },
      },
      {
        team: "Banking",
        category: "Control (risk, compliance, legal)",
        cls: "Next",
        note: "AML alert triage and KYC document extraction are volume-heavy and structured. Final compliance/risk/legal decisions must stay human and auditable.",
        tags: {
          apply: "AML/KYC triage · doc extraction",
          upside: "High — volume-heavy & structured",
          downside: "Final decision stays human & auditable",
        },
      },
      {
        team: "Strategy & Org",
        category: "Thinking / coordination",
        cls: "Later",
        note: "Individual assistants help with research and deck prep, but work is ad-hoc and judgment-heavy — not a priority investment target.",
        tags: {
          apply: "Personal assistants · research synthesis",
          upside: "Less prep work · deck speed",
          downside: "Ad-hoc judgment — not a priority bet",
        },
      },
    ],

    verdict: {
      lead: {
        team: "Operations",
        goal: "Run the trade lifecycle and client operations seamlessly.",
        work: "High-volume processing, exception handling, reconciliation, corporate-action processing, support.",
        apply: "LLM document extraction · break/exception triage · ticket classification + drafted replies · agentic routine ops.",
        upside: "The largest pool of repetitive, structured, high-volume work in the company — and gains compound with end-user growth, so capacity scales without linear headcount.",
        downside: "The money-path stays deterministic: AI does triage, extraction and drafting; rules and humans still own the actual booking and settlement decision.",
      },
      hold: {
        team: "People",
        goal: "Make Upvest a place where everyone does their best work.",
        work: "Recruiting, people ops, L&D, culture — high-touch, judgment-heavy, relatively low volume.",
        apply: "Narrow, safe scope only — scheduling, JD drafting, HR knowledge-base Q&A.",
        upside: "Modest admin savings only — the work is low-volume and high-touch by nature.",
        downside: "Lowest transaction volume; outcomes hinge on human judgment and empathy; the EU AI Act classifies recruitment/employment AI as high-risk; and it's the team that embodies the culture you'd be automating.",
      },
      disclaimer:
        "Context: Upvest already automates 99%+ of its middle- and back-office (per the upvest.co homepage). 'Highest upside' here means the manual, human-handled remainder — the exceptions and edge cases — not the already-automated deterministic core.",
    },

    reframe: {
      setup: "I answered the question as asked — Operations is where I'd lead. But that's a local, top-down question: it optimises one function. The bigger win is bottom-up — every function finding where AI helps its own work, all at once.",
      bigQuestion: "How does Upvest capture the most AI upside as a company, in the shortest time?",
      moves: [
        "Shared AI infrastructure — one secure, governed layer every team builds on.",
        "Integrations — AI wired into the tools and data people already use, not a side toy.",
        "AI literacy + playbooks — every function learns to spot where AI helps their highest-leverage work.",
      ],
      enabler: "Engineering is the enabler that builds the shared layer; every other function compounds on top. Operations being the 'winner' and Engineering being the 'multiplier' aren't in conflict — one is the highest direct upside, the other is the multiplier.",
      caution: "Throwing €20,000 of tokens at people might not bring the results hoped for: with low AI literacy and resources suddenly abundant, people tend to throw AI at a problem rather than actually optimise it.",
    },
  },

  sec2: {
    intro: {
      kicker: "Section II — Process Optimization (WINX)",
      tested: "Structured thinking, process analysis, stakeholder judgment, self-awareness — how I'd approach a real implementation.",
      brief: "WINX: Incoming Securities Transfers — a manual, repetitive Ops process. Treated as a real project I've been handed.",
      questions: [
        "Project setup — what would I do in the first two weeks to set this up for success?",
        "Risk assessment — key risks to delivery, technical and human, and how I'd mitigate them.",
        "Process mapping — where AI adds value, what I'd automate, and what I would not, and why.",
        "Solution design — the solution I'd build, the tools, how they connect, end-to-end.",
        "Rollout plan — how I'd take the owning team from skeptical to actually using it.",
        "Personal development — the two or three areas I'd need to upskill to run this independently.",
      ],
    },

    assumptions: {
      eyebrow: "Reading the brief end-to-end",
      title: "The brief can't be taken at face value",
      lead: "I read the process brief line by line. It's internally contradictory, leans on undefined terms, and inverts directionality. The full register is 28 issues + 13 assumptions — condensed here.",
      contradictions: [
        "Non-EEA transfers \"not supported\" (Overview) vs. \"contact AML whether we can accept\" (Controls §III).",
        "Baader Bank is used throughout but never introduced.",
        "Commerzbank appears in both the BNP and the email channels.",
      ],
      undefinedTerms: [
        "WINX, TOL, pre-advice, DEAG/REAG, SSI address book, MT548, Webzos, CPB.",
        "4EP vs 4EC — same step, two labels?",
        "\"Google scripts\" with cells → actually Colab/Jupyter, not Apps Script.",
      ],
      ambiguities: [
        "ISIN missing vs inactive conflated; no rule for arrivals after the 15:00 cutoff.",
        "Name-match tolerance unspecified (Müller vs Mueller).",
        "\"Destination within EEA\" inverts direction — this is incoming, origin is what matters.",
        "API path appears to skip the authenticity check; user lookup is \"Looker\" then \"Ops Panel\".",
      ],
      working: [
        { id: "A3", body: "Non-EEA transfers are conditionally permitted after AML pre-clearance, not categorically blocked." },
        { id: "A4", body: "Baader Bank = Scalable Capital's executing/custody arm, not a separate counterparty; pre-advice is Baader-specific." },
        { id: "A5", body: "API flow is N26 → Upvest (request), then Upvest → counterparty (confirmation) — two channels, not one." },
        { id: "A6", body: "4EP and 4EC are the same dual-control step (queue vs. act of checking)." },
        { id: "A8", body: "The \"Google scripts\" are Colab/Jupyter notebooks (cell-based)." },
        { id: "A9", body: "Volume ≈ 10–100 transfers/day today (N26 only); scales to several hundred/day as clients onboard." },
        { id: "A10", body: "CBO detected → reject + escalate to Banking/AML (NCBO-only scope)." },
        { id: "A13", body: "Current automation baseline ≈ zero beyond the notebooks; every other step is human." },
      ],
    },

    q1: {
      eyebrow: "Q1 — Project setup",
      title: "First two weeks",
      goal: "By end of week 2, have the facts straight enough to independently define a first solution — the process as it really runs (not as documented), a validated stakeholder map, and a baseline of effort and error rates.",
      week1: [
        "Shadow Ops 2–3 days — watch 5–10 transfers per channel, note every tool switch and edge case. Stopwatch on.",
        "Get all accesses and run the steps myself end-to-end, including one exception.",
        "Examine every repo / service / sheet / notebook in the chain for hidden logic.",
        "Resolve the §1 inconsistencies with the process owner — 28 issues become a structured open-questions list.",
      ],
      stakeholders: [
        { who: "Ops lead + operators", need: "Ground truth, edge cases — the skeptic-turned-expert" },
        { who: "Banking (Risk/AML/Legal)", need: "Regulatory posture in writing; 4-eyes & AML interpretation" },
        { who: "Brokerage", need: "ISIN onboarding workflow + SLA (15:00/17:00 cutoffs)" },
        { who: "Client Experience", need: "Name-match failure escalation contract" },
        { who: "Engineering", need: "N26 API access, availability, ownership" },
        { who: "Security & TechOps", need: "Auth + audit model, gateway placement" },
        { who: "Tax workflow owner (CPB)", need: "Step 4 tax handoff process" },
        { who: "BNP custody owner", need: "Allegement-feed stability / change notice" },
      ],
      week2: [
        "Confirm the full process step-by-step; map each system: owner, access, API availability, alternatives.",
        "Quantify the baseline: transfers/day per channel, % straight-through, time per step, error/rework rate.",
        "Run a pre-mortem (Ops + Banking + Eng): \"it's six months out and the project failed — what killed it?\"",
        "Confirm regulatory posture with Banking in writing (AI Act class, EBA outsourcing) before locking architecture.",
      ],
      done: [
        { phase: "Phase 1", body: "≥80% of straight-through transfers per channel pre-processed; 4EC stays human; full audit trail; no increase in error rate." },
        { phase: "Phase 2", body: "Edge cases automated with human review (pre-advice wait, ISIN onboarding, fuzzy name match); daily Ops time cut ~50%." },
        { phase: "Phase 3", body: "Absorb a 2–3× volume increase with no extra headcount; same error rate or better." },
        { phase: "Project", body: "Scales to 5+ clients without proportional headcount; regulator-presentable audit trail; Ops prefers working with it; no critical-path step fully autonomous; code + runbooks co-owned." },
      ],
    },

    q2: {
      eyebrow: "Q2 — Risk assessment",
      title: "Framed as an RCSA",
      lead: "Inherent risk → key control → residual. The recurring control that keeps residual acceptable across the board: the 4-eyes check stays human and AI only ever proposes.",
      tech: [
        { risk: "Email-parsing fragility — CP formats change, encrypted PDFs, subject tweaks", inherent: "H×H", control: "Versioned parsers; strict output schema + confidence threshold; fail → human queue; weekly drift report", residual: "Low" },
        { risk: "Extraction error on quantity/ISIN — wrong number = real money error", inherent: "M×Critical", control: "Proposes, never decides; deterministic re-validation must match source verbatim; 4EC always sees the source artifact", residual: "Low" },
        { risk: "Orchestration brittleness — workflows break silently on schema change", inherent: "M×H", control: "Per-node error monitoring + alerting; integration tests on every change", residual: "Low" },
        { risk: "Access scoping / data residency / audit gaps", inherent: "M×Critical", control: "Per-user OAuth (no god-mode); EU-residency + PII redaction at the gateway; immutable logging ≥7y", residual: "Low" },
        { risk: "Settlement-break detection miss", inherent: "L×H", control: "Independent reconciliation of 4EC submissions vs settled instructions at T+3; daily Ops review", residual: "Low" },
      ],
      human: [
        { risk: "Ops feels threatened (\"you're automating my job\")", control: "Co-design from day 1; frame as removing toil; role evolves to supervisor + exception-handler; Ops owns the metrics" },
        { risk: "4-eyes erosion — operator rubber-stamps", control: "Periodic \"ghost transfers\" (deliberate error — does 4EC catch it?); rotate reviewers; KPI on reject rate (must be non-zero)" },
        { risk: "Regulatory pushback — autonomous AI in a money path", control: "Banking in week 1; document AI Act + EBA class before building; assistive-only by default" },
        { risk: "Silent process drift — CP changes format, ops fixes manually", control: "Make exceptions visible (parse-failure Slack channel); periodic \"what's the automation missed?\" retros" },
        { risk: "Bus factor / weak post-launch ownership", control: "Co-ownership Eng + Ops from week 1; runbooks; RACI; quarterly review owned by Ops lead" },
        { risk: "Scope creep", control: "Crisp Phase 1/2/3 scope; parking lot for everything else; Ops lead gatekeeps additions" },
      ],
    },

    q3: {
      eyebrow: "Q3 — Process mapping",
      title: "Where AI adds value — and where it deliberately doesn't",
      thesis: "This pipeline uses no LLM at all. It handles customer PII and moves customer securities, so every step is deterministic, reproducible, and auditable as logic. The value is deterministic automation of the repetitive plumbing across ~8 surfaces. Where you'd be tempted to reach for an LLM — unstructured emails, fuzzy name matching — use deterministic methods or route to a human.",
      stages: [
        { id: "overview", title: "One transfer, ~8 surfaces", caption: "One incoming transfer makes a human bounce across ~8 systems — Ops Panel, Looker, two mailboxes, sheets, drives, Webzos, Colab, Slack." },
        { id: "automate", title: "Deterministic automation", caption: "n8n + Python automate the repetitive plumbing — ingest, parse, validate, assemble, monitor — every automated step is reproducible logic." },
        { id: "human", title: "Humans decide", caption: "The gates stay human: 4EC dual control, AML, CBO edge cases, customer-facing rejections, settlement breaks, ISIN onboarding, tax sign-off." },
        { id: "summary", title: "No LLM — humans decide", caption: "Where you'd reach for an LLM — unstructured email, fuzzy name match — use deterministic methods or route to a human. No model in the live path." },
      ],
      legend: [
        { cls: "auto", label: "Deterministic / automated" },
        { cls: "human", label: "Human decision" },
        { cls: "mixed", label: "Branch — partly both" },
      ],
      principle: "Deterministic systems orchestrate; humans decide — no LLM. n8n handles the plumbing; Python handles the structured transforms; everything automated is reproducible logic; 4EC and AML stay human. Anything that can't be made deterministic goes to a person, not a model.",
    },

    q4a: {
      eyebrow: "Q4 · Solution design",
      title: "Solution architecture & how it connects",
      principle: "Fully deterministic pipeline — no LLM. Handles customer PII and moves customer securities; every automated step is reproducible logic, auditable as such.",
      tools: [
        { tool: "n8n (self-hosted, EU)", role: "Orchestration", why: "Visual = readable by Ops; programmable for edge cases; self-hostable on Upvest infra; native nodes for Gmail, Sheets, HTTP, Slack." },
        { tool: "Python services", role: "TRD generation, complex parsers", why: "Replaces the Colab/Apps-Script kludge with a proper service — testable, deployable, version-controlled." },
        { tool: "Direct API integration (n8n HTTP nodes)", role: "Read/write Looker, Ops Panel, Google Sheets, BNP feed", why: "Single deterministic consumer, no LLM — direct API beats MCP here. MCP + model gateway stay reserved for LLM-based use cases." },
        { tool: "Existing Ops Panel", role: "4EC dashboard, submission", why: "Unchanged — automation submits drafts, humans approve in the existing tool." },
        { tool: "Slack", role: "Exception notifications + CPB handoff", why: "Already where Ops live; preserve continuity." },
        { tool: "Centralized log store (Datadog/Loki/SIEM)", role: "Audit trail", why: "One place to reconstruct any transfer end-to-end." },
      ],
      connect: {
        headline: "Direct API integration — not MCP",
        body: "This pipeline has a single deterministic consumer with no LLM in the path — so fan-out = 1 and MCP buys nothing. Direct API integration via n8n HTTP nodes is simpler, faster, and fully auditable. MCP + a model gateway stay reserved for Upvest's LLM-based use cases (Section III's rule).",
        assumptions: [
          "Ops Panel exposes a callable API — or Engineering exposes thin endpoints for the automation to call.",
          "Looker, Google Sheets, Slack, and N26 APIs are accessible from Upvest infra.",
          "BNP allegement feed format is stable (structured mailbox; IMAP/Gmail access confirmed).",
        ],
      },
    },

    q4b: {
      eyebrow: "Q4 · Solution design",
      title: "End-to-end automated workflow",
      intro: "Scenario 2 (BNP allegement) — the highest-volume, most manual flow. Every step is deterministic; humans appear only where judgment is required.",
      steps: [
        { n: 1, title: "Pull allegements", body: "Workflow B fires every 4h, pulls BNP-mailbox emails matching `UPVEST ALLEGEMENTS LC`. Deterministic parser extracts per allegement: ISIN, quantity, account, counterparty.", engine: "n8n · IMAP + Python parser", mode: "auto" },
        { n: 2, title: "User lookup", body: "n8n queries Ops Panel by account+name. If ambiguous: normalized fuzzy search in Looker (diacritics/case/ordering). Still ambiguous → exception queue (Slack) for a human.", engine: "n8n → Ops Panel · Looker", mode: "auto" },
        { n: 3, title: "ISIN validation", body: "n8n queries Looker: both active → continue. ISIN missing in N26 → onboarding sheet + Brokerage queue (17:00 SLA). Inactive → templated rejection, human reviews & sends.", engine: "n8n → Looker · Sheets", mode: "auto" },
        { n: 4, title: "AML check", body: "Non-EEA origin → structured request to AML queue with full context → wait for approval before proceeding.", engine: "n8n → AML queue · human gate", mode: "human" },
        { n: 5, title: "CBO check", body: "Deterministic check on allegement metadata. Indicated → reject. Absent + allegement channel → post confirmation request to the counterparty.", engine: "n8n · rules engine", mode: "auto" },
        { n: 6, title: "Draft FOP + submit to 4EC", body: "Deterministic node fills fields A–H from validated inputs + SSI lookup. Ops Panel API creates the draft; operator sees it pre-filled with a context card (source allegement, lookup proofs, AML status, highlighted fields).", engine: "n8n → Ops Panel API", mode: "auto" },
        { n: 7, title: "Human 4EC approval", body: "Operator approves → sent to market via Ops Panel. No model in this step.", engine: "Human · Ops Panel 4EC", mode: "human" },
        { n: 8, title: "Settlement polling", body: "Workflow E polls settlement status. `settled` → Workflow F. `client_resolution_required` / `processing` → templated discrepancy summary (from MT548 fields) + exception queue.", engine: "n8n · MT548 poll", mode: "auto" },
        { n: 9, title: "TRD + audit log", body: "Workflow F: Python generates TRD, uploads to shared drive, posts to `ext-transfers-cpb` Slack, waits for CPB confirmation. Every step records workflow ID, step, input, output, user identity, timestamp.", engine: "Python service + n8n", mode: "auto" },
      ],
      exception: {
        title: "What an exception looks like",
        body: "Operator opens the same 4EC dashboard — sees a pre-filled draft with per-field validation flags and a source panel (original allegement + lookup proofs). Each field is source-cited to where it was parsed. Exceptions surface in Slack with a one-click 'claim this' to the same dashboard. Same kind of work as today — just much less of it.",
      },
      principle: "Deterministic code handles the plumbing; humans handle judgment. Nothing in the automated path is explainable only as 'the model decided.'",
    },

    q5: {
      eyebrow: "Q5 — Rollout plan",
      title: "From skeptical to using it",
      lead: "Skepticism usually comes from a lack of understanding. The framing isn't \"we're automating your job\" — it's \"we remove the part of your work you hate.\" That has to be earned, not declared.",
      steps: [
        { n: 1, title: "Earn credibility", body: "Shadow first, then present their own process back — better than they expected, including the inconsistencies I had to clarify." },
        { n: 2, title: "Make them owners", body: "Co-design workshop (Ops + Banking + Eng): Ops picks what gets automated first (the BNP loop); Ops owns the KPI; the skeptic becomes the named domain expert." },
        { n: 3, title: "Shadow mode", body: "Automation runs without submitting; for every manual transfer it drafts in parallel. Daily diff: \"what it would have done vs. what you did.\"" },
        { n: 4, title: "Enable in stages", body: "Pilot on a narrow slice; pre-filled drafts in the existing dashboard. Hard rules up front: 4EC stays human; Ops can pause a CP with one Slack command; Ops lead has veto." },
        { n: 5, title: "Walkthrough + guidance", body: "Daily Slack standup for the first 2 weeks, builder on call. Each CP follows shadow → pilot → production, compressed." },
        { n: 6, title: "Follow-up support", body: "Quarterly review: which steps still need humans, which can be safely tightened." },
      ],
      avoid: [
        "A glossy launch deck — earn it bottom-up; the all-hands happens after they're already using it daily.",
        "\"AI-first\" messaging — the pitch is \"remove toil\"; the AI is implementation detail.",
        "Hidden metrics — Ops sees every dashboard the project lead sees.",
      ],
    },

    q6: {
      eyebrow: "Q6 — Personal development",
      title: "Where I'd need to upskill",
      lead: "My real value isn't knowledge — it's a forma mentis: how to approach a problem, an intuition for what's practical, the supervisor's skepticism to seek the truth. For this project I'd sharpen three areas to their specifics.",
      areas: [
        { title: "Securities-operations depth", body: "SWIFT MT54x family, the CSD layer (CBF/CBL), German tax-transfer mechanics (Taxbox, Anschaffungsdaten), pre-advice conventions, settlement-cycle edge cases (T+1), how Baader/Scalable/IBKR differ.", close: "2–3 weeks shadowing edge cases; ICMA/ISSA/ESMA T+1 papers; a senior Banking mentor; handle real transfers including an exception." },
        { title: "Production-grade AI engineering", body: "Agent evaluation + red-teaming (golden sets, prompt-injection, CI); LLM observability (Langfuse/Phoenix); production MCP servers (per-user OAuth, schema versioning); model-gateway design; structured-output enforcement.", close: "Pair with a senior Eng on the substrate; build a non-prod WINX prototype first to surface unknowns cheaply; ~2h/week reading." },
        { title: "Regulatory architecture for AI", body: "EBA outsourcing-register mechanics, DORA ICT concentration risk, EU AI Act conformity assessments, model-risk management (ECB TRIM, PRA SS1/23), MaRisk AT 7.2 / BAIT applied to AI.", close: "Embed with Banking/Compliance early as a collaborator; read primary BaFin/EBA sources; build a peer network; keep a regulatory delta log." },
      ],
      method: "Dive into all the material I can, form my own opinion and plan first, then take it to colleagues and experts for validation — minimizing dependence on others to the necessary minimum. Independence is the month 6–9 destination, not the starting condition.",
    },
  },

  sec3: {
    questions: {
      kicker: "Section III — MCP Use Cases",
      testing: "Technical architecture thinking, depth, and real-world tradeoffs in a regulated environment.",
      prepare: "You're joining a company with multiple internal APIs — customer data, compliance logs, transaction history, support tickets, internal knowledge base — operating in a regulated, data-sensitive environment. Goal: make internal teams AI-enabled without creating compliance or security risks.",
      items: [
        "When are MCPs the right tool? Walk us through the conditions under which you'd reach for an MCP — what signals tell you it's the right architectural choice?",
        "MCP vs. direct API integration: Where does one beat the other? Give us a concrete example of when you'd choose each.",
        "MCPs: hype or here to stay? Are they an efficient abstraction or an added layer of complexity? What's your honest view on where the technology is heading?",
        "Security & compliance in a regulated environment: Upvest is BaFin and FCA regulated. When building an MCP layer that touches customer data, compliance logs, and transaction history — where do the real risks sit? How do you design for data sensitivity, access controls, and auditability from the start, and where have regulated environments forced you to make tradeoffs you wouldn't otherwise make?",
      ],
    },

    q1: {
      eyebrow: "Section III · Q1",
      title: "When are MCPs the right tool?",
      lead: "The single strongest signal is fan-out — every other signal is a variation on 'integrating this once, centrally, costs less than integrating it N times.'",
      signals: [
        { signal: "Fan-out — multiple consumers, same source", why: "Scales O(consumers + sources), not O(consumers × sources)" },
        { signal: "You want to decouple agents from models", why: "Swap Claude → internal model without touching integrations (DORA concentration-risk)" },
        { signal: "One enforcement point for auth, audit, policy", why: "Essential in a BaFin/FCA shop where every data touch must be auditable" },
        { signal: "Plugging into off-the-shelf AI surfaces", why: "Claude Code, Cursor, enterprise Claude/ChatGPT all speak MCP" },
        { signal: "The tool surface is large or changing", why: "Capability discovery is in-protocol — agents see new tools, no code change" },
        { signal: "You're building a platform, not one use case", why: "The MCP registry becomes the substrate interface many teams build on" },
      ],
      notWhen: [
        { dont: "Single agent, single API, stable contract", instead: "Direct SDK call — MCP buys nothing" },
        { dont: "Hot path / latency-critical (sub-100ms)", instead: "Direct call — skip the protocol hop" },
        { dont: "Streaming / event-driven workloads", instead: "Websockets / Kafka — MCP is request/response shaped" },
        { dont: "Exotic auth flows hosts don't support yet", instead: "Direct, until the host ecosystem catches up" },
      ],
      synthesis: "Default to MCP once fan-out > 1; default to direct otherwise.",
    },

    q2: {
      eyebrow: "Section III · Q2",
      title: "MCP vs. direct API",
      whatsDifferent: "A direct API integration is bespoke client code: one consumer, one source, hand-wired. An MCP server is a standard adapter any MCP-speaking client can discover and call without custom code. Same underlying API — different number of times you integrate it.",
      compare: [
        { dim: "Integration model", direct: "Custom client per consumer × source", mcp: "One server per source; any MCP client connects" },
        { dim: "Scaling cost", direct: "O(consumers × sources)", mcp: "O(consumers + sources)" },
        { dim: "Coupling", direct: "Agent coupled to both model and source", mcp: "Decouples agent/model from the source" },
        { dim: "Tool discovery", direct: "Hard-coded per integration", mcp: "Capability discovery in the protocol" },
        { dim: "Auth / audit / policy", direct: "Re-implemented in every integration", mcp: "Enforced once, at the server/gateway" },
        { dim: "Latency", direct: "Lowest — direct call", mcp: "Extra protocol hop + serialization" },
        { dim: "Sweet spot", direct: "Hot paths, single consumer, stable contract", mcp: "Shared/multi-consumer surfaces, changing tool sets" },
      ],
      examples: [
        {
          scenario: "Settlement-break monitor — one Python service on a cron, queries Looker, posts to Slack on a break",
          winner: "Direct API",
          why: "One consumer, one source, stable schema, latency matters, no human in the loop. No fan-out → MCP buys nothing.",
        },
        {
          scenario: "Ops Panel — queried by the WINX agent, a Client Impact support agent, a Compliance KYC reviewer, and an internal 'ask anything' assistant",
          winner: "MCP",
          why: "Four consumers, different prompts/hosts/teams. Build one server; auth + audit enforced once; a new consumer next quarter = zero server-side work.",
        },
      ],
      honest: "Most non-trivial deployments end up with both: MCP for shared/multi-consumer surfaces (Ops Panel, Looker, Confluence, knowledge base, Jira), direct integration for specialized hot paths (settlement monitors, anomaly detectors, in-app features). The decision rule is fan-out: if the data source will ever serve more than one AI consumer, default to MCP; otherwise default to direct.",
    },

    q3: {
      eyebrow: "Section III · Q3",
      title: "MCPs: hype or here to stay?",
      bet: "Bet on the standardization, not the label. The problem MCP solves — one standard way for AI to reach systems — is permanent. Whether MCP is the final form, I hold loosely.",
      aside: "I'm not deep enough in the protocol internals to call it the permanent solution — and I'd rather say so than fake conviction.",
      real: [
        "Solves a genuine M×N integration problem",
        "Multi-vendor adoption — bigger than any one host",
        "Pragmatic spec — implementable in a day",
      ],
      hype: [
        "Slapped onto thin wrappers that should be direct calls",
        "Host ecosystem still fragmented",
        "Security primitives uneven — not enterprise-ready yet",
      ],
      heading: [
        "2–3 years out: invisible infra, like REST",
        "Competition moves up: auth, audit, policy, discovery",
        "Enterprise/regulated MCP splits from consumer MCP",
      ],
    },

    q4a: {
      eyebrow: "Section III · Q4",
      title: "Security & compliance — where the risks sit",
      preamble: "Upvest is BaFin- and FCA-regulated. The AI Act, DORA, GDPR, EBA guidelines and MaRisk/BAIT all engage the moment an MCP layer touches customer data, compliance logs, or transaction history.",
      regs: [
        {
          reg: "GDPR",
          requirement: "Data minimisation, sub-processor control",
          example: "Customer name/account in a prompt = unredacted cross-border processing by a sub-processor",
        },
        {
          reg: "EU AI Act",
          requirement: "Risk-tiering, human oversight",
          example: "An agent acting on transfers via MCP tools needs oversight + logging",
        },
        {
          reg: "DORA",
          requirement: "ICT third-party & concentration risk",
          example: "Single LLM provider in the path; an outage stalls transfer processing",
        },
        {
          reg: "MaRisk / BAIT",
          requirement: "IT governance, vetted systems",
          example: "A community MCP server from GitHub in the tool path, touching compliance logs",
        },
        {
          reg: "MiFID II / BaFin",
          requirement: "Record-keeping, full auditability",
          example: "'Show every AI action on customer X over 12 months' — impossible without central logging",
        },
      ],
      risks: [
        { risk: "Prompt injection via tool outputs", why: "A server returns attacker-controlled text that hijacks the agent into exfiltrating data or moving a transfer." },
        { risk: "Over-privileged agents", why: "Servers default to a broad service account; an agent reads customer data the invoking user can't." },
        { risk: "Exfiltration to the model provider", why: "Any prompt with customer data leaves Upvest — GDPR sub-processing, DORA third-party risk." },
        { risk: "Supply-chain risk", why: "Community servers run as code in the tool path with broad access — unmanageable by default in a regulated firm." },
      ],
    },

    q4b: {
      eyebrow: "Section III · Q4",
      title: "Security & compliance — how I design for it",
      intro: "The fix isn't per-integration hardening — it's one governed gateway every agent and server goes through.",
      design: [
        { label: "Data sensitivity", body: "PII redaction at the gateway before any prompt leaves Upvest; EU-residency endpoints only; zero-retention DPAs; no consumer hosts with customer data." },
        { label: "Access controls", body: "Per-user OAuth so the agent inherits the user's RBAC — never god-mode service accounts; per-agent server scoping; no agent both reads PII and acts on external systems." },
        { label: "Auditability", body: "Log all MCP traffic centrally (prompt, response, tool calls, user, timestamp), immutable, ≥7y; every consequential action passes a rule-based gate or human approver." },
      ],
      tradeoffs: [
        "Redaction even when it hurts answer quality — I accept the loss",
        "Multi-provider even when one model is best — DORA concentration-risk forces a wired-in alternative",
        "No autonomous agents in money paths, even when MCP makes it trivial",
        "Slow onboarding — a 1-hour startup spike becomes a 1–2 week vetting + DPIA cycle",
      ],
      principle: "Treat the MCP layer as the regulatory perimeter. Build auth, redaction, audit and scoping once at the gateway; agents and servers consume it. That's what lets the rest of the org adopt AI safely.",
    },
  },

  closing: {
    headline: "Thanks for thinking through this with me.",
    body: "Questions, feedback, or want to discuss the thinking? I'm here.",
    cta: {
      label: "Get in touch",
      href: "mailto:fgv031@icloud.com",
    },
  },
};
