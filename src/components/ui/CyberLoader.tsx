"use client";

import { useEffect, useState } from "react";

interface CyberLoaderProps {
  label?: string;
  onInterrupted?: () => void;
}

const PERCENT_STEPS = [0, 12, 27, 38, 49, 62, 64];

export default function CyberLoader({ label = "MODULE_LOADING", onInterrupted }: CyberLoaderProps) {
  const [step, setStep] = useState(0);
  const [interrupted, setInterrupted] = useState(false);

  useEffect(() => {
    const delays = [300, 400, 350, 400, 500, 400, 600];
    let timeout: ReturnType<typeof setTimeout>;

    const advance = (i: number) => {
      if (i < PERCENT_STEPS.length) {
        timeout = setTimeout(() => {
          setStep(i);
          advance(i + 1);
        }, delays[i]);
      } else {
        // After last step, show interrupted
        timeout = setTimeout(() => {
          setInterrupted(true);
          onInterrupted?.();
        }, 400);
      }
    };

    advance(0);
    return () => clearTimeout(timeout);
  }, []);

  const percent = interrupted ? "-- %" : `${PERCENT_STEPS[step]}%`;
  const barWidth = interrupted ? PERCENT_STEPS[PERCENT_STEPS.length - 1] : PERCENT_STEPS[step];

  return (
    <div className="cyber-loader-container">
      {/* Status line */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs text-white/30">{label}</span>
        <span
          className={`font-mono text-xs text-violet transition-opacity duration-300 ${
            interrupted ? "opacity-100" : "opacity-0"
          }`}
        >
          INTERRUPTED
        </span>
      </div>

      {/* Loading bar */}
      <div className="relative h-2 bg-white/5 border border-white/10 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-300 ease-in-out"
          style={{
            width: `${barWidth}%`,
            opacity: interrupted ? 0.15 : 1,
            background: "linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))",
            boxShadow: interrupted ? "none" : "0 0 8px var(--accent-blue)",
          }}
        />
      </div>

      {/* Progress text */}
      <div className="flex items-center justify-between mt-2">
        <span className="font-mono text-[10px] text-white/20">{percent}</span>
        <span
          className={`font-mono text-[10px] text-white/15 transition-opacity duration-300 ${
            interrupted ? "opacity-100" : "opacity-0"
          }`}
        >
          ERR_CONNECTION_HALTED
        </span>
      </div>
    </div>
  );
}
