"use client";

import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <header className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-beige/40 mb-4">04 / Projects</p>
            <h1 className="text-4xl md:text-6xl font-light text-beige mb-6">
              Building
            </h1>
            <p className="text-lg text-beige/60 max-w-2xl leading-relaxed">
              Ideas brought to life, works in progress, and concepts waiting to be built.
            </p>
          </header>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-12">
            {(["all", "built", "ongoing", "idea"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-5 py-2.5 text-sm capitalize transition-all duration-300 ${
                  filter === option
                    ? "bg-beige text-dark"
                    : "bg-transparent text-beige/60 hover:text-beige"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="text-center py-20">
              <p className="text-beige/40">No projects in this category yet.</p>
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
