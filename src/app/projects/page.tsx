"use client";

import { useState } from "react";
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
    <div className="min-h-screen bg-beige px-6 py-12 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="font-pixel text-2xl md:text-4xl text-black mb-8 leading-relaxed">
          Crazy FUCKING Projects
        </h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {(["all", "idea", "built", "ongoing"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`pixel-hover px-4 py-2 border-2 border-black rounded font-pixel text-sm transition-colors ${
                filter === option
                  ? "bg-red text-beige"
                  : "bg-beige text-black hover:bg-black hover:text-beige"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="font-pixel text-lg text-black">
              No projects found for this filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
