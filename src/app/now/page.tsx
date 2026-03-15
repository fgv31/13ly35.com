import type { Metadata } from "next";
import NowClient from "./NowClient";

export const metadata: Metadata = {
  title: "Now — Francesco Villani",
  description: "What I'm currently focused on.",
};

export default function NowPage() {
  return <NowClient />;
}
