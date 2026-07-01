"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./useReducedMotion";

// Register GSAP plugins once at module load (none required currently; import ensures tree-shaking keeps gsap)
void gsap.version;

export interface DeckContextValue {
  activeIndex: number;
  total: number;
  go(to: "next" | "prev" | number): void;
  reducedMotion: boolean;
}

const DeckContext = createContext<DeckContextValue | null>(null);

export function DeckProvider({
  total,
  children,
}: {
  total: number;
  children: React.ReactNode;
}): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  const go = (to: "next" | "prev" | number) => {
    setActiveIndex((current) => {
      let next: number;
      if (to === "next") {
        next = current + 1;
      } else if (to === "prev") {
        next = current - 1;
      } else {
        next = to;
      }
      return Math.max(0, Math.min(next, total - 1));
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          go("next");
          break;
        case " ":
          e.preventDefault();
          if (e.shiftKey) {
            go("prev");
          } else {
            go("next");
          }
          break;
        case "ArrowLeft":
        case "ArrowUp":
          go("prev");
          break;
        case "Home":
          go(0);
          break;
        case "End":
          go(total - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [total]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DeckContext.Provider value={{ activeIndex, total, go, reducedMotion }}>
      {children}
    </DeckContext.Provider>
  );
}

export function useDeck(): DeckContextValue {
  const ctx = useContext(DeckContext);
  if (ctx === null) {
    throw new Error("useDeck must be used within a DeckProvider");
  }
  return ctx;
}
