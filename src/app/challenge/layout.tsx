import type { ReactNode } from "react";
import "./challenge.css";

export default function ChallengeLayout({ children }: { children: ReactNode }) {
  return <div className="challenge-scope">{children}</div>;
}
