import type { Metadata } from "next";
import JourneyClient from "./JourneyClient";

export const metadata: Metadata = {
  title: "Journey — Francesco Villani",
  description:
    "From Verona to Berlin — through startups, central banking, and engineering.",
};

export default function JourneyPage() {
  return <JourneyClient />;
}
