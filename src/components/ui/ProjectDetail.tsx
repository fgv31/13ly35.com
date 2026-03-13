"use client";

import type { Project, ProjectStatus } from "@/data/mock/projects";

const statusStyles: Record<ProjectStatus, { color: string; label: string; bg: string }> = {
  idea: { color: "text-yellow", label: "CONCEPT", bg: "bg-yellow/10 border-yellow/30" },
  built: { color: "text-cyan", label: "DEPLOYED", bg: "bg-cyan/10 border-cyan/30" },
  ongoing: { color: "text-magenta", label: "IN_DEV", bg: "bg-magenta/10 border-magenta/30" },
};

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const status = statusStyles[project.status];

  return (
    <div className="animate-fadeIn">
      {/* Detail container */}
      <div className="border border-cyan/20 bg-muted/50 relative mx-4 md:mx-8">
        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Status bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className={`font-mono text-xs px-3 py-1 border ${status.bg} ${status.color}`}>
                {status.label}
              </span>
              {project.year && (
                <span className="font-mono text-xs text-white/30">{project.year}</span>
              )}
            </div>
            <button
              onClick={onClose}
              className="font-mono text-xs text-white/40 hover:text-magenta transition-colors duration-300 flex items-center gap-2 cursor-pointer"
            >
              CLOSE
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <div className="mb-10">
            <p className="font-mono text-xs text-cyan/50 mb-3">// DESCRIPTION</p>
            <p className="text-white/70 leading-relaxed max-w-3xl">
              {project.detail || project.description}
            </p>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Tech stack */}
            {project.tech && project.tech.length > 0 && (
              <div>
                <p className="font-mono text-xs text-cyan/50 mb-3">// TECH_STACK</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs text-cyan border border-cyan/20 bg-cyan/5 px-3 py-1.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div>
              <p className="font-mono text-xs text-cyan/50 mb-3">// TAGS</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-white/50 border border-white/10 px-3 py-1.5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Images placeholder */}
          {project.images && project.images.length > 0 ? (
            <div className="mb-10">
              <p className="font-mono text-xs text-cyan/50 mb-3">// SCREENSHOTS</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-video border border-cyan/10 bg-dark/50 overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-10">
              <p className="font-mono text-xs text-cyan/50 mb-3">// SCREENSHOTS</p>
              <div className="border border-dashed border-white/10 py-12 flex items-center justify-center">
                <p className="font-mono text-xs text-white/20">NO_VISUAL_DATA_AVAILABLE</p>
              </div>
            </div>
          )}

          {/* Links */}
          {(project.github || project.liveUrl) && (
            <div>
              <p className="font-mono text-xs text-cyan/50 mb-3">// LINKS</p>
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-white/50 border border-cyan/20 hover:border-cyan hover:text-cyan px-4 py-2 transition-all duration-300"
                  >
                    [GITHUB]
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-white/50 border border-magenta/20 hover:border-magenta hover:text-magenta px-4 py-2 transition-all duration-300"
                  >
                    [LIVE]
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back hint */}
      <button
        onClick={onClose}
        className="mt-6 font-mono text-xs text-white/20 hover:text-cyan transition-colors duration-300 flex items-center gap-2 cursor-pointer"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        BACK_TO_LIST
      </button>
    </div>
  );
}
