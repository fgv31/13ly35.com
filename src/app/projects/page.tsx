import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects — Francesco Villani",
  description: "Ideas built, in development, and imagined.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
