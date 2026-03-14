import type { Project, ProjectStatus } from "@/data/mock/projects";

const statusStyles: Record<ProjectStatus, { color: string; label: string }> = {
  idea: { color: "text-yellow", label: "CONCEPT" },
  built: { color: "text-cyan", label: "DEPLOYED" },
  ongoing: { color: "text-magenta", label: "IN_DEV" },
  deleted: { color: "text-red-500", label: "INTERRUPTED" },
};

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const status = statusStyles[project.status];

  return (
    <button
      onClick={onClick}
      className="group p-8 bg-muted/50 border border-cyan/30 md:border-cyan/10 hover:border-cyan/50 transition-all duration-300 relative w-full text-left cursor-pointer"
    >
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyan/40 md:border-cyan/20 group-hover:border-cyan/50 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cyan/40 md:border-cyan/20 group-hover:border-cyan/50 transition-colors duration-300" />

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

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs text-cyan/60 border border-cyan/30 md:border-cyan/20 px-2 py-1"
          >
            #{tag}
          </span>
        ))}
      </div>
    </button>
  );
}
