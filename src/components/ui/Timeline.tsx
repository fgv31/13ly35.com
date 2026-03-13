"use client";

import { useState } from "react";
import { JourneyEntry } from "@/data/mock/cv";

interface TimelineProps {
  entries: JourneyEntry[];
  onLocationClick?: (entry: JourneyEntry) => void;
}

const typeLabels: Record<string, string> = {
  work: "WORK",
  education: "EDU",
  personal: "LIFE",
  volunteer: "VOL",
};

const typeColors: Record<string, string> = {
  work: "text-cyan",
  education: "text-magenta",
  personal: "text-yellow",
  volunteer: "text-white/60",
};

export default function Timeline({ entries, onLocationClick }: TimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    if (expandedIndex !== index && onLocationClick) {
      onLocationClick(entries[index]);
    }
  };

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan/50 via-magenta/50 to-cyan/50" />

      <div className="space-y-0">
        {entries.map((entry, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <div key={index} className="relative pl-12 pb-10 last:pb-0">
              {/* Timeline marker */}
              <div
                className={`absolute left-[-5px] top-1 w-[10px] h-[10px] rounded-full transition-all duration-300 ${
                  isExpanded
                    ? "bg-cyan scale-150 shadow-[0_0_15px_#00ff66]"
                    : entry.category === "lived"
                    ? "bg-cyan/50"
                    : "bg-magenta/50"
                }`}
              />

              {/* Location header */}
              <button
                onClick={() => toggleExpand(index)}
                className="w-full text-left group"
              >
                <div className="flex items-baseline gap-4 mb-1">
                  <span className="font-mono text-xs text-cyan/60">
                    {entry.period}
                  </span>
                  <span className="font-mono text-xs text-white/20">
                    {entry.category === "lived" ? "LIVED" : "VISITED"}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                    isExpanded ? "text-cyan glow-cyan" : "text-white group-hover:text-cyan"
                  }`}>
                    {entry.location}
                  </h3>
                  {entry.country && (
                    <span className="font-mono text-xs text-white/30">
                      {entry.country}
                    </span>
                  )}
                  <span className={`font-mono text-xs text-white/20 transition-transform duration-300 inline-block ${
                    isExpanded ? "rotate-90" : ""
                  }`}>
                    &gt;
                  </span>
                </div>
              </button>

              {/* Sub-tree */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isExpanded ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <div className="relative ml-4 pl-6 border-l border-white/10 space-y-4">
                  {entry.entries.map((sub, subIndex) => (
                    <div key={subIndex} className="relative">
                      {/* Sub-tree connector dot */}
                      <div className="absolute left-[-29px] top-[10px] w-[6px] h-[6px] rounded-full bg-white/20" />

                      <div className="flex items-baseline gap-3 mb-1">
                        <span className={`font-mono text-[10px] ${typeColors[sub.type]}`}>
                          [{typeLabels[sub.type]}]
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white/80">
                        {sub.title}
                      </h4>
                      <p className="text-xs text-white/40 leading-relaxed mt-1">
                        {sub.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
