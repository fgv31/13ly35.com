import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Francesco Villani — Builder & Engineer",
  description:
    "Personal portfolio of Francesco Villani. Projects, journey, and curated picks.",
};

export default function HomePage() {
  return <HomeClient />;
}
