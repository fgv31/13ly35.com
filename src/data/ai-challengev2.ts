// ── ai-challengev2.ts ────────────────────────────────────────────────────────
// Pure data + types. No React, no runtime logic.
// Phase 04/05/06 agents fill string values; types are final here.

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
  | "sec1-teams"
  | "sec1-verdict"
  | "sec1-reframe"
  | "sec2-placeholder"
  | "sec3-questions"
  | "sec3-q2"
  | "sec3-q1"
  | "sec3-q3"
  | "sec3-q4"
  | "sec3-talking"
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
    }>;
    verdict: {
      lead: { team: string; body: string };
      hold: { team: string; body: string };
      now: string[];
      next: string[];
      later: string[];
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
    kicker: string;
    title: string;
    teaser: string;
    status: string;
  };

  sec3: {
    questions: { kicker: string; testing: string; prepare: string; items: string[] };
    q2: { headline: string; whatsDifferent: string;
          compare: Array<{ dim: string; direct: string; mcp: string }>;
          examples: Array<{ scenario: string; winner: "Direct API" | "MCP"; why: string }>;
          honest: string };
    q1: { headline: string; lead: string;
          signals: Array<{ signal: string; why: string }>;
          notWhen: Array<{ dont: string; instead: string }>; synthesis: string };
    q3: { headline: string; honestTake: string;
          real: string[]; hype: string[]; heading: string[]; bottomLine: string };
    q4: { headline: string; preamble: string;
          regs: Array<{ reg: string; requirement: string; example: string }>;
          risks: Array<{ risk: string; why: string }>;
          design: { sensitivity: string; access: string; audit: string };
          tradeoffs: string[]; principle: string };
    talking: { headline: string; points: string[] };
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
    variant: "dark",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.9 },
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
    id: "sec1-teams",
    chapter: "Section I",
    variant: "tint",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.55 },
  },
  {
    id: "sec1-verdict",
    chapter: "Section I",
    variant: "dark",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.8 },
  },
  {
    id: "sec1-reframe",
    chapter: "Section I",
    variant: "tint",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.6 },
  },
  {
    id: "sec2-placeholder",
    chapter: "Section II",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.2 },
  },
  {
    id: "sec3-questions",
    chapter: "Section III",
    variant: "light",
    bg: { tone: "light", accent: "#4f5bff", intensity: 0.25 },
  },
  {
    id: "sec3-q2",
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
    id: "sec3-q3",
    chapter: "Section III",
    variant: "tint",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.55 },
  },
  {
    id: "sec3-q4",
    chapter: "Section III",
    variant: "dark",
    bg: { tone: "dark", accent: "#4f5bff", intensity: 0.8 },
  },
  {
    id: "sec3-talking",
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
    kicker: "Applied AI · Upvest",
    title: "Why Francesco fits Upvest.",
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
      label: "Nerd Builder",
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
        team: "Operations",
        category: "Run (trade lifecycle)",
        cls: "Now",
        note: "Largest pool of repetitive, structured, high-volume work — doc extraction, exception triage, support drafting. Gains compound with end-user growth.",
      },
      {
        team: "Engineering",
        category: "Build (the platform)",
        cls: "Now",
        note: "Coding copilots + agentic pipelines lift output per engineer. Adoption is organic — devs pick up AI tooling themselves.",
      },
      {
        team: "Client Impact",
        category: "Run (post-sale partners)",
        cls: "Now",
        note: "B2B support deflection, integration troubleshooting assist, auto-drafted account summaries free AMs for relationship work.",
      },
      {
        team: "Product",
        category: "Build (what to build)",
        cls: "Next",
        note: "Faster discovery via feedback clustering and research synthesis. Prioritisation stays judgment-heavy — AI informs, doesn't decide.",
      },
      {
        team: "Finance",
        category: "Control (numbers)",
        cls: "Next",
        note: "Recurring reporting narratives automated; faster close and FP&A analysis. Figures stay deterministic — AI drafts the narrative, not the numbers.",
      },
      {
        team: "Growth",
        category: "Sell",
        cls: "Next",
        note: "Lead/account research, market-trend synthesis, outreach drafting. Relationships and negotiation stay human.",
      },
      {
        team: "Security & TechOps",
        category: "Run (internal infra)",
        cls: "Next",
        note: "Anomaly/threat detection, log triage, internal IT assistant. Already highly automated — gains are incremental; security decisions need human sign-off.",
      },
      {
        team: "Banking",
        category: "Control (risk, compliance, legal)",
        cls: "Next",
        note: "AML alert triage and KYC document extraction are volume-heavy and structured. Final compliance/risk/legal decisions must stay human and auditable.",
      },
      {
        team: "Strategy & Org",
        category: "Thinking / coordination",
        cls: "Later",
        note: "Individual assistants help with research and deck prep, but work is ad-hoc and judgment-heavy — not a priority investment target.",
      },
      {
        team: "People",
        category: "Human / culture",
        cls: "Later",
        note: "Low volume, high human-judgment content, EU AI Act high-risk for employment. Worst priority-adjusted return today — a deliberate risk call, not a value judgment.",
      },
    ],

    verdict: {
      lead: {
        team: "Operations",
        body: "Biggest pool of repetitive, structured, high-volume work; gains compound with end-user growth; clear measurable impact across corporate actions, reconciliation, and support. Risk stays manageable as long as the deterministic money-path stays rules- and human-owned.",
      },
      hold: {
        team: "People",
        body: "Lowest volume, highest human-judgment content, and highest regulatory/reputational downside — EU AI Act classifies recruitment and employment AI as high-risk. Worst priority-adjusted return today. A deliberate risk call, not a value judgment on the team.",
      },
      now: ["Operations", "Engineering", "Client Impact"],
      next: ["Product", "Finance", "Growth", "Security & TechOps", "Banking (triage only)"],
      later: ["Strategy & Org", "People"],
    },

    reframe: {
      setup: "I answered the question as asked — Operations is where I'd lead. But notice the shape of the question: 'where do we save the most and start there?' That's a sound management question — and it's local: it optimises one function. Upvest already automates over 99% of its middle- and back-office. The next leg of AI value won't come from one more back-office push — it comes from every function at once.",
      bigQuestion: "How does Upvest capture the most AI upside as a company, in the shortest time?",
      moves: [
        "Shared AI infrastructure — one secure, governed layer every team builds on.",
        "Integrations — AI wired into the tools and data people already use, not a side toy.",
        "AI literacy + playbooks — every function learns to spot where AI helps their highest-leverage work.",
      ],
      enabler: "Engineering is the enabler that builds the shared layer; every other function compounds on top. Operations being the 'winner' and Engineering being the 'multiplier' aren't in conflict — one is the highest direct upside, the other is the multiplier.",
      caution: "Throwing €20,000 of tokens at people isn't the strategy — it's a risk. AI leverage comes from people using it to improve their own work; that's the only way the skill actually compounds.",
    },
  },

  sec2: {
    kicker: "Section II — Process Optimization",
    title: "Where does AI actually move the needle?",
    teaser: "A deep-dive into a specific operational process — what breaks, where AI fits, how we measure real impact.",
    status: "Coming next",
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

    q2: {
      headline: "Q2. MCP vs. direct API — concrete examples",
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

    q1: {
      headline: "Q1. When are MCPs the right tool?",
      lead: "The single strongest signal is fan-out — every other signal is a variation on 'the cost of integrating this once, centrally, is lower than integrating it N times.'",
      signals: [
        { signal: "Fan-out — multiple consumers, same source", why: "Scales O(consumers + sources), not O(consumers × sources)" },
        { signal: "You want to decouple agents from models", why: "Swap Claude → internal model / OpenAI without touching integrations (DORA concentration-risk)" },
        { signal: "You need one enforcement point for auth, audit, policy", why: "Centralize at the protocol layer — essential in a BaFin/FCA shop where every data touch must be auditable" },
        { signal: "You're plugging into off-the-shelf AI surfaces", why: "Claude Code, Cursor, enterprise Claude/ChatGPT all speak MCP — lowest-friction path to your systems" },
        { signal: "The tool surface is large or changing", why: "Capability discovery is in-protocol; agents see new tools with no code change" },
        { signal: "You're building a platform, not one use case", why: "The MCP registry is the substrate interface — the right investment when many teams will follow" },
      ],
      notWhen: [
        { dont: "Single agent, single API, stable contract", instead: "Direct SDK call — MCP buys nothing" },
        { dont: "Hot path / latency-critical (sub-100ms)", instead: "Direct call — skip the protocol hop" },
        { dont: "Streaming / event-driven workloads", instead: "Websockets / Kafka — MCP is request/response shaped" },
        { dont: "You need exotic auth flows hosts don't support yet", instead: "Direct, until the host ecosystem catches up" },
      ],
      synthesis: "Default to MCP once fan-out > 1; default to direct otherwise.",
    },

    q3: {
      headline: "Q3. MCPs: hype or here to stay?",
      honestTake: "I don't have a strong technical view on whether MCP is the permanent solution — I'm not deep enough in the protocol internals to claim that, and I'd rather say so than fake conviction. What I can say: it's an effective way to solve a real problem — standardizing how AI connects to systems. My instinct is we eventually land on a binary solution where code and technical implementation become irrelevant — far more efficient than anything we build today. So I'd bet on the problem being permanent, and stay loosely held on whether MCP specifically is the final form.",
      real: [
        "Solves a genuine M×N integration problem — without a standard, every AI surface re-implements every integration",
        "Multi-vendor adoption (Anthropic + OpenAI + Google + Microsoft) — protocol is now bigger than any one host",
        "Pragmatic spec (JSON-RPC over stdio / streamable HTTP) — implementable in a day, structured enough to evolve",
        "LSP analogy holds: standard protocol, many hosts, many servers — LSP took ~3 years to become invisible infrastructure; MCP is ~12 months in",
      ],
      hype: [
        "'MCP integration' gets slapped onto thin wrappers that would've been simpler as direct calls — cargo-culting is real",
        "Host ecosystem is still fragmented — 'build once, run everywhere' isn't quite true yet",
        "Security primitives (OAuth, permissions, audit) are catching up but uneven; 'enterprise-ready out of the box' is overselling",
        "Indirect prompt-injection via server outputs is already a live attack class — treat any server you didn't write as untrusted code",
      ],
      heading: [
        "Within 2–3 years MCP becomes invisible infrastructure — like REST, the label fades, the protocol stays",
        "Real competition moves up a layer: auth, observability, policy enforcement, discovery/marketplace",
        "Direct API doesn't disappear — it keeps the hot paths — but the default for 'expose this system to agents' becomes 'ship an MCP server'",
        "Enterprise/regulated MCP diverges from consumer MCP (auth, audit, supply-chain controls) — Upvest needs the enterprise track",
      ],
      bottomLine: "Bet on the standardization, not the label.",
    },

    q4: {
      headline: "Q4. Security & compliance in a regulated environment",
      preamble: "Upvest is BaFin- and FCA-regulated; the AI Act, EBA guidelines, DORA, GDPR, and MaRisk/BAIT all apply at once. Every one of these is engaged the moment an MCP layer touches customer data, compliance logs, or transaction history.",
      regs: [
        {
          reg: "GDPR",
          requirement: "Lawful processing, data minimisation, sub-processor control",
          example: "Customer name/account in a prompt sent to the model provider = cross-border processing by a sub-processor, unredacted",
        },
        {
          reg: "EU AI Act",
          requirement: "Risk-tiering, human oversight, transparency",
          example: "An agent that drafts/acts on transfers via MCP tools — a non-deterministic action on customer money needs oversight + logging",
        },
        {
          reg: "EBA Outsourcing (GL/2019/02)",
          requirement: "Classify & govern critical/important outsourcing",
          example: "The model provider behind the gateway becomes 'critical/important' once it processes transaction data → register + exit plan",
        },
        {
          reg: "DORA",
          requirement: "ICT third-party & concentration risk, resilience",
          example: "Single LLM provider in the WINX path; an MCP-server outage stalls transfer processing — concentration + resilience gap",
        },
        {
          reg: "MaRisk / BAIT (AT 7.2)",
          requirement: "IT governance, change management, vetted systems",
          example: "A community MCP server pulled from GitHub running in the agent's tool path with access to compliance logs",
        },
        {
          reg: "MiFID II",
          requirement: "Record-keeping (5–7y), reconstructable records",
          example: "Incomplete audit trail of which transaction records an agent read via the transaction-history MCP server",
        },
        {
          reg: "BaFin / FCA (supervisory)",
          requirement: "Accountability, auditability, thematic review",
          example: "'Show every AI action on customer X's account over 12 months' — impossible if MCP traffic isn't centrally logged",
        },
      ],
      risks: [
        { risk: "Prompt injection via tool outputs", why: "A server returns attacker-controlled text that hijacks the agent into exfiltrating data or moving a transfer. Documented attack class with real CVEs." },
        { risk: "Over-privileged agents", why: "Servers default to a broad service account; every call inherits it, so an agent reads customer data the invoking user can't." },
        { risk: "Exfiltration to the model provider", why: "Any prompt with customer data leaves Upvest — GDPR sub-processing, EBA 'critical/important' outsourcing, DORA third-party risk." },
        { risk: "Lateral movement", why: "One poisoned output tells the agent to call another server it can reach; blast radius = everything the agent touches." },
        { risk: "Supply-chain risk", why: "Community servers from GitHub run as code in the tool path with broad access — unmanageable by default in a regulated firm." },
        { risk: "Audit gaps on non-deterministic actions", why: "'Why did the agent do X, and what did it see?' is unanswerable without instrumentation, and 'the model decided' is not an answer a regulator accepts." },
      ],
      design: {
        sensitivity: "PII redaction at the gateway before any prompt leaves Upvest; EU-residency endpoints only (Bedrock EU / Azure OpenAI EU); zero-retention DPAs; no consumer hosts with customer data.",
        access: "Per-user OAuth so the agent acts as the user and their RBAC applies (never god-mode service accounts); per-agent server scoping + data-classification segmentation; no agent combines 'read PII' with 'act on external systems.'",
        audit: "Log all MCP traffic centrally (prompt + response + tool calls + invoking user + timestamp), immutable, ≥7y; every consequential action passes a rule-based gate or human approver — AI proposes, deterministic systems / humans dispose.",
      },
      tradeoffs: [
        "Redaction even when it hurts quality — stripping names/accounts degrades ticket search and customer-specific summarization; I accept the loss",
        "Multi-provider strategy even when one model is best — DORA concentration-risk forces a wired-in alternative; real velocity cost",
        "No autonomous agents in critical money paths, even when MCP makes it trivial — the cost of explaining one non-deterministic action to a supervisor outweighs the saving",
        "Slow server/host onboarding — what's a 1-hour spike at a startup is a 1–2 week vetting + DPIA cycle here",
      ],
      principle: "Treat the MCP layer as the regulatory perimeter. Build auth, redaction, audit, and scoping once at the gateway; agents and servers consume it. That's what lets the rest of the org adopt AI safely.",
    },

    talking: {
      headline: "Workshop talking points",
      points: [
        "Build vs. buy the MCP gateway/proxy — open-source layer (MCP Inspector + custom auth) vs. enterprise vendors (Anthropic's enterprise MCP offering, others). Tradeoffs?",
        "First MCP servers to ship at Upvest — my pick: Looker (read-only, lowest risk), Confluence/knowledge base (read-only, high leverage), Ops Panel (read-only first, then scoped writes). Avoid the BNP mailbox and anything write-side until the perimeter is mature.",
        "Where the gateway lives in the org chart — Security & TechOps (most natural — they already run ICT controls), Engineering, or a new Applied AI Platform team?",
        "EBA outsourcing classification of model providers — almost certainly 'critical or important' once production AI touches customer data. Has Banking already classified Anthropic / OpenAI under EBA/GL/2019/02?",
        "DPIA process for AI use cases — does Upvest have a template, or does each team improvise?",
      ],
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
