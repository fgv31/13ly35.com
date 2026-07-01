"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { projects, type ProjectStatus } from "@/data/mock/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectDetail from "@/components/ui/ProjectDetail";

type FilterOption = "all" | ProjectStatus;

export default function ProjectsClient() {
  const [filter, setFilter] = useState<FilterOption>("all");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.status === filter);

  const activeProject = activeProjectId
    ? projects.find((p) => p.id === activeProjectId) ?? null
    : null;

  // Scroll the detail into view when it opens
  useEffect(() => {
    if (activeProjectId && detailRef.current) {
      // Small delay to let the DOM render the detail
      const timer = setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeProjectId]);

  const filterOptions: Array<{ value: FilterOption; label: string; activeClass: string }> = [
    { value: "all", label: "ALL", activeClass: "bg-cyan text-dark border-cyan" },
    { value: "built", label: "DEPLOYED", activeClass: "bg-cyan text-dark border-cyan" },
    { value: "ongoing", label: "IN_DEV", activeClass: "bg-magenta text-dark border-magenta" },
    { value: "idea", label: "CONCEPT", activeClass: "bg-yellow text-dark border-yellow" },
    { value: "deleted", label: "INTERRUPTED", activeClass: "bg-red-500 text-dark border-red-500" },
  ];

  const handleCardClick = (projectId: string) => {
    if (activeProjectId === projectId) {
      setActiveProjectId(null);
    } else {
      setActiveProjectId(projectId);
    }
  };

  return (
    <div className="min-h-screen bg-dark cyber-grid flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <header className="mb-16">
            <div className="mb-4">
              <p className="font-mono text-xs text-magenta">[03] // PATHS_MODULE</p>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
              <span className="text-cyan">ALL</span> PATHS
            </h1>
            <p className="text-lg text-white/50 max-w-2xl leading-relaxed font-mono">
              <span className="text-cyan">&gt;</span> Ideas brought to life, works in progress, and concepts waiting to be built.
            </p>
          </header>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-12">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setFilter(option.value);
                  setActiveProjectId(null);
                }}
                className={`font-mono text-xs px-4 py-2 border transition-all duration-300 ${
                  filter === option.value
                    ? option.activeClass
                    : "bg-transparent text-white/50 border-cyan/20 hover:border-cyan/50 hover:text-cyan"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Projects Grid — detail expands inline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project, index) => {
              const isActive = activeProjectId === project.id;

              return (
                <div
                  key={project.id}
                  className={isActive ? "md:col-span-2" : ""}
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                  }}
                >
                  {isActive && activeProject ? (
                    <div ref={detailRef}>
                      <ProjectDetail
                        project={activeProject}
                        onClose={() => setActiveProjectId(null)}
                      />
                    </div>
                  ) : (
                    <ProjectCard
                      project={project}
                      onClick={() => handleCardClick(project.id)}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 border border-cyan/10">
              <p className="font-mono text-white/40">NO_PROJECTS_FOUND</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
