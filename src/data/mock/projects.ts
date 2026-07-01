export type ProjectStatus = "idea" | "built" | "ongoing" | "deleted";

export interface Project {
  id: string;
  title: string;
  description: string;
  detail?: string;
  status: ProjectStatus;
  tags: string[];
  github?: string;
  liveUrl?: string;
  tech?: string[];
  images?: string[];
  year?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Deimos AI/Server",
    description: "Personal server infrastructure with n8n, AI assistant, and websites",
    detail:
      "A self-hosted server running on a dedicated machine, orchestrating Docker containers for personal infrastructure. Hosts n8n for workflow automation, AI assistants, personal websites, and various microservices. Built with a security-first approach using Cloudflare tunnels, isolated networks, and automated backups.",
    status: "ongoing",
    tags: ["devops", "docker", "self-hosting"],
    tech: ["Docker", "Cloudflare", "Ubuntu", "Caddy", "n8n"],
    github: "https://github.com/fgv31/deimos",
    year: "2026",
  },
  {
    id: "2",
    title: "13ly35.com",
    description: "Personal cyberpunk-themed portfolio and digital identity hub",
    detail:
      "A personal website built with a cyberpunk aesthetic — dark backgrounds, neon accents, monospaced typography, and glitch effects. Features an interactive world map showing places lived and visited, a curated taste feed, project showcase, and a live status page. Designed to feel like a terminal interface from the future.",
    status: "built",
    tags: ["web", "nextjs", "design"],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Mapbox GL"],
    github: "https://github.com/fgv31/13ly35.com",
    liveUrl: "https://13ly35.com",
    year: "2026",
  },
  {
    id: "3",
    title: "Personal Knowledge Base",
    description: "Obsidian-based second brain with custom plugins",
    detail:
      "A comprehensive personal knowledge management system built in Obsidian, code-named STARGATE. Features a structured vault with interconnected notes spanning projects, research, daily logs, and learning resources. Includes custom templates, automated workflows via Templater, and a tagging taxonomy for fast retrieval.",
    status: "built",
    tags: ["obsidian", "knowledge", "productivity"],
    tech: ["Obsidian", "Templater", "Dataview", "JavaScript"],
    year: "2026",
  },
  {
    id: "4",
    title: "Workflow Automation Hub",
    description: "n8n workflows for automating life and work",
    detail:
      "A collection of n8n workflows that automate repetitive tasks across personal and professional life. Includes email processing, social media scheduling, data syncing between apps, notification routing, and AI-powered content summarization. Everything runs self-hosted on Deimos for full control and privacy.",
    status: "ongoing",
    tags: ["automation", "n8n", "productivity"],
    tech: ["n8n", "REST APIs", "JavaScript", "Webhooks"],
    year: "2026",
  },
  {
    id: "5",
    title: "CRUBSTER",
    description: "Startup co-founded in Verona — consumer trust platform for local experiences",
    detail:
      "Co-founded a startup that aimed to disrupt how people discover local experiences. Built the product, managed the team, handled fundraising, marketing, and operations. Three years of intense learning, pivots, and growth. Eventually shut down — but the lessons stuck. 'In Consumers We Trust.'",
    status: "deleted",
    tags: ["startup", "product", "entrepreneurship"],
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
    images: Array.from({ length: 14 }, (_, i) => `/projects/crubster-pitch/page-${String(i + 1).padStart(2, "0")}.png`),
    year: "2021–2024",
  },
  {
    id: "6",
    title: "Crypto Trading Bot",
    description: "Algorithmic trading bot for cryptocurrency markets",
    detail:
      "Built a trading bot that monitored crypto markets and executed trades based on technical indicators and sentiment analysis. Ran live for a few months, made some gains, took some losses. Pulled the plug when the risk/reward ratio stopped making sense. Good exercise in systems thinking and real-time data processing.",
    status: "deleted",
    tags: ["crypto", "trading", "automation"],
    tech: ["Python", "Binance API", "pandas", "Redis"],
    year: "2016",
  },
  {
    id: "7",
    title: "PreemPic",
    description: "AI-powered photo finder for athletes — your moment, through their eyes",
    detail:
      "A platform where fans snap thousands of pictures and AI finds you in them — no face recognition needed. Built for athletes, clubs, and brands to capture and share their moments from races, games, and events. Fans upload, the AI matches, athletes get their photos.",
    status: "idea",
    tags: ["ai", "sports", "platform"],
    tech: ["AI/ML", "Computer Vision", "React", "Cloud"],
    liveUrl: "https://preempic.13ly35.com",
    images: ["/projects/preempic/page-01.png"],
    year: "2025",
  },
  {
    id: "8",
    title: "Reacted",
    description: "Capture people's emotions, improve your content",
    detail:
      "A platform to measure how audiences emotionally react to content in real-time. Brands struggle to measure content effectiveness — Reacted uses AI-powered emotion analysis to give instant, honest feedback. Think of it as the next era of social content: from text to photo to video to real reactions.",
    status: "idea",
    tags: ["ai", "emotions", "social"],
    tech: ["AI/ML", "React Native", "Emotion Analysis", "Cloud"],
    liveUrl: "https://reacted.wtf",
    images: Array.from({ length: 14 }, (_, i) => `/projects/reacted/page-${String(i + 1).padStart(2, "0")}.png`),
    year: "2024",
  },
  {
    id: "9",
    title: "Banana Mobile",
    description: "Free mobile plans for your attention — ad-supported mobile service",
    detail:
      "A concept for a mobile service provider that offers free data plans in exchange for non-intrusive ad engagement. Targeting the 30-40% of Germans without annual contracts, in a booming online ads market worth €15B+. The banana-yellow branding says it all — mobile plans shouldn't cost a fortune.",
    status: "idea",
    tags: ["telecom", "ads", "startup"],
    tech: ["MVNO", "Ad Tech", "React", "Cloud"],
    images: Array.from({ length: 13 }, (_, i) => `/projects/banana-mobile/page-${String(i + 1).padStart(2, "0")}.png`),
    year: "2024",
  },
  {
    id: "10",
    title: "Doomsday Drive",
    description: "Dead man's switch for your data — store it safe, release it if you can't",
    detail:
      "A pixel-art themed secure storage platform with a dead man's switch. You're running from evil, you want to store data somewhere safe, and want it to go public if evil gets you. Part whistleblower insurance, part digital time capsule, all wrapped in retro arcade aesthetics.",
    status: "idea",
    tags: ["security", "crypto", "storage"],
    tech: ["Encryption", "Blockchain", "Node.js", "Pixel Art"],
    liveUrl: "https://doomsdaydrive.com",
    images: Array.from({ length: 7 }, (_, i) => `/projects/doomsday-drive/page-${i + 1}.png`),
    year: "2023",
  },
  {
    id: "11",
    title: "TukTuk Verona",
    description: "CRUBSTER x TukTuk Verona — tourist tuk-tuk experience in Verona",
    detail:
      "A collaboration between CRUBSTER and TukTuk Verona to build a curated tourist experience platform. Electric tuk-tuks touring the streets of Verona, paired with local discovery and consumer recommendations. A spin-off project born from the CRUBSTER ecosystem.",
    status: "idea",
    tags: ["tourism", "mobility", "local"],
    tech: ["React", "Maps API", "Node.js"],
    images: Array.from({ length: 8 }, (_, i) => `/projects/tuktuk/page-${i + 1}.png`),
    year: "2023",
  },
  {
    id: "12",
    title: "TYS — Trade Your Skills",
    description: "Skill-based competitive gaming platform — bet on yourself",
    detail:
      "A platform where players could challenge each other in games, betting on their own skills. Win 200% of your stake, enter tournaments with prize pools. 'Ricordati che tutto dipende da te' — remember, it all depends on you. One of the earliest entrepreneurial ideas, co-conceived with A. Grandotto.",
    status: "deleted",
    tags: ["gaming", "competition", "platform"],
    tech: ["Web", "Matchmaking", "Payments"],
    images: Array.from({ length: 13 }, (_, i) => `/projects/tys/page-${String(i + 1).padStart(2, "0")}.png`),
    year: "2014",
  },
];
