"use client";

import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { JourneyEntry } from "@/data/mock/cv";

interface TimelineProps {
  entries: JourneyEntry[];
  onLocationClick?: (entry: JourneyEntry) => void;
}

export interface TimelineHandle {
  scrollToLocation: (index: number) => void;
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

const categoryConfig: Record<string, { label: string; color: string; dotColor: string }> = {
  live: { label: "LIVE", color: "text-cyan", dotColor: "bg-cyan" },
  archived: { label: "ARCHIVED", color: "text-white/30", dotColor: "bg-white/40" },
  queued: { label: "QUEUED", color: "text-white/50", dotColor: "bg-white/40" },
};

const Timeline = forwardRef<TimelineHandle, TimelineProps>(
  function Timeline({ entries, onLocationClick }, ref) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useImperativeHandle(ref, () => ({
      scrollToLocation(index: number) {
        setExpandedIndex(index);
        itemRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      },
    }));

    const toggleExpand = (index: number) => {
      setExpandedIndex(expandedIndex === index ? null : index);
      if (expandedIndex !== index && onLocationClick) {
        onLocationClick(entries[index]);
      }
    };

    return (
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan/50 via-magenta/50 to-white/10" />

        <div className="space-y-0">
          {entries.map((entry, index) => {
            const isExpanded = expandedIndex === index;
            const cat = categoryConfig[entry.category];
            const isQueued = entry.category === "queued";

            return (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                className={`relative pl-12 pb-10 last:pb-0 ${isQueued ? "opacity-70" : ""}`}
              >
                {/* Timeline marker */}
                <div
                  className={`absolute left-[-5px] top-1 w-[10px] h-[10px] rounded-full transition-all duration-300 ${
                    isExpanded
                      ? "bg-cyan scale-150 shadow-[0_0_15px_#00ff66]"
                      : cat.dotColor
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
                    {entry.category === "live" ? (
                      <span className="live-blink font-mono text-[10px] text-cyan font-bold flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#00ff66]" />
                        LIVE
                      </span>
                    ) : (
                      <span className={`font-mono text-[10px] ${cat.color}`}>
                        {cat.label}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2">
                    <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                      isExpanded ? "text-cyan glow-cyan" : isQueued ? "text-white/50 group-hover:text-white/70" : "text-white group-hover:text-cyan"
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
);

export default Timeline;
