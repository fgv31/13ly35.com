import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Journey — Francesco Villani",
  description:
    "From Verona to Berlin — through startups, central banking, and engineering.",
};

export default function AboutPage() {
  return <AboutClient />;
}
