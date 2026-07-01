"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export interface RevealProps {
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  once?: boolean;
  className?: string;
  children: ReactNode;
}

const directionInitial: Record<
  NonNullable<RevealProps["direction"]>,
  { x?: number; y?: number; opacity: number }
> = {
  up: { y: 24, opacity: 0 },
  down: { y: -24, opacity: 0 },
  left: { x: 24, opacity: 0 },
  right: { x: -24, opacity: 0 },
  fade: { opacity: 0 },
};

export default function Reveal({
  delay = 0,
  direction = "up",
  once = true,
  className,
  children,
}: RevealProps) {
  const initial = directionInitial[direction];
  const animate = { x: 0, y: 0, opacity: 1 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
