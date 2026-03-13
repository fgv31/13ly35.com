import type { Project, ProjectStatus } from "@/data/mock/projects";

const statusStyles: Record<ProjectStatus, string> = {
  idea: "text-beige/40",
  built: "text-green-500",
  ongoing: "text-red",
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group p-8 bg-beige/5 hover:bg-beige/10 transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className={`text-xs uppercase tracking-[0.15em] ${statusStyles[project.status]}`}>
          {project.status}
        </span>
      </div>

      <h3 className="text-xl font-light text-beige group-hover:text-red transition-colors duration-300 mb-3">
        {project.title}
      </h3>

      <p className="text-sm text-beige/60 leading-relaxed mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-beige/40 border border-beige/10 px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      {(project.github || project.liveUrl) && (
        <div className="flex gap-4 pt-4 border-t border-beige/5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-beige/50 hover:text-red transition-colors duration-300"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-beige/50 hover:text-red transition-colors duration-300"
            >
              Live
            </a>
          )}
        </div>
      )}
    </div>
  );
}
