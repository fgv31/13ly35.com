import type { Metadata } from "next";
import AiChallengeClient from "./AiChallengeClient";

export const metadata: Metadata = {
  title: "AI Challenge — Francesco Villani",
  robots: { index: false, follow: false },
};

export default function AiChallengePage() {
  return <AiChallengeClient />;
}
