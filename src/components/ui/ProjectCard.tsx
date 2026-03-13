import type { Project, ProjectStatus } from "@/data/mock/projects";

const statusColors: Record<ProjectStatus, string> = {
  idea: "bg-gray-400 text-black",
  built: "bg-green-500 text-white",
  ongoing: "bg-red text-white",
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="pixel-hover border-2 border-black bg-beige p-6 rounded-lg">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="font-pixel text-sm text-black leading-relaxed">
          {project.title}
        </h3>
        <span
          className={`${statusColors[project.status]} px-3 py-1 text-xs font-pixel rounded-full whitespace-nowrap`}
        >
          {project.status}
        </span>
      </div>

      <p className="text-black mb-4 text-base leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="bg-black text-beige px-2 py-1 text-xs rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-pixel hover:text-red transition-colors underline"
          >
            GitHub
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-pixel hover:text-red transition-colors underline"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
