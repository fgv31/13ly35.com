export type ProjectStatus = "idea" | "built" | "ongoing";

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  github?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Deimos Server",
    description: "Personal server infrastructure with n8n, AI assistant, and websites",
    status: "ongoing",
    tags: ["devops", "docker", "self-hosting"],
    github: "https://github.com/fgv31/deimos",
  },
  {
    id: "2",
    title: "Neural Art Generator",
    description: "AI-powered art generation using custom trained models",
    status: "idea",
    tags: ["ai", "art", "python"],
  },
  {
    id: "3",
    title: "Personal Knowledge Base",
    description: "Obsidian-based second brain with custom plugins",
    status: "built",
    tags: ["obsidian", "knowledge", "productivity"],
  },
  {
    id: "4",
    title: "Workflow Automation Hub",
    description: "n8n workflows for automating life and work",
    status: "ongoing",
    tags: ["automation", "n8n", "productivity"],
  },
  {
    id: "5",
    title: "Retro Game Engine",
    description: "8-bit style game engine in TypeScript",
    status: "idea",
    tags: ["games", "typescript", "pixel-art"],
  },
];
