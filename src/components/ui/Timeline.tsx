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

  const getTypeColor = (type: CVEntry["type"]) => {
    switch (type) {
      case "work":
        return "bg-red border-red";
      case "education":
        return "bg-black border-black";
      case "personal":
        return "bg-red/70 border-red/70";
      default:
        return "bg-black border-black";
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-8">
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-black/20" />

      <div className="space-y-8">
        {entries.map((entry, index) => {
          const isExpanded = expandedIndex === index;
          const typeColor = getTypeColor(entry.type);

          return (
            <div key={index} className="relative pl-16">
              {/* Timeline marker */}
              <div
                className={`absolute left-[22px] top-2 w-5 h-5 border-2 transition-all duration-200 ${typeColor} ${
                  isExpanded
                    ? "scale-125 rotate-45"
                    : "hover:scale-110 hover:rotate-45"
                }`}
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />

              {/* Content */}
              <button
                onClick={() => toggleExpand(index)}
                className="w-full text-left group"
              >
                <div
                  className={`border-2 border-black p-4 transition-all duration-200 ${
                    isExpanded
                      ? "bg-red text-beige shadow-[4px_4px_0_0_#FF1A00]"
                      : "bg-beige hover:shadow-[2px_2px_0_0_#1A1A1A] hover:-translate-x-[2px] hover:-translate-y-[2px]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span
                          className={`font-pixel text-xs ${
                            isExpanded ? "text-beige" : "text-red"
                          }`}
                        >
                          {entry.year}
                        </span>
                        <span
                          className={`text-xs uppercase tracking-wider ${
                            isExpanded ? "text-beige/70" : "text-black/50"
                          }`}
                        >
                          {entry.type}
                        </span>
                      </div>
                      <h3
                        className={`font-sans text-lg font-semibold mb-2 ${
                          isExpanded ? "text-beige" : "text-black"
                        }`}
                      >
                        {entry.title}
                      </h3>
                      <p
                        className={`font-sans text-sm transition-all duration-200 ${
                          isExpanded
                            ? "text-beige/90 opacity-100 max-h-96"
                            : "text-black/70 opacity-0 max-h-0 overflow-hidden"
                        }`}
                      >
                        {entry.description}
                      </p>
                    </div>
                    <div
                      className={`font-pixel text-xs transition-transform duration-200 ${
                        isExpanded
                          ? "rotate-180 text-beige"
                          : "rotate-0 text-red"
                      }`}
                    >
                      {isExpanded ? "−" : "+"}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
