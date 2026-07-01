export interface EngagementStep {
  n: number;
  label: string;
  oneLine: string;
}

export interface ChallengeContent {
  hero: { kicker: string; title: string; subtitle: string };
  intro: {
    whys: { label: string; body: string }[];
    pillars: { label: string; body: string }[];
  };
  philosophy: {
    kicker: string;
    headline: string;
    body: string;
    quote: string;
    principles: {
      iconKey: "awareness" | "buffers" | "exclusions";
      label: string;
      body: string;
    }[];
  };
  q3: {
    kicker: string;
    question: { preamble: string; title: string; bullets: string[] };
    star: {
      situation: { headline: string; bullets: string[] };
      task:      { headline: string; bullets: string[] };
      actions:   {
        headline: string;
        steps: { n: number; label: string; body: string }[];
      };
      result:    { headline: string; bullets: string[] };
    };
    anchor: string;
  };
  q1: {
    kicker: string;
    question: { preamble: string; title: string; subQuestions: string[] };
    understand: {
      headline: string;
      body: string;
      bullets: string[];
    };
    regulatoryAnchors: {
      headline: string;
      items: { label: string; body: string }[];
    };
    framing: {
      headline: string;
      today:  { label: string; body: string };
      future: { label: string; body: string };
      crossoverNote: string;
    };
    whyPillar2: {
      pillar1: { headline: string; oneLine: string; limitation: string };
      pillar2: { headline: string; oneLine: string; strength: string };
    };
    approaches: {
      headline: string;
      items: Array<{
        rank: number;
        name: string;
        description: string;
        pros: string;
        cons: string;
        verdict: "rejected" | "considered" | "recommended";
      }>;
    };
    hybrid: {
      headline: string;
      body: string;
      components: Array<{ label: string; body: string }>;
    };
    tiers: Array<{
      tier: 1 | 2 | 3 | 4;
      label: string;
      horizon: string;
      example: string;
    }>;
    drilldowns: {
      tierTable: {
        headers: string[];
        rows: string[][];
        note?: string;
      };
      operationalIntegration: {
        items: { label: string; body: string }[];
      };
    };
    q1b: {
      headline: string;
      sameApproachCaption: string;
      applied: {
        headline: string;
        body: string;
        steps: Array<{
          n: number;
          label: string;
          gloss: string;
          detail: string;
          items?: string[];
        }>;
      };
    };
  };
  q2: {
    kicker: string;
    question: { preamble: string; title: string; subQuestions: string[] };
    understand: {
      headline: string;
      body: string;
      bullets: string[];
      causalChain: string[];
    };
    reframe: {
      headline: string;
      today: { label: string; body: string };
      future: { label: string; body: string };
      scopeNote: string;
    };
    failureModes: {
      headline: string;
      body: string;
      rows: { capability: string; failure: string; tiedTo: string }[];
    };
    siBuckets: Array<{ headline: string; oneLine: string }>;
    shifts: Array<{ n: number; headline: string; oneLine: string }>;
    ewiLayers: Array<{
      layer: 1 | 2 | 3 | 4 | 5;
      name: string;
      leadLag: "lead" | "mixed" | "lag";
      clientImpact: "no" | "no but" | "not yet" | "approaching" | "yes — happening";
      actionWindow: string;
      indicators: string[];
    }>;
    scenario: Array<{
      day: 1 | 2 | 3 | 4;
      state: string;
      trigger: string;
      action: string;
      outcome?: string;
    }>;
    anchor: string;
    drilldowns: {
      actionMapping: {
        headers: string[];
        rows: string[][];
      };
      fullIndicators: {
        sections: { title: string; items: string[] }[];
      };
      honestCaveat: {
        intro: string;
        bullets: string[];
        closing: string;
        regulatory: string;
      };
    };
  };
  closing: {
    headline: string;
    body: string;
    cta: { label: string; href: string };
  };
}

export const engagementSteps: EngagementStep[] = [
  { n: 1, label: "Understand",               oneLine: "Map business priorities first." },
  { n: 2, label: "Gather",                   oneLine: "Pull data, not opinions." },
  { n: 3, label: "Evidence",                 oneLine: "Cost of doing vs cost of not doing." },
  { n: 4, label: "Options",                  oneLine: "Build at least 3 scenarios." },
  { n: 5, label: "One-on-one",               oneLine: "Tackle each stakeholder on what they care about." },
  { n: 6, label: "Patience",                 oneLine: "Let consensus form before the joint meeting." },
  { n: 7, label: "Frame as risk acceptance", oneLine: "Management decides; Risk documents." },
];

