"use client";

import type { ReactNode } from "react";

export interface DrillDownProps {
  summary: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function DrillDown({
  summary,
  defaultOpen = false,
  children,
}: DrillDownProps) {
  return (
    <details
      open={defaultOpen}
      className="group border border-gray-200 rounded-md overflow-hidden"
    >
      <summary className="flex items-center justify-between gap-2 px-4 py-3 cursor-pointer select-none font-medium text-gray-800 hover:text-indigo-600 transition-colors duration-150 list-none">
        <span>{summary}</span>
        {/* chevron rotates when open */}
        <svg
          className="w-4 h-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </summary>
      <div className="px-4 py-3 text-sm text-gray-700 border-t border-gray-100">
        {children}
      </div>
    </details>
  );
}
