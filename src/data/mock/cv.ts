export interface JourneyEntry {
  period: string;
  location: string;
  country: string;
  coordinates: [number, number]; // [lng, lat]
  category: "live" | "archived" | "queued";
  entries: {
    title: string;
    type: "work" | "education" | "personal" | "volunteer";
    description: string;
  }[];
}

export const journeyData: JourneyEntry[] = [
  {
    period: "2024 — Present",
    location: "Berlin",
    country: "Germany",
    coordinates: [13.405, 52.52],
    category: "live",
    entries: [
      {
        title: "Senior Risk Specialist — Trade Republic",
        type: "work",
        description: "Promoted to senior role, leading risk initiatives at Europe's largest savings platform.",
      },
      {
        title: "Risk Officer II — Trade Republic",
        type: "work",
        description: "Joined Trade Republic to build and scale the risk function at one of Europe's fastest-growing fintechs.",
      },
    ],
  },
  {
    period: "2021 — 2024",
    location: "Building",
    country: "",
    coordinates: [11.0, 45.44],
    category: "archived",
    entries: [
      {
        title: "Co-Founder — CRUBSTER",
        type: "work",
        description: "Co-founded a startup and wore every hat for three years. Built, shipped, learned, moved on.",
      },
      {
        title: "Ambulance Driver & Medical Rescuer — Croce Verde, Verona",
        type: "volunteer",
        description: "Volunteering as an emergency medical rescuer — because some risks you manage with spreadsheets, others with sirens.",
      },
    ],
  },
  {
    period: "2019 — 2021",
    location: "London",
    country: "UK",
    coordinates: [-0.1276, 51.5074],
    category: "archived",
    entries: [
      {
        title: "MSc Business Analytics — Imperial College London",
        type: "education",
        description: "Distinction. ICBS Best Dissertation Award. Dean's List. Where finance met data science.",
      },
      {
        title: "SSC Academic Leader — Imperial College Business School",
        type: "volunteer",
        description: "Led the Student Staff Committee for two years.",
      },
    ],
  },
  {
    period: "2018 — 2021",
    location: "Frankfurt",
    country: "Germany",
    coordinates: [8.6821, 50.1109],
    category: "archived",
    entries: [
      {
        title: "Analyst — European Central Bank",
        type: "work",
        description: "Nearly three years at the ECB. Macro-prudential analysis and banking supervision.",
      },
      {
        title: "MSc Corporate Finance & Valuation — Frankfurt School",
        type: "education",
        description: "Top 3% of the cohort. Head of Frankfurt School MUN delegation.",
      },
      {
        title: "Praktikant — Deutsche Bank",
        type: "work",
        description: "Summer internship. First taste of institutional banking.",
      },
    ],
  },
  {
    period: "2019",
    location: "Düsseldorf",
    country: "Germany",
    coordinates: [6.7735, 51.2277],
    category: "archived",
    entries: [
      {
        title: "Secondment — Deutsche Bundesbank",
        type: "work",
        description: "Four-month secondment during ECB tenure. Banking supervision on the ground.",
      },
    ],
  },
  {
    period: "2018 — 2019",
    location: "Madrid",
    country: "Spain",
    coordinates: [-3.7038, 40.4168],
    category: "archived",
    entries: [
      {
        title: "Secondment — Banco de España",
        type: "work",
        description: "Four-month secondment. Supervision work with the Spanish central bank.",
      },
    ],
  },
  {
    period: "2018",
    location: "Shanghai",
    country: "China",
    coordinates: [121.4737, 31.2304],
    category: "archived",
    entries: [
      {
        title: "Exchange Semester — SAIF, Shanghai Jiao Tong University",
        type: "education",
        description: "Finance exchange at one of Asia's top business schools.",
      },
    ],
  },
  {
    period: "2017 — 2018",
    location: "New York City",
    country: "USA",
    coordinates: [-74.006, 40.7128],
    category: "archived",
    entries: [
      {
        title: "Head of Delegation — National Model United Nations",
        type: "volunteer",
        description: "Led the Frankfurt School MUN delegation to NYC. Two weeks of intense diplomacy simulation.",
      },
    ],
  },
  {
    period: "2012 — 2015",
    location: "Milan",
    country: "Italy",
    coordinates: [9.19, 45.4642],
    category: "archived",
    entries: [
      {
        title: "BSc Economics & Finance — Università Bocconi",
        type: "education",
        description: "Foundation years. Where the journey into finance began.",
      },
    ],
  },
  {
    period: "2010 — 2011",
    location: "Paragould, Arkansas",
    country: "USA",
    coordinates: [-90.5023, 36.0584],
    category: "archived",
    entries: [
      {
        title: "Exchange Year — Paragould High School",
        type: "personal",
        description: "A year in small-town USA. Left Verona at 17, came back with a different perspective.",
      },
    ],
  },
  {
    period: "1993 — 2010",
    location: "Verona",
    country: "Italy",
    coordinates: [10.9916, 45.4384],
    category: "archived",
    entries: [
      {
        title: "Born — April 2, 1993",
        type: "personal",
        description: "The same day Philip Morris slashed Marlboro prices by 20%, triggering 'Marlboro Friday' and reshaping brand marketing forever. A fitting start for someone who'd end up in risk.",
      },
    ],
  },
  {
    period: "PENDING",
    location: "Tokyo",
    country: "Japan",
    coordinates: [139.6917, 35.6895],
    category: "queued",
    entries: [
      {
        title: "Neon & Noise",
        type: "personal",
        description: "Akihabara, Shibuya, ramen at 3am. The original cyberpunk city.",
      },
    ],
  },
  {
    period: "PENDING",
    location: "Seoul",
    country: "South Korea",
    coordinates: [126.978, 37.5665],
    category: "queued",
    entries: [
      {
        title: "The Grid",
        type: "personal",
        description: "Street food, tech culture, and Gangnam neon.",
      },
    ],
  },
  {
    period: "PENDING",
    location: "Reykjavik",
    country: "Iceland",
    coordinates: [-21.9426, 64.1466],
    category: "queued",
    entries: [
      {
        title: "Edge of the Map",
        type: "personal",
        description: "Northern lights, volcanic landscapes, end-of-the-world vibes.",
      },
    ],
  },
];
