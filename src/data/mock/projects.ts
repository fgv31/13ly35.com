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
    title: "Deimos Server",
    description: "Personal server infrastructure with n8n, AI assistant, and websites",
    detail:
      "A self-hosted server running on a dedicated machine, orchestrating Docker containers for personal infrastructure. Hosts n8n for workflow automation, AI assistants, personal websites, and various microservices. Built with a security-first approach using Cloudflare tunnels, isolated networks, and automated backups.",
    status: "ongoing",
    tags: ["devops", "docker", "self-hosting"],
    tech: ["Docker", "Cloudflare", "Ubuntu", "Nginx", "n8n"],
    github: "https://github.com/fgv31/deimos",
    year: "2026",
  },
  {
    id: "2",
    title: "13ly35.com",
    description: "Personal cyberpunk-themed portfolio and digital identity hub",
    detail:
      "A personal website built with a cyberpunk aesthetic — dark backgrounds, neon accents, monospaced typography, and glitch effects. Features an interactive world map showing places lived and visited, a curated taste feed, project showcase, and a live status page. Designed to feel like a terminal interface from the future.",
    status: "ongoing",
    tags: ["web", "nextjs", "design"],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Mapbox GL"],
    github: "https://github.com/fgv31/13ly35.com",
    liveUrl: "https://13ly35.com",
    year: "2026",
  },
  {
    id: "3",
    title: "Neural Art Generator",
    description: "AI-powered art generation using custom trained models",
    detail:
      "An experimental project exploring the intersection of AI and visual art. The goal is to train custom diffusion models on specific art styles and build a pipeline that generates unique pieces on demand. Still in the concept phase — researching model architectures and dataset curation strategies.",
    status: "idea",
    tags: ["ai", "art", "python"],
    tech: ["Python", "PyTorch", "Stable Diffusion", "ComfyUI"],
    year: "2026",
  },
  {
    id: "4",
    title: "Personal Knowledge Base",
    description: "Obsidian-based second brain with custom plugins",
    detail:
      "A comprehensive personal knowledge management system built in Obsidian, code-named STARGATE. Features a structured vault with interconnected notes spanning projects, research, daily logs, and learning resources. Includes custom templates, automated workflows via Templater, and a tagging taxonomy for fast retrieval.",
    status: "built",
    tags: ["obsidian", "knowledge", "productivity"],
    tech: ["Obsidian", "Templater", "Dataview", "JavaScript"],
    year: "2025",
  },
  {
    id: "5",
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
    id: "6",
    title: "Retro Game Engine",
    description: "8-bit style game engine in TypeScript",
    detail:
      "A lightweight game engine designed for creating retro-style pixel art games in the browser. Features tile-based rendering, sprite animation, collision detection, and a simple scene graph. The idea is to build something minimal but expressive enough to prototype small games quickly.",
    status: "idea",
    tags: ["games", "typescript", "pixel-art"],
    tech: ["TypeScript", "Canvas API", "Web Audio"],
    year: "2026",
  },
  {
    id: "7",
    title: "CRUBSTER",
    description: "Startup co-founded and run for three years — wore every hat",
    detail:
      "Co-founded a startup that aimed to disrupt how people discover local experiences. Built the product, managed the team, handled fundraising, marketing, and operations. Three years of intense learning, pivots, and growth. Eventually shut down — but the lessons stuck.",
    status: "deleted",
    tags: ["startup", "product", "entrepreneurship"],
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
    year: "2021–2024",
  },
  {
    id: "8",
    title: "Crypto Trading Bot",
    description: "Algorithmic trading bot for cryptocurrency markets",
    detail:
      "Built a trading bot that monitored crypto markets and executed trades based on technical indicators and sentiment analysis. Ran live for a few months, made some gains, took some losses. Pulled the plug when the risk/reward ratio stopped making sense. Good exercise in systems thinking and real-time data processing.",
    status: "deleted",
    tags: ["crypto", "trading", "automation"],
    tech: ["Python", "Binance API", "pandas", "Redis"],
    year: "2022",
  },
];
