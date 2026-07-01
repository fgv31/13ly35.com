import type { Metadata } from "next";
import AiChallengeV2Client from "./AiChallengeV2Client";

export const metadata: Metadata = {
  title: "AI Challenge V2 — Francesco Villani",
  robots: { index: false, follow: false },
};

export default function AiChallengeV2Page() {
  return <AiChallengeV2Client />;
}
