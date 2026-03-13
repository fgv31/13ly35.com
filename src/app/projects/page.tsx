"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { projects, type ProjectStatus } from "@/data/mock/projects";
import ProjectCard from "@/components/ui/ProjectCard";

type FilterOption = "all" | ProjectStatus;

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterOption>("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.status === filter);

  const filterOptions: Array<{ value: FilterOption; label: string }> = [
    { value: "all", label: "ALL" },
    { value: "built", label: "DEPLOYED" },
    { value: "ongoing", label: "IN_DEV" },
    { value: "idea", label: "CONCEPT" },
  ];

  return (
    <div className="min-h-screen bg-dark cyber-grid flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <header className="mb-16">
            <div className="flex items-start justify-between mb-4">
              <p className="font-mono text-xs text-magenta">[04] // PROJECTS_MODULE</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono text-xs text-cyan/50 hover:text-cyan transition-colors duration-300"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                EXIT()
              </Link>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="text-cyan">BUILD</span> LOG
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
                onClick={() => setFilter(option.value)}
                className={`font-mono text-xs px-4 py-2 border transition-all duration-300 ${
                  filter === option.value
                    ? "bg-cyan text-dark border-cyan"
                    : "bg-transparent text-white/50 border-cyan/20 hover:border-cyan/50 hover:text-cyan"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
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