export const challengeContent: ChallengeContent = {
  hero: {
    kicker: "Senior Risk Manager — Case Challenge",
    title: "Francesco @ Upvest.",
    subtitle: "A risk manager applying to a Berlin fintech he's spent 33 years preparing for.",
  },
  intro: {
    whys: [
      {
        label: "ECB",
        body: "Three years in Frankfurt as Analyst (2018–21), with secondments at Bundesbank and Banco de España. Learned how supervisors actually think — and what keeps them up at night.",
      },
      {
        label: "CRUBSTER",
        body: "Co-founded in Verona, ran it for three years. Every hat at once — product, ops, compliance, fundraising. Risk-as-enabler isn't a slogan; it's what shipping required.",
      },
      {
        label: "Trade Republic",
        body: "Senior Risk Specialist since 2024. Berlin fintech, scaling fast. Risk frameworks built into the product, not bolted on.",
      },
    ],
    pillars: [
      {
        label: "Berlin fintech, scaling fast",
        body: "At Trade Republic — Europe's largest savings platform — the risk function is built, not inherited. Since 2024, as Senior Risk Specialist, the work has been creating frameworks that scale with the product, not behind it.",
      },
      {
        label: "Founder, builder, shipped",
        body: "Co-founded CRUBSTER in Verona and ran it for three years. Wore every hat — product, operations, compliance, fundraising. Learned what it costs to build something real and ship it anyway.",
      },
      {
        label: "Risk, real-world",
        body: "Volunteering as an ambulance driver and medical rescuer with Croce Verde, Verona. Some risks are managed with models and spreadsheets; others with sirens and calm hands under pressure. Both count.",
      },
    ],
  },
  philosophy: {
    kicker: "Philosophy of risk management",
    headline: "Risk management is not about preventing every fall.",
    body: "Companies and new products are full of risks. The goal isn't preventing all of them — it's making sure that when management takes a risk, they do so with full awareness, with appropriate buffers, and with catastrophic outcomes excluded.",
    quote: "…with full awareness, with appropriate buffers, and with catastrophic outcomes excluded.",
    principles: [
      {
        iconKey: "awareness",
        label: "Full awareness",
        body: "See the risk clearly before management takes it. Decompose, evidence, name the trade-off — so the decision is informed, not implicit.",
      },
      {
        iconKey: "buffers",
        label: "Appropriate buffers",
        body: "Capital, liquidity, governance — sized for the stress that's plausible, not the base case. Buffers are the price of ambition, not its enemy.",
      },
      {
        iconKey: "exclusions",
        label: "Catastrophe excluded",
        body: "Some outcomes are off the table — franchise-ending, supervisory-ending, client-trust-ending. Risk's job is to keep them off.",
      },
    ],
  },
  q3: {
    kicker: "1 — Q3 Stakeholder Engagement & Collaboration",
    question: {
      preamble:
        "Risk management requires effective cross-functional collaboration and stakeholder alignment. Based on your experience:",
      title: "Stakeholder engagement when risk and commercial priorities conflict.",
      bullets: [
        "How do you engage and align business stakeholders (e.g. finance, product, and operations) when risk requirements conflict with commercial priorities?",
        "Describe a situation where you had to influence a senior decision-maker on a critical risk matter. How did you build consensus and what was the outcome?",
      ],
    },
    star: {
      situation: {
        headline: "One omnibus account, two very different sets of risk.",
        bullets: [
          "Mixing of customer and trading-book funds",
          "Inflated LCR from customer inflows",
          "Higher FX open position",
          "Weak supervisory standing",
          "Impossible reconciliation",
        ],
      },
      task: {
        headline: "Reduce risk without breaking the business.",
        bullets: [
          "Engage and build consensus across Finance and Security Services",
          "Find a path that improves both risk and operations",
        ],
      },
      actions: {
        headline: "Seven steps, applied to the omnibus case.",
        steps: [
          { n: 1, label: "Understand",  body: "Mapped Treasury, Reg Reporting, Finance, SecServ priorities first." },
          { n: 2, label: "Gather",      body: "Settlement-cost data, Clearstream specs, regulatory texts." },
          { n: 3, label: "Evidence",    body: "Two-sided: cost of doing vs cost of not doing (fines, supervisory)." },
          { n: 4, label: "Options",     body: "Scenarios: full account split · ledger split · status quo." },
          { n: 5, label: "One-on-one",  body: "Tackled each owner individually — Treasury, Reg Reporting, Accounting, Finance, SecServ." },
          { n: 6, label: "Patience",    body: "Let each owner reach consensus before convening the joint meeting." },
          { n: 7, label: "Frame as risk acceptance", body: "Joint meeting was a formal sign-off; management accepted residual reconciliation risk." },
        ],
      },
      result: {
        headline: "Ledger split, not account split. Regulator-defendable. No extra settlement cost.",
        bullets: [
          "Corrected regulatory reporting figures",
          "Better monitoring of mixed-fund risk",
          "Accepted residual reconciliation risk explicitly",
        ],
      },
    },
    anchor:
      "Where a requirement is interpretive — and most are — my job is to surface the trade-off clearly: cost of compliance vs cost of non-compliance, including reputational and supervisory consequences, not just the fine. Management decides as a risk-acceptance decision; Risk documents and maintains oversight. Where the requirement is clear-cut, I don't suggest accepting non-compliance — but I make sure management understands the full cost of compliance so they can plan for it.",
  },
  q1: {
    kicker: "2 — Q1 Regulatory Framework & ICAAP",
    question: {
      preamble:
        "Upvest's capital requirements are currently driven by fixed overheads. From 2027 onwards, our capital needs will shift to being driven primarily by the rapid scaling of our assets under custody (AUC).",
      title: "Capital methodology under an AUC-driven regime.",
      subQuestions: [
        "Q1a — How would you design a methodology for handling market liquidity risk, esp. on positions in less liquid names?",
        "Q1b — How would you handle a material divergence between your risk-based capital assessment and finance's budget assumptions?",
      ],
    },
    understand: {
      headline: "Understand the question.",
      body: "The first step in every exam is to understand the question — most people end up answering the wrong one. Reading this prompt, four things come to mind:",
      bullets: [
        "What drives capital today, and why? FOR is the floor; AUC growth changes the binding constraint.",
        "How is capital calculated for Upvest as an investment firm — not a CRR bank? IFR/IFD via WpIG, BaFin-supervised.",
        "What is the link between 'less liquid names' and capital? Pillar 1 K-NPR is blind to liquidity — the gap belongs in Pillar 2.",
        "Despite the word 'liquidity', this is largely a capital / market-risk question. Worth flagging before designing.",
      ],
    },
    regulatoryAnchors: {
      headline: "The regulatory frame.",
      items: [
        { label: "Framework",      body: "IFR + IFD, transposed via WpIG, BaFin-supervised." },
        { label: "Pillar 1",       body: "MAX( PMR €750k · FOR = 25% × overheads · KFR = Σ K-factors )." },
        { label: "Pillar 2",       body: "ICAAP under IFD Art 24, SREP under Art 36, P2R under Art 39." },
        { label: "EBA Guidelines", body: "EBA/GL/2022/09 on SREP for investment firms." },
        { label: "K-factors",      body: "K-ASA (custody), K-COH (orders), K-NPR (peak book), possibly K-CMH." },
      ],
    },
    framing: {
      headline: "From overheads-driven to AUC-driven.",
      today: {
        label: "Today — FOR binds (~€11–14m)",
        body: "Capital ≈ 25% of fixed overheads. Stable, predictable, blind to growth.",
      },
      future: {
        label: "From 2027 — KFR binds (AUC × K-ASA)",
        body: "Capital scales with assets under custody and peak book. Growth has a capital cost.",
      },
      crossoverNote: "Crossover around €25–35bn AUC — external triangulation, not internal numbers.",
    },
    whyPillar2: {
      pillar1: {
        headline: "Pillar 1",
        oneLine: "Flat haircuts. Doesn't know if it's Apple or a small-cap.",
        limitation: "€100k in Apple ≈ same charge as €100k in an illiquid name with €200k ADV.",
      },
      pillar2: {
        headline: "Pillar 2 / ICAAP overlay",
        oneLine: "Tier by liquidity. Capital follows the actual risk.",
        strength: "Drives behaviour through limits and restricted lists — not just a capital number.",
      },
    },
    approaches: {
      headline: "Three candidate approaches.",
      items: [
        {
          rank: 1,
          name: "Full LVaR",
          description: "Liquidity-adjusted VaR — horizon + spread + market impact per name.",
          pros: "Theoretically clean. Per-name granularity.",
          cons: "Data-heavy, model complexity, disproportionate at Class 2 IF scale.",
          verdict: "rejected",
        },
        {
          rank: 2,
          name: "Single stressed unwind",
          description: "One severe scenario; cost-to-flatten the book = required capital.",
          pros: "Clean, defensible, communicates well to the Board.",
          cons: "No per-name granularity. Doesn't drive selection behaviour.",
          verdict: "considered",
        },
        {
          rank: 3,
          name: "Tiered haircut (hybrid)",
          description: "ISINs in 3–4 liquidity tiers; per-tier capital factors from stressed scenarios; hard concentration limits.",
          pros: "Captures real economics. Drives behaviour through tiers + restricted lists.",
          cons: "Requires tier governance and recalibration discipline.",
          verdict: "recommended",
        },
      ],
    },
    hybrid: {
      headline: "Recommended: a tiered hybrid.",
      body: "Three to four liquidity tiers + per-ISIN concentration limits + quarterly recalibration. Captures real economics, drives behaviour through limits and restricted lists.",
      components: [
        { label: "Capital factor",     body: "Per tier: √time-scaled VaR + deterministic spread + market impact under stress." },
        { label: "Pre-trade controls", body: "Hard concentration limits per ISIN. Restricted list for Tier 4 names." },
        { label: "Recalibration",      body: "Quarterly recalibration; event-driven re-tiering for suspensions, halts, corporate actions." },
      ],
    },
    tiers: [
      { tier: 1, label: "Highly liquid",  horizon: "1 day",                 example: "Large-cap blue chip (illustrative)" },
      { tier: 2, label: "Standard",        horizon: "3 days",                example: "Mid-cap (illustrative)" },
      { tier: 3, label: "Less liquid",     horizon: "10+ days",              example: "Small-cap with thin ADV (illustrative)" },
      { tier: 4, label: "Restricted",      horizon: "Excluded from offering", example: "Suspended / corporate-action affected (illustrative)" },
    ],
    drilldowns: {
      tierTable: {
        headers: ["Tier", "Label", "Horizon", "Capital factor approach"],
        rows: [
          ["1", "Highly liquid", "1 day",    "√time-scaled VaR + stressed spread + impact"],
          ["2", "Standard",      "3 days",   "√time-scaled VaR + stressed spread + impact"],
          ["3", "Less liquid",   "10+ days", "√time-scaled VaR + stressed spread + impact, higher haircut"],
          ["4", "Restricted",    "n/a",      "Excluded from offering at pre-trade limit"],
        ],
        note:
          "Tier examples (Apple, mid-cap, small-cap, suspended) are illustrative, not actual peak-book holdings. ADV / spread / market cap / listing-tier thresholds set quarterly; event-driven re-tiering for suspensions, halts, corporate actions.",
      },
      operationalIntegration: {
        items: [
          { label: "Pre-trade",   body: "Hard concentration limits per ISIN." },
          { label: "In-flight",   body: "Daily monitoring of peak-book liquidation profile and tier mix." },
          { label: "Reporting",   body: "Monthly to ExCo / Risk Committee; quarterly to Board; ICAAP refresh annually under IFD Art 24." },
          { label: "Escalation",  body: "Tier-migration triggers, breach protocols, SREP-relevant disclosures." },
          { label: "Governance",  body: "1LoD adherence; 2LoD methodology + independent validation; IA periodic review. ILAAP also anchored under IFD Art 24." },
          { label: "Reg frame",   body: "IFR/IFD via WpIG, BaFin supervision; EBA/GL/2022/09 on SREP for investment firms." },
        ],
      },
    },
    q1b: {
      headline: "When risk-capital diverges from finance's budget.",
      sameApproachCaption: "Same playbook as Q3 — same seven steps, applied to a different room.",
      applied: {
        headline: "The approach, applied to budget divergence.",
        body: "Same seven steps. Below each step, the content Q1b actually needs.",
        steps: [
          {
            n: 1,
            label: "Understand",
            gloss: "Business priorities first.",
            detail: "Finance plans around growth pace, ROE targets, product launch dates. Surface those before bringing the Risk view.",
          },
          {
            n: 2,
            label: "Gather",
            gloss: "Data, not opinions.",
            detail: "AUC forecast, peak book size, tier mix, stress severity — lined up against Finance's assumptions, not against vibes.",
          },
          {
            n: 3,
            label: "Evidence",
            gloss: "Cost of doing vs not doing.",
            detail: "Two-sided view, side-by-side:",
            items: [
              "5 sources of divergence: Volume · Severity · Methodology · Timing · Data",
              "Cost of NOT addressing: capital breach, SREP add-on (P2R/P2G), supervisory standing, growth constraint",
              "Cost OF methodology: ROE drag (bps), ops + governance, product limits",
            ],
          },
          {
            n: 4,
            label: "Options",
            gloss: "At least 3 costed scenarios.",
            detail: "Four alternatives on the table:",
            items: [
              "Full LVaR",
              "Single stressed unwind",
              "Tiered hybrid (recommended)",
              "No action",
            ],
          },
          {
            n: 5,
            label: "One-on-one",
            gloss: "Tackle each on what they care about.",
            detail: "Tailored conversation per owner:",
            items: [
              "Reg Reporting — definitions, IFR/IFD",
              "Finance — ROE bps, budget impact",
              "Treasury — funding flow under stress",
              "ExCo — appetite, escalation triggers",
            ],
          },
          {
            n: 6,
            label: "Patience",
            gloss: "Consensus before the meeting.",
            detail: "Iterate the capital bridge; circulate sensitivities; let stakeholders catch up before convening the joint session.",
          },
          {
            n: 7,
            label: "Frame as risk acceptance",
            gloss: "Management decides; Risk documents.",
            detail: "Joint meeting is a sign-off, not a debate. Materials on the table:",
            items: [
              "Capital bridge: P1 → P2 add-ons → buffer → required",
              "Sensitivity tables (book size · tier mix · severity)",
              "Stress scenario narratives",
              "Driver comparison: Risk vs Finance, line-by-line",
            ],
          },
        ],
      },
    },
  },
  q2: {
    kicker: "3 — Q2 Business Model — Fractional Trading",
    question: {
      preamble:
        "Upvest operates a peak account to manage residual fractional share positions, resulting in direct market exposure on its own balance sheet. From a liquidity risk perspective:",
      title: "Peak account meets Systematic Internalisation.",
      subQuestions: [
        "Q2a — How will Systematic Internalisation designation change your liquidity risk framework for the peak account?",
        "Q2b — How would you monitor early warning signs that deteriorating market liquidity is feeding through into our funding position, before it starts affecting our ability to service clients?",
      ],
    },
    understand: {
      headline: "Understand the question.",
      body: "Before designing, scope the question:",
      bullets: [
        "Funding liquidity or market liquidity? The question is funding liquidity — with market liquidity as the upstream driver.",
        "What actually changes when SI applies? Inventory, funding, controls, risk profile.",
        "What does 'service clients' mean here? Execution, withdrawal, securities delivery, quote honour.",
      ],
      causalChain: [
        "Market liquidity deteriorates",
        "Inventory turnover slows",
        "Working capital trapped",
        "Funding pressure",
        "Client-servicing capacity impaired",
      ],
    },
    reframe: {
      headline: "Peak account → trading book operation.",
      today: {
        label: "Today",
        body: "Settlement residual from fractional trading. Few €m, churns on flow, no trading intent.",
      },
      future: {
        label: "Under SI",
        body: "Flow / facilitation book. Held with execution intent, bears material market risk. Trading book in substance.",
      },
      scopeNote:
        "Licence framework unchanged (§ 2(2) no. 10 WpIG). Scope expands from 'fractional enablement' to 'principal trading for client facilitation'.",
    },
    failureModes: {
      headline: "What 'client impact' actually means.",
      body: "The EWI framework's job is to detect approaching impairment of these client-facing capabilities — and act before the impairment lands on a client.",
      rows: [
        { capability: "Execution",              failure: "Can't take incoming orders",     tiedTo: "Inventory / cash capacity" },
        { capability: "Pricing",                failure: "Spreads widen materially",       tiedTo: "Funding cost" },
        { capability: "Withdrawal",             failure: "Can't honour cash-out",          tiedTo: "Cash buffer" },
        { capability: "Securities delivery",    failure: "Can't transfer out",             tiedTo: "Inventory + settlement" },
        { capability: "Settlement reliability", failure: "Trades fail",                    tiedTo: "Operational + funding" },
        { capability: "Quote honour (under SI)",failure: "Can't meet firm quotes",         tiedTo: "Inventory + capital" },
        { capability: "System availability",    failure: "Service unavailable",            tiedTo: "Operational" },
      ],
    },
    siBuckets: [
      { headline: "Inventory",    oneLine: "Bigger book, longer holdings, no 'stop trading' lever." },
      { headline: "Funding",      oneLine: "Larger flows, intraday-critical, repo & sec-lending needed." },
      { headline: "Controls",     oneLine: "Quote management, APA reporting, Markets Committee, best-ex evidencing." },
      { headline: "Risk profile", oneLine: "K-NPR grows, settlement risk grows, reputational risk if quotes can't be honoured." },
    ],
    shifts: [
      { n: 1, headline: "Liquidity buffer",   oneLine: "Pillar 2 overlay grows beyond the IFR Art 43 floor." },
      { n: 2, headline: "Monitoring horizon", oneLine: "Daily becomes intraday." },
      { n: 3, headline: "Stress scenarios",   oneLine: "'Forced to hold' replaces 'forced to fund out'." },
      { n: 4, headline: "EWIs",               oneLine: "Add market-side indicators — spreads, ADV, repo, fails, vol." },
      { n: 5, headline: "Funding strategy",   oneLine: "Diversified banking, repo, sec-lending; concentration becomes a managed risk." },
      { n: 6, headline: "Contingency plan",   oneLine: "Graduated — widen spreads, restrict offering, emergency repo, supervisory escalation." },
    ],
    ewiLayers: [
      {
        layer: 1, name: "Market", leadLag: "lead",
        clientImpact: "no", actionWindow: "Plenty of time",
        indicators: [
          "Bid-ask spreads",
          "ADV",
          "Tier migration",
          "Equity vol",
          "Cross-asset (credit · FX · repo)",
          "Market-wide settlement fails",
        ],
      },
      {
        layer: 2, name: "Internal book", leadLag: "lead",
        clientImpact: "no", actionWindow: "Significant time",
        indicators: [
          "Peak book % of AUC",
          "Inventory aging",
          "Top-10 concentration",
          "Stressed cost-to-flatten",
          "Unrealised P&L drawdown",
        ],
      },
      {
        layer: 3, name: "Funding", leadLag: "mixed",
        clientImpact: "not yet", actionWindow: "Limited time",
        indicators: [
          "Settlement-balance use",
          "Intraday buffer use",
          "Funding cost vs baseline (bps)",
          "Credit-line use",
          "Counterparty concentration",
          "Repo haircuts",
          "HQLA % of buffer",
        ],
      },
      {
        layer: 4, name: "Operational", leadLag: "lag",
        clientImpact: "approaching", actionWindow: "Very limited",
        indicators: [
          "Settlement fails",
          "CSDR cash-penalty accruals",
          "Quote availability / latency",
          "Failed trade rate",
        ],
      },
      {
        layer: 5, name: "Client behaviour", leadLag: "lag",
        clientImpact: "yes — happening", actionWindow: "Reactive only",
        indicators: [
          "Net client flow & velocity",
          "Withdrawal acceleration",
          "Complaint volume",
          "Redemption clustering",
        ],
      },
    ],
    scenario: [
      {
        day: 1,
        state: "Layer 1 amber",
        trigger: "Spreads 3x; ADV -40% in 30 names",
        action: "Halt new positions; pre-notify Treasury; review tiers.",
      },
      {
        day: 2,
        state: "Layer 2 amber",
        trigger: "Cost-to-flatten doubles; 12 names overage",
        action: "Active inventory reduction; tighten per-name limits; re-tier 8 names down.",
      },
      {
        day: 3,
        state: "Layer 3 amber",
        trigger: "Funding cost +15bps; HQLA -10%",
        action: "Draw committed credit line; CFP amber actions; ALCO convened.",
      },
      {
        day: 4,
        state: "Outcome",
        trigger: "Stress absorbed within Layers 1–3",
        action: "Peak book smaller, more liquid, better hedged. Funding tested but intact.",
        outcome: "Clients have noticed nothing.",
      },
    ],
    anchor:
      "The framework prevents client impact by creating distance between the original stress and the eventual client-facing failure. Each layer is a stage in the chain; acting at Layer 1 or 2 prevents reaching Layer 4 or 5. Within the layers, specific indicators anchor to client-service capacity — days of funding coverage, settlement fail rate, securities inventory coverage for net sell demand. Amber triggers preventive action, not just alerts. The discipline is acting early enough that by the time clients could feel something, we've already absorbed the stress.",
    drilldowns: {
      actionMapping: {
        headers: ["Layer & state", "Preventive action", "What it prevents"],
        rows: [
          ["1 Amber", "Halt new positions; pre-position funding lines; review fractional scope",                "Stress reaching the book"],
          ["2 Amber", "Active inventory reduction; tighten limits; re-tier names down; engage Treasury",         "Book stress reaching funding"],
          ["3 Amber", "Draw committed lines; activate CFP early actions; convene ALCO; engage banking partners", "Funding stress reaching operations"],
          ["3 Red",   "Full CFP activation; emergency repo; restrict firm (not client) cash",                    "Operations failing"],
          ["4 Red",   "Operational triage; suspend non-essential activity; manual workarounds; ExCo standing",   "Cascading to clients"],
          ["5 Red",   "Damage control; BaFin notification; client communication; Board engagement",              "Prevention has failed; now managing the event"],
        ],
      },
      fullIndicators: {
        sections: [
          {
            title: "Layer 1 — Market (lead)",
            items: [
              "Bid-ask spreads",
              "ADV",
              "Tier migration",
              "Equity volatility",
              "Cross-asset: credit spreads · FX vol · repo specialness",
              "Market-wide settlement fails",
            ],
          },
          {
            title: "Layer 2 — Internal book (lead)",
            items: [
              "Peak book size as % of AUC",
              "Inventory aging",
              "Concentration (top 10 names)",
              "Stressed cost-to-flatten",
              "Unrealised P&L drawdown",
            ],
          },
          {
            title: "Layer 3 — Funding (mixed)",
            items: [
              "Settlement-balance utilisation",
              "Intraday liquidity buffer usage",
              "Cost of funding vs baseline (bps)",
              "Credit-line usage",
              "Counterparty concentration in funding sources",
              "Repo haircuts (own and market-wide)",
              "HQLA holdings as % of total liquidity buffer",
            ],
          },
          {
            title: "Layer 4 — Operational (lag)",
            items: [
              "Upvest-side settlement fails",
              "CSDR cash-penalty accruals",
              "Quote system availability and latency",
              "Failed trade rates",
            ],
          },
          {
            title: "Layer 5 — Client behaviour (lag)",
            items: [
              "Net client flow direction and velocity",
              "Withdrawal acceleration",
              "Complaint volume",
              "Redemption clustering in specific names",
            ],
          },
        ],
      },
      honestCaveat: {
        intro: "The framework cannot make markets liquid again. What it does:",
        bullets: [
          "Maximises the chance of mitigation before client impact — through detection and lead time.",
          "Ensures an orderly, pre-planned response if mitigation fails — through CFP linkage.",
          "Protects the most critical client services for as long as possible — by triaging non-essential activity first.",
          "Provides regulatory protection — demonstrates you saw it coming and acted.",
        ],
        closing:
          "Stating this explicitly is the senior move. Calibrating to 'maximises chance of mitigation and ensures orderly response if mitigation fails' is what BaFin and the Board actually want to hear.",
        regulatory:
          "Regulatory frame for ILAAP: IFD Art 24 (NOT Art 36 — Art 36 is SREP). IFR Art 43 floor (liquid assets ≥ ⅓ FOR); IFR Art 44 (temporary reduction with NCA approval); EBA/GL/2022/09. Adjacent: CSDR, DORA, MiFID II, client money rules.",
      },
    },
  },
  closing: {
    headline: "If this resonated, let's talk.",
    body: "I'd like to bring this approach to Upvest. Five years of risk in fast-growing fintechs, and the kind of stakeholder patience this challenge implicitly asks for.",
    cta: { label: "Get in touch", href: "mailto:fgv031@icloud.com" },
  },
};
