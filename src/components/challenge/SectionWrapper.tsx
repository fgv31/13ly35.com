import type { ReactNode } from "react";

export interface SectionWrapperProps {
  id: string;
  variant?: "light" | "tint" | "dark";
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<NonNullable<SectionWrapperProps["variant"]>, string> = {
  light: "bg-white text-gray-900",
  tint: "bg-gray-50 text-gray-900",
  dark: "bg-gray-950 text-white",
};

export default function SectionWrapper({
  id,
  variant = "light",
  className = "",
  children,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 flex flex-col justify-center ${variantClasses[variant]} ${className}`}
    >
      {children}
    </section>
  );
}
