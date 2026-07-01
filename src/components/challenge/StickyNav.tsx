"use client";

import { useEffect, useState } from "react";

export interface NavItem {
  id: string;
  label: string;
}

export interface StickyNavProps {
  items: NavItem[];
}

export default function StickyNav({ items }: StickyNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const root = document.querySelector(".challenge-scope") as HTMLElement | null;
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id);
            }
          });
        },
        { root, rootMargin: "-40% 0px -40% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [items]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section navigation"
      className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-3"
    >
      {items.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded-full pl-2"
          >
            <span
              className={`text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "opacity-100 text-indigo-600 font-semibold translate-x-0"
                  : "opacity-0 -translate-x-1 text-slate-500 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {label}
            </span>
            <span
              className={`shrink-0 rounded-full transition-all duration-200 ${
                isActive
                  ? "w-2.5 h-2.5 bg-indigo-600 ring-2 ring-indigo-200"
                  : "w-1.5 h-1.5 bg-slate-400 group-hover:bg-indigo-500 group-hover:scale-150"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
