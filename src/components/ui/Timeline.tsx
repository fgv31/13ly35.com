"use client";

import { useState } from "react";
import { CVEntry } from "@/data/mock/cv";

interface TimelineProps {
  entries: CVEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10" />

      <div className="space-y-0">
        {entries.map((entry, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <div key={index} className="relative pl-12 pb-12 last:pb-0">
              {/* Timeline marker */}
              <div
                className={`absolute left-[-4px] top-1 w-2 h-2 rounded-full transition-all duration-300 ${
                  isExpanded ? "bg-red scale-150" : "bg-black/30"
                }`}
              />

              {/* Content */}
              <button
                onClick={() => toggleExpand(index)}
                className="w-full text-left group"
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-xs uppercase tracking-[0.15em] text-black/40">
                    {entry.year}
                  </span>
                  <span className="text-xs text-black/30">
                    {entry.type}
                  </span>
                </div>

                <h3 className={`text-xl font-light transition-colors duration-300 ${
                  isExpanded ? "text-red" : "text-black group-hover:text-red"
                }`}>
                  {entry.title}
                </h3>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-black/60 leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
