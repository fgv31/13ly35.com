export interface JourneyEntry {
  period: string;
  location: string;
  country: string;
  coordinates: [number, number]; // [lng, lat]
  category: "live" | "archived" | "queued";
  link?: { href: string; label: string };
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
      {
        title: "Half Marathon Finisher",
        type: "personal",
        description: "Crossed the finish line of the Berlin Half Marathon. 21.1km through the city I now call home.",
      },
    ],
  },
  {
    period: "2021 — 2024",
    location: "Verona",
    country: "Italy",
    coordinates: [10.9916, 45.4384],
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
      {
        title: "Peschiera Triathlon Finisher",
        type: "personal",
        description: "Swim, bike, run — completed the Peschiera del Garda triathlon. Lake Garda never looked better from the inside.",
      },
    ],
  },
  {
    period: "2021",
    location: "Austin",
    country: "USA",
    coordinates: [-97.7431, 30.2672],
    category: "archived",
    entries: [
      {
        title: "The Rolling Stones Live",
        type: "personal",
        description: "Saw Mick Jagger and the Stones live in Austin, Texas. Some things you just have to witness in person.",
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
    period: "2015 — 2016",
    location: "Vicenza",
    country: "Italy",
    coordinates: [11.5476, 45.5455],
    category: "archived",
    entries: [
      {
        title: "Financial Analyst — Frav S.r.l.",
        type: "work",
        description: "First full-time role after the bachelor's. Financial analysis and reporting at a family-owned Italian firm.",
      },
    ],
  },
  {
    period: "2015",
    location: "London",
    country: "UK",
    coordinates: [-0.1276, 51.5074],
    category: "archived",
    entries: [
      {
        title: "Restaurant Dishwasher & GMAT Preparation",
        type: "personal",
        description: "Washing dishes in a London kitchen by day, grinding through quantitative reasoning and verbal logic by night. The glamorous path to graduate school.",
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
        description: "Foundation years. Where the journey into finance began. Final grade: 92/110.",
      },
      {
        title: "Bocconi Students Investment Club & B.wine",
        type: "personal",
        description: "Active member of the investment club and B.wine society. Markets by day, Barolo by night.",
      },
      {
        title: "Intern — Ufficio Commercialisti Villani (Bocconi Curricular Internship)",
        type: "work",
        description: "Four-month curricular internship at an accounting firm. First hands-on exposure to financial statements, tax filings, and the reality of Italian SME finance.",
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
        description: "Twenty-eight days before CERN released the World Wide Web into the public domain. The internet was about to connect everything — fitting start for someone who'd spend his life jumping between coordinates.",
      },
      {
        title: "Liceo Scientifico Angelo Messedaglia",
        type: "education",
        description: "Scientific high school. Five years of mathematics, physics, and Latin — the Italian formula for building analytical thinkers.",
      },
      {
        title: "Competitive Swimmer — National Champion",
        type: "personal",
        description: "Years of 5am pool sessions, national competitions, and medals. The discipline stuck long after the chlorine washed off.",
      },
    ],
  },
  {
    period: "PENDING",
    location: "Patagonia",
    country: "Argentina",
    coordinates: [-68.9, -46.0],
    category: "queued",
    link: { href: "/journey/patagonia26", label: "VIEW ITINERARY" },
    entries: [
      {
        title: "Edge of the World",
        type: "personal",
        description: "Glaciers, peaks, and silence. The last stretch of land before Antarctica.",
      },
    ],
  },
];
