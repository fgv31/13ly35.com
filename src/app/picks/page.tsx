import type { Metadata } from "next";
import TasteClient from "./TasteClient";

export const metadata: Metadata = {
  title: "Picks — Francesco Villani",
  description: "Curated recommendations: films, music, objects, people.",
};

export default function TastePage() {
  return <TasteClient />;
}
