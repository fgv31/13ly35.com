"use client";

import React, { useEffect, useState } from "react";

export interface SlideNavProps {
  items: { id: string; label: string }[];
}

export function SlideNav(p: SlideNavProps): React.JSX.Element {
  const [activeId, setActiveId] = useState<string>(p.items[0]?.id ?? "");

  useEffect(() => {
    const root = document.querySelector(".ai-challenge-scope") as HTMLElement | null;
    const observers: IntersectionObserver[] = [];

    p.items.forEach(({ id }) => {
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
  }, [p.items]);

  const scrollTo = (id: string) => {
    const root = document.querySelector(".ai-challenge-scope") as HTMLElement | null;
    const el = document.getElementById(id);
    if (!el || !root) return;
    root.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Chapter navigation"
      className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-3"
    >
      {p.items.map(({ id, label }) => {
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
