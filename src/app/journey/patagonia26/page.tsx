import type { Metadata } from "next";
import PatagoniaClient from "./PatagoniaClient";

export const metadata: Metadata = {
  title: "Patagonia 2026 — Journey",
  description:
    "Day-by-day itinerary for a journey through Patagonia Argentina — glaciers, penguins, Tierra del Fuego, and the end of the world.",
};

export default function PatagoniaPage() {
  return <PatagoniaClient />;
}
