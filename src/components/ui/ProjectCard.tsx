import type { Project, ProjectStatus } from "@/data/mock/projects";

const statusStyles: Record<ProjectStatus, { color: string; label: string }> = {
  idea: { color: "text-yellow", label: "CONCEPT" },
  built: { color: "text-cyan", label: "DEPLOYED" },
  ongoing: { color: "text-magenta", label: "IN_DEV" },
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const status = statusStyles[project.status];

  return (
    <div className="group p-8 bg-muted/50 border border-cyan/10 hover:border-cyan/50 transition-all duration-300 relative">
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyan/20 group-hover:border-cyan/50 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cyan/20 group-hover:border-cyan/50 transition-colors duration-300" />

      <div className="flex items-start justify-between gap-4 mb-4">
        <span className={`font-mono text-xs ${status.color}`}>
          [{status.label}]
        </span>
      </div>

      <h3 className="text-xl font-bold text-white group-hover:text-cyan transition-colors duration-300 mb-3">
        {project.title}
      </h3>

      <p className="text-sm text-white/50 leading-relaxed mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs text-cyan/60 border border-cyan/20 px-2 py-1"
          >
            #{tag}
          </span>
        ))}
      </div>

      {(project.github || project.liveUrl) && (
        <div className="flex gap-4 pt-4 border-t border-cyan/10">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-white/40 hover:text-cyan transition-colors duration-300"
            >
              [GITHUB]
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-white/40 hover:text-magenta transition-colors duration-300"
            >
              [LIVE]
            </a>
          )}
        </div>
      )}
    </div>
  );
}
