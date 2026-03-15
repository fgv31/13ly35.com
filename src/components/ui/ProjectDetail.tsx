"use client";

import { useState, useEffect, useCallback } from "react";
import type { Project, ProjectStatus } from "@/data/mock/projects";

const statusStyles: Record<ProjectStatus, { color: string; label: string; bg: string }> = {
  idea: { color: "text-yellow", label: "CONCEPT", bg: "bg-yellow/10 border-yellow/30" },
  built: { color: "text-cyan", label: "DEPLOYED", bg: "bg-cyan/10 border-cyan/30" },
  ongoing: { color: "text-magenta", label: "IN_DEV", bg: "bg-magenta/10 border-magenta/30" },
  deleted: { color: "text-red-500", label: "INTERRUPTED", bg: "bg-red-500/10 border-red-500/30" },
};

function CyberImageLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-dark/80">
      <div className="relative w-12 h-12">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 border border-cyan/60 animate-[cyberSpin_2s_linear_infinite]" />
        {/* Inner pulsing square */}
        <div className="absolute inset-2 border border-magenta/50 animate-[cyberPulse_1s_ease-in-out_infinite]" />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-cyan animate-[cyberBlink_0.6s_step-end_infinite]" />
        </div>
        {/* Corner brackets */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan/40" />
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-cyan/40" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-cyan/40" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyan/40" />
      </div>
      {/* Scan line sweeping across */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent animate-[cyberScanY_2s_linear_infinite]" />
      </div>
    </div>
  );
}

function CyberImage({
  src,
  alt,
  onClick,
  index,
}: {
  src: string;
  alt: string;
  onClick: () => void;
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      onClick={onClick}
      className="aspect-video border border-cyan/10 hover:border-cyan/40 bg-dark/50 overflow-hidden transition-all duration-300 cursor-pointer group relative"
    >
      {!loaded && <CyberImageLoader />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
      {loaded && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white/0 group-hover:text-white/60 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      )}
      <span className="absolute bottom-1 right-2 font-mono text-[9px] text-white/30">
        {index + 1}
      </span>
    </button>
  );
}

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const status = statusStyles[project.status];
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreenImg(null);
      if (!fullscreenImg || !project.images) return;
      const idx = project.images.indexOf(fullscreenImg);
      if (e.key === "ArrowRight" && idx < project.images.length - 1) {
        setFullscreenImg(project.images[idx + 1]);
      }
      if (e.key === "ArrowLeft" && idx > 0) {
        setFullscreenImg(project.images[idx - 1]);
      }
    },
    [fullscreenImg, project.images]
  );

  useEffect(() => {
    if (fullscreenImg) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [fullscreenImg, handleKeyDown]);

  const currentIdx = fullscreenImg && project.images ? project.images.indexOf(fullscreenImg) : -1;
  const hasPrev = currentIdx > 0;
  const hasNext = project.images ? currentIdx < project.images.length - 1 : false;

  return (
    <div className="animate-fadeIn">
      {/* Fullscreen overlay */}
      {fullscreenImg && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setFullscreenImg(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setFullscreenImg(null)}
            className="absolute top-6 right-6 font-mono text-xs text-white/50 hover:text-magenta transition-colors z-10 flex items-center gap-2"
          >
            ESC
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Page counter */}
          {project.images && project.images.length > 1 && (
            <div className="absolute top-6 left-6 font-mono text-xs text-white/40">
              {currentIdx + 1} / {project.images.length}
            </div>
          )}

          {/* Prev arrow */}
          {hasPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenImg(project.images![currentIdx - 1]);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/40 hover:text-cyan transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <img
            src={fullscreenImg}
            alt="Fullscreen view"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next arrow */}
          {hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenImg(project.images![currentIdx + 1]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/40 hover:text-cyan transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Detail container */}
      <div className="border border-cyan/20 bg-muted/50 relative">
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

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            <span className="text-cyan">PATH</span>
            <span className="text-white/30">://</span>{" "}
            <span className="text-magenta">{project.title.toUpperCase()}</span>
          </h2>

          {/* Description */}
          <div>
            <p className="font-mono text-xs text-cyan/50 mb-3">// DESCRIPTION</p>
            <p className="text-white/70 leading-relaxed max-w-3xl">
              {project.detail || project.description}
            </p>
          </div>

          <div className="h-8" />

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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

          <div className="h-8" />

          {/* Screenshots */}
          {project.images && project.images.length > 0 ? (
            <div>
              <p className="font-mono text-xs text-cyan/50 mb-3">// SCREENSHOTS — CLICK TO EXPAND</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {project.images.map((img, i) => (
                  <CyberImage
                    key={i}
                    src={img}
                    alt={`${project.title} slide ${i + 1}`}
                    onClick={() => setFullscreenImg(img)}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="font-mono text-xs text-cyan/50 mb-3">// SCREENSHOTS</p>
              <div className="border border-dashed border-white/10 py-12 flex items-center justify-center">
                <p className="font-mono text-xs text-white/20">NO_VISUAL_DATA_AVAILABLE</p>
              </div>
            </div>
          )}

          <div className="h-8" />

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
    </div>
  );
}
