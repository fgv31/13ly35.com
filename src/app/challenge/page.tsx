import type { Metadata } from "next";
import ChallengeClient from "./ChallengeClient";

export const metadata: Metadata = {
  title: "Senior Risk Manager Challenge — Francesco Villani",
  description:
    "Francesco Villani's answers to the Upvest Senior Risk Manager case challenge.",
};

export default function ChallengePage() {
  return <ChallengeClient />;
}
